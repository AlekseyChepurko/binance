import { Observable } from "rxjs";
import { useEffect, useState } from "react";

const useObservable = <A>(fa: Observable<A>, initial: A): A => {
  const [value, setValue] = useState(() => initial);
  useEffect(() => {
    const subscription = fa.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [fa]);
  return value;
};

export { useObservable };
