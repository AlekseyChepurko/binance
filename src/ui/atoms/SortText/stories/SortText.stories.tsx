import React from "react";
import { SortText } from "../SortText.component";
import { action } from "@storybook/addon-actions";

export default {
  title: `Atoms/SortText`,
  component: SortText,
};

export const NoOrdering = () => (
  <SortText onCLick={action("No Order click")} text={"No Order"} />
);

export const AscOrdering = () => (
  <SortText
    onCLick={action("Asc Order click")}
    ordering={"asc"}
    text={"Asc Order"}
  />
);

export const DescOrdering = () => (
  <SortText
    onCLick={action("Desc Order click")}
    ordering={"desc"}
    text={"Desc Order"}
  />
);
