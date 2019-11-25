import {
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
import { useParams } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown-now';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

import './WorkoutPage.css';

import { WorkoutItem } from '../declarations';

//import dummy data
import workoutList from '../data/workoutItems';

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({hours, minutes, seconds, completed, api }: { hours: number, minutes: number, seconds: number, completed: boolean, api: any }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{(minutes)}:{zeroPad(seconds)}</span>;
  }
};

const ProgressContainer = (props: any) => {
  return (
    <div style={{}}>      
      <div style={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%", paddingRight: 30 }}>{props.children}</div>       
      </div>
    </div>
  );
}

const WorkoutPage: React.FC = (props) => { 

  const countdownRef = useRef(null); 
  const [workout, setWorkout] = useState();
  const [exercises, setExercises] = useState();
  const [currentExercise, setCurrentExercise] = useState();
  const [timerStart, setTimerStart] = useState();
  const [nowPlaying, setNowPlaying] = useState(false);  
  const { id } = useParams();
  const { duration } = useParams();  
  const intDuration: number = duration  ?  parseInt(duration) * 60 * 1000 : 0;  
  
  // Set the date/time for the countdown  
  
  const playOrPause = (cdRef: any) => {
   const { api } = cdRef.current;
    api.isPaused() ? api.start() : api.pause(); 
    setNowPlaying (api.isPaused());   
  }

  useEffect(() => {      
      const ex = workoutList.find(item => item.id.toString() === id);   
      setWorkout(ex); 
      if (ex) {
        setExercises(ex.exercises);
        setCurrentExercise({...ex.exercises[0], timeRemaining: 30});
         console.log("EXERCISES", ex.exercises);
      }
   
      setTimerStart(Date.now() + intDuration);    
  }, [id, intDuration]);
  
  if (!workout) return(
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">           
        </IonButtons>
        <IonTitle>No workout Selected</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent></IonContent>
  </IonPage>
  )
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">           
          </IonButtons>
          <IonTitle className="countdown-title">
            <Countdown
              date={timerStart}            
              autoStart={false}
              renderer={renderer}
              ref={countdownRef}
              controlled={false}
            />           
          </IonTitle>
         {/* <IonTitle className="countdown-title">{duration}</IonTitle> */}
        </IonToolbar>       
      </IonHeader>    
      
      <IonContent>
        <IonGrid>
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
                value={currentExercise.timeRemaining / 30 * 100 }
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
                  <div style={{fontSize: "32px"}}>{currentExercise.timeRemaining}</div>         
               </CircularProgressbarWithChildren>   
              </ProgressContainer>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
               <div className="controls-container">
                  <div>
                    <IonIcon icon={rewind} size="large"></IonIcon>
                  </div>
                   <div>
                    <IonIcon icon={nowPlaying ? pause : play} onClick={() => playOrPause(countdownRef)} size="large"></IonIcon>
                  </div>
                   <div>
                    <IonIcon icon={fastforward} size="large"></IonIcon>
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
