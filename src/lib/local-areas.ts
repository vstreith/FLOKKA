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
 * Pages SEO locales — Centre Alsace uniquement.
 * Positionnement : atelier de personnalisation textile (flocage, marquage,
 * impression), sans minimum de commande, avec espace de réassort à la demande.
 * Contenu 100 % unique par commune.
 */
export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: '/textile-personnalise-selestat',
    city: 'Sélestat',
    label: 'Personnalisation textile à Sélestat',
    title: 'Personnalisation textile à Sélestat (flocage, marquage)',
    description:
      "Atelier de personnalisation textile proche de Sélestat : flocage, marquage et impression sans minimum, dès une pièce. Espace de réassort à la demande, sans stock. Centre Alsace.",
    keywords: [
      'personnalisation textile Sélestat',
      'flocage Sélestat',
      'marquage Sélestat',
      'textile personnalisé Sélestat',
    ],
    h1: 'Personnalisation textile à Sélestat',
    lead: "Sélestat, c'est tout près de chez nous. On y personnalise vos textiles avec plaisir — flocage, marquage, impression — dès une seule pièce et sans minimum. Et si vous voulez passer en discuter, notre atelier d'Andlau n'est qu'à quelques minutes.",
    sections: [
      {
        h2: 'Flocage, marquage et impression pour les Sélestadiens',
        paragraphs: [
          "Particuliers, commerces, clubs et associations de Sélestat : nous personnalisons vos t-shirts, sweats, polos, maillots et accessoires avec un rendu soigné. Que vous ayez besoin d'une pièce unique ou d'une petite série, c'est possible.",
          "Notre atelier d'Andlau est tout proche, ce qui facilite les échanges, la validation des maquettes et les délais.",
        ],
      },
      {
        h2: 'Un réassort à la demande, sans stock à gérer',
        paragraphs: [
          "Pour les structures qui commandent régulièrement, nous mettons en place un espace dédié accessible par code. Vous y retrouvez vos produits personnalisés et recommandez à l'unité, quand vous le souhaitez.",
          "Plus besoin d'immobiliser du textile « au cas où » : vous commandez juste ce qu'il faut, au moment où il le faut.",
        ],
      },
    ],
    faq: [
      {
        question: 'Quel est le minimum de commande pour Sélestat ?',
        answer:
          "Aucun. Nous personnalisons dès une seule pièce, pour les particuliers comme pour les structures de Sélestat et des environs.",
      },
      {
        question: 'Proposez-vous le réassort à la demande à Sélestat ?',
        answer:
          "Oui. Les clients réguliers disposent d'un espace dédié par code pour recommander leurs produits à l'unité, sans stock.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-obernai',
    city: 'Obernai',
    label: 'Personnalisation textile à Obernai',
    title: 'Personnalisation textile à Obernai (flocage, marquage)',
    description:
      "Atelier de personnalisation textile près d'Obernai : flocage, marquage et impression sans minimum, dès une pièce. Espace de réassort à la demande. Proximité Centre Alsace.",
    keywords: [
      'personnalisation textile Obernai',
      'flocage Obernai',
      'marquage Obernai',
      'textile personnalisé Obernai',
    ],
    h1: 'Personnalisation textile à Obernai',
    lead: "Obernai, c'est la porte à côté : quelques minutes seulement depuis notre atelier d'Andlau. Autant dire qu'on connaît bien le coin et qu'on se fera un plaisir de personnaliser vos textiles, même en un seul exemplaire.",
    sections: [
      {
        h2: 'Le partenaire textile de proximité à Obernai',
        paragraphs: [
          "Être à côté change tout : échanges rapides, validation des visuels sans délai, réactivité avant un événement. Particuliers, commerces, clubs et associations d'Obernai profitent d'un atelier réellement local.",
          "Nous réalisons flocage, marquage et impression sur une large gamme de supports, à l'unité comme en petite série.",
        ],
      },
      {
        h2: 'Réassort à la demande pour les habitués',
        paragraphs: [
          "Vous commandez régulièrement ? Nous créons votre espace dédié, accessible par code, où vos produits sont enregistrés. Vous recommandez à la demande, sans gérer de stock.",
          "C'est la solution idéale pour renouveler un textile au fil de l'eau, sans surcommander.",
        ],
      },
    ],
    faq: [
      {
        question: "FLOKKA est-il proche d'Obernai ?",
        answer:
          "Oui, notre atelier est à Andlau, à quelques minutes d'Obernai. C'est l'une des communes que nous servons le plus rapidement.",
      },
      {
        question: 'Peut-on commander une seule pièce à Obernai ?',
        answer:
          "Oui. Nous n'imposons aucun minimum de commande : une pièce suffit.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-barr',
    city: 'Barr',
    label: 'Personnalisation textile à Barr',
    title: 'Personnalisation textile à Barr (flocage, marquage)',
    description:
      "Atelier de personnalisation textile à côté de Barr : flocage, marquage et impression sans minimum, dès une pièce. Espace de réassort à la demande. Centre Alsace.",
    keywords: [
      'personnalisation textile Barr',
      'flocage Barr',
      'marquage Barr',
      'textile personnalisé Barr',
    ],
    h1: 'Personnalisation textile à Barr',
    lead: "Barr, on y est très attachés : on a tous les deux présidé le Badminton Club de Barr ! C'est un peu là qu'est née l'idée de FLOKKA. Du coup, pour les Barrois, on personnalise vos textiles avec un soin tout particulier, dès une seule pièce.",
    sections: [
      {
        h2: 'Un atelier textile à deux pas de Barr',
        paragraphs: [
          "La proximité avec Barr nous permet d'être particulièrement réactifs : conseil direct, maquettes validées rapidement et délais courts. Nous personnalisons t-shirts, sweats, polos, maillots et accessoires.",
          "Que vous soyez un particulier, un commerce, un club ou une association de Barr, vous commandez au juste besoin, sans quantité imposée.",
        ],
      },
      {
        h2: 'Réassort à la demande, sans immobiliser de stock',
        paragraphs: [
          "Pour les clients réguliers, un espace dédié par code regroupe vos produits personnalisés. Vous recommandez à l'unité quand vous voulez.",
          "Vous évitez ainsi de stocker du textile inutilement et ne payez que ce que vous commandez réellement.",
        ],
      },
    ],
    faq: [
      {
        question: 'Êtes-vous proches de Barr ?',
        answer:
          "Oui. Notre atelier d'Andlau est juste à côté de Barr : c'est l'une de nos zones de proximité immédiate en Centre Alsace.",
      },
      {
        question: 'Y a-t-il un minimum de commande à Barr ?',
        answer:
          "Non, aucun minimum. Nous personnalisons dès une pièce.",
      },
    ],
  },
  {
    slug: '/textile-personnalise-erstein',
    city: 'Erstein',
    label: 'Personnalisation textile à Erstein',
    title: 'Personnalisation textile à Erstein (flocage, marquage)',
    description:
      "Atelier de personnalisation textile pour Erstein et ses environs : flocage, marquage et impression sans minimum, dès une pièce. Espace de réassort à la demande. Centre Alsace.",
    keywords: [
      'personnalisation textile Erstein',
      'flocage Erstein',
      'marquage Erstein',
      'textile personnalisé Erstein',
    ],
    h1: 'Personnalisation textile à Erstein',
    lead: "Erstein et ses environs font partie de notre petit territoire de cœur. On y personnalise vos textiles avec la même attention, que vous commandiez une pièce ou toute une équipe.",
    sections: [
      {
        h2: 'Flocage, marquage et impression pour Erstein',
        paragraphs: [
          "Nous habillons particuliers, commerces, clubs et associations d'Erstein avec un textile personnalisé de qualité : noms, numéros, prénoms, logos et visuels, sur le support de votre choix.",
          "La production se fait dans notre atelier d'Andlau, en Centre Alsace, avec un interlocuteur unique pour votre projet.",
        ],
      },
      {
        h2: 'Commandez à la demande, sans stock',
        paragraphs: [
          "Notre espace client dédié permet aux structures d'Erstein de recommander leurs produits personnalisés à l'unité, via un simple code, sans repasser par un devis.",
          "Idéal pour renouveler progressivement, sans avancer de stock ni gérer d'invendus.",
        ],
      },
    ],
    faq: [
      {
        question: 'Desservez-vous Erstein ?',
        answer:
          "Oui, Erstein fait partie de notre secteur en Centre Alsace. La production a lieu à Andlau.",
      },
      {
        question: 'Peut-on faire personnaliser une seule pièce à Erstein ?',
        answer:
          "Oui. Aucun minimum de commande : une pièce suffit.",
      },
    ],
  },
  {
    slug: '/flocage-textile-bas-rhin',
    city: 'Bas-Rhin',
    label: 'Flocage textile dans le Bas-Rhin',
    title: 'Flocage textile dans le Bas-Rhin (Centre Alsace, 67)',
    description:
      "Atelier de flocage textile à Andlau, en Centre Alsace (Bas-Rhin). Marquage et impression de t-shirts, sweats, maillots et polos, sans minimum, dès une pièce. Réassort à la demande.",
    keywords: [
      'flocage textile Bas-Rhin',
      'flocage 67',
      'marquage textile Bas-Rhin',
      'personnalisation textile Centre Alsace',
    ],
    h1: 'Flocage textile dans le Bas-Rhin (Centre Alsace)',
    lead: "Notre atelier est implanté à Andlau, en Centre Alsace, dans le Bas-Rhin. Nous y réalisons le flocage et le marquage textile, sans minimum de commande et avec réassort à la demande.",
    sections: [
      {
        h2: 'Le flocage textile au plus près de chez vous',
        paragraphs: [
          "Le flocage consiste à appliquer noms, numéros, logos et visuels de façon durable et nette sur un textile. C'est le cœur de notre métier, aux côtés du marquage et de l'impression.",
          "Nous travaillons avec les particuliers et les structures du Centre Alsace, dès une seule pièce, sans imposer de volume.",
        ],
      },
      {
        h2: 'Andlau, un atelier central en Centre Alsace',
        paragraphs: [
          "Situé entre Barr, Obernai, Sélestat et Erstein, Andlau est idéalement placé pour servir le Centre Alsace avec réactivité.",
          "Les clients réguliers bénéficient d'un espace dédié par code pour le réassort à la demande, sans stock à immobiliser.",
        ],
      },
    ],
    faq: [
      {
        question: 'Où se trouve votre atelier de flocage ?',
        answer:
          "À Andlau (67140), en Centre Alsace (Bas-Rhin), entre Barr, Obernai, Sélestat et Erstein.",
      },
      {
        question: 'Quels textiles pouvez-vous floquer ?',
        answer:
          "T-shirts, sweats, polos, maillots, vestes et accessoires, à l'unité comme en petite série, par flocage, marquage ou impression.",
      },
    ],
  },
]

export function getLocalArea(slug: string): LocalArea | undefined {
  return LOCAL_AREAS.find((a) => a.slug === slug || a.slug === `/${slug}`)
}
