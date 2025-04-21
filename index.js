import { fetchComments } from './api.js'
import { displayComments } from './modules/displayComments.js'
import { updateComments } from './modules/comments.js'

export const fetchAndRenderComments = () => {
    document.querySelector('.container').innerHTML =
        `<p>Подождите, загружаю комментарии...</p>`

    fetchComments()
        .then((data) => {
            const container = document.querySelector('.container')
            container.innerHTML = `
            <div class="comments-container"></div>
            <div class="form-container"></div>
            `
            updateComments(data)
            displayComments()
        })
        .catch((error) => {
            console.error('Ошибка при получении комментариев:', error)
        })
}
fetchAndRenderComments()
