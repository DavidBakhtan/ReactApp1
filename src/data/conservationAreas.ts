import { ConservationArea, TimeSlot } from '@/types/booking';
import forestTrail from '@/assets/forest-trail.jpg';
import mountainLake from '@/assets/mountain-lake.jpg';
import wetlandArea from '@/assets/wetland-area.jpg';
import prairieMeadow from '@/assets/prairie-meadow.jpg';

export const conservationAreas: ConservationArea[] = [
  {
    id: '1',
    name: 'Greenwood Forest Reserve',
    description: 'Ancient forest with hiking trails, wildlife viewing opportunities, and pristine nature. Perfect for bird watching and peaceful walks.',
    image: forestTrail,
    features: ['Hiking Trails', 'Bird Watching', 'Wildlife Photography', 'Nature Education'],
    maxVisitors: 15
  },
  {
    id: '2',
    name: 'Crystal Lake Conservation',
    description: 'Serene mountain lake surrounded by pine forests. Ideal for fishing, photography, and quiet reflection in nature.',
    image: mountainLake,
    features: ['Fishing', 'Photography', 'Scenic Views', 'Picnic Areas'],
    maxVisitors: 12
  },
  {
    id: '3',
    name: 'Riverside Wetlands',
    description: 'Diverse wetland ecosystem supporting waterfowl and aquatic life. Educational boardwalks and observation decks available.',
    image: wetlandArea,
    features: ['Boardwalk Tours', 'Waterfowl Viewing', 'Educational Programs', 'Research Areas'],
    maxVisitors: 10
  },
  {
    id: '4',
    name: 'Prairie Meadows Reserve',
    description: 'Rolling prairie landscape with native wildflowers and grasslands. Experience the beauty of natural prairie ecosystems.',
    image: prairieMeadow,
    features: ['Prairie Walks', 'Wildflower Viewing', 'Butterfly Garden', 'Native Plant Tours'],
    maxVisitors: 20
  }
];

export const timeSlots: TimeSlot[] = [
  {
    id: 'morning',
    startTime: '09:00',
    endTime: '12:00',
    label: 'Morning Period (9:00 am - 12:00 pm)'
  },
  {
    id: 'afternoon',
    startTime: '12:00',
    endTime: '15:00',
    label: 'Afternoon Period (12:00 pm - 3:00 pm)'
  },
  {
    id: 'evening',
    startTime: '15:00',
    endTime: '18:00',
    label: 'Evening Period (3:00 pm - 6:00 pm)'
  }
];

export const PRICE_PER_VISITOR = 25; // $25 per visitor