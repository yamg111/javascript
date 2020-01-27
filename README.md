# Vacations managment   
A project in Full-stack React using create-react-app, Node.js, express and MySQL 
has two different paths from Login page, one for admin and one for users.
## Installation
Run the following in your terminal:
C:\Users\yam\Documents\fullstack-s+c>
cd project-fullstack
cd server
npm i,
npm start
Visit http://localhost:3000 in your browser to see the server running!

## DB Connection with MySql

CREATE DATABASE vacations_db;

CREATE TABLE users(
username varchar(20)  
f_name varchar(20) not null
l_name varchar(20) not null
password varchar(45) not null
admin TINYINT(1) DEFAULT 0 
primary key(id))

CREATE TABLE vacations(
id varchar(45)  
desteny varchar(45) 
description varchar(100) 
picture varchar(255) 
start date 
ends date 
price int(11) 
added datetime DEFAULT now()
primary key(id)
)

CREATE TABLE followers(
vacation_id varchar(45) not null,
username varchar(20) not null,
foreign key(vacation_id) references vacations(id),
foreign key(username) references users(username)
)

INSERT INTO users(username, f_name, l_name, password, admin)
VALUES("admin", "gal", "levi", "1",1)

#Informtion

My website contains Login page where you can register with a new user or sign in with a one you got,
At start, sign in
Then Login
this will lead you to user page where you can follow new vacations, the ones you follow will show up first.
then clear cookie and login to admin side of the site with:
Username: admin
Password: 1
in admin side, you hava a few options:
*Add button- adding new vacation
*Reports button- showing the amount of followers each vacation have
*Delete logo- deleting a vacation 
*edit logo- editing existing vacation details


##and that will be it, 
#Enjoy ! 