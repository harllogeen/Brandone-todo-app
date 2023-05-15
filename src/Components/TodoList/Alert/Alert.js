import React, { useEffect } from "react";
import "../../../App.css"

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <div>
      <div className={`alert alert-${type}`}>
        <p className="text-bold">{msg}</p>
      </div>
    </div>
  );
};

export default Alert;
