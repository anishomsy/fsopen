import { useState } from "react";

function Togglable({ toggleLabel = "", children }) {
  const [isVisible, setIsVisible] = useState(false);
  const showWhenVisible = { display: isVisible ? "" : "none" };
  const hideWhenVisible = { display: isVisible ? "none" : "" };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div style={showWhenVisible}>
        <div>{children}</div>

        <button type="submit" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          {toggleLabel}
        </button>
      </div>
    </>
  );
}

export default Togglable;
