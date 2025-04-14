import { comments } from './comments.js'
import { addLikeHandler, setReply } from './eventHandler.js'
import { sanitizeInput } from './sanitize.js'

export function displayComments() {
    const container = document.querySelector('container')
    const commentsHtml = comments
        .map((comment, index) => {
            // .forEach((comment, index) => {
            // const li = document.createElement('li')
            // li.innerHTML =
            return `
          <li class="comment" data-index='${index}>
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
            // listEl.appendChild(li)
        })
        .join('')

    const addCommentsHtml = `
 
            <div class="add-form">
                <input
                    id="name"
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                />
                <textarea
                    id="comment"
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button id="button" class="add-form-button">
                        Написать
                    </button>
                    <!-- <div id="commentList"></div> -->
                </div>
            </div>
            <div class="form-loading" style="display: none; margin-top: 20px">
                Комментарий добавляется, ожидайте...
            </div>`

    const baseHtm = `<ul class="comments">${commentsHtml}</ul>
${addCommentsHtml}`

    container.innerHTML = baseHtm

    addLikeHandler()
    setReply()
}
