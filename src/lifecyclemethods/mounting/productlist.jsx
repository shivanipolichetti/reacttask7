import { Component } from "react";
import "./index.css";
import axios from "axios";

class ProductList extends Component{
    state={
        products:[]
    }
    componentDidMount(){
        this.fetchData()

    }
    deletecard=(index)=>{
        console.log(index);
        const newCard=this.state.products.filter((eachObject,i)=>i!==index)
        this.setState(
            {
                products:newCard
            }
        )

    }
    fetchData=async()=>{
        /*let result=await fetch("https://dummyjson.com/products");
        let result1=await result.json()
        console.log(result1)*/
         const result=await axios.get("https://dummyjson.com/products")
         console.log(result);
         this.setState(
            {
                products:result.data.products
            }
         )
    }
    render(){
        return(
            <>
            <h4>ProductList</h4>
            {
              this.state.products.length>0
              ?
              <div className="products">
              {
                this.state.products.map((eachObject,index)=>{
                    const {title,description,thumbnail,category,price}=eachObject
                    return(
                        <div className="cards">
                        <h4>{title}</h4>
                        <img src={thumbnail} alt={title} width={70}></img>
                        <h4>{description}</h4>
                        <h4>{category}</h4>
                        <h4>${price}</h4>
                        <button onClick={()=>this.deletecard(index)}>delete</button>
                        </div>
                    )
                })
              }
              </div>
              :
              <h4>Loading....</h4>
            }
            </>
        )
    }
}
export default ProductList;