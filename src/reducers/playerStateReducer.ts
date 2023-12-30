import { Track } from '../types/SpotifyTypes';

export const defaultState: PlayerState = {
  playing: false,
};

export type PlayerState = {
  playing?: boolean;
  currentTrack?: Track;
  deviceId?: string;
  queue?: Track[];
  queueAlert?: boolean;
  alertMessage?: string;
};

export type PlayerAction = {
  type: ActionTypes;
  payload: PlayerState;
};

export enum ActionTypes {
  PopulateQueue = 'POPULATE_QUEUE',
  AddToQueue = 'ADD_TO_QUEUE',
  RemoveFromQueue = 'REMOVE_FROM_QUEUE',
  TogglePlay = 'TOGGLE_PLAY',
  SetDeviceId = 'SET_DEVICE_ID',
  SetCurrentTrack = 'SET_CURRENT_TRACK',
  ShowQueueAlert = 'SHOW_QUEUE_ALERT',
  HideQueueAlert = 'HIDE_QUEUE_ALERT',
}

const playerStateReducer = (
  state: PlayerState,
  action: PlayerAction
): PlayerState => {
  // action has type and payload
  // console.log(`${action.type}:`, action.payload);
  switch (action.type) {
    case ActionTypes.PopulateQueue:
      if (!state.queue) state.queue = [];
      return {
        ...state,
        queue: action.payload.queue!,
        currentTrack: action.payload.currentTrack,
        playing: action.payload.playing,
        queueAlert: action.payload.queueAlert,
        alertMessage: action.payload.alertMessage,
      };
    case ActionTypes.AddToQueue:
      if (!state.queue) state.queue = [];
      return {
        ...state,
        queue: [...state.queue, action.payload.currentTrack!],
        queueAlert: true,
        alertMessage: action.payload.alertMessage || 'Added to queue',
      };
    case ActionTypes.RemoveFromQueue:
      if (!state.queue) state.queue = [];
      return {
        ...state,
        queue: state.queue.filter(
          (track: Track) => track.uri !== action!.payload!.currentTrack!.uri
        ),
      };
    case ActionTypes.TogglePlay:
      return {
        ...state,
        playing: action.payload.playing,
      };
    case ActionTypes.SetDeviceId:
      return {
        ...state,
        deviceId: action.payload.deviceId,
      };
    case ActionTypes.SetCurrentTrack:
      return {
        ...state,
        currentTrack: action.payload.currentTrack,
      };
    case ActionTypes.ShowQueueAlert:
      return {
        ...state,
        queueAlert: true,
        alertMessage: action.payload.alertMessage,
      };
    case ActionTypes.HideQueueAlert:
      return {
        ...state,
        queueAlert: false,
      };
    default:
      return state;
  }
};

export default playerStateReducer;
