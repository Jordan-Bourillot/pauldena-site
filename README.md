# Paul Dena — site officiel

Site vitrine de Paul Denis Navero (combattant MMA pro). Stack **Astro 5** + CSS vanilla, sans dépendance JS lourde.

## Structure

```
src/
├── data/profile.ts        Source unique de vérité (profil, réseaux, palmarès)
├── layouts/Base.astro     Layout commun (head, header, footer, slot)
├── components/
│   ├── Header.astro       Nav sticky avec état actif
│   ├── Footer.astro       Footer + SocialBar
│   ├── SocialBar.astro    Boutons réseaux (3 tailles : sm / md / lg)
│   ├── FightCard.astro    Carte combat (résultat, événement, vs, vidéo)
│   └── VideoCard.astro    Carte vidéo (thumbnail, source, date)
├── pages/
│   ├── index.astro        Hero + dernier combat + 3 piliers
│   ├── parcours.astro     Bio + timeline + facts
│   ├── combats.astro      Record + liste FightCard
│   ├── videos.astro       Grid VideoCard + filtres par source
│   ├── sponsors.astro     Audience, formats, CTA
│   └── contact.astro      Channels email + formulaire + socials
└── styles/global.css      Tokens (couleurs, fontes), reset, classes utils
```

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → ./dist
npm run preview
```

## À faire avant la mise en prod

- [ ] Compléter `src/data/profile.ts` : palmarès officiel (`fights`), bio détaillée
- [ ] Remplacer la liste statique de `pages/videos.astro` par un feed dynamique (RSS YouTube + scraping ou Instagram Graph API)
- [ ] Brancher le formulaire contact (Formspree, Resend, ou route serveur Astro)
- [ ] Ajouter les vraies stats audience dans `pages/sponsors.astro` (sources : Instagram Insights, TikTok Studio, YouTube Studio)
- [ ] Photos hero + visuels combats (utiliser les médias téléchargés via `Telecharger_Reseaux.exe`, dans `Desktop/Telechargements_Reseaux/`)
- [ ] OG image dédiée + favicon final (le SVG actuel est un placeholder)
- [ ] Vérifier le domaine `pauldena.fr` (configuré dans `astro.config.mjs`) — à ajuster si besoin
- [ ] Mentions légales + politique de confidentialité

## Identité visuelle

- Fond : `#0a0a0a` (noir profond)
- Accent principal : `#dc2626` (rouge sang — combat)
- Accent secondaire : `#eab308` (or — récompense)
- Texte : `#f5f5f5` / dim `#a3a3a3`
- Typo display : **Bebas Neue** (titres, chiffres) — fond : system stack
