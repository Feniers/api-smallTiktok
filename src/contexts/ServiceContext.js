import React, { createContext } from "react";

// import userService from "../services/userService";
import videoService from "../services/videoService";
import userService from "../services/userService";

// Create a new context
const ServiceContext = createContext();

// Create a provider component
const ServiceProvider = ({ children }) => {
  // Define the state and functions here
  console.log("context provider");

  const value = {
    user: userService,
    video: videoService,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };
