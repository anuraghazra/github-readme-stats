import { https } from 'follow-redirects'
import { fs } from 'fs';
export default function handler(req, res) {
  var options = {
    'method': 'POST',
    'hostname': 'api.vercel.com',
    'path': '/v1/integrations/deploy/prj_J2bHH9cKhtUEW2mUS1bdtDZFnO9r/cbVzW3rL0r',
    'headers': {
    },
    'maxRedirects': 20
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
  res.status(200).end('Hello Cron!');
}
