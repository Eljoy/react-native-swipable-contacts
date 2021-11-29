import React, { useState } from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native'
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
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
    scrollIndex: number
    ref?: any
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export function ProfileInfoScrollView({}: ProfileInfoScrollView.Props) {
  const { profiles } = useProfile()
  const [containerHeight, setContainerHeight] = useState(0)
  const aref = useAnimatedRef<FlatList>()

  const scroll = useSharedValue(0)

  useDerivedValue(() => {
    scrollTo(aref as any, 0, scroll.value * containerHeight, true)
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
      scroll.value = direction === 'up' ? scroll.value - 1 : scroll.value + 1
      scrollTo(aref as any, 0, scroll.value * containerHeight, true)
    },
  })

  return (
    <Layout
      flex={1}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout
        setContainerHeight(height)
      }}>
      <Button
        title="scroll down"
        onPress={() => {
          scroll.value = scroll.value + 1
          if (scroll.value >= 10) scroll.value = 0
        }}
      />
      <AnimatedFlatList
        ref={aref}
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
