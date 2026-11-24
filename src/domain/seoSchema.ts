export interface FaqEntry {
  question: string;
  answer: string;
}

export interface StructuredDataOptions {
  siteUrl: string;
  brandName: string;
  description: string;
  faqs: FaqEntry[];
}

export function buildStructuredData(options: StructuredDataOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${options.siteUrl}#organization`,
        name: options.brandName,
        url: options.siteUrl,
        description: options.description,
        areaServed: [
          {
            '@type': 'Country',
            name: 'Brasil',
          },
          {
            '@type': 'Place',
            name: 'Atendimento presencial local e suporte remoto nacional',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços de Tecnologia, Desenvolvimento e Suporte',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Criação de Sites e Sistemas Web',
                description:
                  'Desenvolvimento de sites rápidos, landing pages de alta conversão e sistemas web sob medida para empresas e profissionais.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Suporte Técnico para Computadores',
                description:
                  'Diagnóstico preciso, otimização de desempenho, manutenção preventiva e corretiva para estações de trabalho e uso pessoal.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Consultoria para Aquisição de Computadores',
                description:
                  'Especificação técnica imparcial de notebooks e desktops para pessoas físicas e empresas, evitando gargalos e gastos desnecessários.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: options.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
