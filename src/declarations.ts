export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export type WorkoutItem = {
  id: number;
  imgSrc: string;
  text: string; 
  exercises: Exercise[];
};

export type Exercise = {
  id: number;
  imgSrc: string;
  text: string;
};
