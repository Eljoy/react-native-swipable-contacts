import { Profile } from '../models'
import * as faker from 'faker'

export function fetchProfiles(): Profile[] {
  const profiles: Profile[] = []
  for (let i = 0; i < 20; i++) {
    profiles.push({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imageUrl: faker.image.avatar(),
      about: faker.lorem.paragraph(),
    })
  }
  return profiles
}
