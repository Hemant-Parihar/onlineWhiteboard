# Whiteboard

It is a collaborative real time web-based whiteboard. It can be used for the purpose of teaching.

[Original repository on github](https://github.com/Hemant-Parihar/onlineWhiteboard)

**How to run the code?**

**Step 1:** If you have php Apache server configuration, you can skip this section. If not then you have to follow these steps.

(i) Download XAMPP or similar application.  
(ii) Delete all the file in the folder C:\xampp\htdocs\ and paste all the files there.  
(iii) Run the Apache server.

**Step 2:** You need an IDE, there are many IDE you can use any. But the recommended one is PHPSTROM.

**Step 3:**  You need to download the composer. Composer is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.
For Composer installation you may refer this link.

https://getcomposer.org/doc/00-intro.md

**Step 4:** Go to the folder where you download all the files. Open the terminal. And run this command.  

`composer require cboden/ratchet`

It will download the required file for the “ratchet” library. Ratchet is a loosely coupled PHP library providing developers with tools to create real time, bi-directional applications between clients and servers over Web Sockets.
To know more about it and to learn how to use it you may refer this link.  

http://socketo.me/

**Step 5:** You have everything to run the application. You just need to make sure that your system IP address should be writtin in these two lines.  

In file canvas.js, in line no. 313, put your ip address there.

`let ws = new WebSocket("ws://192.168.43.105:8080/socket");`

In file socket.js, in line no, put your ip address.

`8080, '192.168.43.105'`

**Step 6:** Go to the folder where all the files are present. Open the terminal there and run the command. It will start your server.

`php socket.php`

**Step 7:** Go to the browser and put your ip address. For example: 192.168.43.105/.

**Now enjoying making some drawing.**



 

