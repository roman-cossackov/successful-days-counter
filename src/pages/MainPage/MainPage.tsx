import { Navigate } from 'react-router-dom';

import { useFirebase } from 'src/app/providers/FirebaseProvider';
import Loader from 'src/shared/ui/Loader';
import { getShortStringFromDate } from 'src/shared/lib/getStringFromDate';
import {Button} from 'src/shared/ui/Button';
import { ButtonTypes } from 'src/shared/ui/Button';
import { setDaySuccessfulOrNot } from 'src/shared/api/firebaseDatabase';
import { countLastTrueStreak } from 'src/shared/lib/countLastTrueStreak';
import { countMaxTrueStreak } from 'src/shared/lib/countMaxTrueStreak';
import { doSignOut } from 'src/shared/api/firebaseAuth';

import styles from './MainPage.module.scss';

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