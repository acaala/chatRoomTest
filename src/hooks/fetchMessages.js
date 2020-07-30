import {
  useDatabase
} from './database'

import {
  ref
} from 'vue'

export default function () {
  const db = useDatabase();

  const messages = ref({});

  const fetchMessages = async () => {

    db.find({}).sort({
      created_at: 1
    }).exec((err, docs) => {

      if (!err) {
        messages.value = docs
      } else {
        console.error(err)
      }
    })
  }

  const createNewMessage = async (newDocument) => {
    db.insert(newDocument)
  }

  return {
    messages,
    fetchMessages,
    createNewMessage
  }

}