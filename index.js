import { displayComments, setReply } from './modules/displayComments.js'
import { sanitizeInput } from './modules/sanitize.js'
import { handleLikeClick } from './modules/comments.js'
window.handleLikeClick = handleLikeClick

window.setReply = setReply

const listEl = document.getElementById('list')
const nameInput = document.getElementById('name')
const commentInput = document.getElementById('comment')
const submitBtn = document.getElementById('button')

submitBtn.addEventListener('click', function () {
    const currentDate = new Date()
    const formattedDate = currentDate
        .toLocaleString('ru-RU', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
        .replace(',', '')

    const sanitizedName = sanitizeInput(nameInput.value || 'аноним')
    const sanitizedComment = sanitizeInput(commentInput.value)

    const newComment = {
        name: sanitizedName,
        date: formattedDate,
        text: sanitizedComment,
        likes: 0,
        liked: false,
    }

    if (sanitizedComment.trim()) {
        comments.push(newComment)
        displayComments()
        nameInput.value = ''
        commentInput.value = ''
    } else {
        alert('Заполните все поля')
    }
})
displayComments()
