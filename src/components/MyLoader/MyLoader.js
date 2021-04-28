import Loader from 'react-loader-spinner';
import m from './MyLoader.module.css';

const MyLoader = () => (
  <Loader
    className={m.loader}
    type="MutatingDots"
    secondaryColor="#e84a5f"
    color="#2a363b"
    height={100}
    width={100}
    timeout={3000} //3 secs
  />
);
export default MyLoader;
