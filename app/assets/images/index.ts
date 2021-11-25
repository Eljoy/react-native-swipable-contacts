const avatarSourcesByName = {}

export function getAvatarSourceByName(firstName: string, lastName: string) {
  return avatarSourcesByName[`${firstName}_${lastName}`]
}

avatarSourcesByName['Allan_Munger'] = require('./avatars/Allan_Munger.png')
avatarSourcesByName['Amanda_Brady'] = require('./avatars/Amanda_Brady.png')
avatarSourcesByName[
  'Carlos_Slattery'
] = require('./avatars/Carlos_Slattery.png')
avatarSourcesByName['Carole_Poland'] = require('./avatars/Carole_Poland.png')
avatarSourcesByName['Cecil_Folk'] = require('./avatars/Cecil_Folk.png')
avatarSourcesByName['Celeste_Burton'] = require('./avatars/Celeste_Burton.png')
avatarSourcesByName[
  'Charlotte_Waltson'
] = require('./avatars/Charlotte_Waltson.png')
avatarSourcesByName[
  'Colin_Ballinger'
] = require('./avatars/Colin_Ballinger.png')
avatarSourcesByName['Daisy_Phillips'] = require('./avatars/Daisy_Phillips.png')
avatarSourcesByName[
  'Elliot_Woodward'
] = require('./avatars/Elliot_Woodward.png')
avatarSourcesByName['Elvia_Atkins'] = require('./avatars/Elvia_Atkins.png')
avatarSourcesByName['Erik_Nason'] = require('./avatars/Erik_Nason.png')
avatarSourcesByName['Henry_Brill'] = require('./avatars/Henry_Brill.png')
avatarSourcesByName['Isaac_Fielder'] = require('./avatars/Isaac_Fielder.png')
avatarSourcesByName[
  'Johnie_McConnell'
] = require('./avatars/Johnie_McConnell.png')
avatarSourcesByName['Kat_larsson'] = require('./avatars/Kat_larsson.png')
avatarSourcesByName['Katri_Ahokas'] = require('./avatars/Katri_Ahokas.png')
avatarSourcesByName['Kevin_Sturgis'] = require('./avatars/Kevin_Sturgis.png')
avatarSourcesByName[
  'Kristin_Patterson'
] = require('./avatars/Kristin_Patterson.png')
avatarSourcesByName['Lydia_Bauer'] = require('./avatars/Lydia_Bauer.png')
avatarSourcesByName[
  'Mauricio_August'
] = require('./avatars/Mauricio_August.png')
avatarSourcesByName['Miguel_Garcia'] = require('./avatars/Miguel_Garcia.png')
avatarSourcesByName['Mona_Kane'] = require('./avatars/Mona_Kane.png')
avatarSourcesByName['Robert_Tolbert'] = require('./avatars/Robert_Tolbert.png')
avatarSourcesByName['Robin_Counts'] = require('./avatars/Robin_Counts.png')
avatarSourcesByName['Tim_Deboer'] = require('./avatars/Tim_Deboer.png')
avatarSourcesByName['Wanda_Howard'] = require('./avatars/Wanda_Howard.png')
