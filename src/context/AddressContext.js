import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const ContextAddress = createContext();

export const AddressContext = ({ children }) => {
  const [addresses, setAddressess] = useState([
    {
      id: uuid(),
      addressOne: "A/5 Keshav Kunj Building",
      addressTwo: "Behind BMC School",
      street: "Dattapada Road, Borivali East",
      state: "Maharashtra",
      pincode: "400066",
    },
  ]);
  return (
    <ContextAddress.Provider value={{ addresses, setAddressess }}>
      {children}
    </ContextAddress.Provider>
  );
};
