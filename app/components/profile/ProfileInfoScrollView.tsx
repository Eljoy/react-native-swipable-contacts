import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
} from 'react-native-reanimated'
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
    onIndexChanged?(index: number): void
    scrollIndex: any
    ref?: any
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export function ProfileInfoScrollView({
  scrollIndex,
  onIndexChanged,
}: ProfileInfoScrollView.Props) {
  const { profiles } = useProfile()
  const [containerHeight, setContainerHeight] = useState(0)
  const animFlatListRef = useAnimatedRef<FlatList>()

  useDerivedValue(() => {
    scrollTo(animFlatListRef, 0, scrollIndex.value * containerHeight, true)
    scrollTo(animFlatListRef, 0, scrollIndex.value * containerHeight, true)
  })

  const animatedScrollHandler = useAnimatedScrollHandler<{
    beginOffset: number
  }>({
    onBeginDrag: (e, c) => {
      c.beginOffset = e.contentOffset.y
    },
    onEndDrag: (e, c) => {
      const currentOffset = e.contentOffset.y
      const direction = currentOffset > c.beginOffset ? 'down' : 'up'
      const index =
        direction === 'up' ? scrollIndex.value - 1 : scrollIndex.value + 1
      onIndexChanged(index)
    },
  })

  return (
    <Layout
      flex={1}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout
        setContainerHeight(height)
      }}>
      <AnimatedFlatList
        ref={animFlatListRef}
        data={profiles}
        onScroll={animatedScrollHandler}
        getItemLayout={(_, index) => {
          return {
            length: containerHeight,
            index,
            offset: index * containerHeight,
          }
        }}
        scrollEventThrottle={16}
        renderItem={({ item: p }: ListRenderItemInfo<Profile>) => (
          <ProfileInfo height={containerHeight} key={p.id} profile={p} />
        )}
        keyExtractor={(p: Profile) => p.id}
      />
    </Layout>
  )
}
