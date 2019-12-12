export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export type WorkoutItem = {
  id: number;
  title: string;
  imgage: string;  
  exercises: Exercise[];
};

export type Exercise = {
  id: number;
  title: string;
  description: string
  image: string;  
};
