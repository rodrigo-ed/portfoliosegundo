# Rodrigo Soluções Digitais — Portfólio de Alta Conversão e Agendamento Imediato

Reestruturação completa do portfólio para transmitir autoridade técnica, foco em UX/UI e resultados mensuráveis nas frentes de criação de sites e sistemas, suporte técnico e consultoria para aquisição de computadores. O projeto adota minimalismo tipográfico puro na paleta branco, preto e azul, carregamento imediato para redes 4G e chat guiado com envio direto para o WhatsApp.

## User Review & Critical Decisions

> [!IMPORTANT]
> As decisões abaixo foram consolidadas a partir das suas respostas e orientarão toda a construção. Caso deseje ajustar o número de WhatsApp padrão ou algum detalhe antes da execução, informe antes de aprovar.

- **Marca e Posicionamento**: Assinatura **Rodrigo Soluções Digitais**, com cobertura de **atendimento remoto nacional e suporte presencial local**.
- **Fluxo de Agendamento**: **Chat guiado direto para WhatsApp sem banco de dados**, coletando serviço, perfil (Pessoa Física ou Empresa), modalidade (Remoto ou Presencial), janela de horário e descrição do problema, gerando resumo formatado e link direto `wa.me`.
- **Estética e Performance 4G**: **Minimalismo tipográfico puro**, zero ícones decorativos, zero emojis e zero imagens pesadas, garantindo renderização instantânea e fluidez em celulares básicos.
- **Número de WhatsApp Configurável**: Como o número exato de contato não foi informado no prompt, utilizaremos uma variável de ambiente pública (`VITE_WHATSAPP_NUMBER`) com um número de demonstração centralizado em configuração, pronto para substituição imediata sem alterar componentes.

---

## 1. Overview & Core Concept

- **O Que Faz**: Apresenta os serviços técnicos de Rodrigo Soluções Digitais em uma jornada estratégica de conversão — da proposta de valor à prova de resultados e ao agendamento guiado em menos de um minuto.
- **Público-Alvo**:
  - *Pessoa Física (PF)*: Profissionais autônomos e usuários domésticos que precisam de computador rápido, suporte confiável ou orientação segura antes de comprar um novo equipamento.
  - *Empresas (PJ)*: Pequenos e médios negócios que buscam sites e sistemas sob medida com foco em conversão, manutenção preventiva/corretiva de estações de trabalho e padronização de compras de hardware.
- **Valor Principal**: Elimina a fricção de orçamentos genéricos ao combinar autoridade técnica clara, segmentação objetiva por perfil (PF e PJ) e triagem imediata via chat estruturado para WhatsApp.

---

## 2. User Experience & Visual Design

- **Fluxos Principais do Usuário**:
  1. *Navegação Direta e Leitura Escaneável*: Barra superior em 3 zonas (`Rodrigo Soluções Digitais` — 4 links em linha única — botão `Agendar Atendimento`), levando às seções estratégicas sem distrações visuais.
  2. *Exploração Estratégica de Serviços (PF vs. PJ)*: Alternância de contexto e detalhamento numerado (`01.` a `03.`) conectando cada solução ao problema real resolvido e ao impacto prático (velocidade, economia na compra de hardware, geração de contatos).
  3. *Chat Guiado de Agendamento Imediato*: Acionado pelos CTAs principais ou pelo gatilho discreto no canto inferior direito (respeitando o limite máximo de 15% da altura em telas móveis). O visitante responde 4 etapas rápidas com validação inline, visualiza o resumo da solicitação e clica no link direto para iniciar a conversa no WhatsApp já com todos os dados organizados (com opção de copiar o texto).

- **Identidade Visual e Tema**:
  - *Direção Estética*: Editorial técnico e minimalismo tipográfico puro — autoridade construída por hierarquia de fontes, espaço em branco generoso, linhas divisórias finas (`1px`) e contraste absoluto.
  - *Paleta de Cores (Regra 60-30-10)*:
    - **60% Fundo Neutro**: Branco puro (`#FFFFFF`) e branco suave (`#F8FAFC`) para áreas de respiro e máxima legibilidade.
    - **30% Estrutura e Contraste**: Preto profundo (`#0A0A0A`) para títulos, seções de destaque de alto impacto e tipografia principal, combinado a cinza grafite (`#475569`) e bordas sutis (`#E2E8F0`).
    - **10% Acento Estratégico**: Azul cobalto profissional (`#1D4ED8` com hover `#1E40AF`) reservado exclusivamente para ações de conversão, estados ativos e indicadores de foco.
  - *Tipografia e Hierarquia*:
    - **Display / Títulos**: `Plus Jakarta Sans` (pesos 600 e 700, `tracking-tight`, `text-wrap: balance` para evitar palavras órfãs, escala responsiva `clamp(2.25rem, 4.5vw, 3.75rem)` no Hero).
    - **Corpo / Leitura**: `Public Sans` (pesos 400 e 600, `16px`, `line-height: 1.6`, largura máxima de `65ch`).
    - **Métricas e Índices**: `JetBrains Mono` com `tabular-nums` para alinhamento numérico perfeito em prazos, indicadores de impacto e numeração editorial.
  - *Disciplina de Layout e Acessibilidade*:
    - Zero ícones, zero emojis, zero pílulas/badges decorativos, zero barras laterais grossas e zero marcas d'água fantasma. Metadados exibidos em texto limpo separado por `·`.
    - Alvos de toque com altura mínima de `44px` no mobile, foco visível (`focus-visible`) em azul de alto contraste, contraste mínimo WCAG AA (4.5:1) e link "Ir para o conteúdo principal".
    - Seções estruturadas em cadência de conversão: **Proposta de Valor (Hero + Faixa de Alcance) → Soluções Especializadas (Bento Assimétrico) → Diferencial e Prova de Impacto (PF e PJ) → Perguntas Frequentes e Conversão Final**.

- **Feedback Interativo e Micro-interações**:
  - Transições leves apenas em `transform` e `opacity` (≤ 200ms) com respeito automático a `prefers-reduced-motion`.
  - Conteúdo principal 100% visível imediatamente no carregamento inicial (sem bloqueio por animações de scroll).
  - Validação clara em tempo real no chat de agendamento com mensagens explícitas em texto (sem depender apenas de cor).

---

## 3. Key Product Decisions & Trade-Offs

- **Decisão 1: Minimalismo Tipográfico Sem Pacotes de Ícones ou Imagens Externas**
  - *Abordagem Escolhida*: Layout puramente tipográfico e geométrico com CSS utilitário, sem biblioteca de ícones renderizada em tela e sem imagens externas.
  - *Por quê*: Atende integralmente à restrição de não usar ícones/emojis/gráficos desnecessários e reduz drasticamente o payload de rede para abertura instantânea em 4G e renderização sem engasgos em celulares simples.
  - *Alternativas Descartadas*: Fotos geradas ou SVGs decorativos, que aumentariam o peso da página e diluiriam o foco no texto de conversão.

- **Decisão 2: Chat Guiado Direto para WhatsApp (Sem Banco de Dados)**
  - *Abordagem Escolhida*: Máquina de estados determinística no cliente com validação rigorosa, resumo editável/copiável e link `https://wa.me/...` seguro (`rel="noopener noreferrer"`).
  - *Por quê*: Elimina latência de servidor, custos de manutenção e falhas de envio em conexões instáveis, levando o lead diretamente ao canal de fechamento imediato.
  - *Alternativas Descartadas*: Chat com IA generativa ou persistência em banco de dados, descartadas conforme preferência confirmada na Fase 1.

- **Decisão 3: SEO Estruturado + TDD com Ferramentas Nativas**
  - *Abordagem Escolhida*: Metadados completos (`title`, `description`, OpenGraph, Twitter Cards, canonical) e dados estruturados JSON-LD (`ProfessionalService`, catálogo de `Service` e `FAQPage`), aliados a uma suíte TDD usando o runner nativo do Node (`node:test` + `tsx`) para testar lógica de domínio, geração de URL do WhatsApp, validações e renderização de componentes sem adicionar bibliotecas terceiras não autorizadas.
  - *Por quê*: Cumpre rigorosamente a regra de TDD Total, arquivos curtos (< 250 linhas), SOLID/DRY/KISS e proibição de dependências externas não solicitadas.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Diagrama de Arquitetura e Fluxo de Dados**:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         Camada SEO & Documento                          │
│  Meta Tags (OG/Twitter) · Canonical · JSON-LD (ProfessionalService/FAQ) │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       Casca de Aplicação & Layout                       │
│  Skip Link · Barra Superior (3 Zonas) · Seções de Conversão · Rodapé    │
└──────────┬─────────────────────────┬────────────────────────┬───────────┘
           │                         │                        │
           ▼                         ▼                        ▼
┌─────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  Catálogo & Prova   │  │  Filtro de Perfil    │  │ Chat de Agendamento  │
│  Serviços PF e PJ   │  │  (Todos / PF / PJ)   │  │  Fluxo em 4 Etapas   │
│  Métricas e FAQ     │  └──────────────────────┘  └──────────┬───────────┘
└─────────────────────┘                                       │
                                                              ▼
                                                   ┌──────────────────────┐
                                                   │   Domínio & Regras   │
                                                   │  Validação de Campos │
                                                   │  Construtor WhatsApp │
                                                   └──────────┬───────────┘
                                                              │
                                                              ▼
                                                   ┌──────────────────────┐
                                                   │  Suíte de Testes TDD │
                                                   │  Unitários + Fluxo   │
                                                   └──────────────────────┘
```

- **Modelo de Estado e Entidades**:
  - *Catálogo de Serviços e Provas*: Estruturas tipadas contendo código editorial (`01`, `02`, `03`), público (`PF`, `PJ` ou `Ambos`), título, proposta de valor, entregáveis objetivos e impacto quantificado.
  - *Estado do Chat de Agendamento*: Mantido por fluxo controlado com etapa atual (`servico` → `perfil` → `modalidade` → `detalhes` → `resumo`), dados do solicitante (nome, serviço, perfil, modalidade remota/presencial, turno preferido, descrição), erros de validação por campo e estado de confirmação/cópia.
- **Mapeamento de Interações e Manipuladores**:
  - *Barra de Navegação e CTAs de Seção*: Rolagem suave acessível para âncoras (`#solucoes`, `#resultados`, `#processo`, `#faq`) ou abertura direta do chat pré-selecionando o serviço clicado (ex.: clicar em "Solicitar consultoria de compra" já abre o chat na etapa seguinte com o serviço preenchido).
  - *Seletor de Público (PF / PJ)*: Filtra e destaca os casos de uso e argumentos específicos sem recarregar a página.
  - *Acordeão de Perguntas Frequentes (FAQ)*: Botões nativos acessíveis (`aria-expanded`, `aria-controls`) para expansão instantânea sem dependência de bibliotecas externas.
  - *Chat de Agendamento*: Botões de escolha rápida por etapa, botão de voltar etapa, validação síncrona antes de avançar, geração determinística da mensagem e URL codificada para WhatsApp, além de botão funcional para copiar o resumo para a área de transferência.
- **Estratégia de Modularização (< 250 linhas por arquivo) e TDD**:
  - Separação estrita entre dados/conteúdo estático, regras puras de negócio (validação de formulário, formatação de mensagem, montagem segura de link `wa.me`, gerador de schema JSON-LD) e componentes visuais enxutos.
  - Cada módulo de regra e cada fluxo principal de interface terá testes unitários e de integração correspondentes executados antes da entrega final.
