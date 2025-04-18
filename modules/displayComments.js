import { comments } from './comments.js'
import { addLikeHandler, addNewComments, setReply } from './eventHandler.js'
import { renderLogin } from './renderLogin.js'
import { sanitizeInput } from './sanitize.js'
import { token, name } from '../api.js'

// document.addEventListener('DOMContentLoaded', () => {
//     const submitBtn = document.querySelector('.button-main')
// })
// if (submitBtn) {
//     submitBtn.addEventListener('click', addNewComments)
// } else {
//     console.error('не удалось найти кнопку')
// }

export function displayComments() {
    const container = document.querySelector('.container')

    const commentsHtml = comments
        .map((comment, index) => {
            return `
             <li class="comment" data-index='${index}'>
          <div class="comment-header">
          <div>${sanitizeInput(comment.name)}</div>
          <div>${comment.date}</div>
          </div>
          <div class="comment-body">
          <div class="comment-text">${sanitizeInput(comment.text)}</div>
          </div>
          </div>
          <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${comment.likes}</span>
             <button class="like-button ${
                 comment.liked ? '-active-like' : ''
             }" data-index="${index}"></button>
             </div>
             </div>
              </li>
          `
        })
        .join('')

    const addCommentsHtml = `
  <div class="add-form">
                <input
                    id="name"
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                    readonly
                    value='${name}'
                />
                <textarea
                    id="comment"
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш комментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button id="button" class="add-form-button">
                        Написать
                    </button>
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 20px">
                Комментарий добавляется, ожидайте...
            </div>`

    const linkToLoginText = `<p>чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

    const baseHtml = `<ul class="comments">${commentsHtml}</ul>${token ? addCommentsHtml : linkToLoginText}`
    container.innerHTML = baseHtml

    if (token) {
        addLikeHandler()
        setReply()
        const submitBtn = document.querySelector('.add-form-button')
        submitBtn.addEventListener('click', addNewComments)
    } else {
        const linkLoginElement = document.querySelector('.link-login')

        if (linkLoginElement) {
            linkLoginElement.addEventListener('click', () => {
                renderLogin()
            })
        } else {
            console.error('Link Login Element not found in the DOM.')
        }
    }
}
