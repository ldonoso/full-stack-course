const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-tpbe6.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const schema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', schema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(x => {
      console.log(`${x.name} - ${x.number}`)
    })
    mongoose.connection.close()
  })
}
