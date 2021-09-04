const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const getNotes = () => {
  return 'Our Notes are of....'
}

const addNotes = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green('New Note Added!'))
  } else {
    console.log(chalk.white.bgRedBright('Title already Exists'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue('Your Notes!'))
  notes.forEach((note) => {
    console.log(note.title)
  })
}

const removeNotes = (title) => {
  const notes = loadNotes()
  const notesToSave = notes.filter((note) => note.title !== title)

  saveNotes(notesToSave)

  if (notesToSave.length < notes.length) {
    console.log(chalk.green.inverse('Note Removed!'))
  } else {
    console.log(chalk.red.inverse('Note Not Found!'))
  }
}

const readNotes = (title) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === title)
  if (noteToRead) {
    console.log(chalk.green('Note Found and ...'))
    console.log(`The Note of ${noteToRead.title} has a content of ${noteToRead.body}`)
  } else {
    console.log(chalk.red('Requested Note Not Available!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes
}