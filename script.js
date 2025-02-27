// eslint-disable-next-line no-unused-vars
const listEl = document.getElementById('list')
const nameInput = document.getElementById('name')
const commentInput = document.getElementById('comment')
const submitBtn = document.getElementById('button')

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        liked: true,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        liked: false,
    },
]

function sanitizeInput(input) {
    const inputText = input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
    return inputText
}

function handleLikeClick(index) {
    comments[index].liked = !comments[index].liked
    comments[index].liked ? comments[index].likes++ : comments[index].likes--
    displayComments()
}

function displayComments() {
    const list = document.getElementById('list')
    list.innerHTML = ''
    comments.forEach((comment, index) => {
        const li = document.createElement('li')
        li.innerHTML = `
          <li class="comment" onclick="setReply(${index})">
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
              </li>
          `
        list.appendChild(li)
    })

    const likeButttons = document.querySelectorAll('.like-button')
    likeButttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index
            handleLikeClick(index)
            event.stopPropagation()
        })
    })
}

function setReply(index) {
    const comment = comments[index]
    if (comment) {
        commentInput.value = `«${comment.name}: "${comment.text}"» , `
    }
}
window.setReply = setReply

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
