import React, { Component } from "react";
import "./SubmitLesson.css";
import axios from "axios";

class SubmitLesson extends Component {
  constructor() {
    super();
    this.state = {
      isValid: true
    };
  }

  handleForm = e => {
    e.preventDefault();
    let t = e.target;
    if (!t.title.value || !t.category.value || !t.details.value) {
      this.setState({ isValid: false });
    } else {
      let returnedForm = {
        title: t.title.value,
        category: t.category.value,
        details: t.details.value
      };
      let url = "https://shift-change-api-herokuapp.com/api/lessons";

      axios
        .post(url, returnedForm, {
          headers: { Authorization: "bearer " + localStorage.token }
        })
        .catch(err => console.log(err));
    }
    this.props.history.push("/search/lessons");
  };

  render() {
    return (
      <div className="SubmitLesson">
        <div className="create-info-container">
          <div className="create-text-container">
            <h3>Submit a New Lesson! Fill Out the Form Below:</h3>
            {!this.state.isValid && (
              <p className="create-error">Fill Out All the Fields!</p>
            )}
          </div>
          <form className="create-form" onSubmit={this.handleForm}>
            Title:
            <input type="text" className="create-input" name="title" />
            Category:
            <select className="create-input" name="category">
              <option value="salesTechniques">Sales Techniques</option>
              <option value="customerService">Customer Service</option>
              <option value="activity">Team Building Activity</option>
            </select>
            Details:
            <textarea
              id="lesson-textarea"
              className="create-input"
              name="details"
            />
            <input type="submit" className="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default SubmitLesson;
