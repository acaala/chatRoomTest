import NeDB from 'nedb'
import {
  provide,
  inject
} from 'vue'

const key = Symbol('Database')

const db = new NeDB({
  filename: '../db/chats.db',
  autoload: true
})


export function provideDatabase() {
  provide(key, db)
}

export function useDatabase() {
  return inject(key)
}