import { useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ModalContainer from "./ModalContainer";
import ErrorFallback from "./ErrorFallback";

export default function Modal() {
  const modalElement = useRef<HTMLDivElement>(null);

  return (
    <div className="mentors-modal" ref={modalElement}>
      <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => 
        <ErrorFallback error={error} onTryAgain={resetErrorBoundary} />
      }>
        <ModalContainer />
      </ErrorBoundary>
    </div>
  );
}