import React, { useState } from 'react';
import Card, { CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Landmark, Mountain, Leaf, Camera, Route, Tent } from 'lucide-react';

interface Attraction {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'historical' | 'spiritual' | 'wildlife' | 'photography' | 'adventure' | 'camping';
}

const attractions: Attraction[] = [
  {
    id: 1,
    title: 'Kedarnath Temple',
    description: 'One of the holiest Hindu temples dedicated to Lord Shiva, located in the Garhwal Himalayan range.',
    image: 'https://images.pexels.com/photos/16038820/pexels-photo-16038820/free-photo-of-kedarnath-temple-in-uttarakhand-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'spiritual'
  },
  {
    id: 2,
    title: 'Valley of Flowers',
    description: 'A vibrant national park known for its meadows of alpine flowers and rich biodiversity.',
    image: 'https://plus.unsplash.com/premium_photo-1661963132968-0205f2144686?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'wildlife'
  },
  {
    id: 3,
    title: 'Rishikesh',
    description: 'The yoga capital of the world, situated on the banks of the holy Ganges river.',
    image: 'https://images.pexels.com/photos/15813041/pexels-photo-15813041/free-photo-of-lakshman-jhula-bridge-in-rishikesh-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'spiritual'
  },
  {
    id: 4,
    title: 'Jim Corbett National Park',
    description: 'India\'s oldest national park known for its Bengal tigers and diverse wildlife.',
    image: 'https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'wildlife'
  },
  {
    id: 5,
    title: 'Nainital',
    description: 'A charming hill station built around the beautiful Naini Lake.',
    image: 'https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'photography'
  },
  {
    id: 6,
    title: 'Mussoorie',
    description: 'Popular hill station with stunning mountain views and colonial architecture.',
    image: 'https://images.pexels.com/photos/17045808/pexels-photo-17045808/free-photo-of-mussoorie-hill-station-uttarakhand-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'photography'
  },
  {
    id: 7,
    title: 'Auli',
    description: 'Popular skiing destination with breathtaking views of Nanda Devi peak.',
    image: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'adventure'
  },
  {
    id: 8,
    title: 'Char Dham Yatra',
    description: 'A pilgrimage circuit covering Yamunotri, Gangotri, Kedarnath, and Badrinath temples.',
    image: 'https://images.pexels.com/photos/16038827/pexels-photo-16038827/free-photo-of-badrinath-temple-in-uttarakhand-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'spiritual'
  },
  {
    id: 9,
    title: 'Chopta-Tungnath',
    description: 'Picturesque trekking route leading to the highest Shiva temple in the world.',
    image: 'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'adventure'
  },
  {
    id: 10,
    title: 'Almora',
    description: 'Cultural capital of Kumaon with stunning views of the Himalayas.',
    image: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'historical'
  },
  {
    id: 11,
    title: 'Camping in Kanatal',
    description: 'Serene camping experience amidst pine forests with mountain views.',
    image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'camping'
  },
  {
    id: 12,
    title: 'Tehri Dam',
    description: 'One of the highest dams in India offering adventure activities like jet skiing and boating.',
    image: 'https://images.pexels.com/photos/6542921/pexels-photo-6542921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'adventure'
  }
];

interface CategoryFilter {
  value: Attraction['category'];
  label: string;
  icon: React.ReactNode;
}

const categoryFilters: CategoryFilter[] = [
  { value: 'historical', label: 'Historical', icon: <Landmark size={18} /> },
  { value: 'spiritual', label: 'Spiritual', icon: <Mountain size={18} /> },
  { value: 'wildlife', label: 'Wildlife', icon: <Leaf size={18} /> },
  { value: 'photography', label: 'Photography', icon: <Camera size={18} /> },
  { value: 'adventure', label: 'Adventure', icon: <Route size={18} /> },
  { value: 'camping', label: 'Camping', icon: <Tent size={18} /> }
];

const AttractionsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Attraction['category'] | 'all'>('all');

  const filteredAttractions = activeCategory === 'all' 
    ? attractions 
    : attractions.filter(attraction => attraction.category === activeCategory);

  return (
    <section id="attractions" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Explore Uttarakhand's Treasures</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most breathtaking destinations and experiences that Uttarakhand has to offer.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          <Button 
            variant={activeCategory === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setActiveCategory('all')}
            className="mb-2"
          >
            All
          </Button>
          
          {categoryFilters.map((category) => (
            <Button 
              key={category.value}
              variant={activeCategory === category.value ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setActiveCategory(category.value)}
              icon={category.icon}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAttractions.map((attraction) => (
            <Card key={attraction.id} hoverable className="h-full flex flex-col">
              <CardImage 
                src={attraction.image} 
                alt={attraction.title} 
                className="h-48"
              />
              <CardContent className="flex-grow">
                <CardTitle>{attraction.title}</CardTitle>
                <CardDescription>{attraction.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" fullWidth>Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-10 text-center">
          <Button variant="secondary" size="lg">
            View All Attractions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;