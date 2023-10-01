import React, { ReactElement } from "react";
import "./overlay.css";

interface OverlayProps {
  children: ReactElement;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div
      className="overlayContainer"
      style={{
        position: "relative",
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/images/signin.png"
        })`,
        background: `linear-gradient( 
          to right,
          rgba(250, 105, 0, 0.5), 
          rgba(22, 164, 195, 0.5) 
        ), url(${process.env.PUBLIC_URL}/images/signin.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
