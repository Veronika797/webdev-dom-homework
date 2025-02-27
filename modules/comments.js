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

export function getComments() {
    return comments
}

export function addComment(newComment) {
    comments.push(newComment)
}

export function handleLikeClick(index) {
    if (index < 0 || index >= comments.length) {
        console.error('Invalid index:', index)
        return
    }
}
export { comments }

export function setReply(index) {
    const comment = comments[index]
    if (comment) {
        commentInput.value = `«${comment.name}: "${comment.text}"» , `
    }
}
displayComments()
