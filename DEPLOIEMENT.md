# Déploiement FLOKKA sur Vercel

## Ce qu'il faut faire (15 minutes)

---

### Étape 1 — Créer la base de données (Neon)

1. Va sur **[neon.tech](https://neon.tech)** → créer un compte gratuit
2. Cliquer **"New Project"** → choisir un nom (ex: `flokka`)
3. Région : **EU Central** (Frankfurt)
4. Une fois créé, dans l'onglet **"Connection Details"** :
   - Copier la **"Connection string"** (format `postgresql://...`)

---

### Étape 2 — Déployer sur Vercel

1. Va sur **[vercel.com](https://vercel.com)** → se connecter avec GitHub
2. Cliquer **"Add New Project"**
3. Chercher et sélectionner le repo **`FLOKKA`**
4. Avant de cliquer Deploy, aller dans **"Environment Variables"** et ajouter :

| Nom | Valeur |
|-----|--------|
| `DATABASE_URL` | La connection string copiée depuis Neon |
| `JWT_SECRET` | N'importe quelle chaîne longue, ex: `flokka-secret-andlau-2026` |
| `SETUP_KEY` | Un mot de passe que tu choisis, ex: `init-flokka-2026` |

5. Cliquer **"Deploy"**
6. Attendre ~2 minutes que le déploiement se termine ✓

---

### Étape 3 — Initialiser la base de données (une seule fois)

Une fois déployé, ouvrir un terminal ou utiliser curl :

```bash
curl -X POST https://TON-PROJET.vercel.app/api/setup \
  -H "Content-Type: application/json" \
  -d '{"key": "SETUP_KEY_QUE_TU_AS_CHOISI"}'
```

**Ou** utiliser un outil graphique comme [Insomnia](https://insomnia.rest/) / [Hoppscotch](https://hoppscotch.io/) pour envoyer :
- **URL** : `https://TON-PROJET.vercel.app/api/setup`
- **Méthode** : POST
- **Body JSON** : `{ "key": "SETUP_KEY_QUE_TU_AS_CHOISI" }`

La réponse te donnera :
```json
{
  "success": true,
  "credentials": {
    "email": "admin@flokka.fr",
    "password": "admin123"
  },
  "clubs": [
    { "name": "Badminton Club de Barr", "code": "BCB2024" },
    { "name": "FC Andlau", "code": "FCA2024" }
  ]
}
```

---

### Étape 4 — Se connecter au back-office

1. Aller sur `https://TON-PROJET.vercel.app/admin`
2. Email : `admin@flokka.fr`
3. Mot de passe : `admin123`
4. **Changer le mot de passe immédiatement** via le back-office

---

## Développement local avec la base de données Neon

Pour développer en local contre la même base PostgreSQL :

1. Copier `.env.example` en `.env`
2. Remplir `DATABASE_URL` avec la connection string Neon
3. Remplir `JWT_SECRET` et `SETUP_KEY`
4. `npm run dev`

---

## Variables d'environnement requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL PostgreSQL (Neon ou autre) | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Clé secrète pour les tokens admin | `flokka-secret-2026` |
| `SETUP_KEY` | Clé pour l'initialisation one-shot | `init-flokka-2026` |
