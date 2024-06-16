import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

const doAuthWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

const doSignOut = () => {
  auth.signOut();
};

export { doAuthWithGoogle, doSignOut };
