import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      lastIdx: 0,
    };
  }

  componentDidMount() {
    fetch("./data.json")
      .then((res) => res.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIdx;
          this.setState({lastIdx: this.state.lastIdx + 1});
          return item;
        });

        this.setState({
          appointments: apts,
        });
      });
  }

  render() {
    
    const { appointments } = this.state;
    
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments appointments={appointments}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
