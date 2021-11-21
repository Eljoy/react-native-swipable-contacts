import React from 'react'
import { useProfile } from '../../hooks/useProfile'
import { Layout } from '../layout'
import { FlatList, ListRenderItemInfo, useWindowDimensions } from 'react-native'
import { ProfileAvatar } from './ProfileAvatar'
import { Profile } from '../../models'

export default function ProfileHeader() {
  const { profiles, selectedProfile, selectProfile } = useProfile()
  const { width } = useWindowDimensions()
  const avatarDiameter = 65
  const firstLastElementOffset = Math.floor((width - avatarDiameter) / 2)
  return (
    <Layout flex={1} align="center center" maxHeight={150}>
      <FlatList
        data={profiles}
        horizontal={true}
        contentContainerStyle={{ alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: p, index }: ListRenderItemInfo<Profile>) => (
          <ProfileAvatar
            key={p.id}
            diameter={avatarDiameter}
            borderWidth={4}
            profileUrl={p.imageUrl}
            selected={p.id === selectedProfile?.id}
            onPress={() => selectProfile(p)}
            containerStyle={[
              index === 0 && { marginLeft: firstLastElementOffset },
              index === profiles.length - 1 && {
                marginRight: firstLastElementOffset,
              },
            ]}
          />
        )}
        keyExtractor={(p) => p.id}
      />
    </Layout>
  )
}
