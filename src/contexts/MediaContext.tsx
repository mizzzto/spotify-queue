import {
  createContext,
  useContext,
  useReducer,
  useRef,
  Dispatch,
  ReactNode,
} from 'react';

import playerStateReducer, {
  PlayerAction,
  PlayerState,
  defaultState,
  ActionTypes,
} from '../reducers/playerStateReducer';

interface IMediaContextType {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}

export const MediaContext = createContext<IMediaContextType>({
  state: defaultState,
  dispatch: () => null,
});

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(playerStateReducer, defaultState);

  const intervalRef = useRef<NodeJS.Timeout | null>();
  const startCounter = async () => {
    if (intervalRef.current) return;
    let c = 2;
    intervalRef.current = setInterval(() => {
      c--;
      if (c === 0) {
        stopCounter();
        dispatch({
          type: ActionTypes.HideQueueAlert,
          payload: state,
        });
      }
    }, 1250);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (state.queueAlert) {
    startCounter();
  }

  return (
    <MediaContext.Provider value={{ state, dispatch }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => useContext(MediaContext);
