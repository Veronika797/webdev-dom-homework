import { postComment } from '../api.js'
import { comments, updateComments } from './comments.js'
import { displayComments } from './displayComments.js'
import { renderComments } from './renderComments.js'


export function addLikeHandler() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            comments[index].liked = !comments[index].liked
            comments[index].liked
                ? comments[index].likes++
                : comments[index].likes--
            renderComments()
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

export function addNewComments() {
    console.log('отправка')

    const commentInput = document.getElementById('comment')
    const btnAdd = document.getElementById('button')
    const nameInput = document.getElementById('name')

    btnAdd.addEventListener('click', () => {
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
            console.error('Заполните форму')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(nameInput.value, commentInput.value)
            .then(() => fetchComments())
            .then((data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                displayComments()
                nameInput.value = ''
                commentInput.value = ''
            })
            .catch((error) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (
                    error.message === 'Failed to fetch' ||
                    error.message ===
                        'NetworkError when attempting to fetch resource'
                ) {
                    alert('Нет интернета, попробуйте снова')
                }

                if (error.message === 'Неверный запрос') {
                    alert(
                        'Имя и комментарий должны содержать не менее 3-х символов',
                    )

                    nameInput.classList.add('-error')
                    commentInput.classList.add('-error')

                    setTimeout(() => {
                        nameInput.classList.remove('-error')
                        commentInput.classList.remove('-error')
                    }, 2000)
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Ошибка сервера')
                }
            })
    })
}
