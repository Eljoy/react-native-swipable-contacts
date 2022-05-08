import React from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  useWindowDimensions,
} from 'react-native'
import Animated, {
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import { Profile } from '../../models'
import { Layout } from '../layout'
import { ProfileAvatar } from './ProfileAvatar'

export declare namespace ProfileAvatarsScrollView {
  export type Props = {
    onProfileSelect(profile: Profile, index: number): void
    onIndexChanged?(index: number): void
    scrollIndex: SharedValue<number>
    profiles: Profile[]
    avatarDiameter?: number
  }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default React.memo(function ProfileAvatarsScrollView({
  onProfileSelect,
  onIndexChanged,
  scrollIndex,
  profiles = [],
  avatarDiameter = 65,
}: ProfileAvatarsScrollView.Props) {
  const { width } = useWindowDimensions()
  const animFlatListRef = useAnimatedRef<FlatList>()
  const firstLastElementOffset = Math.floor((width - avatarDiameter) / 2)
  const avatarMarginRight = 15
  const itemLength = avatarDiameter + avatarMarginRight

  const wasDragged = useSharedValue(false)

  useDerivedValue(() => {
    if (wasDragged.value === false) {
      scrollTo(animFlatListRef, scrollIndex.value * itemLength, 0, true)
    }
  })

  const selectedProfile = useDerivedValue(() => {
    return profiles[scrollIndex.value]
  }, [profiles, scrollIndex.value])

  const animatedScrollHandler = useAnimatedScrollHandler<{
    beginOffset: number
    wasDragged: boolean
  }>({
    onBeginDrag: (e, c) => {
      wasDragged.value = true
    },
    onScroll: (e, c) => {
      if (!wasDragged.value) {
        return
      }
      const offset = e.contentOffset.x
      const index = Math.round(offset / itemLength)
      onIndexChanged(index)
    },
    onMomentumEnd: (e, c) => {
      wasDragged.value = false
    },
  })

  return (
    <Layout flex={1} align="center center" maxHeight={125}>
      <AnimatedFlatList
        data={profiles}
        horizontal={true}
        bounces={false}
        decelerationRate={Platform.select({ android: 'fast', ios: undefined })}
        ref={animFlatListRef}
        contentContainerStyle={{ alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        onScroll={animatedScrollHandler}
        scrollEventThrottle={200}
        renderItem={({ item: p, index }: ListRenderItemInfo<Profile>) => (
          <ProfileAvatar
            key={p.id}
            id={p.id}
            selectedProfile={selectedProfile}
            diameter={avatarDiameter}
            borderWidth={4}
            profileImageSource={p.imageSource}
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
        keyExtractor={(p: Profile) => p.id}
      />
    </Layout>
  )
})
