import { createContext, useState } from "react";

// Create new context
export const CollapseContext = createContext();

// Create Provider to wrap app
export const CollapseProvider = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <CollapseContext.Provider value={{ collapse, setCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
};
