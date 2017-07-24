import { EMAIL_CHANGED } from './types';

export const emailChanged = (text) =>
    ({
        type: EMAIL_CHANGED,
        payload: text
    });


