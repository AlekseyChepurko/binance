import * as React from "react";
import { MarketTable } from "./MarketTable.component";
import { pending, fold } from "@devexperts/remote-data-ts";
import { ProductService } from "./services/product";
import { useObservable } from "../../utils";
import { pipe } from "fp-ts/lib/pipeable";
import { MarketTableData } from "./services/marketTable.models";

const MarketTableFeature: React.FC = () => {
  const data = useObservable(ProductService.data$, pending);
  return (
    <>
      {pipe(
        data,
        fold<any, MarketTableData, React.ReactNode>(
          () => null,
          () => "loading",
          () => "error",
          (data) => <MarketTable data={data.data} />
        )
      )}
    </>
  );
};

export { MarketTableFeature };
