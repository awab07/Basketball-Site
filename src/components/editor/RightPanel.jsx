import { Button } from '../ui/button'

function buildLayers(design, actions) {
  return [
    { key: 'ball', label: `Ball color · ${design.color}`, locked: true },
    design.text.value.trim() && {
      key: 'text',
      label: `Text · ${design.text.value}`,
      visible: design.text.visible,
      onToggle: actions.toggleTextVisible,
    },
    design.number.value.trim() && {
      key: 'number',
      label: `Number · ${design.number.value}`,
      visible: design.number.visible,
      onToggle: actions.toggleNumberVisible,
    },
    design.logo.dataUrl && {
      key: 'logo',
      label: `Logo · ${design.logo.fileName || 'image'}`,
      visible: design.logo.visible,
      onToggle: actions.toggleLogoVisible,
    },
    design.clipart.id && {
      key: 'clipart',
      label: `Clipart · ${design.clipart.id}`,
      visible: design.clipart.visible,
      onToggle: actions.toggleClipartVisible,
    },
  ].filter(Boolean)
}

function RightPanel({ design, actions, price, qty, onQtyChange, onAddToCart, addedFlash }) {
  const layers = buildLayers(design, actions)

  return (
    <div className="flex w-[300px] shrink-0 flex-col overflow-y-auto border-l border-white/[0.08] p-5">
      <h3 className="text-sm font-semibold text-white">Layers</h3>
      <ul className="mt-3 flex flex-col gap-1">
        {layers.map((layer) => (
          <li
            key={layer.key}
            className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-white/[0.04]"
          >
            <span className="truncate text-white/75">{layer.label}</span>
            {layer.locked ? (
              <span className="shrink-0 text-xs text-white/30">Locked</span>
            ) : (
              <button
                type="button"
                onClick={layer.onToggle}
                className="shrink-0 text-xs font-semibold text-white/50 hover:text-white"
              >
                {layer.visible ? 'Hide' : 'Show'}
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-5">
        <h3 className="text-sm font-semibold text-white">Price</h3>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm">
          {price.lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between text-white/60">
              <span>{line.label}</span>
              <span>${line.amount}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
          <span>Total</span>
          <span>${price.total}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-white/60">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
          <button
            type="button"
            onClick={() => onQtyChange(qty + 1)}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            +
          </button>
        </div>
      </div>

      <Button type="button" size="lg" className="mt-5 w-full" onClick={onAddToCart}>
        {addedFlash ? 'Added ✓' : `Add to cart · $${price.total}`}
      </Button>
    </div>
  )
}

export default RightPanel
