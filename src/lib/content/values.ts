export type ContentValues = Record<string, string>
export type ContentBundle = Record<string, ContentValues>
export type ContentPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> }

// One numeric source for the displayed card price and the KPR calculator.
export function shortPrice(value: string) {
  const price = Number(value)
  return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 3 }).format(price / 1000000)} Jt`
}
