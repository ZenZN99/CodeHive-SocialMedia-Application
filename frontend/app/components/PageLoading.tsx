
type PageLoadingProps = {
  children?: React.ReactNode;
};

const PageLoading = ({ children }: PageLoadingProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex justify-center items-center py-10">
        {children}
      </div>
    </div>
  );
};

export default PageLoading;
