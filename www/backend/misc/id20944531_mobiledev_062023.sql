-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2023 at 03:18 PM
-- Server version: 10.5.20-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id20944531_mobiledev_062023`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `score_id` int(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `difficulty` enum('easy','intermediate','hard') DEFAULT NULL,
  `score` float NOT NULL,
  `sentence` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`score_id`, `user_id`, `difficulty`, `score`, `sentence`) VALUES
(54, 41, 'easy', 12.5, 'anon'),
(55, 41, 'easy', 14.4, 'anon'),
(56, 41, 'easy', 18.5, 'anon'),
(57, 42, 'easy', 18.3, 'anon'),
(58, 42, 'easy', 13.21, 'anon'),
(59, 43, 'easy', 11.1, 'anon'),
(68, 41, 'easy', 13.5, 'This easy sentence.'),
(69, 42, 'easy', 15.2, 'This is an easy.'),
(70, 43, 'easy', 14.5, 'is an easy sentence.'),
(71, 44, 'easy', 15.6, 'This is easy sentence.'),
(72, 41, 'easy', 11.5, 'This is an sentence.'),
(73, 46, 'easy', 15.1, 'This sentence.'),
(74, 47, 'easy', 12.5, 'This.'),
(75, 43, 'hard', 15.43, 'anon'),
(76, 41, 'easy', 3.23, '');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` int(20) NOT NULL,
  `user_id` int(10) NOT NULL,
  `session_started` timestamp NOT NULL DEFAULT current_timestamp(),
  `session_ended` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `avatar_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `avatar_id`, `created_at`) VALUES
(41, 'john1234', 2, '2023-06-28 12:53:28'),
(42, 'jaycccccc', 5, '2023-06-28 12:53:43'),
(43, 'riajane123', 4, '2023-06-28 12:53:50'),
(44, 'jeraldcas', 1, '2023-06-28 12:53:57'),
(45, 'celso4444', 3, '2023-06-28 13:01:00'),
(46, 'jenny34', 6, '2023-06-28 13:01:09'),
(47, 'benny67', 7, '2023-06-28 13:01:17'),
(48, 'jeraldjerald', 8, '2023-06-28 13:44:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`score_id`),
  ADD KEY `FK_scores1` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `FK_sessions1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `score_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `FK_scores1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FK_sessions1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
