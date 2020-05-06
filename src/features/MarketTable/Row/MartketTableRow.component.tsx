import * as React from "react";
import { useCallback, useMemo } from "react";
import { InstrumentService } from "../services/instrument";
import { map, pairwise } from "rxjs/operators";
import { useObservable } from "../../../utils";
import { Price } from "../../../ui/atoms/Price";
import { PercentChange } from "../../../ui/atoms/PercentChange";
import { Instrument } from "../services/instrument/instrument.dto";
import { CHANGE_OR_VOLUME } from "../MarketTable.component";

type RowProps = {
  elementData: Instrument;
  style?: React.CSSProperties;
  changeOrVolume: CHANGE_OR_VOLUME;
  theme: {
    container?: string;
    element?: string;
  };
};

const Row: React.FC<RowProps> = (props) => {
  const data$ = useMemo(
    () =>
      InstrumentService.getInstrumentDataStream(
        props.elementData.symbol,
        props.elementData
      ).pipe(
        pairwise(),
        map(([prev, cur]) => ({
          ...cur,
          changePercent: (1 - prev.latestPrice / cur.latestPrice) * 100,
        }))
      ),
    [props.elementData]
  );

  const data = useObservable(data$, props.elementData);

  const elementTheme = props.theme.element;

  const getItemTheme = useCallback(() => ({ container: elementTheme }), [
    elementTheme,
  ]);

  return (
    <div className={props.theme.container} style={props.style}>
      <div className={props.theme.element}>{data.symbol}</div>
      <Price price={data.latestPrice} theme={getItemTheme()} />
      {props.changeOrVolume === CHANGE_OR_VOLUME.CHANGE ? (
        <PercentChange
          changeValue={data.changePercent || 0}
          theme={getItemTheme()}
        />
      ) : (
        <div className={props.theme.element}>???</div>
      )}
    </div>
  );
};

export { Row };
