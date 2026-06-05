// DataState.tsx

import type { ReactNode } from "react";

import { Spinner } from "@/components/ui/Spinner";

interface DataStateProps {
  isLoading: boolean;
  error?: string | null;
  children: ReactNode;
}

export const DataState = ({
  isLoading,
  error,
  children
}: DataStateProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return <>{children}</>;
};