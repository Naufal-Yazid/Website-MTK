import type { ContentBundle } from './values'

export const availabilityOptions = [
  { value: 'available', label: 'Tersedia', className: 'border-green-200 bg-green-100 text-green-800' },
  { value: 'limited', label: 'Hampir habis', className: 'border-yellow-200 bg-yellow-100 text-yellow-900' },
  { value: 'sold_out', label: 'Habis', className: 'border-red-200 bg-red-100 text-red-800' },
] as const

export type Availability = typeof availabilityOptions[number]['value']
export const availabilityDefaults: Record<string, Availability> = {
  'tci-1': 'limited', 'tci-2': 'limited', rancamanyar: 'available',
  'permata-buah-batu': 'limited', 'tipe-36': 'available', 'tipe-45': 'available',
  'tipe-50': 'available', 'non-cluster-50': 'available', teranova: 'available',
}

export const availabilityGroups: Record<string, readonly string[]> = {
  tci: ['tci-1', 'tci-2', 'tci-3'],
  'tci-3': ['tipe-36', 'tipe-45', 'tipe-50', 'non-cluster-50', 'teranova'],
  cluster: ['tipe-36', 'tipe-45', 'tipe-50'],
  'non-cluster': ['non-cluster-50'],
  ruko: ['teranova'],
}

export function isAvailability(value: unknown): value is Availability {
  return availabilityOptions.some(option => option.value === value)
}

// A group is sold out only when every member is sold out.
export function availabilityFor(content: ContentBundle, id: string): Availability {
  const members = availabilityGroups[id]
  if (members) {
    const statuses = members.map(member => availabilityFor(content, member))
    if (statuses.includes('available')) return 'available'
    return statuses.includes('limited') ? 'limited' : 'sold_out'
  }
  const stored = content[id]?.availability
  return isAvailability(stored) ? stored : availabilityDefaults[id] ?? 'available'
}

export function availabilityLabel(value: string) {
  return availabilityOptions.find(option => option.value === value)?.label ?? value
}
