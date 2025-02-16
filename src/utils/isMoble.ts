import { CustomRequest } from 'sn-types-backend';

export function isMoblieValidator(req: CustomRequest) {
    const ua = req.useragent;
    const isMoble = req.useragent?.isMobile;

    const isBrowser =
        ua?.isChrome || ua?.isFirefox || ua?.isSafari || ua?.isEdge || ua?.isOpera || ua?.isIE;

    return isMoble && isBrowser;
}
