import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

import WorkoutImage from '../components/WorkoutImage';

type Item = {
  src: string;
  text: string;
  url: '/'
};

const workoutItems: Item[] = [
  { 
    src: 'https://imgix.bustle.com/elite-daily/2016/03/06140813/elite-daily-Suprijono-Suharjoto-workout.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70', 
    text: 'Back Strength',
    url: '/'
  },
  { 
    src: 'https://www.cheatsheet.com/wp-content/uploads/2016/09/Cute-fit-girl-doing-physical-exercises-at-gym.jpg', 
    text: 'Core Workout',
    url: '/'
  },
  {
    src: 'https://myfitnessgear.co.uk/wp-content/uploads/2018/07/cant-feel-my-abs-working-when-doing-sit-ups-5.png', 
    text: 'All Abs',
    url: '/'
  }

];

const ListItems = () => {
 

  const items = workoutItems.map(item => {
    return (
      <IonItem key={item.text}>
       <Link to='/'>
          <WorkoutImage src={item.src} text={item.text} />
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

