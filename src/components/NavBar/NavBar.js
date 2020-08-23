import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import LoginModal from "../../modals/AuthModals/LoginModal";
import RegistarModal from "../../modals/AuthModals/RegistarModal";
import styles from './NavBar.module.scss'



const NavBar = ({ authStore, routerHistory }) => {
  const [visloginModal, setVisLoginModal] = useState(false);
  const [visRegistarModal, setVisRegistarModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authStore.token ? true : false
  );

  useEffect(() => {
    setIsAuthenticated(authStore.token ? true : false);
    setVisLoginModal(false)
  }, [authStore.token]);

  const signOut = () => {
    authStore.signOut();
     routerHistory.push('/'); 
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <h1 style={{ fontSize: 14, color: "white" }}>THE AUCTION HOUSE</h1>
      </div>
      <div className={styles.loginLogoutContainer}>

        {!isAuthenticated && (
          < div
            className={styles.button}
            onClick={() => setVisLoginModal(true)}
          >
            Sign in
          </ div>
        )}
        {!isAuthenticated && (
          < div
            className={styles.button}
            onClick={() => setVisRegistarModal(true)}
          >
            Sign Up
          </ div>
        )}

        {isAuthenticated && (
          < div className={styles.button} onClick={() => signOut()}>
            Sign out
          </ div>
        )}
      </div>
      <LoginModal
        visloginModal={visloginModal}
        setVisLoginModal={setVisLoginModal}
      />
      <RegistarModal
        visRegistarModal={visRegistarModal}
        setVisRegistarModal={setVisRegistarModal}
      />
    </div>
  );
};

export default inject("authStore", "routerHistory")(observer(NavBar));
