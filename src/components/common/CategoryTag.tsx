function CategoryTag({ children }: { children: string }) {
  return (
    <li className="w-fit px-3 py-1 style-body-2 text-brand-green bg-brand-green-soft rounded-full">
      {children}
    </li>
  );
}

export default CategoryTag;
