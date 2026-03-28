function AdminLargeHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="fixed top-0 left-70 z-50 flex justify-between items-center px-15 py-6 w-[calc(100%-17.5rem)] bg-brown-100 border-b border-brown-300">
      {children}
    </header>
  );
}

export default AdminLargeHeader;
