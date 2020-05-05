import { useObservable as useObservableConstructor } from "@devexperts/react-kit/dist/utils/use-observable";
import { instanceObservable } from "@devexperts/rx-utils/dist/observable.utils";
import { Observable } from "rxjs";
import { useEffect, useState } from "react";

const useObservable = useObservableConstructor(instanceObservable);

const useObservableOnMount = <A>(fa: Observable<A>, initial: A): A => {
  const [value, setValue] = useState(() => initial);
  useEffect(() => {
    const subscription = fa.subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [fa]);
  return value;
};

export { useObservable, useObservableOnMount };
