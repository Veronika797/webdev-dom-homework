import { fetchComments } from './api.js'
import { displayComments } from './modules/displayComments.js'
import { addReplyHandler } from './modules/eventHandler.js'
import { updateComments } from './modules/comments.js'

fetchComments().then((data) => {
    updateComments(data)
    displayComments()
    addReplyHandler()
})
