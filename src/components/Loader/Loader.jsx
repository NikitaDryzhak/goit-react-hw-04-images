import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots color="rgb(216, 132, 76)" height={300} width={400} />
    </div>
  );
};

export default Loader;
