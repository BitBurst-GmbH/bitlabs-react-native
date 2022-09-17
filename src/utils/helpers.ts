export const url = (path: string, queries: Map<string, string | number> = new Map()) => {
    let url = `https://api.bitlabs.ai/v1/client/${path}?platform=MOBILE`;
    queries.forEach((value, key) => url = url + `${key}=${value}`);
    return url;
}