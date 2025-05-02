import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TravelModesSection from '../components/home/TravelModesSection';
import AttractionsSection from '../components/home/AttractionsSection';
import AccommodationsSection from '../components/home/AccommodationsSection';
import LocalInfoSection from '../components/home/LocalInfoSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Props {
  setSelectedPlace: (place: string | null) => void;
}

const UttarakhandPage: React.FC<Props> = ({ setSelectedPlace }) => {
  const goHome = () => setSelectedPlace(null);

  return (
    <>
      <Header goHome={goHome} />
      <HeroSection />
      <TravelModesSection />
      <AttractionsSection />
      <AccommodationsSection />
      <LocalInfoSection />
      <Footer />
    </>
  );
};

export default UttarakhandPage;
