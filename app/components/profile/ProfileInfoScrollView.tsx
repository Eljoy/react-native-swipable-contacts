import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import { Layout } from '../layout'
import { ProfileInfo } from './ProfileInfo'

export function ProfileInfoScrollView() {
  const { profiles } = useProfile()
  return (
    <Layout flex={1}>
      <FlatList
        data={profiles}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'flex-start',
        }}
        renderItem={({ item: p }: ListRenderItemInfo<Profile>) => (
          <ProfileInfo key={p.id} profile={p} />
        )}
        keyExtractor={(p) => p.id}
      />
    </Layout>
  )
}
