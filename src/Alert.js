import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "white";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "white";
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color='orange';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
