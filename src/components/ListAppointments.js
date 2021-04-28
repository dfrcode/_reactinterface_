import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import Moment from "react-moment";

class ListAppointments extends Component {
  render() {
    const { appointments } = this.props;

    return (
      <div className="appointment-list item-list mb-3">
        {appointments.map((item) => (
          <div key={item.aptId.toString()} className="pet-item col media py-3">
            <div className="mr-3">
              <button
                className="pet-delete btn btm-sm btn-danger"
                onClick={() => this.props.deleteAppointment(item)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span className="pet-name ">
                  {item.aptId + 1}. {item.petName}
                </span>
                <span className="apt-date ml-auto">
                  <Moment
                    date={item.aptDate}
                    parse="YYYY-MM-DD hh:mm"
                    format="MMM-D h:mma"
                  />
                </span>
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
