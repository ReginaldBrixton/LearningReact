import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.push('/login');
      return null;
    }

    return <Component {...props} />;
  };
}