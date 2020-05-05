import {MarketTableItem} from './services/marketTable.models';

export type PairItem = {
    pair: [string, string];
    price: number;
    changePercent: number;
    symbol: string;
};

type MarketTableTheme = {}

export type MarketTableComponentProps = {
    // data: PairItem[];
    data: MarketTableItem[];
    theme: MarketTableTheme;
};
