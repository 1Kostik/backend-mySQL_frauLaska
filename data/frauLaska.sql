-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.2
-- Время создания: Окт 03 2024 г., 21:56
-- Версия сервера: 8.2.0
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `frauLaska`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(2, 'Догляд за тілом'),
(7, 'Догляд за шкірою рук'),
(8, 'Свічки');

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `profession` varchar(100) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `product_id`, `name`, `profession`, `review`) VALUES
(36, 84, 'Віра', 'вчителька', 'Комбінована шкіра, 30+. Гель приємний, економний, універсальний. Очі не пече. Сподобався і дитині. Спочатку купувала цей об\'єм, але вигідніше брати великий і кришка зручніша саме в велиій 350'),
(40, 88, 'Марта', 'вчителька', 'Після першого разу використання не замітила результат, подумала , що він не діє і вже була трохи розчарована, але вчора намастилася і сьогодні просто в шоці від того на скільки смугла шкіра. Наносьте акуратно, розтираючи детально по всій шкірі , не забуваючи про руки і пальці.Після використання не мийте руки, бо змиється.Видно він проявляється через певний час. В мене світла шкіра, не жовтить. '),
(42, 90, 'Марія', 'дизайнер', 'Супер масло Не оставляет пятен и следов на вещах Аромат приятных масел,без отдушек Советую'),
(43, 91, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(44, 92, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(45, 92, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(46, 93, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(47, 93, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(48, 94, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(49, 94, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(52, 96, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(53, 96, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(54, 97, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(55, 97, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(56, 98, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(57, 98, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(58, 99, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(59, 99, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(60, 100, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(61, 100, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(62, 101, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(63, 101, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(64, 102, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(65, 102, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(66, 103, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(67, 103, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(68, 104, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(69, 104, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(70, 105, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(71, 105, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(72, 106, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(73, 106, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(74, 107, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(75, 107, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(76, 108, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(77, 108, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(78, 109, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(79, 109, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(80, 110, 'Тетяна', 'лікар', 'Цей крем - найкраще, що траплялося з моєю шкірою. Текстура дуже приємна. Крем не жирний по текстурі, добре живить шкіру. Але в той же час не гелеподібний як з цієї серії крем з алое або кавуном. Запах дуже приємний, не нав\'язливий. Наче вершково-трав\'яний, якщо так можна описати йог) На шкірі залишається. Шкіра після нього оксамитова. Мащу ввечері після душу та іноді зранку. Однозначно рекомендую.'),
(81, 110, 'Ліза', 'студентка', 'Дуже класний крем, добре зволожує шкіру. Використовую після депіляціі і жодних подразнень як не було'),
(414, 83, 'Валентина', 'медсестра', 'Комбінована шкіра, 30+. Гель приємний, економний, універсальний. Очі не пече. Сподобався і дитині. Спочатку купувала цей об\'єм, але вигідніше брати великий і кришка зручніша саме в велиій 250мл. упаковці.'),
(434, 123, 'Віра', 'продавець', 'Гарний крем рекомендую'),
(435, 84, 'Aннa', 'домогосподарка', 'asdasdasdsa'),
(436, 124, 'Діма', 'програміст', 'Дуже гарно світить та довго!');

-- --------------------------------------------------------

--
-- Структура таблицы `imageUrls`
--

CREATE TABLE `imageUrls` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `imageUrls`
--

INSERT INTO `imageUrls` (`id`, `product_id`, `img_url`) VALUES
(172, 84, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721492415/products/520975_1_1712818707.webp'),
(173, 84, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721492416/products/520975_5_1712818709.jpg'),
(174, 84, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721492415/products/520975_4_1712818708.webp'),
(175, 84, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721492415/products/520975_3_1712818708.webp'),
(192, 88, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721551279/products/254299_1_1718604009.webp'),
(193, 88, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721551279/products/254299_2_1718604009.webp'),
(197, 90, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639262/products/633996_1_1720105009.webp'),
(198, 91, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639620/products/768200_1_1711560805.webp'),
(199, 91, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639620/products/768200_2_1711560805.jpg'),
(200, 92, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639828/products/822271_1_1697632072.webp'),
(201, 92, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639828/products/822271_2_1697632073.webp'),
(202, 93, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639940/products/603008_1_1715348876.webp'),
(203, 93, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639940/products/603008_2_1715348877.webp'),
(204, 94, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640062/products/586088_1_1721237052.webp'),
(205, 94, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640062/products/586088_2_1721237052.webp'),
(208, 96, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640297/products/299149_1_1717074438.webp'),
(209, 97, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640359/products/358471_1_1710338712.webp'),
(210, 97, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640359/products/358471_3_1710338713.webp'),
(211, 98, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640460/products/695393_1_1710949546.webp'),
(212, 99, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640894/products/638847_1_1710430058.webp'),
(215, 100, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641011/products/828976_1_1713193211.webp'),
(216, 100, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641011/products/828976_2_1713193212.webp'),
(217, 101, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_1_1721375258.webp'),
(218, 101, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_3_1721375258.webp'),
(219, 102, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641152/products/474014_1_1710329044.webp'),
(221, 103, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641221/products/627484_1_1710406820.webp'),
(222, 103, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641221/products/627484_2_1710406820.webp'),
(223, 104, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(224, 104, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(225, 105, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(226, 105, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(227, 106, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(228, 106, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(229, 107, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(230, 107, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(231, 108, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(232, 108, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(233, 109, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(234, 109, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(235, 110, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(236, 110, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(237, 83, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_1_1712818707.webp'),
(238, 83, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_5_1712818709.jpg'),
(239, 83, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_4_1712818708.webp'),
(240, 83, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_3_1712818708.webp'),
(241, 83, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_2_1712818708.webp'),
(242, 120, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722869042/products/4374174636_voskovaya-svecha-mood.webp'),
(244, 122, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_3_1721375258.webp'),
(247, 123, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_3_1721375258.webp'),
(248, 123, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640359/products/358471_3_1710338713.webp'),
(249, 123, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640359/products/358471_1_1710338712.webp'),
(250, 99, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1727777939/products/607383_1_1710329261.webp'),
(251, 99, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1727777939/products/627478_2_1713344203.webp'),
(256, 99, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1727780985/products/474014_2_1710329044.webp'),
(258, 124, 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1727806934/products/candles.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `status` varchar(20) NOT NULL,
  `payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `delivery_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `total_amount` int NOT NULL,
  `order_date` datetime NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `delivery_city` varchar(256) DEFAULT NULL,
  `delivery_destination` varchar(256) DEFAULT NULL,
  `recipient_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recipient_last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `recipient_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `payment_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `call_me_back` tinyint(1) DEFAULT NULL,
  `payment_info` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `status`, `payment_method`, `delivery_type`, `total_amount`, `order_date`, `name`, `last_name`, `email`, `phone`, `delivery_city`, `delivery_destination`, `recipient_name`, `recipient_last_name`, `recipient_phone`, `payment_status`, `call_me_back`, `payment_info`) VALUES
(79, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 210, '2024-09-06 12:39:03', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(81, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 210, '2024-09-06 12:39:39', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(82, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 348, '2024-09-06 12:41:32', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(83, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 200, '2024-09-06 12:42:05', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(84, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 168, '2024-09-06 12:42:21', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(85, 'В очікуванні', 'deliveryPayment', 'Самовивіз', 1037, '2024-09-06 12:42:45', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(98, 'В очікуванні', 'liqPay', 'Нова пошта', 90, '2024-09-18 11:34:36', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', 'м. Вінниця, Вінницька обл.', 'Відділення №1: вул. Якова Шепеля, 1', NULL, NULL, NULL, 'Не сплачено', 1, NULL),
(99, 'В очікуванні', 'liqPay', 'Самовивіз', 90, '2024-09-18 11:42:16', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 1, NULL),
(101, 'В очікуванні', 'liqPay', 'Самовивіз', 100, '2024-09-18 11:58:50', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(102, 'В очікуванні', 'liqPay', 'Самовивіз', 100, '2024-09-18 12:09:50', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(103, 'В очікуванні', 'liqPay', 'Самовивіз', 100, '2024-09-18 12:17:32', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(104, 'Відхилено', 'liqPay', 'Самовивіз', 100, '2024-09-18 12:19:32', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, NULL),
(105, 'Відправлено', 'liqPay', 'Самовивіз', 203, '2024-09-18 12:24:40', 'Константин', 'Сорочан', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Не сплачено', 0, '{\"ip\": \"91.214.138.200\", \"info\": \"sorochankostya@gmail.com\", \"type\": \"buy\", \"acq_id\": 414963, \"action\": \"pay\", \"amount\": 203, \"is_3ds\": false, \"status\": \"success\", \"mpi_eci\": \"7\", \"paytype\": \"card\", \"version\": 3, \"currency\": \"UAH\", \"end_date\": 1726651512649, \"language\": \"uk\", \"order_id\": \"order_idK_105\", \"payment_id\": 2519629165, \"public_key\": \"sandbox_i57713160999\", \"create_date\": 1726651512456, \"description\": \"Оплата замовлення у магазині Frau Laska;\\n Номер замовлення: 105;\\n Body SuperFood Avocado: 1шт\", \"amount_bonus\": 0, \"amount_debit\": 203, \"sender_bonus\": 0, \"amount_credit\": 203, \"currency_debit\": \"UAH\", \"transaction_id\": 2519629165, \"currency_credit\": \"UAH\", \"liqpay_order_id\": \"WH644Z911726651512451829\", \"agent_commission\": 0, \"commission_debit\": 0, \"sender_card_bank\": \"Test\", \"sender_card_type\": \"visa\", \"sender_last_name\": \"sfsdfsdfsdsfdfgfdg\", \"commission_credit\": 3.05, \"sender_card_mask2\": \"424242*42\", \"sender_commission\": 0, \"sender_first_name\": \"sdfsdfdsfdsfdfggg\", \"receiver_commission\": 3.05, \"sender_card_country\": 804}'),
(114, 'Відправлено', 'LiqPay', 'Самовивіз', 165, '2024-09-28 14:50:41', 'Константин', 'asd', 'sorochankostya@gmail.com', '+380935834662', NULL, NULL, NULL, NULL, NULL, 'Сплачено', 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `count` int NOT NULL,
  `total_cost` int NOT NULL,
  `color` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_code` int NOT NULL,
  `orders_items_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `order_items`
--

INSERT INTO `order_items` (`id`, `product_id`, `title`, `count`, `total_cost`, `color`, `size`, `product_code`, `orders_items_id`) VALUES
(59, 96, 'Slim Extreme 4D Spa', 1, 210, NULL, '250', 603008, 79),
(61, 96, 'Slim Extreme 4D Spa', 1, 210, NULL, '250', 603008, 81),
(62, 98, 'Грейпфрут-чилі', 1, 348, NULL, '200', 603008, 82),
(63, 110, 'Пілінг-скатка для рук та ніг', 1, 200, NULL, '200', 603008, 83),
(64, 88, 'Dove Summer Glow', 1, 168, '#D7D7D7', '250', 254299, 84),
(65, 94, 'Enough Body Lite Fit Cream', 1, 1037, NULL, '180', 603008, 85),
(78, 83, 'Holika', 1, 90, '#dada11', '150', 1157308, 98),
(79, 83, 'Holika', 1, 90, '#dada11', '150', 1157308, 99),
(81, 122, 'Крем для рук', 1, 100, '#D7D7D7', '150', 287448241, 101),
(82, 122, 'Крем для рук', 1, 100, '#D7D7D7', '150', 287448241, 102),
(83, 122, 'Крем для рук', 1, 100, '#D7D7D7', '150', 287448241, 103),
(84, 122, 'Крем для рук', 1, 100, '#D7D7D7', '150', 287448241, 104),
(85, 91, 'Body SuperFood Avocado', 1, 203, NULL, '380', 26827, 105),
(94, 99, 'Shelly Hand and Nail Cream', 1, 165, NULL, '250', 603008, 114);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `benefit` text NOT NULL,
  `popularity` int DEFAULT NULL,
  `product_code` varchar(256) NOT NULL,
  `composition` text NOT NULL,
  `main_image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `category_id`, `title`, `description`, `benefit`, `popularity`, `product_code`, `composition`, `main_image`) VALUES
(83, 2, 'Holika', '\r\nЯкщо ви щойно познайомились із корейською косметикою або хочете відкрити її з нової сторони, варто звернути увагу і купити заспокійливий та зволожуючий гель Holika Holika Aloe 99% Soothing gel у міні-форматі, щоб переконатись, наскільки він:\r\n\r\n \r\n\r\n·                    ніжний\r\n\r\n·                    ефективний\r\n\r\n·                    універсальний.\r\n\r\n \r\n\r\nЗамовити заспокійливий та зволожуючий гель Holika Holika Aloe 99% Soothing gel в інтернет-магазині Watsons ви можете просто зараз.', 'При використанні в якості крему для обличчя та тіла: невелику кількість засобу нанести на очищену шкіру, втерти масажними рухами. При використанні в якості маски при сонячних опіках та укусах комах: нанести гель на уражену ділянку шкіри на 15 хвилин, потім змити залишки водою. При використанні в якості маски для відпочинку очей: нанести гель на ватні диски, покласти їх на очі та залишити на 15 хвилин. Застереження: тільки для зовнішнього застосування. Тримати далі від дітей. Зберігання: в сухому місці при температурі від от 0°С до 25°С', 3, '1157308', 'Склад: сік алое вера, екстракт лотоса, екстракт центели, екстракт бамбука, екстракт огірка, екстракт листя кукурудзи, екстракт капусти, екстракт дині, ПЕГ-60 гідрогенована касторова олія, натрій поліакрилат, карбомер, триетаноламін, запашка, феноксіетанол.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722268333/products/520975_1_1712818707.webp'),
(84, 2, 'Holika', '\r\nЯкщо ви щойно познайомились із корейською косметикою або хочете відкрити її з нової сторони, варто звернути увагу і купити заспокійливий та зволожуючий гель Holika Holika Aloe 99% Soothing gel у міні-форматі, щоб переконатись, наскільки він:\r\n\r\n \r\n\r\n·                    ніжний\r\n\r\n·                    ефективний\r\n\r\n·                    універсальний.\r\n\r\n \r\n\r\nЗамовити заспокійливий та зволожуючий гель Holika Holika Aloe 99% Soothing gel в інтернет-магазині Watsons ви можете просто зараз.', 'При використанні в якості крему для обличчя та тіла: невелику кількість засобу нанести на очищену шкіру, втерти масажними рухами. При використанні в якості маски при сонячних опіках та укусах комах: нанести гель на уражену ділянку шкіри на 15 хвилин, потім змити залишки водою. При використанні в якості маски для відпочинку очей: нанести гель на ватні диски, покласти їх на очі та залишити на 15 хвилин. Застереження: тільки для зовнішнього застосування. Тримати далі від дітей. Зберігання: в сухому місці при температурі від от 0°С до 25°С', 1, '1157308', 'Склад: сік алое вера, екстракт лотоса, екстракт центели, екстракт бамбука, екстракт огірка, екстракт листя кукурудзи, екстракт капусти, екстракт дині, ПЕГ-60 гідрогенована касторова олія, натрій поліакрилат, карбомер, триетаноламін, запашка, феноксіетанол.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721492415/products/520975_1_1712818707.webp'),
(88, 2, 'Dove Summer Glow', 'Хотите, чтобы кожа всегда оставалась смуглой и загорелой, даже когда лето закончилось? Специалисты Dove создали уникальный косметический продукт, который помогает с легкостью воплотить эту мечту в реальность!', 'Интенсивно увлажняет кожу и питает ее полезными и ценными компонентами.\r\n\r\nСоздает восхитительный ровный оттенок, обладает эффектом легкого загара.\r\n\r\nСодержит комплекс NutriDuo с натуральными питательными веществами.\r\nОбеспечивает легкое естественное сияние кожи.\r\n\r\nНе оставляет следов на одежде и постельном белье', 12, '254299', 'Aqua, Glycerin, Dihydroxyacetone, Isopropyl Palmitate, Stearic Acid, Glycol Stearate, Dimethicone, PEG 100 Stearate, Collagen Amino Acids, Helianthus Annuus Hybrid Oil, Isomerized Linoleic Acid, Lactic Acid, Potassium Lactate, Sodium PCA, Urea, Cyclopentasiloxane, Dimethiconol, Isohexadecane, Glyceryl Stearate, Polysorbate 60, Sorbitan Isostearate, Stearamide AMP, Citric Acid, Cetyl Alcohol, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Potato Starch Modified, Calcium Aluminum Borosilicate, Silica, Tin Oxide, Disodium EDTA, Parfum, Methylparaben, Phenoxyethanol, Propylparaben, Caramel, Maltodextrin, Alpha-Isomethyl Ionone, Benzyl Alcohol, Butylphenyl Methylpropional, Citronellol, Coumarin, Geraniol, Hexyl Cinnamal, Limonene, Linalool, CI 16255, CI 47005.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721551279/products/254299_1_1718604009.webp'),
(90, 2, 'Weleda Mama Stretch Mark Oil', 'Регулярний масаж з олією Mama Stretch Mark під час вагітності та після пологів — запорука ефективної профілактики появи розтяжок і мінімізації тих, що вже є', 'Засіб можна використовувати з перших тижнів вагітності, наносити на шкіру грудей, живота, стегон і сідниць. Він містить органічні олії жожоба, мигдалю, зародків пшениці, які живлять і пом’якшують, роблять шкіру еластичною, глибоко зволожують. Екстракт арніки — протимікробний компонент, що підвищує пружність шкіри. Засіб має нейтральний трав’яний аромат завдяки ефірним оліям у складі. Продукт не містить синтетичних домішок та ароматизаторів', 15, '26827', 'Prunus Amygdalus Dulcis Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Wheat Germ Oil, Fragrance (Parfum), Arnica Montana Flower Extract, Limonene, Linalool, Citronellol, Geraniol, Citral, Eugenol, Farnesol.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639262/products/633996_1_1720105009.webp'),
(91, 2, 'Body SuperFood Avocado', 'Живильний ефект упродовж 48 годин забезпечує Body SuperFood Avocado Oil + Omega 6 Nourishing Cream! Цей веганський продукт бренду Garnier став переможцем Marie Claire Skin Awards 2022.', 'Авокадо у складі крему живить шкіру корисними мікроелементами, а жирна кислота Омега-6 зміцнює ліпідний бар’єр. Продукт сприяє миттєвому зволоженню, швидко всотується.', 20, '26827', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639620/products/768200_1_1711560805.webp'),
(92, 2, 'Q+A', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 122, '822271', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639828/products/822271_1_1697632072.webp'),
(93, 2, 'Collistar', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 18, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721639940/products/603008_2_1715348877.webp'),
(94, 2, 'Enough Body Lite Fit Cream', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 25, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640062/products/586088_2_1721237052.webp'),
(96, 2, 'Slim Extreme 4D Spa', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640297/products/299149_1_1717074438.webp'),
(97, 2, 'NIVEA Repair & Care', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640359/products/358471_3_1710338713.webp'),
(98, 2, 'Грейпфрут-чилі', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721640460/products/695393_1_1710949546.webp'),
(99, 7, 'Shelly Hand and Nail Cream', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', '474014_2_1710329044.webp'),
(100, 7, 'Відновлення рук', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 2, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641011/products/828976_1_1713193211.webp'),
(101, 7, '3в1 NIVEA SOS', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_1_1721375258.webp'),
(102, 7, 'Dove Nourishing Secrets', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641152/products/474014_1_1710329044.webp'),
(103, 7, 'CeraVe Reparative Hand Cream', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641221/products/627484_1_1710406820.webp'),
(104, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(105, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(106, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_2_1715693858.webp'),
(107, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(108, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(109, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(110, 7, 'Пілінг-скатка для рук та ніг', 'Лосьйон для тіла Salicylic Acid ефективно заспокоює шкіру. Засіб британського бренду Q+A на 98% складається з натуральних компонентів, підходить для веганів, його не випробовували на тваринах.', 'Саліцилова кислота відлущує, оновлює і живить шкіру, покращує текстуру і забезпечує освітлювальний ефект. Колоїдна вівсянка має захисні і зволожувальні властивості, видаляє надлишок себуму. Екстракт кори білої верби, джерело саліцину, справляє заспокоювальну дію. Гіалуронова кислота омолоджує і зволожує шкіру.', 1, '603008', 'Aqua / Water, Glycerin, Isopropyl Palmitate, Butyrospermum Parkii Butter / Shea Butter, Propanediol, Cetyl Alcohol, Myristyl Myristate, Zea Mays Starch / Corn Starch, Glycine Soja Oil / Soybean Oil, Helianthus Annuus Seed Oil / Sunflower Seed Oil, Rosmarinus Officinalis Leaf Extract / Rosemary Leaf Extract, Persea Gratissima Oil / Avocado Oil, Carbomer, Sodium Hydroxide, Caprylyl Glycol, Citric Acid, Polyglyceryl-3 Methylglucose Distearate, Tocopherol, Potassium Sorbate, Benzyl Alcohol, Parfum / Fragrance.', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641291/products/752425_1_1715693858.webp'),
(120, 8, 'Свічка воскова', 'Свічка воскова діаметер 25 мм', 'Освітлить кімнату в темний час', 1, '123456', 'парафін, вода', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1722869042/products/4374174636_voskovaya-svecha-mood.webp'),
(122, 2, 'Крем для рук', 'КРем для рук гарно зволожує шкіру рук.', 'зволоження рук', 5, '287448241', 'олія пальмова', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_3_1721375258.webp'),
(123, 2, 'Керм для  шкіри', 'Крем для рук та тіла', 'Для зволоження шкіри', 1, '2154841231', 'вода,олія.гліцерин', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1721641081/products/443863_3_1721375258.webp'),
(124, 8, 'Свічка св\'яткова', 'Свічка товста та довго горить!', 'Гарно підійде до святкування різноманітних свят!', 1, '2154841231', 'Віск, ароматизатори', 'https://res.cloudinary.com/drwfk1ks0/image/upload/v1727806934/products/candles.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`) VALUES
(2, 'Lana', 'Lana.perunitsa@gmail.com', '$2b$10$HNi1VdsTlI/3ntGbY48tQeEXfJInXAULwcjLUdtVmLHlM2BsDqEHS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI3OTgzNjY4LCJleHAiOjE3Mjc5OTQ0Njh9.CDlhNVht1XVJ0VpisYXjaCNTKID9IrMrzVF-bXHURDY');

-- --------------------------------------------------------

--
-- Структура таблицы `variations`
--

CREATE TABLE `variations` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `price` int NOT NULL,
  `discount` int DEFAULT NULL,
  `count` int NOT NULL,
  `color` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `size` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `variations`
--

INSERT INTO `variations` (`id`, `product_id`, `price`, `discount`, `count`, `color`, `size`) VALUES
(32, 83, 90, 10, 94, '#dada11', 150),
(34, 84, 10, NULL, 85, '#ff0000', 54),
(38, 88, 177, 5, 97, '#D7D7D7', 250),
(40, 90, 686, 10, 100, NULL, 100),
(41, 91, 203, 30, 98, NULL, 380),
(42, 92, 507, 10, 100, NULL, 250),
(43, 93, 702, 10, 100, NULL, 400),
(44, 94, 1152, 10, 98, NULL, 180),
(46, 96, 210, NULL, 98, NULL, 250),
(47, 97, 181, NULL, 100, NULL, 250),
(48, 98, 348, NULL, 99, NULL, 200),
(49, 99, 72, NULL, 103, NULL, 45),
(50, 99, 165, NULL, 101, NULL, 250),
(53, 100, 144, NULL, 97, NULL, 75),
(54, 101, 154, NULL, 100, NULL, 100),
(55, 102, 98, NULL, 99, NULL, 75),
(56, 103, 298, NULL, 100, NULL, 50),
(57, 104, 260, NULL, 100, NULL, 200),
(58, 105, 250, NULL, 100, NULL, 200),
(59, 106, 240, NULL, 100, NULL, 200),
(60, 107, 230, NULL, 100, NULL, 200),
(61, 108, 220, NULL, 100, NULL, 200),
(62, 109, 210, NULL, 99, NULL, 200),
(63, 110, 200, NULL, 99, NULL, 200),
(110, 83, 198, 10, 76, '#ff0000', 250),
(112, 120, 270, 10, 50, '#768159', NULL),
(113, 120, 270, 10, 50, '#ff0000', NULL),
(119, 122, 100, NULL, 96, '#D7D7D7', 150),
(120, 123, 180, 10, 100, '#D7D7D7', 100),
(122, 84, 540, NULL, 100, '#dada11', 250),
(126, 124, 200, NULL, 100, '#D7D7D7', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_feedback` (`product_id`);

--
-- Индексы таблицы `imageUrls`
--
ALTER TABLE `imageUrls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_img` (`product_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_items_id` (`orders_items_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `variations`
--
ALTER TABLE `variations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variations` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=437;

--
-- AUTO_INCREMENT для таблицы `imageUrls`
--
ALTER TABLE `imageUrls`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=261;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `variations`
--
ALTER TABLE `variations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `product_feedback` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `imageUrls`
--
ALTER TABLE `imageUrls`
  ADD CONSTRAINT `product_img` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orders_items_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `variations`
--
ALTER TABLE `variations`
  ADD CONSTRAINT `product_variations` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
