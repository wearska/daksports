-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2015 at 03:30 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `daksports`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `brand_name`) VALUES
(1, 'Puma'),
(2, 'Adidas'),
(3, 'Nike'),
(4, 'Reebok'),
(5, 'Le Coq Sportif'),
(6, 'Givova'),
(7, 'Element'),
(8, 'Kc'),
(9, 'Nofear'),
(10, 'Vans'),
(11, 'Ghost');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
CREATE TABLE IF NOT EXISTS `favourites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(45) NOT NULL,
  `productid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`id`, `userid`, `productid`) VALUES
(2, 'simplelogin:47', 3),
(3, 'simplelogin:47', 4),
(4, 'simplelogin:46', 5),
(5, 'simplelogin:47', 9),
(6, 'simplelogin:46', 14),
(7, 'simplelogin:46', 26),
(11, 'simplelogin:46', 2),
(13, 'simplelogin:45', 3),
(14, 'simplelogin:45', 2),
(15, 'simplelogin:45', 5),
(16, 'simplelogin:45', 4),
(20, 'simplelogin:45', 47),
(21, 'simplelogin:45', 46),
(22, 'simplelogin:47', 29),
(23, 'simplelogin:47', 26),
(24, 'simplelogin:47', 25),
(25, '', 52),
(26, '', 52),
(27, '', 52),
(28, '', 52);

-- --------------------------------------------------------

--
-- Table structure for table `kinds`
--

DROP TABLE IF EXISTS `kinds`;
CREATE TABLE IF NOT EXISTS `kinds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kind` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `kind_UNIQUE` (`kind`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `kinds`
--

INSERT INTO `kinds` (`id`, `kind`) VALUES
(1, 'Accesorii'),
(3, 'Bluza'),
(7, 'Echipament'),
(6, 'Incaltaminte'),
(5, 'Pantaloni'),
(4, 'Trening'),
(2, 'Tricou');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type`) VALUES
(1, 'Sporturi'),
(2, 'Outdoor'),
(3, 'Fitness'),
(4, 'Alergare'),
(5, 'Accesorii');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `subname` varchar(45) NOT NULL,
  `slug` varchar(45) NOT NULL,
  `price` decimal(25,2) unsigned NOT NULL,
  `promo` tinyint(1) NOT NULL DEFAULT '0',
  `promo_price` decimal(25,2) NOT NULL,
  `promo_stock` int(11) NOT NULL DEFAULT '0',
  `promo_end` datetime DEFAULT NULL,
  `excerpt` varchar(80) NOT NULL,
  `description` longtext NOT NULL,
  `inv` int(11) unsigned NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `kind` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  `kind` varchar(45) NOT NULL,
  `tags` longtext,
  `age` int(11) NOT NULL,
  `gender` tinyint(1) DEFAULT '0',
  `colours` longtext,
  `file1` varchar(150) DEFAULT NULL,
  `file2` varchar(150) DEFAULT NULL,
  `file3` varchar(150) DEFAULT NULL,
  `file4` varchar(150) DEFAULT NULL,
  `file5` varchar(150) DEFAULT NULL,
  `added` datetime DEFAULT NULL,
  `favourite` varchar(45) DEFAULT NULL,
  `published` varchar(45) DEFAULT '1',
  PRIMARY KEY (`code`),
  UNIQUE KEY `ID_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=66 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `code`, `name`, `subname`, `slug`, `price`, `promo`, `promo_price`, `promo_stock`, `promo_end`, `excerpt`, `description`, `inv`, `brand`, `type`, `kind`, `type`, `kind`, `tags`, `age`, `gender`, `colours`, `file1`, `file2`, `file3`, `file4`, `file5`, `added`, `favourite`, `published`) VALUES
(18, 'DAKBKG58227', 'Ochelari moto', 'Nofear Glasses', '', '60.33', 0, '0.00', 0, '0000-00-00 00:00:00', 'Lorem ipsum', 'Lorem ipsum dolor sit amet.', 5, 'Nofear', 'Biking', 'Accesorii', 'Outdoor', 'Auto-moto', '', 0, 0, NULL, 'uploads/15/07/nofear-goggles.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:34:00', NULL, '1'),
(29, 'DAKBKG70821', 'Bicicleta', 'Ghost Kato 3', '', '2699.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Bicicleta Ghost Kato 3 Black Red White 2015', 'Bicicleta Ghost Kato 3 Black Red White 2015 este proiectata special pentru distractie alaturi de prieteni ori familie.', 3, 'Ghost', 'Biking', 'Accesorii', 'Outdoor', 'Biking', '', 0, 0, NULL, 'uploads/15/07/bicicleta_ghost.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:34:00', NULL, '1'),
(8, 'DAKBKG80153', 'Cana izoterma', 'Nike Thermal Mug', '', '24.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Ideala pentru mentinerea lichidelor la o temp', 'Ideala pentru mentinerea lichidelor la o temperatura optima, cana izoterma Nike Thermal Mug, de la Nike, se va dovedi aliatul perfect atat in timpul antrenamentelor si a drumetiilor!\n\nMaterialele folosite in crearea acestora ajuta la pastrarea lichidului la o temperatura optima, iar siliconul asigura inchiderea etans a acesteia.\n\nDesignul special si sistemul de inchidere al canii Nike Thermal Mug, de la Nike, impiedica scurgerea lichidului, iar folosirea cauciucului in partea exterioara a acesteia manevrarea cu usurinta a canii, mai ales pe durata antrenamentului, cand este posibil ca palmele sa nu fie perfect uscate.\n\nOrificiul creat pentru a cosnuma lichidul din cana se deschide prin sistemul prevazut in capacul canii, prin rotire.', 32, 'Nike', 'Biking', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/cana-izoterma-unisex-nike-thermal-mug.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:26:25', NULL, '1'),
(16, 'DAKFTB27566', 'Manusi portar', 'Nike Gk Match', '', '99.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Materialul exterior confera aderenta, asigura', 'Realizate dintr-o combinatie ideala de materiale, manusile GK Match, de la Nike, sunt alegerea perfecta daca vrei sa aperi toate golurile pentru echipa ta!\nMaterial: 40% latex, 30% poliuretan, 19% EVA, 11% nylon.\nCuloare: albastru (Blue Lagoon) cu elemente de design verzi, negre, albe.\nManseta Tri-Vario ofera o fixare sigura si o adaptare perfecta la incheietura mainii.\nInteriorul captusit cu un strat de 3 mm de spuma asigura confort la purtare, si amortizarea socurilor la contactul cu mingea.\nMaterialul exterior confera aderenta, asigurand manevrarea usoara a mingii.', 54, 'Nike', 'Fotbal', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/manusi-portar-nike.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(48, 'DAKFTB28222', 'Aparatori', 'Puma evoPower 3', '', '69.99', 1, '49.99', 0, '0000-00-00 00:00:00', 'Redescopera placerea de a juca fotbal cu aparatorile Puma evoPower 3!', 'Redescopera placerea de a juca fotbal! Aparatorile Puma evoPower 3 iti vin in ajutor!\nMaterial: carcasa - 100% polipropilena; interior - 100% spuma EVA.\nCuloare: albastru (Ombre Blue) cu portocaliu (Fluro Peach) si alb.\nAparatorile sunt prevazute cu jambiere confectionate din 100% poliester, al caror rol este de a fixa mai bine glezna.\nLogo-ul Puma este plasat in partea frontala a aparatorilor, fiind o dovada a faptului ca ai ales standardele de calitate ale acestui brand!', 55, 'Puma', 'Fotbal', 'Accesorii', 'Sporturi', 'Fotbal', '', 0, 0, NULL, 'uploads/15/08/48/aparatori-unisex-puma-evopower-3-03047102-13089-1.jpg', 'uploads/15/08/48/aparatori-unisex-puma-evopower-3-03047102-13089-2.jpg', 'uploads/15/08/48/aparatori-unisex-puma-evopower-3-03047102-13089-3.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-08-24 15:06:21', NULL, '1'),
(17, 'DAKFTB31166', 'Minge Adidas', 'Final Wembley Top Mini', '', '39.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Material: 100% poliuretan.', 'Esti un fan inrait al fotbalului si urmaresti cu sufletul la gura campionatele Champions League? Adauga la colectia ta o mini minge special creata dupa  modelul celei folosite la finala de la Wembley din 2013!\nMaterial: 100% poliuretan.\nCuloare: alb cu elemente de design albastre, mov, aurii.\nMingea adidas Final Wembley Top Mini este o replica fidela a celei folosite la marele campionat, ideala pentru colectia oricarui impatimit de fotbal.', 120, 'Adidas', 'Fotbal', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/minge-adidas-wembley-2013.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(3, 'DAKFTB45214', 'Tricou', 'Nike FCB Squad SS PM TOP 2', '', '239.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Acest tricou este special creat pentru terenul', 'Iti place fotbalul? Il practici? Esti fan FC Barca? Daca indeplinesti oricare din aceste trei conditii, tocmai ai gasit tricoul tau preferat.\nMaterial: 100% Poliester.\nCuloare: albastru cu elemente de design rosii si galbene (culorile echipei FC Barcelona).\nDri Fit: o tehnologie folosita in confectionarea materialului tricoului care elimina foarte usor transpiratia si te ajuta sa te mentii uscat si confortabil. Acest lucru este posibil datorita materialului inovativ cu perforatii pe partea din spate, sub axila si in laterala a tricoului care lasa pielea sa respire cat mai bine in timpul purtarii.\nFata tricoului este lucioasa, dintr-un material special cu pori foarte mici care iti vor asigura confortul termic de care ai nevoie pe terenul de fotbal.\nManecile tricoului sunt singurele portiuni opace 100%, din poliester lucios.\nPe spatele tricoului vei gasi inscriptionat imediat sub emblema brandului tau favorit Nike, numele echipei tale favorite de fotbal: Barca. \nAcest tricou este special creat pentru terenul de fotbal, insa un fan adevarat ca tine si-l va dori cu siguranta, chiar daca nu practici fotbal de performanta.\nDaca esti un atlet profesionist, atunci acesta este tricoul ideal pentru tine - tehnologiile folosite in crearea lui bifeaza cele mai inalte standarde calitative, completand echipamentul tau si ajutandu-te sa obtii performantele dorite.', 23, 'Nike', 'Fotbal', 'Tricou', 'Sporturi', 'Fotbal', '', 0, 0, NULL, 'uploads/15/07/01.jpg', 'uploads/15/07/02.jpg', 'uploads/15/07/03.jpg', 'uploads/15/07/04.jpg', 'uploads/15/07/05.jpg', '2015-07-10 15:39:54', NULL, '1'),
(15, 'DAKFTB46308', 'Jambiere fotbal', 'KC PowerCat', '', '19.88', 0, '0.00', 0, '0000-00-00 00:00:00', 'Jambierele KC PowerCat, de la Puma', 'Iti place sa joci fotbal si ai nevoie pentru echipamentul tau de cele mai bune jambiere?\n\nJambierele KC PowerCat, de la Puma, realizate dintr-o combinatie ideala de materiale, sunt cea mai buna alegere pentru confortul tau si imbunatatirea performantei in timpul jocului!\n\nTextura plina a buclelor ofera o amortizare sporita si optimizarea confortului, iar benzile elastice, dispuse circular si pozitionate strategic in partea superioara a acestora, in zona gleznei si a mijlocului piciorului, ofera atat suport, cat si flexibilitate.\n\nForma anatomica a jambierelor KC PowerCat, de la Puma, asigura o potrivire perfecta pe conformatia piciorului, iar mixul de culori puternice un contrastant puternic, care te va face remarcat cu siguranta.\nCuloare: galben solar (nuanta: Team Yellow); elemente de design: albastru (nuanta: Puma Royal)\n\nMaterial: 65% poliester; 25% bumbac; 10% elastan', 65, 'Kc', 'Fotbal', 'Accesorii', 'Sporturi', 'Fotbal', '', 0, 0, NULL, 'uploads/15/07/jambiere-fotbal-puma.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:34:00', NULL, '1'),
(4, 'DAKFTB55034', 'Aparatori', 'Nike Park Guard', '', '49.99', 0, '0.00', 0, '0000-00-00 00:00:00', '70% polipropilena, 20% eva, 5% nailon, 3% pol', 'Atat jucatorii profesionisti cat si cei ocazionali au nevoie de protectie in timpul meciurilor. Aparatorile Nike Park Guard sunt ideale, pentru ca au stratul protector durabil si captuseala interioara foarte comoda. In plus se regleaza perfect pe picior datorita baretelor elastice cu sistem de prindere cu scai.\n\nCuloare: Alb, negru\n\nMaterial: 70% polipropilena, 20% eva, 5% nailon, 3% poliester, 2% spandex', 30, 'Nike', 'Fotbal', 'Accesorii', 'Sporturi', 'Fotbal', '', 0, 0, NULL, 'uploads/15/07/aparatori-nike.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-10 15:43:56', NULL, '1'),
(14, 'DAKFTB72898', 'Ghete de fotbal', 'Puma Universal TT Jr', '', '199.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Forma aerodinamica, specifica ghetelor de fot', 'Micutul tau este pasionat de fotbal? Echipeaza-l corespunzator cu ghetele de fotbal Puma Universal TT Jr.\nMaterial: exterior - piele ecologica; interior - material textil; talpa - cauciuc.\nCuloare: negru cu elemente de design albastre (Fluo Blue) si albe.\nMaterialul exterior este confectionat din piele ecologica de inalta calitate, care asigura durabilitate si aderenta cu mingea in orice punct de contact.\nTalpa confectionata din cauciuc este prevazuta cu crampoane solide, circulare, care confera stabilitate si tractiune pentru o accelerare rapida.\nInteriorul ghetelor este captusit cu material special conceput pentru a asigura ventilatia optima la interior, astfel incat aerul sa poata circula, asigurand confort termic in timpul purtarii.\nForma aerodinamica, specifica ghetelor de fotbal, il vor transforma pe micutul tau in vedeta terenului de fotbal!', 14, 'Puma', 'Fotbal', 'Incaltaminte', '', '', '', 0, 0, NULL, 'uploads/15/07/ghete-fotbal-puma-universal.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(13, 'DAKFTB81579', 'Ghete fotbal', 'Puma v1.10 II i FG', '', '149.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Fibra sintetica folosita in realizarea partii', 'Daca esti un adevarat fan Puma si iti place fotbalul jucat pe teren, ghetele v1.10 II i FG sunt cea mai buna alegere!\n\nCreate pe baza celor mai performante tehnologii, ghetele de fotbal v1.10 II i FG, de la Puma, sunt exact ceea ce ai nevoie pentru a-ti imbunatati performanta pe teren!\n\nConstructia UNI face ca ghetele v1.10 II i FG sa beneficieze de una dintre cele mai revolutionare tehnologii dezvoltate de Puma, care contribuie la amortizarea socurilor exterioare si la protectia acestuia, iar contra tocul din zona calcaiului ofera stabilitate si siguranta in timpul jocului.\n\nMaterialul sintetic, de foarte buna calitate, din microfibra, folosit in realizarea partii exterioare a acestora are avantajul ajustarii perfecte pe forma piciorului si a rezistentei sporite la abraziune datorita texturii speciale a acestuia.\n\nSistemul de inchidere cu clapa exterioara cu textura elastica si sireturi mascate la interior prin intermediul acesteia asigura o fixare optima a piciorului si un confort ridicat in timpul jocului, oferind, de asemenea, o priza buna la minge si posibilitatea cresterii numarului de lovituri ale mingii.\n\nFibra sintetica folosita in realizarea partii mediane si in partile laterale are o structura revolutionara proiectata pe baza unor tratamente speciale impotriva uzarii prin murdarire si a umezelii, avand proprietati impermeabile.\n\nConfiguratia ascutita a crampoanelor faciliteaza contactul cu solul, oferind stabilitate si un nivel optim de tractiune, iar talpa exterioara prezinta alte doua particularitati foarte importante pentru performanta jocului: insertia de fibra de carbon compozit, care are rolul de a repartiza presiunea si de a oferi suplete piciorului, dar si insertia de TPU, pozitionate la mijlocul acestei, care ofera stabilitate si impiedica indoirea acestuia.\n\nIn plus, ghetele de fotbal v1.10 II i FG, de la Puma, sunt prevazute cu o borseta cu maner, ideala pentru depozitarea acestora, pe care o poti primi gratuit la achizitionarea acestora.', 12, 'Puma', 'Fotbal', 'Incaltaminte', '', '', '', 0, 0, NULL, 'uploads/15/07/ghete-fotbal-puma.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(27, 'DAKHDB83360', 'Sosete femei', 'Vans G Basic Canoodle', '', '29.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Create special pentru a fi purtate cu tenisii', 'Create special pentru a fi purtate cu tenisii Vans Lo Pro, sosetele G Basic Canoodle, realizate dintr-o combinatie perfecta de materiale, imbina confortul si elementele stilistice care valorizeaza identitatea brandului Vans intr-un mod cu adevarat original!\n\nConsiderate unul dintre cele mai de succes modele de sosete create de brandul lansat in 1966, sosetele G Basic Canoodle iti ofera confortul si libertatea de miscare de care ai nevoie, oferindu-ti fixare sigura datorita benzii metalice de la marginea superioara a acestora, si cele mai stylish elemente de stil - imprimeul frontal cu tabla de sah si logo-ul Vans, dispus pe laterala exterioara.', 33, 'Vans', 'Handbal', 'Accesorii', 'Sporturi', 'Tenis', '', 0, 0, NULL, 'uploads/15/07/sosete-femei-vans-g-basic-canoodle.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:34:00', NULL, '1'),
(11, 'DAKHKG47644', 'Curea unisex', 'Puma Fundamentals Webbing', '', '69.69', 0, '0.00', 0, '0000-00-00 00:00:00', 'Tinutele tale vor fi completate perfect de ac', 'Realizata 100% din poliester reciclat, cureaua Fundamentals Webbing Belt S, de la Puma, este creata special pentru a oferi o infuzie de culoare tinutelor tale!\n\nPartea frontala este realizata in cea mai frumoasa si stylish nuanta de roz, perfect echilibrata cu interiorul negru intens, iar catarama metalica, pe care apar numele si logo-ul brandului Puma, prezent si pe marginea metalica a curelei, permite adaptarea exacta la marimea taliei.\n\nTinutele tale vor fi completate perfect de acest accesoriu super-trendy!', 56, 'Puma', 'Hiking', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/curea-unisex-puma-fundamentals-webbing.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:26:25', NULL, '1'),
(65, 'DAKHKG49713', 'Ghete', 'Puma Gv Alpine WTR', '', '357.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Bucura-te de confort alaturi de ghetele Puma Gv Alpine', 'Bucura-te de confort alaturi de ghetele Puma Gv Alpine. Acestea au talpa special conceputa pentru a nu aluneca si te vor pastra in siguranta in timpul aventurilor pe munte. Sunt de culoare neagra si sunt confectionate din piele si sintetic la exterior. In partea din fata sunt perforate pentru o buna aerisire.\nCuloare: Negru\nMaterial: Exterior din piele si sintetic, interior textil, talpa din cauciuc', 25, 'Puma', 'Hiking', 'Incaltaminte', 'Outdoor', 'Incaltaminte', 'outdoor, incaltaminte', 0, 0, NULL, 'uploads/15/07/65/ghete-barbati-puma-gv-alpine-wtr-35217506-7003-1.jpg', 'uploads/15/07/65/ghete-barbati-puma-gv-alpine-wtr-35217506-7003-2.jpg', 'uploads/15/07/65/ghete-barbati-puma-gv-alpine-wtr-35217506-7003-3.jpg', 'uploads/15/07/65/ghete-barbati-puma-gv-alpine-wtr-35217506-7003-4.jpg', 'uploads/15/07/65/ghete-barbati-puma-gv-alpine-wtr-35217506-7003-5.jpg', '2015-07-07 16:53:56', NULL, '1'),
(1, 'DAKRUN17780', 'Pantofi sport', 'Adidas ZX-75', '', '368.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Lorem ipsum', 'Lorem ipsum dolor sit amet', 23, 'Adidas', 'Alergare', 'Incaltaminte', 'Alergare', 'Incaltaminte', '', 0, 0, NULL, 'uploads/15/07/adidasi-barbati-adidas-originals-zx-750.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-10 07:53:56', NULL, '1'),
(47, 'DAKRUN28206', 'Jacheta Puma', 'IT evoTRG Light Woven', '', '329.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Puma IT evoTRG Light Woven conceputa special pentru jucatorii ca tine!', 'Puma IT evoTRG Light Woven conceputa special pentru jucatorii ca tine!', 23, 'Puma', 'Alergare', 'Bluza', 'Sporturi', 'Baschet', '', 0, 0, NULL, 'uploads/15/08/47/jacheta-barbati-puma-it-evotrg-light-woven-65439850-13081-1.jpg', 'uploads/15/08/47/jacheta-barbati-puma-it-evotrg-light-woven-65439850-13081-2.jpg', 'uploads/15/08/47/jacheta-barbati-puma-it-evotrg-light-woven-65439850-13081-3.jpg', 'uploads/15/08/47/jacheta-barbati-puma-it-evotrg-light-woven-65439850-13081-4.jpg', 'uploads/placeholder.png', '2015-08-30 11:53:44', NULL, '1'),
(2, 'DAKRUN45023', 'Balerini', 'Puma Ama', '', '139.99', 1, '79.99', 12, '0000-00-00 00:00:00', 'Designul creativ si accesoriile imbina cele doua atribute - sport si stylish.', 'Chiar daca nu iti incepi ziua facand yoga sau nu ai abonament la fitness, te vei indragosti, pur si simplu, de aceasta pereche de balerini, absolut superba, creata special pentru a-ti asigura nu doar confortul si libertatea de miscare, ci o stare de bine pe toata durata zilei.\nSpecialistii Puma au vrut sa imbine toate avantajele unor balerini cu cele ale pantofilor creati special pentru balet si fitness, astfel incat, orice ai alege sa faci, sa te simti absolut minunat!\nPoate ca cel mai mare avantaj al acestor balerini-sport este flexibilitatea talpii, care poate fi pliata in doua si stransa perfect in palma. Imagineaza-ti cata libertate de miscare vei avea si cat de mare va fi confortul tau, oriunde i-ai purta!\nDesignul creativ si accesoriile imbina cele doua atribute - sport si stylish - intr-un mod atat de surprinzator, incat ai senzatia ca au fost special creati pentru a te surprinde.', 40, 'Puma', 'Alergare', 'Incaltaminte', 'Fitness', 'Incaltaminte', 'puma, incaltaminte, balerini, fitness', 0, 0, NULL, 'uploads/15/08/2/balerini-femei-puma-ama-18647104-10809-1.jpg', 'uploads/15/08/2/balerini-femei-puma-ama-18647104-10809-3.jpg', 'uploads/15/08/2/balerini-femei-puma-ama-18647104-10809-4.jpg', 'uploads/15/08/2/balerini-femei-puma-ama-18647104-10809-5.jpg', 'uploads/15/08/2/balerini-femei-puma-ama-18647104-10809-6.jpg', '2015-07-08 13:51:26', NULL, '1'),
(7, 'DAKRUN45814', 'Buzunar', 'Puma Training Arm', '', '39.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Ideal pentru depozitarea obiectelor de mici d', 'Inclus in colectia Puma Faas, buzunarul Puma Training Arm Pocket se va dovedi accesoriul cel mai util al echipamentului tau, indiferent de activitatile sportive desfasurate!\n\nIdeal pentru depozitarea obiectelor de mici dimensiuni, foarte importante si pe care vrei sa le porti cu tine in timpul antrenamentelor, buzunarul Puma Training Arm Pocket, in cele mai trendy si vii culori ale momentului, se va face remarcat cu siguranta, integrandu-se perfect in tinuta ta!\n\nBuzunarul pentru echipamentul de antrenament este prevazut cu o curea reglabila si o capsa metalica, pentru ca tu sa-l poti folosi cu usurinta.', 56, 'Puma', 'Alergare', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/buzunar-training.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:26:25', NULL, '1'),
(10, 'DAKRUN51338', 'Colanti femei', 'Puma Logo', '', '119.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Logo-ul Puma, aplicat in zona inferioara a pi', 'Esti o fire sportiva si iti place sa arati asta prin vestimentatia ta? Colantii Puma Logo iti vor revolutiona ideile despre confort si calitate!\nMaterial: 94% bumbac, 6% elastan.\nCuloare: negru.\nPrevazuti cu bata elastica in talie si cusaturi de sustinere pe toata lungimea piciorului, colantii Puma Logo se adapteaza usor pe orice tip de constitutie.\nMixul de materiale folosit la confectionarea colantilor, asigura elasticitate optima si o purtare durabila.\nLogo-ul Puma, aplicat in zona inferioara a piciorului stang, asigura un look autentic si original, formand un contrast cromatic de efect pentru un design specific brandului.', 23, 'Puma', 'Alergare', 'Pantaloni', '', '', '', 0, 0, NULL, 'uploads/15/07/colanti-femei-puma-logo.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:26:25', NULL, '1'),
(5, 'DAKRUN62773', 'Bustiera', 'Reebok Se Sh', '', '89.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Bustiera este croita dupa modelul Fitted, ast', 'Te antrenezi constant pentru o forma fizica de invidiat? Ai nevoie de un echipament corespunzator, iar bustiera Reebok Se Sh este piesa de rezistenta!\nMaterial: 88% poliester, 12% elastan.\nCuloare: roz cu elemente de design portocalii. \nPlaydry: o tehnologie patentata Reebok, care consta in folosirea unor materiale cu fibre speciale ce absorb transpiratia de pe suprafata pielii, eliminand-o spre exteriorul materialului, ceea ce permite evaporarea rapida si asigura confort termic in timpul purtarii.\nBustiera este croita dupa modelul Fitted, astfel incat sa sustina corespunzator, sa se muleze confortabil pe corp si sa ofere, in acelasi timp, libertate de miscare totala.', 2, 'Reebok', 'Alergare', 'Tricou', 'Alergare', 'Tricou', '', 0, 0, NULL, 'uploads/15/07/bustiera_femei-reebok_se_sh.jpg', 'uploads/15/07/accesoriu-skateboard.jpg', 'uploads/15/07/balerini-puma.jpg', 'uploads/15/07/colanti-femei-puma-logo.jpg', 'uploads/placeholder.png', '2015-07-09 21:43:56', NULL, '1'),
(12, 'DAKRUN68848', 'Geanta', 'Nike Team Training', '', '69.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Culoare: negru cu elemente de design albe.', 'Ai nevoie de o geanta speciala in care sa-ti poti depozita pantofii atunci cand pleci in vacanta sau pur si simplu in drum spre sala? Nike Team Training vine in ajutorul tau.\nMaterial: 100% poliester.\nCuloare: negru cu elemente de design albe.\nFormatul pliat al gentii, cu inchidere pe baza de fermoar, asigura spatiu de depozitare incapator.', 32, 'Nike', 'Alergare', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/geanta-nike-team-training.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(6, 'DAKSKT77639', 'Accesoriu Skateboard', 'Element Phase 3Raw Truck 5.5', '', '102.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Contine atat o banda de prindere cat si surub', 'Daca esti in construirea unei placi complete de skateboard de calitate atunci alege axa Element Phase 3Raw Truck. Contine atat o banda de prindere cat si suruburi de fixare foarte rezistente la presiuni.', 5, 'Element', 'Skate', 'Accesorii', 'Outdoor', 'Skate', '', 0, 0, NULL, 'uploads/15/07/accesoriu-skateboard.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:24:12', NULL, '0'),
(46, 'DAKSKT80947', 'Pantofi skate', 'Reebok Rcf Lite Tr Poly', '', '299.99', 1, '259.99', 10, '2016-04-26 15:00:00', 'Reebok Rcf Lite Tr Poly sunt un must-have al oricarui impatimit de miscare!', 'Imbinand standardul de confort cu un stil cat se poate de cool, pantofii sport Reebok Rcf Lite Tr Poly sunt un must-have al oricarui impatimit de miscare!\nMaterial: exterior - material textil; interior - material textil; talpa - cauciuc.\nCuloare: albastru (Navy) cu elemente de design albe si albastre.\nOrtholite: gratie acestei tehnologii moderne, acesti pantofi sport iti asigura un confort sporit, impiedica aparitia transpiratiei si are agenti antimicrobieni.\nGulerul inalt si captuseala vor transforma fiecare antrenament intr-o adevarata placere.\nPe una dintre partile laterale, pantofii dispun de doua perforatii, lasandu-ti piciorul sa respire in voie.\nTalpa este una speciala, asigurand stabilitatea picioarelor tale indiferent de suprafata pe care mergi.\nDatorita design-ului inedit al pantofilor, te vei bucura de aprecierile celor din jur si de un oufit sport autentic.', 23, 'Reebok', 'Skate', 'Incaltaminte', 'Outdoor', 'Skate', 'patine, skate, reebok, outdoor, urban', 0, 0, NULL, 'uploads/15/08/46/adidasi-barbati-reebok-rcf-lite-tr-poly-v59969-13024-1.jpg', 'uploads/15/08/46/adidasi-barbati-reebok-rcf-lite-tr-poly-v59969-13024-2.jpg', 'uploads/15/08/46/adidasi-barbati-reebok-rcf-lite-tr-poly-v59969-13024-3.jpg', 'uploads/15/08/46/adidasi-barbati-reebok-rcf-lite-tr-poly-v59969-13024-4.jpg', 'uploads/15/08/46/adidasi-barbati-reebok-rcf-lite-tr-poly-v59969-13024-5.jpg', '2015-08-15 19:07:36', NULL, '1'),
(9, 'DAKSWM20080', 'Ceas', 'Puma Top Fluctuation Geants', '', '299.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Modelul Top Fluctuation Geants, de la Puma', 'Esti fan Puma si iti doresti un ceas cu precizie maxima, prin intermediul caruia sa-ti masori performanta de fiecare data?\n\nModelul Top Fluctuation Geants, de la Puma, este exact ceasul de care ai nevoie!\n\nRealizat dintr-o carcasa de plastic si curea de cauciuc, ceasul Top Fluctuation Geants, de la Puma, cu afisaj digital, iti ofera atat confortul, cat si rezistenta in utilizare.\n\nDisplay-ul digital iti permite folosirea cu usurinta a functiilor acestuia si creeaza un contrast placut datorita formei usor bombate a ecranului si a formelor atipice dispuse pe partile laterale, intr-o nuanta intensa de rosu-portocaliu.\n\nCeasul Top Fluctuation Geants, de la Puma, are patru functii importante pentru un stil de viata activ: setarea orei si a calendarului in timp real (cu afisarea orei, a datei si a zilei saptamanii), cu posibilitatea de afisare a patru mesaje specifice; fixarea alarmei, cu posibilitatea de a programare a doua alarme; timer - inclus intre 23:59:59 si zero, cu o functie speciala de autorepetare de pana la 30 ori; cronometrare cu o rezolutie de 1/100 secunde pentru prima ora si o secunda pentru ora succesiva.\n\nSistemul de inchidere a ceasului este prevazut cu o curea si catarama din cauciuc, ceea ce il face confortabil si foarte usor de adaptat formei incheieturii mainii.', 3, 'Puma', 'Swimming', 'Accesorii', 'Outdoor', 'Accesorii', '', 0, 0, NULL, 'uploads/15/07/ceas-suunto.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 11:26:25', NULL, '1'),
(25, 'DAKSWM59976', 'Slapi', 'Puma Epic Flip Caribbean', '', '49.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Baretele realizate din material textil', 'Cauti pentru copilul tau cei mai stylish si confortabili slapi pentru aceasta vara?\n\nCrede-ma, modelul Epic Flip Caribbean Jr, de la Puma, este exact ceea ce cauti!\n\nIndiferent daca este baiat sau fetita, combinatia de culori este absolut irezistibila, iar designul este mai mult decat original si surprinzator!\n\nBaretele realizate din material textil, cu numele brandului, imprimat in zona imbinarii acestora, si designul absolut spectaculos al talpii interioare, te vor convinge sa-i cumperi!', 0, 'Puma', 'Swimming', 'Incaltaminte', '', '', '', 0, 0, NULL, 'uploads/15/07/slapi-copii-puma-epic-flip-caribbean.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(19, 'DAKSWM79676', 'Ochelari unisex', 'Puma Swimming Goggle Regular', '', '59.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Acest model de ochelari legendar Puma, creat ', 'Vrei sa practici sportul tau preferat intr-un echipament cu adevarat profesionist? \nFoloseste acest model de ochelari special creat pentru inot pentru ca tu sa te poti bucura de practicarea sportului tau preferat!\n \n\nAcest model de ochelari legendar Puma, creat in 1996, ofera un confort sporit atat inotatorilor profesionisti, cat si celor care debuteaza in practicarea acestui sport.\n\nAdaptarea perfecta se face nu doar prin intermediul ajustarilor, cu ajutorul cataramelor laterale din plastic, ci si datorita materialului special creat in acest sens.\n\nP.S. Nu mai e nevoie sa-ti spun ca acest model de ochelari se va integra perfect in echipamentul tau profesinist de inot, indiferent de cromatica si designul acestuia, iar tu te vei bucura de o senzatie de claritate aproape perfecta!', 87, 'Puma', 'Swimming', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/ochelari-unisex-puma-swimming-goggle-regular.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(28, 'DAKSWM97143', 'Colanti', 'Puma Gym Color Me Up', '', '199.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Colantii au insertii de fir lycra in material', 'Esti pasionata de sport si petreci mult timp la sala? Ai nevoie de un echipament profesionist, care sa iti exprime in acelasi timp stilul original si inedit: colantii Puma Gym Color Me Up sunt perfecti pentru tine!\nMaterial: 85% poliester, 15% elastan.\nCuloare: mov cu elemente de design roz. \nCell Dry - o tehnologie speciala folosita la confectionarea colantilor, care presupune fante de aerisire si un material special ce permite controlul umiditatii. Cu ajutorul acestei tehnologii, purtarea colantilor ofera un confort termic cu 50% mai ridicat decat in cazul articolelor vestimentare confectionate din clasicul bumbac.\nColantii au insertii de fir lycra in material, pentru lejeritate, suport muscular in timpul antrenamentelor, libertate de miscare si ventilatie.\nBata lata din talie este elastica, conferind o fixare confortabila si adaptare usoara pe orice tip de constitutie.\nCusaturile exterioare creaza contrast cromatic, in timp ce jocurile de culori de pe bata din talie confera un look armonios si inedit in acelasi timp. Intoarce toate privirile atunci cand intri in sala de sport, purtand colantii Puma Gym Color Me Up!', 12, 'Puma', 'Swimming', 'Pantaloni', '', '', '', 0, 0, NULL, 'uploads/15/07/tights-puma.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(26, 'DAKTNS34988', 'Sapca unisex', 'Nike Heritage 86', '', '125.00', 0, '0.00', 0, '0000-00-00 00:00:00', 'Noua sapca de Nike este exact accesoriul pe c', 'Vrei sa fii o aparitie cool , indiferent daca tinuta pe care o adopti este sport-casual sau urbana?\n\nCauti un element stilistic cu care sa-ti accesorizezi tinutele, astfel incat sa te faci remarcat si sa afisezi o atitudine cool ?\n\nCrede-ma, noua sapca de la Nike Heritage86 este exact acel accesoriu pe care il cauti!\n\nNu doar ca te va feri de puterea razelor solare si de efectul expunerii la ultraviolete, dar iti va permite si sa transmiti noua ta atitudine prietenilor si sa-ti exprimi stilul vestimentar unic.\n\nP.S. Echipeaza-te cu cel mai cool si util accesoriu al sezonului!', 32, 'Nike', 'Tenis', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/sapca-unisex-nike-heritage.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(52, 'DAKTNS56462', 'Rochie', 'Adidas W RG OC Dress', '', '269.99', 1, '199.99', 0, '2015-09-24 18:00:00', 'W RG OC Dress, de la adidas, este exact echipamentul pe care il cauti!', 'Esti pasionata de tenis si ti-ai dori sa ai un echipament profesionist la fel ca a marilor campioane care aleg sa poarte adidas?\n\nW RG OC Dress, de la adidas, este exact echipamentul pe care il cauti!\n\nCreata pe baza tehnologiei Climacool, care iti mentine un nivel optim al confortului pielii tale in timpul jocului si ajuta la eliminarea vaporilor de apa, aceasta rochie, creata de adidas, care poarta emblema competitiei internationale de la Roland Garros, are un design foarte feminin si o croiala perfect adaptata miscarilor specifice tenisului.\n\nIar pentru ca tu sa te simti confortabil in timpul jocului, aceasta este prevazuta cu inca doua piese vestimentare foarte importante - o bustiera si o pereche de pantaloni scurti, care se integreaza perfect in tinuta creata impreuna cu rochia, atat din punct de vedere al designului, cat si al cromaticii.\n\nCuloare: bleu-marin si albastru (elemente de design: portocaliu neon, albastru si verde)\n\nMaterial: 100% poliester', 32, 'Adidas', 'Tenis', 'Echipament', 'Sporturi', 'Tenis', '', 0, 0, NULL, 'uploads/15/08/52/rochie-femei-adidas-w-rg-oc-dress-f82008-11182-1.jpg', 'uploads/15/08/52/rochie-femei-adidas-w-rg-oc-dress-f82008-11182-2.jpg', 'uploads/15/08/52/rochie-femei-adidas-w-rg-oc-dress-f82008-11182-3.jpg', 'uploads/15/08/52/rochie-femei-adidas-w-rg-oc-dress-f82008-11182-4.jpg', 'uploads/placeholder.png', '2015-08-30 18:21:50', NULL, '1'),
(20, 'DAKTNS72457', 'Pantaloni scurti', 'Adidas Parma II', '', '79.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Te remarci prin firea ta activa si stilul spo', 'Te remarci prin firea ta activa si stilul sport-casual? Pantalonii scurti adidas Parma II ti se vor potrivi de minune.\nMaterial: 100% poliester.\nCuloare: albastru cu elemente de design albe. \nClimalite: o tehnologie patentata adidas, care presupune un material conceput din fibre speciale care absorb  instant transpiratia de la suprafata pielii, grabind evaporarea acesteia si oferind confort termic in timpul activitatilor fizice solicitante.\nBata elastica din talie este prevazuta cu un snur care se inchide la interior, pentru o fixare comoda si o adaptare usoara pe orice tip de constitutie.\nMaterialul subtire, de buna calitate, asigura o purtare confortabila, fiind lipsit de captuseala, pentru a se preta zilelor toride din sezonul cald.\nDesignul autentic este completat de logo-ul adidas cusut pe partea stanga, o declaratie de stil si originalitate subtila si de efect, in acelasi timp.', 64, 'Adidas', 'Tenis', 'Pantaloni', '', '', '', 0, 0, NULL, 'uploads/15/07/pantaloni-scurti-adidas-parma.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(23, 'DAKTNS77026', 'Sapca', 'Nike Ws Feather Light Visor', '', '89.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Sistemul de prindere eficient permite o fixar', 'Ai nevoie de protectie impotriva soarelui atunci cand practici activitatile tale favorite in aer liber? Fie ca esti pe terenul de tenis ori pe pista de alergare, sapca Nike Ws Feather Light Visor iti va asigura confort, suport si un look autentic.\nMaterial: 100% poliester.\nCuloare: bleu cu elemente de design albe.\nDri-Fit: o tehnologie speciala folosita in confectionarea sepcii, care presupune un material compus din fibre si elemente netratate chimic, care elimina transpiratia, transportand-o catre suprafata materialului, unde se poate evapora rapid. Astfel se elimina senzatia de umezeala a corpului din timpul activitatilor fizice intense.\nSistemul de prindere eficient permite o fixare optima, pentru confort in timpul activitatilor fizice.', 23, 'Nike', 'Tenis', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/sapca-nike-ws-feather-light-visor.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(21, 'DAKTRN11128', 'Pantaloni scurti', 'Puma v-Konstrukt Shorts', '', '49.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Perfecti pentru practicarea oricarui sport!', 'Perfecti pentru practicarea oricarui sport! Pantalonii Puma v-Konstrukt Shorts sunt confectionati din 100% poliester si sunt prevazuti pe parti cu un sistem ingenios de aerisire. Sunt de culoare galbena si au logo Puma imprimat frontal cu negru.', 32, 'Puma', 'Training', 'Pantaloni', '', '', '', 0, 0, NULL, 'uploads/15/07/pantaloni-scurti-puma-vkonstrukt.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(24, 'DAKTRN76239', 'Trening', 'Adidas Sere 14 PES', '', '249.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Atat buzunarele pantalonilor cat si cele ale ', 'Chiar si atunci cand practici sportul tau preferat sau pur si simplu faci miscare, trebuie sa arati bine. Treningul Adidas Sere 14 PES Ã®ndeplineste cu succes aceste conditii! \nMaterial:100% poliester.\nCuloare: pantaloni - negru (cu elemente de design albe); bluza - rosu (cu elemente de design albe pentru inscriptiile brandului si negre Ã®n zona umerilor si a gulerului).\nAtat buzunarele pantalonilor cat si cele ale bluzei sunt prevazute cu fermoare. \nManecile bluzei si pantalonii se termina cu o bata elastica, iar croiul drept al pantalonilor este completat de un fermoar ascuns in partea de jos, pe lateral.\nTreningul Adidas Sere 14 PES se preteaza perfect pe terenul de fotbal, conferindu-ti confortul de care ai nevoie ca sa te poti misca in voie.', 12, 'Adidas', 'Training', 'Trening', '', '', '', 0, 0, NULL, 'uploads/15/07/trening-barbati-adidas-sere-14.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1'),
(22, 'DAKTRN90376', 'Rucsac', 'Adidas OE BP', '', '99.99', 0, '0.00', 0, '0000-00-00 00:00:00', 'Elementele identitare ale Campionatului Mondi', 'Daca esti pasionat de fotbal si ai urmarit Campionatul Mondial organizat in acest an in Brazilia, rucsacul OE BP, de la adidas, va fi cu siguranta prima ta alegere!\n\nSi stii de ce?\n\nRealizat 100% din poliester de cea mai buna calitate, rucsacul OE BP, de la adidas, imbina intr-un mod ideal functionalitatea si elementele identitare ale celui mai important eveniment al anului pentru microbistii din lumea intreaga!\n\nCele doua compartimente interioare, dispuse separat si inchise cu fermoare ascunse, inserate subtil in designul rucsacului, spatiul intern de depozitare, foarte spatios, intaritura foarte rezistenta a acestuia, creata atat pentru sustinerea greutatii, cat si pentru asigurarea confortului, alaturi de spatiul exterior, din plasa, ideal pentru depozitarea recipientelor de lichide, te vor convinge sa incluzi rucsacul OE BP, de la adidas, in echipamentul tau zilnic!\n\nIn plus, datorita celor doua barete foarte rezistente si a manerului de mici dimensiuni, acesta poate fi purtat atat pe spate, cat si pe umar sau in mana.\n\nElementele identitare ale Campionatului Mondial FIFA 2014 foarte frumos inserate in designul rucsacului iti vor aminti de cele mai frumoase experiente si momente din timpul celor mai renumite meciuri ale acestei competitii.', 1, 'Adidas', 'Training', 'Accesorii', '', '', '', 0, 0, NULL, 'uploads/15/07/rucsac-unisex-adidas-oe-bp.jpg', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', 'uploads/placeholder.png', '2015-07-13 14:34:00', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `promos`
--

DROP TABLE IF EXISTS `promos`;
CREATE TABLE IF NOT EXISTS `promos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `productid` int(11) NOT NULL,
  `promo_stock` int(11) DEFAULT NULL,
  `promo_price` int(11) DEFAULT NULL,
  `promo_end` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `kinds`
--

DROP TABLE IF EXISTS `kinds`;
CREATE TABLE IF NOT EXISTS `kinds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kind` varchar(45) NOT NULL,
  `parent_cat` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `kinds`
--

INSERT INTO `kinds` (`id`, `kind`, `parent_cat`) VALUES
(1, 'Fotbal', ''),
(2, 'Tenis', ''),
(3, 'Volei', ''),
(4, 'Baschet', ''),
(5, 'Handbal', ''),
(6, 'Biking', ''),
(7, 'Ski', ''),
(8, 'Auto-moto', ''),
(9, 'Kayak', ''),
(20, 'Skate', ''),
(21, 'Accesorii', ''),
(22, 'Incaltaminte', '');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `short` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `type_UNIQUE` (`type`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type`, `short`) VALUES
(1, 'Fotbal', 'FTB'),
(2, 'Tenis', 'TNS'),
(3, 'Handbal', 'HDB'),
(4, 'Baschet', 'BSC'),
(5, 'Hiking', 'HKG'),
(6, 'Skiing', 'SKI'),
(7, 'Alergare', 'RUN'),
(16, 'Skate', 'SKT'),
(17, 'Biking', 'BKG'),
(18, 'Swimming', 'SWM'),
(19, 'Training', 'TRN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `uid` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `created` datetime NOT NULL,
  `address` varchar(200) NOT NULL,
  `billing_address` varchar(200) NOT NULL,
  `delivery_address` varchar(200) NOT NULL,
  `user_photo` varchar(150) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `ID_UNIQUE` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `first_name`, `last_name`, `created`, `address`, `billing_address`, `delivery_address`, `user_photo`, `admin`) VALUES
('simplelogin:45', '', 'monodnb@gmail.com', 'Ionut', 'Achim', '2015-08-22 08:41:06', '', '', '', 'uploads/userpics/monodnb@gmail.com/profile.jpg', 1),
('simplelogin:46', '', 'ninja.record@gmail.com', 'Elena', 'Achim', '2015-08-22 08:43:01', '', '', '', 'uploads/userpics/ninja.record@gmail.com/ninja.jpg', 0),
('simplelogin:47', '', 'andrei.bogdanel.achim@gmail.com', 'Andrei', 'Achim', '2015-08-22 08:45:10', '', '', '', 'uploads/userpics/andrei.bogdanel.achim@gmail.com/billy.jpg', 0),
('simplelogin:48', '', 'maria.achim62@gmail.com', 'Maria', 'Achim', '2015-08-22 08:46:35', '', '', '', 'uploads/userpics/maria.achim62@gmail.com/mamitia.jpg', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
