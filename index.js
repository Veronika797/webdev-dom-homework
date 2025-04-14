import { fetchComments } from './api.js'
import { displayComments } from './modules/displayComments.js'
import { addNewComments } from './modules/eventHandler.js'
import { updateComments } from './modules/comments.js'

// document.querySelector('.comments').innerHTML =
//     'Подождите, загружаю комментарии...'

fetchComments().then((data) => {
    updateComments(data)
    displayComments()
    addNewComments()
})
