const fs = require("fs");
const { resolve: pathResolve } = require("path");
const { env: envData } = require("./env");

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "production") {
  console.info("setting up runtime enviroment");
  const FRONTEND_BUILD_PATH = pathResolve(__dirname, "..", "frontend", "build");
  fs.writeFileSync(
    pathResolve(FRONTEND_BUILD_PATH, "runtime_env.js"),
    envData,
    {
      encoding: "utf8",
    }
  );
} else {
  throw new Error("NODE_ENV must be 'production'");
}
