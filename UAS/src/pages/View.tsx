import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

interface CandidateProps {
  name: string;
  nim: string;
  prodi: string;
  visiMisi: string;
}

const View: React.FC<CandidateProps> = ({ name, nim, prodi, visiMisi }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Candidate Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>NIM: {nim}</p>
            <p>Prodi: {prodi}</p>
            <p>Visi & Misi: {visiMisi}</p>
          </IonCardContent>
        </IonCard>
        <IonButton expand="block" routerLink="/org1">Back</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default View;
