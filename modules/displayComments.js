import { getComments, addComment, handleLikeClick } from './comments.js'
import { comments } from './comments.js'

const commentInput = document.getElementById('comment')

export function setReply(index) {
    const comment = comments[index]
    if (comment) {
        commentInput.value = `«${comment.name}: "${comment.text}"» , `
    }
}

export function displayComments() {
    const list = document.getElementById('list')
    list.innerHTML = ''
    const comment = getComments()
    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.innerHTML = `
          <div class="comment" onclick="setReply(${index})">
          <div class="comment-header">
          <div>${comment.name}</div>
         <div>${comment.date}</div>
         </div>
         <div class="comment-body">
         <div class="comment-text">${comment.text}</div>
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
        li.onclick = () => setReply(index)
        list.appendChild(li)
    })

    const likeButttons = document.querySelectorAll('.like-button')
    likeButttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            handleLikeClick(Number(index))
            event.stopPropagation()
        })
    })
}

displayComments()
