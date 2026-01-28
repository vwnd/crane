import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/connections')({
  component: ConnectionsPage,
})

function ConnectionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Connections</h1>
      <p className="mt-2 text-muted-foreground">Manage your connections.</p>
    </div>
  )
}
