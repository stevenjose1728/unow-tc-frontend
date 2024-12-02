import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface GuestGuardProps {
  children: JSX.Element;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};