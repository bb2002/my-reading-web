export const fetcher = (url: string | URL | globalThis.Request) =>
  fetch(url).then((r) => r.json());
