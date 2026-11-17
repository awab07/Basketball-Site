import { useState } from 'react'

// A small undo/redo-capable state container, backed entirely by useState
// (no refs) so canUndo/canRedo are plain render-time reads.
//
// `setState` records a new history entry by default. Pass `{ record: false }`
// for high-frequency updates (e.g. every keystroke) — it replaces the
// current history entry in place instead of pushing a new one, so undo
// collapses a whole typing session into a single step back to before it
// started, rather than one step per keystroke. `commit` is kept as a no-op
// for callers that used to need an explicit "finalize this edit" step.
export function useHistoryState(initial) {
  const [history, setHistory] = useState(() => [typeof initial === 'function' ? initial() : initial])
  const [index, setIndex] = useState(0)
  const state = history[index]

  function setState(updater, { record = true } = {}) {
    const next = typeof updater === 'function' ? updater(state) : updater
    if (record) {
      setHistory((h) => [...h.slice(0, index + 1), next])
      setIndex((i) => i + 1)
    } else {
      setHistory((h) => h.map((entry, i) => (i === index ? next : entry)))
    }
  }

  function commit() {}

  function undo() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function redo() {
    setIndex((i) => Math.min(history.length - 1, i + 1))
  }

  return {
    state,
    setState,
    commit,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  }
}
