# Configure Your Vercel Deployment

This guide covers the most common tweaks you can apply after deploying your fork of `github-readme-stats` to Vercel. It assumes the project is already imported into Vercel and has a successful deployment.

## 1. Update Environment Variables

1. Open your project in the [Vercel dashboard](https://vercel.com/dashboard) and select `Settings > Environment Variables`.
2. Add or update the variables below. Use the `Production` environment unless you have a specific preview workflow.
3. After saving, redeploy your project so the new values are picked up (see [Redeploy](#3-redeploy-to-apply-changes)).

| Key | Suggested value | Purpose |
| --- | --- | --- |
| `PAT_1` | GitHub Personal Access Token with `repo` and `user` scopes | Required to unlock higher rate limits and include private stats. Use the [classic token instructions](../readme.md#classic-token).
| `PAT_2`, `PAT_3`, ... | Additional PATs with the same scopes | Optional: rotate through multiple tokens to minimize hitting rate limits. GRS automatically discovers `PAT_*` variables.
| `DEFAULT_USERNAME` | `g8rdier` | Sets the username used when no `?username=` query is provided. Required to make URLs shorter in your README.
| `DEFAULT_INCLUDE_ALL_COMMITS` | `true` | Ensures lifetime commits are counted without adding `&include_all_commits=true` to every URL.
| `DEFAULT_COUNT_PRIVATE` | `true` | Forces private contributions to be included by default (requires PAT with `repo` scope).
| `DEFAULT_REPO_AFFILIATIONS` | `OWNER,COLLABORATOR,ORGANIZATION_MEMBER` | Pulls stats and languages from every repository you have access to, not just the ones you own.
| `CACHE_SECONDS` | `1` | Sets the global cache override to 1 second (the lowest practical value) for near real-time refreshes.
| `WHITELIST` | Comma-separated list of GitHub usernames | Restricts who can call your instance. Leave unset to allow everyone.
| `GIST_WHITELIST` | Comma-separated list of gist IDs | Restricts gist requests to the provided IDs.
| `FETCH_MULTI_PAGE_STARS` | `true` | Enables fetching starred repositories beyond the first page; helpful for accounts with many stars.

> **Security tip:** Treat PATs like passwords. Store them in Vercel environment variables only; never commit them to the repository.

## 2. Adjust Caching Per Card (Optional)

Every API route also accepts a `cache_seconds` query parameter. Use this when you want different cache durations per card without changing the global `CACHE_SECONDS` value.

Example URL:

```md
<img src="https://your-instance.vercel.app/api?username=g8rdier&cache_seconds=900&count_private=true" />
```

## 3. Redeploy to Apply Changes

Once you modify environment variables:

1. Go to the `Deployments` tab in Vercel.
2. Click the vertical ellipsis next to the latest deployment and choose `Redeploy`.
3. Confirm the environment (`Production`) and start the redeploy. Vercel will rebuild with the new configuration.

Alternatively, push a new commit to trigger an automatic deploy.

## 4. Update Your README Links

Point your README badges and images to your instance and pass the desired query parameters:

```md
<img src="https://your-instance.vercel.app/api?username=g8rdier&show_icons=true&count_private=true&include_all_commits=true" />
```

Key parameters to remember:

- `count_private=true` to include private contributions (requires PAT with `repo` scope).
- `include_all_commits=true` to show lifetime commits instead of the past year.
- `cache_seconds=<value>` to override the cache for that specific card.

## 5. Keep Your Deployment Healthy

- **Monitor usage:** Vercel's analytics and logs help spot rate-limit or token issues quickly.
- **Rotate PATs:** Regenerate tokens periodically and update the corresponding environment variables.
- **Sync upstream changes:** Regularly pull from the upstream repository so your fork stays current. After syncing, redeploy to pick up fixes and features.

With these steps your deployed instance stays flexible, secure, and tailored to your profile.
