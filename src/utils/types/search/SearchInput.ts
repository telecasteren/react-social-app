export interface SearchInputProps {
  onSearch?: (searchTerm: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
}
