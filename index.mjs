import f from "fastify";
import * as fs from "fs";
import * as path from "path";

const fastify = f({
  https: {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
});

fastify.get("*", {}, (req, res) => {
  const host = req.headers.host;
  const pathname = req.url;
  const filename = pathname === "/" ? "index.html" : pathname.slice(1);
  const stream = fs.createReadStream(path.resolve(host, filename));

  res.type("text/html").send(stream);
});

fastify.route({
  method: "POST",
  url: "/track",
  constraints: { host: "thirdparty.com" },
  handler: (req, res) => {
    if (typeof req.body === "string")
      res
        .header(
          "set-cookie",
          Object.entries(JSON.parse(req.body))
            .map(([key, value]) => `${key}=${value};`)
            .join("") + "Path=/;Secure;SameSite=None;Max-Age=86400;"
        )
        .header(
          "Access-Control-Allow-Origin",
          (req.headers.referer ?? "*").replace(/\/$/, "")
        )
        .header("Access-Control-Allow-Headers", "*")
        .header("Access-Control-Allow-Credentials", true)
        .send("DONE");
  },
});

const start = async () => {
  try {
    await fastify.listen({ port: 443 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
