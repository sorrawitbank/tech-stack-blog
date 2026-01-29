function CategoryTag({ children }: { children: string }) {
  return (
    <div className="w-fit px-3 py-1 text-body-2 text-brand-green bg-brand-green-soft rounded-full">
      {children}
    </div>
  );
}

export default CategoryTag;
