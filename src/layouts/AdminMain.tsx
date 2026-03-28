function AdminMain({ children }: { children?: React.ReactNode }) {
  return (
    <main className="flex flex-col p-4 sm:px-12 sm:py-8 lg:h-dvh lg:p-0 lg:pt-24 lg:overflow-auto">
      {children}
    </main>
  );
}

export default AdminMain;
