import { useRef } from "react";
import { ErrorBoundary } from "@sentry/react";

import ModalContainer from "./ModalContainer";
import ErrorFallback from "./ErrorFallback";

export default function Modal() {
  const modalElement = useRef<HTMLDivElement>(null);

  return (
    <div className="mentors-modal" ref={modalElement}>
      <ErrorBoundary fallback={({ error, resetError }) => 
        <ErrorFallback error={error} onTryAgain={resetError} />
      }>
        <ModalContainer />
      </ErrorBoundary>
    </div>
  );
}