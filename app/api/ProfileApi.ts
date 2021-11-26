import profilesJson from '../../profile-data.json'
import { Profile } from '../models'

export function fetchProfiles(): Profile[] {
  return profilesJson.map((pJson) => Profile.deserialize(pJson))
}
