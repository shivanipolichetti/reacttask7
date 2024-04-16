import { Component } from "react";
import "./index.css";
import axios from "axios";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      total: 0,
      products: [],
      originalProducts: [],
      favoriteColor: "green"
    };
  }

  lowtoHigh = () => {
    const result = [...this.state.products].sort((a, b) => a.price - b.price);
    this.setState({
      products: result
    });
  };

  hightoLow = () => {
    const result = [...this.state.products].sort((a, b) => a.price - b.price).reverse();
    this.setState({
      products: result
    });
  };

  range0To500 = () => {
    const result = this.state.originalProducts.filter((eachObject) => eachObject.price >= 0 && eachObject.price < 500);
    this.setState({
      products: result
    });
  };

  range500To1000 = () => {
    const result = this.state.originalProducts.filter((eachObject) => eachObject.price >= 500 && eachObject.price < 1000 );
    this.setState({
      products: result
    });
  };

  range1000To1500 = () => {
    const result = this.state.originalProducts.filter((eachObject) => eachObject.price >= 1000 && eachObject.price < 1500);
    this.setState({
      products: result
    });
  };

  incrementCount = () => {
    this.setState(
      (prevState) => ({
        count: prevState.count + 1
      }),
      () => {
        this.calculateTotalPrice();
      }
    );
  };

  decrementCount = () => {
    if (this.state.count > 0) {
      this.setState(
        (prevState) => ({
          count: prevState.count - 1
        }),
        () => {
          this.calculateTotalPrice();
        }
      );
    }
  };

  calculateTotalPrice = () => {
    const totalPrice = this.state.products.reduce(
      (total, product) => total + product.price,
      0
    );
    this.setState({ total: totalPrice });
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchData();
  }

  fetchData = async () => {
    const result = await axios.get("https://dummyjson.com/products");
    console.log(result);
    this.setState({
      products: result.data.products,
      originalProducts: result.data.products // Store original products
    });
  };

  static getDerivedStateFromProps(props, state) {
    return { favoriteColor: props.favcol };
  }

  render() {
    console.log("render");
    return (
      <>
        <h3 style={{ color: this.state.favoriteColor }}>ProductList</h3>
        <button onClick={this.lowtoHigh}>low to high</button>
        <button onClick={this.hightoLow}>high to low</button>
        <button onClick={this.range0To500}>Range 0 to 500</button>
        <button onClick={this.range500To1000}>Range 500 to 1000</button>
        <button onClick={this.range1000To1500}>Range 1000 to 1500</button>
        {this.state.products.length > 0 ? (
          <div className="products">
            {this.state.products.map((eachObject, index) => {
              const { title, description, thumbnail, category, price, id } = eachObject;
              return (
                <div className="cards" key={id}>
                  <h4>{title}</h4>
                  <img src={thumbnail} alt={title} width={70} />
                  <h4>{description}</h4>
                  <h4>{category}</h4>
                  <h4>${price}</h4>
                  <p>
                    <button onClick={this.decrementCount}>-</button>
                    <span>{this.state.count}</span>
                    <button onClick={this.incrementCount}>+</button>
                  </p>
                  <p>Total Price: ${this.state.total * this.state.count}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <h4>Loading....</h4>
        )}
      </>
    );
  }
}
export default ProductList;
