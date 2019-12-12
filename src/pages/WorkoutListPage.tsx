import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import WorkoutImage from '../components/WorkoutImage';

import { WorkoutItem } from '../declarations';


//import dummy data
import workoutItems from '../data/workoutItems';

const EXERCISES = gql`
  {
    workouts 
    {
      id
      title
      image
    }
  }
`;

const ListItems = (props: any) => {
  console.log("PROPS", props);
 
  const items = props.items.map((item: any) => {
    return (
      <IonItem key={item.id}>
       <Link to={`/home/workouts/${item.id}`}>
          <WorkoutImage src={item.image} text={item.title} />
        </Link>      
      </IonItem>
    );
  });

  return <IonList>{items}</IonList>;
};

const WorkoutListPage: React.FC = () => {
  const { loading, error, data } = useQuery(EXERCISES);
  if(loading) return <div>...LOADING</div>
  if(error) {
    console.log(error);
    return <div>Error: error.message</div>
  }
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
       <ListItems items={data.workouts}/>
      </IonContent>
    </IonPage>
  );
};


export default WorkoutListPage;

