import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { HomeIcon, LinkIcon, SettingsIcon } from 'lucide-react'
import { getSession } from '@/auth'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async () => {
    const { data } = await getSession()

    if (!data) {
      throw redirect({ to: '/auth/sign-in' })
    }
  },
  component: DashboardLayout,
})

const navItems = [
  { title: 'Dashboard', url: '/', icon: HomeIcon },
  { title: 'Connections', url: '/connections', icon: LinkIcon },
  { title: 'Settings', url: '/settings', icon: SettingsIcon },
]

function DashboardLayout() {
  const location = useLocation()

  const getCurrentPageTitle = () => {
    const item = navItems.find((i) => i.url === location.pathname)
    return item?.title ?? 'Dashboard'
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">{getCurrentPageTitle()}</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
