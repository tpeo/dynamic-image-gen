import { IncomingMessage } from 'http';
import { parse } from 'url';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    extension = arr.pop() as string;

    const parsedRequest = {
        extension: extension,
        query: query,
    };
    return parsedRequest;
}
