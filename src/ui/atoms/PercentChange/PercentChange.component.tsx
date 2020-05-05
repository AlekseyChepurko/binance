import * as React from "react";
import cn from "classnames";
import { withTheme } from "@devexperts/react-kit/dist/utils/withTheme";

import { PercentChangeProps } from "./PercentChange.models";
import * as defaultTheme from "./PercentChange-theme.module.scss";

const PercentChangeComponent: React.FC<PercentChangeProps> = React.memo(
  (props) => {
    const isChangeNegative = props.changeValue < 0;
    return (
      <span
        className={cn(
          props.theme.container,
          isChangeNegative ? props.theme.negativeRate : props.theme.positiveRate
        )}
      >
        {props.changeValue < 0
          ? props.changeValue.toFixed(2)
          : `+${props.changeValue.toFixed(2)}`}
        %
      </span>
    );
  }
);

const PercentChange = withTheme(
  Symbol("PercentChangeComponent"),
  defaultTheme
)(PercentChangeComponent);

export { PercentChange };
