export interface LocalArea {
  slug: string
  city: string
  label: string
  title: string
  description: string
  keywords: string[]
  h1: string
  lead: string
  sections: { h2: string; paragraphs: string[]; list?: string[] }[]
  faq: { question: string; answer: string }[]
}

/**
 * Pages SEO locales. Chaque entrée a un contenu 100 % unique
 * (aucune duplication de texte d'une ville à l'autre).
 */
export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: '/textile-personnalise-strasbourg',
    city: 'Strasbourg',
    label: 'Textile personnalisé à Strasbourg',
    title: 'Textile personnalisé à Strasbourg pour clubs et associations',
    description:
      "Boutique textile privée et flocage pour les clubs et associations de Strasbourg et de l'Eurométropole. Réassort à l'unité, fabrication locale en Alsace, livraison incluse.",
    keywords: [
      'textile personnalisé Strasbourg',
      'flocage Strasbourg',
      'boutique club sportif Strasbourg',
      'vêtements personnalisés association Strasbourg',
    ],
    h1: 'Textile personnalisé à Strasbourg pour clubs et associations',
    lead: "Strasbourg concentre des centaines de clubs sportifs, d'amicales et d'associations de quartier. FLOKKA équipe ces structures de l'Eurométropole avec des boutiques textiles privées et un flocage soigné, sans qu'elles aient à gérer le moindre stock.",
    sections: [
      {
        h2: 'Une boutique privée pour chaque structure strasbourgeoise',
        paragraphs: [
          "Que vous fassiez vivre un club de handball à la Robertsau, une association culturelle à la Krutenau ou une amicale sportive à Hautepierre, votre structure mérite une boutique en ligne à son nom. Nous la créons avec vos couleurs, votre logo et un code d'accès réservé à vos membres.",
          "Chaque membre commande son maillot, son sweat ou son polo quand il le souhaite, à sa taille, avec son nom et son numéro. Vous ne portez aucune trésorerie : il n'y a pas de commande groupée à avancer, pas de cartons à stocker dans le local du club.",
        ],
      },
      {
        h2: 'Flocage et marquage textile pour Strasbourg et son agglomération',
        paragraphs: [
          "Notre atelier d'Andlau se trouve à une trentaine de minutes de Strasbourg. Nous réalisons le flocage, l'impression et la broderie de t-shirts, sweats, vestes et maillots pour les équipes et les bénévoles de toute l'Eurométropole.",
          "Les commandes sont produites à l'unité puis expédiées directement, ce qui évite les déplacements et les remises en main propre fastidieuses pour un club déjà bien occupé.",
        ],
      },
    ],
    faq: [
      {
        question: 'Livrez-vous les clubs et associations de Strasbourg ?',
        answer:
          "Oui. Chaque commande passée sur votre boutique privée est floquée dans notre atelier d'Andlau puis livrée partout dans l'Eurométropole de Strasbourg et dans toute la France.",
      },
      {
        question: 'Faut-il commander en grande quantité pour un club strasbourgeois ?',
        answer:
          "Non. Le réassort à l'unité est notre principe : un seul membre peut commander un seul article, à tout moment, sans minimum de commande.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-colmar',
    city: 'Colmar',
    label: 'Textile personnalisé à Colmar',
    title: 'Textile personnalisé à Colmar pour clubs et associations',
    description:
      "Vêtements personnalisés et flocage pour les clubs sportifs et associations de Colmar et du Haut-Rhin. Boutique privée en ligne, réassort à l'unité, production alsacienne.",
    keywords: [
      'textile personnalisé Colmar',
      'flocage Colmar',
      'boutique association Colmar',
      'vêtements personnalisés club Colmar',
    ],
    h1: 'Textile personnalisé à Colmar pour clubs et associations',
    lead: "Capitale des vins d'Alsace, Colmar et le centre du Haut-Rhin comptent un tissu associatif dense : clubs sportifs, confréries, comités des fêtes et associations de quartier. FLOKKA leur fournit un textile personnalisé de qualité, géré sans stock grâce à la boutique privée.",
    sections: [
      {
        h2: 'Habiller les clubs et associations colmariens sans contrainte',
        paragraphs: [
          "À Colmar, beaucoup de structures renoncent au textile personnalisé par peur de la logistique : avancer l'argent, collecter les tailles, redistribuer les commandes. Notre modèle supprime ces freins. Votre boutique en ligne centralise tout, chacun commande pour lui-même et reçoit sa pièce.",
          "Nous adaptons les produits à votre identité : maillots à vos couleurs, sweats à capuche pour les bénévoles, polos pour le bureau de l'association ou textiles événementiels pour vos manifestations.",
        ],
      },
      {
        h2: 'Une production alsacienne au service du Haut-Rhin',
        paragraphs: [
          "Même si notre atelier est situé à Andlau, dans le Bas-Rhin, nous travaillons quotidiennement avec des structures du Haut-Rhin. La proximité reste réelle et l'expédition rapide vers Colmar et ses environs.",
          "Vous bénéficiez d'un interlocuteur unique, de finitions soignées et de délais maîtrisés, du premier maillot au réassort de dernière minute avant un tournoi.",
        ],
      },
    ],
    faq: [
      {
        question: 'FLOKKA travaille-t-il avec le Haut-Rhin et Colmar ?',
        answer:
          "Oui. Notre atelier est dans le Bas-Rhin mais nous équipons des clubs et associations dans tout le Grand Est, dont Colmar et le Haut-Rhin, avec livraison partout en France.",
      },
      {
        question: 'Peut-on personnaliser des textiles pour un événement à Colmar ?',
        answer:
          "Absolument. Nous produisons des t-shirts et accessoires personnalisés pour les manifestations, marchés et événements associatifs colmariens, à l'unité ou en petite série.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-obernai',
    city: 'Obernai',
    label: 'Textile personnalisé à Obernai',
    title: 'Textile personnalisé à Obernai pour clubs et associations',
    description:
      "Flocage et boutique textile privée pour les clubs et associations d'Obernai et du piémont des Vosges. Réassort à l'unité, atelier local à quelques minutes, fabrication soignée.",
    keywords: [
      'textile personnalisé Obernai',
      'flocage Obernai',
      'boutique club sportif Obernai',
      'vêtements personnalisés association Obernai',
    ],
    h1: 'Textile personnalisé à Obernai pour clubs et associations',
    lead: "Obernai est notre voisine directe : quelques minutes seulement séparent notre atelier d'Andlau de la cité de Sainte-Odile. Cette proximité fait de FLOKKA un partenaire textile naturel pour les clubs, écoles de sport et associations du secteur.",
    sections: [
      {
        h2: 'Le partenaire textile de proximité à Obernai',
        paragraphs: [
          "Être à côté change tout : échanges rapides, validation des maquettes sans délai, réactivité avant un match ou une manifestation. Les clubs d'Obernai et des communes alentour profitent d'un atelier réellement local.",
          "Nous créons la boutique privée de votre structure, vous diffusez le code à vos membres, et chacun commande son textile floqué à son nom. Aucune avance de trésorerie, aucun stock à entreposer.",
        ],
      },
      {
        h2: "Du club de sport à l'amicale de village",
        paragraphs: [
          "Handball, football, gymnastique, cyclisme, mais aussi comités des fêtes et associations patrimoniales : nous habillons toutes les structures qui font vivre Obernai et le piémont des Vosges.",
          "Chaque pièce est produite à l'unité, ce qui permet d'intégrer un nouveau licencié en cours de saison sans relancer une commande groupée.",
        ],
      },
    ],
    faq: [
      {
        question: "FLOKKA est-il proche d'Obernai ?",
        answer:
          "Oui, notre atelier se situe à Andlau, à quelques minutes d'Obernai. C'est l'une des zones que nous servons le plus rapidement.",
      },
      {
        question: 'Peut-on ajouter un membre en cours de saison ?',
        answer:
          "Bien sûr. Avec le réassort à l'unité, un nouveau licencié commande son textile quand il arrive, sans attendre une commande collective.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-selestat',
    city: 'Sélestat',
    label: 'Textile personnalisé à Sélestat',
    title: 'Textile personnalisé à Sélestat pour clubs et associations',
    description:
      "Vêtements personnalisés et flocage pour les clubs et associations de Sélestat et du centre Alsace. Boutique privée en ligne, réassort à l'unité, fabrication locale.",
    keywords: [
      'textile personnalisé Sélestat',
      'flocage Sélestat',
      'boutique association Sélestat',
      'vêtements personnalisés club Sélestat',
    ],
    h1: 'Textile personnalisé à Sélestat pour clubs et associations',
    lead: "Au cœur du centre Alsace, Sélestat rayonne sur de nombreuses communes et un riche réseau associatif. FLOKKA accompagne ces structures avec un textile personnalisé sans stock, pensé pour les bénévoles.",
    sections: [
      {
        h2: 'Une solution textile pensée pour le centre Alsace',
        paragraphs: [
          "Entre Strasbourg et Colmar, Sélestat occupe une position centrale qui en fait un pôle associatif important. Les clubs y manquent souvent de temps et de trésorerie pour gérer du textile : c'est précisément ce que FLOKKA simplifie.",
          "Votre boutique privée regroupe vos produits et vos couleurs. Chaque membre s'y connecte avec un code, commande sa pièce personnalisée et la reçoit chez lui. Le bureau de l'association ne gère plus rien.",
        ],
      },
      {
        h2: 'Flocage, impression et broderie à la demande',
        paragraphs: [
          "Nous floquons noms, numéros et logos sur une large gamme de textiles : maillots, sweats, polos, vestes et accessoires. La production à l'unité évite tout surstock et toute perte.",
          "Depuis notre atelier d'Andlau, l'expédition vers Sélestat et les communes du centre Alsace est rapide et sans contrainte pour vos bénévoles.",
        ],
      },
    ],
    faq: [
      {
        question: 'Desservez-vous le centre Alsace et Sélestat ?',
        answer:
          "Oui. Sélestat fait partie de notre zone de proximité en Alsace. Les commandes sont produites à Andlau puis livrées partout en France.",
      },
      {
        question: 'Quel est le minimum de commande pour une association de Sélestat ?',
        answer:
          "Il n'y a pas de minimum. Le réassort à l'unité permet de commander une seule pièce à la fois.",
      },
    ],
  },
  {
    slug: '/flocage-textile-bas-rhin',
    city: 'Bas-Rhin',
    label: 'Flocage textile dans le Bas-Rhin',
    title: 'Flocage textile dans le Bas-Rhin (67) — clubs & associations',
    description:
      "Atelier de flocage textile dans le Bas-Rhin. Marquage de maillots, sweats et polos pour clubs sportifs et associations, à l'unité, avec boutique privée et fabrication locale à Andlau.",
    keywords: [
      'flocage textile Bas-Rhin',
      'flocage 67',
      'marquage textile Bas-Rhin',
      'textile personnalisé Bas-Rhin',
    ],
    h1: 'Flocage textile dans le Bas-Rhin (67)',
    lead: "Notre atelier est implanté à Andlau, en plein cœur du Bas-Rhin. Nous y réalisons le flocage et le marquage textile des clubs sportifs et des associations du département, avec un modèle sans stock et un réassort à l'unité.",
    sections: [
      {
        h2: 'Le flocage textile au plus près des clubs du 67',
        paragraphs: [
          "Le flocage consiste à appliquer noms, numéros, logos et visuels sur un textile de façon durable et nette. C'est le cœur de notre métier. Dans le Bas-Rhin, nous travaillons avec des clubs de toutes disciplines et des associations de toutes tailles.",
          "Plutôt que de livrer un gros volume une fois par an, nous produisons chaque pièce au moment où elle est commandée. Le club ne gère ni stock, ni invendus, ni avance d'argent.",
        ],
      },
      {
        h2: 'Andlau, un atelier central pour tout le département',
        paragraphs: [
          "Situé entre Barr, Obernai et Sélestat, Andlau est idéalement placé pour rayonner sur l'ensemble du Bas-Rhin, de Strasbourg au piémont des Vosges.",
          "Chaque structure dispose de sa boutique privée en ligne et d'un interlocuteur unique, ce qui garantit des finitions homogènes et des délais tenus, saison après saison.",
        ],
      },
    ],
    faq: [
      {
        question: 'Où se trouve votre atelier de flocage dans le Bas-Rhin ?',
        answer:
          "Notre atelier est à Andlau (67140), dans le Bas-Rhin, entre Barr, Obernai et Sélestat. Nous y réalisons l'ensemble du flocage et du marquage textile.",
      },
      {
        question: 'Quels textiles pouvez-vous floquer ?',
        answer:
          "Maillots, t-shirts, sweats, polos, vestes et accessoires. Nous adaptons la technique de marquage (flocage, impression, broderie) au support et au rendu souhaité.",
      },
    ],
  },
]

export function getLocalArea(slug: string): LocalArea | undefined {
  return LOCAL_AREAS.find((a) => a.slug === slug || a.slug === `/${slug}`)
}
