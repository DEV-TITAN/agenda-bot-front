import type { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path === undefined) {
      return {};
    }

    return (validationErrors[error.path] = error.message);
  });

  return validationErrors;
}
