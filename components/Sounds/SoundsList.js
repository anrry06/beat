import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

import SoundItem from "./SoundItem";

class SoundsList extends Component {
  render() {
    return (
      <Form>
        {this.props.sounds.map((sound) => (
          <SoundItem
            key={sound.id}
            sound={sound}
            delSound={this.props.delSound}
          />
        ))}
      </Form>
    );
  }
}

// PropTypes
SoundsList.propTypes = {
  sounds: PropTypes.array.isRequired,
  delSound: PropTypes.func.isRequired
};

export default SoundsList;
