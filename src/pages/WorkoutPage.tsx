import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { play, pause, rewind, fastforward } from 'ionicons/icons';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown-now';

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

const WorkoutPage: React.FC = (props) => { 

  const countdownRef = useRef(null); 
  const [workout, setWorkout] = useState();
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
      setTimerStart(Date.now() + intDuration);    
  }, []);
  
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
      <IonContent></IonContent>
    </IonPage>
  );
};

export default WorkoutPage;
