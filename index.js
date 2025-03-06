import { displayComments } from './modules/displayComments.js'
import { addReplyHandler } from './modules/eventHandler.js'
import { comments } from './modules/comments.js'

const listEl = document.getElementById('list')
const nameInput = document.getElementById('name')
const commentInput = document.getElementById('comment')
const submitBtn = document.getElementById('button')

addReplyHandler()
displayComments(listEl)
