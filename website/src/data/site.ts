/* Site content — ported verbatim from demo4/Home.dc.html (nav, footer,
   home sections, destinations, activities, tours listing, gallery, about,
   contact). Icon path-`d` arrays are stored as data and rendered by <Icon>. */

import type { TourSlug } from './tours';

export interface NavLink {
  label: string;
  /** Router path. */
  to: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Tours', to: '/tours' },
  { label: 'Activities', to: '/activities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export const contact = {
  whatsappDisplay: '+265 991 415 792',
  whatsappHref: 'https://wa.me/265991415792',
  phoneDisplay: '+265 892 959 200',
  phoneHref: 'tel:+265892959200',
  email: 'mulanjeoutlook@gmail.com',
  emailHref: 'mailto:mulanjeoutlook@gmail.com',
  location: 'Likhubula, Mulanje, Malawi',
  locationShort: 'Likhubula, Mulanje',
  officeHours: 'Mon–Sat, 7:00–18:00 CAT',
  instagram: 'https://www.instagram.com/mulanjeoutlooksafaris',
  instagramHandle: '@mulanjeoutlooksafaris',
  tripadvisor: 'https://www.tripadvisor.co.uk/overview?locationId=34064561',
  tagline:
    'Explore Mount Mulanje. Discover Southern Malawi. Experience the Warm Heart of Africa.',
};

export interface Experience {
  title: string;
  img: string;
  body: string;
  tag: string;
}

export const experiences: Experience[] = [
  {
    title: 'Mount Mulanje trekking',
    img: 'photos/mulanje-peaks.jpg',
    body: 'Guided treks for every level - from gentle day walks to the summit of Sapitwa, Malawi’s highest peak at 3,002m.',
    tag: 'Hiking',
  },
  {
    title: 'Wildlife safaris',
    img: 'photos/elephant2.jpg',
    body: 'Game drives, boat and walking safaris in Liwonde, Majete and Lengwe - elephants, big cats, hippos and hundreds of birds.',
    tag: 'Safari',
  },
  {
    title: 'Tea estate tours',
    img: 'photos/tea-picker.jpg',
    body: 'Walk the rolling plantations of Mulanje and Thyolo and learn how Malawi’s tea is grown and made.',
    tag: 'Culture',
  },
  {
    title: 'Cultural experiences',
    img: 'photos/village-dance.jpg',
    body: 'Village visits, traditional music and dance, local cuisine and craft markets - respectful and authentic.',
    tag: 'People',
  },
  {
    title: 'Lake Malawi adventures',
    img: 'photos/lake-beach.jpg',
    body: 'Swim, kayak, snorkel or take a sunset cruise on the crystal waters of the “Lake of Stars.”',
    tag: 'Water',
  },
];

export interface Feature {
  title: string;
  body: string;
  /** SVG path `d` strings. */
  icon: string[];
}

export const homeWhyUs: Feature[] = [
  {
    title: 'Experienced local guides',
    body: 'Years spent leading treks on Mount Mulanje and safaris across the south.',
    icon: ['M6 3v18', 'M6 8h9l-2.5 3L15 14H6'],
  },
  {
    title: 'Tailored itineraries',
    body: 'Carefully planned trips shaped around your interests, pace and budget.',
    icon: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  },
  {
    title: 'Safe & professional',
    body: 'Reliable service, trusted equipment and porters on every mountain trip.',
    icon: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'm9 12 2 2 4-4'],
  },
  {
    title: 'Comfortable transport',
    body: 'Vehicle transfers and trusted lodges and mountain huts throughout.',
    icon: ['M5 17h14', 'M3 12h18l-2-6H5z', 'M7.5 12a1 1 0 1 0 0 .1', 'M16.5 12a1 1 0 1 0 0 .1'],
  },
  {
    title: 'Responsible tourism',
    body: 'Every trip supports local communities and protects the environment.',
    icon: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6'],
  },
  {
    title: 'Exceptional value',
    body: 'Memorable experiences and genuine hospitality from first enquiry to farewell.',
    icon: ['m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z'],
  },
];

export const aboutWhyUs: Feature[] = [
  {
    title: 'Experienced local guides',
    body: 'Our guides have spent years leading treks through Mulanje’s forests and peaks, visiting the parks and working with local communities.',
    icon: ['M6 3v18', 'M6 8h9l-2.5 3L15 14H6'],
  },
  {
    title: 'Tailored itineraries',
    body: 'Carefully planned trips shaped around your interests, pace and budget - flexible and easily adjusted.',
    icon: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  },
  {
    title: 'Safe & professional',
    body: 'Reliable, professional service with trained staff, trusted equipment and porters on every trip.',
    icon: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'm9 12 2 2 4-4'],
  },
  {
    title: 'Responsible tourism',
    body: 'We support local businesses and communities and protect Malawi’s natural environment.',
    icon: ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6'],
  },
  {
    title: 'Comfortable & trusted',
    body: 'Comfortable transport and trusted accommodation, from lakeside lodges to mountain huts.',
    icon: ['M5 17h14', 'M3 12h18l-2-6H5z', 'M7.5 12a1 1 0 1 0 0 .1', 'M16.5 12a1 1 0 1 0 0 .1'],
  },
  {
    title: 'Exceptional value',
    body: 'Memorable experiences and genuine hospitality from your first enquiry until your journey ends.',
    icon: ['m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z'],
  },
];

export interface TourCard {
  title: string;
  img: string;
  grade: string;
  price: string;
  featured?: boolean;
  desc: string;
  slug: TourSlug;
}

/** Four "Popular tours" cards on the home page. */
export const homeTourCards: TourCard[] = [
  {
    title: '3-Day Mount Mulanje Trek',
    img: 'photos/summit-sign.jpg',
    grade: 'Grade 4 · 3 days',
    price: 'from $390',
    desc: 'A rewarding climb to Sapitwa Peak with mountain-hut nights, guides, porters and breathtaking views.',
    slug: '3-day-mulanje',
  },
  {
    title: '6-Day Southern Malawi Tour',
    img: 'photos/mulanje-view.jpg',
    grade: 'Signature · 6 days',
    price: 'from $1,140',
    desc: 'Mount Mulanje, Zomba, Liwonde safari and Lake Malawi combined into one unforgettable journey.',
    slug: '6-day-southern',
  },
  {
    title: 'Liwonde Wildlife Safari',
    img: 'photos/hippos.jpg',
    grade: 'Safari · 2–3 days',
    price: 'from $310',
    desc: 'Exciting game drives and peaceful boat safaris along the mighty Shire River.',
    slug: 'liwonde-safari',
  },
  {
    title: 'Tea & Culture Experience',
    img: 'photos/tea-mountain.jpg',
    grade: 'Relaxed · 2 days',
    price: 'from $180',
    desc: 'Historic tea estates followed by village visits and the warm traditions of local communities.',
    slug: 'tea-culture',
  },
];

/** Six cards on the Tours listing page. */
export const toursList: TourCard[] = [
  {
    title: '3-Day Mount Mulanje Trek',
    img: 'photos/summit-sign.jpg',
    grade: 'Grade 4 · 3 days',
    price: 'from $390',
    featured: true,
    desc: 'A rewarding adventure to Sapitwa Peak, including mountain-hut accommodation, experienced guides, porters, meals and breathtaking views.',
    slug: '3-day-mulanje',
  },
  {
    title: '5-Day Grand Mulanje Traverse',
    img: 'photos/new-misty-summit.jpg',
    grade: 'Grade 3 · 5 days',
    price: 'from $690',
    desc: 'A traverse across the entire massif - diverse vegetation, panoramic landscapes, optional peaks above 2,500m and numerous rock pools.',
    slug: '5-day-traverse',
  },
  {
    title: '6-Day Southern Malawi Tour',
    img: 'photos/mulanje-view.jpg',
    grade: 'Signature · 6 days',
    price: 'from $1,140',
    featured: true,
    desc: 'Mount Mulanje, Zomba, a Liwonde safari and Lake Malawi combined into one unforgettable journey - our most complete trip.',
    slug: '6-day-southern',
  },
  {
    title: 'Liwonde Wildlife Safari',
    img: 'photos/new-elephant.jpg',
    grade: 'Safari · 2–3 days',
    price: 'from $310',
    desc: 'Exciting game drives and peaceful boat safaris along the Shire River, discovering Malawi’s remarkable wildlife.',
    slug: 'liwonde-safari',
  },
  {
    title: 'Tea & Culture Experience',
    img: 'photos/new-tea-landscape.jpg',
    grade: 'Relaxed · 2 days',
    price: 'from $180',
    desc: 'Explore historic tea estates before visiting nearby villages to experience the traditions and hospitality of local communities.',
    slug: 'tea-culture',
  },
  {
    title: 'Southern Malawi Explorer',
    img: 'photos/new-lake-island.jpg',
    grade: 'Tailored · 7–10 days',
    price: 'from $1,350',
    desc: 'Combine Mount Mulanje, tea estates, cultural experiences and a wildlife safari into one flexible, tailor-made journey.',
    slug: 'southern-explorer',
  },
];

export interface Destination {
  id: string;
  kicker: string;
  name: string;
  /** Three images (a lead image + two supporting). */
  img: string[];
  lead: string;
  body: string;
  acts: string[];
  price: string;
}

export const destinations: Destination[] = [
  {
    id: 'mulanje',
    kicker: 'UNESCO Biosphere Reserve',
    name: 'Mount Mulanje',
    img: ['photos/mulanje-peaks.jpg', 'photos/rock-pool.jpg', 'photos/hikers-valley.jpg'],
    lead: 'Rising almost abruptly from a featureless plain, Mulanje is the third-largest mountain in Africa - a 640 km² massif blessed with 13 sister peaks. Sapitwa, at 3,002m, is the highest point in Central Africa, with views stretching to Lake Chirwa, Zomba and Mozambique.',
    body: 'A network of well-weathered trails connects the mountain huts, with detours to peaks, rock pools and sunset viewpoints. Our 1–6 day itineraries cover all the key areas of interest - the most popular being the sunrise summit challenge.',
    acts: ['Multi-day hiking', 'Zip-line river crossing', 'Top-rope climbing & abseiling', 'Tea field & factory tour'],
    price: 'from $130 / day',
  },
  {
    id: 'liwonde',
    kicker: 'Managed by African Parks',
    name: 'Liwonde National Park',
    img: ['photos/elephant.jpg', 'photos/hippos.jpg', 'photos/boat-safari.jpg'],
    lead: 'One of the most accessible and professionally run parks in the south. The mighty Shire River and cathedral-like mopane woodlands make it a perfect habitat for the endangered black rhino, thriving elephant, buffalo and sable antelope.',
    body: 'Rich in birdlife - including Pel’s fishing owl and Lilian’s lovebird. Take a 3-hour boat trip to see elephants, hippos and crocodiles up close, a 4x4 game drive along the spinal route, or a nocturnal drive to watch the big cats hunt.',
    acts: ['4x4 game drives', 'Boat safari on the Shire', 'Walking safari', 'Conservation experiences'],
    price: 'from $155 / day',
  },
  {
    id: 'lake',
    kicker: 'UNESCO World Heritage Site',
    name: 'Lake Malawi - Southern Shores',
    img: ['photos/lake-beach.jpg', 'photos/lake-sunset.jpg', 'photos/lake-boat.jpg'],
    lead: 'The “Lake of Stars” is our main draw for anyone passing through the south - limitless watersports along expansive sandy beaches. Declared a UNESCO World Heritage Site in 1984 for its extraordinary diversity of cichlid fish.',
    body: 'Cape Maclear, a small fishing village within the national park, is the hub. The crystal waters around Domwe, Thumbi and Mumbo islands offer private snorkelling and kayaking, while a late-afternoon walk to Otters Point reveals the lake turning gold at sunset.',
    acts: ['Sailing to the islands', 'Snorkelling & kayaking', 'Sunset boat cruise', 'Beach volleyball', 'Village tour'],
    price: 'from $95 / day',
  },
  {
    id: 'majete',
    kicker: 'Big Five · African Parks',
    name: 'Majete Game Reserve',
    img: ['photos/kudu.jpg', 'photos/antelope.jpg', 'photos/safari-vehicle.jpg'],
    lead: 'Just 90 minutes from Blantyre and home to Africa’s Big Five, Majete has the highest concentration of predators in Malawi - hyena, leopard, cheetah, wild dog and several prides of lion. Your chances of a sighting are almost certain.',
    body: 'As a non-profit, all funds generated in Majete support the reserve and the families who manage it. We recommend Thawale Lodge, where animals roam freely among guests, or the memorable Nakambe Hide sleep-out for the truly adventurous.',
    acts: ['Morning & afternoon game drives', 'Nakambe Hide sleep-out', 'Cultural dancing'],
    price: 'from $145 / day',
  },
  {
    id: 'zomba',
    kicker: 'Plateau & city gateway',
    name: 'Zomba Plateau & Blantyre',
    img: ['photos/sunset-tree.jpg', 'photos/mulanje-view.jpg', 'photos/tea-estate.jpg'],
    lead: 'A scenic bridge between mountain and lake. Zomba Plateau offers cool forest drives, trout streams and the celebrated Queen’s View sunset point, while Blantyre - Malawi’s commercial heart - is the arrival gateway for most journeys.',
    body: 'We often break the drive here for a sunrise stroll or a visit to a curio market, weaving Zomba into longer itineraries as a restful counterpoint between the summit and the Shire.',
    acts: ['Forest & viewpoint drives', 'Queen’s View sunset', 'City & market tour'],
    price: 'included in tours',
  },
];

export interface Activity {
  name: string;
  /** Two images (a lead image + one supporting). */
  img: string[];
  tag: string;
  lead: string;
  body: string;
  chips: string[];
}

export const activities: Activity[] = [
  {
    name: 'Climbing, Abseiling & Zip-Line',
    img: ['photos/abseil-river.jpg', 'photos/waterfall-tall.jpg'],
    tag: 'Adrenaline',
    lead: 'Adrenaline-inducing, achievement-oriented adventure activities in the Likhubula and Muloza River Valleys of Mulanje.',
    body: 'The sites are easily accessible and perfect for group outings, spiced with an informative guided tour to the legendary Dziwe la Nkhalamba falls and rock pools. Suitable for all ages above 10 - no previous experience required.',
    chips: ['Top-rope climbing', 'Abseiling', 'Zip-line river crossing', 'Dziwe Falls & rock pools'],
  },
  {
    name: 'Lake Malawi Water Sports',
    img: ['photos/new-lake-island.jpg', 'photos/lake-boat.jpg'],
    tag: 'Water',
    lead: 'Lake Malawi is the largest freshwater lake in Africa - open sandy beaches, crystal-clear waters and countless colourful Mbuna fish.',
    body: 'The destination offers a wide range of activities to choose from. Whether it is diving, snorkelling, kayaking, or simply sailing to nearby Thumbi or Mumbo Island, your guide will take you there.',
    chips: ['Diving', 'Snorkelling', 'Kayaking', 'Sailing to the islands'],
  },
  {
    name: 'Village Visits',
    img: ['photos/village-group.jpg', 'photos/new-tea-pickers.jpg'],
    tag: 'Culture',
    lead: 'Meet the people behind the Warm Heart of Africa through respectful, guided community visits.',
    body: 'Experience everyday village life through traditional music and dance, local cuisine, storytelling and craft markets - authentic connections that directly support local communities.',
    chips: ['Community visits', 'Music & dance', 'Local cuisine', 'Craft markets'],
  },
  {
    name: 'Festivals',
    img: ['photos/village-dance.jpg', 'photos/new-plateau.jpg'],
    tag: 'Seasonal',
    lead: 'The best way to taste traditionally made cuisine and mingle with the locals is to attend one of the national festivals.',
    body: 'We can time your visit around Malawi’s vibrant calendar of music and cultural festivals, weaving a celebration into your wider itinerary.',
    chips: ['Live music', 'Traditional food', 'Local crafts', 'Community spirit'],
  },
];

export const galleryImages: string[] = [
  'photos/new-misty-summit.jpg', 'photos/new-lion.jpg', 'photos/summit-celebrate.jpg',
  'photos/new-tea-pickers.jpg', 'photos/new-lake-island.jpg', 'photos/new-serval.jpg',
  'photos/hikers-valley.jpg', 'photos/new-elephant.jpg', 'photos/rock-pool.jpg',
  'photos/new-trogon.jpg', 'photos/new-rock-dome.jpg', 'photos/boat-safari.jpg',
  'photos/new-gazelle.jpg', 'photos/new-tea-landscape.jpg', 'photos/sapitwa.jpg',
  'photos/new-lake-village.jpg', 'photos/new-elephant-herd.jpg', 'photos/village-dance.jpg',
  'photos/new-plateau.jpg', 'photos/misty-summit.jpg', 'photos/lake-sunset.jpg',
  'photos/new-zomba-slope.jpg', 'photos/tea-carry.jpg', 'photos/hippos.jpg',
  'new-new-images/IMG-20260830-WA0002.jpg', 'new-new-images/IMG-20260830-WA0003.jpg',
  'new-new-images/IMG-20260830-WA0004.jpg', 'new-new-images/IMG-20260830-WA0006.jpg',
  'new-new-images/IMG-20260830-WA0007.jpg', 'new-new-images/IMG-20260830-WA0008.jpg',
  'new-new-images/IMG-20260830-WA0009.jpg', 'new-new-images/IMG-20260830-WA0010.jpg',
  'new-new-images/IMG-20260830-WA0011.jpg', 'new-new-images/IMG-20260830-WA0012.jpg',
  'new-new-images/IMG-20260830-WA0013.jpg', 'new-new-images/IMG-20260830-WA0016.jpg',
  'new-new-new-images/nnn-1.jpg', 'new-new-new-images/nnn-2.jpg', 'new-new-new-images/nnn-3.jpg',
  'new-new-new-images/nnn-4.jpg', 'new-new-new-images/nnn-5.jpg',
];

/** About page — key destinations list + supporting image grid + stats. */
export const aboutKeyDestinations: string[] = [
  'Lake Malawi National Park',
  'Liwonde National Park',
  'Majete Game Reserve',
  'Mulanje Mountain',
  'Zomba City & Plateau',
];

export const aboutImages: string[] = [
  'photos/new-rock-dome.jpg',
  'photos/new-elephant.jpg',
  'photos/new-lake-island.jpg',
  'photos/new-plateau.jpg',
];

export const aboutStats: [string, string][] = [
  ['100%', 'Locally owned & guided'],
  ['Years', 'On Mulanje’s trails'],
  ['1–10', 'Day tailored tours'],
];

export const homeStats: [string, string][] = [
  ['3,002m', 'Summit of Sapitwa'],
  ['1–10', 'Day tailored tours'],
  ['100%', 'Locally owned & guided'],
];

/** Options for the "Interested in" select. The contact page adds
    "Adventure activities"; the shared enquiry block omits it. */
export const enquiryInterests: string[] = [
  'Mount Mulanje trek',
  'Wildlife safari',
  'Southern Malawi tour',
  'Tea & culture',
  'Lake Malawi',
  'Not sure yet',
];

export const contactInterests: string[] = [
  'Mount Mulanje trek',
  'Wildlife safari',
  'Southern Malawi tour',
  'Adventure activities',
  'Tea & culture',
  'Lake Malawi',
  'Not sure yet',
];
