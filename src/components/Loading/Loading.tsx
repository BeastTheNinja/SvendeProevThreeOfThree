type LoadingProps = {
  message?: string;
};

function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <div role="status">
      <p>{message}</p>
    </div>
  );
}

export default Loading;
