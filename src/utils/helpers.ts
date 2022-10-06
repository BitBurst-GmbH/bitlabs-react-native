export const url = (path: string, queries: { [key: string]: string } = {}) => {
    let url = `https://api.bitlabs.ai/v1/client/${path}?platform=MOBILE`;
    Object.keys(queries).forEach((key) => url = url + `&${key}=${queries[key]}`);
    return url;
}

// TODO: Add sdk='REACT_NATIVE' parameter
export const offerWallUrl = (token: string, uid: string, tags: { [key: string]: string }) => {
    let url = `web.bitlabs.ai?token=${token}&uid=${uid}`;

    Object.keys(tags).forEach((key) => url = url + `&${key}=${tags[key]}`);
    return url;
}
