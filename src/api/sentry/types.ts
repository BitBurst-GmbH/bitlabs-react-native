export type SendEnvelopeResponse = {
  id: string;
};

export class SentryEnvelope {
  readonly headers: SentryEnvelopeHeaders;
  readonly items: SentryEnvelopeItem[];

  constructor(headers: SentryEnvelopeHeaders, items: SentryEnvelopeItem[]) {
    this.headers = headers;
    this.items = items;
  }

  toString(): string {
    const headersJson = JSON.stringify(this.headers);
    const itemsJson = this.items.map((item) => item.toString()).join('\n');

    return `${headersJson}\n${itemsJson}`;
  }
}

interface SentryEnvelopeItem {}

export type SentryEnvelopeHeaders = {
  event_id: string;
  sent_at: string;
  dsn: string;
};

export class SentryEventItem implements SentryEnvelopeItem {
  readonly event: SentryEvent;

  constructor(event: SentryEvent) {
    this.event = event;
  }

  toString(): string {
    const eventJson = JSON.stringify(this.event);
    const itemHeadersJson = JSON.stringify({
      type: 'event',
      length: eventJson.length,
    });

    return `${itemHeadersJson}\n${eventJson}`;
  }
}

export type SentryEvent = {
  event_id: string;
  timestamp: string;
  logentry?: SentryMessage;
  level?: string;
  platform: string;
  logger?: string;
  server_name?: string;
  release?: string;
  environment?: string;
  modules?: Map<string, string>;
  extra?: Map<string, string>;
  tags?: Map<string, string>;
  fingerprint?: string[];
  user?: SentryUser;
  sdk?: SentrySDK;
  exception?: SentryException[];
};

export type SentryException = {
  type: string;
  value: string;
  module?: string;
  stacktrace?: SentryStackTrace;
  mechanism?: SentryExceptionMechanism;
};

export type SentryExceptionMechanism = {
  type: string;
  handled: boolean;
  data?: Map<string, string>;
  meta?: Map<string, string>;
};

export type SentryStackTrace = {
  frames: SentryStackFrame[];
};

export type SentryStackFrame = {
  filename?: string;
  function?: string;
  module?: string;
  lineno?: number;
  colno?: number;
  absPath?: string;
  contextLine?: string;
  preContext?: string[];
  postContext?: string[];
  inApp?: Boolean;
};

export type SentryMessage = {
  formatted: string;
  message?: string;
  params?: string[];
};

export type SentrySDK = {
  name: string;
  version: string;
};

export type SentryUser = {
  id: string;
  ip_address: string;
  email?: string;
  username?: string;
};
