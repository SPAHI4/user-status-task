import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { RootLayout } from './layouts/RootLayout.tsx';
import { EmployeesPage } from './pages/EmployeesPage.tsx';
import { Button } from './components/Button.tsx';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <div className="text-gray-600 mb-6">
          <p className="mb-2">Error message:</p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{(error as Error).message}</pre>
        </div>
        <Button onClick={resetErrorBoundary} variant="outlined">
          Try again
        </Button>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-700">Loading...</h3>
          </div>
        }
      >
        <RootLayout>
          <EmployeesPage />
        </RootLayout>
      </Suspense>
    </ErrorBoundary>
  );
}
