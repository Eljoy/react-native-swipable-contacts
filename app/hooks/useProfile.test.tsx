import { act, renderHook } from '@testing-library/react-hooks'
import * as faker from 'faker'
import { Api } from '../api'
import { Profile } from '../models'
import { useProfile } from './useProfile'

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

  it('should update profiles state with profiles fetched from api on fetchProfiles call', async () => {
    const { result } = renderHook(() => useProfile())
    act(() => {
      result.current.fetchProfiles()
    })
    expect(apiMock).toBeCalled()
    expect(result.current.profiles).toEqual(profiles)
  })
})
