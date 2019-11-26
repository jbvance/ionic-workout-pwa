import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { play, pause, rewind, fastforward } from 'ionicons/icons';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown-now';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

import './WorkoutPage.css';

import { WorkoutItem, Exercise } from '../declarations';

//import dummy data
import workoutList from '../data/workoutItems';

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  api
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  api: any;
}) => {
  if (api.isPaused()) {
      return <div>Paused</div>
  }
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {minutes}:{zeroPad(seconds)}
      </span>
    );
  }
};

const ProgressContainer = (props: any) => {
  return (
    <div style={{}}>
      <div style={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', paddingRight: 30 }}>{props.children}</div>
      </div>
    </div>
  );
};

const WorkoutPage: React.FC = props => {
  const countdownRef = useRef(null);
  const [workout, setWorkout] = useState();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState();
  const [curExerciseInd, setCurExerciseInd] = useState<number>(0);
  const [timerStart, setTimerStart] = useState();
  const [nowPlaying, setNowPlaying] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  let history = useHistory();
  const { id } = useParams();
  const { duration } = useParams();
  const intDuration: number = duration ? parseInt(duration) * 60 * 1000 : 0;  

  const playOrPause = (cdRef: any) => {
    const { api } = cdRef.current;
    api.isPaused() ? api.start() : api.pause();
    setNowPlaying(api.isPaused());
  };

  const setExercisesForWorkout = (arrExercises: Exercise[]): Exercise[] => {
    const exercisesForWorkout: Exercise[] = [];
    const numExercises = intDuration / 1000 / 30; // this gives us the number of 30-second intervals
    for (let i: number = 0; i < numExercises; i++) {
      exercisesForWorkout.push(
        arrExercises[Math.floor(Math.random() * arrExercises.length)]
      );
    }
    //console.log('EXERCISES FOR WORKOUTS', exercisesForWorkout);
    return exercisesForWorkout;
  };

  const onCountdownTick = (e: any) => {
    //console.log("EVENT", e);
    if (currentExercise.timeRemaining > 1) {
      return setCurrentExercise({
        ...currentExercise,
        timeRemaining: currentExercise.timeRemaining - 1
      });
    }
    // time is expring, update exercise
    setCurExerciseInd(curExerciseInd + 1);
  };

  const changeExercise = (increment: number): void => {
    //console.log("CURRENT EXERCISE INDEX", curExerciseInd);
    setCurExerciseInd(curExerciseInd + increment);
  };

  useEffect(() => {      
    const ex = workoutList.find(item => item.id.toString() === id);
    setWorkout(ex);
    if (ex) {
      //setExercises(ex.exercises);
      //setCurrentExercise({...ex.exercises[curExerciseInd], timeRemaining: 29});
      setExercises(() => setExercisesForWorkout(ex.exercises));
    }

    setTimerStart(Date.now() + intDuration);
  }, [id, intDuration]);

  useEffect(() => {    
    if (!exercises.length) return;
    setCurrentExercise({ ...exercises[0], timeRemaining: 30 });
  }, [exercises]);

  useEffect(() => {
    let newIndex = 0;
    if (curExerciseInd < 0) {
      newIndex = exercises.length - (curExerciseInd % exercises.length) * -1;
      if (newIndex === exercises.length) newIndex = 0;
    } else if (curExerciseInd >= exercises.length) {
      newIndex = curExerciseInd % exercises.length;
    } else {
      newIndex = curExerciseInd;
    }
    setCurrentExercise({ ...exercises[newIndex], timeRemaining: 30 });
  }, [curExerciseInd]);

  if (!workout)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
            <IonTitle>No workout Selected</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent></IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header={'Are you sure you want to end your workout?'}
        message={'Message <strong>text</strong>!!!'}
        buttons={[
          {
            text: 'No, keep going!',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          },
          {
            text: `Yes, I'm done`,
            handler: () => {
              console.log('Confirm Okay');              
              history.push('/');
            }
          }
        ]}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowAlert1(true)} expand="block">
              End
            </IonButton>
          </IonButtons>
          <IonTitle className="countdown-title">
            <Countdown
              date={timerStart}
              autoStart={false}
              renderer={renderer}
              ref={countdownRef}
              controlled={false}
              onTick={onCountdownTick}
            />
          </IonTitle>
          {/* <IonTitle className="countdown-title">{duration}</IonTitle> */}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="workout-grid">
          <IonRow>
            <IonCol>
              <IonText className="ion-text-center" color="primary">
                <h1>{currentExercise.text}</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonImg src={currentExercise.imgSrc || ''} />
          </IonRow>
          <IonRow>
            <IonCol align-self-center>
              <ProgressContainer>
                <CircularProgressbarWithChildren
                  value={(currentExercise.timeRemaining / 30) * 100}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    //rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: '#f88',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                >
                  <div style={{ fontSize: '32px' }}>
                    {currentExercise.timeRemaining}
                  </div>
                </CircularProgressbarWithChildren>
              </ProgressContainer>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="controls-container">
                <div>
                  <IonIcon
                    icon={rewind}
                    onClick={() => changeExercise(-1)}
                    size="large"
                  ></IonIcon>
                </div>
                <div>
                  <IonIcon
                    icon={nowPlaying ? pause : play}
                    onClick={() => playOrPause(countdownRef)}
                    size="large"
                  ></IonIcon>
                </div>
                <div>
                  <IonIcon
                    icon={fastforward}
                    onClick={() => changeExercise(1)}
                    size="large"
                  ></IonIcon>
                </div>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkoutPage;
