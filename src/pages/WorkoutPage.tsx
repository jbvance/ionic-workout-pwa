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
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { WorkoutItem } from '../declarations';

//import dummy data
import workoutList from '../data/workoutItems';

const WorkoutPage: React.FC = (props) => { 

  const [workout, setWorkout] = useState();
  const { id } = useParams();

  useEffect(() => {   
    const ex = workoutList.find(item => item.id.toString() === id);
    setWorkout(ex);
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">           
          </IonButtons>
          <IonTitle>Workouts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent></IonContent>
    </IonPage>
  );
};

export default WorkoutPage;
