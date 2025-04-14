const host = 'https://wedev-api.sky.pro/api/v2/:Veronika797'
const authHost = ' https://wedev-api.sky.pro/api/user'

export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

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
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            text,
        }),
    })
        .then((Response) => {
            if (Response.status === 400) {
                throw new Error('Неверный запрос')
            }

            if (Response.status === 500) {
                throw new Error('Ошибка сервера')
            }

            if (Response.status === 201) {
                return Response.json()
            }
        })
        .then(() => {
            return fetchComments()
        })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (login, name, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ login: login, name: name, password: password }),
    })
}
