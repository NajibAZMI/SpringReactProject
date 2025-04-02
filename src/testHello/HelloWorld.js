 /*export default function  HelloWorld({name}){
    
    
    return (<div> Hello {name} {age>=18 ? "Adult" : "minor"}</div>)
}*/


import {Component} from "react";
export default class HelloWorld extends Component{
        age=20
        componentDidMount(){
            console.log("Hi From didmonut HelloWorld")
        }

        componentWillUnmount(){
            console.log("Hi from WillUnmount ")
        }

       render(){
           return <h1>Hello World {this.props.name}</h1>         
       }             
}