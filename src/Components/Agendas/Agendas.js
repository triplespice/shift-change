import React, { Component } from "react";
import "./Agendas.css";

class Agendas extends Component {
  handleClick = id => {
    if (this.props.type === "agendas") {
      this.props.history.push("/agendas/ + id");
    }
  };

  render() {
    return (
      <div className="Agendas">
        <div className="agenda-header-container">
          <h2>Select An Agenda to View:</h2>
        </div>
        {/* <div className="agendas-div-container">
          {this.props.data.map((data, index) => {
            if (this.props.type === "agendas") {
              if (data.hidden === false) {
                return (
                  <div
                    onClick={() => this.handleClick(data._id)}
                    className="agendas-div-agenda"
                    key={index}
                  >
                    <img src={logo} alt="logo" />
                    <span className="agendas-agenda-caption">{data.name}</span>
                  </div>
                );
              }
            }
          })}
        </div> */}
      </div>
    );
  }
}

export default Agendas;
