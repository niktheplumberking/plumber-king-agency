# Client sites (all future client sites live here)

Each client is its own app in its own folder; the agency site at the repo root ignores this folder (tsconfig exclude).

| Folder | Client | Copied from | Live preview |
|---|---|---|---|
| `united-plumbing-site/` | United Plumbing (Jim, Pomona CA), Astro, 52 pages | branch `claude/project-thread-lela0k` @ 72cbf34 | https://united-plumbing-pomona.vercel.app |
| `plumbing-by-paul-v3/` | Plumbing by Paul (St. Petersburg FL), 30 pages | branch `claude/project-thread-onzaga` @ 5f0d5f7 | https://plumbing-by-paul.vercel.app |

The rejected Paul v2 (`plumbing-by-paul-site/`) stays only on `claude/project-thread-onzaga`.
The Vercel projects still deploy from those branches until someone repoints them.
New client: add `clients/<client-slug>/` here.
