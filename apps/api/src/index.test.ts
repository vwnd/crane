import { expect, it } from "bun:test";
import { testClient } from "hono/testing";
import app from ".";

it("returns hello world", async () => {
  const client = testClient(app);

  const res = await client.index.$get();

  expect(await res.text()).toBe("Hello Hono!");
});
