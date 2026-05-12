# Déploiement — pauldena.fr

Site statique Astro 5. Déployé sur **Netlify** (projet `pauldena-preview` sous l'équipe Triskell).

## État actuel

- **Projet Netlify :** `pauldena-preview` ([admin](https://app.netlify.com/projects/pauldena-preview))
- **Project ID :** `4fde2313-06b3-4e6f-89a5-33f6150a9d56`
- **URL temporaire :** https://pauldena-preview.netlify.app
- **Domaine final visé :** `pauldena.fr` (à acheter et brancher)
- **Dossier local lié** via `.netlify/state.json`

## Commandes courantes

```bash
# Build local
npm run build

# Déployer une preview (draft URL unique)
netlify deploy --dir=dist

# Déployer en production (écrase l'URL principale)
netlify deploy --dir=dist --prod
```

## Avant de pousser en prod

1. **Variable d'env Formspree** — dans [Site settings → Environment variables](https://app.netlify.com/projects/pauldena-preview/settings/env), ajouter :
   - `PUBLIC_FORMSPREE_ID` = `<ton-id-formspree>`
2. **Mentions légales** — remplacer les `[entre crochets]` dans `src/pages/mentions-legales.astro` (SIRET, statut, adresse, hébergeur = Netlify, Inc.).
3. **Renommer le projet** sur Netlify (de `pauldena-preview` → `pauldena`) une fois le site validé.
4. **Domaine custom** — Settings → Domain management → Add `pauldena.fr` + `www.pauldena.fr`, puis suivre les instructions DNS chez le registrar.

## Régénérer les assets

```bash
# OG image 1200x630 (à relancer si tu changes hero-portrait.jpg)
node scripts/build-og.mjs

# Vidéos YouTube — fetch RSS automatique à chaque build
npm run build
```

## Configs présentes

- `netlify.toml` — build command, headers de sécurité, cache long pour photos.
- `vercel.json` — fallback Vercel (inutilisé tant qu'on reste sur Netlify).
- `.env.example` — gabarit pour `PUBLIC_FORMSPREE_ID`.

## Checklist pré-prod

- [ ] `PUBLIC_FORMSPREE_ID` défini en production
- [ ] Mentions légales finalisées (SIRET, hébergeur Netlify Inc.)
- [ ] Politique de confidentialité relue
- [ ] DNS `pauldena.fr` pointe vers Netlify
- [ ] HTTPS auto activé
- [ ] OG image testée via [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Lighthouse mobile > 90
