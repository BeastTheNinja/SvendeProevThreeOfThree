type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({
  message = "Something went wrong.",
}: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
