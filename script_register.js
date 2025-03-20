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

document.getElementById("register").addEventListener('click', function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;

    get(child(ref(db), 'users/' + username)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Имя пользователя занято");
        } else {
            set(ref(db, 'users/' + username), {
                email: document.getElementById("email").value,
                pass: document.getElementById("pass").value
            });
			localStorage.setItem('userData', JSON.stringify({ username, email })); // Сохраняем данные в localStorage
            alert("Вы зарегистрировались");
            window.location.href = "index.html";
        }
    }).catch((error) => {
        console.error("Ошибка при проверке имени пользователя:", error);
    });
});