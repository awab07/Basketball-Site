import { useState } from 'react'
import { BALL_COLORS, BALL_SIZES } from '@/features/basketball-customizer/lib/editorConfig'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Separator } from '@/shared/ui/separator'

function ShowHideButton({ visible, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="text-xs font-semibold text-[var(--ink)]/55 hover:text-[var(--ink)]">
      {visible ? 'Hide' : 'Show'}
    </button>
  )
}

function ColorInput({ value, onChange, label = 'Custom' }) {
  return (
    <label className="flex items-center gap-3 text-sm text-[var(--ink)]/75">
      {label}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-14 cursor-pointer rounded-lg border border-[var(--ink)]/15 bg-transparent"
      />
    </label>
  )
}

function ColorPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-[var(--ink)]">Ball color</h3>
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
                ? 'scale-110 border-[var(--ink)] outline outline-2 outline-offset-2 outline-[var(--accent)]'
                : 'border-[var(--ink)]/20 hover:scale-110 hover:border-[var(--ink)]/45'
            }`}
            style={{ background: c.hex }}
          />
        ))}
      </div>
      <ColorInput value={design.color} onChange={actions.setColor} label="Custom color" />
    </div>
  )
}

function SizePanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-[var(--ink)]">Ball size</h3>
      <div className="flex flex-wrap gap-2">
        {BALL_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={design.size === s.id}
            onClick={() => actions.setSize(s.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              design.size === s.id
                ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--ink)]'
                : 'border-[var(--ink)]/15 text-[var(--ink)]/70 hover:border-[var(--ink)]/30 hover:text-[var(--ink)]'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function TextPanel({ design, actions }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--ink)]">Text</h3>
        <ShowHideButton visible={design.text.visible} onToggle={actions.toggleTextVisible} />
      </div>
      <Input
        value={design.text.value}
        maxLength={16}
        placeholder="e.g. YOUR NAME"
        onChange={(e) => actions.setTextValue(e.target.value)}
        onBlur={actions.commitTextEdit}
      />
      <p className="-mt-2 text-xs text-[var(--ink)]/45">{design.text.value.length} / 16 characters</p>
      <ColorInput value={design.text.color} onChange={actions.setTextColor} label="Text color" />
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
        <h3 className="text-sm font-semibold text-[var(--ink)]">Upload logo</h3>
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
          dragOver ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--ink)]/15 hover:border-[var(--ink)]/30'
        }`}
      >
        <input
          id="logo-upload"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <span className="text-sm font-medium text-[var(--ink)]/80">Drag and drop or browse</span>
        <span className="text-xs text-[var(--ink)]/45">PNG, JPG, SVG · best under 5MB</span>
      </label>

      {design.logo.dataUrl ? (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--ink)]/10 bg-[var(--studio-panel)] p-3">
          <img src={design.logo.dataUrl} alt="" className="h-12 w-12 rounded-lg bg-[var(--ink)]/10 object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--ink)]">{design.logo.fileName || 'Uploaded logo'}</p>
            <p className="text-xs text-[var(--ink)]/45">Printing on the front-left panel</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={actions.clearLogo}>
            Remove
          </Button>
        </div>
      ) : (
        <p className="text-xs text-[var(--ink)]/45">No logo uploaded yet — it&apos;ll print on the panel once you add one.</p>
      )}
    </div>
  )
}

function ToolPanel({ design, actions }) {
  return (
    <Card>
      <CardHeader className="flex-col items-start gap-1">
        <CardTitle>Customize</CardTitle>
        <p className="text-sm font-normal normal-case tracking-normal text-[var(--ink)]/55">Choose your options</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ColorPanel design={design} actions={actions} />
        <Separator />
        <SizePanel design={design} actions={actions} />
        <Separator />
        <TextPanel design={design} actions={actions} />
        <Separator />
        <LogoPanel design={design} actions={actions} />
      </CardContent>
    </Card>
  )
}

export default ToolPanel
