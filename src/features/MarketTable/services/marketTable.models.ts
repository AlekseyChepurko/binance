export type MarketTableItem = {
    baseAsset: string,
    quoteAsset: string,
    openPrice: number,
    highPrice: number,
    lowPrice: number,
    latestPrice: number,
    parentMarket: string,
    parentMarketCategory: string,
    symbol: string;
}


export type MarketTableData = {
    data: MarketTableItem[]
}
