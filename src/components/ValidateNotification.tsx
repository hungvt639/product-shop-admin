import React, { Fragment } from "react";
import "./component.scss";
type propsValiNotify = {
  show: boolean;
  message: string;
};
const ValidateNotification = (props: propsValiNotify) => {
  const { show, message } = props;
  return show ? <p className="notification-validate">{message}</p> : <Fragment />;
};
export default ValidateNotification;
