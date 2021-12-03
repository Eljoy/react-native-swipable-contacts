import { useReducer } from 'react'
import { Api } from '../api'
import { Profile } from '../models'

type ProfileState = {
  profiles: Profile[]
  selectedProfile: Profile | null
}

enum ActionTypes {
  SetProfiles = 'SET_PROFILES',
  SelectProfile = 'SELECT_PROFILE',
}

type ProfileAction = {
  type: ActionTypes
  payload: Profile[] | Profile
}

const initialState: ProfileState = {
  profiles: [],
  selectedProfile: null,
}

function profileReducer(
  state: ProfileState,
  action: ProfileAction
): ProfileState {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.SelectProfile:
      return {
        ...state,
        selectedProfile: payload as Profile,
      }
    case ActionTypes.SetProfiles:
      return {
        ...this.state,
        profiles: payload as Profile[],
      }
    default:
      throw new Error('Unknown action type: ' + type)
  }
}

export function useProfile() {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  return {
    selectedProfile: state.selectedProfile,
    profiles: state.profiles,
    selectProfile: (profile: Profile) => {
      dispatch({
        type: ActionTypes.SelectProfile,
        payload: profile,
      })
    },
    fetchProfiles: () => {
      const profiles = Api.fetchProfiles()
      dispatch({
        type: ActionTypes.SetProfiles,
        payload: profiles,
      })
    },
  }
}
