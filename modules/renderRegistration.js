import { registration, setToken, setName } from '../api.js'
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
        <button class="add-form-button-main button-main" type="submit" id="regBtn" required>
            Зарегистрироваться
        </button>
        <ul class="add-form-button-link entry">Войти</ul>
    </fieldset>
</section>`

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.getElementById('name')
    const loginEl = document.getElementById('login')
    const passwordEl = document.getElementById('password')
    const regBtn = document.getElementById('regBtn')

    // if (!nameEl || !loginEl.value || !passwordEl.value || !submitBtn) {
    //     console.error('не удалось найти эл-ты')
    //     return
    // }

    regBtn.addEventListener('click', function () {
        // console.log('кнопка нажата')

        // if (!nameEl || !loginEl.value || !passwordEl.value) {
        //     alert('Заполните все поля')
        //     return
        // }

        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((Response) => {
                if (!Response.ok) {
                    return Response.json().then(() => {
                        throw new Error('Ошибка регистрации')
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
                console.error('Произошла ошибка при регистрации:', error)
                alert('Не удалось завершить регистрацию. Попробуйте еще раз.')
            })
    })
}
