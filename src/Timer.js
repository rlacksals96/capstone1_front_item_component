import React, { Component } from 'react';
import './Timer.css';
import {Button} from 'react-bootstrap'

let countdown;
let pause;

const initialState = {
  leftTime: "1:00",
  breakTime: 5,
  sessionTime: 1,
  isPaused: true,
  isSession: true
};


// Time management helper functions

const minsToSeconds = mins => mins * 60;

const secondsToMins = seconds => {
  let minutes = Math.floor(seconds / 60);
  seconds = (seconds % 60).toFixed(0);
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
};

const minsAndSecondsToSeconds = mins => {
  const time = mins.split(":");
  const seconds = Math.floor(+time[0] * 60 + +time[1]);
  return seconds;
};


// Components

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleReset = this.handleReset.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleControls = this.handleControls.bind(this);
    this.timer = this.timer.bind(this);
  }

  timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000 + 1;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      if (secondsLeft < 1) {
        let isSession = this.state.isSession;
        let curTime;
        if (isSession) {
          isSession = false;
          this.setState({ isSession });
          curTime = this.state.breakTime;
        } else {
          isSession = true;
          this.setState({ isSession });
          curTime = this.state.sessionTime;
        }
        this.audioBeep.play();
        clearInterval(countdown);
        this.timer(minsToSeconds(curTime));
      }
      const converted = secondsToMins(secondsLeft);
      this.setState({
        leftTime: converted
      });
    }, 1000);
  }

  handleReset() {
    clearInterval(countdown);
    pause = "";
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    this.setState(initialState);
  }

  handleStartPause() {
    let curTime;
    if (this.state.isPaused) {
      if (pause) {
        curTime = pause;
        this.timer(minsAndSecondsToSeconds(curTime));
        pause = "";
      } else {
        curTime = this.state.sessionTime;
        this.timer(minsToSeconds(curTime));
      }
      this.setState({
        isPaused: false
      });
    } else {
      pause = this.state.leftTime;
      clearInterval(countdown);
      this.setState({
        isPaused: true
      });
    }
  }

  handleControls(e) {
    const id = e.target.id;
    let breakTime = this.state.breakTime;
    let sessionTime = this.state.sessionTime;

    switch (id) {
      case "break-increment":
        breakTime++;
        break;
      case "break-decrement":
        breakTime--;
        break;
      case "session-increment":
        sessionTime++;
        break;
      case "session-decrement":
        sessionTime--;
        break;
    }
    if (
      breakTime < 1 ||
      sessionTime < 1 ||
      breakTime > 25 ||
      sessionTime > 60
    ) {
      return;
    }
    const leftTime = secondsToMins(sessionTime * 60);
    if(!countdown){
      this.setState({
      leftTime
    });
    }
    this.setState({
      breakTime,
      sessionTime
    });
  }

  render() {
    return (
      <div id="pomodoro">{/* 
        <MrPomodoro isSession={this.state.isSession} /> */}
        <Display
          isSession={this.state.isSession}
          isPaused={this.state.isPaused}
          leftTime={this.state.leftTime}
          startPause={this.handleStartPause}
          reset={this.handleReset}
        />
        <div id="control-block">
          <Break
            controls={this.handleControls}
            breakTime={this.state.breakTime}
          />
          <Session
            controls={this.handleControls}
            sessionTime={this.state.sessionTime}
          />
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://notificationsounds.com/notification-sounds/piece-of-cake-611"
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

const MrPomodoro = props => (
  <div>
    <img
      id="mrpomodoro"
      title="Icon made by Freepik"
      src={
        props.isSession
          ? "https://goo.gl/TtXs88"
          : "https://goo.gl/kVKA9e"
      }
    />
  </div>
);

const Display = props => (
  <div id="display">
    <div id="timer-label">
      {props.isSession ? "Be productive!" : "Time for a break!"}
    </div>
    <div id="time-left">{props.leftTime}</div>
    <Button id="start_stop" onClick={props.startPause}>
      {props.isPaused ? "Start" : "Stop"}
    </Button>
    <Button id="reset" onClick={props.reset}>
      Reset
    </Button>
  </div>
);

const Break = props => (
  <div id="break">
    <p id="break-label">Break Length</p>
    <div className="controls">
      <Button onClick={props.controls} id="break-decrement">
        &#8722;
      </Button>
      <p className="time" id="break-length">
        {props.breakTime}
      </p>
      <Button onClick={props.controls} id="break-increment">
        &#43;
      </Button>
    </div>
  </div>
);

const Session = props => (
  <div id="session">
    <p id="session-label">Session Length</p>
    <div className="controls">
      <Button onClick={props.controls} id="session-decrement">
        &#8722;
      </Button>
      <p className="time" id="session-length">
        {props.sessionTime}
      </p>
      <Button onClick={props.controls} id="session-increment">
        &#43;
      </Button>
    </div>
  </div>
);

export default Timer;