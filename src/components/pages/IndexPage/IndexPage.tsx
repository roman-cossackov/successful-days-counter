import { useFirebase } from 'src/context/firebaseContext';
import LogIn from 'src/components/ui/LogInButton';
import { Navigate } from 'react-router-dom';

import styles from './IndexPage.module.scss';
import LogInButton from 'src/components/ui/LogInButton';

const IndexPage = () => {
  const { userLoggedIn } = useFirebase()

  return (
    <div className={styles.root}>
      {userLoggedIn && <Navigate to={"/main"} />}
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Successful Days Counter</h1>
        <LogInButton className={styles.button} />
      </div>
    </div>
  );
};

export default IndexPage;
