import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

export const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            {error.status} - {error.statusText} - {error.data}
          </AlertDescription>
        </Alert>
      </div>
    );
  } else {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Oops! -</AlertTitle>
        <AlertDescription>
          De pagina kan niet geladen worden...
        </AlertDescription>
      </Alert>
    );
  }
};
