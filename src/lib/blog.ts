export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  h1: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  readingMinutes: number
  tags: string[]
  blocks: BlogBlock[]
  faq?: { question: string; answer: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'financer-association-boutique-textile',
    title: 'Comment financer son association avec une boutique textile',
    h1: 'Comment financer son association avec une boutique textile',
    description:
      "Une boutique textile privée peut devenir une source de financement simple et récurrente pour votre association. Voici comment, grâce à une marge reversée et au réassort à l'unité.",
    datePublished: '2026-01-12',
    author: 'FLOKKA',
    readingMinutes: 6,
    tags: ['association', 'financement', 'boutique privée'],
    blocks: [
      {
        type: 'p',
        text: "Le financement est le nerf de la guerre pour une association. Entre les cotisations, les subventions et les événements, beaucoup de structures cherchent une source de revenu complémentaire qui ne repose pas uniquement sur le bénévolat. Le textile personnalisé, géré via une boutique privée, est l'une des solutions les plus simples à mettre en place.",
      },
      { type: 'h2', text: 'Le principe : une marge reversée sur chaque vente' },
      {
        type: 'p',
        text: "Avec une boutique privée FLOKKA, vous définissez une marge (un pourcentage) ajoutée à notre prix de fabrication. Cette marge vous revient intégralement. Chaque fois qu'un membre commande un sweat, un maillot ou un t-shirt à l'effigie de votre association, vous générez un petit revenu, sans avoir rien avancé.",
      },
      {
        type: 'p',
        text: "Le prix affiché à vos membres est calculé automatiquement : notre prix de base, plus votre marge. Vous gardez la main sur le tarif final, et donc sur l'équilibre entre attractivité et financement.",
      },
      { type: 'h2', text: 'Pourquoi ce modèle fonctionne pour les associations' },
      {
        type: 'ul',
        items: [
          "Aucune trésorerie à avancer : il n'y a pas de commande groupée à payer d'avance.",
          "Aucun stock à gérer : chaque pièce est produite à l'unité, à la commande.",
          'Aucun invendu : vous ne reversez de marge que sur ce qui est réellement acheté.',
          'Un revenu récurrent : la boutique reste ouverte toute la saison.',
        ],
      },
      { type: 'h2', text: 'Mettre en place sa boutique en quelques étapes' },
      {
        type: 'p',
        text: "Nous créons la boutique à vos couleurs, avec votre logo et un code d'accès. Vous le diffusez à vos adhérents par e-mail ou sur vos réseaux. Chacun commande directement, reçoit sa pièce, et votre marge est comptabilisée. Vous pouvez communiquer sur le fait que chaque achat soutient l'association.",
      },
      { type: 'h2', text: 'Combien peut rapporter une boutique textile ?' },
      {
        type: 'p',
        text: "Tout dépend du nombre de membres et de la marge choisie. Une association de cent adhérents qui commandent en moyenne une à deux pièces par saison génère un complément de financement non négligeable, totalement passif une fois la boutique lancée. C'est un levier idéal pour financer du matériel, un déplacement ou un projet.",
      },
    ],
    faq: [
      {
        question: 'La marge reversée est-elle automatique ?',
        answer:
          "Oui. Vous fixez le pourcentage de marge dans le paramétrage de votre boutique, et le prix affiché aux membres l'intègre automatiquement.",
      },
      {
        question: "Faut-il avancer de l'argent pour lancer la boutique ?",
        answer:
          "Non. La création de la boutique est sans engagement et il n'y a aucun stock à financer : tout est produit à l'unité, à la commande.",
      },
    ],
  },
  {
    slug: 'boutique-club-sportif-guide-complet',
    title: 'Boutique club sportif : le guide complet',
    h1: 'Boutique club sportif : le guide complet',
    description:
      "Tout ce qu'il faut savoir pour équiper votre club sportif d'une boutique en ligne privée : fonctionnement, produits, personnalisation, réassort à l'unité et bénéfices pour le club.",
    datePublished: '2026-02-03',
    author: 'FLOKKA',
    readingMinutes: 8,
    tags: ['club sportif', 'boutique privée', 'guide'],
    blocks: [
      {
        type: 'p',
        text: "Équiper un club sportif en textile a longtemps rimé avec galère : collecter les tailles sur un tableur, avancer une grosse commande, stocker les cartons, gérer les oublis et les nouveaux licenciés. La boutique privée en ligne change radicalement la donne. Voici le guide complet.",
      },
      { type: 'h2', text: "Qu'est-ce qu'une boutique club sportif ?" },
      {
        type: 'p',
        text: "C'est une boutique en ligne dédiée à votre club, accessible via un code, qui regroupe vos produits floqués à vos couleurs. Maillots, survêtements, sweats, polos, sacs : chaque licencié y commande ce qu'il veut, à son nom et à sa taille.",
      },
      { type: 'h2', text: 'Comment ça fonctionne, étape par étape' },
      {
        type: 'ul',
        items: [
          "Nous créons la boutique du club avec votre logo, vos couleurs et un code d'accès unique.",
          'Vous diffusez le code à vos licenciés et à leurs parents.',
          "Chacun commande son article personnalisé quand il le souhaite, sans minimum.",
          "Nous produisons chaque pièce à l'unité et l'expédions directement.",
        ],
      },
      { type: 'h2', text: "Le réassort à l'unité, atout numéro un" },
      {
        type: 'p',
        text: "Le principal avantage d'une boutique club sportif est le réassort à l'unité. Un nouveau joueur arrive en novembre ? Il commande son maillot immédiatement. Un sweat est perdu ou trop petit ? On en recommande un seul. Plus besoin d'attendre une commande groupée annuelle.",
      },
      { type: 'h2', text: 'Quels produits proposer dans la boutique du club ?' },
      {
        type: 'p',
        text: "On recommande de démarrer avec une sélection cohérente : un maillot d'entraînement, un sweat à capuche aux couleurs du club, un polo pour le staff et un sac. Vous pouvez ajouter des produits au fil de la saison, et proposer la personnalisation nom + numéro là où c'est pertinent.",
      },
      { type: 'h2', text: 'Ce que le club y gagne' },
      {
        type: 'ul',
        items: [
          'Une image homogène et professionnelle sur et en dehors du terrain.',
          "Zéro logistique et zéro avance de trésorerie pour le bureau.",
          'Un financement possible via une marge reversée au club.',
          'Une boutique ouverte toute la saison, accessible à tous les membres.',
        ],
      },
    ],
    faq: [
      {
        question: 'Un club doit-il commander un minimum de pièces ?',
        answer:
          "Non. La boutique fonctionne au réassort à l'unité : un seul article peut être commandé à tout moment.",
      },
      {
        question: 'Peut-on personnaliser avec le nom et le numéro des joueurs ?',
        answer:
          'Oui, la personnalisation nom et numéro est disponible sur les produits concernés, directement au moment de la commande.',
      },
    ],
  },
  {
    slug: 'eviter-stocks-association-textile',
    title: "Comment éviter les stocks dans une association",
    h1: "Comment éviter les stocks de textile dans une association",
    description:
      "Cartons d'invendus, tailles qui manquent, trésorerie immobilisée : le stock textile est un piège pour les associations. Voici comment l'éviter totalement avec la production à l'unité.",
    datePublished: '2026-02-24',
    author: 'FLOKKA',
    readingMinutes: 5,
    tags: ['association', 'stock', "réassort à l'unité"],
    blocks: [
      {
        type: 'p',
        text: "Beaucoup d'associations se retrouvent un jour avec un carton de t-shirts invendus dans un placard. Mauvaises tailles, surévaluation de la demande, membres qui n'ont finalement pas commandé : le stock textile est une source de pertes et de stress inutile. Bonne nouvelle : il est aujourd'hui totalement évitable.",
      },
      { type: 'h2', text: 'Pourquoi le stock pose problème' },
      {
        type: 'ul',
        items: [
          'Il immobilise de la trésorerie que vous auriez pu consacrer à votre projet.',
          'Il génère des invendus difficiles à écouler.',
          "Il oblige à deviner les tailles et les quantités à l'avance.",
          'Il demande un espace de stockage et une logistique de redistribution.',
        ],
      },
      { type: 'h2', text: "La solution : produire à l'unité, à la demande" },
      {
        type: 'p',
        text: "Le modèle du réassort à l'unité inverse complètement la logique. Au lieu de commander un volume puis d'espérer le vendre, on ne produit que ce qui est réellement commandé. Chaque membre passe sa propre commande, à sa taille, et la pièce est fabriquée pour lui.",
      },
      {
        type: 'p',
        text: "Résultat : aucun invendu, aucune avance, aucun carton. L'association ne gère plus de stock du tout, et personne ne se retrouve avec un textile à la mauvaise taille.",
      },
      { type: 'h2', text: 'Le rôle de la boutique privée' },
      {
        type: 'p',
        text: "Pour que ce modèle fonctionne sans surcharger les bénévoles, on centralise tout dans une boutique privée en ligne. Elle contient vos produits, vos couleurs, et chacun y commande de façon autonome. Le bureau n'a plus à collecter les tailles ni à redistribuer quoi que ce soit.",
      },
    ],
    faq: [
      {
        question: "Le réassort à l'unité coûte-t-il plus cher ?",
        answer:
          "Le prix unitaire reste maîtrisé, et surtout vous supprimez le coût caché des invendus et de la trésorerie immobilisée. Au global, c'est souvent plus économique.",
      },
      {
        question: "Et si une seule personne veut commander ?",
        answer:
          "C'est précisément l'objectif : une personne peut commander une seule pièce, à tout moment, sans minimum.",
      },
    ],
  },
  {
    slug: 'choisir-sweat-personnalise-club',
    title: 'Comment choisir un sweat personnalisé pour son club',
    h1: 'Comment choisir un sweat personnalisé pour son club',
    description:
      "Matière, coupe, type de marquage, couleurs : nos conseils pour choisir le sweat personnalisé idéal pour votre club sportif ou votre association, qui plaira à tous les membres.",
    datePublished: '2026-03-18',
    author: 'FLOKKA',
    readingMinutes: 6,
    tags: ['club sportif', 'sweat', 'personnalisation'],
    blocks: [
      {
        type: 'p',
        text: "Le sweat est sans doute le vêtement le plus populaire d'une boutique de club. Porté à l'entraînement comme au quotidien, c'est une vitrine ambulante pour votre structure. Encore faut-il bien le choisir. Voici les critères qui comptent.",
      },
      { type: 'h2', text: 'La matière et le grammage' },
      {
        type: 'p',
        text: "Le grammage (en g/m²) détermine la chaleur et la tenue du sweat. Un grammage élevé offre un rendu plus qualitatif et plus chaud, idéal pour l'extérieur. Pour un usage polyvalent, un molleton gratté intérieur reste une valeur sûre, confortable et durable.",
      },
      { type: 'h2', text: 'La coupe : col rond ou capuche ?' },
      {
        type: 'ul',
        items: [
          "Le sweat à capuche (hoodie) est le plus demandé, décontracté et apprécié des jeunes.",
          'Le sweat col rond fait plus sobre et convient bien au staff et aux dirigeants.',
          'Le zippé est pratique pour enfiler par-dessus une tenue de sport.',
        ],
      },
      { type: 'h2', text: 'Le flocage du sweat' },
      {
        type: 'p',
        text: "Le flocage donne un rendu mat, souple et résistant, parfait pour un nom, un numéro ou un logo de club. On découpe votre visuel dans un film flex, puis on le pose à chaud : le marquage tient dans le temps et reste agréable à porter.",
      },
      { type: 'h2', text: 'Les couleurs et la cohérence visuelle' },
      {
        type: 'p',
        text: "Restez fidèle aux couleurs officielles du club. Un marquage qui contraste bien avec le textile garantit une bonne lisibilité. Pensez aussi à proposer une ou deux variantes (par exemple un fond foncé et un fond clair) pour satisfaire tous les goûts sans multiplier les références.",
      },
      { type: 'h2', text: 'Penser au réassort' },
      {
        type: 'p',
        text: "Dernier conseil : choisissez un modèle pérenne, que vous pourrez proposer plusieurs saisons. Comme nous produisons à l'unité, un nouveau membre pourra toujours commander le même sweat, dans la même teinte, sans rupture de gamme.",
      },
    ],
  },
  {
    slug: 'comprendre-flocage-textile',
    title: 'Tout comprendre au flocage textile',
    h1: 'Tout comprendre au flocage textile',
    description:
      "Comment fonctionne le flocage textile en flex ? Découpe, pose à chaud, avantages et entretien : notre atelier alsacien vous explique tout, simplement.",
    datePublished: '2026-04-07',
    author: 'FLOKKA',
    readingMinutes: 6,
    tags: ['flocage', 'flex', 'guide'],
    blocks: [
      {
        type: 'p',
        text: "Chez FLOKKA, on ne fait qu'une seule chose : du flocage textile en flex. Et comme c'est notre unique métier, autant vous expliquer précisément de quoi il s'agit.",
      },
      { type: 'h2', text: "Qu'est-ce que le flocage flex ?" },
      {
        type: 'p',
        text: "Le flocage consiste à découper un motif (nom, numéro, logo, texte) dans un film flex — un textile thermocollant souple — puis à le presser à chaud sur le vêtement. Le résultat est un marquage net, souple au toucher, mat et très résistant, idéal pour les lettrages et les numéros de maillots.",
      },
      { type: 'h2', text: 'Comment on réalise un flocage, chez nous' },
      {
        type: 'ul',
        items: [
          'On prépare votre visuel pour la découpe (mise au propre, vectorisation).',
          'On découpe le flex sur notre plotter Graphtec CE7000, précis au dixième de millimètre.',
          "On échenille à la main (on retire le flex superflu autour du motif).",
          'On presse à chaud avec notre Secabo V7 lite, à la bonne température et pression.',
        ],
      },
      { type: 'h2', text: 'Les avantages du flocage flex' },
      {
        type: 'p',
        text: "Le flocage est apprécié pour sa lisibilité, sa tenue dans le temps et son aspect net et sportif. Bien réalisé et bien entretenu, il résiste à de nombreux lavages sans se craqueler ni se décoller. C'est aussi une technique qui se prête parfaitement au travail à l'unité, sans minimum.",
      },
      { type: 'h2', text: 'Comment bien entretenir un textile floqué' },
      {
        type: 'ul',
        items: [
          "Laver à l'envers, à basse température (30 °C de préférence).",
          'Éviter le sèche-linge et le repassage direct sur le flocage.',
          'Ne pas utiliser de javel ni de nettoyage à sec agressif.',
        ],
      },
      { type: 'h2', text: 'Une question sur votre projet ?' },
      {
        type: 'p',
        text: "Comme le flocage est notre seul métier, on le connaît sous toutes ses coutures. Envoyez-nous votre visuel (même un simple croquis) : on vous dira tout de suite ce que ça donne et combien ça coûte.",
      },
    ],
    faq: [
      {
        question: 'Le flocage résiste-t-il aux lavages ?',
        answer:
          "Oui, un flocage de qualité résiste à de nombreux lavages s'il est entretenu correctement : lavage à l'envers, à basse température, sans sèche-linge.",
      },
      {
        question: "Peut-on floquer un nom et un numéro à l'unité ?",
        answer:
          "Oui. Chaque pièce étant produite à la demande, le nom et le numéro sont personnalisés individuellement, sans minimum de commande.",
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
