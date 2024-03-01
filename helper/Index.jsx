export const DATA = [
  {
    key: 0,
    value:
      "Trouvez des concerts, créez des moments. Avec KokoEvent, réservez vos billets pour des concerts uniques.",
    url: "https://img.freepik.com/photos-gratuite/personnes-prenant-part-evenement-haut-protocole_23-2150951243.jpg?w=996&t=st=1707391380~exp=1707391980~hmac=8256d50f8a5d77a1504b327f5d0c411cca19255b91f06ea825b311bd0d30af9b",
  },
  {
    key: 1,
    value:
      "Trouvez des concerts, créez des moments. Avec KokoEvent, réservez vos billets pour des concerts uniques.",
    url: "https://img.freepik.com/photos-gratuite/personnes-prenant-part-evenement-haut-protocole_23-2150951243.jpg?w=996&t=st=1707391380~exp=1707391980~hmac=8256d50f8a5d77a1504b327f5d0c411cca19255b91f06ea825b311bd0d30af9b",
  },
  {
    key: 2,
    value:
      "Planifiez des réunions, connectez-vous. KokoEvent simplifie la coordination. Créez des événements  pour travailler ou discuter, en privé ou en public.",
    url: "https://img.freepik.com/photos-gratuite/diverses-personnes-dansent-dansent-ensemble-lors-soiree-discotheque-dans-discotheque-jeunes-amis-se-tenant-main-chantant-se-relaxant-piste-danse-bondee-lors-rassemblement-social_482257-67151.jpg?w=996&t=st=1707391438~exp=1707392038~hmac=9a8e241e230d34100e95d1a1b38ba9af8b30b8bb4b836ae7eec5457dbb0ecf27",
  },
  {
    key: 3,
    value:
      "Célébrez avec style, célébrez avec KokoEvent. Créez des fêtes personnalisées pour chaque occasion. Que ce soit public ou privé, partagez des moments inoubliables avec vos proches",
    url: "https://img.freepik.com/photos-gratuite/personnes-prenant-part-evenement-haut-protocole_23-2150951415.jpg?w=740&t=st=1707392368~exp=1707392968~hmac=feb369f08153fb381005dfeddad70c6394ecb5454c6b3adbf04f641a23a8033b",
  },
];
export const INTERESTS = [
  { check: false, label: "Culture" },
  { check: false, label: "Sport" },
  { check: false, label: "Gastronomie" },
  { check: false, label: "Education" },
  { check: false, label: "Jeux vidéos" },
  { check: false, label: "Musique" },
  { check: false, label: "Littérature" },
  { check: false, label: "Science" },
  { check: false, label: "Exposition" },
  { check: false, label: "Autre" },
];

export const CATEGORES_EVENTS = [
  { key: 0, label: "Sports" },
  { key: 1, label: "Conferences" },
  { key: 2, label: "Expos" },
  { key: 3, label: "Concerts" },
  { key: 4, label: "Festivals" },
  { key: 5, label: "Performing Arts" },
  { key: 6, label: "Community" },
];

export const TICKET_EVENTS = [
  { key: 0, title: "VIP", label: "Accès exclusif pour nos VIP" },
  { key: 1, title: "STANDARD", label: "Accès privélégié à l'evènement" },
];

export const EVENT_PUBLIC =[
  { key: 0, title: "Sport",  },
  { key: 1, title: "Conférence",  },
  { key: 2, title: "Expo",  },
  { key: 3, title: "Concert",  },
  { key: 4, title: "Festival",  },
  { key: 5, title: "Performing Arts",  },
  { key: 6, title: "Community",  },
  { key: 7, title: "Autre",  },
  
]
export const EVENT_PRIVATE =[
  { key: 0, title: "Soirée déguisée",  },
  { key: 1, title: "Ateliers culinaires",  },
  { key: 2, title: "Activités culturelles",  },
  { key: 3, title: "Activités en plein air",  },
  { key: 4, title: "Sportives",  },
  { key: 5, title: "Voyage",  },
  { key: 6, title: "Pique-nique",  },
  { key: 7, title: "Jeux vidéo",  },
  { key: 8, title: "Plateformes de streaming",  },
  { key: 9, title: "Autre",  },
 
  
]
export const TYPE_EVENT =[
  {key:0, title:"Privé"},
  {key:1, title:"Public"},
]
export const STATUS_BILLETS =[{
  key:1, status:"Payant",
  
},{Key:2 , status:"Gratuit"}]
export const onBirthDateChange = (event, selectedDate) => {

  const currentDate = selectedDate || new Date(2000, 0, 1);
  if (Platform.OS === "android") {
/*     setShowDatePicker(false); */
  }
  return currentDate

};
