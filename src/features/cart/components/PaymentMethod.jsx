import { Input } from '@/shared/ui/input'

const METHODS = [
  { id: 'card', label: 'Card' },
  { id: 'cod', label: 'Cash on delivery' },
  { id: 'wallet', label: 'Wallet' },
]

function PaymentMethod({ method, onSelect, card, onCardChange }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={method === m.id}
            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
              method === m.id
                ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                : 'border-white/10 hover:border-white/25'
            }`}
          >
            <span className="block text-sm font-semibold text-white">{m.label}</span>
            <span className={`text-xs ${method === m.id ? 'text-[var(--accent)]' : 'text-white/40'}`}>
              {method === m.id ? 'Selected' : 'Select'}
            </span>
          </button>
        ))}
      </div>

      {method === 'card' && (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-dashed border-white/15 p-4 sm:grid-cols-[1.4fr_1fr_1fr]">
          <Input
            placeholder="Card number"
            aria-label="Card number"
            inputMode="numeric"
            value={card.number}
            onChange={(e) => onCardChange('number', e.target.value)}
          />
          <Input
            placeholder="Expiry MM/YY"
            aria-label="Expiry"
            value={card.expiry}
            onChange={(e) => onCardChange('expiry', e.target.value)}
          />
          <Input
            placeholder="CVC"
            aria-label="CVC"
            inputMode="numeric"
            value={card.cvc}
            onChange={(e) => onCardChange('cvc', e.target.value)}
          />
        </div>
      )}
    </div>
  )
}

export default PaymentMethod
