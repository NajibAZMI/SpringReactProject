import { useEffect, useState } from "react"

export default function Counter({initialValue=0,incrementBy=1}){
     const [count,setCount]=useState(initialValue)
     const [age,setAge]=useState(0)
     const handleClick =() =>{setCount(prevState=>{return prevState+incrementBy})}
     const handleReset =() =>{setCount(initialValue)}
     
     useEffect(()=>{
         console.log("Hi From ComponentDidMount")
     },[])

     useEffect(()=>{
      console.log("Age Changed")
     },[age])
     
     return <div>
      <span>
         Il y a {count} secondes
         <button onClick={handleClick}>Increment</button>
         <button onClick={handleReset}>Reset</button>
        </span>
        </div>}

/*import React from "react";
export default class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state={counter:0}
    console.log("Hi from Construtor")
  }

  handleClick=()=>{
    this.setState(prevState=>{
      return {counter:prevState.counter+1}
    })
  }

  handleReset=()=>{
    this.setState(prevState=>{
      return {counter:0}
    })
  }

  componentDidMount(){
    console.log("Hi from didMount !")
  }

  componentDidUpdate(prevProps,prevState){
    console.log("Hi from DidUpdate")
    console.log(prevState ,this.state)
  }

  componentWillUnmount(){
    console.log("Hi From omponentWillUnmount!!")
  }

  render(){
    console.log("Hi from Render !")
    return <div>
    <span>
       Il y a {this.state.counter} secondes
       <button onClick={this.handleClick}>Increment</button>
       <button onClick={this.handleReset}>Reset</button>
      </span>
      </div>
  }

}*/











/*import { Component } from "react";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, date: undefined };
  }
  handleClick=()=>{
    this.setState((prevState) => {
      console.log(prevState);
      return { counter: prevState.counter + 1 };
    });
  }
  render() {
    return <div onClick={this.handleClick}>Counter is {this.state.counter}</div>;
  }
}*/
