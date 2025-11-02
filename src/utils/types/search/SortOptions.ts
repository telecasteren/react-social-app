export interface SortOptionsProps {
  triggerType?: "button" | "span";
  triggerText?: string;
  triggerClasses?: string;
  containerClasses?: string;
  onSortByCreated?: () => void;
  onSortByLikes?: () => void;
  onSortByComments?: () => void;
}
