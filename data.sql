-- MySQL dump 10.14  Distrib 5.5.56-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: automatic
-- ------------------------------------------------------
-- Server version	5.5.56-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sys_auth`
--

LOCK TABLES `sys_auth` WRITE;
/*!40000 ALTER TABLE `sys_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,'/',0,'',0,NULL,'2017-11-10 11:29:07'),(2,'用户管理',1,'',0,NULL,'2017-11-10 11:30:44'),(3,'角色管理',1,'',0,NULL,'2017-11-10 11:30:51'),(4,'权限管理',1,'',0,NULL,'2017-11-10 11:31:08'),(5,'菜单管理',1,'',0,NULL,'2017-11-10 11:31:21'),(21,'添加用户',2,'',21,'adduser','2017-11-10 11:32:43'),(22,'删除用户',2,'',22,'deluser','2017-11-10 11:32:58'),(31,'添加角色',3,'',31,'addrole','2017-11-10 11:33:41'),(32,'删除角色',3,'',32,'delrole','2017-11-10 11:33:52'),(33,'分配权限',3,'',33,'alloc_auth','2017-11-10 11:34:22'),(41,'添加权限',4,'',41,NULL,'2017-11-10 11:34:46'),(42,'删除权限',4,'',42,NULL,'2017-11-10 11:34:58'),(51,'添加菜单',5,'',51,'Add_Menu','2017-11-10 11:36:06'),(52,'删除菜单',5,'',52,'Del_Menu','2017-11-10 11:36:17'),(53,'编辑菜单',5,'',53,NULL,'2017-11-10 11:36:28'),(79,'运维管理',2,NULL,NULL,NULL,'2017-11-13 20:44:38');
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sys_role_auth`
--

LOCK TABLES `sys_role_auth` WRITE;
/*!40000 ALTER TABLE `sys_role_auth` DISABLE KEYS */;
INSERT INTO `sys_role_auth` VALUES (1,3,'2,21,22,79,3,31'),(3,12,'94,95'),(4,22,'2,21,22,79');
/*!40000 ALTER TABLE `sys_role_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','21232f297a57a5a743894a0e4a801fc3','admin@local.net',1,'2017-11-02 21:55:41'),(61,'test1','test1','e10adc3949ba59abbe56e057f20f883e','test1@qq.com',1,'2017-11-03 12:37:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-16 13:52:11
