import { createContext } from "react";

interface LoginContextProps {
  setToken: (token: null | string) => void;
  token: null | string;
}

const loginContext = createContext<LoginContextProps | null>(null);

export default loginContext;
