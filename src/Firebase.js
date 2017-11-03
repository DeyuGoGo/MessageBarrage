/*global firebase*/
import {EVENT_NAME,API_REGSITER_TOKEN} from './Config'
export default class Firebase{
  constructor(){
    this.messaging = firebase.messaging();
  }
  init(){
    this.messaging.requestPermission()
    .then(() =>{
      console.log('Notification permission granted.');
      this._registerTokenToServer();
    })
    .catch(err=> {
      console.log('Unable to get permission to notify.', err);
    });
    this.messaging.onTokenRefresh(()=> {
      this._registerTokenToServer();
    });
    this.messaging.onMessage( payload => {
      console.log("Message received. ", payload);
      this.onMessage(payload.data.message);
    });
  }
  _registerTokenToServer(){
    console.log(this);
    this.messaging.getToken()
    .then(token=> {
      console.log("Token : " + token);
      this.setTokenSentToServer(false);
      this.sendTokenToServer(token);
    })
    .catch(err=>{
      console.log('Unable to retrieve refreshed token ', err);
    });
  }

  sendTokenToServer(currentToken) {
   if (!this.isTokenSentToServer()) {
     console.log('Sending token to server...');
     this.sendTokenToServerFunction(currentToken).then(resolve=>{
       console.log('Sending token to server success');
       this.setTokenSentToServer(true);
     }).catch(error=>{
       console.log('Sending token to server fail');
       this.setTokenSentToServer(false);
     })
   } else {
     console.log('Token already sent to server so won\'t send it again ' +
         'unless it changes');
   }
 }
  isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
  }
  setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
  }
  sendTokenToServerFunction(token){
    return new Promise((resolve,reject)=>{
      fetch(API_REGSITER_TOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: EVENT_NAME,
          token: token
        })
      }).then(response => {
        console.log(response);
        resolve(response);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }
}
