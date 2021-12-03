import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, Platform } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
} from 'react-native-reanimated'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import Layout from '../layout/Layout'
import { ProfileInfo } from './ProfileInfo'

declare namespace ProfileInfoScrollView {
  export type Props = {
    onIndexChanged?(index: number): void
    scrollIndex: SharedValue<number>
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
    // scrollTo(animFlatListRef, 0, scrollIndex.value * containerHeight, true)
    // scrollTo(animFlatListRef, 0, scrollIndex.value * containerHeight, true)
  })

  const animatedScrollHandler = useAnimatedScrollHandler<{
    beginOffset: number
  }>({
    onEndDrag: (e) => {
      if (Platform.OS === 'ios') {
        const index = e.targetContentOffset.y / containerHeight
        if (index !== scrollIndex.value) {
          onIndexChanged(index)
        }
      }
    },
    onScroll: (e, c) => {
      if (Platform.OS === 'android') {
        const index = e.contentOffset.y / containerHeight
        if (index !== scrollIndex.value) {
          onIndexChanged(index)
        }
      }
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
        disableIntervalMomentum={true}
        pagingEnabled
        scrollEventThrottle={16}
        renderItem={({ item: p }: ListRenderItemInfo<Profile>) => (
          <ProfileInfo height={containerHeight} key={p.id} profile={p} />
        )}
        keyExtractor={(p: Profile) => p.id}
      />
    </Layout>
  )
}
