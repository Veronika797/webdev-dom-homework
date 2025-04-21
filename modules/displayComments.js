import { addNewComments } from './eventHandler.js'
import { renderLogin } from './renderLogin.js'
import { token, name } from '../api.js'
import { renderComments } from './renderComments.js'

export function displayComments() {
    renderComments()

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

    const container = document.querySelector('.form-container')

    const baseHtml = token ? addCommentsHtml : linkToLoginText
    container.innerHTML = baseHtml

    if (token) {
        addNewComments()
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
