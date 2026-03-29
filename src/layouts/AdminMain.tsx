import { ScrollArea } from "@/components/ui/scroll-area";

function AdminMain({ children }: { children?: React.ReactNode }) {
  return (
    <ScrollArea className="lg:h-dvh">
      <main className="flex flex-col p-4 sm:px-12 sm:py-8 lg:p-0 lg:pt-24">
        {children}
      </main>
    </ScrollArea>
  );
}

export default AdminMain;
