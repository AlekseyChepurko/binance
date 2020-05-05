import * as t from "io-ts";

const InstrumentDTOIO = t.type({
  // quote asset
  q: t.string,
  // open price. numberic string
  o: t.string,
  // high price. numberic string
  h: t.string,
  // low price. numberic string
  l: t.string,
  // latest price. numberic string
  c: t.string,
  // symbol ?
  s: t.string,
  E: t.number,
  e: t.string,
  v: t.string,
});

export type InstrumentDTO = t.TypeOf<typeof InstrumentDTOIO>;

export type Instrument = {
  quoteAsset: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  latestPrice: number;
  symbol: string;
};

const mapInstrumentDTO = (instrumentDto: InstrumentDTO): Instrument => {
  return {
    quoteAsset: instrumentDto.q,
    openPrice: parseFloat(instrumentDto.o),
    highPrice: parseFloat(instrumentDto.h),
    lowPrice: parseFloat(instrumentDto.l),
    latestPrice: parseFloat(instrumentDto.c),
    symbol: instrumentDto.s,
    //
    // E: t.number,
    // e: t.string,
    // v: t.string,
  };
};

export type InstrumentMessage = {
  data: InstrumentDTO[];
};

export { mapInstrumentDTO, InstrumentDTOIO };
