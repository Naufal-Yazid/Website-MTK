import { redirect } from 'next/navigation'

// Preserve old bookmarks while keeping availability inside the content tabs.
export default function AvailabilityPage() {
  redirect('/admin/content?tab=ketersediaan')
}
