import { useFirebase } from 'src/context/firebaseContext';

import Loader from 'src/components/ui/Loader';
import { getShortStringFromDate } from 'src/utils/getStringFromDate';
import Button from 'src/components/ui/Button';
import { ButtonTypes } from 'src/components/ui/Button/Button';

import styles from './MainPage.module.scss';
import { setDaySuccessfulOrNot } from 'src/firebase/database';
import { countLastTrueStreak } from 'src/utils/countLastTrueStreak';
import { countMaxTrueStreak } from 'src/utils/countMaxTrueStreak';
import { doSignOut } from 'src/firebase/auth';
import { Navigate } from 'react-router-dom';

const MainPage = () => {
  const { loading, data, setData, currentUser, userLoggedIn } = useFirebase()

  if (loading || !data || !userLoggedIn) {
    return (
      <>
        {!userLoggedIn && <Navigate to={'/'} />}
        <Loader />
      </>
    )
  }

  const handleClick = () => {
    setDaySuccessfulOrNot(currentUser, setData)
  }

  const renderButton = () => {
    const curVal = parsedData[todaysDate]
    const buttonContent = curVal ? 'Nah, i changed my mind' : 'Yes'

    return (
      <Button
        type={ButtonTypes.PRIMARY}
        className={styles.button}
        onClick={handleClick}>{buttonContent}</Button>
    )
  }

  const renderStreak = () => {
    const parsedData = JSON.parse(data)
    const curStreak = countLastTrueStreak(parsedData)
    const maxStreak = countMaxTrueStreak(parsedData)

    return (
      <>
        <div>Current streak of successful days: {curStreak}</div>
        <div>max streak: {maxStreak}</div>
      </>
    )
  }

  const todaysDate = getShortStringFromDate(new Date())
  const parsedData = JSON.parse(data)
  return (
    <div className={`${styles.root} ${parsedData[todaysDate] ? styles.yes : styles.no}`}>
      <Button
        className={styles.sighOutButton}
        type={ButtonTypes.SECONDARY}
        onClick={() => { doSignOut() }}>
        Log Out
      </Button>
      <div className={styles.content}>
        {renderStreak()}
        <h1 className={styles.title}>Did your day go well?</h1>
        {renderButton()}
      </div>
    </div>
  )
}

export default MainPage