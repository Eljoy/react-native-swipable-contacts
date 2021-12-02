import { act, renderHook } from '@testing-library/react-hooks'
import * as faker from 'faker'
import React from 'react'
import { Api } from '../api'
import { Profile } from '../models'
import { ProfileStateProvider, useProfile } from './useProfile'

const profiles: Profile[] = [...Array(5).keys()].map(() =>
  Profile.deserialize({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    about: faker.lorem.paragraph(),
  })
)

describe('useProfile', () => {
  const apiMock = jest.spyOn(Api, 'fetchProfiles').mockReturnValue(profiles)

  const wrapper = ({ children }) => (
    <ProfileStateProvider>{children}</ProfileStateProvider>
  )

  it('should update profiles state with profiles fetched from api on fetchProfiles call', async () => {
    const { result } = renderHook(() => useProfile(), { wrapper })
    act(() => {
      result.current.fetchProfiles()
    })
    expect(apiMock).toBeCalled()
    expect(result.current.profiles).toEqual(profiles)
  })

  it('should update selectedProfile on selectProfile call', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })
    act(() => {
      result.current.fetchProfiles()
      result.current.selectProfile(profiles[0])
    })
    expect(result.current.selectedProfile).toEqual(profiles[0])
  })
})
