import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';

const WorkoutStartPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>SPECIFIC WORKOUT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div>Content here</div>
      </IonContent>
    </IonPage>
  );
};


export default WorkoutStartPage;