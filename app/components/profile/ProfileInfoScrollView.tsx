import React, { useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import Layout from '../layout/Layout'
import { ProfileInfo } from './ProfileInfo'

export function ProfileInfoScrollView() {
  const { profiles } = useProfile()
  const flatListRef = useRef<FlatList>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  let offset = 0
  return (
    <Layout
      flex={1}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout
        setContainerHeight(height)
      }}>
      <FlatList
        ref={flatListRef}
        data={profiles}
        // onScroll={(onScroll) => {
        //   console.log('onScroll ', onScroll)
        // }}
        onScrollEndDrag={(scrollEvent) => {
          const currentOffset = scrollEvent.nativeEvent.contentOffset.y
          const direction = currentOffset > offset ? 'down' : 'up'
          offset = currentOffset
          const relation = currentOffset / containerHeight
          const index =
            direction === 'up' ? Math.floor(relation) : Math.ceil(relation)
          if (index > 0 && index < profiles.length) {
            flatListRef.current.scrollToIndex({ animated: true, index })
          }
        }}
        getItemLayout={(_, index) => {
          return {
            length: containerHeight,
            index,
            offset: index * containerHeight,
          }
        }}
        renderItem={({ item: p }: ListRenderItemInfo<Profile>) => (
          <ProfileInfo height={containerHeight} key={p.id} profile={p} />
        )}
        keyExtractor={(p) => p.id}
      />
    </Layout>
  )
}
