import { useReducer } from 'react'
import { Api } from '../api'
import { Profile } from '../models'

type ProfileState = {
  profiles: Profile[]
}

enum ActionTypes {
  SetProfiles = 'SET_PROFILES',
}

type ProfileAction = {
  type: ActionTypes
  payload: Profile[] | Profile
}

const initialState: ProfileState = {
  profiles: [],
}

function profileReducer(
  state: ProfileState,
  action: ProfileAction
): ProfileState {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.SetProfiles:
      return {
        ...state,
        profiles: payload as Profile[],
      }
    default:
      throw new Error('Unknown action type: ' + type)
  }
}

export function useProfile() {
  const [state, dispatch] = useReducer(profileReducer, initialState)
  return {
    profiles: state.profiles,
    fetchProfiles: () => {
      const profiles = Api.fetchProfiles()
      dispatch({
        type: ActionTypes.SetProfiles,
        payload: profiles,
      })
    },
  }
}
