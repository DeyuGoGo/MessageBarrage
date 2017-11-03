import React, { Component } from 'react';
import Firebase from './Firebase'
import logo from './logo.svg';
import './App.css';
var o = 0;

class App extends Component {
  constructor(props) {
       super(props);
       this.state = {}
       this.firebase = new Firebase();
       this.firebase.onMessage = this._Post;
   }

   _Post(text){
     var l = document.createElement("p");
     l.type = "text";
     l.innerHTML = text;
     l.style.fontSize = ((Math.random() *50)+10)+"px";
     l.className = "slidein";
     l.style.top = Math.random() * (window.innerHeight-20)+"px";
     l.addEventListener("animationend", (e)=>{
       e.target.remove();
     }, false);
     document.getElementById("hello").appendChild(l);
   }

  componentWillMount(){
  }

  componentDidMount(){
    this.firebase.init();
  }

  render() {
    return (
      <div id="hello" className="App">

      </div>
    );
  }
}

export default App;
