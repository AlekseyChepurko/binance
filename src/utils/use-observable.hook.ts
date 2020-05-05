import {useObservable as useObs} from '@devexperts/react-kit/dist/utils/use-observable';
import { instanceObservable } from "@devexperts/rx-utils/dist/observable.utils";
import { Observable } from "rxjs";
import {useCallback, useEffect, useMemo, useState} from "react";

// const useObservable = useObs(instanceObservable);

const useObservable = <A>(fa: Observable<A>, initial: A): A => {
    const [value, setValue] = useState(() => initial);
    const subscription = useMemo(
        () =>
            fa.subscribe(a => {
                setValue(() => a);
            }),
        [fa, setValue],
    );
    useEffect(() => () => subscription.unsubscribe(), [subscription]);
    return value;
};

export { useObservable };
