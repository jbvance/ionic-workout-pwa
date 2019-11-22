import React from 'react';
import { IonImg } from '@ionic/react';
import './WorkoutImage.css';

interface ItemProps {
src: string;
text: string;
};

const WorkoutImage: React.SFC<ItemProps> = (props: ItemProps) => {

  return (    
    <div className="container">
       <IonImg src={props.src} />
      <div className="centered">{props.text}</div>      
    </div>         
  );
};

export default WorkoutImage;