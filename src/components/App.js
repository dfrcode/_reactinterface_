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
      orderBy: "aptDate",
      orderDir: "a-z",
      lastIdx: 0,
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  addAppointment(apt) {
    let tempApt = this.state.appointments;
    apt.aptId = this.state.lastIdx;

    tempApt.unshift(apt);

    this.setState({
      appointments: tempApt,
      lastIdx: this.state.lastIdx + 1,
    });
  }

  deleteAppointment(apt) {
    let itemApts = this.state.appointments;
    itemApts = without(itemApts, apt);

    this.setState({ appointments: itemApts });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }

  render() {
    const { appointments, orderBy, orderDir } = this.state;

    let order;
    let filteredApts = appointments;
    if (orderDir === "a-z") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  toggleForm={this.toggleForm}
                  formDisplay={this.state.formDisplay}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                />
                <ListAppointments
                  appointments={filteredApts}
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
