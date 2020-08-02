import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";

import Container from "react-bootstrap/Container";

import SoundsList from "../components/Sounds/SoundsList";
import AddSound from "../components/Sounds/AddSound";

class Sounds extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     sounds: []
  //   };
  // }

  state = {
    sounds: [],
    recorder: null,
  };

  componentDidMount = () => {
    if (typeof document !== "undefined") {
      let recorder = new MicRecorder({
        bitRate: 128,
      });
      this.setState({ recorder: recorder });
    }

    // axios.get("/api/sounds").then((res) => this.setState({ sounds: res.data }));
    let sounds = JSON.parse(localStorage.getItem("sounds")) || [];
    console.log(sounds);
    console.log(typeof sounds);
    this.setState({ sounds: sounds });
  };

  // Delete Todo
  delSound = (id) => {
    // axios.delete(`/api/sounds?id=${id}`).then((res) =>
    //   this.setState({
    //     sounds: [...this.state.sounds.filter((sound) => sound.id !== id)],
    //   })
    // );

    let sounds = [...this.state.sounds.filter((sound) => sound.id !== id)];
    localStorage.setItem("sounds", JSON.stringify(sounds));
    console.log("setItem", sounds);
    this.setState({ sounds: sounds });
  };

  addSound = (title, buffer, blob) => {
    // axios
    //   .post("/api/sounds", {
    //     id: uuidv4(),
    //     title: title,
    //   })
    //   .then((res) =>
    //     this.setState({
    //       sounds: [...this.state.sounds, res.data],
    //     })
    //   );

    let newSound = {
      id: uuidv4(),
      title: title,
      buffer: buffer,
      blob: blob
    };
    let sounds = [...this.state.sounds, newSound];
    localStorage.setItem("sounds", JSON.stringify(sounds));
    console.log("setItem", sounds);
    this.setState({ sounds: sounds });
  };

  startRecording = (next) => {
    this.state.recorder
      .start()
      .then(next)
      .catch((e) => {
        console.error(e);
      });
  };

  stopRecording = (next) => {
    this.state.recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        next(buffer, blob);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  render() {
    return (
      <Container>
        <AddSound
          addSound={this.addSound}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
        />
        <SoundsList sounds={this.state.sounds} delSound={this.delSound} />
      </Container>
    );
  }
}

export default Sounds;
