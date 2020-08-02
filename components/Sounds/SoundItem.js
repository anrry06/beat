import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export class SoundItem extends Component {
  constructor(props) {
    super(props);
    this.alertRef = React.createRef(); // create react ref
  }

  componentDidMount = () => {
    const { id, title, buffer, blob } = this.props.sound;

    console.log(id, title)

    const file = new File(buffer, title + ".mp3", {
      type: blob.type,
      lastModified: Date.now(),
    });
    const player = new Audio(URL.createObjectURL(file));
    player.controls = true;
    this.alertRef.current.appendChild(player);
  };

  getStyle = () => {
    return {
      background: "#F4F4F4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.sound.completed ? "line-through" : "none",
    };
  };

  render() {
    const { id, title } = this.props.sound;
    return (
      <Alert ref={this.alertRef} variant="success" className="mb-2">
        <Alert.Heading>{title}</Alert.Heading>
        <p>Description</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-danger"
            onClick={this.props.delSound.bind(this, id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </Alert>
    );
  }
}

// PropTypes
SoundItem.propTypes = {
  sounds: PropTypes.object.isRequired,
  delSound: PropTypes.func.isRequired,
};

export default SoundItem;
