import React, { useEffect, useRef } from "react";

const Adbanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the first script (for atOptions)
    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.innerHTML = `
      atOptions = {
        'key' : '15fd1ee411de14e2e262fb12db45829f',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    // Create the second script (invoke.js)
    const externalScript = document.createElement("script");
    externalScript.type = "text/javascript";
    externalScript.src =
      "//www.highperformanceformat.com/15fd1ee411de14e2e262fb12db45829f/invoke.js";
    externalScript.async = true;

    // Append scripts to container
    containerRef.current.appendChild(inlineScript);
    containerRef.current.appendChild(externalScript);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center my-6">
      <div
        ref={containerRef}
        className="w-[300px] h-[250px] bg-gray-100 flex justify-center items-center rounded-lg shadow-md"
      >
        <span className="text-gray-400 text-sm">Loading ad...</span>
      </div>
    </div>
  );
};

export default Adbanner;
