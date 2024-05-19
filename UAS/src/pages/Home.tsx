import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import logo from "./../gambar/solo.jpg";

const Home: React.FC = () => {
  const [username, setUsername] = useState(''); 

  const getUsernameFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUsername(userData.username || ''); 
  };

  useEffect(() => {
    getUsernameFromLocalStorage();
  }, []); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonAvatar slot="start" className="header-avatar">
            <img src={logo} alt="avatar" />
          </IonAvatar>
          <IonTitle>{username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <IonText>{username}</IonText>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
