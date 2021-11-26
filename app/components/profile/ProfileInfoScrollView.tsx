import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import Layout from '../layout/Layout'
import { ProfileInfo } from './ProfileInfo'

type ScrollIndexEvent = {
  index: number
  source: string
}

declare namespace ProfileInfoScrollView {
  export type Props = {
    onIndexChanged?(event: ScrollIndexEvent): void
    scrollIndex: ScrollIndexEvent
  }
}

export function ProfileInfoScrollView({
  onIndexChanged = () => {},
  scrollIndex,
}: ProfileInfoScrollView.Props) {
  const { profiles } = useProfile()
  const flatListRef = useRef<FlatList>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  useEffect(() => {
    try {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: scrollIndex.index,
      })
    } catch (e) {}
  }, [scrollIndex])

  let beginOffset = 0
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
        onScrollBeginDrag={(scrollEvent) => {
          beginOffset = scrollEvent.nativeEvent.contentOffset.y
        }}
        onScrollEndDrag={(scrollEvent) => {
          const currentOffset = scrollEvent.nativeEvent.contentOffset.y
          const direction = currentOffset > beginOffset ? 'down' : 'up'
          const index =
            direction === 'up' ? scrollIndex.index - 1 : scrollIndex.index + 1
          onIndexChanged({ index, source: 'ProfileInfoScrollView' })
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
