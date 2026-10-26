import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Trip } from '../types/trip';
import { loadTrips, removeTrip, writeTrip } from '../lib/database';
import { deletePhoto, keepPhoto } from '../lib/photos';
import { tripPhotos } from '../lib/trip-utils';

type TripContextValue = {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  saveTrip: (trip: Trip) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
};
const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function reload() {
    return loadTrips()
      .then((loaded) => {
        setTrips(loaded);
        setError(null);
      })
      .catch(() =>
        setError('Deine Reisen konnten nicht geladen werden. Bitte versuche es erneut.'),
      )
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    void reload();
  }, []);

  async function saveTrip(trip: Trip) {
    const previous = trips.find((item) => item.id === trip.id);
    const copiedFiles: string[] = [];
    let saved: Trip;
    try {
      saved = JSON.parse(JSON.stringify(trip)) as Trip;
      for (const stop of saved.stops) {
        for (const entry of stop.entries) {
          const permanentPhotos: string[] = [];
          for (const uri of entry.photos) {
            const permanent = await keepPhoto(uri);
            if (permanent !== uri) copiedFiles.push(permanent);
            permanentPhotos.push(permanent);
          }
          entry.photos = permanentPhotos;
        }
      }
      await writeTrip(saved);
    } catch (error) {
      copiedFiles.forEach(deletePhoto);
      throw error;
    }
    // Erst nach erfolgreichem Speichern die sichtbare Liste aktualisieren.
    setTrips((current) => [...current.filter((item) => item.id !== saved.id), saved]);
    const retained = new Set(tripPhotos(saved));
    if (previous)
      tripPhotos(previous)
        .filter((uri) => !retained.has(uri))
        .forEach(deletePhoto);
  }

  async function deleteTrip(id: string) {
    await removeTrip(id);
    const old = trips.find((trip) => trip.id === id);
    setTrips((current) => current.filter((trip) => trip.id !== id));
    if (old) tripPhotos(old).forEach(deletePhoto);
  }

  return (
    <TripContext.Provider value={{ trips, loading, error, reload, saveTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (!context)
    throw new Error('useTrips muss innerhalb von TripProvider verwendet werden.');
  return context;
}
