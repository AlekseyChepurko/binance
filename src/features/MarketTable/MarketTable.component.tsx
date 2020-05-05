import * as React from "react";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import { MarketTableComponentProps } from "./MarketTable.models";
import { withTheme } from "@devexperts/react-kit/dist/utils/withTheme";
// import { useCallback, useState } from "react";
import { Price } from "../../ui/atoms/Price";
import { PercentChange } from "../../ui/atoms/PercentChange";
import { useObservable } from "../../utils/use-observable.hook";
import { InstrumentService } from "./services/instrument";
import { useMemo } from "react";

const getA = (data: any, columnIndex: number) => {
  switch (columnIndex) {
    case 0:
      return (
        <div>
          {data.symbol}
        </div>
      );
    case 1:
      return <Price price={data.latestPrice} />;
    case 2:
      return <PercentChange changeValue={0} />;
    default:
      return null;
  }
};

const Cell: React.FC<GridChildComponentProps> = (props) => {
  const columnIndex = props.columnIndex;
  const elementData = props.data[props.rowIndex];
  const symbol = elementData.symbol;

  const data$ = useMemo(
    () => InstrumentService.getInstrumentDataStream(symbol),
    [symbol]
  );
  const data = useObservable(data$, {
    quoteAsset: "",
    symbol: "",
    latestPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    openPrice: 0,
  });

  return <div style={props.style}>{getA(data, columnIndex)}</div>;
};

const MarketTableComponent: React.FC<MarketTableComponentProps> = (props) => {
  // const [filter, setFilter] = useState();
  // const [search, setSearch] = useState<string>();
  // const [sort, setSort] = useState<string>();
  // const [changeOrVolume, setChangeOrVolume] = useState<CHANGE_OR_VOLUME>(
  //   CHANGE_OR_VOLUME.VOLUME
  // );

  return (
    <div style={{ fontSize: 12 }}>
      <Grid
        height={333}
        width={274}
        columnCount={3}
        columnWidth={274 / 3}
        rowCount={props.data.length}
        rowHeight={20}
        itemData={props.data}
      >
        {Cell}
      </Grid>
    </div>
  );
};

const MarketTable = withTheme(Symbol("MarketTable"))(MarketTableComponent);

export { MarketTable };
