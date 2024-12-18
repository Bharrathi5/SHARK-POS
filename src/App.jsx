import Body from "./components/ui/app/Body";
import NavSide from "./components/ui/app/NavSide";
import { SidebarProvider, SidebarTrigger } from "./components/ui/ui/sidebar";

function App() {
  return (
    <>
      <div className="p-5 flex-col gap-10 relative">
        <SidebarProvider>
          <NavSide />
          <SidebarTrigger />
          <main className="flex w-full">
            <Body />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}

export default App;
