# MessageBarrage
透過LineBot傳送彈幕至網頁中。

當初看到[這個專案](https://github.com/iammapping/wedding)覺得有趣，想說弄一個Line的版本的彈幕牆，然後就弄了。

# Demo

Use Chrome open https://barrage-deyu.firebaseapp.com/

![Wall picture](https://github.com/DeyuGoGo/MessageBarrage/blob/master/demowall.png?raw=true "teach 2")

Send message to linebot account : @ydx8241f
or scan qrocde below.

![](https://qr-official.line.me/M/cjW6HKQZOh.png)

![Sender picture](https://github.com/DeyuGoGo/MessageBarrage/blob/master/demoline.png?raw=true "teach 2")

# Install
## 1. install firebase tool if you not install yet.
```sh
npm install -g firebase-tools
```
## 2. clone project and install
```sh
git clone https://github.com/DeyuGoGo/MessageBarrage.git
yarn install
```
## 3. Connect your firebase project
1. login your firebase account .
2. then use your project.(if you don't have project go to firebase console create new one : https://console.firebase.google.com/
```sh
firebase login
firebase use --add
```
# Setup
Open src/Config.js change API_REGSITER_TOKEN
```javascript
const EVENT_NAME = "MessageBarrage";//your event name ,should same with messagebarragehook.
const API_REGSITER_TOKEN = "YOUR_FUNCTIONS_URL";// you can find this url in your firebase console in functions tab. url ex : https://us-central1-yourfirebaseproject.cloudfunctions.net/addWebFcmToken
export { EVENT_NAME, API_REGSITER_TOKEN };
```
# Deploy
Deploy firebase hosting and functions.
```sh
yarn deploy
```
# Done
