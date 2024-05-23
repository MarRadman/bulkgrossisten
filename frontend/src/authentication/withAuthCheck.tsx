import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

const withAuthCheck = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;

// HOC (higher-order component) to check if user have an token so they can access the views.
//https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
