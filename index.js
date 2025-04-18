import { fetchComments } from './api.js'
import { displayComments } from './modules/displayComments.js'
// import { addNewComments } from './modules/eventHandler.js'
import { updateComments } from './modules/comments.js'
// import { renderCommentForm } from './modules/commentForm.js'

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            `<p>Подождите, загружаю комментарии...</p>`
    }

    fetchComments()
        .then((data) => {
            updateComments(data)
            displayComments()
            // renderCommentForm()
        })
        .catch((error) => {
            console.error('Ошибка при получении комментариев:', error)
        })
}
fetchAndRenderComments(true)

//     fetchComments()
//         .then((data) => {
//             updateComments(data)
//             displayComments()

//             const commentInput = document.getElementById('comment')
//             const submitBtn = document.querySelector('.button-main')
//             const nameInput = document.getElementById('name')

//             if (!submitBtn && !commentInput && !nameInput) {
//                 addNewComments()
//             } else {
//                 console.error('Не удалось найти эл-ты')
//             }
//         })
//         .catch((error) => {
//             console.error('Ошибка при получении комментариев:', error)
//         })
// }
