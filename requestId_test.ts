import {
  getRequestIdKey,
  requestIdMiddleware,
  setRequestIdKey,
} from "https://deno.land/x/oak-middleware-request-id/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

// optionally change the key name
setRequestIdKey("X-some-other-request-id-name");

const app = new Application();
app.use(requestIdMiddleware);

// other middlewares
app.use((ctx) => {
  console.log("Got request with ID", ctx.state[getRequestIdKey()]);
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 8080 });
