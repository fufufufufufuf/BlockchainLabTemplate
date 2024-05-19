import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonInput, IonItem, IonLabel, IonList, IonFooter, IonTextarea, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './CVoting.css'; 

const CVoting: React.FC = () => {
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateNIM, setCandidateNIM] = useState('');
  const [candidateProdi, setCandidateProdi] = useState('');
  const [candidateVM, setCandidateVM] = useState('');
  const [candidateImage, setCandidateImage] = useState<File | undefined>(undefined); // Added state for candidate image
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const history = useHistory();

  const isCandidateModalSubmitEnabled = candidateName !== '' && candidateNIM !== '' && candidateProdi !== '' && candidateVM !== '' && candidateImage !== undefined;
  const isDeadlineModalSubmitEnabled = deadlineDate !== '' && deadlineTime !== '';

  const handleCandidateSubmit = () => {
    console.log('Candidate Name:', candidateName);
    console.log('NIM:', candidateNIM);
    console.log('Prodi:', candidateProdi);
    console.log('Visi & Misi:', candidateVM);
    console.log('Image:', candidateImage?.name);
    setShowCandidateModal(false);
  };

  const handleDeadlineSubmit = () => {
    console.log('Deadline Date:', deadlineDate);
    console.log('Deadline Time:', deadlineTime);
    setShowDeadlineModal(false);
  };

  const handleFinalSubmit = () => {
    console.log('Final Submission');
    history.push('org1');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Voting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className='button'>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={() => setShowCandidateModal(true)}>Kandidat</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={() => setShowDeadlineModal(true)}>Deadline</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showCandidateModal} onDidDismiss={() => setShowCandidateModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Enter Candidate Details</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput value={candidateName} onIonChange={e => setCandidateName(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">NIM</IonLabel>
                <IonInput value={candidateNIM} onIonChange={e => setCandidateNIM(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Prodi</IonLabel>
                <IonInput value={candidateProdi} onIonChange={e => setCandidateProdi(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Visi & Misi</IonLabel>
                <IonTextarea value={candidateVM} onIonChange={e => setCandidateVM(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Image</IonLabel>
                <input type="file" accept="image/*" onChange={e => setCandidateImage(e.target.files?.[0])} />
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter>
            <IonButton expand="block" onClick={handleCandidateSubmit} disabled={!isCandidateModalSubmitEnabled}>Done</IonButton>
          </IonFooter>
        </IonModal>
        <IonModal isOpen={showDeadlineModal} onDidDismiss={() => setShowDeadlineModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Enter Deadline</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonInput type="date" value={deadlineDate} onIonChange={e => setDeadlineDate(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Time</IonLabel>
                <IonInput type="time" value={deadlineTime} onIonChange={e => setDeadlineTime(e.detail.value!)} />
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter>
            <IonButton expand="block" onClick={handleDeadlineSubmit} disabled={!isDeadlineModalSubmitEnabled}>Done</IonButton>
          </IonFooter>
        </IonModal>
        <IonButton className='submit'expand="block" onClick={handleFinalSubmit} disabled={!isCandidateModalSubmitEnabled || !isDeadlineModalSubmitEnabled}>Submit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CVoting;
