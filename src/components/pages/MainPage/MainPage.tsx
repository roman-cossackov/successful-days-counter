import { useFirebase } from 'src/context/firebaseContext';

import Loader from 'src/components/ui/Loader';
import { getShortStringFromDate } from 'src/utils/getStringFromDate';
import Button from 'src/components/ui/Button';
import { ButtonTypes } from 'src/components/ui/Button/Button';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const { loading, data } = useFirebase()

  if (loading || !data) {
    return (
      <Loader />
    )
  }

  const todaysDate = getShortStringFromDate(new Date())
  const parsedData = JSON.parse(data)
  return (
    <div className={`${styles.root} ${parsedData[todaysDate] ? styles.yes : styles.no}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Did your day go well?</h1>
        {!parsedData[todaysDate] ?
          <Button type={ButtonTypes.PRIMARY} className={styles.button}>Yes</Button> :
          <Button type={ButtonTypes.PRIMARY} className={styles.button}>Nah, i changed my mind</Button>}
      </div>
    </div>
  )
}

export default MainPage