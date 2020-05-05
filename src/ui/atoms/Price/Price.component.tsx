import * as React from "react";
import { withTheme } from "@devexperts/react-kit/dist/utils/withTheme";

import { PriceProps } from "./Price.models";
import * as defaultTheme from "./Price-theme.module.scss";

const PriceComponent: React.FC<PriceProps> = React.memo((props) => (
  <span className={props.theme.container}>{props.price.toFixed(8)}</span>
));

const Price = withTheme(Symbol("PriceComponent"), defaultTheme)(PriceComponent);

export { Price };
