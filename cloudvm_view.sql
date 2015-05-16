-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2015 at 05:35 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cloudvm`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `beda_waktu`
--
CREATE TABLE IF NOT EXISTS `beda_waktu` (
`id_instances` bigint(20)
,`id_user` bigint(20)
,`id_plan` int(11)
,`nama_instance` varchar(200)
,`uuid_vm` varchar(100)
,`status_pembayaran` tinyint(1)
,`tanggal` date
,`started` tinyint(1)
,`deleted` tinyint(1)
,`Selisih` int(7)
);

-- --------------------------------------------------------

--
-- Table structure for table `instances`
--

CREATE TABLE IF NOT EXISTS `instances` (
  `id_instances` bigint(20) NOT NULL,
  `id_user` bigint(20) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `nama_instance` varchar(200) NOT NULL,
  `uuid_vm` varchar(100) NOT NULL,
  `status_pembayaran` tinyint(1) NOT NULL,
  `tanggal` date NOT NULL,
  `started` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instances`
--

INSERT INTO `instances` (`id_instances`, `id_user`, `id_plan`, `nama_instance`, `uuid_vm`, `status_pembayaran`, `tanggal`, `started`, `deleted`) VALUES
(1, 1, 1, 'ins1', '0a1230f', 0, '2015-04-01', 0, 0),
(2, 2, 3, 'ins2', '64hb63h', 0, '2015-04-01', 0, 0),
(3, 4, 3, 'ins3', '532hw46b', 0, '2015-04-01', 0, 0),
(4, 6, 3, 'ins4', 'y5bnh676', 0, '2015-04-04', 0, 0),
(5, 7, 5, 'ins5', '67h5b63', 0, '2015-04-02', 0, 0),
(6, 7, 5, 'ins6', '563j67354h', 1, '2015-04-09', 0, 0),
(7, 8, 1, 'ins7', '5hn53hb', 1, '2015-03-05', 0, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `notification_email`
--
CREATE TABLE IF NOT EXISTS `notification_email` (
`id_user` bigint(20)
,`nama_user` varchar(100)
,`email_user` varchar(200)
,`nama_cc_user` varchar(100)
,`nama_instance` varchar(200)
,`harga_plan` bigint(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `pricing`
--

CREATE TABLE IF NOT EXISTS `pricing` (
  `id_plan` int(11) NOT NULL,
  `nama_plan` varchar(100) NOT NULL,
  `deskripsi_plan` varchar(500) NOT NULL,
  `harga_plan` bigint(20) NOT NULL,
  `jumlah_cpu` int(11) NOT NULL,
  `jumlah_memori` int(11) NOT NULL,
  `jumlah_storage` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pricing`
--

INSERT INTO `pricing` (`id_plan`, `nama_plan`, `deskripsi_plan`, `harga_plan`, `jumlah_cpu`, `jumlah_memori`, `jumlah_storage`) VALUES
(1, 'C1M1S08', 'This plan provides you with 1 CPU, 1GB of VRAM and 8GB of VHDD.', 150000, 1, 1, 8),
(2, 'C1M1S16', 'This plan provides you with 1 CPU, 1GB of VRAM and 16GB of VHDD.', 175000, 1, 1, 16),
(3, 'C1M1S32', 'This plan provides you with 1 CPU, 1GB of VRAM and 32GB of VHDD.', 225000, 1, 1, 32),
(4, 'C1M1S64', 'This plan provides you with 1 CPU, 1GB of VRAM and 64GB of VHDD.', 325000, 1, 1, 64),
(5, 'C1M2S08', 'This plan provides you with 1 CPU, 2GB of VRAM and 8GB of VHDD.', 225000, 1, 2, 8),
(6, 'C1M2S16', 'This plan provides you with 1 CPU, 2GB of VRAM and 16GB of VHDD.', 250000, 1, 2, 16),
(7, 'C1M2S32', 'This plan provides you with 1 CPU, 2GB of VRAM and 32GB of VHDD.', 300000, 1, 2, 32),
(8, 'C1M2S64', 'This plan provides you with 1 CPU, 2GB of VRAM and 64GB of VHDD.', 400000, 1, 2, 64),
(9, 'C2M1S08', 'This plan provides you with 2 CPU, 1GB of VRAM and 8GB of VHDD.', 200000, 2, 1, 8),
(10, 'C2M1S16', 'This plan provides you with 2 CPU, 1GB of VRAM and 16GB of VHDD.', 225000, 2, 1, 16),
(11, 'C2M1S32', 'This plan provides you with 2 CPU, 1GB of VRAM and 32GB of VHDD.', 275000, 2, 1, 32),
(12, 'C2M1S64', 'This plan provides you with 2 CPU, 1GB of VRAM and 64GB of VHDD.', 375000, 2, 1, 64),
(13, 'C2M2S08', 'This plan provides you with 2 CPU, 2GB of VRAM and 8GB of VHDD.', 275000, 2, 2, 8),
(14, 'C2M2S16', 'This plan provides you with 2 CPU, 2GB of VRAM and 16GB of VHDD.', 300000, 2, 2, 16),
(15, 'C2M2S32', 'This plan provides you with 2 CPU, 2GB of VRAM and 32GB of VHDD.', 350000, 2, 2, 32),
(16, 'C2M2S64', 'This plan provides you with 2 CPU, 2GB of VRAM and 64GB of VHDD.', 450000, 2, 2, 64);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` bigint(20) NOT NULL,
  `nama_user` varchar(100) NOT NULL,
  `email_user` varchar(200) NOT NULL,
  `password_user` varchar(32) NOT NULL,
  `no_telp_user` int(11) NOT NULL,
  `nama_perusahaan_user` varchar(100) NOT NULL,
  `alamat_user` varchar(100) NOT NULL,
  `nama_cc_user` varchar(100) NOT NULL,
  `alamat_cc_user` varchar(100) NOT NULL,
  `nomor_cc_user` varchar(100) NOT NULL,
  `nomor_vcv_user` char(3) NOT NULL,
  `expire_month_cc_user` smallint(5) NOT NULL,
  `expire_year_cc_user` smallint(5) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `email_user`, `password_user`, `no_telp_user`, `nama_perusahaan_user`, `alamat_user`, `nama_cc_user`, `alamat_cc_user`, `nomor_cc_user`, `nomor_vcv_user`, `expire_month_cc_user`, `expire_year_cc_user`) VALUES
(1, 'budi', 'budi@budi.com', '123424hdgfd', 54674537, 'budi corp', 'keputih', 'budi', 'keputih', '63467534754hf', '123', 12, 2015),
(2, 'kosim', 'kosim@kosim.com', '424532564hgjhg', 87648658, 'kosim corp', 'kejawan', 'kosim', 'kejawan', '8tyn46786', '123', 12, 2015),
(4, 'brad', 'bradd@brad.com', '65436h346h3', 76457657, 'brad corp', 'LAmongan', 'brad', 'LA', '57h7577h5', '123', 12, 2015),
(5, 'bush', 'bus@bush.com', '2534h646g', 54236436, 'bush inc', 'keputih', 'bush', 'gebang', '5h4tyrgv', '123', 12, 2015),
(6, 'bradley', 'bradley', 'gbevg646y', 5324646, 'bradley', 'keputih', 'bradley', 'keputih', '6y43bh4rjn', '123', 12, 2015),
(7, 'tad', 'tad@tad.com', '524gh326ed', 564236457, 'tad', 'bekasi', 'tady', 'bekasi', 'y6456h75', '124', 12, 2015),
(8, 'nash', 'nash@nash.com', '43bh43rhb64nj', 54376547, 'nash', 'keputih', 'brb', 'keputih', '4ghb4h6y4', '122', 12, 2015);

-- --------------------------------------------------------

--
-- Structure for view `beda_waktu`
--
DROP TABLE IF EXISTS `beda_waktu`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `beda_waktu` AS select `instances`.`id_instances` AS `id_instances`,`instances`.`id_user` AS `id_user`,`instances`.`id_plan` AS `id_plan`,`instances`.`nama_instance` AS `nama_instance`,`instances`.`uuid_vm` AS `uuid_vm`,`instances`.`status_pembayaran` AS `status_pembayaran`,`instances`.`tanggal` AS `tanggal`,`instances`.`started` AS `started`,`instances`.`deleted` AS `deleted`,(to_days(curdate()) - to_days(`instances`.`tanggal`)) AS `Selisih` from `instances`;

-- --------------------------------------------------------

--
-- Structure for view `notification_email`
--
DROP TABLE IF EXISTS `notification_email`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `notification_email` AS select `instances`.`id_user` AS `id_user`,`user`.`nama_user` AS `nama_user`,`user`.`email_user` AS `email_user`,`user`.`nama_cc_user` AS `nama_cc_user`,`instances`.`nama_instance` AS `nama_instance`,`pricing`.`harga_plan` AS `harga_plan` from (((`instances` join `beda_waktu`) join `user`) join `pricing`) where ((`instances`.`id_user` = `user`.`id_user`) and (`instances`.`id_plan` = `pricing`.`id_plan`) and (`instances`.`id_instances` = `beda_waktu`.`id_instances`) and (`beda_waktu`.`Selisih` % 20 = 0));

--
-- Indexes for dumped tables
--

--
-- Indexes for table `instances`
--
ALTER TABLE `instances`
  ADD PRIMARY KEY (`id_instances`), ADD KEY `id_user` (`id_user`), ADD KEY `id_plan` (`id_plan`);

--
-- Indexes for table `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`id_plan`), ADD UNIQUE KEY `id_plan` (`id_plan`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`), ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `instances`
--
ALTER TABLE `instances`
  MODIFY `id_instances` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `pricing`
--
ALTER TABLE `pricing`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `instances`
--
ALTER TABLE `instances`
ADD CONSTRAINT `price_instance` FOREIGN KEY (`id_plan`) REFERENCES `pricing` (`id_plan`),
ADD CONSTRAINT `user_instance` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;