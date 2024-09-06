const Notification = ({ notification }) => {
  let style;
  switch (notification.type) {
    case "error":
      style = "error";
      break;

    case "success":
      style = "success";
      break;

    default:
      break;
  }
  return (
    <div className={"notification " + style}>
      <p>{notification.message}</p>
    </div>
  );
};
export default Notification;
