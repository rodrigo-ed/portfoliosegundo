interface HeaderProps {
  onOpenChat: () => void;
}

const NAV_LINKS = [
  {href: '#solucoes', label: 'Soluções'},
  {href: '#resultados', label: 'Resultados'},
  {href: '#processo', label: 'Processo'},
  {href: '#faq', label: 'Dúvidas'},
];

export function Header({onOpenChat}: HeaderProps) {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-6 sm:px-6 sm:py-4 md:gap-8 lg:px-8">
        <a
          href="#topo"
          className="whitespace-nowrap shrink-0 font-display text-sm font-bold tracking-tight text-[#1D4ED8] transition-colors duration-150 hover:text-[#1E40AF] sm:text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
        >
          Rodrigo Soluções Digitais
        </a>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-[#0A0A0A] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenChat}
            className="min-h-[44px] whitespace-nowrap shrink-0 rounded-lg bg-[#1D4ED8] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] cursor-pointer sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar Atendimento</span>
          </button>
        </div>
      </div>
    </header>
  );
}
