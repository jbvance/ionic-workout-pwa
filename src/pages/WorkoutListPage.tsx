import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { americanFootball, basketball, beer, bluetooth, boat, build, flask, football, paperPlane, wifi } from 'ionicons/icons';
import React from 'react';

import WorkoutImage from '../components/WorkoutImage';

type Item = {
src: string;
text: string;
};

const workoutItems: Item[] = [
  { src: 'https://imgix.bustle.com/elite-daily/2016/03/06140813/elite-daily-Suprijono-Suharjoto-workout.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70', text: 'Back Strength' },
  { src: 'https://www.cheatsheet.com/wp-content/uploads/2016/09/Cute-fit-girl-doing-physical-exercises-at-gym.jpg', text: 'Core Workout'},
  {src: 'https://myfitnessgear.co.uk/wp-content/uploads/2018/07/cant-feel-my-abs-working-when-doing-sit-ups-5.png', text: 'All Abs'}

];

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

const ListItems = () => {
  const icons = [
    flask,
    wifi,
    beer,
    football,
    basketball,
    paperPlane,
    americanFootball,
    boat,
    bluetooth,
    build
  ];

  const items = workoutItems.map(item => {
    return (
      <WorkoutImage key={item.text} src={item.src} text={item.text} />
    );
  });

  return <IonList>{items}</IonList>;
};

export default WorkoutListPage;

