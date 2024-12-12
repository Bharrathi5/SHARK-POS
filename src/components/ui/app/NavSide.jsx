import {
  Store,
  Package,
  ShoppingBag,
  SquareLibrary,
  Trello,
  PackagePlus,
  Drill,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../sidebar";

const NavSide = () => {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    }
  };

  const items = [
    {
      title: "Point of Sale",
      url: "/",
      icon: Store,
    },
    {
      title: "Inventory Management",
      url: "/inventory",
      icon: Package,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingBag,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: SquareLibrary,
    },
    {
      title: "Brands",
      url: "/brands",
      icon: Trello,
    },
    {
      title: "Suppliers",
      url: "/suppliers",
      icon: PackagePlus,
    },
  ];

  return (
    <div>
      <Sidebar
        className="text-sidebar-primary-foreground"
        side="left"
        collapsible="icon"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="xl" asChild>
                  <a href="#">
                    <div>
                      <Drill className="size-5" />
                    </div>
                    <div className="grid flex-1 text-left  leading-tight">
                      <span className="truncate font-bold text-xl">
                        Sivaji Groups
                      </span>
                      <span className="truncate text-sm">Enterprise</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-primary-foreground">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton size="xl" asChild onClick={handleClick}>
                      <Link to={item.url}>
                        <item.icon />
                        <span className="truncate text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default NavSide;
