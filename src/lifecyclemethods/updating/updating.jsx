

import axios from "axios";
import { Component } from "react";


class Updating extends Component{
    state={
        count:0
    }

    incrementCount=(value)=>{
        this.setState(
            {
                count:this.state.count+value
            }
        )
    }
    decrementCount=()=>{
        if(this.state.count>=0){
        this.setState(
            {
                count:this.state.count-1
            }
        )
    }
    }
    resetCount=()=>{
        this.setState(
            {
                count:0
            }
        )
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate")
        return true
    }
    componentDidUpdate(){
        document.title=`Reactapp ${this.state.count}`
        this.fecthData()
    }
    fecthData=async()=>{
        const result=await axios.get("https://dummyjson.com/products")
    }
    getSnapshotBeforeUpdate(props,state){
        console.log(state)
        return null
    }
    render(){
        return(
            <div>
             <h1>Count Example</h1>
            <h1>{this.state.count}</h1>
            <button onClick={()=>this.incrementCount(1)}>Increment</button>
            <button onClick={()=>this.incrementCount(10)}>Increment by 10</button>
            <button onClick={this.decrementCount}>Decrement</button>
            <button onClick={this.resetCount}>Reset</button>
            
            </div>
        )
    }
}

export default Updating;