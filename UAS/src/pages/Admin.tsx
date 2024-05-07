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
    // Lakukan proses logout, seperti membersihkan data sesi atau menyimpan status logout
    // Kemudian navigasikan pengguna kembali ke halaman login
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
            <IonLabel>Email: admin@example.com</IonLabel>
          </IonItem>
          {/* Add more user information as needed */}
        </IonList>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleVotingResult}>Voting Results</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={handleManageUsers}>Manage Users</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={handleLogout}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
