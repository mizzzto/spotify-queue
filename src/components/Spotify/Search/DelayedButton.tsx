import { useRef } from 'react';

interface IDelayedButtonProps {
  delay: number;
  afterDelay: () => void;
  children?: JSX.Element;
  className?: string;
}

const DelayedButton = ({
  delay,
  afterDelay,
  children,
  className = '',
}: IDelayedButtonProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>();

  const startCounter = async () => {
    if (intervalRef.current) return;
    let c = 2;
    intervalRef.current = setInterval(() => {
      c--;
      if (c === 0) {
        stopCounter();
        afterDelay();
      }
    }, delay);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <button
      className={className}
      onMouseDown={(e) => {
        if (e.button === 0) startCounter();
      }}
      onMouseUp={stopCounter}
      onMouseLeave={stopCounter}
      onTouchStart={startCounter}
      onTouchCancel={stopCounter}
      onTouchEnd={stopCounter}
      onAuxClick={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (['Space', 'Enter'].includes(e.code)) startCounter();
      }}
      onKeyUp={stopCounter}
    >
      {children}
    </button>
  );
};

export default DelayedButton;
