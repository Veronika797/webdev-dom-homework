import { token } from '../api.js'
import { comments } from './comments.js'
import { addLikeHandler, setReply } from './eventHandler.js'
import { sanitizeInput } from './sanitize.js'

export function renderComments() {
    const container = document.querySelector('.comments-container')

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

    container.innerHTML = `<ul class="comments">${commentsHtml}</ul>`

    if (token) {
        addLikeHandler()
        setReply()
    }
}
