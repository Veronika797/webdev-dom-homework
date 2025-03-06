import { comments } from './comments.js'
import { addLikeHandler, setReply } from './eventHandler.js'
import { sanitizeInput } from './sanitize.js'

export function displayComments() {
    const listEl = document.getElementById('list')
    listEl.innerHTML = ''
    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.innerHTML = `
          <div class="comment">
          <div class="comment-header">
          <div>${sanitizeInput(comment.name)}</div>
         <div>${comment.date}</div>
         </div>
         <div class="comment-body">
         <div class="comment-text">${sanitizeInput(comment.text)}</div>
         </div>
         <div class="comment-footer">
           <div class="likes">
             <span class="likes-counter">${comment.likes}</span>
             <button class="like-button ${
                 comment.liked ? '-active-like' : ''
             }" data-index="${index}"></button>
             </div>
             </div>
              </div>
          `
        listEl.appendChild(li)
    })
    addLikeHandler()
    setReply()
}
