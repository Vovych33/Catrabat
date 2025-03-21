import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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

document.getElementById("register-form").addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    // Проверка на заполненность полей
    if (!username || !email || !password) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return; // Прерываем выполнение, если поля не заполнены
    }

    get(child(ref(db), 'users/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Имя пользователя занято");
        } else {
            set(ref(db, 'users/' + username), {
                email: email,
                pass: password
            });
            localStorage.setItem('userData', JSON.stringify({ username, email })); // Сохраняем данные в localStorage
            // Очистка полей ввода (если нужно)
            document.getElementById("username").value = '';
            document.getElementById("email").value = '';
            document.getElementById("pass").value = '';
            window.location.href = "index.html"; // Перенаправление на главную страницу
        }
    }).catch((error) => {
        console.error("Ошибка при проверке имени пользователя:", error);
    });
});