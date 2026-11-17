import { useState } from 'react'
import { BALL_COLORS } from '../../lib/editorConfig'
import { CLIPARTS, PATTERNS } from '../../lib/textures'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function ShowHideButton({ visible, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="text-xs font-semibold text-white/50 hover:text-white">
      {visible ? 'Hide' : 'Show'}
    </button>
  )
}

function ColorInput({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 text-sm text-white/70">
      Custom
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-14 cursor-pointer rounded-lg border border-white/15 bg-transparent"
      />
    </label>
  )
}

function ColorPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-white">Ball color</h3>
      <div className="flex flex-wrap gap-3">
        {BALL_COLORS.map((c) => (
          <button
            key={c.hex}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={design.color === c.hex}
            onClick={() => actions.setColor(c.hex)}
            className={`h-10 w-10 rounded-full border-2 transition-all duration-200 ${
              design.color === c.hex
                ? 'scale-110 border-white outline outline-2 outline-offset-2 outline-[var(--accent)]'
                : 'border-white/20 hover:scale-110 hover:border-white/50'
            }`}
            style={{ background: c.hex }}
          />
        ))}
      </div>
      <ColorInput value={design.color} onChange={actions.setColor} />
    </div>
  )
}

function TextPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Text</h3>
        <ShowHideButton visible={design.text.visible} onToggle={actions.toggleTextVisible} />
      </div>
      <Input
        value={design.text.value}
        maxLength={16}
        placeholder="e.g. YOUR NAME"
        onChange={(e) => actions.setTextValue(e.target.value)}
        onBlur={actions.commitTextEdit}
      />
      <p className="-mt-2 text-xs text-white/40">{design.text.value.length} / 16 characters</p>
      <ColorInput value={design.text.color} onChange={actions.setTextColor} />
    </div>
  )
}

function NumberPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Number</h3>
        <ShowHideButton visible={design.number.visible} onToggle={actions.toggleNumberVisible} />
      </div>
      <Input
        value={design.number.value}
        maxLength={2}
        inputMode="numeric"
        placeholder="e.g. 23"
        onChange={(e) => actions.setNumberValue(e.target.value.replace(/[^0-9]/g, ''))}
        onBlur={actions.commitTextEdit}
      />
      <p className="-mt-2 text-xs text-white/40">Prints on the back panel</p>
      <ColorInput value={design.number.color} onChange={actions.setNumberColor} />
    </div>
  )
}

function LogoPanel({ design, actions }) {
  const [dragOver, setDragOver] = useState(false)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => actions.setLogo(reader.result, file.name)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Upload logo</h3>
        <ShowHideButton visible={design.logo.visible} onToggle={actions.toggleLogoVisible} />
      </div>

      <label
        htmlFor="logo-upload"
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragOver ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-white/15 hover:border-white/30'
        }`}
      >
        <input
          id="logo-upload"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <span className="text-sm font-medium text-white/80">Drag and drop or browse</span>
        <span className="text-xs text-white/40">PNG, JPG, SVG · best under 5MB</span>
      </label>

      {design.logo.dataUrl ? (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <img src={design.logo.dataUrl} alt="" className="h-12 w-12 rounded-lg bg-white/10 object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{design.logo.fileName || 'Uploaded logo'}</p>
            <p className="text-xs text-white/40">Printing on the front-left panel</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={actions.clearLogo}>
            Remove
          </Button>
        </div>
      ) : (
        <p className="text-xs text-white/40">No logo uploaded yet — it&apos;ll print on the panel once you add one.</p>
      )}
    </div>
  )
}

function ClipartPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Clipart</h3>
        <ShowHideButton visible={design.clipart.visible} onToggle={actions.toggleClipartVisible} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => actions.setClipartId(null)}
          aria-pressed={!design.clipart.id}
          className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
            !design.clipart.id
              ? 'border-[var(--accent)] text-[var(--accent)]'
              : 'border-white/10 text-white/60 hover:border-white/25'
          }`}
        >
          None
        </button>
        {CLIPARTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => actions.setClipartId(c.id)}
            aria-pressed={design.clipart.id === c.id}
            className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
              design.clipart.id === c.id
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-white/10 text-white/60 hover:border-white/25'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ColorInput value={design.clipart.color} onChange={actions.setClipartColor} />
    </div>
  )
}

function PatternSwatch({ pattern, color }) {
  const style = { backgroundColor: color }
  if (pattern === 'pinstripe') {
    style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(0,0,0,0.35) 0 2px, transparent 2px 8px)'
  } else if (pattern === 'dots') {
    style.backgroundImage = 'radial-gradient(rgba(0,0,0,0.35) 1.5px, transparent 1.5px)'
    style.backgroundSize = '7px 7px'
  } else if (pattern === 'splatter') {
    style.backgroundImage =
      'radial-gradient(rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(rgba(0,0,0,0.3) 2px, transparent 2px)'
    style.backgroundSize = '9px 9px, 13px 13px'
    style.backgroundPosition = '0 0, 5px 6px'
  }
  return <span aria-hidden className="h-6 w-6 shrink-0 rounded-full border border-white/20" style={style} />
}

function PatternPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-white">Pattern</h3>
      <div className="grid grid-cols-2 gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => actions.setPattern(p.id)}
            aria-pressed={design.pattern === p.id}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
              design.pattern === p.id
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-white/10 text-white/60 hover:border-white/25'
            }`}
          >
            <PatternSwatch pattern={p.id} color={design.color} />
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-white/40">Swatches are a preview — the ball shows the real printed texture.</p>
    </div>
  )
}

function TemplatesPanel({ actions, templates }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-white">Templates</h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => actions.applyTemplate(t)}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 p-3 text-center transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <span className="h-10 w-10 rounded-full border border-white/20" style={{ background: t.design.color }} />
            <span className="text-xs font-medium text-white/80">{t.name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/40">Applying a template replaces your current design.</p>
    </div>
  )
}

function ToolPanel({ tool, design, actions, templates }) {
  return (
    <div className="w-[280px] shrink-0 overflow-y-auto border-r border-white/[0.08] p-5">
      {tool === 'color' && <ColorPanel design={design} actions={actions} />}
      {tool === 'text' && <TextPanel design={design} actions={actions} />}
      {tool === 'logo' && <LogoPanel design={design} actions={actions} />}
      {tool === 'number' && <NumberPanel design={design} actions={actions} />}
      {tool === 'clipart' && <ClipartPanel design={design} actions={actions} />}
      {tool === 'pattern' && <PatternPanel design={design} actions={actions} />}
      {tool === 'templates' && <TemplatesPanel actions={actions} templates={templates} />}
    </div>
  )
}

export default ToolPanel
