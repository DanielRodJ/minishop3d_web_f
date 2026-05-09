// src/components/ui/Spinner.tsx

type SpinnerProps = {
  size?: number;
};

export const Spinner = ({
  size = 40
}: SpinnerProps) => {

  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-300 border-t-black"
      style={{
        width: size,
        height: size
      }}
    />
  );
};