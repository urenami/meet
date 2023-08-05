import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      query: 32,
      errorText: "",
    };
  }

  handleNumberChange = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 32) {
      this.setState({
        query: value,
        errorText: "",
      });
      this.props.updateEvents(this.props.selectedCity, value);
    } else {
      this.setState({
        query: value,
        errorText: "Please enter a valid number between 1 and 32",
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">Number of Events:</label>
        <input
          type="number"
          className="numberOfEvents"
          min={1}
          max={32}
          value={this.state.query}
          onChange={this.handleNumberChange}
        />
        {this.state.errorText && (
          <ErrorAlert className="errorMessage" text={this.state.errorText} />
        )}
      </div>
    );
  }
}

export default NumberOfEvents;
