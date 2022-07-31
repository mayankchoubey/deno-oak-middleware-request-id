import { Middleware } from "https://deno.land/x/oak/mod.ts";

let requestIdKey = "X-Request-ID";

/** A middleware that will generate set a request ID in the context state
 * and response header.
 *
 * ```ts
 * import {
 *   requestIdMiddleware,
 *   getRequestIdKey,
 *   setRequestIdKey } from "https://deno.land/x/oak-middleware-request-id/mod.ts";
 * import { Application } from "https://deno.land/x/oak/mod.ts"
 *
 * // optionally change the key name
 * setRequestIdKey('X-some-other-request-id-name');
 *
 * const app = new App();
 * app.use(requestIdMiddleware);
 *
 * // other middlewares
 * app.use((ctx) => {
 *   console.log('Got request with ID', ctx.state[getRequestIdKey()]);
 *   ctx.response.body = "Hello world!";
 * });
 *
 * await app.listen({ port: 8080 });
 * ```
 */

export const setRequestIdKey = (headerName: string) => {
  requestIdKey = headerName;
};

export const getRequestIdKey = (): string => requestIdKey;

export const requestIdMiddleware: Middleware = async (ctx, next) => {
  const reqId = crypto.randomUUID();
  ctx.state[getRequestIdKey()] = reqId;
  await next();
  ctx.response.headers.set(getRequestIdKey(), reqId);
};
