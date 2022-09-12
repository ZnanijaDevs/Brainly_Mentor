import { Text } from "brainly-style-guide";

export default function TabLink(props: {
  title: string;
  active: boolean;
  onChoose: () => void;
}) {
  const { title, active, onChoose } = props;

  return (
    <Text 
      type="span" 
      className="modal-tab-link" 
      onClick={onChoose}
      color={active ? "text-black" : "text-gray-70"}
      inherited
    >{title}</Text>
  );
}