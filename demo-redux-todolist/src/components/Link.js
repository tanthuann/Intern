import React from "react";

const Link = props => {
  let { active, children, onClick } = props;
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <button
      onClick={onClick}
      disabled={active}
      style={{
        marginLeft: "4px"
      }}
    >
      {children}
    </button>
  );
};

export default Link;
