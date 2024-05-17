import { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function withAuthCheck<P extends object>(WrappedComponent: ComponentType<P>) {
  return (props: P) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/" state={{ from: location }} />;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuthCheck;


// HOC (higher-order component) to check if user have an token so they can access the views.
