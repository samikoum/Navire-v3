-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 30 sep. 2021 à 03:58
-- Version du serveur :  10.1.22-MariaDB
-- Version de PHP :  7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `navire`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(80) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `prenom` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`admin_id`, `nom`, `prenom`, `email`, `password`) VALUES
(1, 'ZianeZiane', 'KhaledKhaled', 'khaledinfo2015@gmail.com', '$2a$12$JjvSZqvT2uMDUxOEjFL0KeWski9/PzTuiEA98b4Oay4f2OpYaoFuy'),
(2, '', '', 'admin@gmail.com', '$2a$12$3yAUX3rNR6hxUgGE0aMliOD5KvXF5fO0fe7RC5ZrPHpqxhtZybERe');

-- --------------------------------------------------------

--
-- Structure de la table `assiduite`
--

CREATE TABLE `assiduite` (
  `ass_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `absence_irr` int(80) NOT NULL,
  `absence_aut` int(80) NOT NULL,
  `annee` date NOT NULL,
  `conge` int(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `assiduite`
--

INSERT INTO `assiduite` (`ass_id`, `matricule`, `absence_irr`, `absence_aut`, `annee`, `conge`) VALUES
(4, 12314, 7, 7, '2018-03-14', 7),
(5, 333333333, 33, 33, '2021-09-17', 13),
(6, 8744, 2, 3, '2021-09-01', 7);

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `doc_id` int(11) NOT NULL,
  `reciver` int(80) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `added_on` date NOT NULL,
  `status` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`doc_id`, `reciver`, `subject`, `description`, `name`, `added_on`, `status`) VALUES
(1, 0, '', '', '3amti02.jpg', '2021-09-29', 'public'),
(2, 8, '', '', '3amti02.jpg', '2021-09-29', 'private'),
(3, 8, '', '', '98.jpg', '2021-09-29', 'private'),
(4, 9, 'subject_456', 'Description_______456', 'brahimo.jpg', '2021-09-29', 'private'),
(5, 0, 'public subject', '', 'kendi.jpg', '2021-09-29', 'public'),
(6, 0, '', '', 'C ???? ????? ????.pdf', '2021-09-30', ''),
(7, 8, '', '', 'C ???? ????? ????.pdf', '2021-09-30', ''),
(8, 9, '', '????? ??? ?? ????????', '0rIM4Fu.jpg', '2021-09-30', ''),
(9, 9, '', '', 'The_Linux_Command_Line-arabic-14.07.pdf', '2021-09-30', ''),
(10, 9, '', '', 'Employers (2).csv', '2021-09-30', ''),
(11, 8, '', '????? ????', '3amti02.jpg', '2021-09-30', '');

-- --------------------------------------------------------

--
-- Structure de la table `evocarriere`
--

CREATE TABLE `evocarriere` (
  `evo_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `post_oc` varchar(80) NOT NULL,
  `structure` varchar(80) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `evocarriere`
--

INSERT INTO `evocarriere` (`evo_id`, `matricule`, `post_oc`, `structure`, `date_debut`, `date_fin`) VALUES
(9, 12314, 'post__3__UP', 'structure__3__UP', '2021-09-02', '2021-09-10'),
(10, 333333333, 'post_ocuppe__3', 'structure', '2021-09-04', '2021-09-10'),
(11, 7987987, 'post_ocuppe__3', 'structure khaled', '2021-09-10', '2021-09-04'),
(12, 0, 'd\'info', 'dddddd', '0000-00-00', '0000-00-00'),
(13, 8744, 'post_ocuppe__3', 'structure___3', '2021-09-05', '2021-09-10'),
(14, 123456789, 'post_ocuppe__3', 'structure___3', '2021-09-11', '2021-09-08');

-- --------------------------------------------------------

--
-- Structure de la table `exprofessionnelle`
--

CREATE TABLE `exprofessionnelle` (
  `exp_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `post_oc` varchar(80) NOT NULL,
  `employer` varchar(80) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `exprofessionnelle`
--

INSERT INTO `exprofessionnelle` (`exp_id`, `matricule`, `post_oc`, `employer`, `date_debut`, `date_fin`) VALUES
(30, 222222, 'mmmmmmmmmm', 'khaled', '0000-00-00', '0000-00-00'),
(31, 12314, 'postupdated__2__UP', 'employeremployer__UP', '2021-09-03', '2021-09-10'),
(32, 455555555, 'post__2', 'emp__2', '2021-09-03', '2021-09-08'),
(33, 333333333, 'Post__3', 'emloyer__3', '2021-09-02', '2021-09-02'),
(34, 7987987, 'post_ocuppe__3', 'dsfsdf', '2021-09-10', '2021-09-11'),
(35, 11111111, 'post_ocuppe__1', 'Employer___1', '2021-09-11', '2021-09-09'),
(36, 8744, 'post_ocuppe__3', 'dsfsdf', '2021-09-04', '2021-09-08'),
(40, 1, 'post_ocuppe__1', 'Employer___1', '2021-09-09', '2021-09-10'),
(41, 2, 'post___2', 'employer__2', '2021-09-02', '2021-09-08'),
(42, 123456789, 'post_ocuppe__3', 'Employer___1', '2021-09-11', '2021-09-10');

-- --------------------------------------------------------

--
-- Structure de la table `formationpro`
--

CREATE TABLE `formationpro` (
  `for_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `intitule` varchar(80) NOT NULL,
  `organisme` varchar(80) NOT NULL,
  `date` date NOT NULL,
  `duree` int(80) NOT NULL,
  `titre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `formationpro`
--

INSERT INTO `formationpro` (`for_id`, `matricule`, `intitule`, `organisme`, `date`, `duree`, `titre`) VALUES
(6, 12314, 'intitule__4__UP', 'organisme__4__UP', '2021-09-03', 15, 'titre__4__UP'),
(7, 333333333, 'intitule___4', 'organisme___4', '2021-09-10', 3, 'titre___4'),
(8, 8744, 'intitule___4', 'ooooooooo', '2021-09-04', 0, 'tttttttttttttttttt');

-- --------------------------------------------------------

--
-- Structure de la table `gratification`
--

CREATE TABLE `gratification` (
  `gra_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `designation` varchar(80) NOT NULL,
  `nature` varchar(80) NOT NULL,
  `date` date NOT NULL,
  `duree` int(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `gratification`
--

INSERT INTO `gratification` (`gra_id`, `matricule`, `designation`, `nature`, `date`, `duree`) VALUES
(2, 87444444, 'dsf', 'sdfsdf', '2021-09-05', 1);

-- --------------------------------------------------------

--
-- Structure de la table `mesures_disc`
--

CREATE TABLE `mesures_disc` (
  `mes_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `designation` varchar(80) NOT NULL,
  `auteur` varchar(80) NOT NULL,
  `date` date NOT NULL,
  `griefs` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mesures_disc`
--

INSERT INTO `mesures_disc` (`mes_id`, `matricule`, `designation`, `auteur`, `date`, `griefs`) VALUES
(3, 12314, 'designation__6__UP', 'auteur__6__UP', '2021-09-04', 'griefs__6__UP'),
(4, 333333333, 'desniationn___6', 'autor____6', '2021-09-10', 'griefs___6'),
(5, 8744, 'desniationn___6', 'autor____6', '2021-09-11', 'ljljlfsdf');

-- --------------------------------------------------------

--
-- Structure de la table `reclamation`
--

CREATE TABLE `reclamation` (
  `rec_id` int(11) NOT NULL,
  `sender` int(80) NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `added_on` date NOT NULL,
  `status` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reclamation`
--

INSERT INTO `reclamation` (`rec_id`, `sender`, `title`, `description`, `added_on`, `status`) VALUES
(14, 8, 'hey title', 'hey from matricule 123 and user_id = 8', '0000-00-00', ''),
(15, 9, 'hey title', 'hey from matricule 456 and user_id = 9', '0000-00-00', ''),
(16, 11, 'G.O.R.E', 'from user_id = 11 ', '0000-00-00', 'vu'),
(17, 8, 'titile', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate e.g., calling very late at night or when one knows the other person is busy with family or work activities. Like e-mail and voicemail and unlike calls in which the caller hopes to speak directly with the recipient, texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '0000-00-00', ''),
(18, 8, 'G.O.R.E', 'wtffffffffffffffffffffffffffffff', '2021-09-27', ''),
(19, 8, 'G.O.R.E', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(20, 8, 'Gungrave', 'fsljflksjflksjfl', '2021-09-27', ''),
(21, 8, 'nowwwwwww', 'nowwwwwwwww', '2021-09-27', 'vu'),
(22, 8, 'Gungrave', 'reclamation from user_id == 8 and name is ziane khaled and matricule 123', '2021-09-27', ''),
(23, 8, 'G.O.R.E', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', ''),
(24, 8, 'Web Developer', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(25, 8, 'medicorps', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(26, 8, '1', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(27, 8, 'title___123', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(28, 8, 'title___123', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu'),
(29, 8, 'title___123', 'Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.', '2021-09-27', 'vu');

-- --------------------------------------------------------

--
-- Structure de la table `revsalairiale`
--

CREATE TABLE `revsalairiale` (
  `rev_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `salaire_initial` decimal(60,0) NOT NULL,
  `salaire_rev` decimal(60,0) NOT NULL,
  `date` date NOT NULL,
  `gain` decimal(10,0) NOT NULL,
  `motif` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `revsalairiale`
--

INSERT INTO `revsalairiale` (`rev_id`, `matricule`, `salaire_initial`, `salaire_rev`, `date`, `gain`, `motif`) VALUES
(6, 12314, '99999', '88888', '2021-09-02', '15', 'motif'),
(7, 333333333, '60000', '300000', '2021-09-14', '33', 'motif____5'),
(8, 2222222, '70000', '80000', '2021-09-08', '30000', 'motif___2_updated'),
(9, 8744, '11321', '1321', '2021-09-04', '0', 'mmmmmmmmmmm');

-- --------------------------------------------------------

--
-- Structure de la table `rgeneraux`
--

CREATE TABLE `rgeneraux` (
  `rg_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `prenom` varchar(80) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `address` varchar(80) NOT NULL,
  `s_famille` varchar(80) NOT NULL,
  `n_enfants` int(80) NOT NULL,
  `ascendant` varchar(80) NOT NULL,
  `date_naissance` date NOT NULL,
  `date_recrutement` date NOT NULL,
  `structure` varchar(80) NOT NULL,
  `region` varchar(80) NOT NULL,
  `diplome` varchar(80) NOT NULL,
  `specialite` varchar(80) NOT NULL,
  `status` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `rgeneraux`
--

INSERT INTO `rgeneraux` (`rg_id`, `matricule`, `prenom`, `nom`, `address`, `s_famille`, `n_enfants`, `ascendant`, `date_naissance`, `date_recrutement`, `structure`, `region`, `diplome`, `specialite`, `status`) VALUES
(135, 11111111, 'mohamed', 'mouzaoui', 'address___1', 'célibataire (C)', 1, 'ascendant a charge__1', '2021-09-17', '2021-09-18', 'structure___1', 'Erenav Alger', 'diplome___1', 'information system', 'on'),
(136, 2222222, 'amar', 'Balla', 'address__2', 'célibataire (C)', 1, 'ascendant a charge__2', '2021-09-11', '2021-09-03', 'structure___2', 'Erenav Oran', 'diplome___2', 'information system', 'on'),
(137, 33333333, 'fouad ', 'Dahak', 'address__2', 'célibataire (C)', 1, 'ascendant a charge__3', '2021-09-11', '2021-09-03', 'structure___3', 'Erenav Bejaia', 'diplome___3', 'information system', 'on'),
(138, 44444444, 'rachid ', 'Challal', 'address__4', 'marié (M)', 1, 'ascendant a charge__4', '2021-09-11', '2021-09-03', 'structure___4', 'Erenav Alger', 'diplome___4', 'information system', 'on'),
(139, 55555555, 'miloud', 'Koudil  ', 'address__5', 'marié (M)', 1, 'ascendant a charge__5', '2021-09-11', '2021-09-03', 'structure___5', 'Erenav Alger', 'diplome___5', 'information system', 'on'),
(140, 66666666, 'abdelsamed', 'Ghoumari ', 'address__6', 'célibataire (C)', 1, 'ascendant a charge__6', '2021-09-11', '2021-09-03', 'structure___6', 'Erenav Bejaia', 'diplome___6', 'information system', 'off'),
(144, 888888, 'Khaled', 'Ziane', 'Algeria, post ain meraine , chlef, 02004', 'séparé (D)', 0, 'kkkk', '2021-09-23', '2021-09-09', 'structure___3', 'Erenav Alger', 'diplome___2', 'system d\'information', 'on'),
(145, 8744, 'Khaled', 'Ziane', 'Algeria, post ain meraine , chlef, 02004', 'divorcé (D)', 0, 'ascendant a charge__1', '2021-09-03', '2021-09-16', 'structure___2', 'Erenav Oran', 'diplome___1', 'information system', 'on'),
(148, 1, 'ziane', 'khaled', 'ainmrene,3', 'divorcé (D)', 4, 'ascendant a charge__1', '2021-09-23', '2021-09-23', 'structure___2', 'Erenav Oran', 'diplome___4', 'information system', 'on'),
(149, 2, 'ziane', 'khaled', 'sdsdsd', 'divorcé (D)', 1, 'aaaaaaa', '2021-09-23', '2021-09-23', 'ssssssss', 'Erenav Alger', 'ddddddddd', 'ssssssssss', 'on'),
(150, 123456789, 'Khaled', 'Ziane', 'Algeria, post ain meraine , chlef, 02004', 'divorcé (D)', 1, 'ascendant a charge__1', '2021-09-03', '2021-09-03', 'structure___1', 'Erenav Oran', 'diplome___4', 'information system', 'on'),
(151, 987654321, 'ppppppp', 'nnnnnnn', 'aaaaaaaa', 'divorcé (D)', 1, 'aaaaaaaaaa', '2021-09-22', '2021-09-22', 'sssssssssss', 'Erenav Oran', 'ddddddddddd', 'ssssssssssss', 'on');

-- --------------------------------------------------------

--
-- Structure de la table `tbl_arab`
--

CREATE TABLE `tbl_arab` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tbl_arab`
--

INSERT INTO `tbl_arab` (`id`, `name`) VALUES
(1, 'undefined'),
(2, 'undefined'),
(3, 'undefined'),
(4, 'khaled'),
(5, '????? ????'),
(6, '????? ????'),
(7, '????? ????'),
(8, '????? ????'),
(9, '????? ????');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `emp_id` int(11) NOT NULL,
  `matricule` int(80) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `prenom` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirmpassword` varchar(255) NOT NULL,
  `added_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`emp_id`, `matricule`, `nom`, `prenom`, `password`, `confirmpassword`, `added_on`) VALUES
(1, 222222222, '', '', '', '', '2021-09-17'),
(3, 123155465, '', '', '$2a$10$DHw1L7pa4jtqpDkmUnv8QeowxtN3u3P7MUtnVO8O3W2pVy1OWT4ri', '$2a$10$DHw1L7pa4jtqpDkmUnv8QeowxtN3u3P7MUtnVO8O3W2pVy1OWT4ri', '2021-09-22'),
(4, 465465465, '', '', '$2a$10$usFlM3bTaHleFWxCgWHVnOT4V1RMOkT5/W47nt.VioyHXzEBz13Ke', '$2a$10$usFlM3bTaHleFWxCgWHVnOT4V1RMOkT5/W47nt.VioyHXzEBz13Ke', '2021-09-22'),
(7, 5555555, '', '', '$2a$10$nfIBq34gofpx8iVlek8XeuCxnaTZxVNytAvnNTf/NveLZMqHZy0fW', '$2a$10$nfIBq34gofpx8iVlek8XeuCxnaTZxVNytAvnNTf/NveLZMqHZy0fW', '2021-09-23'),
(8, 123, 'Ziane__123_123', 'Khaled__123_123', '$2a$10$7eKiDhctgVwUVnmC/GUt3OZHCh1t9xbgJkjn56S83q25pT5k1rfRO', '$2a$10$oU8o.TWc982aGNVVY7bEJeCzXYR4JJdlnLV6oC7Go5J6atOVnbKCG', '2021-09-24'),
(9, 456, 'Ziane__456', 'Khaled__456', '$2a$10$xx0RN3ZzEU3qfB.Y.CKP.O3au1njPUfhE2KmPXHlNGADHfwNUHzWO', '$2a$10$587YPkYfiZcNcsj4.BrSROhTbOcGAFuAMv1Jeb25zyLmGfC/ZsMqa', '2021-09-24'),
(10, 789, '', '', '$2a$10$RcqpEqDWfs72x.vpRa461.J69Zf4WWIrzb6JnL3XDnYtNRA7wPnpq', '$2a$10$RcqpEqDWfs72x.vpRa461.J69Zf4WWIrzb6JnL3XDnYtNRA7wPnpq', '2021-09-24'),
(11, 87444444, 'Ziane', 'Khaled', '$2a$10$/xIjpGarnvZcOa877u/Aze/YJAF8U2iSIcEqpzUdQCaWkYyMveiq6', '$2a$10$mxfitwBxfcyqhqNdtuMqkOpAaBBUXqC2ckZj9XYnMIFQIE39emsc6', '2021-09-24');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Index pour la table `assiduite`
--
ALTER TABLE `assiduite`
  ADD PRIMARY KEY (`ass_id`);

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`doc_id`);

--
-- Index pour la table `evocarriere`
--
ALTER TABLE `evocarriere`
  ADD PRIMARY KEY (`evo_id`);

--
-- Index pour la table `exprofessionnelle`
--
ALTER TABLE `exprofessionnelle`
  ADD PRIMARY KEY (`exp_id`);

--
-- Index pour la table `formationpro`
--
ALTER TABLE `formationpro`
  ADD PRIMARY KEY (`for_id`);

--
-- Index pour la table `gratification`
--
ALTER TABLE `gratification`
  ADD PRIMARY KEY (`gra_id`);

--
-- Index pour la table `mesures_disc`
--
ALTER TABLE `mesures_disc`
  ADD PRIMARY KEY (`mes_id`);

--
-- Index pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`rec_id`);

--
-- Index pour la table `revsalairiale`
--
ALTER TABLE `revsalairiale`
  ADD PRIMARY KEY (`rev_id`);

--
-- Index pour la table `rgeneraux`
--
ALTER TABLE `rgeneraux`
  ADD PRIMARY KEY (`rg_id`);

--
-- Index pour la table `tbl_arab`
--
ALTER TABLE `tbl_arab`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`emp_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `assiduite`
--
ALTER TABLE `assiduite`
  MODIFY `ass_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `doc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `evocarriere`
--
ALTER TABLE `evocarriere`
  MODIFY `evo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `exprofessionnelle`
--
ALTER TABLE `exprofessionnelle`
  MODIFY `exp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT pour la table `formationpro`
--
ALTER TABLE `formationpro`
  MODIFY `for_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `gratification`
--
ALTER TABLE `gratification`
  MODIFY `gra_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `mesures_disc`
--
ALTER TABLE `mesures_disc`
  MODIFY `mes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT pour la table `revsalairiale`
--
ALTER TABLE `revsalairiale`
  MODIFY `rev_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `rgeneraux`
--
ALTER TABLE `rgeneraux`
  MODIFY `rg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
--
-- AUTO_INCREMENT pour la table `tbl_arab`
--
ALTER TABLE `tbl_arab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
