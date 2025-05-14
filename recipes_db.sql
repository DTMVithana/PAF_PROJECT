-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: recipes_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `shared` bit(1) NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (21,'anonymous','2025-04-02 13:57:26.025437','A traditional Indian tea infused with spices like cardamom, ginger, cinnamon, and cloves for a warm and soothing flavor - Bawantha','Masala Chai (Spiced Tea)','2025-04-04 10:29:23.957408',_binary '','https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-9-1024x1536.jpg'),(22,'anonymous','2025-04-02 14:00:54.664592','A rich and comforting pasta dish featuring saut├⌐ed mushrooms in a creamy garlic sauce, perfect for weeknight dinners.','Creamy Garlic Mushroom Pasta','2025-04-04 08:07:53.772895',_binary '','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta-4.jpg'),(24,'anonymous','2025-04-02 16:22:08.519549','Description: A flavorful Indian chicken curry cooked with a rich tomato-based gravy, aromatic spices, and fresh herbs. Perfect for pairing with rice or naan.','Masala Chicken Curry','2025-04-02 16:22:08.519549',_binary '\0','https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-2-1-1-1024x1536.jpg');
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_comments`
--

DROP TABLE IF EXISTS `recipe_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_comments` (
  `recipe_id` bigint NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  KEY `FKmd6thn5kqii98pbp26hxci8uj` (`recipe_id`),
  CONSTRAINT `FKmd6thn5kqii98pbp26hxci8uj` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_comments`
--

LOCK TABLES `recipe_comments` WRITE;
/*!40000 ALTER TABLE `recipe_comments` DISABLE KEYS */;
INSERT INTO `recipe_comments` VALUES (21,'hjghgh');
/*!40000 ALTER TABLE `recipe_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_media_urls`
--

DROP TABLE IF EXISTS `recipe_media_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_media_urls` (
  `recipe_id` bigint NOT NULL,
  `media_urls` varchar(255) DEFAULT NULL,
  KEY `FK1k459p8iactp84arrecbwaya6` (`recipe_id`),
  CONSTRAINT `FK1k459p8iactp84arrecbwaya6` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_media_urls`
--

LOCK TABLES `recipe_media_urls` WRITE;
/*!40000 ALTER TABLE `recipe_media_urls` DISABLE KEYS */;
INSERT INTO `recipe_media_urls` VALUES (24,'https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-2-1-1-1024x1536.jpg'),(22,'https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta-4.jpg'),(21,'https://www.thespicehouse.com/cdn/shop/articles/Chai_Masala_Tea_1200x1200.jpg?v=1606936195');
/*!40000 ALTER TABLE `recipe_media_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_steps`
--

DROP TABLE IF EXISTS `recipe_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_steps` (
  `recipe_id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  KEY `FKkolfmsmgn0qbdwymyhrbflm9f` (`recipe_id`),
  CONSTRAINT `FKkolfmsmgn0qbdwymyhrbflm9f` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_steps`
--

LOCK TABLES `recipe_steps` WRITE;
/*!40000 ALTER TABLE `recipe_steps` DISABLE KEYS */;
INSERT INTO `recipe_steps` VALUES (22,'Cook your favorite pasta (like fettuccine) according to package instructions and set aside.','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta-3.jpg'),(22,'Saut├⌐ sliced mushrooms in olive oil and butter until golden brown.','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta1.jpg'),(22,'Add minced garlic and cook for 1ΓÇô2 minutes until fragrant.','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta2.jpg'),(22,'Stir in heavy cream and Parmesan cheese. Let it simmer until thickened.','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta.jpg'),(22,'Toss in the cooked pasta and coat evenly. Garnish with parsley and serve.','https://www.sipandfeast.com/wp-content/uploads/2018/11/creamy-garlic-mushroom-pasta-Pinterest.jpg'),(24,'Marinate Chicken\n\"Mix chicken with yogurt, turmeric, red chili, and salt. Let it rest for 30 minutes.\"','https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-Stovetop-Step-1-768x512.jpg'),(24,'Prepare Masala\n\"Heat oil, saut├⌐ onions, ginger, garlic, and tomatoes until soft. Add garam masala and coriander powder.\"','https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-Stovetop-Step-2-768x512.jpg'),(24,'Cook Chicken\n\"Add marinated chicken to masala. Cook until tender. Add water for gravy.\"','https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-Stovetop-Step-9-12-768x512.jpg'),(24,'Garnish & Serve\n\"Sprinkle with coriander leaves. Serve hot with rice or roti.\"','https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-Stovetop-Step-24-768x512.jpg'),(21,'Boil water with crushed ginger, cardamom, cinnamon, and cloves.','https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Ingredients-1-1-1044x1536.jpg'),(21,'Add black tea leaves and let it steep for 2 minutes.','https://www.teaforturmeric.com/wp-content/uploads/2021/11/How-to-make-masala-chai-1019x1536.jpg'),(21,'Add milk and sugar. Boil for another 2ΓÇô3 minutes.','https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-11-1024x1536.jpg'),(21,'Strain into cups and serve hot.','https://www.teaforturmeric.com/wp-content/uploads/2021/11/Masala-Chai-Tea-3-1024x1536.jpg');
/*!40000 ALTER TABLE `recipe_steps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 16:58:33
