import { Input } from '../ui/input'

function ShippingForm({ values, onChange }) {
  function field(key) {
    return {
      value: values[key],
      onChange: (e) => onChange(key, e.target.value),
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input placeholder="Full name" aria-label="Full name" required {...field('fullName')} />
        <Input type="tel" placeholder="Phone" aria-label="Phone" required {...field('phone')} />
      </div>
      <Input placeholder="Street address" aria-label="Street address" required {...field('address')} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input placeholder="City" aria-label="City" required {...field('city')} />
        <Input placeholder="Postal code" aria-label="Postal code" required {...field('postalCode')} />
      </div>
    </div>
  )
}

export default ShippingForm
