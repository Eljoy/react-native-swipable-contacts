import React from 'react'
import { FlatList, ListRenderItemInfo, useWindowDimensions } from 'react-native'
import Animated, {
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
} from 'react-native-reanimated'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import { Layout } from '../layout'
import { ProfileAvatar } from './ProfileAvatar'

export declare namespace ProfileAvatarsScrollView {
  export type Props = {
    onProfileSelect(profile: Profile, index: number): void
    onIndexChanged?(index: number): void
    scrollIndex: SharedValue<number>
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default function ProfileAvatarsScrollView({
  onProfileSelect,
  onIndexChanged,
  scrollIndex,
}: ProfileAvatarsScrollView.Props) {
  const { profiles, selectedProfile } = useProfile()
  const { width } = useWindowDimensions()

  const avatarDiameter = 65
  const firstLastElementOffset = Math.floor((width - avatarDiameter) / 2)
  const animFlatListRef = useAnimatedRef<FlatList>()
  const avatarMarginRight = 15
  const itemLength = avatarDiameter + avatarMarginRight

  useDerivedValue(() => {
    scrollTo(animFlatListRef, scrollIndex.value * itemLength, 0, true)
  })

  const animatedScrollHandler = useAnimatedScrollHandler<{
    beginOffset: number
    wasDragged: boolean
  }>({
    onBeginDrag: (e, c) => {
      c.wasDragged = true
    },
    onScroll: (e, c) => {
      if (!c.wasDragged) {
        return
      }
      const offset = e.contentOffset.x
      const index = Math.round(offset / itemLength)
      onIndexChanged(index)
    },
    onMomentumEnd: (e, c) => {
      c.wasDragged = false
    },
  })

  return (
    <Layout flex={1} align="center center" maxHeight={125}>
      <AnimatedFlatList
        data={profiles}
        horizontal={true}
        bounces={false}
        ref={animFlatListRef}
        contentContainerStyle={{ alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        onScroll={animatedScrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item: p, index }: ListRenderItemInfo<Profile>) => (
          <ProfileAvatar
            key={p.id}
            diameter={avatarDiameter}
            borderWidth={4}
            profileImageSource={p.imageSource}
            selected={p.id === selectedProfile?.id}
            onPress={() => onProfileSelect(p, index)}
            containerStyle={[
              { marginRight: avatarMarginRight },
              index === 0 && { marginLeft: firstLastElementOffset },
              index === profiles.length - 1 && {
                marginRight: firstLastElementOffset,
              },
            ]}
          />
        )}
        getItemLayout={(_, index) => {
          return {
            length: itemLength,
            index,
            offset: index * itemLength,
          }
        }}
        keyExtractor={(p: Profile) => p.id}
      />
    </Layout>
  )
}
