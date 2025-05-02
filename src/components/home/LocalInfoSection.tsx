import React from 'react';
import { Phone, Heart, Umbrella, AlertTriangle, Car, Map } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 text-accent-500">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-800 mb-3">{title}</h3>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LocalInfoSection: React.FC = () => {
  return (
    <section id="local-info" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">Essential Local Information</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Important resources and information to ensure a safe and comfortable journey through Uttarakhand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard icon={<Phone size={24} />} title="Emergency Contacts">
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">Police:</span> 100</li>
              <li><span className="font-medium">Ambulance:</span> 108</li>
              <li><span className="font-medium">Tourist Helpline:</span> 1363</li>
              <li><span className="font-medium">Disaster Management:</span> 1070</li>
              <li><span className="font-medium">Women Helpline:</span> 1090</li>
            </ul>
          </InfoCard>

          <InfoCard icon={<Heart size={24} />} title="Medical Facilities">
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">AIIMS Rishikesh:</span> 0135-2462932</li>
              <li><span className="font-medium">Doon Hospital:</span> 0135-2654025</li>
              <li><span className="font-medium">Max Hospital Dehradun:</span> 0135-6673000</li>
              <li><span className="font-medium">Himalayan Hospital:</span> 0135-2471100</li>
            </ul>
            <p className="mt-2 text-sm text-gray-500">Most tourist areas have basic medical facilities. For serious conditions, head to major cities like Dehradun or Rishikesh.</p>
          </InfoCard>

          <InfoCard icon={<Umbrella size={24} />} title="Weather Information">
            <div className="space-y-3 text-gray-600">
              <p><span className="font-medium">Summer (Mar-Jun):</span> Pleasant in hills (15-30°C), hot in plains (25-40°C)</p>
              <p><span className="font-medium">Monsoon (Jul-Sep):</span> Heavy rainfall, landslides possible</p>
              <p><span className="font-medium">Autumn (Oct-Nov):</span> Clear skies, perfect weather (10-25°C)</p>
              <p><span className="font-medium">Winter (Dec-Feb):</span> Cold with snowfall in higher regions (−5 to 15°C)</p>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded-md text-sm">
              <p className="font-medium text-primary-700">Current Season:</p>
              <p className="text-primary-600">Check local forecasts before traveling to high-altitude areas</p>
            </div>
          </InfoCard>

          <InfoCard icon={<AlertTriangle size={24} />} title="Travel Advisories">
            <ul className="space-y-2 text-gray-600">
              <li>Carry necessary medicines and first aid supplies</li>
              <li>Inform your hotel/guide when trekking in remote areas</li>
              <li>Respect local customs and dress modestly at religious sites</li>
              <li>Check road conditions during monsoon season</li>
              <li>Avoid traveling at night on mountain roads</li>
              <li>Carry enough cash as ATMs may be limited in remote areas</li>
            </ul>
          </InfoCard>

          <InfoCard icon={<Car size={24} />} title="Local Transportation">
            <div className="space-y-3 text-gray-600">
              <p><span className="font-medium">Taxis:</span> Available in all major towns (negotiate fare beforehand)</p>
              <p><span className="font-medium">Auto-rickshaws:</span> Common in cities and towns</p>
              <p><span className="font-medium">State Buses:</span> Affordable option connecting most destinations</p>
              <p><span className="font-medium">Shared Jeeps:</span> Popular for hill station routes</p>
              <p><span className="font-medium">Rental Services:</span> Available in tourist hubs for self-driving</p>
            </div>
          </InfoCard>

          <InfoCard icon={<Map size={24} />} title="Useful Apps & Maps">
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">Uttarakhand Tourism App:</span> Official guide with offline maps</li>
              <li><span className="font-medium">Google Maps:</span> Download offline maps before visiting remote areas</li>
              <li><span className="font-medium">Uttarakhand SEWA App:</span> For local services and emergencies</li>
              <li><span className="font-medium">AccuWeather:</span> For reliable mountain weather forecasts</li>
              <li><span className="font-medium">AllTrails:</span> For detailed trekking routes and trails</li>
            </ul>
          </InfoCard>
        </div>
        
        <div className="mt-12 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-xl font-semibold text-primary-800 mb-3 text-center">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-medium text-primary-700">Uttarakhand Tourism</p>
              <p className="text-gray-600">1800-1233-1364</p>
            </div>
            <div>
              <p className="font-medium text-primary-700">Road Transport Helpline</p>
              <p className="text-gray-600">1800-180-4873</p>
            </div>
            <div>
              <p className="font-medium text-primary-700">Forest Department</p>
              <p className="text-gray-600">0135-2713725</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalInfoSection;