import { Button, Icon } from "brainly-style-guide";

export default function CloseModalButton(props: {
  onClick: () => void;
}) {
  return (
    <Button 
      onClick={() => props.onClick()} 
      icon={<Icon color="adaptive" type="close" />} 
      iconOnly 
      variant="transparent"
    />
  );
}