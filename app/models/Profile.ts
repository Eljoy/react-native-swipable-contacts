import { ImageSourcePropType } from 'react-native'
import { getAvatarSourceByName } from '../assets/images'

export class Profile {
  id: string
  firstName: string
  lastName: string
  imageSource: ImageSourcePropType
  jobTitle: string
  about: string

  static deserialize(profileJson: Omit<Profile, 'imageSource'>): Profile {
    return {
      ...profileJson,
      imageSource: getAvatarSourceByName(
        profileJson.firstName,
        profileJson.lastName
      ),
    }
  }
}
