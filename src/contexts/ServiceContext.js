import React, { createContext } from "react";

import userService from "../services/userService";
import videoService from "../services/videoService";

// Create a new context
const ServiceContext = createContext();

// Create a provider component
const ServiceProvider = ({ children }) => {
  // Define the state and functions here

  const value = {
    user: userService,
    video: videoService,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };
