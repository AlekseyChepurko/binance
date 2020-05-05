import * as React from "react";
import { useCallback } from "react";
import { withTheme } from "@devexperts/react-kit/dist/utils/withTheme";
import cn from "classnames";

import { SortTextProps } from "./SortText.models";
import * as defaultTheme from "./SortText-theme.module.scss";

const SortTextComponent: React.FC<SortTextProps> = React.memo((props) => {
  const { ordering, onCLick: onClickprop } = props;
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      onClickprop(ordering);
    },
    [ordering, onClickprop]
  );
  return (
    <div
      onClick={onClick}
      className={cn(
        props.theme.container,
        props.ordering === undefined
          ? null
          : props.ordering === "desc"
          ? props.theme.desc
          : props.theme.asc
      )}
    >
      {props.text}
    </div>
  );
});

const SortText = withTheme(Symbol("SortText"), defaultTheme)(SortTextComponent);

export { SortText };
