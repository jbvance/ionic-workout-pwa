import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

/* GraphQL Imports */
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

import Menu from './components/Menu';
import Home from './pages/Home';
import List from './pages/List';
import WorkoutListPage from './pages/WorkoutListPage';
import WorkoutStartPage from './pages/WorkoutStartPage';
import WorkoutPage from './pages/WorkoutPage';
import { home, list, fitness } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'List',
    url: '/home/list',
    icon: list
  },
  {
    title: 'Workouts',
    url: '/home/workouts',
    icon: fitness
  }
];

const client = new ApolloClient({
  uri: 'http://port-4444.ionic-workout-jbvance924063.codeanyapp.com',
});

const App: React.FC = () => {
  return (
  <ApolloProvider client={client}>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonRouterOutlet id="main">
            <Route path="/home" component={WorkoutListPage} exact={true} />
            <Route path="/home/list" component={List} exact={true} />
            <Route
              path="/home/workouts"
              component={WorkoutListPage}
              exact={true}
            />
            <Route path="/home/workouts/:id" component={WorkoutStartPage} exact={true} />
            <Route path="/home/workouts/:id/:duration/go" component={WorkoutPage} exact={true} />
            <Route path="/" render={() => <Redirect to="/home" exact={true} />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </ApolloProvider>
)};

export default App;
