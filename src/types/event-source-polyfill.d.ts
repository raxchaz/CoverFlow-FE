interface EventSourcePolyfillConfig {
  withCredentials?: boolean;
  headers?: Record<string, string>;
}

declare module 'event-source-polyfill' {
  export class EventSourcePolyfill extends EventSource {
    constructor(url: string, config?: EventSourcePolyfillConfig);
  }
}
