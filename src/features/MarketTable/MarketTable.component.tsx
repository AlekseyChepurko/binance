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
import cn from "classnames";
import { Row } from "./Row";
import { MarketTableHeader } from "./Header";

import theme from "./MarketTable-theme.module.scss";

const tableWidth = 274;
const columnCount = 3;
const columnWidth = tableWidth / columnCount;

const rowTheme = {
  container: theme.rowContainer,
  element: cn(theme.rowElement, theme.headerRowCell),
};

enum CHANGE_OR_VOLUME {
  CHANGE = "CHANGE",
  VOLUME = "VOLUME",
}

enum COLUMNS {
  PAIR = "symbol",
  PRICE = "latestPrice",
  CHANGE = "changePercent",
  VOLUME = "volume",
}

interface SortInfo {
  sortBy: COLUMNS;
  sortDirection: "ASC" | "DESC";
}

const sortFactory = (
  sort: SortInfo,
  setSort: (sort: SortInfo) => void
) => (clickedSort: { sortBy: string; sortDirection: string }) => {
  /**
   * Note - typings don't pass an event but runtime does
   * so prevent any effect like spacebar press
   */
  // @ts-ignore
  if (clickedSort.event && clickedSort.event.preventDefault) {
    // @ts-ignore
    clickedSort.event.preventDefault();
  }
  let targetSort = {
    sortDirection: clickedSort.sortDirection,
    sortBy: clickedSort.sortBy,
  } as SortInfo;

  if (sort.sortBy === clickedSort.sortBy) {
    targetSort.sortDirection =
      clickedSort.sortDirection === "ASC" ? "ASC" : "DESC";
  }

  setSort(targetSort);
};

const MarketTableComponent: React.FC<MarketTableComponentProps> = (props) => {
  // const [filter, setFilter] = useState<{
  //   key: string;
  //   value: string;
  // }>();

  const [sort, setSort] = useState<SortInfo>({
    sortBy: COLUMNS.PAIR,
    sortDirection: "DESC",
  });

  const [search, setSearch] = useState<string>("");
  const [changeOrVolume, setChangeOrVolume] = useState<CHANGE_OR_VOLUME>(
    CHANGE_OR_VOLUME.CHANGE
  );

  const data = props.data
    .filter((s) => s.symbol.toLowerCase().includes(search))
    .sort((a, b) => {
      const aVal = a[sort.sortBy as keyof typeof a];
      const bVal = b[sort.sortBy as keyof typeof b];
      const compareVal = sort.sortDirection === "ASC" ? [1, -1] : [-1, 1];
      return aVal > bVal ? compareVal[0] : compareVal[1];
    });

  const rowGetter = useCallback((s: { index: number }) => data[s.index], [
    data,
  ]);

  const rowRenderer = useCallback(
    (data: TableRowProps) => (
      <Row
        theme={rowTheme}
        key={data.rowData.symbol}
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

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value.toLocaleLowerCase());
    },
    []
  );

  const onSort = useCallback(sortFactory(sort, setSort), [sort]);

  return (
    <div style={{ fontSize: 12, width: tableWidth }}>
      <div className={theme.filterContainer}>
        <input
          className={theme.filterElement}
          type="text"
          placeholder={"search"}
          onChange={onSearchChange}
        />
        <div className={theme.filterElement}>
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
        </div>
        <div className={theme.filterElement}>
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
      </div>
      <Table
        headerHeight={20}
        rowGetter={rowGetter}
        rowRenderer={rowRenderer}
        columnWidth={columnWidth}
        columnCount={columnCount}
        height={333}
        rowHeight={20}
        rowCount={data.length}
        width={tableWidth}
        headerRowRenderer={headerRenderer}
        sort={onSort}
        sortDirection={sort.sortDirection}
        sortBy={sort.sortBy}
        headerClassName={theme.headerCell}
      >
        <Column width={columnWidth} dataKey={COLUMNS.PAIR} label={"Symbol"} />
        <Column width={columnWidth} dataKey={COLUMNS.PRICE} label={"Price"} />
        {changeOrVolume === CHANGE_OR_VOLUME.CHANGE ? (
          <Column
            width={columnWidth}
            dataKey={COLUMNS.CHANGE}
            label={"Change"}
            // REST API does not provide change value
            disableSort={true}
          />
        ) : (
          <Column
            width={columnWidth}
            dataKey={COLUMNS.VOLUME}
            label={"Volume"}
            // REST API does not provide volume value
            disableSort={true}
          />
        )}
      </Table>
    </div>
  );
};

const MarketTable = withTheme(Symbol("MarketTable"))(MarketTableComponent);

export { MarketTable, CHANGE_OR_VOLUME };
