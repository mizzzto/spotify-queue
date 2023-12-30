import { useMediaContext } from '../../../contexts/MediaContext';

export const Alert = () => {
  const { state } = useMediaContext();
  return (
    <div className={`queue-alert ${state.queueAlert ? 'visible' : 'hidden'}`}>
      {state.alertMessage}
    </div>
  );
};
