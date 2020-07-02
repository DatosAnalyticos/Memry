import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {PageRoutes} from "./vanilla/PageRoutes";
import Play from './pages/Play';
import CardList from './pages/CardList';
import SetupCard from './pages/SetupCard';
import Collections from './pages/Collections/';

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

/* Global CSS */
import './global.css';
import Completed from './pages/Completed';
import GlobalStore from './context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

// Hide the splash (you should do this on app launch)
SplashScreen.hide();

// Setup config
setupConfig({
	mode: 'ios'
});

const App = () => (
	<GlobalStore>
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path={PageRoutes.collections} component={Collections} exact={true} />
					<Route path={`${PageRoutes.play}/:collection_id/:difficulty`} component={Play} exact={true} />
					<Route path={PageRoutes.card_list} component={CardList} exact={true} />
					<Route path={`${PageRoutes.card_list}/:collectionID`} component={CardList} />
					<Route path={`${PageRoutes.completed}/:count`} component={Completed} exact={true} />
					<Route path={`${PageRoutes.setup_card}/:collectionID`} component={SetupCard} exact={true} />
					<Route path={`${PageRoutes.setup_card}/:collectionID/:id`} component={SetupCard}/>
					<Route exact path="/" render={() => <Redirect to={PageRoutes.collections} />} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	</GlobalStore>
);

export default App;
