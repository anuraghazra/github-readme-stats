export default function handler(req, res) {
  req.end();
  res.status(200).end('Hello Cron!');
}
