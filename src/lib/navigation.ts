export interface NavLink {
  href: string
  label: string
}

/** Navigation principale (header) — volontairement concise. */
export const MAIN_NAV: NavLink[] = [
  { href: '/clubs-sportifs', label: 'Clubs sportifs' },
  { href: '/associations', label: 'Associations' },
  { href: '/flocage-textile-alsace', label: 'Flocage Alsace' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

/** Pied de page — maillage interne riche. */
export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Solutions',
    links: [
      { href: '/clubs-sportifs', label: 'Boutique club sportif' },
      { href: '/associations', label: 'Boutique association' },
      { href: '/entreprises', label: 'Entreprises & collectivités' },
      { href: '/boutique-privee-club', label: 'Boutique privée club' },
      { href: '/boutique-privee', label: 'Accéder à ma boutique' },
    ],
  },
  {
    title: 'Savoir-faire',
    links: [
      { href: '/flocage-textile-alsace', label: 'Flocage textile Alsace' },
      { href: '/textile-personnalise-alsace', label: 'Textile personnalisé Alsace' },
      { href: '/flocage-textile-bas-rhin', label: 'Flocage Bas-Rhin' },
      { href: '/services', label: 'Tous nos services' },
    ],
  },
  {
    title: 'Zones desservies',
    links: [
      { href: '/textile-personnalise-strasbourg', label: 'Strasbourg' },
      { href: '/textile-personnalise-colmar', label: 'Colmar' },
      { href: '/textile-personnalise-obernai', label: 'Obernai' },
      { href: '/textile-personnalise-selestat', label: 'Sélestat' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/partenaires', label: 'Partenaires' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

/** Routes marketing statiques indexables (pour le sitemap). */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/clubs-sportifs', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/associations', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/entreprises', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/boutique-privee-club', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/flocage-textile-alsace', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/textile-personnalise-alsace', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/a-propos', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/partenaires', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/boutique-privee', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
]
