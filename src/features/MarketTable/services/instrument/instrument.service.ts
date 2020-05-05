import { webSocket } from "rxjs/webSocket";
import * as e from "fp-ts/lib/Either";
import { findFirst } from "fp-ts/lib/Array";
import {
  Instrument,
  InstrumentDTOIO,
  InstrumentMessage,
  mapInstrumentDTO,
} from "./instrument.dto";
import { filter, map, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";

class InstrumentServiceConstructor {
  socket$ = webSocket<InstrumentMessage>(
    "wss://stream.binance.com/stream?streams=!miniTicker@arr"
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  private instrumentMap: Record<string, Observable<any>> = {};

  getInstrumentDataStream = (
    symbol: string
    // initialValue: Instrument
  ): Observable<Instrument> => {
    if (!this.instrumentMap[symbol]) {
      // console.log('caching');
      this.instrumentMap[symbol] = this.socket$.pipe(
        map((message) => message.data),
        map(findFirst((instrument) => instrument.s === symbol)),
        map(e.fromOption(() => [])),
        map(e.chain(InstrumentDTOIO.decode)),
        map(e.map(mapInstrumentDTO)),
        filter(e.isRight),
        map((val) => val.right),
        shareReplay({ refCount: true, bufferSize: 1 })
        // startWith(initialValue)
      );
    }
    return this.instrumentMap[symbol];
  };
}

const InstrumentService = new InstrumentServiceConstructor();

export { InstrumentService };
