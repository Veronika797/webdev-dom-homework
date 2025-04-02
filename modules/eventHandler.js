import { postComment } from '../api.js'
import { comments, updateComments } from './comments.js'
import { displayComments } from './displayComments.js'

export function addLikeHandler() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            comments[index].liked = !comments[index].liked
            comments[index].liked
                ? comments[index].likes++
                : comments[index].likes--
            displayComments()
            event.stopPropagation()
        })
    })
}

export function setReply() {
    const commentsElements = document.querySelectorAll('.comment')

    commentsElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const comment = comments[index]
            if (comment) {
                const commentInput = document.getElementById('comment')
                commentInput.value = `«${comment.name}: "${comment.text}"» , `
            }
        })
    })
}

export function addReplyHandler() {
    const commentInput = document.getElementById('comment')
    const submitBtn = document.getElementById('button')
    const nameInput = document.getElementById('name')

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

        if (!commentInput.value.trim() || !nameInput.value.trim()) {
            alert('Заполните форму')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(nameInput.value, commentInput.value, formattedDate).then(
            (data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                displayComments()
                nameInput.value = ''
                commentInput.value = ''
            },
        )
    })
}
