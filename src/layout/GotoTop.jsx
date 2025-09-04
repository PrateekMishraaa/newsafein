import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GotoTop = () => {
  const path = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return <div></div>;
};

export default GotoTop;
