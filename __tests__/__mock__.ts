jest.mock('../app/assets/images/index', () => {
  return {
    getAvatarSourceByName: () => 'avatar_source',
  }
})
