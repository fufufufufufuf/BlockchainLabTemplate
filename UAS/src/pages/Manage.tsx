import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Manage: React.FC = () => {
  const history = useHistory();
  const handleSave = () => {
    history.push('/admin');
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Manage Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonSelect label="Pilih Prodi User" label-placement="floating">
                    <IonSelectOption value="informatika">Informatika</IonSelectOption>
                    <IonSelectOption value="sistem informasi">Sistem Informasi</IonSelectOption>
                    <IonSelectOption value="teknik komputer">Teknik Komputer</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol size="6">
                  <IonSelect label="Pilih Organizer" label-placement="floating">
                    <IonSelectOption value="organizer1">Organizer 1</IonSelectOption>
                    <IonSelectOption value="organizer2">Organizer 2</IonSelectOption>
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleSave}>Verify</IonButton>
      </IonContent>
    </IonPage>
  );
};


export default Manage;
