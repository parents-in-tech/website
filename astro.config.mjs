// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const workerBanner = `
globalThis.process ??= {};
globalThis.process.env ??= {};
if (typeof globalThis.MessageChannel === "undefined") {
  class MessagePortPolyfill {
    constructor() {
      this.onmessage = null;
      this._other = null;
    }

    postMessage(data) {
      const target = this._other;
      if (target && typeof target.onmessage === "function") {
        queueMicrotask(() => target.onmessage({ data }));
      }
    }

    addEventListener(type, listener) {
      if (type === "message") {
        this.onmessage = listener;
      }
    }

    removeEventListener(type, listener) {
      if (type === "message" && this.onmessage === listener) {
        this.onmessage = null;
      }
    }

    start() {}

    close() {
      this.onmessage = null;
    }
  }

  globalThis.MessagePort ??= MessagePortPolyfill;
  globalThis.MessageChannel = class MessageChannelPolyfill {
    constructor() {
      const port1 = new MessagePortPolyfill();
      const port2 = new MessagePortPolyfill();
      port1._other = port2;
      port2._other = port1;
      this.port1 = port1;
      this.port2 = port2;
    }
  };
}
`;

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  session: {
    driver: 'memory',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          banner: workerBanner,
        },
      },
    },
    json: {
      stringify: true,
    },
  },
});
