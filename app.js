const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')


// Customising Yargs
yargs.version('1.1.0')

// Create an add, remove, list, read command
yargs.command({
  command: 'add',
  describe: 'Add a New Note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body of Add Functionality',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a Note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNotes(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List Previous Notes!',
  handler(argv) {
    notes.listNotes(argv.title)
  }
})

yargs.command({
  command: 'read',
  describe: 'Read from file',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNotes(argv.title)
  }
})

yargs.parse()
console.log(chalk.blueBright.italic(`success!`))
