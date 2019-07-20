import React, { Component } from "react";
import "./ViewAgenda.css";
import axios from "axios";
import Modal from "react-modal";

let url = "https://shift-change-api.herokuapp.com";

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "40%"
  }
};

class ViewAgenda extends Component {
  constructor() {
    super();
    this.state = {
      agenda: {},
      editIsOpen: false,
      deleteIsOpen: false
    };
  }

  componentDidMount() {
    let extension = this.props.match.params.id;
    axios
      .get(url + "/api/agendas/id" + extension)
      .then(res => this.setState({ agenda: res.data }))
      .catch(err => {
        console.log(err);
      });
  }

  deleteAgenda = e => {
    e.preventDefault();

    let extension = this.props.match.params.id;
    axios
      .delete(url + "/api/agendas/delete/" + extension, {
        headers: { Authorization: "bearer " + localStorage.token }
      })
      .then(res => this.setState({ agenda: res.data }))
      // .then(_ => this.setState({ agenda: res.data }))
      .then(_ => this.props.history.push("/search/agendas"))
      .catch(err => {
        console.log(err);
      });
  };

  handleEditForm = e => {
    e.preventDefault();
    let t = e.target;

    let returnedForm = {
      date: t.date.value,
      announcements: t.announcements.value,
      tasks: t.tasks.value,
      shoutOuts: t.shoutOuts.value,
      lesson: t.lessonList.value,
      author: localStorage.userID
    };

    let extension = this.props.match.params.id;
    axios
      .put(url + "/api/agendas/edit/" + extension, returnedForm, {
        headers: { Authorization: "bearer " + localStorage.token }
      })
      .then(res => this.setState({ agenda: res.data }))
      .then(_ => this.closeEditModal())
      .catch(err => {
        console.log(err);
      });
  };

  openEditModal = () => {
    this.setState({ editIsOpen: true });
  };

  openDeleteModal = () => {
    this.setState({ deleteIsOpen: true });
  };

  closeEditModal = () => {
    this.setState({ editIsOpen: false });
  };

  closeDeleteModal = () => {
    this.setState({ deleteIsOpen: false });
  };

  renderButtons = () => {
    return (
      <div className="agenda-buttons-container">
        <input
          onClick={this.openEditModal}
          type="button"
          className="submit"
          value="Edit"
        />
        <input
          onClick={this.openDeleteModal}
          type="button"
          className="submit"
          value="Delete"
        />
      </div>
    );
  };

  render() {
    return (
      <div className="Agenda">
        <div className="agenda-container">
          {this.state.agenda && (
            <div className="agenda-info-container">
              <h1>{this.state.agenda.date}</h1>
              <ul className="agenda-list">
                <li>
                  <span className="bold-font">
                    <h3>Author:</h3>
                  </span>
                  {this.state.agenda.author}
                </li>
                <li>
                  <span className="bold-font">
                    <h3>Announcements:</h3>
                  </span>
                  {this.state.agenda.announcements}
                </li>
                <li>
                  <span className="bold-font">
                    <h3>Tasks:</h3>
                  </span>
                  {this.state.agenda.tasks}
                </li>
                <li>
                  <span className="bold-font">
                    <h3>Shout Outs:</h3>
                  </span>
                  {this.state.agenda.shoutOuts}
                </li>
                <li>
                  <span className="bold-font">
                    <h3>Lesson:</h3>
                  </span>
                  {this.state.agenda.lesson}
                </li>
              </ul>
            </div>
          )}
        </div>
        <Modal
          className="modal"
          isOpen={this.state.editIsOpen}
          onRequestClose={this.closeEditModal}
          style={customStyles}
        >
          <form className="agenda-form" onSubmit={this.handleEditForm}>
            Date:{" "}
            <input
              type="text"
              defaultValue={this.state.agenda ? this.state.agenda.date : ""}
              className="date agenda-input"
              name="date"
            />
            Announcements:
            <input
              type="text"
              defaultValue={
                this.state.agenda ? this.state.agenda.announcements : ""
              }
              className="location agenda-input"
              name="announcements"
            />
            Tasks:
            <input
              type="text"
              defaultValue={this.state.agenda ? this.state.agenda.tasks : ""}
              className="tasks agenda-input"
              name="tasks"
            />
            Shout Outs:
            <input
              type="text"
              defaultValue={
                this.state.agenda ? this.state.agenda.shoutOuts : ""
              }
              className="shoutOuts agenda-input"
              name="shoutOuts"
            />
            Lesson:
            <select className="lesson agenda-input" name="lessonList">
              <option value="" disabled selected>
                Select an option
              </option>
              {this.props.lessons.map((lesson, index) => {
                if (this.state.agenda.lesson) {
                  if (lesson._id === this.state.agenda.lesson._id) {
                    return (
                      <option
                        key={index}
                        selected="selected"
                        value={lesson._id}
                      >
                        {lesson.title}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={lesson._id}>
                        {lesson.title}
                      </option>
                    );
                  }
                }
              })}
            </select>
          </form>
        </Modal>

        <Modal
          className="modal"
          isOpen={this.state.deleteIsOpen}
          onRequestClose={this.closeDeleteModal}
          style={customStyles}
        >
          <span>Are you sure?</span>
          <div className="yes-no-button-container">
            <button
              className="yes-no-buttons submit"
              onClick={this.deleteAgenda}
            >
              Yes
            </button>
            <button
              className="yes-no-buttons submit"
              onClick={this.closeDeleteModal}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewAgenda;
