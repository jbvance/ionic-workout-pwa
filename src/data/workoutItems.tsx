import { WorkoutItem } from '../declarations';

const workoutItems: WorkoutItem[] = [
  { 
    id: 1,
    imgSrc: 'https://app-images-jv.s3.us-east-2.amazonaws.com/female-plank-1.jpg', 
    text: 'Back Strength',   
     exercises: [
      {
        id: 1,
        imgSrc: 'https://cmeimg-a.akamaihd.net/640/ppds/1d878326-f44c-469a-979b-7669ee1b57d1.gif',
        text: 'Sit-Ups'
      },
      {
        id: 2,
        imgSrc: 'https://i.pinimg.com/originals/d8/76/16/d87616d4b21e886f009b24fe66db69d6.gif',
        text: 'Bicycle Crunches'
      }
    ]
  },
  { 
    id: 2,
    imgSrc: 'https://app-images-jv.s3.us-east-2.amazonaws.com/female-crunch-1.jpg', 
    text: 'Core Workout',   
     exercises: [
      {
        id: 1,
        imgSrc: 'https://cmeimg-a.akamaihd.net/640/ppds/1d878326-f44c-469a-979b-7669ee1b57d1.gif',
        text: 'Sit-Ups'
      },
      {
        id: 2,
        imgSrc: 'https://i.pinimg.com/originals/d8/76/16/d87616d4b21e886f009b24fe66db69d6.gif',
        text: 'Bicycle Crunches'
      },
      {
        id: 3,
        imgSrc: 'https://sporteluxe.com/wp-content/uploads/2017/12/plank-jacks.gif',
        text: 'Plank Jacks'
      },
      {
        id: 4,
        imgSrc: 'https://i.imgur.com/eotOxLd.gif',
        text: 'Flutter Kicks'
      },
      {
        id: 5,
        imgSrc: 'https://i.imgur.com/OrUga8Z.gif',
        text: 'Plank'
      }
    ]
  },
  {
    id: 3,
    imgSrc: 'https://app-images-jv.s3.us-east-2.amazonaws.com/female-abs-1.png', 
    text: 'All Abs',
    exercises: [
      {
        id: 1,
        imgSrc: 'https://cmeimg-a.akamaihd.net/640/ppds/1d878326-f44c-469a-979b-7669ee1b57d1.gif',
        text: 'Sit-Ups'
      },
      {
        id: 2,
        imgSrc: 'https://i.pinimg.com/originals/d8/76/16/d87616d4b21e886f009b24fe66db69d6.gif',
        text: 'Bicycle Crunches'
      }
    ]
  }

];

export default workoutItems;