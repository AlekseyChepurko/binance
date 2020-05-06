import * as React from "react";
import { TableHeaderRowProps } from "react-virtualized";

type MarketTableHeaderProps = TableHeaderRowProps & {
  theme: {
    container?: string;
    element?: string;
  };
};

const MarketTableHeader: React.FC<MarketTableHeaderProps> = (props) => {
  return (
    <div className={props.theme.container}>
      {props.columns.map((column, i) => (
        <span key={i} className={props.theme.element}>
          {column}
        </span>
      ))}
    </div>
  );
};

export { MarketTableHeader };
