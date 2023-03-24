import { Navigate } from "react-router-dom";

function ProtectedRouteElement({Component, ...props}) {
  return(
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
  )
}

export default ProtectedRouteElement;
