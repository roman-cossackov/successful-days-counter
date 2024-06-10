import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { getShortStringFromDate } from "src/utils/getStringFromDate"
import { User } from "firebase/auth"

const setDaySuccessfulOrNot =
  async (user: User | null, setStateData: React.Dispatch<React.SetStateAction<string | null>> | null
) => {
  const querySnapshot = await getDocs(collection(db, "users"))
    const userData = querySnapshot.docs.find(doc => doc.id.slice(5) === user?.uid)
    const daysData: string = userData?.get("days")
    const parsedDaysData = JSON.parse(daysData)
    const docRef = doc(db, "users", `user_${user?.uid}`)

    const curDate = getShortStringFromDate(new Date())
    const curVal = parsedDaysData[curDate]
    parsedDaysData[curDate] = !curVal
    const docData = {days: JSON.stringify(parsedDaysData)}

    try {
      await setDoc(docRef, docData)
      setStateData!(docData.days)
    } catch (error) {
      alert(error)
    }
}

export { setDaySuccessfulOrNot }