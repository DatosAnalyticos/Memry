import React, {useContext, useState} from "react";
import { Plugins } from '@capacitor/core';
import { ItemsContext } from "../ItemsStore";
import {
	useIonViewWillEnter,
	IonAlert,
	IonActionSheet,
} from '@ionic/react';
import Item from '../components/Item';
const { Storage } = Plugins;

const RenderItems = ({callBack, collectionID}) => {
	const context = useContext(ItemsContext);
	const [showActionSheet, setShowActionSheet] = useState({status: false, id: null});
	const {state: {items}, dispatch} = context;
	const [isPromptVisible, setPromptVisible] = useState(false);
	
	// Get the Items from localStorage
	useIonViewWillEnter(() => {
		Storage.get({ key: collectionID }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (items.length < 1 || JSON.stringify(oldItemsJSON) !== JSON.stringify(items)) {
				dispatch({type: "SET_ITEMS", value: oldItemsJSON});
			}
		});
	})
	if (items.length < 1) {
		return <></>;
	}
	
	const alertProps = {
		isOpen: isPromptVisible,
		onDidDismiss: () => setPromptVisible(false),
		header: "Delete Card",
		message: "Are you sure you want to remove this card?",
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Okay',
				handler: async () => {
					const cardID = showActionSheet.id;
					const oldItems =  await Storage.get({ key: collectionID});
					const newItems = (oldItems.value ? JSON.parse(oldItems.value) : []);

					const filteredItems = newItems.filter((e, index) => String(index) !== String(cardID));
					Storage.set({key: collectionID, value: JSON.stringify(filteredItems)});

					dispatch({type: "SET_ITEMS", value: filteredItems});

					callBack({
						visible: true,
						message: "The Item is successfully removed."
					});
					setPromptVisible(false);
				}
			}
		]
	}

	return <>
		{items.map((data, index) => {
			return <Item key={index} data={data} id={index} callBack={setShowActionSheet} collectionID={collectionID}/>
		})}

		<IonAlert {...alertProps}/>
		<IonActionSheet 
			isOpen={showActionSheet.status}
			onDidDismiss={() => setShowActionSheet({status: false, collectionID: null})}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => console.log("Hi im delete function!")
				}, 
				{
					text: 'Flip',
					handler: () => console.log("Hi im flipping function")
				}, 
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {setShowActionSheet({status: false, collectionID: null})}
				}
			]}
		/>
	</>
}


export default RenderItems;