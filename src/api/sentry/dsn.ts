const dsn =
  'https://88f2be5e178991997af5310d29ac54d1@o494432.ingest.us.sentry.io/4508636149907456';

const [protocol, publicKey, host, projectId] = (function () {
  const regex = /(\w+):\/\/(\w+)@(.*)\/(\w+)/;
  const match = regex.exec(dsn);

  if (!match) {
    throw new Error('Invalid DSN: ' + dsn);
  }

  const [_protocol, _publicKey, _host, _projectId] = match.slice(1);

  return [_protocol ?? '', _publicKey ?? '', _host ?? '', _projectId ?? ''];
})();

export default { dsn, protocol, publicKey, host, projectId };
