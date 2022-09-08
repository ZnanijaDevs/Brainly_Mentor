import * as Sentry from "@sentry/react";
import SENTRY_DSN from "../sentry-dsn.txt";

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production"
});