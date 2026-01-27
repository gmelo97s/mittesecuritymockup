import { Link, useLocation } from "react-router-dom";
import { UserPlus, Search, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: UserPlus, label: "Cadastro" },
  { path: "/seguranca", icon: Search, label: "Segurança" },
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-all",
                  isActive && "drop-shadow-[0_0_8px_hsl(330_100%_50%_/_0.8)]"
                )}
              />
              <span className={cn(
                "text-xs font-medium font-orbitron",
                isActive && "text-glow-pink"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
