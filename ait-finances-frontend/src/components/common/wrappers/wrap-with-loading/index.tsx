import { memo, PropsWithChildren } from "react";

type Props = {
  loading: boolean;
};

function WrapWithLoading({ loading, children }: PropsWithChildren<Props>) {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default memo(WrapWithLoading);
