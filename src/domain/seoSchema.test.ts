import assert from 'node:assert/strict';
import test from 'node:test';
import {buildStructuredData} from './seoSchema.ts';

test('buildStructuredData gera ProfessionalService, catálogo com 3 serviços e FAQPage', () => {
  const schema = buildStructuredData({
    siteUrl: 'https://rodrigosolucoesdigitais.com.br',
    brandName: 'Rodrigo Soluções Digitais',
    description: 'Sites, sistemas e suporte técnico.',
    faqs: [
      {question: 'Atende remoto?', answer: 'Sim, em todo o Brasil.'},
      {question: 'Atende empresas?', answer: 'Sim, PF e PJ.'},
    ],
  });

  assert.equal(schema['@context'], 'https://schema.org');
  const graph = schema['@graph'] as Array<Record<string, unknown>>;
  assert.equal(graph.length, 2);

  const serviceNode = graph[0];
  assert.equal(serviceNode['@type'], 'ProfessionalService');
  assert.equal(serviceNode['name'], 'Rodrigo Soluções Digitais');

  const catalog = serviceNode['hasOfferCatalog'] as {itemListElement: unknown[]};
  assert.equal(catalog.itemListElement.length, 3);

  const faqNode = graph[1] as {'@type': string; mainEntity: unknown[]};
  assert.equal(faqNode['@type'], 'FAQPage');
  assert.equal(faqNode.mainEntity.length, 2);
});
