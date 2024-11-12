import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
    body: {
        margin: 0,
        padding: 0,
        color: 'magenta',
    },
    '#__next': {
        paddingTop: '$paddingTop',
        paddingLeft: '$paddingLeft',
    },
});
