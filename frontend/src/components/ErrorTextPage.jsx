const ErrorTextPage = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-red">{error}</p>
    </div>
  );
};

export default ErrorTextPage;
