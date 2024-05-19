import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonAvatar, IonGrid, IonRow, IonCol } from '@ionic/react';
import logo from "./../gambar/solo.jpg";
import './Org1.css'; 
import { useHistory } from 'react-router-dom';

const Org1: React.FC = () => {
  const history = useHistory();

  const handleVotingResult = () => {
    history.push('/results'); 
  };

  const handleCreateVoting = () => {
    history.push('/create-voting'); 
  };

  const handleViewCandidates = () => {
    history.push('/kandidates'); 
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonAvatar slot="start" className="header-avatar">
            <img src={logo} alt="avatar" />
          </IonAvatar>
          <IonTitle>Organizer 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding content-container">
        <IonGrid>
          <IonRow className='tengah'>
            <IonCol className="ion-text-center">
              <IonButton expand="block" onClick={handleVotingResult}>Voting Results</IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton expand="block" onClick={handleCreateVoting}>Create Voting</IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton expand="block" onClick={handleViewCandidates}>View Candidates</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="logout-container">
          <IonButton expand="block" onClick={handleLogout} className="logout-button">Log Out</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Org1;
