import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import EventGenre from "./EventGenre";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    seletedLocation: "all",
    numberOfEvents: 32,
    errorText: "",
  };

  async componentDidMount() {
    this.mounted = true;
    const cachedEvents = localStorage.getItem("cachedEvents");

    if (!cachedEvents) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            locations: extractLocations(events),
          });
          localStorage.setItem("cachedEvents", JSON.stringify(events));
        }
      });
    } else {
      this.setState({
        events: JSON.parse(cachedEvents),
        locations: extractLocations(JSON.parse(cachedEvents)),
      });
    }
  }

  offlineWarning = () => {
    if (!navigator.onLine) {
      const cachedEvents = localStorage.getItem("cachedEvents");
      if (cachedEvents) {
        this.setState({
          events: JSON.parse(cachedEvents),
          errorText: "You are offline. Displaying cached events.",
        });
      } else {
        this.setState({
          errorText: "You are offline. No cached events available.",
        });
      }
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  updateEvents = (location, inputNumber) => {
    const { selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          numberOfEvents: inputNumber,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === "all"
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputNumber,
        });
      });
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { errorText } = this.state;

    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Select your nearest city:</h4>
        {!navigator.onLine && errorText && <WarningAlert text={errorText} />}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <h4>Events in each city</h4>
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}
export default App;
