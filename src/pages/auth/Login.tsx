import { loginWithGoogle } from "../../features/auth/services/AuthService";
import { loginWithBackend } from "../../features/auth/services/AuthApi";

export default function Login() {

  const handleLogin = async () => {

    // Inicio de sesión con Google.
    await loginWithGoogle();

    // Inicio de sesión con backend de minisho.
    const user = await loginWithBackend();

    console.log(user);
  };

  return (
    <button onClick={handleLogin}>
      Login con Google
    </button>
  );
}
