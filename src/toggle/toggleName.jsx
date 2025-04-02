import React from "react";
import HelloWorld from "../testHello/HelloWorld";
export default class ToggleName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: true,
    };
  }

  toggleName= () =>{
    this.setState(prevState => {
      return {
        displayName: !prevState.displayName,
      };
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleName} value={"display"}> Dispaly</button>
        {this.state.displayName === true ?
              <HelloWorld name={"NAJIB"} />
              :
              undefined
        }      
      </div>
    );
  }
}
