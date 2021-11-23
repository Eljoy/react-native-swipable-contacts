import React from 'react'
import { Text, useWindowDimensions } from 'react-native'
import { Profile } from '../../models'
import Layout from '../layout/Layout'
import { BodyText, SubTitleText, TitleText } from '../typography'

export declare namespace ProfileInfo {
  type Props = {
    profile: Profile
  }
}

export function ProfileInfo({ profile }: ProfileInfo.Props) {
  const { width } = useWindowDimensions()
  return (
    <Layout flex={1} style={{ width: width }}>
      <Layout flex={1} maxHeight={50} align="space-around center">
        <TitleText>
          <Text style={{ fontWeight: 'bold' }}>{profile.firstName}</Text>
          <Text>{' ' + profile.lastName}</Text>
        </TitleText>
        <BodyText>{profile.jobTitle}</BodyText>
      </Layout>
      <Layout flex={1} style={{ padding: 20 }}>
        <SubTitleText style={{ fontWeight: 'bold' }}>About me</SubTitleText>
        <BodyText style={{ marginTop: 10 }}>{profile.about}</BodyText>
      </Layout>
    </Layout>
  )
}
