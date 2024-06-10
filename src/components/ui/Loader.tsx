import InfinityIcon from 'src/assets/icons/InfinityIcon';

type Props = {
  className?: string
}

const Loader = ({ className }: Props) => (
  <div className={className}>
    <InfinityIcon />
  </div>
);

export default Loader;
