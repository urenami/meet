import React, { Component } from "react";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: false,
    infoText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (value.trim() === "") {
      this.setState({
        query: value,
        suggestions: [],
        showSuggestions: false,
        infoText: "",
      });
    } else if (suggestions.length === 0) {
      this.setState({
        query: value,
        suggestions: [],
        showSuggestions: true,
        infoText:
          "We can not find the city you are looking for. Please try another city",
      });
    } else {
      const infoText = `Found ${suggestions.length} cities matching "${value}"`;
  
      this.setState({
        query: value,
        suggestions,
        showSuggestions: true,
        infoText,
      });
    }
  };
  

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: "",
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    const { query, suggestions, infoText, showSuggestions } = this.state;
    return (
      <div className="CitySearch">
        {infoText.length > 0 && <InfoAlert text={infoText} />}
        <input
          placeholder="Search for a city"
          type="text"
          className="city"
          value={query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: false });
          }}
        />
        {showSuggestions && query.length > 0 && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
              >
                {suggestion}
              </li>
            ))}
            <li onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default CitySearch;
