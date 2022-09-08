import { Icon, IconType } from "brainly-style-guide";

export default function PaginationButton(props: {
  icon: IconType;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <Icon
      disabled={props.disabled}
      size={24} 
      color="icon-black" 
      type={props.icon} 
      onClick={props.onClick} 
    />
  );
}