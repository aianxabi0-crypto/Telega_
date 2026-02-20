let bots = [];

export default async function handler(req, res) {

  const update = req.body;

  for (const bot of bots) {
    if (!bot.enabled) continue;

    try {
      // выполняем пользовательский скрипт
      const fn = new Function("update", "fetch", bot.script);
      await fn(update, fetch);
    } catch (e) {
      console.error(e);
    }
  }

  res.status(200).end();
}
