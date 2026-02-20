let bots = [];

export default async function handler(req, res) {

  if (req.method === "POST") {
    const { token, script } = req.body;

    const id = Date.now();

    bots.push({
      id,
      token,
      script,
      enabled: false
    });

    return res.json({ ok: true, id });
  }

  if (req.method === "GET") {
    return res.json(bots);
  }
}
