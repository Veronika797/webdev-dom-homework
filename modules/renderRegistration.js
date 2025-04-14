import { setToken, setName, registration } from '../api.js'
import { fetchAndRenderComments } from '../index.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
    <section class="add-form">
    <h1>Форма регистрации</h1>
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите имя"
        id="name"
        required
    />
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
        <button class="add-form-button-main button-main" type="submit">
            Зарегистрироваться
        </button>
        <ul class="add-form-button-link entry">Войти</ul>
    </fieldset>
</section>`

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitBtn = document.querySelector('.button-main')

    submitBtn.addEventListener('click', function () {
        const name = nameEl.value
        const login = loginEl.value
        const password = passwordEl.value

        registration(name, login, password)
            // registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((Response) => {
                return Response.json()
            })
            .then((data) => {
                if (data.user) {
                    setToken(data.user.token)
                    setName(data.user.name)
                    fetchAndRenderComments(data.user.name)
                } else {
                    console.error('Пользователь не найден в ответе API:', data)
                    alert(
                        'Ошибка регистрации. Пожалуйста, проверьте введенные данные.',
                    )
                }
            })
            .catch((error) => {
                console.error('Произошла ошибка при регистрации:', error)
                alert(
                    'Не удалось завершить регистрацию. Попробуйте еще раз позже.',
                )
            })
    })
}
