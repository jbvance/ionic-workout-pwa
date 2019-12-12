import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

// GraphQL Imports
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// data type declarations
import { WorkoutItem } from '../declarations';

// import styles
import './WorkoutStartPage.css';

// GraphQL Query
const WORKOUT = gql`
  query workout ($id: ID!){
    workout(where: { id: $id }) {     
        id
        title
        image     
    }
  
  }
`;


const WorkoutStartPage: React.FC = () => {  
  const [workout, setWorkout] = useState();
  const [duration, setDuration] = useState(5);
  const [percentage, setPercentage] = useState(8.33);
  const { id } = useParams() || '';
  const minDuration = 5;
  const maxDuration = 60;

  useEffect(() => {
    //const workoutToSet = workoutList.find((item: WorkoutItem) => item.id.toString() === id);
    //setWorkout(workoutToSet);
  }, []);

  useEffect(() => {
    setPercentage((duration / 60) * 100);
  }, [duration]);

  const increaseDuration = () => {
    return duration < 60 ? setDuration(duration + 5) : setDuration(60);
  };
  const decreaseDuration = () => {
    return duration > 5 ? setDuration(duration - 5) : setDuration(5);
  };
  // console.log("ID", id);
  const { loading, error, data } = useQuery(WORKOUT, {
    variables: { id }
  });

 // if we get here, we can set the workout
 //console.log("WORKOUT", data);

  if (loading) {    
    return <IonPage><div>Loading...</div></IonPage>;
  }
  if (error) {   
    console.error(error); 
    return <IonPage><div>Error: {error.message}</div></IonPage>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{data.workout.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="workout-start-grid">
          <IonRow>
            <IonCol>{/* <IonImg  src={workout.imgSrc} /> */}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <CircularProgressbarWithChildren
                value={percentage}
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
                <div style={{ fontSize: 70 }}>{duration}</div>
                <div>Minutes</div>
              </CircularProgressbarWithChildren>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div
                style={{ textAlign: 'left', fontSize: 70, color: 'black' }}
                onClick={decreaseDuration}
              >
                <IonIcon
                  slot="start"
                  color={duration === 5 ? 'medium' : ''}
                  icon={removeCircleOutline}
                />
              </div>
            </IonCol>
            <IonCol>
              <div
                style={{ textAlign: 'right', fontSize: 70, color: 'black' }}
                onClick={increaseDuration}
              >
                <IonIcon
                  slot="start"
                  color={duration === 60 ? 'medium' : ''}
                  icon={addCircleOutline}
                />
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8" offset="2">
              <Link to={`/home/workouts/${id}/${duration}/go`}>
                <IonButton
                  style={{ textTransform: 'uppercase' }}
                  expand="full"
                  fill="solid"
                >
                  Begin Workout
                </IonButton>
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WorkoutStartPage;
