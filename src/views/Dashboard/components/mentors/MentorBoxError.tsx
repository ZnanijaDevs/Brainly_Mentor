import { Text, Icon } from "brainly-style-guide";

export default function MentorBoxError(props: {
  error: Error;
}) {
  const { error } = props;

  return (
    <div className="mentor-box__error-container">
      <Icon color="adaptive" size={16} type="clear" />
      <Text size="small" type="span" weight="bold">{error.message}</Text>
    </div>
  );
}