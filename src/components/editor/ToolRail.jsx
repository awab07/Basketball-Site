function ColorIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 2.5a7.5 7.5 0 100 15c.9 0 1.5-.7 1.5-1.5 0-.35-.13-.67-.35-.92a1.3 1.3 0 01-.3-.83c0-.72.58-1.3 1.3-1.3h1.47A3.75 3.75 0 0017.5 9.5 7.2 7.2 0 0010 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6.1" cy="8.6" r="1" fill="currentColor" />
      <circle cx="9" cy="5.8" r="1" fill="currentColor" />
      <circle cx="12.7" cy="7.2" r="1" fill="currentColor" />
    </svg>
  )
}

function TextIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path d="M4 5.2h12M10 5.2v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function LogoIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7" cy="8" r="1.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 14l4.3-3.8 2.9 2.6L14 9l3 3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NumberIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M7 3l-1.6 14M14.6 3L13 17M3.5 7.5h13M3 12.5h13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ClipartIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 2.5l2.2 4.6 5 .7-3.6 3.5.9 5L10 13.9l-4.5 2.4.9-5-3.6-3.5 5-.7L10 2.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PatternIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function TemplatesIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8h15M8 8v9.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

const TOOLS = [
  { id: 'color', label: 'Color', Icon: ColorIcon },
  { id: 'text', label: 'Text', Icon: TextIcon },
  { id: 'logo', label: 'Logo', Icon: LogoIcon },
  { id: 'number', label: 'Number', Icon: NumberIcon },
  { id: 'clipart', label: 'Clipart', Icon: ClipartIcon },
  { id: 'pattern', label: 'Pattern', Icon: PatternIcon },
  { id: 'templates', label: 'Templates', Icon: TemplatesIcon },
]

function ToolRail({ active, onSelect }) {
  return (
    <div className="order-2 flex w-full shrink-0 flex-row gap-1 overflow-x-auto border-b border-white/[0.08] p-2 lg:order-none lg:w-[76px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-2.5">
      {TOOLS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          aria-pressed={active === id}
          className={`flex shrink-0 flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-[11px] font-medium transition-colors duration-150 ${
            active === id
              ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
              : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
          }`}
        >
          <Icon />
          {label}
        </button>
      ))}
    </div>
  )
}

export default ToolRail
