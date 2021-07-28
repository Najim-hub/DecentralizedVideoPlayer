import React, { Component,useState,useEffect } from 'react';
import DVideo from '../abis/FairyTube.json'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.scss';
import Loading from "./loading.js";
import db from '../firestore';
import "bootstrap/dist/css/bootstrap.css";
import moment from 'react-moment';
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core/styles';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class App extends Component {
//Firebase storage
async componentDidMount(){
  await this.Fetchdata()
}

  async componentWillMount() {
    
    await this.Fetchdata()
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  
  }

  async Fetchdata() {

    await db.collection("Blocked").get().then((querySnapshot) => {
         
        querySnapshot.forEach(element => {
            var data =  element.data();
             
            this.setState({check:[...this.state.check, data.Hash]
              
            })

        });

     
    })


    await db.collection("Uploads").get().then((querySnapshot) => {
         
      querySnapshot.forEach(element => {
          var data =  element.data();
           
          this.setState({info:[...this.state.info, data]})

          this.setState({dates:[...this.state.dates, data]})
          

      });

  })
  

  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)

    
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }



  async loadBlockchainData() {
    const web3 = window.web3
    //Load accounts
    const accounts = await web3.eth.getAccounts()
 
    this.setState({account: accounts[0]})
    //Add first account the the state

    //Get network ID
    const networkId = await web3.eth.net.getId()
    
    const networkData = DVideo.networks[networkId]
    
   
    if(networkData) {
      const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)

      this.setState({dvideo})


      const videosCount = await dvideo.methods.videoCount().call()

     
      this.setState({videosCount})


     
//load videos, sort by newest 
db.collection("Blocked").get().then((querySnapshot) => {
         
  // Loop through the data and store
  // it in array to display
  querySnapshot.forEach(element => {
      var data = element.data();
       
      this.setState({check:[...this.state.check, data.Hash]
        
      })

  });})

var c = 0;
const m = 0;

for (var i=videosCount; i>=1; i--){
  
const video = await dvideo.methods.videos(i).call()

if (this.state.check.includes(video.hash) == false){
  this.setState({

    videos:[...this.state.videos, video]
 
   })
  
}

}

//set latest video with title to view as a default
const latest = this.state.videos[0]
this.setState({
  currentHash: "QmboVZcFioQEkbjkMjNkD4hZpP2BVpeUFynWRsSxfhiTqt",
  currentTitle: "Intro" 
})
const cityRefree = db.collection('Uploads').doc("QmboVZcFioQEkbjkMjNkD4hZpP2BVpeUFynWRsSxfhiTqt")

const res = cityRefree.update({ViewCount: firebase.firestore.FieldValue.increment(1)}).catch((error) => {
 
});;


for (var i=0; i<this.state.info.length; i++){
  
  if (this.state.info[i].Hash == "QmboVZcFioQEkbjkMjNkD4hZpP2BVpeUFynWRsSxfhiTqt"){

    this.setState({'views': this.state.info[i].ViewCount})

  }

  else{
    this.setState({'views': 0})
    this.setState({'videoDate': null})
  }
  
  }


for (var i=0; i<this.state.dates.length; i++){

  if (this.state.dates[i].Hash == this.state.currentHash){
    this.setState({
  
      videoDate: this.state.dates[i].Date
   
     })


  }
  
  }



this.setState({loading: false})

    }
    else{

   window.alert('FairyTube Contract not deployed to detected network.')

    }
  }

 

  //Change Video
  changeVideo = (hash, title) => 
   {


    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});

  
    const cityRef = db.collection('Uploads').doc(hash.toString())

    if(hash != this.state.currentHash){
    const res = cityRef.update({ViewCount: firebase.firestore.FieldValue.increment(1)}).catch((error) => {
    });;

   
    for (var i=0; i<this.state.dates.length; i++){

      if (this.state.dates[i].Hash == hash){
        this.setState({
      
          videoDate: this.state.dates[i].Date
       
         })
    
        
      }
      
      }

  

    for (var i=0; i<this.state.info.length; i++){
  
      if (this.state.info[i].Hash == hash){

        
        this.setState({'views': this.state.info[i].ViewCount})
        
     
      }

     
    }
      
    const test = db
    .collection("Uploads")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if(doc.data().ViewCount != 1 &&  doc.data().Hash == hash.toString()){
         

          for (var i=0; i<this.state.info.length; i++){
  
            if (this.state.info[i].Hash == hash){
      
             
              this.state.info[i].ViewCount = doc.data().ViewCount
              
      
            }
          }


          this.setState({'views': doc.data().ViewCount})

          }
          
        });
      }
    })
    .catch((error) => {
      console.log("error");
    });
   
  }
      }

  //Get video
  captureFile = event => {
    event.preventDefault()

    if (event.target.files[0] != undefined){
    if(event.target.files[0].size > 100296616){
      alert("File is too large, must be below 100MB, try splitting video");
      this.value = "";
      window.location.reload(false);
   }
    else{
    const file = event.target.files[0]
  
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
      console.log('buffer', this.state.buffer)

    }

  }}
  else{
    return
  }

    

  }

searchVideo = search =>{
   
this.setState({something: search.toString()})

let data = [ { title:"" , hash:""}];

data = this.state.videos.filter(function(item){
   return item.title.toLowerCase().includes(search.toString().toLowerCase());
}).map(function({title, hash}){
    return {title, hash};
});



this.setState({'searched': data})

if(data != undefined){

  this.setState({'result' : true});

}
else{
  this.setState({'result' : false});
}


if (data.title != undefined && data.hash != undefined){

  this.setState({'currentHash': data.hash});
  this.setState({'currentTitle': data.title});

  
}



  }
  
  //Upload video
  uploadVideo = title => {
    console.log("Uploading video...")

    this.setState({loading:true})

    
    ipfs.add(this.state.buffer, (error, result) =>{

        
      if(error){
        console.error(error)
        
        return
      }

      this.setState({loading: false})

      this.state.dvideo.methods.uploadVideo(result[0].hash, title).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading: false})

      var date = new Date().toLocaleString("en-US", { month: "long" ,  day : '2-digit' , year:"numeric"})

      const data = {
        Hash: result[0].hash.toString(),
        Title: title.toString(),
        Author: this.state.account,
        ViewCount: 0,
        Date: date
      };
      
     
      const res =  db.collection('Uploads').doc(result[0].hash).set(data);

     
     
      })

    })
  }

  

 
  constructor(props) {
    super(props)
    this.state = {
    buffer: null,
    account:'',
    dvideo: null,
    videos:[],
    loading: true,
    currentHash: null,
    currentTitle: null,
    searched: [],
    something:'',
    result:false,
    check: [],
    views: null,
    info: [],
    dates: [],
    videoDate: null
    
    }

    //Bind functions
  }


  componentDidMount() {
   
    setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => this.setState({ done: true }));
    }, 1200);
    }

  render() {
   
    return (
      <div>
        <Navbar 
          //Account
              account = {this.state.account}
              videos={this.state.videos}
              changeVideo={this.changeVideo}
              currentHash={this.state.currentHash}
              currentTitle={this.state.currentTitle}

        />
        {this.state.loading

          ?
          <Loading 
          
          type={"bars"} color={"white"}
          loading={this.state.loading}
          
          />

          : <Main
              //states&functions
              videos={this.state.videos}
              uploadVideo={this.uploadVideo}
              captureFile={this.captureFile}
              changeVideo={this.changeVideo}
              currentHash={this.state.currentHash}
              currentTitle={this.state.currentTitle}
              loading={this.state.loading}
              search={this.searchVideo}
              searched={this.state.searched}
              result={this.state.result}
              Read={this.Read}
              view={this.state.views}
              date={this.state.videoDate}
            />
        }
      </div>
    );
  }
}

export default App;