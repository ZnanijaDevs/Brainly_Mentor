import { Flex, Headline, Text, Button, Link } from "brainly-style-guide";
import locales from "@locales";

export default function ErrorContainer(props: {
  error: Error;
  onTryAgain: () => void;
}) {
  return (
    <Flex fullWidth direction="column" alignItems="center" justifyContent="center" className="error-container">
      <Headline extraBold color="text-red-60">
        {locales.common.errorOccured}
      </Headline>
      <Text size="small">{props.error.message}</Text>
      <Button variant="outline" onClick={() => props.onTryAgain()}>
        {locales.common.tryAgain}
      </Button>
      <Link size="small" href="/" weight="bold">{locales.common.toHomepage}</Link>
    </Flex>
  );
}