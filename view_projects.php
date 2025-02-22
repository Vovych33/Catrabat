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

$sql = "SELECT title, description FROM projects";
$result = $conn->query