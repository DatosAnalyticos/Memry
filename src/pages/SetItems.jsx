import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon
} from "@ionic/react";
import React from "react";
import {arrowBackOutline, addOutline} from 'ionicons/icons';
  
const SetItems = (props) => {
	return (
		<IonPage>
			<IonContent scrollEvents={false}>
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15}}>
					<IonButtons style={{display: "inline-block"}}>
						<IonBackButton defaultHref="home" text="" icon={arrowBackOutline}/>
					</IonButtons>
					<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
						<IonCardTitle style={{fontSize: "1.2em"}}>Set of Cards</IonCardTitle>
						<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>
							Available Cards
						</IonCardSubtitle>
					</div>	
				</IonToolbar>
				<div className="container">
					<span style={{color: "#c1c1c1"}}>No Available Item</span>	
				</div>
			</IonContent>
			<IonToolbar>
				<div style={{width: "fit-content", margin: "20px", float: "right"}}>
					<IonFabButton style={{display: "inline-block"}} onClick={() => props.history.push("/frontCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonToolbar>
		</IonPage>
	);	
};
export default SetItems;