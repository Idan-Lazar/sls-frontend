import React from "react";
import { CircularProgress } from "@material-ui/core";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ display }) => {
  const displayValue = !!display ? "flex" : "none";

  return (
    <div className={styles.spinnerContainer} style={{ display: displayValue }}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default LoadingSpinner;
