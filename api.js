const host = 'https://wedev-api.sky.pro/api/v1/Veronika797'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((Response) => {
            return Response.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                const currentDate = new Date(comment.date)
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
                return {
                    name: comment.author.name,
                    date: formattedDate,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            return appComments
        })
}

export const postComment = (name, text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            name,
            text,
        }),
    }).then(() => {
        return fetchComments()
    })
}
