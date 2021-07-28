import React, { Component } from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import './Style.scss'
import db from '../firestore';
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class Main extends Component {
render() {
    return (

      
      <div className="container-fluid ">
      <br></br>
      &nbsp;
      <br></br>
        <div className="row">
          <div className="col-md-8">
          <h3><b>{this.props.currentTitle}</b></h3>
            <div className="embed-responsive embed-responsive-16by9" style={{  minWidth: 460, maxWidth:960, height: 'auto'}}>
             <video 
             
             src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
           

             autoPlay="autoPlay"  
             controls
             controlsList="nodownload"
             
             >
            
             </video>
            </div>
            <p> {this.props.view} Views - {this.props.date}</p> 

            
          </div>


          <div className="col-md-4 row-md-1 overflow-auto text-center " style={{ maxHeight: '768px', width: '675px' }}>
       
            
            &nbsp;
            <form onSubmit={(event) => {
             
   event.preventDefault()
            // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

            
           }

           } >


<button type="submit" id="myBtn" className="myBtun">Share a Video</button>

<div id="myModal" className="modal">


  <div className="modal-content">
    <span className="close">&times;</span>
    <h5><b>Share a Video</b></h5>

            <form onSubmit={(event) => {
             
              event.preventDefault()
              const title = this.videoTitle.value
              
              this.props.uploadVideo(title)
             
            }} >
              &nbsp;

              
              <div>
 
                <input type='file' id="upload" accept=".mp4, .mkv, .ogg, .wmv, .mov, .m4v"
               onChange={this.props.captureFile} style={{width: '350px'}} required/>
               {}

               </div>

               &nbsp;

              <div className="form-group mr-sm-2">
                <input 
                id="videoTitle"
                type="text"
                className="form-control-sm"
                placeholder="Title..."
                ref={(input) => {this.videoTitle = input}}
                
                required/>

              </div>
              
           <button type="submit" className="btn draw-border">Upload Video</button>
           
            </form>
  </div>

</div>

</form>

&nbsp;    


            <h3><b>Search</b></h3>


            <form onSubmit={(event) => {
             
              event.preventDefault()
              this.props.search(document.getElementById("search").value)
              
              this.props.changeVideo(this.props.currentHash,
              this.props.currentTitle)

             
            }

            } >

            <div className="form-group mr-sm-2">
                <input 
                id="search"
                type="text"
                className="form-control-sm"
                placeholder="Search Here..."
              
             
                required/>

                
&nbsp;


<button type="submit" className="btn draw-border">Search</button>


{this.props.result

?

<h3><b>Result</b></h3>
: 
<h3><b><i></i></b></h3>

  }
                {this.props.searched.map((video, key) => {

                return(

                  

                  <mobiscroll.Card
                    theme="material" 
                    themeVariant="light"
                    style={{zIndex:0}}
                >
                  <p onClick={() => this.props.changeVideo(video.hash, video.title) && this.props.update(video.hash)}>
                     <video 
                  src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                  onMouseOver={event => event.target.play()}
                  onMouseOut={event => event.target.pause()}

                   muted

                  />

                </p>
                  
                    <mobiscroll.CardHeader>
          <mobiscroll.CardTitle> <small className="text-black"><b>{video.title}</b></small></mobiscroll.CardTitle>
                    </mobiscroll.CardHeader>
                    <mobiscroll.CardFooter>
                        <button onClick={() => this.props.changeVideo(video.hash, video.title) && this.props.update(video.hash)} className="mbsc-btn-flat">Play</button>
            
                    </mobiscroll.CardFooter>
                   
                </mobiscroll.Card>
                )
            })}
                </div>

                </form>
                
           
            <h3><b>Posts</b></h3>
           
            {this.props.videos.map((video, key) => {

                return(

             
                <mobiscroll.Card
                    theme="material" 
                    themeVariant="light"
                    style={{zIndex:0}}
                >
                  <p onClick={() => this.props.changeVideo(video.hash, video.title) && this.props.update(video.hash)}>
                     <video 
                  src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                  onMouseOver={event => event.target.play()}
                  onMouseOut={event => event.target.pause()}

                   muted

                  />

                </p>
                  
                    <mobiscroll.CardHeader>
          <mobiscroll.CardTitle> <small className="text-black"><b>{video.title}</b></small></mobiscroll.CardTitle>
                    </mobiscroll.CardHeader>
                    <mobiscroll.CardFooter>
                        <button onClick={() => this.props.changeVideo(video.hash, video.title) && this.props.update(video.hash)} className="mbsc-btn-flat">Play</button>
            
                    </mobiscroll.CardFooter>
                   
                </mobiscroll.Card>

                
                
                
       
     
                )
            })}
      </div>
      </div>
      
      </div>

      

      
    );

          }}
          
export default Main;
             