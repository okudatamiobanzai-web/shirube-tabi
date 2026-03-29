import { execSync } from "child_process";
process.chdir("/Users/Ryutaro/shirube-tabi");
execSync("/opt/homebrew/bin/node node_modules/.bin/next dev", { stdio: "inherit", env: { ...process.env, PATH: "/opt/homebrew/bin:" + process.env.PATH } });
