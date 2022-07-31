# Oak middleware - Request ID
A Deno Oak middleware for generating request ID, and then saving it in the context state, as well as adding it in the response headers.

 ```ts
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
```

# APIs
## getRequestIdKey
Gets the key for request ID. Default is 'X-Request-ID'.

```ts
getRequestIdKey();
```

## setRequestIdKey
Changes the key name for request ID. If not changed, the default is 'X-Request-ID'.

```ts
setRequestIdKey("X-some-other-request-id-name");
```

## requestIdMiddleware
The middleware function that generates request ID, saves it in context state and then in the response headers.

```ts
app.use(requestIdMiddleware);
```
