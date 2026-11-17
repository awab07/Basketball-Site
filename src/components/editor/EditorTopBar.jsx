import { Link } from 'react-router-dom'
import { Logomark } from '../Navbar'
import { Button } from '../ui/button'

function BackIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M9.5 3L4 8l5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UndoIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M4 7H10.5A3 3 0 0113.5 10A3 3 0 0110.5 13H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 4.2L4 7l2.5 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RedoIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path d="M12 7H5.5A3 3 0 002.5 10A3 3 0 005.5 13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 4.2L12 7l-2.5 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditorTopBar({ canUndo, canRedo, onUndo, onRedo, saveStatus, onSave, onShare, total, onQuickAdd }) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-black/40 px-4 py-2.5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <BackIcon />
          Back
        </Link>

        <div className="hidden items-center gap-2 border-l border-white/10 pl-4 sm:flex">
          <Logomark />
          <span className="font-[var(--font-display)] text-sm font-medium text-white">Design studio</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={onUndo}
        >
          <UndoIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Redo"
          disabled={!canRedo}
          onClick={onRedo}
        >
          <RedoIcon />
        </Button>
        <span className="ml-1 hidden text-xs text-white/40 sm:inline">{saveStatus}</span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onSave}>
          Save
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onShare}>
          Share
        </Button>
        <Button type="button" size="sm" onClick={onQuickAdd}>
          Add to cart · ${total}
        </Button>
      </div>
    </header>
  )
}

export default EditorTopBar
