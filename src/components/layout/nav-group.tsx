'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const baseItem =
  'mx-2 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors'
const inactiveItem = 'text-gray-400 hover:text-gold'
const activeItem =
  'border-r-2 border-r-gold bg-gradient-to-r from-yellow-500/20 to-transparent text-gold'

export function NavGroup({ items }: any) {
  const { state, isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item: any) => {
          const key = `${item.title}-${item.url}`

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={pathname} />

          if (state === 'collapsed' && !isMobile)
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={pathname} />
            )

          return <SidebarMenuCollapsible key={key} item={item} href={pathname} />
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function SidebarMenuLink({ item, href }: { item: any; href: string }) {
  const { setOpenMobile } = useSidebar()
  const active = checkIsActive(href, item)

  return (
    <Collapsible asChild defaultOpen={active} className='group'>
      <SidebarMenuItem>
        <Link href={item.url} onClick={() => setOpenMobile(false)} className='flex items-center gap-2'>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className={cn(baseItem, active ? activeItem : inactiveItem)}>
              {item.icon && (
                <item.icon
                  className={cn('size-4 transition-colors', active ? 'text-gold' : 'text-gray-400 group-hover:text-gold')}
                />
              )}
              <span className='text-sm font-medium'>{item.title}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </Link>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function SidebarMenuCollapsible({ item, href }: { item: any; href: string }) {
  const active = checkIsActive(href, item, true)

  return (
    <Collapsible asChild defaultOpen={active} className='group'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className={cn(baseItem, active ? activeItem : inactiveItem)}>
            {item.icon && (
              <item.icon
                className={cn('size-4 transition-colors', active ? 'text-gold' : 'text-gray-400 group-hover:text-gold')}
              />
            )}
            <span className='text-sm font-medium'>{item.title}</span>
            <ChevronRight className='ms-auto size-4 transition-transform group-data-[state=open]:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className='ms-6 mt-1 border-l border-white/5 pl-3'>
            {item.items.map((subItem: any) => {
              const subActive = checkIsActive(href, subItem)
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={subActive}
                    className={cn('flex items-center gap-2 py-1 text-sm transition-colors', subActive ? activeItem : inactiveItem)}
                  >
                    <Link href={subItem.url}>
                      <span className='text-xs opacity-60'>•</span>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function SidebarMenuCollapsedDropdown({ item, href }: { item: any; href: string }) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={cn(baseItem, checkIsActive(href, item) ? activeItem : inactiveItem)}
          >
            {item.icon && (
              <item.icon
                className={cn('size-4 transition-colors', checkIsActive(href, item) ? 'text-gold' : 'text-muted-foreground group-hover:text-gold')}
              />
            )}
            <span>{item.title}</span>
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start' sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub: any) => (
            <DropdownMenuItem key={sub.url} asChild>
              <Link
                href={sub.url}
                className={cn('flex items-center gap-2 px-2 py-1 transition-colors', checkIsActive(href, sub) ? activeItem : inactiveItem)}
              >
                {sub.icon && <sub.icon className='size-4' />}
                <span>{sub.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function checkIsActive(href: string, item: any, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item?.items?.filter((i: any) => i.url === href).length ||
    (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === item?.url?.split('/')[1])
  )
}
