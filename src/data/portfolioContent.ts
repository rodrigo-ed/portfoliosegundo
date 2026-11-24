import {HARDWARE_OFFERS_GROUP_URL} from '../config/contact.ts';
import type {ServiceId} from '../domain/scheduling.ts';
import type {FaqEntry} from '../domain/seoSchema.ts';

export type AudienceFilter = 'ALL' | 'PF' | 'PJ';

export interface ServiceSecondaryLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: ServiceId;
  index: string;
  title: string;
  audience: 'PF e PJ' | 'Empresas (PJ)' | 'Pessoa Física (PF)';
  audienceTags: Array<'PF' | 'PJ'>;
  headline: string;
  description: string;
  deliverables: string[];
  outcomeMetric: string;
  ctaLabel: string;
  secondaryLink?: ServiceSecondaryLink;
  featured?: boolean;
}

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface CaseOutcome {
  segment: string;
  audience: 'PJ' | 'PF';
  title: string;
  before: string;
  solution: string;
  result: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const HERO_STRIP_METRICS: ProofMetric[] = [
  {value: 'Até 2h', label: 'Retorno inicial', context: 'Atendimento em horário comercial'},
  {value: 'PF e PJ', label: 'Público atendido', context: 'Uso pessoal e corporativo'},
  {value: 'Brasil', label: 'Atendimento remoto', context: 'Sites, sistemas e consultoria'},
  {value: 'Local', label: 'Suporte presencial', context: 'Manutenção física agendada'},
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-systems',
    index: '01.',
    title: 'Criação de Sites e Sistemas Web',
    audience: 'PF e PJ',
    audienceTags: ['PF', 'PJ'],
    headline: 'Páginas leves e sistemas sob medida projetados para gerar contatos reais.',
    description:
      'Estrutura desenvolvida para carregar rápido em redes 4G, facilitar a leitura no celular, posicionar sua marca nas buscas do Google e organizar rotinas operacionais.',
    deliverables: [
      'Landing pages e sites institucionais focados em conversão',
      'Sistemas internos de agendamento, cadastro e gestão operacional',
      'Otimização técnica de SEO, acessibilidade e desempenho móvel',
    ],
    outcomeMetric: 'Carregamento abaixo de 1,5s em conexões móveis',
    ctaLabel: 'Agendar projeto web',
    featured: true,
  },
  {
    id: 'pc-support',
    index: '02.',
    title: 'Suporte Técnico para Computadores',
    audience: 'PF e PJ',
    audienceTags: ['PF', 'PJ'],
    headline: 'Manutenção completa de software e hardware com segurança de dados e foco em estabilidade.',
    description:
      'Atendimento técnico direto para manter computadores pessoais e estações corporativas rápidos, limpos e prontos para o trabalho diário.',
    deliverables: [
      'Instalação de SO + Configuração Inicial',
      'Formatação de Computadores (com Backup)',
      'Configuração Inicial',
      'Limpeza Interna Preventiva',
      'Troca de Peças',
      'Instalação de Sistemas / Programas',
    ],
    outcomeMetric: 'Redução de até 70% no tempo de inicialização e resposta',
    ctaLabel: 'Solicitar suporte técnico',
  },
  {
    id: 'hardware-consulting',
    index: '03.',
    title: 'Consultoria para Aquisição de Computadores',
    audience: 'PF e PJ',
    audienceTags: ['PF', 'PJ'],
    headline: 'Compre o equipamento certo pelo menor custo real, sem cair em fichas técnicas enganosas.',
    description:
      'Analisamos seu fluxo de trabalho ou a demanda da sua equipe para indicar modelos exatos de notebooks, desktops e upgrades com longevidade garantida, além de curadoria contínua de ofertas no grupo de produtos.',
    deliverables: [
      'Laudo comparativo de 3 opções reais dentro do seu orçamento',
      'Dimensionamento técnico para escritório, engenharia, design ou estudos',
      'Padronização de parque de máquinas para pequenas e médias empresas',
    ],
    outcomeMetric: 'Economia média de 25% a 35% evitando máquinas subdimensionadas',
    ctaLabel: 'Agendar consultoria de compra',
    secondaryLink: {
      label: 'Entrar no Grupo de Produtos',
      href: HARDWARE_OFFERS_GROUP_URL,
    },
  },
];

export const CASE_OUTCOMES: CaseOutcome[] = [
  {
    segment: 'Clínica e Serviços Locais',
    audience: 'PJ',
    title: 'Reestruturação digital com agendamento direto no WhatsApp',
    before: 'Site pesado e confuso no celular, gerando poucos contatos semanais.',
    solution: 'Nova página em layout direto, SEO local e pré-triagem guiada.',
    result: '+68% em agendamentos qualificados nos primeiros 60 dias',
  },
  {
    segment: 'Escritório de Contabilidade',
    audience: 'PJ',
    title: 'Padronização de hardware e manutenção preventiva',
    before: 'Quatro estações travando em rotina fiscal e compras sem critério técnico.',
    solution: 'Limpeza preventiva, troca de componentes e escolha correta de novos notebooks.',
    result: '-32% no orçamento de TI e zero paradas críticas no trimestre',
  },
  {
    segment: 'Profissional Autônomo',
    audience: 'PF',
    title: 'Consultoria de compra para estação de trabalho híbrida',
    before: 'Dúvida entre modelos de varejo com processadores antigos e memória limitada.',
    solution: 'Comparativo técnico imparcial com foco em durabilidade e custo-benefício.',
    result: 'Equipamento adquirido com 40% mais desempenho pelo mesmo valor',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01.',
    title: 'Triagem rápida pelo chat',
    description:
      'Você escolhe o serviço, informa se é para uso pessoal ou empresa e indica o melhor turno.',
  },
  {
    index: '02.',
    title: 'Diagnóstico e proposta clara',
    description:
      'Alinhamos escopo, prazo e orçamento direto no WhatsApp, sem letras miúdas ou termos confusos.',
  },
  {
    index: '03.',
    title: 'Execução e validação prática',
    description:
      'Entrega testada em uso real, seja no site publicado, no computador revisado ou na indicação final de compra.',
  },
];

export const FAQ_ITEMS: FaqEntry[] = [
  {
    question: 'Como funciona o atendimento remoto nacional e o presencial local?',
    answer:
      'Criação de sites, sistemas web, consultoria para compra de computadores e suporte de software são realizados remotamente para todo o Brasil. Serviços físicos como limpeza interna preventiva, troca de peças e instalação local acontecem mediante agendamento presencial.',
  },
  {
    question: 'Atende tanto pessoas físicas quanto empresas com CNPJ?',
    answer:
      'Sim. Atendemos desde quem precisa formatar o computador com backup ou escolher um notebook seguro até empresas que buscam sites de conversão, sistemas internos e manutenção de estações.',
  },
  {
    question: 'Por que contratar uma consultoria antes de comprar um computador?',
    answer:
      'Muitos modelos vendidos no varejo combinam peças antigas com preços altos. A consultoria compara opções reais para a sua rotina, e você ainda pode acompanhar ofertas filtradas no nosso grupo de produtos.',
  },
  {
    question: 'Quanto tempo leva para receber retorno após usar o chat de agendamento?',
    answer:
      'O chat organiza seu pedido na hora e abre a conversa pronta no WhatsApp. Em horário comercial, o retorno inicial ocorre em até 2 horas.',
  },
];

export function filterServicesByAudience(services: ServiceItem[], filter: AudienceFilter): ServiceItem[] {
  if (filter === 'ALL') {
    return services;
  }
  return services.filter((service) => service.audienceTags.includes(filter));
}
