import React, { useEffect } from "react";

const SocialBar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl27517472.revenuecpmgate.com/6c/a3/bf/6ca3bf7fc994cedd1061daebab670a3a.js";
    script.type = "text/javascript";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default SocialBar;
