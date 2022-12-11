-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2022 at 03:06 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

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
  `user_id` int(20) NOT NULL,
  `time_created` datetime NOT NULL DEFAULT current_timestamp(),
  `call_type` int(5) NOT NULL,
  `call_length` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calls_chats`
--

INSERT INTO `calls_chats` (`chat_id`, `user_id`, `time_created`, `call_type`, `call_length`) VALUES
(13, 7, '0000-00-00 00:00:00', 6, 0),
(13, 1, '0000-00-00 00:00:00', 7, 1),
(13, 1, '0000-00-00 00:00:00', 6, 1),
(13, 1, '0000-00-00 00:00:00', 6, 1),
(13, 1, '0000-00-00 00:00:00', 7, 1),
(13, 1, '0000-00-00 00:00:00', 7, 1),
(13, 1, '0000-00-00 00:00:00', 7, 1),
(13, 1, '0000-00-00 00:00:00', 7, 1),
(10, 5, '0000-00-00 00:00:00', 7, 0),
(10, 5, '0000-00-00 00:00:00', 6, 0),
(15, 4, '0000-00-00 00:00:00', 6, 0),
(14, 7, '0000-00-00 00:00:00', 7, 0),
(9, 1, '2022-12-04 20:20:04', 6, 1),
(9, 1, '2022-12-04 20:21:46', 7, 1),
(13, 1, '2022-12-04 20:44:45', 6, 1),
(14, 7, '2022-12-05 10:25:25', 6, 0),
(13, 7, '2022-12-06 14:10:22', 6, 0),
(13, 7, '2022-12-06 20:29:24', 6, 0),
(13, 7, '2022-12-06 20:30:29', 6, 0),
(13, 1, '2022-12-06 20:31:43', 7, 0),
(13, 7, '2022-12-06 20:45:30', 6, 0),
(13, 7, '2022-12-06 20:45:55', 7, 0),
(13, 1, '2022-12-06 20:47:06', 7, 0),
(13, 1, '2022-12-06 20:47:52', 7, 0),
(13, 7, '2022-12-06 21:06:11', 7, 0),
(13, 7, '2022-12-06 21:07:47', 7, 0),
(13, 1, '2022-12-06 21:11:53', 7, 0),
(13, 7, '2022-12-06 21:22:53', 7, 0),
(13, 1, '2022-12-06 21:25:30', 7, 0),
(13, 7, '2022-12-06 21:28:46', 7, 0),
(13, 7, '2022-12-06 21:48:20', 7, 0),
(13, 1, '2022-12-06 21:58:46', 7, 0),
(13, 7, '2022-12-06 22:08:30', 7, 0),
(13, 7, '2022-12-06 22:09:58', 7, 0),
(13, 7, '2022-12-06 22:12:04', 7, 0),
(13, 7, '2022-12-07 19:57:05', 7, 0),
(13, 7, '2022-12-07 19:58:33', 7, 0),
(13, 7, '2022-12-07 19:59:07', 7, 0),
(13, 7, '2022-12-07 20:01:33', 7, 0),
(13, 7, '2022-12-07 20:08:03', 7, 0),
(13, 7, '2022-12-07 20:10:09', 7, 0),
(13, 7, '2022-12-07 20:11:50', 7, 0),
(13, 7, '2022-12-07 20:16:51', 7, 0),
(13, 7, '2022-12-07 20:19:42', 7, 0),
(13, 7, '2022-12-07 20:20:40', 7, 0),
(13, 1, '2022-12-08 06:27:58', 6, 0),
(13, 1, '2022-12-08 06:28:12', 7, 0),
(13, 1, '2022-12-08 06:29:02', 7, 0),
(13, 7, '2022-12-08 06:30:22', 7, 0),
(13, 7, '2022-12-08 06:31:30', 7, 0),
(13, 7, '2022-12-08 06:32:19', 7, 0),
(13, 1, '2022-12-08 06:33:00', 7, 0),
(9, 4, '2022-12-08 09:04:51', 7, 0),
(13, 1, '2022-12-08 20:02:16', 7, 0),
(13, 7, '2022-12-08 20:03:24', 7, 0),
(13, 7, '2022-12-08 20:27:36', 7, 0),
(13, 7, '2022-12-08 20:28:48', 7, 0),
(13, 7, '2022-12-08 20:36:09', 7, 0),
(13, 7, '2022-12-08 20:39:15', 7, 0),
(13, 7, '2022-12-08 20:40:34', 7, 0),
(13, 7, '2022-12-08 20:46:20', 7, 0),
(13, 1, '2022-12-08 20:49:30', 7, 0),
(13, 7, '2022-12-08 20:52:49', 7, 0),
(13, 1, '2022-12-08 20:57:46', 7, 0),
(13, 1, '2022-12-08 20:58:52', 7, 0),
(13, 7, '2022-12-08 21:01:10', 7, 0),
(13, 7, '2022-12-08 21:12:45', 7, 0),
(13, 1, '2022-12-08 21:14:03', 7, 0),
(13, 1, '2022-12-08 21:17:21', 7, 0),
(13, 7, '2022-12-08 21:52:21', 7, 0),
(13, 1, '2022-12-08 21:52:37', 7, 0),
(13, 7, '2022-12-08 21:56:28', 7, 0),
(13, 7, '2022-12-08 21:59:13', 7, 0),
(13, 7, '2022-12-08 22:02:09', 7, 0),
(13, 1, '2022-12-08 22:03:35', 7, 0),
(13, 1, '2022-12-08 22:03:52', 7, 0),
(13, 7, '2022-12-08 22:06:30', 7, 0),
(13, 1, '2022-12-08 22:07:35', 7, 0),
(13, 1, '2022-12-08 22:11:42', 7, 0),
(13, 1, '2022-12-08 22:12:00', 7, 0),
(13, 1, '2022-12-08 22:12:07', 7, 0),
(13, 1, '2022-12-08 22:13:43', 7, 0),
(13, 7, '2022-12-08 22:16:20', 7, 0),
(13, 1, '2022-12-08 22:16:46', 7, 0),
(13, 7, '2022-12-09 06:32:13', 7, 0),
(13, 7, '2022-12-09 06:32:37', 7, 0),
(13, 1, '2022-12-09 06:37:04', 7, 0),
(13, 7, '2022-12-09 06:40:14', 7, 0),
(13, 7, '2022-12-09 06:40:37', 7, 0),
(13, 1, '2022-12-09 06:40:43', 7, 0),
(13, 1, '2022-12-09 06:43:01', 7, 0),
(13, 1, '2022-12-09 06:46:57', 7, 0),
(13, 7, '2022-12-09 06:47:10', 7, 0),
(13, 1, '2022-12-09 06:48:33', 7, 0),
(13, 7, '2022-12-09 06:56:58', 7, 0),
(13, 1, '2022-12-09 06:57:08', 7, 0),
(13, 1, '2022-12-09 06:57:21', 7, 0),
(13, 7, '2022-12-09 06:58:02', 7, 0),
(13, 7, '2022-12-09 06:58:07', 7, 0),
(13, 1, '2022-12-09 06:58:15', 7, 0),
(13, 7, '2022-12-09 07:02:23', 7, 0),
(13, 7, '2022-12-09 07:02:32', 7, 0),
(13, 1, '2022-12-09 07:02:36', 7, 0),
(13, 1, '2022-12-09 07:04:02', 7, 0),
(13, 7, '2022-12-09 07:04:15', 7, 0),
(13, 7, '2022-12-09 07:05:19', 7, 0),
(13, 1, '2022-12-09 07:08:53', 7, 0),
(13, 1, '2022-12-09 07:11:01', 7, 0),
(13, 1, '2022-12-09 07:14:59', 7, 0),
(13, 7, '2022-12-09 07:15:42', 7, 0),
(13, 1, '2022-12-09 07:15:49', 7, 0),
(13, 7, '2022-12-09 07:16:00', 7, 0),
(13, 1, '2022-12-09 07:17:35', 7, 0),
(13, 1, '2022-12-09 16:26:48', 7, 0),
(13, 7, '2022-12-09 16:31:34', 7, 0),
(13, 7, '2022-12-09 16:35:51', 7, 0),
(13, 7, '2022-12-09 16:38:42', 7, 0),
(13, 7, '2022-12-09 16:39:46', 7, 0),
(13, 7, '2022-12-09 16:42:19', 7, 0),
(13, 7, '2022-12-09 16:42:33', 7, 0),
(13, 1, '2022-12-09 16:42:57', 7, 0),
(13, 7, '2022-12-09 16:44:02', 7, 0),
(13, 1, '2022-12-09 16:46:13', 7, 0),
(13, 7, '2022-12-09 16:47:27', 7, 0),
(13, 1, '2022-12-09 16:47:30', 7, 0),
(13, 7, '2022-12-09 16:47:45', 7, 0),
(13, 7, '2022-12-09 18:12:28', 7, 0),
(13, 7, '2022-12-09 18:12:54', 7, 0),
(13, 1, '2022-12-09 18:13:08', 7, 0),
(13, 7, '2022-12-09 18:13:21', 7, 0),
(13, 1, '2022-12-09 18:13:25', 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `calls_groups`
--

CREATE TABLE `calls_groups` (
  `group_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `call_type` int(1) NOT NULL,
  `time_created` datetime NOT NULL,
  `call_length` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `channel_id` int(20) NOT NULL,
  `channel_name` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `extension` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`channel_id`, `channel_name`, `title`, `user_id`, `created_on`, `extension`) VALUES
(1, 'drawing_arts', 'My Drawing Arts', 1, '2022-11-07 03:46:46', 'jpg');

-- --------------------------------------------------------

--
-- Table structure for table `channel_media`
--

CREATE TABLE `channel_media` (
  `channel_media_id` int(20) NOT NULL,
  `channel_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `time_sent` timestamp NOT NULL DEFAULT current_timestamp(),
  `media_type` int(20) NOT NULL,
  `text` varchar(200) NOT NULL,
  `likes` int(20) DEFAULT 0
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
  `created_on` datetime(1) NOT NULL DEFAULT current_timestamp(1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chat_id`, `user_id1`, `user_id2`, `created_on`) VALUES
(1, 1, 1, '2022-12-08 22:03:33.0'),
(2, 2, 2, '0000-00-00 00:00:00.0'),
(3, 3, 3, '0000-00-00 00:00:00.0'),
(4, 4, 4, '0000-00-00 00:00:00.0'),
(5, 5, 5, '0000-00-00 00:00:00.0'),
(6, 6, 6, '0000-00-00 00:00:00.0'),
(7, 1, 2, '2022-11-24 22:04:11.0'),
(8, 1, 3, '2022-10-14 22:04:47.0'),
(9, 1, 4, '0000-00-00 00:00:00.0'),
(10, 1, 5, '0000-00-00 00:00:00.0'),
(11, 1, 6, '2023-01-10 22:05:01.0'),
(12, 7, 7, '0000-00-00 00:00:00.0'),
(13, 7, 1, '0000-00-00 00:00:00.0'),
(14, 7, 3, '0000-00-00 00:00:00.0'),
(15, 4, 3, '2021-12-09 17:03:49.0'),
(16, 7, 6, '0000-00-00 00:00:00.0'),
(17, 7, 5, '0000-00-00 00:00:00.0'),
(18, 4, 5, '2022-12-08 16:05:12.1'),
(19, 4, 2, '2022-12-08 16:09:11.6'),
(20, 4, 7, '2022-12-08 16:10:28.9');

-- --------------------------------------------------------

--
-- Table structure for table `chat_media`
--

CREATE TABLE `chat_media` (
  `chat_media_id` int(20) NOT NULL,
  `chat_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `time_sent` datetime(1) NOT NULL DEFAULT current_timestamp(1),
  `time_reached` date NOT NULL,
  `time_read` date NOT NULL,
  `media_type` int(5) NOT NULL,
  `text` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_media`
--

INSERT INTO `chat_media` (`chat_media_id`, `chat_id`, `user_id`, `time_sent`, `time_reached`, `time_read`, `media_type`, `text`) VALUES
(1, 1, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(2, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(3, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(4, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(5, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(6, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(7, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(8, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(9, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(10, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(11, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(12, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(13, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(14, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(15, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(16, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(17, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(18, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(19, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(20, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(21, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(22, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(23, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(24, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(25, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(26, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(27, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(28, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(29, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(30, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(31, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(32, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(33, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(34, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(35, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(36, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(37, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(38, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(39, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(40, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(41, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(42, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(43, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(44, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(45, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(46, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(47, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(48, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(49, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(50, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(51, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(52, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(53, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(54, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(55, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(56, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(57, 4, 2, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !hjguyk'),
(58, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(59, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(60, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(61, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(62, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(63, 12, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(64, 14, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(65, 14, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'what you doing?'),
(66, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(67, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(68, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'going to store?'),
(69, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! hkjhghu ghf hgf hgdf gfctdf  kgu'),
(70, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !  hjgfy hgvh jhgbj ytgkj gfgju ggfjh yfvj fuj vtfghb thkjhghu ghf hgf hgdf gfctdf  kgu'),
(71, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !  hjgfy hgfutygvtr tyrfyh trfuy ytrfjy uytgjb yrtfujg fuyt rugj hgvh jhgbj ytgkj gfgju ggfjh yfvj fuj vtfghb thkjhghu ghf hgf hgdf gfctdf  kgu'),
(72, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !   jkhi8yuygb uygyfcj gub uytg trfuv rtdc hjgfy hgfutygvtr tyrfyh trfuy ytrfjy uytgjb yrtfujg fuyt rugj hgvh jhgbj ytgkj gfgju ggfjh yfvj fuj vtfghb thkjhghu ghf hgf hgdf gfctdf  kgu'),
(73, 14, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !h iuyhg igb yugbk uygu uygvjb yg'),
(74, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! ygujv tfv yttdrtc trd tyrdc trdc'),
(75, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! f v yrf 6rdfc trdc 6redc ygujv tfv yttdrtc trd tyrdc trdc'),
(76, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! f v ygf tfv 5rfv tf6tyv ydfv bytfv yryyrfv tfv ytfv tfv v65fv hgtyfv rf 6rdfc trdc 6redc ygujv tfv yttdrtc trd tyrdc trdc'),
(77, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! f v ygf tfv  hhhhhhhhhhhhhnh hhhhn hhh5rfv tf6tyv ydfv bytfv yryyrfv tfv ytfv tfv v65fv hgtyfv rf 6rdfc trdc 6redc ygujv tfv yttdrtc trd tyrdc trdc'),
(78, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! iyughb t7r7fg 5rfv  '),
(79, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! iyughb t7r7 f6vr ytrfc 6ftv 45esexv easdxc rfv fg 5rfv  '),
(80, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'c'),
(81, 13, 7, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(82, 3, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(83, 3, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(84, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(85, 13, 1, '0000-00-00 00:00:00.0', '0000-00-00', '0000-00-00', 0, 'hello there ! gh'),
(86, 11, 1, '2022-12-08 18:03:31.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(87, 11, 6, '2022-12-08 18:04:44.0', '0000-00-00', '0000-00-00', 0, 'hello there !'),
(88, 11, 1, '2022-12-08 18:04:59.0', '0000-00-00', '0000-00-00', 0, 'where are you?'),
(89, 11, 6, '2022-12-08 18:05:17.0', '0000-00-00', '0000-00-00', 0, 'i am just leaving the office.'),
(90, 11, 1, '2022-12-08 18:05:40.0', '0000-00-00', '0000-00-00', 0, 'care for a drink?'),
(91, 11, 6, '2022-12-08 18:05:53.0', '0000-00-00', '0000-00-00', 0, 'sure! where are we going?'),
(92, 11, 1, '2022-12-08 18:06:00.0', '0000-00-00', '0000-00-00', 0, 'the new grills'),
(93, 11, 6, '2022-12-08 18:06:04.0', '0000-00-00', '0000-00-00', 0, 'ok'),
(94, 11, 1, '2022-12-09 16:11:00.1', '0000-00-00', '0000-00-00', 0, 'hii'),
(95, 11, 6, '2022-12-09 18:10:31.0', '0000-00-00', '0000-00-00', 0, 'check out this new movie'),
(96, 11, 1, '2022-12-09 16:13:04.1', '0000-00-00', '0000-00-00', 0, 'just sent it to me'),
(97, 11, 6, '2022-12-12 10:10:00.0', '0000-00-00', '0000-00-00', 0, 'hey!'),
(98, 11, 1, '2022-12-12 10:11:30.4', '0000-00-00', '0000-00-00', 0, 'how are you? feeling better?');

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
(3, NULL, ''),
(7, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(20) NOT NULL,
  `group_name` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp(),
  `extension` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `title`, `user_id`, `created_on`, `extension`) VALUES
(1, 'cooking_shooking_100', 'cooking shooking', 1, '0000-00-00 00:00:00', 'jpg'),
(2, 'family_200', 'family space', 1, '0000-00-00 00:00:00', 'jpg'),
(3, 'friends_4', 'friends forever', 1, '0000-00-00 00:00:00', 'jpg'),
(6, 'chess_101', 'chess club', 1, '0000-00-00 00:00:00', NULL),
(7, 'chess_2', 'chess club 2', 1, '2022-12-08 11:30:47', NULL),
(8, 'golf_buddies_1', 'Golf Club', 1, '2022-12-08 11:33:01', NULL),
(9, 'dr', 'ef', 1, '2022-12-08 11:34:31', NULL),
(10, 'sd', 'ed', 1, '2022-12-08 11:34:42', NULL),
(11, 'efx', 'sd', 1, '2022-12-08 11:35:44', NULL),
(12, 'fg', 'f g', 1, '2022-12-08 11:47:12', NULL),
(13, 'nh', '', 4, '2022-12-08 16:19:55', NULL),
(14, 'bh', 'mk', 4, '2022-12-08 16:28:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `group_media`
--

CREATE TABLE `group_media` (
  `group_media_id` int(20) NOT NULL,
  `group_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `time_sent` datetime NOT NULL DEFAULT current_timestamp(),
  `media_type` int(10) NOT NULL,
  `text` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_media`
--

INSERT INTO `group_media` (`group_media_id`, `group_id`, `user_id`, `time_sent`, `media_type`, `text`) VALUES
(2, 14, 4, '2022-12-08 16:29:09', 0, 'hello there !');

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
(1, 1),
(2, 1),
(3, 1),
(1, 7),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 4),
(14, 4),
(3, 5);

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
(1, 'murtaza_1', '1', '2022-09-14 16:54:18', 'murtaza', 'ezzy', NULL, NULL, 'jpg', ''),
(2, 'burhan_123', '1', '2022-09-15 02:46:14', 'burhan', 'kaydawala', NULL, NULL, 'jpg', ''),
(3, 'fatema50', '1', '2022-09-15 03:37:09', 'fatema', 'retiya', NULL, NULL, 'jpg', ''),
(4, 'sidh_12', '1', '2022-09-14 16:54:18', 'siddharth', 'shah', NULL, NULL, 'jpg', ''),
(5, 'mariya_2', '1', '2022-09-14 16:54:18', 'mariya', 'limdi', NULL, NULL, 'jpg', ''),
(6, 'rakesh_3001', '1', '2022-09-14 16:54:18', 'rakesh', 'shah', NULL, NULL, 'jpg', ''),
(7, '1', '1', '2022-11-28 15:05:35', '1', '1', NULL, NULL, NULL, '');

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
  MODIFY `channel_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `channel_media`
--
ALTER TABLE `channel_media`
  MODIFY `channel_media_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `chat_media`
--
ALTER TABLE `chat_media`
  MODIFY `chat_media_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `group_media`
--
ALTER TABLE `group_media`
  MODIFY `group_media_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `member_types`
--
ALTER TABLE `member_types`
  MODIFY `member_type_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
