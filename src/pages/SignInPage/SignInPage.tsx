import { Navigate } from 'react-router-dom';

import { useFirebase } from 'src/app/providers/FirebaseProvider/lib/useFirebaset';
import LogInButton from 'src/widgets/LogInButton';

import styles from './SignInPage.module.scss';

const SignInPage = () => {
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

export default SignInPage;
