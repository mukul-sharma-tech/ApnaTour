import React, { useState } from 'react';
import Card, { CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Star, MapPin, Filter } from 'lucide-react';

interface Accommodation {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  pricePerNight: number;
  rating: number;
  category: 'budget' | 'mid-range' | 'luxury';
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: 'Himalayan Retreat',
    location: 'Rishikesh',
    description: 'Serene riverside resort with yoga facilities and panoramic mountain views.',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 3500,
    rating: 4.7,
    category: 'mid-range'
  },
  {
    id: 2,
    name: 'Alpine Luxury Lodge',
    location: 'Mussoorie',
    description: 'Luxury mountain lodge with colonial architecture and premium amenities.',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 8500,
    rating: 4.9,
    category: 'luxury'
  },
  {
    id: 3,
    name: 'Lakeside Inn',
    location: 'Nainital',
    description: 'Cozy hotel with stunning views of Naini Lake and convenient location.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 2800,
    rating: 4.3,
    category: 'budget'
  },
  {
    id: 4,
    name: 'Wildflower Resort',
    location: 'Jim Corbett',
    description: 'Eco-friendly resort at the edge of Jim Corbett National Park with wildlife experiences.',
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 5200,
    rating: 4.6,
    category: 'mid-range'
  },
  {
    id: 5,
    name: 'Deodar Valley Homestay',
    location: 'Almora',
    description: 'Authentic Kumaoni experience with homemade meals and cultural activities.',
    image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 1800,
    rating: 4.8,
    category: 'budget'
  },
  {
    id: 6,
    name: 'The Himalayan Grand',
    location: 'Dehradun',
    description: 'Luxury 5-star property with world-class amenities and mountain views.',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 12000,
    rating: 4.9,
    category: 'luxury'
  },
  {
    id: 7,
    name: 'River Camp Retreat',
    location: 'Haridwar',
    description: 'Riverside glamping experience with adventure activities and spiritual ambiance.',
    image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 2500,
    rating: 4.5,
    category: 'budget'
  },
  {
    id: 8,
    name: 'Pine Forest Lodge',
    location: 'Ranikhet',
    description: 'Tranquil lodge surrounded by pine forests with colonial charm and modern comforts.',
    image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    pricePerNight: 4500,
    rating: 4.6,
    category: 'mid-range'
  }
];

const AccommodationsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Accommodation['category'] | 'all'>('all');

  const filteredAccommodations = activeFilter === 'all'
    ? accommodations
    : accommodations.filter(acc => acc.category === activeFilter);

  return (
    <section id="accommodations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Where to Stay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect accommodation for your Uttarakhand adventure, from budget-friendly options to luxury resorts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-3">
          <Button 
            variant={activeFilter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveFilter('all')}
            icon={<Filter size={16} />}
          >
            All Options
          </Button>
          <Button 
            variant={activeFilter === 'budget' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveFilter('budget')}
          >
            Budget (Under ₹3000)
          </Button>
          <Button 
            variant={activeFilter === 'mid-range' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveFilter('mid-range')}
          >
            Mid-Range (₹3000-₹6000)
          </Button>
          <Button 
            variant={activeFilter === 'luxury' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveFilter('luxury')}
          >
            Luxury (₹6000+)
          </Button>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} hoverable className="h-full flex flex-col">
              <CardImage 
                src={accommodation.image} 
                alt={accommodation.name} 
                className="h-48"
              />
              <CardContent className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>{accommodation.name}</CardTitle>
                  <div className="flex items-center bg-accent-500 text-white px-2 py-1 rounded-md text-sm">
                    <Star size={14} className="mr-1" />
                    {accommodation.rating}
                  </div>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{accommodation.location}</span>
                </div>
                <CardDescription className="mb-4">{accommodation.description}</CardDescription>
                <div className="text-primary-800 font-bold">
                  ₹{accommodation.pricePerNight} <span className="text-gray-500 font-normal text-sm">per night</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" fullWidth>Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-10 text-center">
          <Button variant="secondary" size="lg">
            View All Accommodations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;