import { getErrorMessage } from "@/errors/ApiError";
import { AuthError } from "@/errors/AuthError";

interface HandleRequestOptions<T> {
    setLoading: (v: boolean) => void;
    setError: (v: string | null) => void;
    onAuthError: () => void;
    errorFallback: string;
    request: () => Promise<T>;
}

export const handleRequest = async <T>({
    setLoading,
    setError,
    onAuthError,
    errorFallback,
    request,
}: HandleRequestOptions<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
        return await request();
    } catch (error) {
        if (error instanceof AuthError)
            onAuthError();
        else
            setError(getErrorMessage(error, errorFallback));

        return null;
    } finally {
        setLoading(false);
    }
};