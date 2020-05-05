import React from "react";
import { PercentChange } from "../PercentChange.component";

export default {
    title: `Atoms/PercentChange`,
    component: PercentChange,
};

export const Neutral = () => (
    <PercentChange changeValue={0} />
);


export const Positive = () => (
    <PercentChange changeValue={123} />
);

export const Negative = () => (
    <PercentChange changeValue={-123} />
);

