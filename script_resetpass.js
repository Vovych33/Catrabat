import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"; // Используйте актуальную версию
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"; // Используйте актуальную версию

const firebaseConfig = {
    apiKey: "AIzaSyCpn_uLzZwmV4QnVc_rFxblhpUwiiNJ29I",
    authDomain: "catrabat-8a966.firebaseapp.com",
    databaseURL: "https://catrabat-8a966-default-rtdb.firebaseio.com",
    projectId: "catrabat-8a966",
    storageBucket: "catrabat-8a966.firebasestorage.app",
    messagingSenderId: "734379084244",
    appId: "1:734379084244:web:da8058a636c120c3a82e41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Обработчик отправки формы
document.getElementById("resetpass").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const email = document.getElementById("email").value;
    const actionCodeSettings = {
        // Укажите URL, на который будет перенаправлен пользователь после подтверждения
        url: 'https://vovych33.github.io/Catrabat/resetpass.html', 
        handleCodeInApp: true // Убедитесь, что код будет обрабатываться в приложении
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings) // Передаем actionCodeSettings
        .then(() => {
            // Сохраняем email в локальном хранилище для дальнейшего использования
            localStorage.setItem('emailForSignIn', email);
            alert("Код подтверждения отправлен на вашу почту!");
            document.getElementById("resetpass").style.display = "none";
            document.getElementById("verificationSection").style.display = "block";
        })
        .catch((error) => {
            console.error("Ошибка при отправке кода:", error);
            alert("Ошибка: " + error.message);
        });
});

document.getElementById("verifyCode").addEventListener('click', function() {
    const email = localStorage.getItem('emailForSignIn');
    const code = document.getElementById("verificationCode").value;

    if (isSignInWithEmailLink(auth, window.location.href)) {
        signInWithEmailLink(auth, email, code)
            .then((result) => {
                const newPassword = prompt("Введите новый пароль:");
                if (newPassword) {
                    return auth.currentUser .updatePassword(newPassword);
                }
            })
            .then(() => {
                alert("Пароль успешно обновлен!");
                localStorage.removeItem('emailForSignIn'); // Очистка локального хранилища
                window.location.href = "login.html"; // Перенаправление на страницу входа
            })
            .catch((error) => {
                console.error("Ошибка при обновлении пароля:", error);
                alert("Ошибка: " + error.message);
            });
    }
});