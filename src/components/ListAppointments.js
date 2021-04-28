import React, { Component } from "react";

class ListAppointments extends Component {
  render() {
    const { appointments } = this.props;

    return (
      <div className="appointment-list item-list mb-3">
        {appointments.map((item) => (
          <div key={item.aptId.toString()} className="pet-item col media py-3">
            <div className="mr-3">
              <button className="pet-delete btn btm-sm btn-danger">X</button>
            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="pet-name ">{item.aptId + 1}. {item.petName}</span>
                <span className="apt-date ml-auto">{item.aptDate}</span>
              </div>

              <div className="owner-name">
                <span className="label-item">Owner:</span>
                <span>{item.ownerName}</span>
              </div>
              <div className="apt-notes">{item.aptNotes}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointments;
