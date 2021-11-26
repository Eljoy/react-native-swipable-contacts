import React, { useEffect, useRef } from 'react'
import { FlatList, ListRenderItemInfo, useWindowDimensions } from 'react-native'
import { useProfile } from '../../hooks/useProfile'
import { Profile } from '../../models'
import { Layout } from '../layout'
import { ProfileAvatar } from './ProfileAvatar'

type ScrollIndexEvent = {
  index: number
  source: string
}

export declare namespace ProfileAvatarsScrollView {
  export type Props = {
    onProfileSelect(profile: Profile, index: number): void
    onIndexChanged?(event: ScrollIndexEvent): void
    scrollIndexEvent: ScrollIndexEvent
  }
}

export default function ProfileAvatarsScrollView({
  onProfileSelect,
  onIndexChanged,
  scrollIndexEvent,
}: ProfileAvatarsScrollView.Props) {
  const { profiles, selectedProfile } = useProfile()
  const { width } = useWindowDimensions()
  const avatarDiameter = 65
  const firstLastElementOffset = Math.floor((width - avatarDiameter) / 2)
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    try {
      if (scrollIndexEvent.source !== 'ProfileAvatarsScrollView') {
        console.log(scrollIndexEvent.source)
        flatListRef.current.scrollToIndex({
          animated: true,
          index: scrollIndexEvent.index,
        })
      }
    } catch (e) {}
  }, [scrollIndexEvent])

  const avatarMarginRight = 15
  const itemLength = avatarDiameter + avatarMarginRight
  return (
    <Layout flex={1} align="center center" maxHeight={125}>
      <FlatList
        data={profiles}
        horizontal={true}
        ref={flatListRef}
        contentContainerStyle={{ alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
        onScroll={(scrollEvent) => {
          const offset = scrollEvent.nativeEvent.contentOffset.x
          const index = Math.floor(offset / itemLength)
          onIndexChanged({ index, source: 'ProfileAvatarsScrollView' })
        }}
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
        keyExtractor={(p) => p.id}
      />
    </Layout>
  )
}
