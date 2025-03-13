import { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { allowCors } from "../cors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method != "GET") {
    res.status(405).end();
    return;
  }

  const content = readFileSync(join(process.cwd(), "posts.json"), "utf8");
  const posts = JSON.parse(content);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(posts);
};

export default allowCors(handler);
