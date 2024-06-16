import { User } from "firebase/auth";
import { createContext } from "react";

type FirebaseContextProps = {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  data: string | null;
  setData: React.Dispatch<React.SetStateAction<string | null>> | null;
};

export const FirebaseContext = createContext<FirebaseContextProps>({ currentUser: null, userLoggedIn: false, loading: true, data: null, setData: null });
