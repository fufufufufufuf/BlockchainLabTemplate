import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonAvatar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import logo from "./../gambar/solo.jpg";
import './Admin.css'; // Import file CSS untuk styling khusus Admin
import { useHistory } from 'react-router-dom';

const Admin: React.FC = () => {
  const history = useHistory();

  const handleVotingResult = () => {
    history.push('/result');
  };

  const handleManageUsers = () => {
    history.push('/manage');
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="avatar-container">
          <IonAvatar className="admin-avatar">
            <img src={logo} alt="avatar" />
          </IonAvatar>
        </div>
        <IonList>
          <IonItem>
            <IonLabel>Username: admin</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Email: admin@gmail.com</IonLabel>
          </IonItem>
        </IonList>
        <IonGrid>
          <IonRow className='tombol'>
            <IonCol>
              <IonButton expand="block" onClick={handleVotingResult}>Voting Results</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={handleManageUsers}>Manage Users</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="logout-container">
          <IonButton expand="block" onClick={handleLogout}>Log Out</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
