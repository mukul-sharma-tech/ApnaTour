import React from 'react';
import { Plane, Train, Bus, Car, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import HeaderHome from '../components/layout/HeaderHome';
import FooterHome from '../components/layout/FooterHome';
import TravelSearch from '../components/home/TravelSearch';
import FlightSearch from '../components/home/FlightSearch';
import TabNavigation from '../components/home/TabNavigation';
import Travel from '../components/home/Travel';
import Modal from '../components/home/Modal';
import { useState } from 'react';


interface HomePageProps {
  onPlaceSelect: (place: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPlaceSelect }) => {

  const destinations = [
    {
      id: 1,
      name: 'Uttarakhand',
      description: 'Land of Gods - Experience spiritual bliss and adventure in the Himalayas',
      image: 'https://images.unsplash.com/photo-1596599623428-87dbae5e7816?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Rajasthan',
      description: 'Royal heritage, vibrant culture, and endless desert adventures',
      image: 'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Kerala',
      description: 'God\'s Own Country - Backwaters, beaches, and ayurvedic traditions',
      image: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 4,
      name: 'Goa',
      description: 'Beaches, parties, and a laid-back coastal vibe',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      name: 'Leh-Ladakh',
      description: 'Breathtaking landscapes and a world of adventure',
      image: 'https://images.unsplash.com/photo-1593118845043-359e5f628214?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 6,
      name: 'Andaman & Nicobar Islands',
      description: 'Pristine beaches and exotic marine life',
      image: 'https://images.unsplash.com/photo-1579376254079-3a86c6cd6869?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const travelModes = [
    {
      icon: <Plane size={40} />,
      title: 'Flights',
      description: 'Compare prices across airlines',
      priceRange: '₹2,500 - ₹25,000'
    },
    {
      icon: <Train size={40} />,
      title: 'Trains',
      description: 'Book train tickets with ease',
      priceRange: '₹300 - ₹5,000'
    },
    {
      icon: <Bus size={40} />,
      title: 'Buses',
      description: 'Extensive bus network coverage',
      priceRange: '₹200 - ₹3,000'
    },
    {
      icon: <Car size={40} />,
      title: 'Car Rentals',
      description: 'Self-drive or with driver',
      priceRange: '₹1,000 - ₹5,000/day'
    },
  ];

  const hotels = [
    {
      name: 'Luxury Mountain Resort',
      location: 'Uttarakhand',
      price: '₹15,000/night',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Heritage Palace Hotel',
      location: 'Rajasthan',
      price: '₹20,000/night',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Beachfront Resort',
      location: 'Kerala',
      price: '₹12,000/night',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Desert Safari Resort',
      location: 'Rajasthan',
      price: '₹18,000/night',
      image: 'https://images.unsplash.com/photo-1694948188078-4fc7dc6c8a84?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Hilltop Resort',
      location: 'Goa',
      price: '₹14,000/night',
      image: 'https://images.unsplash.com/photo-1660703080906-f4ac0cb7ea43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Seaside Resort',
      location: 'Kerala',
      price: '₹13,500/night',
      image: 'https://images.unsplash.com/photo-1729606558813-1bda04fbb55c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const experiences = [
    {
      title: 'Spiritual Retreats',
      description: 'Find inner peace through meditation and yoga',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3Bpcml0dWFsfGVufDB8fDB8fHww'
    },
    {
      title: 'Adventure Sports',
      description: 'Thrilling activities in nature\'s playground',
      image: 'https://images.unsplash.com/photo-1689841667559-248614a3c9d4?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Cultural Tours',
      description: 'Immerse yourself in local traditions',
      image: 'https://images.unsplash.com/photo-1544588440-fc7551331160?q=80&w=2122&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Wildlife Safaris',
      description: 'Get close to nature and explore wildlife',
      image: 'https://plus.unsplash.com/premium_photo-1661963702972-bdb60a776acc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Beach Activities',
      description: 'Enjoy water sports and sunbathing by the beach',
      image: 'https://images.unsplash.com/photo-1617945174127-e47d409e47c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Mountain Trekking',
      description: 'Trek through the mountains and experience breathtaking views',
      image: 'https://plus.unsplash.com/premium_photo-1661833879387-1513bf753554?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div>
      {/* Hero Section */}
      <section id='home' className="relative h-screen">
        <HeaderHome />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="India Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover the Magic of India
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Explore incredible destinations, plan your journey, and create unforgettable memories
          </p>
          <div className="w-full max-w-md">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
                onChange={(e) => onPlaceSelect(e.target.value.toLowerCase())}
                defaultValue=""
              >
                <option value="" disabled>Select your destination</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="kerala">Kerala</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Modes Section */}
      {/* Travel Modes Section */}
      <section id='travelHome' className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Plan Your Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search and compare travel options between destinations
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500">
                    <option value="">Select departure</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="kolkata">Kolkata</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    onChange={(e) => onPlaceSelect(e.target.value.toLowerCase())}
                  >
                    <option value="">Select destination</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="kerala">Kerala</option>
                    <option value="goa">Goa</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <Button className="w-full h-[42px]">
                  Check Availability
                </Button>
              </div>
            </div>
          </div>

          {/* Travel Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelModes.map((mode, index) => (
              <Card key={index} hoverable>
                <CardContent>
                  <div className="text-accent-500 mb-4">{mode.icon}</div>
                  <CardTitle>{mode.title}</CardTitle>
                  <CardDescription>{mode.description}</CardDescription>

                  {/* Sample Availability */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Next available:</span>
                      <span className="font-medium">Today, 3:45 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">
                        {mode.title === 'Flights' ? '1h 30m' :
                          mode.title === 'Trains' ? '6h 15m' :
                            mode.title === 'Buses' ? '8h' : 'Varies'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Options
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Routes */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Routes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { from: 'Delhi', to: 'Uttarakhand', modes: ['Flight: 1h', 'Train: 6h', 'Road: 7h'] },
                { from: 'Mumbai', to: 'Goa', modes: ['Flight: 1h 15m', 'Train: 12h', 'Road: 14h'] },
                { from: 'Bangalore', to: 'Kerala', modes: ['Flight: 1h', 'Train: 10h', 'Road: 8h'] }
              ].map((route, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="font-medium text-primary-800">{route.from} → {route.to}</div>
                  <div className="mt-2 space-y-1">
                    {route.modes.map((mode, j) => (
                      <div key={j} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {mode}
                      </div>
                    ))}
                  </div>
                  <Button variant="link" size="sm" className="mt-2 px-0">
                    Compare prices →
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* Modal */}
        <div className="flex items-end">
          <Button 
            className="mt-[10px] mx-auto h-[42px] block"
            onClick={() => setIsModalOpen(true)}
          >
            Start Booking
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Book Your Travel"
          >
              <Travel />

          </Modal>
        </div>

      </section>

      {/* <TravelSearch />
      <FlightSearch/> */}
      {/* <TabNavigation/> */}
      {/* <Travel /> */}

      {/* Top Destinations Section */}
      <section id='destinationHome' className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Top Travel Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                hoverable
                onClick={() => onPlaceSelect(destination.name.toLowerCase())}
              >
                <CardImage
                  src={destination.image}
                  alt={destination.name}
                  className="h-48"
                />
                <CardContent>
                  <CardTitle>{destination.name}</CardTitle>
                  <CardDescription>{destination.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Hotels Section */}
      <section id='hotelHome' className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Recommended Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <Card key={index} hoverable>
                <CardImage
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-48"
                />
                <CardContent>
                  <CardTitle>{hotel.name}</CardTitle>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <p className="text-accent-500 font-semibold">{hotel.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Experiences Section */}
      <section id='attractionsHome' className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center">Explore Unique Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((experience, index) => (
              <Card key={index} hoverable>
                <CardImage
                  src={experience.image}
                  alt={experience.title}
                  className="h-48"
                />
                <CardContent>
                  <CardTitle>{experience.title}</CardTitle>
                  <CardDescription>{experience.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FooterHome />
    </div>
  );
};

export default HomePage;