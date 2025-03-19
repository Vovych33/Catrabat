import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCpn_uLzZwmV4QnVc_rFxblhpUwiiNJ29I",
    authDomain: "catrabat-8a966.firebaseapp.com",
    projectId: "catrabat-8a966",
    storageBucket: "catrabat-8a966.firebasestorage.app",
    messagingSenderId: "734379084244",
    appId: "1:734379084244:web:da8058a636c120c3a82e41"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Обработка формы входа
document.getElementById("login-form").addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    const username = document.getElementById("username").value;
    const password = document.getElementById("pass").value;

    // Проверка, существует ли имя пользователя
    get(child(ref(db), 'users/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            // Проверка пароля
            const userData = snapshot.val();
            if (userData.pass === password) {
                alert("Вы вошли");
                localStorage.setItem('username', username); // Сохраняем имя пользователя в локальном хранилище
                window.location.href = "index.html"; // Перенаправление на главную страницу
            } else {
                alert("Неверный пароль");
            }
        } else {
            alert("Пользователь не найден");
        }
    }).catch((error) => {
        console.error("Ошибка при проверке имени пользователя:", error);
    });
});