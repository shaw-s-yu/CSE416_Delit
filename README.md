# Delit
Tiled Web Version

## Demo: https://delit.herokuapp.com/
you may need to wait a minute to let heroku warm up!


## Local development
### front-end: http://localhost:3000
### back-end: http://localhost:5000

### run front-end
```
cd client
npm start
```

### run back-end
```
npm start
```

### run front-end and back-end concurrently
```
npm run dev
```
## Note
front-end and back-end are deployed to a single domain in heroku,
so https://delit.herokuapp.com/ serves both front-end and back-end.

This is because our server reads client files in /client/build and display then in server...

so the back-end: http://localhost:5000 displays /client/build which is react built files

so if you want your react app works in back-end, run the following command first then it will show in back-end URL (local/deployed)
```
cd client
npm run build
```

## Deploy to Heroku

```
heroku login
git add .
git commit -m 'heroku deployment'
git push heroku master
```
