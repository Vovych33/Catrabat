<?php
$servername = "localhost";
$username = "username"; // Замените на ваше имя пользователя
$password = "password"; // Замените на ваш пароль
$dbname = "game_community"; // Замените на имя вашей базы данных

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получение данных из формы
$title = $_POST['title'];
$description = $_POST['description'];

// Вставка данных в базу
$sql = "INSERT INTO projects (title, description) VALUES ('$title', '$description')";

if ($conn->query($sql) === TRUE) {
    echo "Новый проект успешно добавлен!";
} else {
    echo "Ошибка: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>