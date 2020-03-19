# Clothing store   
A project in Full-stack Angular using Angular, Node.js, token and MySQL 
has 5 different pages that creates a clothing store,
Login, Register, Home page, Admin page, and Order page.

## Installation
Run the following in your terminal:
C:\Users\yam\Documents\fullstack-s+c
cd project-fullstack
cd project-angular-shop 
for server:
cd server
npm i,
nodemon index
for client:
cd client
npm i
ng s -o
Visit http://localhost:4200 in your browser to see the server running!

## DB Connection with MySql
CREATE TABLE `users` (
  `id` varchar(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `manager` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` VALUES ('123123123','yam','yam@yam.com','1234','Beit dagan','haetrog 9',0),('123456789','admin','admin@admin.com','1234',NULL,'atrog 9',1);

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

INSERT INTO `categories` VALUES (1,'Shirts'),(2,'Dresses'),(3,'Pants'),(4,'Shoes'),(5,'Bags'),(6,'Accessories');

CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `image_url` varchar(3000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id_idx` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

INSERT INTO `item` VALUES (2,'Classic in Orange',1,90,'https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/1280x1280/products/13648/135217/Female-Blusas-Spring-Autumn-Blouse-Office-Lady-Slim-Pink-Shirts-Women-Blouses-Leisure-Long-Sleeve-Plus__49882.1544087736.jpg?c=2?imbypass=on'),(3,'Day-Dress',2,90,'https://sc02.alicdn.com/kf/HTB1pO3aXVzsK1Rjy1Xb760OaFXap/D6220-New-2019-Trendy-Women-Multi-Style.png'),(4,'Cool Jeans',3,150,'https://cdn11.bigcommerce.com/s-q2iopxczc6/images/stencil/2048x2048/products/6167/33124/Women-high-waist-boyfriend-jeans-for-women-mom-jeans-dropshipping-new-spring-Cotton-blue-denim-harem__60032.1573080500.jpg?c=2&imbypass=on'),(5,'High Heels',4,200,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH5EuCS05F3osze6wXnKUeBDgBQBaIFbV49tc6YmkRhZaADn-e'),(6,'Animels Vibe',1,50,'https://i.pinimg.com/564x/8d/4e/e4/8d4ee48aff281c69ba242559633a2f3d.jpg'),(7,'Grean Hand-Bag',5,100,'https://sc02.alicdn.com/kf/HTB1NqULJVXXXXbzXpXXq6xXFXXXj.jpg'),(8,'Eazy Hat',6,50,'https://ae01.alicdn.com/kf/HTB1j4CjX1P2gK0jSZFoq6yuIVXa3/Winter-Baseball-Cap-Women-French-Style-Wool-Baker-s-Boy-Hat-Cap-Cool-Hats-Womens-Baseball.jpg'),(9,'Long Earrings',6,150,'https://cdn.shopify.com/s/files/1/1316/6125/products/Vnox-Paper-Clip-Pin-Shape-Women-Earrings-Link-Chian-Design-Long-Earring-for-women-Stylish-Jewelry_0e44a1d3-7f31-417d-851f-bed19eeed4f1_1200x1200.jpg?v=1571439151'),(11,'Shorts ',3,200,'https://ae01.alicdn.com/kf/HTB1SGDYKXXXXXbeXpXXq6xXFXXXI/High-Waist-Denim-Shorts-Size-XL-Female-Short-Jeans-for-Women-2016-Summer-Ladies-Hot-Shorts.jpg'),(13,'Jenny\'s bag',5,100,'https://clutchtotebags.com/wp-content/uploads/2018/04/The-Circle-Bag-Clutch-Leather-HandBag-Crossbody-Leather-Bags-for-Women-Shoulder-bag-leather-with-circle-handle-zipper-WINE-RED-.jpg'),(14,'Classy me',5,100,'https://www.felice.pl/eng_pl_Womens-crossbody-bag-Felice-IVY-FB41-grey-21951_4.jpg'),(15,'Black Leather ',5,150,'https://ae01.alicdn.com/kf/HTB1ApaHQ6DpK1RjSZFrq6y78VXaz/Fashion-Women-Handbag-pu-Leather-Women-Shoulder-Bags-Famous-Brand-Designer-Women-Bags-Ladies-Casual-sac.jpg_q50.jpg'),(16,'Small And Yummy ',5,70,'https://ae01.alicdn.com/kf/H4404733c152b4552a055e77be33d95e63/Fashion-Small-Square-Bags-For-Women-Genuine-Leather-Shoulder-Crossbody-Bags-2019-New-Luxury-Popular-Designer.jpg'),(17,'Stunner In Blue',5,110,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnKsa70FINUYZZ3LrVN0G6800kY8tF33QbAg-9tfQ5eHWNNybv'),(18,'Supreme',1,40,'https://i.pinimg.com/564x/2f/20/21/2f202183b4a5f5edde1e605e964a6ba0.jpg'),(19,'Thirsty ?',1,40,'https://i.pinimg.com/564x/9f/3b/c3/9f3bc3a49b4abaaa99a11c450fb8f89b.jpg'),(20,'Cray Cray',1,100,'https://i.pinimg.com/564x/74/76/23/7476236a9f0497b24e9d3ca5d4e35e09.jpg'),(21,'Rose',1,40,'https://i.pinimg.com/564x/7b/80/e7/7b80e7932d6f82b04af9143b91ce6d18.jpg'),(22,'Purpel golf',1,40,'https://i.pinimg.com/564x/31/0d/61/310d61c19e7c8b6b21204e79b0e523c5.jpg'),(23,'Brown Pants',3,150,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxNqmMlcJkQml7ocUn6nXEzd036nZp3QmpC1-oH4MOpWoaif8i'),(24,'Tom Boy',3,120,'https://i.pinimg.com/564x/42/2b/9b/422b9b7dca8d05f558a3b1e1f5a0c277.jpg'),(25,'Mom Jeans',3,150,'https://i.pinimg.com/564x/31/d5/cb/31d5cb8a04bd0b0a40dab1534ef7f029.jpg'),(26,'candy\'s shorts',3,50,'https://i.pinimg.com/564x/92/21/7f/92217f3eb31dfea24f53ee0a055a9c01.jpg'),(27,'Summer Love',2,100,'https://i.pinimg.com/564x/2d/9d/d1/2d9dd133fee36d8f81b06c013c258c7f.jpg'),(28,'Training Pants ',3,100,'https://i.pinimg.com/originals/42/c5/e9/42c5e93ad51f5030b4a8febf714a06de.jpg'),(29,'Pink 4 Life',3,100,'https://i.pinimg.com/564x/bc/af/b2/bcafb264034e0bef9e846c0ec7380b01.jpg'),(30,'Formal',2,200,'https://i.pinimg.com/564x/97/ee/0e/97ee0ef9996c006a14d7af06f9011da8.jpg'),(31,'Lovers Dress',2,200,'https://i.pinimg.com/236x/58/00/51/5800515ade423c0b592481118499ceb0.jpg'),(32,'White Flowers',2,200,'https://i.pinimg.com/564x/57/2a/99/572a99fb25b34a7c55ac9d021615c75e.jpg'),(33,'Sunny Outside',2,150,'https://i.pinimg.com/564x/82/93/4d/82934d3ce819ae20766d4b01c389a354.jpg');


CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `costumer_id` varchar(9) NOT NULL,
  `date_of_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_id_idx` (`costumer_id`),
  CONSTRAINT `fk_id` FOREIGN KEY (`costumer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

CREATE TABLE `cart_items` (
  `item_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` double NOT NULL,
  `cart_id` int(11) NOT NULL,
  KEY `fk_item_id_idx` (`item_id`),
  KEY `fk_cart_id_idx` (`cart_id`),
  CONSTRAINT `fk_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `fk_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `shipping_date` date NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `credit` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_id_id_idx` (`cart_id`),
  CONSTRAINT `fk_cart_id_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

# Information
My website contains 5 different pages.
At start, Register to my website and then log in.
The first page contains all items is store by categories and a user cart.
You can add items, delete items and search for a spesific item.
when you are done, press Order to continue into order page.
In order page you can see your final cart items, and fields for order details.
You can search between items in your  cart by typing in the search button.
When you are ready to order, fill the order fields and if the order succeeded, you will see all the items you ordered and get a ticket download option.

## and that will be it, 
# Enjoy !  



