import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./ball.json";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
    }
    


export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: undefined
    };
  }

  

  componentDidMount() {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => this.setState({ done: true }));
    }, 0);
  }

  render() {
    return (
      <div>
        {this.props.loading ? (
          <FadeIn>
          <div className="d-flex justify-content-center align-items-center">
           
            <Lottie options={defaultOptions} height={720} width={720} />                      
          </div>
        </FadeIn>
        ) : (
          <h1>hello world</h1>
        )}
      </div>
    );
  }
}