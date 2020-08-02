import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const MicRecorder = require("mic-recorder-to-mp3");

class Recorder extends React.Component {
  componentDidMount() {
    if (typeof document !== "undefined") {
      const button = document.querySelector("button");
      const recorder = new MicRecorder({
        bitRate: 128,
      });

      button.addEventListener("click", startRecording);

      function startRecording() {
        recorder
          .start()
          .then(() => {
            button.textContent = "Stop recording";
            button.classList.toggle("btn-danger");
            button.removeEventListener("click", startRecording);
            button.addEventListener("click", stopRecording);
          })
          .catch((e) => {
            console.error(e);
          });
      }

      function stopRecording() {
        recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            console.log(buffer, blob);
            const file = new File(buffer, "music.mp3", {
              type: blob.type,
              lastModified: Date.now(),
            });

            const li = document.createElement("li");
            const player = new Audio(URL.createObjectURL(file));
            player.controls = true;
            li.appendChild(player);
            document.querySelector("#playlist").appendChild(li);

            button.textContent = "Start recording";
            button.classList.toggle("btn-danger");
            button.removeEventListener("click", stopRecording);
            button.addEventListener("click", startRecording);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  }

  render() {
    return (
      <Container className="text-center">
        <h1>Mic Recorder to Mp3 Example</h1>
        <p>Check your web developer tool console.</p>
        <hr />
        <Button className="btn-primary">Start recording</Button>
        <br />
        <br />
        <br />
        <ul id="playlist"></ul>
      </Container>
    );
  }
}

export default Recorder;
