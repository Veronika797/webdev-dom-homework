// import { name } from '../api.js'
// import { addNewComments } from './eventHandler.js'

// export const renderCommentForm = () => {
//     const addCommentsHtml = `
//         <div class="add-form">
//             <input
//                 id="name"
//                 type="text"
//                 class="add-form-name"
//                 placeholder="Введите ваше имя"
//                 readonly
//                 value='${name}'
//             />
//             <textarea
//                 id="comment"
//                 type="textarea"
//                 class="add-form-text"
//                 placeholder="Введите ваш комментарий"
//                 rows="4"
//             ></textarea>
//             <div class="add-form-row">
//             <div class="comment-form-container"></div>
//                 <button id="button" class="add-form-button">
//                     Написать
//                 </button>
//             </div>
//         </div>
//         <div class="form-loading" style="display: none; margin-top: 20px">
//             Комментарий добавляется, ожидайте...
//         </div>`

//     const container = document.querySelector('.comment-form-container')
//     container.innerHTML = addCommentsHtml

//     const submitBtn = document.querySelector('.add-form-button')
//     if (submitBtn) {
//         submitBtn.addEventListener('click', addNewComments)
//     } else {
//         console.error('Не удалось найти кнопку для добавления комментария')
//     }
// }
