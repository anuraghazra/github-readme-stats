Get dynamically generated GitHub stats on your READMEs, with the ease of docker!

Fork of [https://github.com/anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats), gently wrapped in docker.

Now as an image on Docker Hub.

**Steps to setup:**
* add the readme_stats service to your existing docker-compose.yml.
* configure your .env to have `PAT_1=<YOUR_GITHUB_TOKEN>`.
* optionally configure `port`, and `github_username`
* update your existing Caddyfile.
* and start with `docker compose up -d`.

docker-compose.yml.example, Caddyfile.example, and env.example have a very simple working example using Caddy reverse proxy.

Files have example in their name, so that when you update, your local settings won't be overridden.

```
git clone https://code.digitaladapt.com/andrew/github-readme-stats.git
cd github-readme-stats
cp docker-compose.yml.example docker-compose.yml
cp env.example .env
vim .env
# add your github token

cp Caddyfile.example Caddyfile
vim Caddyfile
# configure your domain

docker compose up -d
```

