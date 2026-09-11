/* Tour data — ported verbatim from demo4/Home.dc.html tourData() (L699-849).
   The contextual type (Record<TourSlug, Tour>) turns the [a, b] array
   literals into the [string, string] tuples the interface requires and
   validates every `related` entry against TourSlug. */

export type TourSlug =
  | '3-day-mulanje'
  | '5-day-traverse'
  | '6-day-southern'
  | 'liwonde-safari'
  | 'tea-culture'
  | 'southern-explorer';

export interface TourStop {
  label: string;
  sub: string;
}

export interface TourDay {
  d: number;
  t: string;
  /** A single image path (tour days always carry one image). */
  img: string;
  body: string;
  /** [iconKey, label] — iconKey drives metaIcon(); unknown keys fall back. */
  meta: [string, string][];
}

export interface Tour {
  title: string;
  subtitle: string;
  heroImg: string;
  tagMain: string;
  tagSub: string;
  durFact: string;
  gradeFact: string;
  guestsFact: string;
  overviewH: string;
  overviewP: string[];
  quickFacts: [string, string][];
  facts: [string, string][];
  highlights: string[];
  stops: TourStop[];
  days: TourDay[];
  included: string[];
  optional: string[];
  notIncluded: string[];
  gallery: string[];
  related: TourSlug[];
  itinNote: string;
}

export const tours: Record<TourSlug, Tour> = {
  '3-day-mulanje': {
    title: '3-Day Mount Mulanje Trek',
    subtitle:
      'A demanding but deeply rewarding climb to Sapitwa, the highest peak in Central Africa, with a sunrise summit and nights in mountain huts.',
    heroImg: 'photos/summit-sign.jpg',
    tagMain: 'Mountain trek',
    tagSub: 'Mulanje Massif · Grade 4',
    durFact: '3 days / 2 nights',
    gradeFact: 'Grade 4 · challenging',
    guestsFact: 'Min 2 people',
    overviewH: 'Sunrise at Sapitwa',
    overviewP: [
      'A demanding but equally rewarding hike that culminates at the peak of Sapitwa which, at 3,002m above sea level, is the highest point in Central Africa. On a clear day, views extend to Mulanje’s outer peaks, Zomba Plateau, Lake Chirwa and Mozambique’s Milanje Mountain.',
      'Every itinerary is a starting point. You’re free to change routes, add nights or adjust the pace to match your fitness. Your mountain guide shapes the climb around you.',
    ],
    quickFacts: [
      ['Highest point', 'Sapitwa 3,002m'],
      ['Start / end', 'Likhubula'],
      ['Best season', 'May – Oct'],
    ],
    facts: [
      ['Duration', '3 days / 2 nights'],
      ['Grade', '4 - challenging'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Likhubula, Mulanje'],
      ['Finish', 'Likhubula, Mulanje'],
      ['Meals', 'All included (B/L/D)'],
    ],
    highlights: [
      'Sunrise summit of Sapitwa (3,002m)',
      'Dziwe La Mnkhalamba Falls & rock pools',
      'Elephant Head sunset viewpoint',
      'Nights in mountain forest huts',
    ],
    stops: [
      { label: 'Likhubula', sub: 'Base' },
      { label: 'Chisepho', sub: 'Hut' },
      { label: 'Sapitwa', sub: '3,002m' },
      { label: 'Likhubula', sub: 'Return' },
    ],
    days: [
      {
        d: 1,
        t: 'Arrival & warm-up hike',
        img: 'photos/waterfall-pool.jpg',
        body: 'Pick-up in Blantyre and transfer to Mulanje. After checking in and a tour briefing, we take a warm-up hike to the nearby Dziwe Lankhalamba falls and rock pools, returning to the lodge by sunset.',
        meta: [
          ['drive', 'Drive 3 hrs'],
          ['meal', 'Dinner'],
          ['bed', 'Likhubula lodge'],
        ],
      },
      {
        d: 2,
        t: 'Ascend the skyline path',
        img: 'photos/hikers-trail.jpg',
        body: 'Starting early, we ascend the shaded but demanding skyline path, following the Likhubula River Gorge to its source before reaching Chisepho Forest Hut, our base for the summit. Late afternoon we enjoy sunset at the Elephant Head viewpoint.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Chisepho Hut'],
        ],
      },
      {
        d: 3,
        t: 'Summit Sapitwa & descend',
        img: 'photos/sapitwa.jpg',
        body: 'A pre-dawn start for the summit of Sapitwa for sunrise over the massif. We return to the hut for brunch, then descend to Likhubula for a shower, lunch and debrief before your onward transfer.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'B / L'],
          ['car', 'Transfer out'],
        ],
      },
    ],
    included: [
      'All vehicle transfers',
      'Mountain-hut accommodation',
      'All meals as indicated (B/L/D)',
      'Park entry & car-park fees',
      'Guide & porter fees',
      'Catering utensils & mountain equipment',
    ],
    optional: [
      'Abseiling & zip-line river crossing',
      'Extra acclimatisation night',
      'Guided Dziwe La Mnkhalamba Falls tour',
    ],
    notIncluded: [
      'Flights & airport transfers beyond Blantyre',
      'Bottled water & extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/summit-celebrate.jpg',
      'photos/rock-pool.jpg',
      'photos/hikers-valley.jpg',
      'photos/misty-summit.jpg',
      'photos/waterfall-pool.jpg',
      'photos/sapitwa.jpg',
    ],
    related: ['5-day-traverse', '6-day-southern', 'tea-culture'],
    itinNote: 'Three days of mountain trekking. Meals shown as B / L / D.',
  },
  '5-day-traverse': {
    title: '5-Day Grand Mulanje Traverse',
    subtitle:
      'A traverse across the entire massif, taking in diverse vegetation, panoramic landscapes, optional peaks and countless rock pools.',
    heroImg: 'photos/new-misty-summit.jpg',
    tagMain: 'Mountain traverse',
    tagSub: 'Mulanje Massif · Grade 3',
    durFact: '5 days / 4 nights',
    gradeFact: 'Grade 3 · moderate',
    guestsFact: 'Min 2 people',
    overviewH: 'Across the whole massif',
    overviewP: [
      'This route takes you across the entire massif, allowing you to enjoy the diverse vegetation and landscapes with picture-perfect views of the plateau. A wide choice of optional peaks above 2,500m are yours to bag, along with numerous rock pools.',
      'Graded a little gentler than the direct summit route, the traverse rewards a steadier pace and more time on the mountain. Add or swap peaks to match your energy and the weather.',
    ],
    quickFacts: [
      ['Highest point', 'Sapitwa 3,002m'],
      ['Start / end', 'Likhubula → Tinyade'],
      ['Best season', 'May – Oct'],
    ],
    facts: [
      ['Duration', '5 days / 4 nights'],
      ['Grade', '3 - moderate'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Likhubula, Mulanje'],
      ['Finish', 'Tinyade Estate'],
      ['Meals', 'All included (B/L/D)'],
    ],
    highlights: [
      'Summit of Sapitwa (3,002m)',
      'Dziwe La Mnkhalamba Falls & Linje Pool',
      'Elephant Head sunset viewpoint',
      'Rou Gorge & optional peaks',
    ],
    stops: [
      { label: 'Likhubula', sub: 'Base' },
      { label: 'Chambe', sub: 'Basin' },
      { label: 'Chisepho', sub: 'Rock pools' },
      { label: 'Sapitwa', sub: '3,002m' },
      { label: 'Tinyade', sub: 'Descent' },
    ],
    days: [
      {
        d: 1,
        t: 'Arrival & warm-up hike',
        img: 'photos/waterfall-pool.jpg',
        body: 'Pick-up in Blantyre and transfer to Mulanje. After a briefing, a warm-up hike to nearby falls and rock pools before settling in for the traverse ahead.',
        meta: [
          ['drive', 'Drive 3 hrs'],
          ['meal', 'Dinner'],
          ['bed', 'Likhubula lodge'],
        ],
      },
      {
        d: 2,
        t: 'Ascend to Chambe Basin',
        img: 'photos/hikers-trail.jpg',
        body: 'We climb the shaded skyline path into the Chambe Basin, moving through patches of mountain rainforest and cedar. Afternoon at leisure to explore the plateau edges.',
        meta: [
          ['hike', 'Hike 6 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Chambe Hut'],
        ],
      },
      {
        d: 3,
        t: 'Traverse to Chisepho & rock pools',
        img: 'photos/hikers-valley.jpg',
        body: 'A scenic traverse across the plateau to Chisepho, with time for optional peaks and a swim in the crystal Linje Pool along the way.',
        meta: [
          ['hike', 'Hike 6 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Chisepho Hut'],
        ],
      },
      {
        d: 4,
        t: 'Summit Sapitwa & Elephant Head',
        img: 'photos/sapitwa.jpg',
        body: 'A pre-dawn summit of Sapitwa, then a traverse across undulating terrain to Thuchira Hut, finishing with sunset at the Elephant Head viewpoint.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Thuchira Hut'],
        ],
      },
      {
        d: 5,
        t: 'Descend via Rou Gorge',
        img: 'photos/mulanje-approach.jpg',
        body: 'We descend to the pick-up point at Tinyade Estate via the shaded Namwali-Zaone trail along the Likulezi River, then transfer back to Likhubula for a shower, lunch and debrief.',
        meta: [
          ['hike', 'Hike 4 hrs'],
          ['meal', 'B / L'],
          ['car', 'Transfer out'],
        ],
      },
    ],
    included: [
      'All vehicle transfers',
      'All lodge & mountain-hut accommodation',
      'All meals as indicated (B/L/D)',
      'Park entry & car-park fees',
      'Guide & porter fees',
      'Catering utensils & mountain equipment',
    ],
    optional: [
      'Optional peaks above 2,500m',
      'Abseiling & zip-line river crossing',
      'Extra acclimatisation night',
    ],
    notIncluded: [
      'Flights & airport transfers beyond Blantyre',
      'Bottled water & extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/new-misty-summit.jpg',
      'photos/hikers-valley.jpg',
      'photos/rock-pool.jpg',
      'photos/summit-celebrate.jpg',
      'photos/mulanje-approach.jpg',
      'photos/sapitwa.jpg',
    ],
    related: ['3-day-mulanje', '6-day-southern', 'southern-explorer'],
    itinNote: 'Five days across the massif. Meals shown as B / L / D.',
  },
  '6-day-southern': {
    title: '6-Day Southern Malawi Tour',
    subtitle:
      'Summit Sapitwa, safari the Shire River, and unwind on the shores of Lake Malawi - mountain, wildlife and water woven into one unforgettable week.',
    heroImg: 'photos/mulanje-view.jpg',
    tagMain: 'Signature journey',
    tagSub: 'Mulanje · Liwonde · Lake Malawi',
    durFact: '6 days / 5 nights',
    gradeFact: 'Grade 4 · challenging',
    guestsFact: 'Min 2 people',
    overviewH: 'The best of the south in one week',
    overviewP: [
      'This is our most complete journey - a demanding but deeply rewarding traverse of Mount Mulanje that culminates in a sunrise summit of Sapitwa, the highest peak in Central Africa, followed by a wildlife safari in Liwonde National Park and a restful finish on the golden shores of Lake Malawi.',
      'Every itinerary is a starting point. You’re free to change routes, add nights, or swap accommodation to match your fitness, budget and the time you have. Your mountain guide and host will shape the trip around you - before you arrive and even during the hike.',
    ],
    quickFacts: [
      ['Highest point', 'Sapitwa 3,002m'],
      ['Start / end', 'Blantyre → Lake'],
      ['Best season', 'May – Oct'],
    ],
    facts: [
      ['Duration', '6 days / 5 nights'],
      ['Grade', '4 - challenging'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Blantyre'],
      ['Finish', 'Cape Maclear, Lake Malawi'],
      ['Meals', 'All included (B/L/D)'],
    ],
    highlights: [
      'Sunrise summit of Sapitwa (3,002m)',
      'Dziwe La Mnkhalamba Falls & rock pools',
      'Elephant Head sunset viewpoint',
      'Boat safari on the Shire River',
      'Big game in Liwonde National Park',
      'Golden sunsets at Cape Maclear',
    ],
    stops: [
      { label: 'Blantyre', sub: 'Arrival' },
      { label: 'Mulanje', sub: 'Base' },
      { label: 'Sapitwa', sub: '3,002m' },
      { label: 'Zomba', sub: 'Plateau' },
      { label: 'Liwonde', sub: 'Safari' },
      { label: 'Lake Malawi', sub: 'Cape Maclear' },
    ],
    days: [
      {
        d: 1,
        t: 'Arrival & warm-up at Mulanje',
        img: 'photos/waterfall-pool.jpg',
        body: 'Pick-up at Blantyre airport or Doogles Lodge and a direct transfer to Mulanje. Check in and settle at the lodge, then - depending on your arrival - a warm-up hike to nearby falls and rock pools, returning by sunset. A detailed briefing of the whole tour follows over dinner.',
        meta: [
          ['drive', 'Drive 3 hrs'],
          ['meal', 'Dinner'],
          ['bed', 'Likhubula lodge'],
        ],
      },
      {
        d: 2,
        t: 'Ascent to Chisepho Basin',
        img: 'photos/hikers-trail.jpg',
        body: 'Starting early, we ascend the fairly shaded but demanding skyline path, following the Likhubula River Gorge to its very source before traversing to Chisepho Forest Hut - our base camp for the summit bid. We arrive mid-afternoon with time to rest.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Chisepho Hut'],
        ],
      },
      {
        d: 3,
        t: 'Summit Sapitwa · 3,002m',
        img: 'photos/sapitwa.jpg',
        body: 'A pre-dawn start for the summit of Sapitwa - the highest peak in Central Africa. On a clear day, views stretch to Zomba Plateau, Lake Chirwa and Mozambique’s Milanje Mountain. We return to Chisepho for brunch, then traverse undulating terrain and mountain rainforest to Thuchira Hut, celebrating with sunset at Elephant Head viewpoint.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Thuchira Hut'],
        ],
      },
      {
        d: 4,
        t: 'Descend to Zomba Plateau',
        img: 'photos/mulanje-approach.jpg',
        body: 'We descend to the pick-up point at Tinyade Estate via the shaded Namwali-Zaone trail along the Likulezi River, then transfer to Likhubula for a shower, lunch and debrief. We part with our mountain guides and drive on to Zomba Plateau, where an evening drive to the Queen’s View sunset point is highly recommended.',
        meta: [
          ['hike', 'Hike 4 hrs'],
          ['drive', 'Drive 4 hrs'],
          ['bed', 'Zomba Forest Lodge'],
        ],
      },
      {
        d: 5,
        t: 'Into Liwonde National Park',
        img: 'photos/elephant.jpg',
        body: 'A morning stroll to catch sunrise at the nearby trout farm before breakfast, then a transfer to Liwonde National Park. We settle at Kuthengo Camp, set on the bank of the mighty Shire River, and head out on an evening game drive - you may even meet the park’s newly introduced pride of cheetahs.',
        meta: [
          ['drive', 'Drive 4+2 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Kuthengo Camp'],
        ],
      },
      {
        d: 6,
        t: 'Shire safari & Lake Malawi',
        img: 'photos/lake-sunset.jpg',
        body: 'After breakfast, a two-hour boat safari up the Shire brings you close to crocodiles, hippos and countless birds gathering at the banks. We then drive to Cape Maclear in Lake Malawi National Park, pausing at Mangochi fish market, arriving lakeside before sunset to begin your lakeside escape.',
        meta: [
          ['boat', 'Boat 2 hrs'],
          ['drive', 'Drive 9 hrs'],
          ['bed', 'Cape Maclear'],
        ],
      },
    ],
    included: [
      'All vehicle transfers',
      'All lodge & mountain-hut accommodation',
      'All meals as indicated (B/L/D)',
      'All park entry & car-park fees',
      'All guide & porter fees',
      'Catering utensils & mountain equipment',
      '1× 4x4 game drive · 1× boat safari',
      '2× sail-boat rides on Lake Malawi',
    ],
    optional: [
      'Abseiling & zip-line river crossing',
      'Kayaking, snorkelling & deep-water diving',
      'Walking safari & night game drive',
      'Extra nights on Lake Malawi',
    ],
    notIncluded: [
      'International & domestic flights',
      'Bottled water & extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/summit-celebrate.jpg',
      'photos/rock-pool.jpg',
      'photos/hikers-valley.jpg',
      'photos/boat-safari.jpg',
      'photos/tea-carry.jpg',
      'photos/lake-beach.jpg',
      'photos/misty-summit.jpg',
      'photos/village-group.jpg',
    ],
    related: ['3-day-mulanje', 'liwonde-safari', 'southern-explorer'],
    itinNote: 'Six days of mountain, wildlife and water. Meals shown as B / L / D.',
  },
  'liwonde-safari': {
    title: 'Liwonde Wildlife Safari',
    subtitle:
      'Game drives and a boat safari along the mighty Shire River in one of Malawi’s most accessible and rewarding national parks.',
    heroImg: 'photos/new-elephant.jpg',
    tagMain: 'Wildlife safari',
    tagSub: 'Liwonde National Park',
    durFact: '3 days / 2 nights',
    gradeFact: 'Easy · all ages',
    guestsFact: 'Min 2 people',
    overviewH: 'Big game on the Shire',
    overviewP: [
      'Liwonde is one of the most accessible and professionally managed parks in the region, set on the banks of the mighty Shire River. Expect elephant, hippo, crocodile, antelope and a recently reintroduced pride of cheetah, alongside some of Malawi’s finest birding.',
      'Days blend well-maintained game drives with peaceful boat safaris. Extend your stay with a walking safari or a night drive for a different perspective on the bush.',
    ],
    quickFacts: [
      ['Park', 'Liwonde / Shire'],
      ['Base', 'Kuthengo Camp'],
      ['Best season', 'May – Nov'],
    ],
    facts: [
      ['Duration', '3 days / 2 nights'],
      ['Grade', 'Easy'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Liwonde'],
      ['Finish', 'Liwonde'],
      ['Meals', 'All included (B/L/D)'],
    ],
    highlights: [
      'Boat safari on the Shire River',
      'Elephant, hippo & crocodile',
      'Cheetah & other big game',
      'Exceptional birdlife',
    ],
    stops: [
      { label: 'Liwonde', sub: 'Arrival' },
      { label: 'Kuthengo', sub: 'Camp' },
      { label: 'Shire River', sub: 'Boat safari' },
    ],
    days: [
      {
        d: 1,
        t: 'Arrival & evening game drive',
        img: 'photos/elephant.jpg',
        body: 'Transfer to Liwonde and settle at Kuthengo Camp on the bank of the Shire. An evening game drive on the park’s well-maintained trails, where you may meet the newly introduced pride of cheetah among the abundant game and birdlife.',
        meta: [
          ['drive', 'Game drive'],
          ['meal', 'Full board'],
          ['bed', 'Kuthengo Camp'],
        ],
      },
      {
        d: 2,
        t: 'Shire boat safari & bush',
        img: 'photos/boat-safari.jpg',
        body: 'A morning boat safari brings you close to crocodiles and hippos wading in the shallows, with countless birds and land animals gathering at the banks. Afternoon at leisure or an optional walking safari.',
        meta: [
          ['boat', 'Boat 2 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Kuthengo Camp'],
        ],
      },
      {
        d: 3,
        t: 'Sunrise drive & departure',
        img: 'photos/hippos.jpg',
        body: 'A final sunrise game drive to make the most of the cool early light before breakfast and your onward transfer.',
        meta: [
          ['drive', 'Game drive'],
          ['meal', 'Breakfast'],
          ['car', 'Transfer out'],
        ],
      },
    ],
    included: [
      'Park entry & conservation fees',
      'All game drives as indicated',
      'Shire River boat safari',
      'All meals as indicated (B/L/D)',
      'Camp accommodation',
      'Professional safari guide',
    ],
    optional: [
      'Walking safari',
      'Night game drive',
      'Extra nights in the park',
      'Transfer to Lake Malawi',
    ],
    notIncluded: [
      'Flights & long-distance transfers',
      'Bottled water & extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/elephant2.jpg',
      'photos/hippos.jpg',
      'photos/boat-safari.jpg',
      'photos/kudu.jpg',
      'photos/antelope.jpg',
      'photos/new-elephant-herd.jpg',
    ],
    related: ['6-day-southern', 'southern-explorer', 'tea-culture'],
    itinNote: 'Three days on safari. Meals shown as B / L / D.',
  },
  'tea-culture': {
    title: 'Tea & Culture Experience',
    subtitle:
      'Historic tea estates followed by village visits and the warm traditions of local communities.',
    heroImg: 'photos/new-tea-mountain.jpg',
    tagMain: 'Tea & culture',
    tagSub: 'Mulanje & Thyolo',
    durFact: '2 days / 1 night',
    gradeFact: 'Relaxed · all ages',
    guestsFact: 'Min 2 people',
    overviewH: 'Tea fields & village life',
    overviewP: [
      'Walk the rolling plantations of Mulanje and Thyolo on an informative guided field and factory tour, and learn how Malawi’s tea is grown, picked and made. The pace is gentle and the welcome genuine.',
      'The best way to experience traditional cuisine and mingle with locals is around a village visit or a national festival. We match the trip to what’s happening while you’re here.',
    ],
    quickFacts: [
      ['Region', 'Mulanje & Thyolo'],
      ['Pace', 'Relaxed'],
      ['Best season', 'Year-round'],
    ],
    facts: [
      ['Duration', '2 days / 1 night'],
      ['Grade', 'Relaxed'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Mulanje'],
      ['Finish', 'Mulanje'],
      ['Meals', 'B / L included'],
    ],
    highlights: [
      'Tea estate field & factory tour',
      'Village visit & local cuisine',
      'Traditional music & dance',
      'Craft markets & curio shopping',
    ],
    stops: [
      { label: 'Mulanje', sub: 'Tea estate' },
      { label: 'Thyolo', sub: 'Factory tour' },
      { label: 'Village', sub: 'Culture' },
    ],
    days: [
      {
        d: 1,
        t: 'Tea estate field & factory tour',
        img: 'photos/tea-picker.jpg',
        body: 'A guided walk through the rolling tea estates of Mulanje and Thyolo, following the leaf from field to factory to learn how Malawi’s tea is grown and made. Afternoon visit to a nearby village to meet the community.',
        meta: [
          ['walk', 'Guided tour'],
          ['meal', 'B / L'],
          ['bed', 'Estate lodge'],
        ],
      },
      {
        d: 2,
        t: 'Village life & craft markets',
        img: 'photos/village-dance.jpg',
        body: 'A morning of traditional music, dance and cuisine with the local community, followed by time at the craft markets and a curio art shop before your onward transfer.',
        meta: [
          ['walk', 'Village visit'],
          ['meal', 'Breakfast'],
          ['car', 'Transfer out'],
        ],
      },
    ],
    included: [
      'Vehicle transfers within the region',
      'Guided tea field & factory tour',
      'Village visit & cultural activities',
      'Meals as indicated',
      'One night’s accommodation',
    ],
    optional: [
      'National festival attendance (seasonal)',
      'Extra village homestay night',
      'Combine with a Mulanje trek',
    ],
    notIncluded: [
      'Flights & long-distance transfers',
      'Extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/tea-mountain.jpg',
      'photos/tea-estate.jpg',
      'photos/tea-carry.jpg',
      'photos/village-group.jpg',
      'photos/new-tea-pickers.jpg',
      'photos/village-dance.jpg',
    ],
    related: ['3-day-mulanje', 'liwonde-safari', '6-day-southern'],
    itinNote: 'Two relaxed days of tea and culture. Meals shown as B / L / D.',
  },
  'southern-explorer': {
    title: 'Southern Malawi Explorer',
    subtitle:
      'The grand tour - Mount Mulanje, tea estates, culture, a wildlife safari and Lake Malawi, tailored to the time you have.',
    heroImg: 'photos/new-lake-island.jpg',
    tagMain: 'Grand tour',
    tagSub: 'Mountain · Safari · Lake',
    durFact: '7–10 days',
    gradeFact: 'Moderate · tailored',
    guestsFact: 'Min 2 people',
    overviewH: 'The whole of the south',
    overviewP: [
      'Our most complete journey combines Mount Mulanje, historic tea estates, village culture, a Liwonde wildlife safari and a restful finish on the shores of Lake Malawi. The length flexes from seven to ten days around your interests and pace.',
      'Because it’s tailored, every element can move - add summit days, more time on safari, or extra nights at the lake. We build the route with you before you arrive.',
    ],
    quickFacts: [
      ['Highest point', 'Sapitwa 3,002m'],
      ['Start / end', 'Blantyre → Lake'],
      ['Best season', 'May – Oct'],
    ],
    facts: [
      ['Duration', '7–10 days'],
      ['Grade', 'Moderate - tailored'],
      ['Group size', 'Min 2, up to 20'],
      ['Start', 'Blantyre'],
      ['Finish', 'Cape Maclear, Lake Malawi'],
      ['Meals', 'All included (B/L/D)'],
    ],
    highlights: [
      'Summit of Sapitwa (3,002m)',
      'Tea estate & village culture',
      'Liwonde wildlife safari',
      'Boat safari on the Shire',
      'Lake Malawi & Thumbi Island',
      'Sunset cruises & fish-eagle feeding',
    ],
    stops: [
      { label: 'Blantyre', sub: 'Arrival' },
      { label: 'Mulanje', sub: 'Trek & tea' },
      { label: 'Zomba', sub: 'Plateau' },
      { label: 'Liwonde', sub: 'Safari' },
      { label: 'Lake Malawi', sub: 'Cape Maclear' },
    ],
    days: [
      {
        d: 1,
        t: 'Arrival in Blantyre',
        img: 'photos/mulanje-approach.jpg',
        body: 'Pick-up at Blantyre airport and transfer to Mulanje, with a tour briefing and a warm-up hike to nearby falls and rock pools on arrival.',
        meta: [
          ['drive', 'Drive 3 hrs'],
          ['meal', 'Dinner'],
          ['bed', 'Likhubula lodge'],
        ],
      },
      {
        d: 2,
        t: 'Tea estates & Mulanje',
        img: 'photos/tea-picker.jpg',
        body: 'A guided tea field and factory tour on the rolling estates of Mulanje and Thyolo, with an afternoon village visit before we prepare for the mountain.',
        meta: [
          ['walk', 'Guided tour'],
          ['meal', 'Full board'],
          ['bed', 'Likhubula lodge'],
        ],
      },
      {
        d: 3,
        t: 'Summit Sapitwa',
        img: 'photos/sapitwa.jpg',
        body: 'Ascend to the high huts and summit Sapitwa for sunrise over the massif, with an afternoon at the Elephant Head sunset viewpoint.',
        meta: [
          ['hike', 'Hike 8 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Mountain hut'],
        ],
      },
      {
        d: 4,
        t: 'Descend to Zomba Plateau',
        img: 'photos/mulanje-view.jpg',
        body: 'Descend the massif and transfer to Zomba Plateau, with an evening drive to the Queen’s View sunset point.',
        meta: [
          ['drive', 'Drive 4 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Zomba Forest Lodge'],
        ],
      },
      {
        d: 5,
        t: 'Liwonde game drive',
        img: 'photos/elephant.jpg',
        body: 'Transfer to Liwonde National Park and settle at Kuthengo Camp on the Shire, with an evening game drive among elephant, antelope and cheetah.',
        meta: [
          ['drive', 'Drive 4 hrs'],
          ['meal', 'Full board'],
          ['bed', 'Kuthengo Camp'],
        ],
      },
      {
        d: 6,
        t: 'Shire safari to the lake',
        img: 'photos/boat-safari.jpg',
        body: 'A morning boat safari up the Shire, then a drive to Cape Maclear on Lake Malawi, pausing at Mangochi fish market and arriving lakeside before sunset.',
        meta: [
          ['boat', 'Boat 2 hrs'],
          ['drive', 'Drive'],
          ['bed', 'Cape Maclear'],
        ],
      },
      {
        d: 7,
        t: 'Lake Malawi & Thumbi Island',
        img: 'photos/lake-sunset.jpg',
        body: 'A day at leisure on the sandy beaches and crystal water, with optional kayaking, snorkelling or diving, finishing with a sunset cruise to Thumbi Island for fish-eagle feeding.',
        meta: [
          ['boat', 'Sunset cruise'],
          ['meal', 'Full board'],
          ['bed', 'Thumbi Lodge'],
        ],
      },
      {
        d: 8,
        t: 'Departure',
        img: 'photos/lake-beach.jpg',
        body: 'Depending on your flight, a morning at leisure or an optional visit to a curio art shop or tea factory before your transfer to the airport.',
        meta: [
          ['car', 'Transfer out'],
          ['meal', 'Breakfast'],
        ],
      },
    ],
    included: [
      'All vehicle transfers',
      'All lodge, mountain-hut & camp accommodation',
      'All meals as indicated (B/L/D)',
      'All park entry & conservation fees',
      'Guide & porter fees',
      'Game drive, boat safari & lake cruises',
    ],
    optional: [
      'Abseiling & zip-line river crossing',
      'Kayaking, snorkelling & diving',
      'Walking safari & night game drive',
      'Extra nights on Lake Malawi',
    ],
    notIncluded: [
      'International & domestic flights',
      'Bottled water & extra drinks',
      'Travel insurance',
      'Tips & personal spending',
    ],
    gallery: [
      'photos/summit-celebrate.jpg',
      'photos/tea-carry.jpg',
      'photos/boat-safari.jpg',
      'photos/lake-sunset.jpg',
      'photos/new-lake-island.jpg',
      'photos/village-group.jpg',
      'photos/sapitwa.jpg',
      'photos/lake-beach.jpg',
    ],
    related: ['6-day-southern', 'liwonde-safari', '5-day-traverse'],
    itinNote: 'Seven to ten days across the south. Meals shown as B / L / D.',
  },
};

/** Ordered list of tour slugs (insertion order of `tours`). */
export const tourSlugs = Object.keys(tours) as TourSlug[];

/** Type guard for a route param. */
export function isTourSlug(value: string): value is TourSlug {
  return value in tours;
}
