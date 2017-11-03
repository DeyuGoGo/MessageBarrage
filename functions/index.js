const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
exports.addWebFcmToken = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
     console.log("addWebFcmToken " + "uid = " + req.body.uid +  " token: " + req.body.token);
     var tokens = db.collection('event/'+req.body.uid+'/tokens');
     tokens.where("token", "==", req.body.token).get()
    .then(function(querySnapshot) {
      if(!querySnapshot.empty){
        res.end("Already has token");
        return;
      };
      tokens.add({token: req.body.token});
      res.end("Already add token");
      return ;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        res.end("Has error :  " + error);
    });

   });
});

exports.getTokens = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log("getTokens");
    db.collection('event/'+req.body.uid+'/tokens')
    .get()
    .then((snapshot) => {
      tokens = [];
      snapshot.forEach((doc) => {
        tokens.push(doc.data().token);
      });
      response = {
        uid:req.body.uid,
        tokens:tokens
      };
      res.end(JSON.stringify(response));
    })
    .catch(err=> {
      res.end(JSON.stringify(err));
      console.log('Error getting documents', err);
    });
  });
});
