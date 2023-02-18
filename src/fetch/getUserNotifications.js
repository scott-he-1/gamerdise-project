export const getUserNotifications = async () => {
  return await fetch(`http://localhost:3000/userNotifications`);
};
