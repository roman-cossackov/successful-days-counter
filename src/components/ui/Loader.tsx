import InfinityIcon from 'src/assets/icons/InfinityIcon';

type Props = {
  className?: string
}

const Loader = ({ className }: Props) => (

  //todo удалить style после добавления стилей из внешних компонентов
  <div className={className} style={{ display: "flex", justifyContent: "center", paddingTop: "150px" }}>
    <InfinityIcon />
  </div>
);

export default Loader;
