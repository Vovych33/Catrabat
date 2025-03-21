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

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        // Проверка имени пользователя
        const userData = localStorage.getItem('userData');
		if (!userData) {
            window.location.href = "login.html"; // Перенаправление на страницу входа
        } else {
			const user = JSON.parse(userData); // Парсим данные пользователя
			const username = user.username; // Получаем имя пользователя из объекта
			
        // Получаем данные пользователя из базы данных
            get(child(ref(db), 'users/' + username)).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    document.getElementById("userData").innerHTML = `
                        <p><strong>Никнейм:</strong> ${username}</p>
                        <p><strong>Email:</strong> ${userData.email}</p>
                        <p><strong>Пароль:</strong> *****</p>
                    `;
                } else {
                    alert("Данные пользователя не найдены.");
                }
            }).catch((error) => {
                console.error("Ошибка при получении данных пользователя:", error);
            });
        }

        // Функция выхода
        document.getElementById("logout").addEventListener('click', function() {
            localStorage.removeItem('userData'); // Удаляем данные из локального хранилища
            window.location.href = "login.html"; // Перенаправление на страницу входа
        });