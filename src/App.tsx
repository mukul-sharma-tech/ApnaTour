import React, { useState } from 'react';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import UttarakhandPage from './pages/UttarakhandPage';

function App() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <main>
        {selectedPlace === 'uttarakhand' ? (
          <UttarakhandPage setSelectedPlace={setSelectedPlace} />
        ) : (
          <HomePage onPlaceSelect={(place) => setSelectedPlace(place)} />
        )}
      </main>
    </div>
  );
}

export default App;
