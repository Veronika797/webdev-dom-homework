import { fetchComments } from './api.js'
import { displayComments } from './modules/displayComments.js'
import { addNewComments } from './modules/eventHandler.js'
import { updateComments } from './modules/comments.js'

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Подождите, загружаю комментарии...</p>`
    }

    fetchComments()
        .then((data) => {
            updateComments(data)
            displayComments()
            addNewComments()
        })
        .catch((error) => {
            console.error('Ошибка при получении комментариев:', error)
        })
}
fetchAndRenderComments(true)
