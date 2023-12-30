import './Loading.scss';
import CircularProgress from '@mui/material/CircularProgress';

interface ILoadingProps {
  text?: string | null;
}
const Loading = ({ text = null }: ILoadingProps) => {
  return (
    <div className="loading-container">
      <CircularProgress color="inherit" />
      {text}
    </div>
  );
};

export default Loading;
