import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

import { auth, db } from 'src/firebase/firebase';
import { DatabaseData } from 'src/types/types';
import { getShortStringFromDate } from 'src/utils/getStringFromDate';
import { fillDates } from 'src/utils/fillDates';

type FirebaseContextProps = {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  data: string | null;
};

const AuthContext = createContext<FirebaseContextProps>({ currentUser: null, userLoggedIn: false, loading: true, data: null });

type FirebaseContextProviderProps = {
  children: ReactNode;
};

const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  const initializeUser = async (user: User | null) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      initializeDatabase(user)
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const initializeDatabase = async (user: User | null) => {
    const querySnapshot = await getDocs(collection(db, "users"))
    const userData = querySnapshot.docs.find(doc => doc.id.slice(5) === user?.uid)
    if (!userData && user !== null) {
      try {
        const docRef = doc(db, "users", `user_${user.uid}`)
        const dateKey = getShortStringFromDate(new Date())
        const dateObject = { [dateKey]: false }
        const docData = {
          days: JSON.stringify(dateObject)
        }
        await setDoc(docRef, docData)
      } catch (error) {
        alert(error)
      }
    }


    const daysData: string = userData?.get("days")
    const filledDays = fillDates(JSON.parse(daysData))
    console.log(filledDays)
    setData(daysData)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    data
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useFirebase = () => useContext(AuthContext);

export { useFirebase, FirebaseContextProvider };
