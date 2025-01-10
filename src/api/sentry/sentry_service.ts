import { generateUUID4 } from '../../utils/helpers';

const request = (projectId: string, body?: string) => {
  const url = `api/${projectId}/envelope/`;

  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-sentry-envelope',
    },
    body: body,
  });
};

const createEnvelope = (_error?: Error) => {
  const eventId = generateUUID4();
  const timestamp = new Date().toISOString();

  console.log(`[Sentry] ${timestamp} - ${eventId}`);
  return `
  {lololo}
  `;
};

export const sendEnvelope = (projectId: string) => {
  fetch(request(projectId, createEnvelope()))
    .then((response) => JSON.stringify(response.json()))
    .then((body) => console.debug(body));
};
