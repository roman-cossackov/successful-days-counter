import { useContext } from "react";

import { FirebaseContext } from "./firebaseContext";

export const useFirebase = () => useContext(FirebaseContext);