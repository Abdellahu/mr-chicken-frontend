import { useState, createContext, useContext } from "react";

const DishContext = createContext();

function DishDataProvider({ children, initialValue }) {
  const [idCollection, setIdCollection] = useState(initialValue || []);

  return (
    <DishContext.Provider value={{ idCollection, setIdCollection }}>
      {children}
    </DishContext.Provider>
  );
}

export default DishDataProvider;
export function useMyContext() {
  return useContext(DishContext);
}
