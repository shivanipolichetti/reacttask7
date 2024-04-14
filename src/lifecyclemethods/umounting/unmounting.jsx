import { isVisible } from "@testing-library/user-event/dist/utils";
import { Component } from "react";

class Unmounting extends Component{
    state={
        isVisible:true
    }
    changeHandler=()=>{
        this.setState(
            {
                isVisible:!this.state.isVisible
            }
        )
    }
    render(){
        return(
            <>
            <h4>Unmount Example</h4>
            <button onClick={this.changeHandler}>Click to remove child</button>
            {
                this.state.isVisible?
                <Child/>
                :
               <h5>No child found</h5>
            }
            </>
        )
    }
}
export default Unmounting;

class Child extends Component{
    componentWillUnmount(){
        alert("child is visible")
    }
    render(){
        return(
            <h5>Child Visible</h5>
        )
    }
}

