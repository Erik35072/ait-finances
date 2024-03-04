import { memo, PropsWithChildren } from "react";
// components

type Props = { length: number; customText?: string };

function WrapWithNoResult({ length, customText, children }: PropsWithChildren<Props>) {
  return (
    <>
      {!length ? (
        <div className="w-full">
          <hr />
          <div className="py-3">
            <p className="text-center max-w-full text-2xl font-bold">{customText ?? "No results"}</p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default memo(WrapWithNoResult);
