import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { inject } from "mobx-react";
import LoginModal from "../modals/LoginModal";
import queryString from 'query-string';

const PrivateRoute = ({ component: Component, authStore, routerHistory , path, ...rest }) => {
  let isAuthenticated = authStore.token;
  const [visloginModal, setVisLoginModal] = useState(false);
  useEffect(() => {
   
      if (authStore.token) {
        return;
      }
      else{
        setVisLoginModal(true)
      }
    
   
  }, [authStore.token]);

  const render = (props) =>
    authStore.token ? (
      <Component {...props} />
    ) : (
      <LoginModal visloginModal={visloginModal} setVisLoginModal={setVisLoginModal} />
    );

  return <Route path={path} render={render} {...rest} />;
};
export default inject("authStore","routerHistory")(PrivateRoute);
