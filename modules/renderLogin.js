import { login, setToken, setName } from '../api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
    <h1>Форма входа</h1>
    <input
        type="text"
        class="add-form-name"
        placeholder="Введите логин"
        id="login"
        required
    />
    <input
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        id="password"
        required
    ></input>
    <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit" id="logBtn" required>
            Войти
        </button>
        <ul class="add-form-button-link registry">Зарегистрироваться</ul>
    </fieldset>
</section>`

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.getElementById('login')
    const passwordEl = document.getElementById('password')
    const logBtn = document.getElementById('logBtn')

    logBtn.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((Response) => {
                if (!Response.ok) {
                    return Response.json().then(() => {
                        throw new Error('Ошибка ввода')
                    })
                }
                return Response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderComments()
            })
            .catch((error) => {
                console.error('Произошла ошибка при вводе данных:', error)
                alert('Произошла ошибка при вводе данных. Попробуйте еще раз.')
            })
    })
}
