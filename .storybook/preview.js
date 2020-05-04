import * as React from 'react';
import { addParameters } from '@storybook/react';
import {ThemeProvider} from "@devexperts/react-kit/dist/utils/withTheme";

addParameters({
    decorators: [story => <ThemeProvider theme={{}}>{story()}</ThemeProvider>],
});
