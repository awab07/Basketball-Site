import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useHistoryState } from '../hooks/useHistoryState'
import { computePrice, createDefaultDesign, TEMPLATES } from '../lib/editorConfig'
import EditorTopBar from '../components/editor/EditorTopBar'
import ToolRail from '../components/editor/ToolRail'
import ToolPanel from '../components/editor/ToolPanel'
import Viewer from '../components/editor/Viewer'
import RightPanel from '../components/editor/RightPanel'

const STORAGE_KEY = 'bab-design-v1'
const AUTOSAVE_DELAY = 800
const HEX_PATTERN = /^#[0-9a-f]{6}$/i

function loadInitialDesign(colorOverride) {
  let design
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    design = parsed ? { ...createDefaultDesign(), ...parsed } : createDefaultDesign()
  } catch {
    design = createDefaultDesign()
  }
  if (colorOverride && HEX_PATTERN.test(colorOverride)) design = { ...design, color: colorOverride }
  return design
}

function DesignEditor() {
  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()
  const { state: design, setState: setDesign, commit, undo, redo, canUndo, canRedo } = useHistoryState(() =>
    loadInitialDesign(searchParams.get('color')),
  )
  const [activeTool, setActiveTool] = useState('color')
  const [qty, setQty] = useState(1)
  const [saveStatus, setSaveStatus] = useState('Autosaved')
  const [addedFlash, setAddedFlash] = useState(false)
  const saveTimeout = useRef(null)

  // Debounced autosave to localStorage, with a small "Autosaved" indicator
  // next to Undo/Redo so edits visibly persist without a Save click.
  useEffect(() => {
    clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(design))
        setSaveStatus('Autosaved')
      } catch {
        setSaveStatus('Save failed')
      }
    }, AUTOSAVE_DELAY)
    return () => clearTimeout(saveTimeout.current)
  }, [design])

  const actions = {
    setColor: (hex) => setDesign((d) => ({ ...d, color: hex })),
    setPattern: (id) => setDesign((d) => ({ ...d, pattern: id })),

    setTextValue: (value) => setDesign((d) => ({ ...d, text: { ...d.text, value } }), { record: false }),
    setTextColor: (color) => setDesign((d) => ({ ...d, text: { ...d.text, color } })),
    toggleTextVisible: () => setDesign((d) => ({ ...d, text: { ...d.text, visible: !d.text.visible } })),

    setNumberValue: (value) =>
      setDesign((d) => ({ ...d, number: { ...d.number, value } }), { record: false }),
    setNumberColor: (color) => setDesign((d) => ({ ...d, number: { ...d.number, color } })),
    toggleNumberVisible: () => setDesign((d) => ({ ...d, number: { ...d.number, visible: !d.number.visible } })),

    setLogo: (dataUrl, fileName) =>
      setDesign((d) => ({ ...d, logo: { dataUrl, fileName, visible: true } })),
    clearLogo: () => setDesign((d) => ({ ...d, logo: { dataUrl: null, fileName: '', visible: true } })),
    toggleLogoVisible: () => setDesign((d) => ({ ...d, logo: { ...d.logo, visible: !d.logo.visible } })),

    setClipartId: (id) => setDesign((d) => ({ ...d, clipart: { ...d.clipart, id, visible: true } })),
    setClipartColor: (color) => setDesign((d) => ({ ...d, clipart: { ...d.clipart, color } })),
    toggleClipartVisible: () =>
      setDesign((d) => ({ ...d, clipart: { ...d.clipart, visible: !d.clipart.visible } })),

    applyTemplate: (template) => setDesign(() => JSON.parse(JSON.stringify(template.design))),
    commitTextEdit: commit,
  }

  const price = computePrice(design, qty)

  function handleAddToCart() {
    addToCart(qty)
    setAddedFlash(true)
    setTimeout(() => setAddedFlash(false), 1600)
  }

  function handleSaveClick() {
    clearTimeout(saveTimeout.current)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(design))
      setSaveStatus('Saved ✓')
    } catch {
      setSaveStatus('Save failed')
    }
    setTimeout(() => setSaveStatus('Autosaved'), 1500)
  }

  async function handleShareClick() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setSaveStatus('Link copied!')
    } catch {
      setSaveStatus('Could not copy link')
    }
    setTimeout(() => setSaveStatus('Autosaved'), 1500)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--ink)] text-white">
      <EditorTopBar
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        saveStatus={saveStatus}
        onSave={handleSaveClick}
        onShare={handleShareClick}
        total={price.total}
        onQuickAdd={handleAddToCart}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <ToolRail active={activeTool} onSelect={setActiveTool} />

        <ToolPanel tool={activeTool} design={design} actions={actions} templates={TEMPLATES} />

        <Viewer design={design} />

        <RightPanel
          design={design}
          actions={actions}
          price={price}
          qty={qty}
          onQtyChange={setQty}
          onAddToCart={handleAddToCart}
          addedFlash={addedFlash}
        />
      </div>
    </div>
  )
}

export default DesignEditor
