// src/components/shared/feedback/ErrorMessage.tsx

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="mt-1 text-sm text-red-500">
      {message}
    </p>
  );
};