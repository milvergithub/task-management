import {ChevronDown, ChevronFirst, ChevronLast, type LucideIcon, MoreVertical} from "lucide-react";
import logo from "@/assets/logo.svg";
import profile from "@/assets/logo.svg";
import { createContext, useContext, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {cn} from "@/lib/utils.ts";

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Props para Sidebar
interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-sidebar border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg text-sidebar-primary-foreground hover:bg-sidebar-primary"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-sidebar-foreground flex p-3">
          <img src={profile} className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">constGenius</h4>
              <span className="text-xs text-sidebar-foreground">constgenius@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export type MenuItemProps = {
  title: string;
  path?: string;
  icon: LucideIcon;
  children?: MenuItemProps[];
};

export function SidebarItem({ icon: Icon, title, path, children }: MenuItemProps) {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarItem must be used within a Sidebar");

  const { expanded } = context;
  const [open, setOpen] = useState(false);

  const baseClasses =
      "relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group";

  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    return (
        <div>
          <div
              className={`${baseClasses} hover:bg-sidebar-primary hover:text-sidebar-primary-foreground text-sidebar-foreground`}
              onClick={() => setOpen((prev) => !prev)}
          >
            <Icon />
            <div className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
              {title}
            </div>
            {expanded && (
                <ChevronDown
                    className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
                    size={16}
                />
            )}
            {!expanded && (
                <div
                    className={cn(
                        "absolute z-50 left-full rounded-md px-3 py-1 ml-4 bg-sidebar-primary text-sidebar-primary-foreground text-sm",
                        "invisible opacity-20 -translate-x-3 transition-all",
                        "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                    )}
                >
                  {title}
                </div>
            )}
          </div>
          <div
              className={cn(
                  "mt-1 space-y-1 overflow-hidden transition-all",
                  open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  expanded ? "pl-6" : "pl-1"
              )}
          >
            {children.map((child, idx) => (
                <SidebarItem key={idx} {...child} title={child.title} />
            ))}
          </div>
        </div>
    );
  }

  return (
      <NavLink
          to={path || "#"}
          className={({ isActive }) =>
              `${baseClasses} ${
                  isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground text-sidebar-foreground"
              }`
          }
      >
        <Icon />
        <div className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {title}
        </div>
        {!expanded && (
            <div
                className={cn(
                    "absolute z-50 left-full rounded-md px-3 py-1 ml-4 bg-sidebar-primary text-sidebar-primary-foreground text-sm",
                    "invisible opacity-20 -translate-x-3 transition-all",
                    "group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                )}
            >
              {title}
            </div>
        )}
      </NavLink>
  );
}

