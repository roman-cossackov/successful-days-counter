import styles from './Button.module.scss'

export enum ButtonTypes {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

type Props = {
  className?: string
  type: ButtonTypes
  children?: string
  onClick?: () => void
}

const Button = ({ className, type, children, onClick }: Props) => {
  return (
    <button className={`${styles.root} ${className} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button