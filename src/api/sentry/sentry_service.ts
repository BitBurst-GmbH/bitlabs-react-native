import { generateUUID4 } from '../../utils/helpers';
import SentryDSN from '../sentry/dsn';
import { SentryEnvelope, SentryEventItem, type SentryEvent } from './types';

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

const createEnvelope = (_error?: Error) => {
  const eventId = generateUUID4();
  const timestamp = new Date().toISOString();

  const event: SentryEvent = {
    event_id: eventId,
    timestamp: timestamp,
    platform: 'javascript',
    logentry: { formatted: 'Error: Test' },
    user: { id: '1', ip_address: '{{auto}}' },
    sdk: { name: 'sentry.javascript.react_native', version: '0.1.0' },
    tags: new Map([['token', 'value']]),
    level: 'error',
  };

  const eventItem = new SentryEventItem(event);

  const envelope = new SentryEnvelope(
    { event_id: eventId, sent_at: timestamp, dsn: SentryDSN.dsn },
    [eventItem]
  );

  console.log(`[Sentry] Sending envelope: ${envelope.toString()}`);
  return envelope.toString();
};

export const sendEnvelope = () => {
  fetch(request(SentryDSN.projectId, createEnvelope()))
    .then((response) => response.json())
    .then((json) => JSON.stringify(json))
    .then((string) => console.log(`[Sentry] Response: ${string}`))
    .catch((error) => console.error(error));
};
