import { 
	IonContent,
	IonPage, 
	IonToolbar, 
	IonIcon, 
	IonCardTitle, 
	IonButtons, 
	IonBackButton, 
	IonAlert, 
	useIonViewWillEnter, 
	IonHeader, 
	IonRippleEffect, 
	// IonSelect,IonSelectOption,
} from '@ionic/react';

import React, {useState, useContext} from 'react';
import {arrowBackOutline, trashOutline} from 'ionicons/icons';
import { GlobalContext } from "../../context/GlobalStore";
import { Plugins } from '@capacitor/core';
import { generateCardProps, generateReducer, generatePromptProps, generateAlertProps}  from "./SetupCardProcessor";

import './SetupCard.css';
import '../Play.css';
import { PageRoutes } from '../../vanilla/PageRoutes';
import Card from './Card';

const { Storage } = Plugins;

export const RATE_YOUR_SELF = 0;
export const TYPE_THE_ANSWER = 1;

const SetupCard = (props) => {
	// Native JS
	const {id} = props.match.params;
	const {collectionID} = props.match.params;
	
	const updateMode = (typeof id !== "undefined");
	const DEFAULT_CARD_STATE = {
		front: null,
		back: null,
		type: RATE_YOUR_SELF
	};

	// Hooks
	const {dispatch} = useContext(GlobalContext);
	const [cardDetail, setCardDetail] = useState(DEFAULT_CARD_STATE);

	const [pageConfig, setPageConfig] = useState({
		cardFlipped: false,
		confirmDeleteShown: false,
		cardInputShown: false
	});

	const reducer = generateReducer({setPageConfig, pageConfig, DEFAULT_CARD_STATE, setCardDetail, cardDetail, props, collectionID});

	useIonViewWillEnter(() => {
		if (!updateMode)
			reducer({type: "RESET_CARD"});

		reducer({type: "UNFLIP_CARD"});

		Storage.get({ key: collectionID }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (!oldItemsJSON || !oldItemsJSON.hasOwnProperty(id))
				return;

			reducer({type: "SET_CARD_DETAILS", val: oldItemsJSON[id]});
		});
	});

	// Function to flip the card
	const alertProps = generateAlertProps({pageConfig, reducer, dispatch});
	const promptProps = generatePromptProps({pageConfig, reducer, id, dispatch});
	const createCardProps = generateCardProps({cardDetail, reducer, id, collectionID, dispatch});

	return (
	<IonPage >
		<IonContent style={{"--overflow": "hidden"}} scrollEvents={true}>
			<IonHeader>
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15, height: "50px", color: "#7D7D7D"}}>
					<IonButtons slot="start">
						<IonBackButton defaultHref={PageRoutes.homepage} text="" icon={arrowBackOutline} style={{color: "inherit"}} />
					</IonButtons>
					<IonCardTitle style={{fontSize: "1.2em", color: "inherit", position: "absolute", left: "43px", lineHeight: "21px", display: "flex", alignItems: "center", top: 0, bottom: 0}}>
						{updateMode ? "Update card": "Create new card"}
					</IonCardTitle>

					{
						updateMode && (
							<div 
								slot="end"
								className="ion-activatable"
								style={{position: "relative", padding: "5px", marginRight: "5px"}} 
								onClick={() => reducer({type: "SHOW_DELETE_CONFIRMATION"})}
							>
								<IonIcon icon={trashOutline} style={{color: "inherit", height: "20px", width: "20px"}} />
								<IonRippleEffect type="unbounded"></IonRippleEffect>
							</div>
						)
					}
				</IonToolbar>
			</IonHeader>
			{/* 
			NOTE: An idea to be added in the future, do not remove without notice
			<div style={{border: "1px solid #DBDDE0", borderRadius: "8px", width: "165px", margin: "auto"}}>
				<IonSelect 
					cancelText="Nah"
					okText="Select it!"
					value={cardDetail.type}
					placeholder="Select One"
					onIonChange={e => reducer({type: "SET_CARD_TYPE", val: e.detail.value})}
				>
					<IonSelectOption value={RATE_YOUR_SELF} >Rate-yourself</IonSelectOption>
					<IonSelectOption value={TYPE_THE_ANSWER}>Type-the-answer</IonSelectOption>
				</IonSelect>
			</div>
			
			*/}
			
			{
				(cardDetail.type === TYPE_THE_ANSWER) ?
					<Card.TypeTheAnswer {...{pageConfig, reducer, updateMode, cardDetail, createCardProps}} />
				:
					<Card.RateYourself {...{pageConfig, reducer, updateMode, cardDetail, createCardProps}}  />
			}

		</IonContent>
		
		<IonAlert {...alertProps}/>
		<IonAlert {...promptProps} />
	</IonPage>
	);
};

export default SetupCard;