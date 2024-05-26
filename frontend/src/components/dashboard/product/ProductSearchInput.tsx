interface ProductSearchInputProps {
  setSearch: (search: string) => void;
  placeholder: string;
}

export const ProductSearchInput = ({
  setSearch,
  placeholder,
}: ProductSearchInputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
