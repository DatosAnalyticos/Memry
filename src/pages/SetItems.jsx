import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon,
	IonCardContent,
	IonGrid,
	IonCol
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
				<IonGrid>
					<IonCol size="6">
						<div className="card__face--front" style={{ height: "235px", width: "135px", borderRadius: "5px"}}>
							{/* <IonCardContent>
								<IonCardTitle></IonCardTitle>
							</IonCardContent> */}
						</div>
					</IonCol>
					<IonCol size="6">
						<div className="card__face--front" style={{ height: "235px", width: "135px", borderRadius: "5px"}}>
							{/* <IonCardContent>
								<IonCardTitle></IonCardTitle>
							</IonCardContent> */}
						</div>
					</IonCol>
				</IonGrid>
				<div style={{width: "fit-content", position: "absolute", bottom: 10, right: 10}}>
					<IonFabButton style={{display: "inline-block"}} onClick={() => props.history.push("/crudCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonContent>
		</IonPage>
	);
};
export default SetItems;