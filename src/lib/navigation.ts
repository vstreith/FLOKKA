export interface NavLink {
  href: string
  label: string
}

/** Navigation principale (header) — volontairement concise. */
export const MAIN_NAV: NavLink[] = [
  { href: '/flocage-textile-alsace', label: 'Le flocage' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/reassort-a-la-demande', label: 'Réassort' },
  { href: '/clubs-sportifs', label: 'Clubs & assos' },
  { href: '/contact', label: 'Contact' },
]

/** Pied de page — maillage interne riche. */
export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Le flocage',
    links: [
      { href: '/flocage-textile-alsace', label: 'Notre flocage flex' },
      { href: '/tarifs', label: 'Tarifs' },
      { href: '/reassort-a-la-demande', label: 'Réassort à la demande' },
      { href: '/textile-personnalise-alsace', label: 'Textile personnalisé Alsace' },
      { href: '/services', label: 'Tous nos services' },
    ],
  },
  {
    title: 'Pour qui',
    links: [
      { href: '/clubs-sportifs', label: 'Clubs sportifs' },
      { href: '/associations', label: 'Associations' },
      { href: '/entreprises', label: 'Entreprises & commerces' },
      { href: '/boutique-privee', label: 'Mon espace réassort' },
    ],
  },
  {
    title: 'Centre Alsace',
    links: [
      { href: '/textile-personnalise-selestat', label: 'Sélestat' },
      { href: '/textile-personnalise-obernai', label: 'Obernai' },
      { href: '/textile-personnalise-barr', label: 'Barr' },
      { href: '/textile-personnalise-erstein', label: 'Erstein' },
      { href: '/flocage-textile-bas-rhin', label: 'Flocage Bas-Rhin' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/partenaires', label: 'Réalisations' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

/** Routes marketing statiques indexables (pour le sitemap). Les pages locales viennent de LOCAL_AREAS. */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/flocage-textile-alsace', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/textile-personnalise-alsace', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tarifs', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/reassort-a-la-demande', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/clubs-sportifs', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/associations', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/entreprises', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/a-propos', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/partenaires', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/boutique-privee', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
]
