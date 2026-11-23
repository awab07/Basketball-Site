import { lazy, Suspense, useRef } from 'react'
import BasketballPreview from '@/shared/components/ball-viewer/BasketballPreview'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

const Basketball3D = lazy(() => import('@/shared/components/ball-viewer/Basketball3D'))

function ZoomOutIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ZoomInIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ResetIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M13.3 8A5.3 5.3 0 1 1 11.6 4M13.3 2.4v3.2h-3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ToolButton({ label, onClick, children }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant="outline" size="icon" onClick={onClick} aria-label={label}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function BasketballStudio({ color, colorName, name = '' }) {
  const ballRef = useRef(null)

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/40 px-6 py-10 sm:px-10 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute h-[60%] w-[60%] rounded-full blur-3xl transition-colors duration-500"
        style={{ background: 'rgba(255,87,34,0.22)' }}
      />

      <Badge variant="live" className="absolute left-5 top-5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live preview
      </Badge>

      <Badge variant="accent" className="absolute right-5 top-5 max-w-[46%]">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/40"
          style={{ background: color }}
        />
        <span className="truncate">{colorName}</span>
      </Badge>

      <div className="relative aspect-square w-full max-w-[340px]">
        <Suspense
          fallback={
            <BasketballPreview
              panelColor={color}
              label={name}
              className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          }
        >
          <Basketball3D ref={ballRef} color={color} interactive autoRotate label={name} />
        </Suspense>
      </div>

      <TooltipProvider delayDuration={200}>
        <div className="relative mt-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
          <ToolButton label="Zoom out" onClick={() => ballRef.current?.zoom(1.2)}>
            <ZoomOutIcon />
          </ToolButton>
          <ToolButton label="Reset view" onClick={() => ballRef.current?.reset()}>
            <ResetIcon />
          </ToolButton>
          <ToolButton label="Zoom in" onClick={() => ballRef.current?.zoom(1 / 1.2)}>
            <ZoomInIcon />
          </ToolButton>
        </div>
      </TooltipProvider>

      <p className="relative mt-3 text-center text-[11px] text-white/35">
        Drag to rotate · Scroll to zoom
      </p>
    </div>
  )
}

export default BasketballStudio
