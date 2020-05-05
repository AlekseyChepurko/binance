import * as t from "io-ts";
import { MarketTableData } from "../marketTable.models";

const ProductItemDTOIO = t.type({
  // base asset
  b: t.string,
  // quote asset
  q: t.string,
  // open price
  o: t.number,
  // high price
  h: t.number,
  // low price
  l: t.number,
  // latest price
  c: t.number,
  // parent market
  pm: t.string,
  // category of the parent market
  pn: t.string,
  // symbol ?
  s: t.string,
});

const ProductsDataDTOIO = t.array(ProductItemDTOIO);

const ProductsDTOIO = t.type({
  response: t.type({ data: t.array(ProductItemDTOIO) }),
});

export type ProductItemDTO = t.TypeOf<typeof ProductItemDTOIO>;

export type ProductsDataDTO = t.TypeOf<typeof ProductsDataDTOIO>;

export type ProductsDTO = t.TypeOf<typeof ProductsDTOIO>;

const mapProductsDTO = (productsDto: ProductsDTO): MarketTableData => {
  return {
    data: productsDto.response.data.map((product) => ({
      baseAsset: product.b,
      quoteAsset: product.q,
      openPrice: product.o,
      highPrice: product.h,
      lowPrice: product.l,
      latestPrice: product.c,
      parentMarket: product.pm,
      parentMarketCategory: product.pn,
      symbol: product.s,
    })),
  };
};

export { ProductsDataDTOIO, ProductsDTOIO, mapProductsDTO };
