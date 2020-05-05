import * as React from 'react';

export type SortTextProps = {
    theme: {
        container?: string;
        desc?: string;
        asc?: string;
    };
    ordering?: 'desc' | 'asc';
    text: string;
    onCLick: (ordering: SortTextProps['ordering']) => void;
};
