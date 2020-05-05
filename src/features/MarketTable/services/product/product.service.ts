import {Observable, of} from "rxjs";
import { catchError, map, shareReplay, startWith } from "rxjs/operators";
import * as e from "fp-ts/lib/Either";

import {
  failure,
  RemoteData,
  success,
  pending,
} from "@devexperts/remote-data-ts";
import { MarketTableData } from "../marketTable.models";
import { ajax } from "rxjs/ajax";
import { formatValidationErrorUtil } from "../../../../utils";
import { mapProductsDTO, ProductsDTOIO } from "./product.dto";

class ProductsServiceConstructor {
  data$: Observable<RemoteData<string, MarketTableData>> = ajax(
    "/api/exchange-api/v1/public/asset-service/product/get-products"
  ).pipe(
    map(ProductsDTOIO.decode),
    map(e.map(mapProductsDTO)),
    map(formatValidationErrorUtil),
    map(
      e.fold<string, MarketTableData, RemoteData<string, MarketTableData>>(
        failure,
        success
      )
    ),
    catchError(() => of(failure("error while loading products"))),
    startWith(pending),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}

const ProductService = new ProductsServiceConstructor();

export { ProductService };
