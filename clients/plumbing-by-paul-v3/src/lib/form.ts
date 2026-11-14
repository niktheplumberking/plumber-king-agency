// Form behaviour config (read at build). PUBLIC_FORM_ENDPOINT unset = preview: validate then go to /thank-you.
export const FORM_ENDPOINT = (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) || '';
export const THANK_YOU = '/thank-you';
