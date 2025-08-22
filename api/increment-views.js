import { createClient } from "contentful-management";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
    const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "main";
    const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    const client = createClient({ accessToken: MANAGEMENT_TOKEN });
    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT);
    const entry = await env.getEntry(postId);

    const current =
      entry.fields.views && entry.fields.views[LOCALE]
        ? entry.fields.views[LOCALE]
        : 0;

    entry.fields.views = {
      ...(entry.fields.views || {}),
      [LOCALE]: current + 1,
    };

    const updated = await entry.update();
    await updated.publish();

    res.status(200).json({ ok: true, views: updated.fields.views[LOCALE] });
  } catch (err) {
    console.error("incrementViews error:", err.message);
    res.status(500).json({ error: "Failed to increment views" });
  }
}
