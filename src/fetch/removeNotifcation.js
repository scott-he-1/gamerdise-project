export const fetchRemoveNotification = (id) => {
  return fetch(`http://localhost:3000/userNotifications/${id}`, {
    method: "DELETE",
  });
};
