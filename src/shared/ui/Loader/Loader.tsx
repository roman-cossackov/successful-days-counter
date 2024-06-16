import LoadingGif from 'src/shared/assets/gifs/LoadingGif'

type Props = {
  className?: string
}

const Loader = ({ className }: Props) => (

  //todo удалить style после добавления стилей из внешних компонентов
  <div className={className} style={{ display: "flex", justifyContent: "center", paddingTop: "150px" }}>
    <LoadingGif />
  </div>
);

export default Loader;
