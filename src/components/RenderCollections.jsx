import React, {useContext, useState} from 'react'
import { Plugins } from '@capacitor/core';
import CollectionItems from './CollectionItems';
import { GlobalContext } from '../context/GlobalStore';
import { useIonViewWillEnter, IonActionSheet, IonAlert } from '@ionic/react';

const { Storage } = Plugins;

const RenderCollections = () => {
	const context = useContext(GlobalContext);
	const [showActionSheet, setShowActionSheet] = useState({status: false, id: null});
	const [showPrompt, setShowPrompt] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const {state: {collection}, dispatch} = context;

	useIonViewWillEnter(() => {
		Storage.get({key: "collections"}).then((collections) => {
			const collectionsJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);


			if (collection.length < 1 || JSON.stringify(collectionsJSON) !== JSON.stringify(collection)) {
				dispatch({ type: "SET_COLLECTION", value: collectionsJSON });
			}

		})
	});

	if (collection.length < 1) {
		return <></>
	}

	const promptProps = {
		isOpen: showPrompt,
		onDidDismiss: () => setShowPrompt(false),
		header: "Delete Collection",
		message: "Are your sure you want remove this Collection? ",
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setShowPrompt(false)
			},
			{
				text: 'Okay',
				handler: async () => {
					// Delete workspace
					const collections = await Storage.get({key: 'collections'});
					const newCollectionJSON = (collections.value) ? JSON.parse(collections.value) : [];
					const filteredCollections = newCollectionJSON.filter((e, i) => String(i) !== String(showActionSheet.id));
					Storage.remove({key: showActionSheet.id});
					Storage.set({key: 'collections', value: JSON.stringify(filteredCollections)});
					dispatch({type: "SET_COLLECTION", value: filteredCollections, toast_visible: true, toast_message: "Collection is successfully removed."});
				}
			}
		]
	}

	const alertProps = {
		isOpen: showAlert,
		onDidDismiss: () => setShowAlert(false),
		header: "Edit Collection",
		inputs: [
			{
				name: 'title',
				type: 'text',
				placeholder: 'Enter your collection title here...'
			}
		],
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setShowAlert(false)
			},
			{
				text: 'Ok',
				handler: async (data) => {
					// Edit Workspace
					const collectionID = showActionSheet.id;
					const newCollectionTitle = data.title;

					const collections = await Storage.get({ key: 'collections' });
					const collectionJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : 
					JSON.parse(collections.value)
					
					let updatedCollections;

					if ( collectionID !== "undefined") {
						collectionJSON[collectionID] = newCollectionTitle;
						updatedCollections = collectionJSON;
					}

					await Storage.set({ key: 'collections', value: JSON.stringify(updatedCollections)});
					dispatch({ type: "SET_COLLECTION", value: updatedCollections, toast_visible: true, toast_message: "Collection is successfully saved."});
				}
			}
		]
	}

	return <>
		{collection.map((data, index) => {
			return <CollectionItems key={index} data={data} id={index} callBack={setShowActionSheet}/>
		})}

		<IonAlert {...promptProps}/>
		<IonAlert {...alertProps}/>
		<IonActionSheet
			isOpen={showActionSheet.status}
			onDidDismiss={() => setShowActionSheet({status: false, id: null})}
			buttons={[
				{
					text: 'Delete',
					role: 'destructive',
					handler: () => {setShowPrompt(true)}
				}, 
				{
					text: 'Update',
					handler: () => {setShowAlert(true)}
				}, 
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {setShowActionSheet({status: false, collectionID: null})}
				}
			]}
		>
		</IonActionSheet>
	</>;
}

export default RenderCollections;
