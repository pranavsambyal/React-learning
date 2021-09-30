# Steps:
- Init
    - Make package.json file by using [npm init -y]
    - Download dependcies needed 
    - add "type":"modules" in package.json to enable es6 js imports.
- Server.js
    - Main file where our express server will reside.
    - We will attach cors, express.json middleware as we will be sending and reciving json, and specify routes.
- .env
    - Here is the uri of the database 