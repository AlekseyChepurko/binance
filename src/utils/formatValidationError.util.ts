import * as e from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { formatValidationError } from "io-ts-reporters";
import * as o from "fp-ts/lib/Option";
import { Either } from "fp-ts/lib/Either";
import { Errors } from "io-ts";

const formatValidationErrorUtil = <T = any>(es: Either<Errors, T>) =>
  pipe(
    es,
    e.mapLeft((errors) =>
      pipe(
        errors[0],
        formatValidationError,
        o.getOrElse(() => "unknown error")
      )
    )
  );

export { formatValidationErrorUtil };
