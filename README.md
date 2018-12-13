# Geek-Notes
Notes Web Application

## About:
   A website app that allow a user to add notes after regestration/login to the website, So must be authenticated.   

## User journey:
   In our website you (user) can see his notes after success login.

## Website Link: [Geek-Notes]()

## Site design :

 # Architecture :
  
  - we create **public** folder and put inside its client side files:
     - we create sub folder called **css** and add files:
          - auth.css
          - main.css
          - reset.css
     - we create sub folder called **js** and add files:
       - we create sub folder called **auth** and add files:
          - main.js
          - dom.js
       - we create sub folder called **main** and add files:
          - main.js
          - dom.js
          
      - index.html
      - auth.htnl
      - favicon.ico
      
  - we create **src** folder and put back-end files:
    - we create sub folder called **auth** and add files:
         - auth.js
    - we create sub folder called **server** and add files:
         - server.js
         - router.js
         - handlers.js
    - we create sub folder called **test** and add files:
         - test.js
         - db_test.js
    - we create sub folder called **database** and add files:
        - db_build.js
        - db_build.sql
        - dB_connection.js
        
    - we create other sub folder called **queries** and add:
        - getData.js
        - setData.js
        
   - .gitignore

   
## User Interface : 
   - our website contains two pages, **authentication page** for **regestration** and **login** contains a **title** for authentication state. And the **Notes Page** that shows the user name and notes, also there is **input textbox and insert button to add notes**.

## Team Members:
  - [Muhammad Shareef](https://github.com/mhmdtshref)
  - [AlMutaz Mohtaseb](https://github.com/alMutazBeAllah)
  - [Amin Talahmeh](https://github.com/ameentalahmeh)
