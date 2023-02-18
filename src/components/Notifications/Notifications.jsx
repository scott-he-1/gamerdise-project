import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Notifications.css";

export const NotificationItem = ({ id, message, removeNotification }) => {
  return (
    <div className="notificationItem">
      <FontAwesomeIcon
        icon={faCircleXmark}
        id={id}
        onClick={(e) => removeNotification(e)}
      />
      <div className="notificationMessage">{message}</div>
    </div>
  );
};
