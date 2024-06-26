import { ReactNode, useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from "firebase/firestore"

import { auth, db } from 'src/shared/api/firebaseConfig'
import { getShortStringFromDate } from 'src/shared/lib/getStringFromDate';
import { fillDates } from 'src/shared/lib/fillDates';
import { FirebaseContext } from '../lib/firebaseContext';

type FirebaseContextProviderProps = {
  children: ReactNode;
};

const FirebaseProvider = ({ children }: FirebaseContextProviderProps) => {
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
    const daysData: string = userData?.get("days")

    const docRef = doc(db, "users", `user_${user?.uid}`)

    if (!daysData) {
      try {
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

    const parsedDaysData = JSON.parse(daysData)

    if (!(getShortStringFromDate(new Date()) in parsedDaysData)) {
      const filledDaysData = fillDates(parsedDaysData)
      const docData = {
        days: JSON.stringify(filledDaysData)
      }
      try {
        await setDoc(docRef, docData)
      } catch (error) {
        alert(error)
      }
    }

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
    data,
    setData
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider
