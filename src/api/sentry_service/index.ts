import { generateUUID4 } from '../../utils';
import SentryDSN from './dsn';
import {
  SentryEnvelope,
  SentryEventItem,
  type SendEnvelopeResponse,
  type SentryEvent,
  type SentryException,
} from './types';

const request = (projectId: string, body?: string) => {
  const url = `${SentryDSN.protocol}://${SentryDSN.host}/api/${projectId}/envelope/`;

  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-sentry-envelope',
      'X-Sentry-Auth': `Sentry sentry_version=7, sentry_key=${SentryDSN.publicKey}, sentry_client=bitlabs-sdk/0.1.0`,
      'User-Agent': 'bitlabs-sdk/0.1.0',
    },
    body: body,
  });
};

const createEnvelope = (token: string, uid: string, error: Error) => {
  const eventId = generateUUID4();
  const timestamp = new Date().toISOString();

  const exception: SentryException = {
    type: error.name,
    value: error.message,
    module: error.name,
    mechanism: { handled: true, type: 'generic' },
  };

  const event: SentryEvent = {
    event_id: eventId,
    timestamp: timestamp,
    platform: 'javascript',
    logentry: { formatted: error.message },
    user: { id: uid, ip_address: '{{auto}}' },
    sdk: { name: 'sentry.javascript.react_native', version: '0.1.0' },
    exception: [exception],
    tags: { token: token },
    level: 'error',
  };

  const eventItem = new SentryEventItem(event);

  const envelope = new SentryEnvelope(
    { event_id: eventId, sent_at: timestamp, dsn: SentryDSN.dsn },
    [eventItem]
  );

  return envelope.toString();
};

const sendEnvelope = (token: string, uid: string, error: Error) => {
  fetch(request(SentryDSN.projectId, createEnvelope(token, uid, error)))
    .then((response) => response.json() as Promise<SendEnvelopeResponse>)
    .then((envelope) =>
      console.log(`Sent envelope(#${envelope.id}) to Sentry!`)
    )
    .catch((e) => console.error(e));
};

const sentry = {
  captureError: sendEnvelope,
};

export default sentry;
