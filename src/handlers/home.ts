import { Handler } from 'types';

// Example - handler for main route.
export const home: Handler = (req, res) => {
    res.send('Hello world');
};
