# Logo FLOKKA

Déposez ici le logo officiel, en **un seul fichier** :

- `logo.svg` (idéal — vectoriel, net à toutes les tailles), **ou**
- `logo.png` (PNG transparent haute résolution).

Version **bleu marine** (monochrome). Sur le footer (fond foncé), le logo est
automatiquement affiché en blanc via un filtre CSS — pas besoin d'un second fichier.

Le composant `src/components/ui/Logo.tsx` détecte et utilise ce fichier
automatiquement. En son absence, le mot « FLOKKA » est affiché en repli.
