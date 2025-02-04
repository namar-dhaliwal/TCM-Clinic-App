import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        Loading...
      </div>
    ),
  });

  return <Component />;
};