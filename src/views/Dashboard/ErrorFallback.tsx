import locales from "@locales";
import { Headline, Text, Flex, Button } from "brainly-style-guide";

export default function ErrorFallback(props: {
  error: Error;
  onTryAgain?: () => void;
}) {
  const { error } = props;

  return (
    <div id="modal-error-container">
      <Headline extraBold color="text-red-60">{locales.errors.internalError}</Headline>
      <Text size="small">{error.message}</Text>
      <Flex marginTop="xs">
        <Button type="outline" onClick={() => props.onTryAgain?.()}>{locales.common.tryAgain}</Button>
      </Flex>
    </div>
  );
}