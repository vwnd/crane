import { Hono } from "hono";
import { auth } from "./auth";
import { cors } from "hono/cors";

interface AppContext {
  Bindings: Env;
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

const app = new Hono<AppContext>()
  .use(
    "/api/auth/*",
    cors({
      origin: "http://localhost:3000",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      await next();
      return;
    }
    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  })
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .on(["POST", "GET"], "/api/*", (c) => auth.handler(c.req.raw));

export default app;
