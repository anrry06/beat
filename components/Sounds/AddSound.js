import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl, faStop } from "@fortawesome/free-solid-svg-icons";

export class AddSounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      record: false,
    };
  }

  onRecordClick = (e) => {
    e.preventDefault();
    console.log("onRecordClick");
    let record = document.querySelector("#record");

    if (this.state.record === true) {
      console.log("stop record");
      this.setState({ record: false });
      this.props.stopRecording((buffer, blob) => {
        record.classList.toggle('btn-danger');
        record.querySelector(".fa-stop").classList.add("d-none");
        record.querySelector(".fa-record-vinyl").classList.remove("d-none");

        this.props.addSound(this.state.title, buffer, blob);
        this.setState({ title: "" });
      });
    } else {
      console.log("start record");
      this.setState({ record: true });
      this.props.startRecording(() => {
        record.classList.toggle('btn-danger');
        record.querySelector(".fa-record-vinyl").classList.add("d-none");
        record.querySelector(".fa-stop").classList.remove("d-none");
      });
    }
  };

  onChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <Form>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Title
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="title"
              placeholder="Add Sound..."
              value={this.state.title}
              onChange={this.onChange}
            />
          </Col>
          <Col xs="auto">
            <Button
              id="record"
              type="submit"
              className="mb-2"
              onClick={this.onRecordClick}
            >
              <FontAwesomeIcon icon={faRecordVinyl} />
              <FontAwesomeIcon icon={faStop} className="d-none" />
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

// PropTypes
AddSounds.propTypes = {
  addSounds: PropTypes.func.isRequired,
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
};

export default AddSounds;
