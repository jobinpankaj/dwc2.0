import React, { createContext, useState, useContext } from 'react';

const XContext = createContext();

export const XProvider = ({ children }) => {
  const [x, setX] = useState(false);

  return (
    <XContext.Provider value={{ x, setX }}>
      {children}
    </XContext.Provider>
  );
};

export const useX = () => useContext(XContext); 