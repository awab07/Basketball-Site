import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useHistoryState } from '../hooks/useHistoryState'
import { computePrice, createDefaultDesign, describeDesign } from '../lib/editorConfig'
import EditorTopBar from '../components/editor/EditorTopBar'
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

    setTextValue: (value) => setDesign((d) => ({ ...d, text: { ...d.text, value } }), { record: false }),
    setTextColor: (color) => setDesign((d) => ({ ...d, text: { ...d.text, color } })),
    toggleTextVisible: () => setDesign((d) => ({ ...d, text: { ...d.text, visible: !d.text.visible } })),

    setLogo: (dataUrl, fileName) =>
      setDesign((d) => ({ ...d, logo: { dataUrl, fileName, visible: true } })),
    clearLogo: () => setDesign((d) => ({ ...d, logo: { dataUrl: null, fileName: '', visible: true } })),
    toggleLogoVisible: () => setDesign((d) => ({ ...d, logo: { ...d.logo, visible: !d.logo.visible } })),

    commitTextEdit: commit,
  }

  const price = computePrice(design, qty)

  function handleAddToCart() {
    const { colorName, label, hasLogo, printSides } = describeDesign(design)
    addToCart(
      {
        size: '7',
        color: design.color,
        colorName,
        label,
        hasLogo,
        printSides,
        unitPrice: price.unit,
      },
      qty,
    )
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-[1400px] gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_400px] lg:items-start">
          <Viewer design={design} />

          <div className="flex flex-col gap-6">
            <ToolPanel design={design} actions={actions} />

            <RightPanel
              price={price}
              qty={qty}
              onQtyChange={setQty}
              onAddToCart={handleAddToCart}
              addedFlash={addedFlash}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignEditor
