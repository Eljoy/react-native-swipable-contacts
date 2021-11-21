import React, { createContext, useContext } from 'react'
import { Profile } from '../models'
import { useReducer } from 'react'
import { Api } from '../api'

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

const ProfileStateContext = createContext(null)

export function ProfileStateProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState)
  const value = { state, dispatch }
  return (
    <ProfileStateContext.Provider value={value}>
      {children}
    </ProfileStateContext.Provider>
  )
}

export function useProfile() {
  const { state, dispatch } = useContext(ProfileStateContext)

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
