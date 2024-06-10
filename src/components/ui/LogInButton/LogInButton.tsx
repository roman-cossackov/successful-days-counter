import { doAuthWithGoogle } from 'src/firebase/auth'

import Button from '../Button'
import { ButtonTypes } from '../Button/Button'

import styles from './LogInButton.module.scss'

type Props = {
  className?: string;
}

const SignInButton = ({ className }: Props) => {

  const clickHandler = () => {
    doAuthWithGoogle()
  }

  return (
    <Button className={className} onClick={clickHandler} type={ButtonTypes.PRIMARY}>Log In</Button>
  )
}

export default SignInButton