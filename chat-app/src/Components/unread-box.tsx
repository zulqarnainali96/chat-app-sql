export const UnreadMsg = ({ count }: { count: number }) => {
  return (
    <>
      {count && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-2xl border-2 bg-red-600">
          <span className="text-xs text-white">{count}</span>
        </div>
      )}
    </>
  );
};
