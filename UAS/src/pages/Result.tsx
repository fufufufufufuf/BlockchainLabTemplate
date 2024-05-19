import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { Doughnut } from 'react-chartjs-2';

const Result: React.FC = () => {
  // Contoh data untuk diagram donat
  const data = {
    labels: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Result</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Voting Results</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <Doughnut data={data} />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Detail</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Pilihan A: 300 suara</p>
            <p>Pilihan B: 50 suara</p>
            <p>Pilihan C: 100 suara</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Result;
