export const sendNotificationToUser = (userID, message) => {
  const body = JSON.stringify({
    notificationForUser: userID,
    message: message,
  });
  return fetch("http://localhost:3000/userNotifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
