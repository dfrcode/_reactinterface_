import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddAppointments";
import SearchAppointments from "./SearchAppointments";
import ListAppointments from "./ListAppointments";

import { without } from "lodash";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      formDisplay: false,
      lastIdx: 0,
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    fetch("./data.json")
      .then((res) => res.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIdx;
          this.setState({ lastIdx: this.state.lastIdx + 1 });
          return item;
        });

        this.setState({
          appointments: apts,
        });
      });
  }

  deleteAppointment(apt) {
    let itemApts = this.state.appointments;
    itemApts = without(itemApts, apt);

    this.setState({appointments: itemApts});
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
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
                <AddAppointments toggleForm={this.toggleForm} formDisplay={this.state.formDisplay}/>
                <SearchAppointments />
                <ListAppointments
                  appointments={appointments}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
