import { doAuthWithGoogle } from 'src/firebase/auth'

import Button from '../Button'
import { ButtonTypes } from '../Button/Button'

import styles from './SignInButton.module.scss'

const SignInButton = () => {

  const clickHandler = () => {
    doAuthWithGoogle()
  }

  return (
    <Button onClick={clickHandler} type={ButtonTypes.PRIMARY}>Sign In</Button>
  )
}

export default SignInButton