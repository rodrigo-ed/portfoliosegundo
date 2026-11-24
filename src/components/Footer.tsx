interface FooterProps {
  onOpenChat: () => void;
}

export function Footer({onOpenChat}: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 md:pb-12 lg:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-slate-800 pb-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-blue-400">
              Rodrigo Soluções Digitais
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Sites e Sistemas Web · Suporte Técnico · Consultoria em Aquisição de Hardware
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Atendimento remoto para todo o Brasil · Suporte presencial local mediante agendamento
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300 sm:gap-6">
            <a href="#solucoes" className="py-1 hover:text-white hover:underline underline-offset-4">
              Soluções
            </a>
            <a href="#resultados" className="py-1 hover:text-white hover:underline underline-offset-4">
              Resultados
            </a>
            <a href="#processo" className="py-1 hover:text-white hover:underline underline-offset-4">
              Processo
            </a>
            <a href="#faq" className="py-1 hover:text-white hover:underline underline-offset-4">
              Dúvidas
            </a>
            <button
              type="button"
              onClick={onOpenChat}
              className="min-h-[44px] w-full whitespace-nowrap shrink-0 rounded-lg border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-white transition-colors duration-150 hover:border-[#1D4ED8] hover:bg-[#1D4ED8] cursor-pointer sm:w-auto"
            >
              Agendar via WhatsApp
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Rodrigo Soluções Digitais. Todos os direitos reservados.</p>
          <p>Atendimento para Pessoa Física (PF) e Empresas (PJ).</p>
        </div>
      </div>
    </footer>
  );
}
