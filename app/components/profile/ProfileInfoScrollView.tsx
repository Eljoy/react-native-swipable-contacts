import React, { useMemo, useState } from 'react'
import { FlatList, ListRenderItemInfo, Platform } from 'react-native'
import Animated, {
  ScrollHandlers,
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
} from 'react-native-reanimated'
import { Profile } from '../../models'
import Layout from '../layout/Layout'
import { ProfileInfo } from './ProfileInfo'

declare namespace ProfileInfoScrollView {
  export type Props = {
    onIndexChanged?(index: number): void
    scrollIndex: SharedValue<number>
    onBeginDrag?: ScrollHandlers<undefined>['onBeginDrag']
    onEndDrag?: ScrollHandlers<undefined>['onEndDrag']
    profiles: Profile[]
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export function ProfileInfoScrollView({
  scrollIndex,
  onIndexChanged,
  onBeginDrag,
  onEndDrag,
  profiles = [],
}: ProfileInfoScrollView.Props) {
  const [containerHeight, setContainerHeight] = useState(0)
  const animFlatListRef = useAnimatedRef<FlatList>()

  useDerivedValue(() => {
    scrollTo(animFlatListRef, 0, scrollIndex.value * containerHeight, true)
  })

  const animatedScrollHandler = useAnimatedScrollHandler<{
    wasDragged: boolean
  }>({
    onBeginDrag: (e, c) => {
      c.wasDragged = true
      onBeginDrag?.(e, undefined)
    },
    onEndDrag: (e, c) => {
      if (Platform.OS === 'ios') {
        const index = e.targetContentOffset.y / containerHeight
        if (index !== scrollIndex.value) {
          onIndexChanged(index)
        }
      }
      onEndDrag?.(e, undefined)
    },
    onScroll: (e, c) => {
      if (c.wasDragged && Platform.OS === 'android') {
        const index = e.contentOffset.y / containerHeight
        if (index !== scrollIndex.value) {
          onIndexChanged(index)
        }
      }
    },
    onMomentumEnd: (_, c) => {
      c.wasDragged = false
    },
  })

  return useMemo(() => {
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
  }, [containerHeight])
}
