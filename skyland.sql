-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2022 at 06:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skyland`
--

-- --------------------------------------------------------

--
-- Table structure for table `calls_chats`
--

CREATE TABLE `calls_chats` (
  `chat_id` int(20) NOT NULL,
  `caller_id` int(20) NOT NULL,
  `time_created` date NOT NULL,
  `call_type` int(5) NOT NULL,
  `call_length` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(20) NOT NULL,
  `channel_name` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `created_by` int(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `channel_media`
--

CREATE TABLE `channel_media` (
  `channel_media_id` int(20) NOT NULL,
  `channel_id` int(20) NOT NULL,
  `sender_id` int(20) NOT NULL,
  `time_sent` timestamp NOT NULL DEFAULT current_timestamp(),
  `media_type` int(20) NOT NULL,
  `text` varchar(200) NOT NULL,
  `likes` int(20) DEFAULT 0,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `channel_members`
--

CREATE TABLE `channel_members` (
  `channel_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `member_type` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chat_id` int(20) NOT NULL,
  `user_id1` int(20) NOT NULL,
  `user_id2` int(20) NOT NULL,
  `created_on` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chat_id`, `user_id1`, `user_id2`, `created_on`) VALUES
(1, 1, 1, '0000-00-00 00:00:00.000000'),
(2, 2, 2, '0000-00-00 00:00:00.000000'),
(4, 2, 1, '0000-00-00 00:00:00.000000'),
(5, 3, 3, '0000-00-00 00:00:00.000000'),
(6, 3, 1, '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `chat_media`
--

CREATE TABLE `chat_media` (
  `chat_media_id` int(20) NOT NULL,
  `chat_id` int(20) NOT NULL,
  `sender_id` int(20) NOT NULL,
  `time_sent` datetime NOT NULL,
  `time_reached` date NOT NULL,
  `time_read` date NOT NULL,
  `media_type` int(5) NOT NULL,
  `text` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_media`
--

INSERT INTO `chat_media` (`chat_media_id`, `chat_id`, `sender_id`, `time_sent`, `time_reached`, `time_read`, `media_type`, `text`) VALUES
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(2, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(3, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(4, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(5, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(6, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(7, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(8, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(9, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(10, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(11, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(12, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(13, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(14, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(15, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(16, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(17, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(18, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(19, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(20, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(21, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(22, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(23, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(24, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(25, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(26, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(27, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(28, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(29, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(30, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(31, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(32, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(33, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(34, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(35, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(36, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(37, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(38, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(39, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(40, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(41, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(42, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(43, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(44, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(45, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(46, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(47, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(48, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(49, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(50, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(51, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(52, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(53, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(54, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(55, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(56, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(57, 4, 2, '0000-00-00 00:00:00', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk');

-- --------------------------------------------------------

--
-- Table structure for table `connection_ids`
--

CREATE TABLE `connection_ids` (
  `user_id` int(20) NOT NULL,
  `peer_id` varchar(20) DEFAULT NULL,
  `socket_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connection_ids`
--

INSERT INTO `connection_ids` (`user_id`, `peer_id`, `socket_id`) VALUES
(1, NULL, ''),
(2, NULL, ''),
(3, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(20) NOT NULL,
  `game_name` varchar(30) NOT NULL,
  `title` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(20) NOT NULL,
  `group_name` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `creator_id` int(20) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `extension` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `title`, `creator_id`, `created_on`, `extension`) VALUES
(1, 'undefined', '', 3, '0000-00-00 00:00:00.000000', 'jpg');

-- --------------------------------------------------------

--
-- Table structure for table `group_media`
--

CREATE TABLE `group_media` (
  `group_media_id` int(20) NOT NULL,
  `group_id` int(20) NOT NULL,
  `sender_id` int(20) NOT NULL,
  `time_sent` datetime(6) NOT NULL,
  `media_type` int(10) NOT NULL,
  `text` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `group_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`group_id`, `user_id`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `media_types`
--

CREATE TABLE `media_types` (
  `media_type_id` int(5) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media_types`
--

INSERT INTO `media_types` (`media_type_id`, `type`) VALUES
(0, 'messages'),
(1, 'images'),
(2, 'videos'),
(3, 'audios'),
(4, 'document'),
(5, 'location'),
(6, 'call_audio'),
(7, 'call_video');

-- --------------------------------------------------------

--
-- Table structure for table `member_types`
--

CREATE TABLE `member_types` (
  `member_type_id` int(5) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member_types`
--

INSERT INTO `member_types` (`member_type_id`, `type`) VALUES
(1, 'founder'),
(2, 'manager'),
(3, 'regular');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `pass_word` varchar(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `e_mail` varchar(30) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `profile_picture` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `pass_word`, `created_on`, `first_name`, `last_name`, `e_mail`, `mobile`, `extension`, `profile_picture`) VALUES
(1, '1', '1', '2022-09-14 16:54:18', '1', '1', NULL, NULL, 'jpg', ''),
(2, '2', '2', '2022-09-15 02:46:14', '2', '2', NULL, NULL, 'jpg', ''),
(3, '3', '3', '2022-09-15 03:37:09', '3', '3', NULL, NULL, 'jpg', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`channel_id`),
  ADD UNIQUE KEY `channel_name` (`channel_name`);

--
-- Indexes for table `channel_media`
--
ALTER TABLE `channel_media`
  ADD PRIMARY KEY (`channel_media_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `chat_media`
--
ALTER TABLE `chat_media`
  ADD PRIMARY KEY (`chat_media_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `name` (`group_name`);

--
-- Indexes for table `group_media`
--
ALTER TABLE `group_media`
  ADD PRIMARY KEY (`group_media_id`);

--
-- Indexes for table `media_types`
--
ALTER TABLE `media_types`
  ADD PRIMARY KEY (`media_type_id`);

--
-- Indexes for table `member_types`
--
ALTER TABLE `member_types`
  ADD PRIMARY KEY (`member_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channels`
--
ALTER TABLE `channels`
  MODIFY `channel_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `channel_media`
--
ALTER TABLE `channel_media`
  MODIFY `channel_media_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chat_media`
--
ALTER TABLE `chat_media`
  MODIFY `chat_media_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `group_media`
--
ALTER TABLE `group_media`
  MODIFY `group_media_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member_types`
--
ALTER TABLE `member_types`
  MODIFY `member_type_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
