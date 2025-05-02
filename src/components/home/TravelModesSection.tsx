import React, { useState } from 'react';
import { Plane, Train, Bus, Car, ChevronDown, ChevronUp, Check, Mountain, MapPin } from 'lucide-react';
import Card, { CardContent, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import Modal from './Modal';
import Travel from './Travel';

interface TravelModeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  priceRange: string;
  availability: string;
  className?: string;
  onCheckAvailability?: () => void;
  isCheckingAvailability?: boolean;
  availabilityDetails?: {
    nextAvailable: string;
    options: { 
      name: string; 
      departure?: string;
      duration?: string;
      features?: string[];
    }[];
    bookingLink: string;
    notes?: string[];
  } | null;
}

const TravelModeCard: React.FC<TravelModeCardProps> = ({ 
  icon, 
  title, 
  description, 
  priceRange, 
  availability,
  className = '',
  onCheckAvailability,
  isCheckingAvailability = false,
  availabilityDetails = null
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hoverable className={`h-full ${className}`}>
      <CardContent>
        <div className="flex flex-col h-full">
          <div className="mb-4 text-accent-500 flex items-center gap-2">
            {icon}
            {title === "Helicopter" && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Mountain Access
              </span>
            )}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mb-4">{description}</CardDescription>
          
          <div className="mt-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Price Range:</span>
              <span className="font-medium text-primary-700">{priceRange}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>General Availability:</span>
              <span className="font-medium text-primary-700">{availability}</span>
            </div>
            
            {onCheckAvailability && (
              <div className="border-t pt-4">
                {!availabilityDetails ? (
                  <Button 
                    variant="outline" 
                    onClick={onCheckAvailability}
                    loading={isCheckingAvailability}
                    className="w-full"
                    size="sm"
                  >
                    Check Uttarakhand Availability
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Uttarakhand Status:</span>
                      <span className="flex items-center text-green-600 text-sm">
                        <Check className="mr-1" size={16} /> Available
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">Next option:</span>
                        <span className="font-medium">{availabilityDetails.nextAvailable}</span>
                      </div>
                      
                      <button 
                        onClick={() => setExpanded(!expanded)} 
                        className="flex items-center text-primary-600 mt-2 text-sm"
                      >
                        {expanded ? (
                          <>
                            <span>Hide options</span>
                            <ChevronUp className="ml-1" size={16} />
                          </>
                        ) : (
                          <>
                            <span>View Uttarakhand services</span>
                            <ChevronDown className="ml-1" size={16} />
                          </>
                        )}
                      </button>
                      
                      {expanded && (
                        <div className="mt-2 space-y-3">
                          {availabilityDetails.options.map((option, index) => (
                            <div key={index} className="border rounded-lg p-2">
                              <div className="font-medium flex items-center gap-1">
                                <MapPin size={14} className="text-accent-500" />
                                {option.name}
                              </div>
                              {option.departure && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Departs: {option.departure}
                                </div>
                              )}
                              {option.duration && (
                                <div className="text-xs text-gray-500">
                                  Duration: {option.duration}
                                </div>
                              )}
                              {option.features && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {option.features.map((feature, i) => (
                                    <span key={i} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {availabilityDetails.notes && (
                      <div className="text-xs text-gray-500 mt-2">
                        {availabilityDetails.notes.map((note, i) => (
                          <div key={i} className="flex items-start gap-1 mb-1">
                            <span>•</span>
                            <span>{note}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      as="a" 
                      href={availabilityDetails.bookingLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-3"
                      size="sm"
                    >
                      Book for Uttarakhand
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TravelModesSection: React.FC = () => {
  const [checkingAvailability, setCheckingAvailability] = useState<{
    flight: boolean;
    train: boolean;
    bus: boolean;
    car: boolean;
    helicopter: boolean;
  }>({
    flight: false,
    train: false,
    bus: false,
    car: false,
    helicopter: false
  });
  
  const [availabilityData, setAvailabilityData] = useState<{
    flight: any;
    train: any;
    bus: any;
    car: any;
    helicopter: any;
  }>({
    flight: null,
    train: null,
    bus: null,
    car: null,
    helicopter: null
  });

  const checkAvailability = (mode: 'flight' | 'train' | 'bus' | 'car' | 'helicopter') => {
    // Simulate API call
    setCheckingAvailability(prev => ({ ...prev, [mode]: true }));
    
    setTimeout(() => {
      const mockData = {
        flight: {
          nextAvailable: "Today, 6:30 AM from Delhi",
          options: [
            {
              name: "Dehradun Airport (DED)",
              departure: "Multiple daily flights",
              duration: "1h 10m from Delhi",
              features: ["IndiGo", "Air India", "Vistara"]
            },
            {
              name: "Pantnagar Airport (PGH)",
              departure: "Twice daily",
              duration: "1h 25m from Delhi",
              features: ["Alliance Air"]
            }
          ],
          bookingLink: "https://www.makemytrip.com/flights/uttarakhand-flights.html",
          notes: [
            "Jolly Grant (Dehradun) is main airport",
            "Helicopter transfers available to remote areas"
          ]
        },
        train: {
          nextAvailable: "Tonight 11:45 PM from Delhi",
          options: [
            {
              name: "Nanda Devi Express (12205)",
              departure: "Delhi (NDLS) 11:45 PM → Dehradun (DDN) 5:50 AM",
              duration: "6h 5m",
              features: ["AC Chair Car", "Sleeper"]
            },
            {
              name: "Shatabdi Express (12018)",
              departure: "Delhi (NDLS) 6:40 AM → Kathgodam (KGM) 11:45 AM",
              duration: "5h 5m",
              features: ["Executive Class", "Breakfast served"]
            },
            {
              name: "Jan Shatabdi (12055)",
              departure: "Delhi (NDLS) 3:20 PM → Haridwar (HW) 8:45 PM",
              duration: "5h 25m",
              features: ["Chair Car", "Pantry"]
            }
          ],
          bookingLink: "https://www.irctc.co.in/nget/train-search",
          notes: [
            "Major stations: Dehradun, Haridwar, Kathgodam, Rishikesh",
            "Book Tatkal tickets 1 day before travel"
          ]
        },
        bus: {
          nextAvailable: "Every 30 mins from Delhi",
          options: [
            {
              name: "Delhi → Rishikesh (GMRS Luxury)",
              departure: "ISBT Kashmere Gate",
              duration: "6-7 hours",
              features: ["Volvo AC", "WiFi", "Toilet"]
            },
            {
              name: "Delhi → Nainital (Uttarakhand Volvo)",
              departure: "Anand Vihar ISBT",
              duration: "8-9 hours",
              features: ["Sleeper", "Charging ports"]
            },
            {
              name: "HRTC Ordinary Buses",
              departure: "Multiple daily",
              duration: "Varies",
              features: ["Budget option", "Frequent stops"]
            }
          ],
          bookingLink: "https://www.redbus.in/buses/uttarakhand",
          notes: [
            "Overnight buses available from Delhi/Mumbai",
            "HRTC buses connect all hill stations"
          ]
        },
        car: {
          nextAvailable: "Available 24/7",
          options: [
            {
              name: "Delhi → Mussoorie Road Trip",
              duration: "6-7 hours",
              features: ["NH334", "Scenic route", "Toll: ₹450"]
            },
            {
              name: "Dehradun → Auli Self-Drive",
              duration: "10-11 hours",
              features: ["Mountain roads", "4WD recommended"]
            },
            {
              name: "Local Taxi Services",
              duration: "Varies",
              features: ["Fixed rates for hill stations", "Uttarakhand taxi union approved"]
            }
          ],
          bookingLink: "https://www.savaari.com/road-trips/uttarakhand",
          notes: [
            "NH7 connects Delhi to Haridwar/Rishikesh",
            "Hill stations require experienced drivers",
            "Winter chains may be required Nov-Feb"
          ]
        },
        helicopter: {
          nextAvailable: "Weather permitting",
          options: [
            {
              name: "Dehradun → Kedarnath",
              duration: "30-45 mins",
              features: ["Pawan Hans", "Priority pilgrims"]
            },
            {
              name: "Guptkashi → Badrinath",
              duration: "25 mins",
              features: ["Heliservices Uttarakhand"]
            },
            {
              name: "Charter Services",
              duration: "Custom",
              features: ["Auli ski access", "Valley tours"]
            }
          ],
          bookingLink: "https://heliservices.uk.gov.in",
          notes: [
            "Mandatory registration for Char Dham routes",
            "Strict weight limits (5kg baggage)",
            "Highly weather dependent"
          ]
        }
      };
      
      setAvailabilityData(prev => ({ ...prev, [mode]: mockData[mode] }));
      setCheckingAvailability(prev => ({ ...prev, [mode]: false }));
    }, 1500);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  return (
    <section id="travel-modes" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Uttarakhand Travel Options</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Authentic transportation choices to reach the Devbhumi's sacred sites and Himalayan destinations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TravelModeCard 
            icon={<Plane size={24} />}
            title="By Flight"
            description="Access Uttarakhand through Jolly Grant (Dehradun) or Pantnagar airports with connections from major cities."
            priceRange="₹3,500 - ₹15,000"
            availability="Limited daily flights"
            onCheckAvailability={() => checkAvailability('flight')}
            isCheckingAvailability={checkingAvailability.flight}
            availabilityDetails={availabilityData.flight}
          />
          
          <TravelModeCard 
            icon={<Train size={24} />}
            title="By Train"
            description="Rail network connecting Haridwar (HW), Dehradun (DDN), Kathgodam (KGM) - gateway to Kumaon hills."
            priceRange="₹200 - ₹3,000"
            availability="Multiple daily trains"
            onCheckAvailability={() => checkAvailability('train')}
            isCheckingAvailability={checkingAvailability.train}
            availabilityDetails={availabilityData.train}
          />
          
          <TravelModeCard 
            icon={<Bus size={24} />}
            title="By Bus"
            description="State-run HRTC and private Volvos from Delhi/UP to all major Uttarakhand destinations."
            priceRange="₹300 - ₹1,500"
            availability="Frequent services"
            onCheckAvailability={() => checkAvailability('bus')}
            isCheckingAvailability={checkingAvailability.bus}
            availabilityDetails={availabilityData.bus}
          />
          
          <TravelModeCard 
            icon={<Car size={24} />}
            title="By Road"
            description="Self-drive or hired taxis through Himalayan routes. NH7, NH34, NH109 connect major destinations."
            priceRange="₹2,000 - ₹8,000"
            availability="24/7 access"
            onCheckAvailability={() => checkAvailability('car')}
            isCheckingAvailability={checkingAvailability.car}
            availabilityDetails={availabilityData.car}
          />

          <TravelModeCard 
            icon={<Mountain size={24} />}
            title="Helicopter"
            description="Essential for remote shrines like Kedarnath/Badrinath. Operated by state and private providers."
            priceRange="₹4,500 - ₹50,000"
            availability="Seasonal/weather dependent"
            onCheckAvailability={() => checkAvailability('helicopter')}
            isCheckingAvailability={checkingAvailability.helicopter}
            availabilityDetails={availabilityData.helicopter}
            className="md:col-span-2 lg:col-span-1"
          />
        </div>


        <div className="flex items-end justify-center">
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


        <div className="mt-12 bg-white p-6 rounded-lg border">
          <h3 className="font-medium text-lg mb-3">⚠️ Uttarakhand Travel Tips</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Monsoon season (Jul-Sep):</strong> Landslides may disrupt road/rail travel. Check weather alerts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Char Dham Yatra:</strong> Register at <a href="https://registrationandtouristcare.uk.gov.in" className="text-primary-600 underline">official portal</a> for pilgrimage routes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Hill stations:</strong> Shared taxis available from major terminals to Mussoorie/Nainital.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Winter travel:</strong> Some routes (like Auli/Gangotri) may require special permits Nov-Mar.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TravelModesSection;