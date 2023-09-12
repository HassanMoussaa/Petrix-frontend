import React from "react";

function Overlay(props: any) {
  const { children } = props;

  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/signin.png"
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}

export default Overlay;
