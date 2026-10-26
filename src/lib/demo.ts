import type { Trip } from '../types/trip';

// Diese drei Beispielreisen sind als Demo gekennzeichnet und lassen sich löschen.
export const demoTrips: Trip[] = [
  {
    id: 'demo-barcelona',
    title: 'Sommer in Barcelona',
    startDate: '2026-07-12',
    endDate: '2026-07-19',
    tag: 'Sommer',
    stops: [
      {
        id: 'barcelona',
        name: 'Barcelona',
        latitude: 41.3851,
        longitude: 2.1734,
        entries: [
          {
            id: 'barcelona-evening',
            title: 'Ein Abend über der Stadt',
            date: '2026-07-12',
            text: 'Die Aussicht über Barcelona, kleine Gassen und ein entspannter Abend am Meer.',
            photos: ['sample:barcelona'],
          },
        ],
      },
      {
        id: 'barcelona-sea',
        name: 'Barceloneta',
        latitude: 41.3784,
        longitude: 2.1925,
        entries: [],
      },
    ],
  },
  {
    id: 'demo-paris',
    title: 'Paris',
    startDate: '2025-12-18',
    endDate: '2025-12-21',
    tag: 'Winter',
    stops: [
      {
        id: 'paris',
        name: 'Paris',
        latitude: 48.8584,
        longitude: 2.2945,
        entries: [
          {
            id: 'paris-day',
            title: 'Winter in Paris',
            date: '2025-12-18',
            text: 'Einzigartige Aussicht vom Eiffelturm, gemütliche Spaziergänge entlang der Seine und ein Besuch in Montmartre – unvergessliche Tage in Paris.',
            photos: ['sample:paris', 'sample:paris-detail', 'sample:city'],
          },
        ],
      },
      {
        id: 'montmartre',
        name: 'Montmartre',
        latitude: 48.8867,
        longitude: 2.3431,
        entries: [],
      },
    ],
  },
  {
    id: 'demo-weekend',
    title: 'Wochenend-Trip',
    startDate: '2025-05-03',
    endDate: '2025-05-04',
    tag: 'Ausflug',
    stops: [
      {
        id: 'bern',
        name: 'Bern',
        latitude: 46.948,
        longitude: 7.4474,
        entries: [
          {
            id: 'bern-day',
            title: 'Ein Wochenende in Bern',
            date: '2025-05-03',
            text: 'Ein Spaziergang durch die Stadt und Zeit für neue Entdeckungen.',
            photos: ['sample:city'],
          },
        ],
      },
      { id: 'bern-end', name: 'Aare', latitude: 46.9419, longitude: 7.4497, entries: [] },
    ],
  },
];
