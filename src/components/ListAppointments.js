import React, { Component } from "react";

class ListAppointments extends Component {
  render() {

    const { appointments } = this.props;

    return (
      <div>
        {appointments.map((item) => (
          <div>
            <div>{item.petName}</div>
            <div>-{item.ownerName}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointments;
