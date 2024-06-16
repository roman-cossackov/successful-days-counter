import { doAuthWithGoogle } from 'src/shared/api/firebaseAuth'

import { Button } from '../../../shared/ui/Button'
import { ButtonTypes } from '../../../shared/ui/Button/Button'

import styles from './LogInButton.module.scss'

type Props = {
  className?: string;
}

const SignInButton = ({ className }: Props) => {

  const clickHandler = () => {
    doAuthWithGoogle()
  }

  return (
    <Button className={`${styles.root} ${className}`} onClick={clickHandler} type={ButtonTypes.PRIMARY}>Log In</Button>
  )
}

export default SignInButton