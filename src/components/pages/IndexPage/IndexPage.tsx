import { useFirebase } from 'src/context/firebaseContext';
import SignInButton from 'src/components/ui/SignInButton';
import { Navigate } from 'react-router-dom';

import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const { userLoggedIn } = useFirebase()


  return (
    <>
      {userLoggedIn && <Navigate to={"/main"}/>}
      <h1 className={styles.title}>Welcome to Successful Days Counter</h1>
      <SignInButton />
    </>
  );
};

export default IndexPage;
