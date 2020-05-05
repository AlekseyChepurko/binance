import React from "react";
import { Price } from "../Price.component";

export default {
  title: `Atoms/Price`,
  component: Price,
};

export const Zero = () => <Price price={0} />;

export const LessThenZero = () => <Price price={0.0012} />;

export const MoreThenZero = () => <Price price={123.0012} />;

export const LongNumber = () => <Price price={123.001212312312312312} />;
