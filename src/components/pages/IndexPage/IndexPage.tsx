import { useAuth } from 'src/context/authContext';

import Loader from '../../ui/Loader';
import Head from '../../Head/Head';

import styles from './IndexPage.module.scss';

const IndexPage = () => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Loader />;
  } else {
    
  }

  return (
    <>
      <Head title="INDEX PAGE" />
      <h1>Welcome to Successful Days Counters</h1>
      <SignInButton />
    </>
  );
};

export default IndexPage;
