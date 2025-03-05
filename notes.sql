-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Mar 2025 pada 15.04
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tcc_sat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `notesTitle` varchar(255) NOT NULL,
  `notesContent` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id`, `notesTitle`, `notesContent`, `createdAt`, `updatedAt`) VALUES
(8, 'Perkenalan', 'Hai aku satt', '2025-03-04 19:55:48', '2025-03-04 20:25:29'),
(9, 'Task 1', 'tugas 1 tcc buat crud dan rest', '2025-03-04 20:25:09', '2025-03-04 20:25:09');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
