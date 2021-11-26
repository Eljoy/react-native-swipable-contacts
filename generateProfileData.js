const faker = require('faker')
const fs = require('fs')

const files = fs.readdirSync('./app/assets/images/avatars/')

const profiles = []

files.forEach((fileName) => {
  if (!fileName.includes('@')) {
    const [firstName, lastName] = fileName.split('.')[0].split('_')
    profiles.push({
      id: faker.datatype.uuid(),
      firstName,
      lastName,
      jobTitle: faker.name.jobTitle(),
      about: faker.lorem.paragraph(),
    })
  }
})

fs.writeFile('profile-data.json', JSON.stringify(profiles), function (err) {
  if (err) return console.log(err)
  console.log('Profile data successfully uploaded')
})
