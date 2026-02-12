import Sidebar, { type MenuItemProps, SidebarItem } from '@/components/ui/sidebar.tsx';
import { Layers } from "lucide-react";

const items: MenuItemProps[] = [
  {
    title: "TASKS",
    path: "tasks",
    icon: Layers,
  }
];
export function AppSidebar() {
  return (
    <Sidebar>
      {items.map((item, idx) => (
          <SidebarItem key={idx} {...item} title={item.title} />
      ))}
    </Sidebar>
  );
}
