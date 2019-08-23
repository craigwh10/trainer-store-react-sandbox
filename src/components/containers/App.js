import React, { Component } from "react";
import "./App.css";
import Shoes from "../Shoes/Shoes";
import Header from "../DivElements/Header";
import PageGenerator from "../Shoes/ShoePage/PageGenerator";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [
        {
          id: "a1",
          name: "Nike react",
          sizes: [[1, 2], [2, 1], [3, 2], [4, 1], [5, 6]],
          purpose: "running"
        },
        {
          id: "a2",
          name: "Nike vaporfly",
          sizes: [[1, 1], [2, 3], [3, 2], [4, 2], [5, 2], [6, 20]],
          purpose: "sports"
        },
        {
          id: "a3",
          name: "Adidas ultraboost",
          sizes: [[1, 1], [2, 2], [3, 2]],
          purpose: "sports"
        },
        {
          id: "a4",
          name: "Adidas run",
          sizes: [[1, 18], [2, 42], [3, 8]],
          purpose: "running"
        },
        {
          id: "a5",
          name: "Nike free RN",
          sizes: [[1, 1], [2, 42], [3, 8]],
          purpose: "running"
        },
        {
          id: "a6",
          name: "Brogues",
          sizes: [[1, 1], [2, 42], [3, 8]],
          purpose: "smartwear"
        },
        {
          id: "a7",
          name: "Sliders",
          sizes: [[1, 1], [2, 10], [3, 8]],
          purpose: "smartwear"
        }
      ],
      filteredShoes: [],
      filtered: false,
      filteredValue: null,
      page: false
    };
    this.clickFilter = this.clickFilter.bind(this);
    this.baseState = this.state;
    this.resetState = this.resetState.bind(this);
  }

  resetState = () => {
    this.setState(this.baseState);
  };

  uniqueHeader = () => {
    const allPurposes = this.state.shoes.map(a => a.purpose);
    let uniquePurposes = [...new Set(allPurposes)];
    // Gets all unique purposes to be sent to header.
    return uniquePurposes;
  };

  clickFilter = value => {
    this.setState({
      filteredShoes: this.state.shoes.filter(item => item.purpose === value),
      filtered: true,
      filteredValue: value,
      page: false,
      pageShoe: []
    });
  };

  pageHandler = shoe => {
    this.setState({
      page: true,
      pageShoe: shoe
    });
  };

  render() {
    const shoes = (
      <div className="card-body">
        <Shoes
          shoes={
            this.state.filtered ? this.state.filteredShoes : this.state.shoes
          }
          pageHandler={shoe => this.pageHandler(shoe)}
        />
      </div>
    );

    return (
      <React.Fragment>
        <h1 className="top-title">{this.props.appHeader}</h1>
        <div className="card text-center">
          <Header
            click={this.clickFilter}
            resetState={this.resetState}
            unique={this.uniqueHeader}
          />
          {this.state.page ? (
            <PageGenerator shoeData={this.state.pageShoe} />
          ) : (
            shoes
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
