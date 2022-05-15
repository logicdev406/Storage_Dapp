import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    inputValue: "",
    error: "",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div style={{ height: "100vh", width: "100vw" }}>
          Loading Web3, accounts, and contract...
        </div>
      );
    }

    const handleClick = async () => {
      const { accounts, contract, inputValue } = this.state;
      console.log(inputValue);

      if (inputValue === null) {
        return this.setState({ error: "Please input a number" });
      }

      // Stores the given value, from our input.
      await contract.methods.set(`${inputValue}`).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Update state with the result.
      this.setState({ inputValue: "" });

      // Update state with the result.
      this.setState({ storageValue: response });
    };

    return (
      <div className="App">
        <h1 style={{ marginTop: "16%" }}>Welcome to my first Web3 Dapp</h1>
        <p>
          Pls input a number and click the send button to set the number to
          storage
        </p>
        <div>
          <strong>
            The number in your storage is currently: {this.state.storageValue}{" "}
          </strong>{" "}
        </div>
        <br />
        <br />
        <div>
          {this.state.error && (
            <p style={{ color: "red", fontSize: "14px" }}>{this.state.error}</p>
          )}
          <input
            style={{
              height: "30px",
              width: "300px",
              marginRight: "10px",
              color: "black",
              fontSize: "18px",
            }}
            value={this.state.inputValue}
            type="number"
            onChange={(e) => {
              return this.setState({ inputValue: e.target.value });
            }}
          />
          <button
            onClick={() => handleClick()}
            style={{ height: "35px", width: "80px", fontSize: "15px" }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default App;
