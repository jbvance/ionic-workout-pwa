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

// GraphQL Imports
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Exercise } from '../declarations';

const EXERCISES = gql`
  query workout ($id: ID!){
    workout(where: { id: $id }) { 
        id
        exercises {
          id
          title
          image
        }  
    }
  
  }
`;

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
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState();
  const [curExerciseInd, setCurExerciseInd] = useState<number>(0);
  const [timerStart, setTimerStart] = useState();
  const [nowPlaying, setNowPlaying] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  let history = useHistory();
  const { id } = useParams();
  const { duration } = useParams();
  const intDuration: number = duration ? parseInt(duration) * 60 * 1000 : 0;  
   // Call GraphQL query  
  const { loading, error, data } = useQuery(EXERCISES, {
    variables: { id }
  });

  let audioRefCountdown3: HTMLAudioElement | null;
  let audioRefCountdown2: HTMLAudioElement | null;
  let audioRefCountdown1: HTMLAudioElement | null;

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
    return exercisesForWorkout;
  };

  const onCountdownTick = (e: any) => {
    
    if (currentExercise.timeRemaining > 1) {     
      if (currentExercise.timeRemaining === 4) {
        audioRefCountdown3!.play();
      }
      else if (currentExercise.timeRemaining === 3) {
        audioRefCountdown2!.play();
      }  
      if (currentExercise.timeRemaining === 2) {
        audioRefCountdown1!.play();
      }     
      return setCurrentExercise({
        ...currentExercise,
        timeRemaining: currentExercise.timeRemaining - 1
      });
    }   
    // time is expring, update exercise
    setCurExerciseInd(curExerciseInd + 1);
  };

  const changeExercise = (increment: number): void => {   
    setCurExerciseInd(curExerciseInd + increment);
  };
   

  useEffect(() => {     
    setTimerStart(Date.now() + intDuration);
  }, [id, intDuration]);

  useEffect(() => {   
    if (!data || !data.workout) {     
      return;
    };
    setExercises(data.workout.exercises);    
    setCurrentExercise({ ...data.workout.exercises[0], timeRemaining: 30 });   
  }, [data, exercises]);

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
   
  
 if (loading || !currentExercise) {    
    return <IonPage><div>Loading...</div></IonPage>;
  }
  if (error) {   
    console.error(error); 
    return <IonPage><div>Error: {error.message}</div></IonPage>;
  }   

  return (
    <IonPage>
      <audio ref={(ref) => {audioRefCountdown1 = ref}} src="https://app-images-jv.s3.us-east-2.amazonaws.com/countdown-one.mp3" />
      <audio ref={(ref) => {audioRefCountdown2 = ref}} src="https://app-images-jv.s3.us-east-2.amazonaws.com/countdown-two.mp3" />
      <audio ref={(ref) => {audioRefCountdown3 = ref}} src="https://app-images-jv.s3.us-east-2.amazonaws.com/countdown-three.mp3" />

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Are you sure you want to end your workout?'}        
        buttons={[
          {
            text: 'No, keep going!',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {              
            }
          },
          {
            text: `Yes, I'm done`,
            handler: () => {                          
              history.push('/');
            }
          }
        ]}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setShowAlert(true)} expand="block">
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
                <h1>{currentExercise.title}</h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonImg src={currentExercise.image || ''} />
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
