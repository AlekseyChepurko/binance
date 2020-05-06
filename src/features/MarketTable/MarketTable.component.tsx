import * as React from "react";
import { MarketTableComponentProps } from "./MarketTable.models";
import { withTheme } from "@devexperts/react-kit/dist/utils/withTheme";
import { useCallback, useState } from "react";
import {
  Table,
  TableRowProps,
  Column,
  TableHeaderRowProps,
} from "react-virtualized";
import { Row } from "./Row";
import { MarketTableHeader } from "./Header";

import theme from "./MarketTable-theme.module.scss";

const tableWidth = 274;
const columnCount = 3;
const columnWidth = tableWidth / columnCount;

const rowTheme = {
  container: theme.rowContainer,
  element: theme.rowElement,
};

enum CHANGE_OR_VOLUME {
  CHANGE = "CHANGE",
  VOLUME = "VOLUME",
}

const MarketTableComponent: React.FC<MarketTableComponentProps> = (props) => {
  // const [filter, setFilter] = useState();
  // const [search, setSearch] = useState<string>();
  // const [sort, setSort] = useState<string>();
  const [changeOrVolume, setChangeOrVolume] = useState<CHANGE_OR_VOLUME>(
    CHANGE_OR_VOLUME.CHANGE
  );

  const rowGetter = useCallback((s: { index: number }) => props.data[s.index], [
    props.data,
  ]);

  const rowRenderer = useCallback(
    (data: TableRowProps) => (
      <Row
        theme={rowTheme}
        key={data.key}
        elementData={data.rowData}
        style={data.style}
        changeOrVolume={changeOrVolume}
      />
    ),
    [changeOrVolume]
  );

  const headerRenderer = useCallback(
    (data: TableHeaderRowProps) => (
      <MarketTableHeader {...data} theme={rowTheme} />
    ),
    []
  );

  const clickChange = useCallback(
    (val: CHANGE_OR_VOLUME) => () => {
      setChangeOrVolume(val);
    },
    []
  );

  return (
    <div style={{ fontSize: 12 }}>
      <div className="asd">
        <label htmlFor={CHANGE_OR_VOLUME.CHANGE}>
          <input
            type="radio"
            name={"toggle"}
            id={CHANGE_OR_VOLUME.CHANGE}
            defaultChecked={changeOrVolume === CHANGE_OR_VOLUME.CHANGE}
            onClick={clickChange(CHANGE_OR_VOLUME.CHANGE)}
          />
          Change
        </label>
        <label htmlFor={CHANGE_OR_VOLUME.VOLUME}>
          <input
            type="radio"
            name={"toggle"}
            id={CHANGE_OR_VOLUME.VOLUME}
            defaultChecked={changeOrVolume === CHANGE_OR_VOLUME.VOLUME}
            onClick={clickChange(CHANGE_OR_VOLUME.VOLUME)}
          />
          Volume
        </label>
      </div>
      <Table
        headerHeight={20}
        rowGetter={rowGetter}
        rowRenderer={rowRenderer}
        columnWidth={columnWidth}
        columnCount={columnCount}
        height={333}
        rowHeight={20}
        rowCount={props.data.length}
        width={tableWidth}
        headerRowRenderer={headerRenderer}
      >
        <Column width={columnWidth} dataKey={"symbol"} label={"Symbol"} />
        <Column width={columnWidth} dataKey={"latestPrice"} label={"Price"} />
        {changeOrVolume === CHANGE_OR_VOLUME.CHANGE ? (
          <Column
            width={columnWidth}
            dataKey={"changePercent"}
            label={"Change"}
          />
        ) : (
          <Column width={columnWidth} dataKey={"volume"} label={"Volume"} />
        )}
      </Table>
    </div>
  );
};

const MarketTable = withTheme(Symbol("MarketTable"))(MarketTableComponent);

export { MarketTable, CHANGE_OR_VOLUME };
