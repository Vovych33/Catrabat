// Имитация состояния входа пользователя
let isLoggedIn = false;

// Проверка состояния входа пользователя
function checkLoginStatus() {
    isLoggedIn = !!localStorage.getItem('userData'); // Устанавливаем состояние входа
    console.log("Статус входа:", isLoggedIn);
}

// Управление боковой панелью
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

// Открытие и закрытие боковой панели
if (hamburger) {
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('active'); // Переключение класса для открытия/закрытия боковой панели
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active'); // Закрытие боковой панели
    });
}

// Функция для создания кнопки "Профиль" или "Войти"
function createProfileButton() {
    const authBtnContainer = document.getElementById('auth-btn-container');
    authBtnContainer.innerHTML = ''; // Очистка контейнера

    const button = document.createElement('button');
    button.className = 'profile-btn';
    button.textContent = isLoggedIn ? 'Профиль' : 'Войти'; // Меняем текст в зависимости от статуса входа

    button.onclick = function() {
        window.location.href = isLoggedIn ? "profile.html" : "login.html"; // Переход на страницу профиля или входа
    };

    authBtnContainer.appendChild(button); // Добавление кнопки в контейнер
}

// Вызываем функцию при загрузке страницы
window.onload = function() {
    checkLoginStatus(); // Проверяем состояние входа
    createProfileButton(); // Создаем кнопку "Профиль" или "Войти"

    // Обработка отправки формы входа
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = function(event) {
            event.preventDefault(); // Предотвращаем перезагрузку страницы
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Простая логика проверки учетных данных
            if (username === 'user' && password === 'pass') {
                const userData = { username: username }; // Пример данных пользователя
                localStorage.setItem('userData', JSON.stringify(userData)); // Сохраняем данные пользователя в localStorage
                isLoggedIn = true; // Устанавливаем состояние входа
                createProfileButton(); // Обновляем кнопку после изменения состояния
                window.location.href = "profile.html"; // Переход на страницу профиля
            } else {
                document.getElementById('error-message').innerText = 'Неверные имя пользователя или пароль.'; // Сообщение об ошибке
            }
        };
    }
};