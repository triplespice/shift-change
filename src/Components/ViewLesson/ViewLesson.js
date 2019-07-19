import React, { Component } from "react";
import "./ViewLesson.css";
import axios from "axios";
import Modal from "react-modal";

let url = "https://rec-creation-api.herokuapp.com";

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

class ViewLesson extends Component {
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
      .get(url + "/api/lessons/id" + extension)
      .then(res => this.setState({ lesson: res.data }))
      .catch(err => {
        console.log(err);
      });
  }

  deleteLesson = e => {
    e.preventDefault();

    let extension = this.props.match.params.id;
    axios
      .delete(url + "/api/lessons/delete/" + extension, {
        headers: { Authorization: "bearer " + localStorage.token }
      })
      .then(res => this.setState({ agenda: res.data }))
      // .then(_ => this.setState({ agenda: res.data }))
      .then(_ => this.props.history.push("/search/lessons"))
      .catch(err => {
        console.log(err);
      });
  };

  handleEditForm = e => {
    e.preventDefault();
    let t = e.target;

    let returnedForm = {
      title: t.title.value,
      category: t.category.value,
      details: t.details.value
    };

    let extension = this.props.match.params.id;
    axios
      .put(url + "/api/lessons/edit/" + extension, returnedForm, {
        headers: { Authorization: "bearer " + localStorage.token }
      })
      .then(res => this.setState({ lesson: res.data }))
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
      <div className="lesson-buttons-container">
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
      <div className="Lesson">
        <div className="lesson-container">
          {this.state.lesson.title && (
            <div className="lesson-info-container">
              <h1>{this.state.lesson.title}</h1>
              <ul className="lesson-list">
                <li>
                  <span className="bold-font">
                    <h3>Category:</h3>
                  </span>
                  {this.state.lesson.category}
                </li>
                <li>
                  <span className="bold-font">
                    <h3>Details:</h3>
                  </span>
                  {this.state.lesson.details}
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
          <form className="lesson-form" onSubmit={this.handleEditForm}>
            Title:{" "}
            <input
              type="text"
              defaultValue={this.state.lesson.title}
              className="title lesson-input"
              name="title"
            />
            Category:
            <input
              type="text"
              defaultValue={this.state.lesson.category}
              className="category lesson-input"
              name="category"
            />
            Details:
            <input
              type="text"
              defaultValue={this.state.lesson.details}
              className="details lesson-input"
              name="details"
            />
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
              onClick={this.deleteLesson}
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

export default ViewLesson;
