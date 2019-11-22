import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

import WorkoutImage from '../components/WorkoutImage';

import { WorkoutItem } from '../declarations';


//import dummy data
import workoutItems from '../data/workoutItems';

const ListItems = () => {
 
  const items = workoutItems.map((item, index) => {
    return (
      <IonItem key={item.id}>
       <Link to={`/home/workouts/${item.id}`}>
          <WorkoutImage src={item.imgSrc} text={item.text} />
        </Link>      
      </IonItem>
    );
  });

  return <IonList>{items}</IonList>;
};

const WorkoutListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Workouts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
       <ListItems />
      </IonContent>
    </IonPage>
  );
};


export default WorkoutListPage;

