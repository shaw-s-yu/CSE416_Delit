# CSE416
Tiled Web Version


## Demo: https://real-delit.web.app/


## HOW TO DEPLOY TO FIREBASE
Our front-end is deployed into firebase hosting.

```
 cd into this directory
 npm install -g firebase-tools
 npm run build
 firebase login
 firebase deploy
```

## HOW TO RUN THIS PROJECT 

```
 cd into this directory
 npm install
 npm start
```

## HOW TO SWITCH TO RUN LOCALY

comment switch on src/store/reducers/backendReducer.js line 8 and line 9

## HOW TO DEPLOTY TO HEROKU     
Our back-end is deployed into heroku.
```
 cd server
 git add .
 git commit -m 'better performance'
 git push heroku master
```