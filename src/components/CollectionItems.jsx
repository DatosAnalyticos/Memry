import {
	IonCardContent,
	IonCol,
	IonCardTitle,
	IonIcon
} from "@ionic/react";
import React from "react";
import { addSharp, albumsOutline} from "ionicons/icons";

const CollectionItems = () => {
	return (
		<IonCol size="6">
			<div style={{boxShadow: "none", paddingBottom: "58%", height: 0, backgroundColor: "#B0E7FF", borderRadius: "10px", position: "relative"}}>
				<div style={{display: "inline-block", margin: "auto", height: "inherit"}}>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "12px", color: "#236B8A"}}>
							Collection 1
						</IonCardTitle>
					</IonCardContent>
					<div style={{display: "flex", position: "absolute", width: "100%", bottom: "10px"}}>
						<div style={{ display: "flex", padding: "1px", paddingRight: "20px", background: "#E5E5E5", marginLeft: "4px", borderRadius: "15px", marginTop: "4px", color:"#575757", position: "relative", zIndex: "2", width: "calc(100% - 45px)"}}>
							<div style={{marginTop: "2px", marginLeft: "2px"}}>
								<IonIcon icon={addSharp} style={{fontSize: "8px", float: "left", fontWeight: "bold"}}/>
								<span style={{fontSize:"6px", lineHeight: "9px", float: "left"}}>MemPoints: 10/100</span>
							</div>
							<div style={{position: "absolute", backgroundColor: "#DD6363", width: "50%", height: "88%", borderRadius: "5px", zIndex: "-1"}}></div>
						</div>
						<div style={{display: "flex", marginLeft: "auto", backgroundColor: "#B7B0FF", width: "30px", padding: "2px", borderRadius: "8px 0 0 8px", color: "#656290"}}>
							<IonIcon icon={albumsOutline} style={{fontSize: "12px", paddingLeft: "4px"}} />
							<span style={{fontSize:"10px", paddingLeft: "4px"}}>4 </span>
						</div>
					</div>
				</div>
			</div>
		</IonCol>
	)
}

export default CollectionItems