
// var getUserMedia = require('get-user-media-promise');
// var MicrophoneStream = require('microphone-stream');

const MicRecorder = require('mic-recorder-to-mp3');


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  componentDidMount(){

    if(typeof document !== 'undefined'){
      // New instance
      const recorder = new MicRecorder({
        bitRate: 128
      });
      
      document.getElementById('start').onclick = function(e){
        // Start recording. Browser will request permission to use your microphone.
        recorder.start().then(() => {
          // something else
        }).catch((e) => {
          console.error(e);
        });
      }
      
      document.getElementById('stop').onclick = function(e){
        recorder
          .stop()
          .getMp3().then(([buffer, blob]) => {
            // do what ever you want with buffer and blob
            // Example: Create a mp3 file and play
            const file = new File(buffer, 'me-at-thevoice.mp3', {
              type: blob.type,
              lastModified: Date.now()
            });

            const player = new Audio(URL.createObjectURL(file));
            player.play();

          }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
          });
      }
    }
    // document.getElementById('my-start-button').onclick = function() {
 
    //   // note: for iOS Safari, the constructor must be called in response to a tap, or else the AudioContext will remain
    //   // suspended and will not provide any audio data.
    //   var micStream = new MicrophoneStream();
     
    //   getUserMedia({ video: false, audio: true })
    //     .then(function(stream) {
    //       micStream.setStream(stream);
    //     }).catch(function(error) {
    //       console.log(error);
    //     });
     
    //   // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
    //   micStream.on('data', function(chunk) {
    //     // Optionally convert the Buffer back into a Float32Array
    //     // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
    //     var raw = MicrophoneStream.toRaw(chunk)
    //     //...
     
    //     // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
    //    });
     
    //   // or pipe it to another stream
    //   micStream.pipe(/*...*/);
     
    //   // It also emits a format event with various details (frequency, channels, etc)
    //   micStream.on('format', function(format) {
    //     console.log(format);
    //   });
     
    //   // Stop when ready
    //   document.getElementById('my-stop-button').onclick = function() {
    //     micStream.stop();
    //   };
    //  }
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
        <div>
          <button id="start" value="start">start</button>
          <button id="stop" value="stop">stop</button>
        </div>
      </div>
    );
  }
}
  
  export default Game