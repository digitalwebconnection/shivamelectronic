import { useAuthContext } from '../context/AuthContext';
import { authApi } from '../api/auth.api';

/**
 * Custom hook for authentication operations.
 */
export const useAuth = () => {
  const { user, token, isAuthenticated, isAdmin, login: setAuth, logout } = useAuthContext();

  const loginUser = async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    if (result.success) {
      setAuth(result.token, result.user);
    }
    return result;
  };

  const signupUser = async (name: string, email: string, password: string) => {
    const result = await authApi.signup(name, email, password);
    if (result.success) {
      setAuth(result.token, result.user);
    }
    return result;
  };

  return { user, token, isAuthenticated, isAdmin, loginUser, signupUser, logout };
};
