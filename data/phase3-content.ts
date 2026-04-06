import type {
  EnquiryFormBlock,
  PageAction,
  PageCard,
  PageSection,
  PageStat
} from "@/components/page/PhaseThreeTemplates";
import { trips } from "@/lib/data/trips";

export interface LandingPageContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  actions?: PageAction[];
  stats?: PageStat[];
  sections?: PageSection[];
  cards?: PageCard[];
  enquiryForm?: EnquiryFormBlock;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaActions?: PageAction[];
}

export interface DetailPageContent {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  meta?: PageStat[];
  sections: PageSection[];
  relatedCards?: PageCard[];
  enquiryForm?: EnquiryFormBlock;
  inquiryTitle?: string;
  inquiryDescription?: string;
  inquiryActions?: PageAction[];
}

const sahyadriImage = trips[0]?.heroImage ?? "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80";
const himalayaImage = trips[3]?.heroImage ?? sahyadriImage;
const coastalImage = trips[8]?.heroImage ?? sahyadriImage;
const forestImage = trips[6]?.heroImage ?? sahyadriImage;
const valleyImage = trips[5]?.heroImage ?? sahyadriImage;

export const teamExplorersPage: LandingPageContent = {
  eyebrow: "Team Explorers",
  title: "Built by outdoor leaders, trainers, and coordinators who love field execution.",
  description:
    "This page introduces the people and culture behind Explorers: route leaders, camp mentors, coordinators, and partner experts who shape the experience from first enquiry to final return.",
  image: sahyadriImage,
  caption: "Leader briefing before sunrise departure",
  actions: [
    { label: "View Upcoming Treks", href: "/trips", tone: "primary" },
    { label: "Contact The Team", href: "/contact-us", tone: "secondary" }
  ],
  stats: [
    { label: "Community Reach", value: "2 Lakh+" },
    { label: "Years On Ground", value: "Since 2001" },
    { label: "Platform Rating", value: "4.6 Star" },
    { label: "Core Focus", value: "Adventure | Travel | Training" }
  ],
  sections: [
    {
      title: "About Us",
      description:
        "Explorers has grown as a field-first community with a premium execution mindset. We design routes, camps, school programs, family-friendly tours, and leadership training with the same attention to safety, pacing, and experience quality."
    },
    {
      title: "Why Explorers",
      bullets: [
        "Editorial-style trip design that feels polished before, during, and after the event.",
        "Experienced trek captains and support coordinators for both beginner and advanced batches.",
        "Programs spanning Sahyadri, Himalayan, school, corporate, safari, and travel experiences.",
        "A people-first community approach that balances adventure with comfort and clarity."
      ]
    },
    {
      title: "Awards & Affiliations",
      bullets: [
        "Trusted by repeat trekkers, schools, family groups, and corporate teams.",
        "Recognized through strong public review sentiment across Google, TripAdvisor, and Facebook.",
        "Built around responsible outdoor culture, disciplined route operations, and leader development."
      ]
    }
  ],
  ctaTitle: "Want to work with or travel with this team?",
  ctaDescription:
    "Use the contact page for collaborations, careers, school inquiries, custom departures, or to understand which program line fits you best.",
  ctaActions: [
    { label: "Open Contact Page", href: "/contact-us" },
    { label: "Browse Programs", href: "/#featured-programs", tone: "secondary" }
  ]
};

export const contactUsPage: LandingPageContent = {
  eyebrow: "Contact Us",
  title: "Call, WhatsApp, or plan your next departure with the support desk.",
  description:
    "Reach out for trek schedules, custom family tours, school camps, corporate outings, group bookings, payment questions, or partnership discussions.",
  image: forestImage,
  caption: "Support team coordinating departures and guest communication",
  actions: [
    { label: "View Treks", href: "/trips" },
    { label: "Corporate Outings", href: "/corporate-outings", tone: "secondary" }
  ],
  stats: [
    { label: "Phone", value: "+91 98765 43210" },
    { label: "WhatsApp", value: "+91 98765 43210" },
    { label: "Base", value: "Pune" },
    { label: "Help Window", value: "All Week" }
  ],
  sections: [
    {
      title: "How To Reach Us",
      bullets: [
        "Phone and WhatsApp support for departures, availability, and payment guidance.",
        "Fast routing for school, family, and corporate enquiries.",
        "On-ground team coordination for custom departures and private batches."
      ]
    },
    {
      title: "What To Share",
      bullets: [
        "Your preferred destination or program type.",
        "Expected travel month and number of participants.",
        "Fitness level, age group, or special support requirements.",
        "Budget range or accommodation preference for tour-style departures."
      ]
    },
    {
      title: "Payment & Location",
      bullets: [
        "GPay, QR, and bank transfer details are available globally across the site.",
        "Share your booking ID and payment reference for faster help during checkout.",
        "Map embed and location details can be added here once client-final coordinates are confirmed."
      ]
    }
  ],
  ctaTitle: "Need a response on a specific travel idea?",
  ctaDescription:
    "Start with the closest page family below or jump straight into the trek board if you already know the season or route style you want.",
  ctaActions: [
    { label: "Browse Upcoming Treks", href: "/trips" },
    { label: "Open International Tours", href: "/international-tours", tone: "secondary" }
  ]
};

export const corporateOutingsPage: LandingPageContent = {
  eyebrow: "Corporate Outings",
  title: "Adventure-led team experiences designed for alignment, energy, and memorable offsites.",
  description:
    "Corporate outings at Explorers blend team building, travel, one-day treks, and custom outdoor modules with smooth coordination and premium hosting.",
  image: forestImage,
  caption: "Teams moving from boardroom thinking to field energy",
  actions: [
    { label: "Contact For Corporate Plans", href: "/contact-us" },
    { label: "View Trek Board", href: "/trips", tone: "secondary" }
  ],
  stats: [
    { label: "Format Options", value: "1 Day to Multi-Day" },
    { label: "Use Cases", value: "Teams | Leaders | Clients" },
    { label: "Modules", value: "Adventure + Workshops" },
    { label: "Customization", value: "Fully Flexible" }
  ],
  sections: [
    {
      title: "Team Building Activities",
      bullets: [
        "Outdoor problem-solving and leader rotation challenges.",
        "Nature-based trust modules and collaborative movement tasks.",
        "Low-intensity, inclusive formats for mixed teams and cross-functional groups."
      ]
    },
    {
      title: "Adventure Treks",
      bullets: [
        "One-day or overnight Sahyadri experiences for groups seeking movement with structure.",
        "Beginner-friendly options and stronger challenge formats for active teams.",
        "Leader briefings, safety marshals, transport coordination, and meal planning."
      ]
    },
    {
      title: "Customised Packages",
      bullets: [
        "Add stays, transport, facilitation, brand moments, and post-activity dining.",
        "Blend treks with strategy sessions, award moments, or cultural travel elements.",
        "Shape the outing for onboarding, recognition, leadership, or quarterly resets."
      ]
    }
  ],
  enquiryForm: {
    variant: "corporate",
    title: "Corporate enquiry form",
    description: "Share your team size, outing type, and preferred location so the team can shape the right offsite format."
  },
  ctaTitle: "Planning a company offsite or leadership reset?",
  ctaDescription:
    "Share your headcount, preferred region, budget bracket, and event intent, and we can shape a custom corporate adventure flow around it.",
  ctaActions: [
    { label: "Contact Us", href: "/contact-us" },
    { label: "Open Jungle Safari", href: "/jungle-safari", tone: "secondary" }
  ]
};

export const upcomingToursPage: LandingPageContent = {
  eyebrow: "Upcoming Tours",
  title: "Domestic and international journeys collected into one premium planning page.",
  description:
    "Upcoming Tours is the softer-travel counterpart to the trek board. It pulls together coast, desert, culture, family travel, and international routes into a calmer decision space.",
  image: coastalImage,
  caption: "Tour-led travel with stronger comfort and slower pacing",
  actions: [
    { label: "Open International Tours", href: "/international-tours" },
    { label: "View Trek Board", href: "/trips", tone: "secondary" }
  ],
  stats: [
    { label: "Styles", value: "Family to Premium" },
    { label: "Coverage", value: "India + International" },
    { label: "Flow", value: "Hub to Enquiry" },
    { label: "Fit", value: "Friends | Couples | Families" }
  ],
  sections: [
    {
      title: "Domestic Escape Types",
      bullets: [
        "Coastal breaks, scenic camps, light-adventure circuits, and slow weekend travel.",
        "Flexible enough for couples, families, and mixed-age friend circles.",
        "Useful when the user wants comfort and destination mood more than intense trek difficulty."
      ]
    },
    {
      title: "International Planning",
      bullets: [
        "Destination-first planning for honeymoon, family, or friend travel groups.",
        "Hotel category, transport mode, meal plan, and activity layering can be customized.",
        "Acts as the route family feeding into the new international tour pages."
      ]
    },
    {
      title: "Why This Page Exists",
      bullets: [
        "Separates tour-style journeys from the trek board so discovery feels less noisy.",
        "Gives the brand a clearer place to present domestic and international travel options.",
        "Makes future enquiry forms, blogs, and review widgets easier to attach."
      ]
    }
  ],
  cards: [
    {
      title: "International Tours",
      description: "Open the full destination grid for Nepal, Sri Lanka, Thailand, Bali, Maldives, and more.",
      href: "/international-tours",
      image: coastalImage,
      caption: "Destination-led travel pages",
      meta: "International"
    },
    {
      title: "Camping Escapes",
      description: "A lighter adventure route for lakeside, beach, and mountain-edge camp experiences.",
      href: "/camping",
      image: coastalImage,
      caption: "Camp-led getaways",
      meta: "Domestic"
    },
    {
      title: "Corporate Journeys",
      description: "For teams that want a smoother travel and offsite format with custom hosting.",
      href: "/corporate-outings",
      image: forestImage,
      caption: "Team travel and experiences",
      meta: "Custom"
    }
  ],
  ctaTitle: "Need help deciding between a trek and a tour-style route?",
  ctaDescription:
    "Use Upcoming Tours when comfort, destination variety, and a calmer pace matter more than trail intensity. Use the trek board when users want difficulty, batch windows, and structured mountain movement.",
  ctaActions: [
    { label: "Browse All Tours", href: "/international-tours" },
    { label: "Browse Treks", href: "/trips", tone: "secondary" }
  ]
};

export const himalayanTreksPage: LandingPageContent = {
  eyebrow: "Himalayan Treks",
  title: "Summit, crossover, and scenic altitude journeys with stronger mountain intent.",
  description:
    "This page collects the Himalayan side of Explorers into one clearer destination: snow summits, pass crossings, scenic valleys, and high-altitude planning with disciplined support.",
  image: himalayaImage,
  caption: "High-altitude mornings with structured expedition rhythm",
  actions: [
    { label: "Open Himalayan Filter", href: "/trips?category=Himalayan%20Treks" },
    { label: "View ATLAS", href: "/programs/atlas", tone: "secondary" }
  ],
  stats: [
    { label: "Region", value: "Himalaya" },
    { label: "Formats", value: "Summit | Pass | Scenic" },
    { label: "Pace", value: "Acclimatized" },
    { label: "Support", value: "Leader-Led" }
  ],
  sections: [
    {
      title: "What Makes These Different",
      bullets: [
        "Longer expedition rhythm, altitude management, and stronger day-to-day route planning.",
        "A more demanding preparation expectation than general Sahyadri weekend departures.",
        "Better suited to explorers seeking mountain intent rather than only a scenic short break."
      ]
    },
    {
      title: "Core Experience Types",
      bullets: [
        "Winter summit routes with snow movement and camp discipline.",
        "Pass-crossing formats that move across changing landscapes.",
        "Scenic and spiritual trails that blend altitude with visual richness."
      ]
    },
    {
      title: "Preparation Mindset",
      bullets: [
        "Fitness, layering, hydration, and patience are all part of the product experience here.",
        "These routes benefit from better pre-trip planning and clearer communication.",
        "They pair naturally with ATLAS and the stronger adventure-training identity of the brand."
      ]
    }
  ],
  cards: trips
    .filter((trip) => trip.region === "Himalaya")
    .slice(0, 4)
    .map((trip) => ({
      title: trip.name,
      description: trip.summary,
      href: `/tours/${trip.slug}`,
      image: trip.heroImage,
      caption: trip.destination,
      meta: trip.category
    })),
  ctaTitle: "Want the full board of Himalayan departures?",
  ctaDescription:
    "Use this page as the branded gateway, then move into the filtered trek board or a specific trek detail page depending on how ready the user is to choose.",
  ctaActions: [
    { label: "Filtered Himalayan Board", href: "/trips?category=Himalayan%20Treks" },
    { label: "Contact The Team", href: "/contact-us", tone: "secondary" }
  ]
};

export const equipmentRentalPage: LandingPageContent = {
  eyebrow: "Equipment Rental",
  title: "Outdoor gear access for trekkers, camps, schools, and custom travel groups.",
  description:
    "The rental page covers the most-requested field gear categories so users can understand what is available before final inventory and pricing are connected later.",
  image: himalayaImage,
  caption: "Field-ready gear supporting smooth mountain departures",
  actions: [
    { label: "Ask About Availability", href: "/contact-us" },
    { label: "Browse Treks", href: "/trips", tone: "secondary" }
  ],
  sections: [
    {
      title: "Available Categories",
      bullets: [
        "Tents, sleeping bags, mats, and camp-support items.",
        "Backpacks, trekking poles, headlamps, and rain protection.",
        "Technical or high-altitude add-ons for selected departures."
      ]
    },
    {
      title: "Indicative Pricing Bands",
      bullets: [
        "Headlamps and poles: INR 150 to 300 per event.",
        "Backpacks and rain gear: INR 250 to 600 per event.",
        "Sleeping bags and camp items: INR 400 to 1200 depending on specification."
      ]
    },
    {
      title: "How To Request",
      bullets: [
        "Mention your trip name, departure date, and number of people.",
        "Share your size or gear preference if relevant.",
        "Use this as a pre-enquiry page until final live inventory is connected."
      ]
    }
  ],
  ctaTitle: "Need gear with your booking?",
  ctaDescription:
    "Use the contact route for now and mention the destination page or trek name so the team can guide you on current gear availability.",
  ctaActions: [
    { label: "Contact Support", href: "/contact-us" },
    { label: "Open Booking Flow", href: "/trips", tone: "secondary" }
  ]
};

export const campingDestinations: DetailPageContent[] = [
  buildDestination("pawna", "Pawna Lake Camping", "Camping Packages", coastalImage, "Lakeside camping near Pune with scenic views, bonfire, music, and local delicious food.", [
    "Ideal for weekend getaways with optional trekking and boating activities.",
    "Offers dome tents, glamping tents, Swiss cottage tents, and villa stay formats.",
    "Best suited for friend groups, families, and quick outdoor escapes from Pune and Mumbai."
  ]),
  buildDestination("vasota", "Vasota Lakeside Camping", "Camping Packages", forestImage, "Camping near Shivsagar Lake with wilderness vibes, night camping, and Vasota trek access.", [
    "Best for nature lovers and adventure seekers who want a more raw outdoor setting.",
    "Pairs naturally with the Vasota route and deeper lakeside wilderness atmosphere.",
    "Can include hotel room options for groups wanting a softer overnight layer."
  ]),
  buildDestination("bhandardara", "Bhandardara Lake Camping", "Camping Packages", valleyImage, "Peaceful lakeside camping near Arthur Lake with waterfall views and stargazing mood.", [
    "A strong fit for families, friend circles, and slower scenic group outings.",
    "Can be combined with trekking routes, waterfall viewpoints, and quiet overnight stays.",
    "Available in dome tent, hotel room, and luxury hotel style depending on requirement."
  ]),
  buildDestination("malshejghat", "Malshej Ghat Lakeside Camping", "Camping Packages", valleyImage, "Monsoon and winter camping surrounded by mountains, fog, and waterfalls.", [
    "Includes access to short treks, scenic driving, and birdwatching opportunities.",
    "Works beautifully as a monsoon-heavy visual destination.",
    "Can be planned with dome tents, hotel rooms, or more comfort-led stays."
  ]),
  buildDestination("mahabaleshwar", "Mahabaleshwar Camping", "Camping Packages", forestImage, "Hill-station camping amidst forests and valleys with cool weather and sunrise viewpoints.", [
    "A softer camping option for people who want climate, greenery, and nearby trek movement.",
    "Useful for families and groups wanting camping with a hill-station mood.",
    "Can be designed with tents, hotel rooms, or premium stay options."
  ]),
  buildDestination("kolad", "Kolad Camping", "Camping Packages", forestImage, "Riverside camping near Kundalika River with adventure-led energy.", [
    "Popular for rafting, kayaking, and activity-heavy group formats.",
    "A strong fit for corporates, youth groups, and friends who want movement through the stay.",
    "Works well as a day-to-night or weekend activity circuit."
  ]),
  buildDestination("panshet", "Panshet Camping", "Camping Packages", coastalImage, "Lake-view camping close to Pune with calm surroundings, water activities, and beginner-friendly treks.", [
    "Minimum five campsite options can be arranged with villa and glamping tent choices.",
    "Great for groups wanting quick access, good views, and flexible comfort levels.",
    "Works for family outings, student groups, and corporate day-to-night formats."
  ]),
  buildDestination("mulshi", "Mulshi Camping", "Camping Packages", valleyImage, "Scenic camp settings with premium natural mood during monsoon and winter windows.", [
    "Great for couples, small groups, and quiet premium getaways.",
    "Strong visual atmosphere with fog, hills, and slow-travel energy.",
    "Pairs well with photography-led, restful, and softer outdoor weekends."
  ]),
  buildDestination("revdanda", "Revdanda Beach Camping", "Camping Packages", coastalImage, "Beach camping near Alibaug with sea breeze, bonfire, and coastal walks.", [
    "A relaxed group format for friend circles and easy weekend escapes.",
    "Can blend beach time, night camp atmosphere, and short coastal movement.",
    "Useful for people who want camping with a lighter adventure tone."
  ]),
  buildDestination("alibaug", "Alibaug Beach Camping", "Camping Packages", coastalImage, "Beachside camping with easy sea access, sunset time, and soft coastal energy.", [
    "Useful for quick coastal departures from Pune or Mumbai.",
    "Can include hotel rooms and villas for groups wanting a more flexible stay style.",
    "A strong option for beach mood without giving up the camping atmosphere."
  ]),
  buildDestination("malvan", "Malvan Beach Camping", "Camping Packages", coastalImage, "Konkan beach camping with local Malvani food, water sports, snorkeling, and coastal exploration.", [
    "Best for food-loving groups who want sea activity, local culture, and scenic overnight stays.",
    "Can include hotel rooms or villa options depending on travel style.",
    "Good for families and friend circles wanting a coastal camping circuit."
  ]),
  buildDestination("uran", "Uran Beach Camping", "Camping Packages", coastalImage, "A short coastal outing format for beachside camping, calm evenings, and simple group time.", [
    "Works well when accessibility and relaxed sea-breeze atmosphere both matter.",
    "Can be tuned toward youth groups, mixed-age circles, or casual weekend stays.",
    "Offers a cleaner entry point into beach camping without a heavy travel load."
  ]),
  buildDestination("madheghat", "Madheghat Camping", "Camping Packages", sahyadriImage, "Forest-side camping near waterfalls and historical routes for offbeat nature stays.", [
    "Suitable for quiet camping with a stronger trekking and history backdrop.",
    "Best during lush seasonal windows when the landscape feels raw and dramatic.",
    "Ideal for explorers who prefer offbeat over crowded camping circuits."
  ]),
  buildDestination("tikona", "Tikona Fort Camping", "Camping Packages", sahyadriImage, "Camping at the base of Tikona Fort with views of Pawna Lake and an early-morning fort climb.", [
    "Strong option for people who want a fort plus camping combination in one short trip.",
    "Offers night views, classic Sahyadri movement, and easy add-on trekking.",
    "Good for beginner and mixed-age groups who still want a real mountain feel."
  ]),
  buildDestination("rajmachi", "Rajmachi Fort Camping", "Camping Packages", sahyadriImage, "A popular Sahyadri camping location with fireflies season treks, historic forts, and scenic trails.", [
    "One of the strongest storytelling destinations for fort, trail, and night-stay atmosphere.",
    "Good fit for monsoon, fireflies, and heritage-rich trekking groups.",
    "Can blend camping with classic Rajmachi movement and fort exploration."
  ]),
  buildDestination("prabalmachi", "Prabalmachi Fort Camping", "Camping Packages", sahyadriImage, "Beginner-friendly camping with plateau views and short trek options near the Mumbai-Pune belt.", [
    "Useful for first-time campers who want approachable terrain and good scenery.",
    "Pairs naturally with short hikes and easy overnight group energy.",
    "A practical option for youth groups and fast weekend departures."
  ]),
  buildDestination("raireshwar", "Raireshwar Camping", "Camping Packages", valleyImage, "Plateau-side camping with open views, fresh wind, and heritage-rich surroundings.", [
    "A scenic option for explorers who want quiet spaces and strong landscape character.",
    "Works well for relaxed groups, history-led movement, and outdoor reset weekends.",
    "Can be shaped into a softer or more active trip depending on the audience."
  ]),
  buildDestination("harishchandragad", "Harishchandragad Camping", "Camping Packages", sahyadriImage, "High-altitude camping for experienced trekkers with Konkan Kada views, night trekking, and star-filled skies.", [
    "Best for stronger trekkers who want a rugged overnight mountain experience.",
    "Carries a deeper sense of challenge and reward than beginner-friendly campsites.",
    "A natural fit for raw trail lovers, endurance groups, and classic Sahyadri seekers."
  ])
];

export const jungleSafariDestinations: DetailPageContent[] = [
  buildDestination("tadoba", "Tadoba Safari", "Jungle Safari", forestImage, "Tiger reserve departures with naturalist-led game drives.", [
    "Popular for strong wildlife probability and accessible safari formats.",
    "Morning and evening drive planning with lodging coordination.",
    "Works for family groups, photographers, and premium weekend wildlife runs."
  ]),
  buildDestination("pench", "Pench Safari", "Jungle Safari", forestImage, "A balanced safari circuit mixing sightings, forest mood, and comfort.", [
    "Known for beautiful teak forest stretches and family-friendly planning.",
    "Strong fit for first-time wildlife travelers and school nature groups.",
    "Pairs well with interpretation-led nature sessions and storytelling."
  ]),
  buildDestination("kanha", "Kanha Safari", "Jungle Safari", valleyImage, "A classic central India wildlife experience with strong natural drama.", [
    "Ideal for longer-form safari travel with richer landscape variety.",
    "Can be positioned as a premium natural history escape.",
    "Good fit for photo-focused and family-led itineraries."
  ]),
  buildDestination("bandhavgad", "Bandhavgad Safari", "Jungle Safari", forestImage, "Compact high-intent safari planning for serious wildlife enthusiasts.", [
    "Best for sighting-focused groups wanting multiple safari windows.",
    "Great fit for experienced wildlife travelers and compact premium trips.",
    "Can be paired with nearby heritage and natural history layers."
  ])
];

export const internationalDestinations: DetailPageContent[] = [
  buildInternational("nepal", "Nepal", "5N6D / 6N7D options with mountain views, culture, and soft adventure.", himalayaImage),
  buildInternational("sri-lanka", "Sri Lanka", "Tea country, coasts, wildlife, and family-friendly travel pacing.", coastalImage),
  buildInternational("thailand", "Thailand", "Beach, city, island, and group-friendly holiday structures.", coastalImage),
  buildInternational("bali", "Bali", "Resort, culture, rice terraces, and premium leisure combinations.", coastalImage),
  buildInternational("maldives", "Maldives", "Relaxed water villas, island transfer planning, and honeymoon intent.", coastalImage),
  buildInternational("singapore", "Singapore", "City precision, family attractions, and polished short-haul travel.", forestImage),
  buildInternational("malaysia", "Malaysia", "City, island, and food-led exploration for mixed traveler types.", coastalImage),
  buildInternational("dubai", "Dubai", "Urban luxury, desert add-ons, and family or couples itineraries.", valleyImage),
  buildInternational("philippines", "Philippines", "Island energy, sea activity, and scenic tropical escapes.", coastalImage),
  buildInternational("bhutan", "Bhutan", "Peaceful mountain culture, monasteries, and slow premium travel.", himalayaImage)
];

export const specialtyPrograms: DetailPageContent[] = [
  buildProgram("junior-explorers", "Junior Explorers", "Speciality Program", sahyadriImage, "8 to 14 years community with supervised outdoor learning and confidence-building formats."),
  buildProgram("lady-explorers", "Lady Explorers", "Speciality Program", valleyImage, "Women-led departures that combine comfort, confidence, and strong field support."),
  buildProgram("silver-trails", "Silver Trails", "Speciality Program", coastalImage, "40 plus explorers seeking scenic, structured, and well-paced adventure formats."),
  buildProgram("explorers-on-wheels", "Explorers on Wheels", "Speciality Program", coastalImage, "Road journeys blended with light outdoor movement, local culture, and scenic stops."),
  buildProgram("explorers-fitness-club", "Explorers Fitness Club", "Speciality Program", sahyadriImage, "Morning outdoor fitness circles designed around consistency, terrain, and community discipline."),
  buildProgram("explorers-mountain-rush", "Explorers Mountain Run", "Speciality Program", himalayaImage, "Quarterly outdoor trail events for all age groups across forts, forests, and mountain paths."),
  buildProgram("atlas", "ATLAS Academy", "Adventure Training Leaders Academy for Sahyadri", forestImage, "Leadership training for route operations, field communication, participant care, and responsible outdoor facilitation.")
];

export const campingHubPage = buildHubPage(
  "Camping",
  "Lake, beach, and mountain-edge camp formats for relaxed and social outdoor nights.",
  coastalImage,
  "Campfire warmth beside premium outdoor settings",
  campingDestinations,
  "/contact-us"
);

export const jungleSafariHubPage = buildHubPage(
  "Jungle Safari",
  "Wildlife circuit planning for families, photographers, corporate groups, and natural-history travelers.",
  forestImage,
  "Early-morning safari light across central Indian forests",
  jungleSafariDestinations,
  "/contact-us"
);

export const internationalToursHubPage = buildHubPage(
  "International Tours",
  "Destination-led travel pages for honeymoon, family, friends, school, and premium leisure planning.",
  coastalImage,
  "International journeys with strong planning and visual mood",
  internationalDestinations,
  "/contact-us"
);

internationalToursHubPage.enquiryForm = {
  variant: "international",
  title: "International tour enquiry form",
  description: "Use this form to share purpose, dates, and hotel preference before the team starts shaping the itinerary."
};

function buildDestination(
  slug: string,
  title: string,
  eyebrow: string,
  image: string,
  description: string,
  highlights: string[]
): DetailPageContent {
  return {
    slug,
    eyebrow,
    title,
    description,
    image,
    caption: `${title} departure atmosphere`,
    meta: [
      { label: "Format", value: "Weekend / Custom Batch" },
      { label: "Ideal For", value: "Friends | Families | Teams" },
      { label: "Booking", value: "Enquiry-led" }
    ],
    sections: [
      {
        title: "About This Package",
        description:
          `${title} is positioned as a polished outdoor stay concept rather than only a basic campsite. It can be adapted for friend circles, couples, community groups, and short corporate movements depending on season and package format.`
      },
      {
        title: "Highlights",
        bullets: highlights
      },
      {
        title: "Planning Notes",
        bullets: [
          "Package styling, tent category, and meal design can be tuned based on audience.",
          "Transport, games, music limits, and group privacy can be layered into the final plan.",
          "Use the contact route to confirm actual availability, dates, and inclusions."
        ]
      }
    ],
    enquiryForm: {
      variant: eyebrow === "Jungle Safari" ? "safari" : "camping",
      title: eyebrow === "Jungle Safari" ? "Safari enquiry form" : "Camping enquiry form",
      description:
        eyebrow === "Jungle Safari"
          ? "Share your travel month, group size, and wildlife intent so the team can recommend the right safari route."
          : "Share your travel month, group size, and stay style so the team can recommend the right camping package.",
      contextTitle: title,
      contextLabel: eyebrow === "Jungle Safari" ? "Selected Safari" : "Selected Camping Destination"
    },
    inquiryTitle: "Want pricing or a private batch?",
    inquiryDescription:
      "Share your travel month, expected group size, and preferred comfort style. This page is ready for UI use now and can be connected to final inventory later.",
    inquiryActions: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Back To Camping", href: "/camping", tone: "secondary" }
    ]
  };
}

function buildInternational(
  slug: string,
  title: string,
  description: string,
  image: string
): DetailPageContent {
  return {
    slug,
    eyebrow: "International Tours",
    title,
    description,
    image,
    caption: `${title} visual mood and signature travel pace`,
    meta: [
      { label: "Audience", value: "Couples | Families | Friends" },
      { label: "Travel Style", value: "Curated Leisure" },
      { label: "Enquiry Model", value: "Custom Planning" }
    ],
    sections: [
      {
        title: "Famous Attractions",
        bullets: [
          `Top signature moments and essential sights across ${title}.`,
          "A mix of iconic landmarks, local flavor, downtime, and visual highlights.",
          "Room to shape the plan by trip purpose, budget, and pace."
        ]
      },
      {
        title: "Travel Planning",
        bullets: [
          "Purpose-based planning for honeymoon, family, or friend groups.",
          "Hotel category, meal plan, and transport mode can be customized.",
          "Dates, adult and child counts, and special requirements shape the final quote."
        ]
      },
      {
        title: "Additional Layers",
        bullets: [
          "Can include educational, team, or premium slow-travel versions.",
          "Strong fit for content-led pages with future reviews, blogs, and enquiry forms.",
          "Bank details, QR, and payment support can be layered into this route later if needed."
        ]
      }
    ],
    enquiryForm: {
      variant: "international",
      title: "Destination enquiry form",
      description: "Share your dates, hotel style, and group purpose so the team can start building this itinerary.",
      contextTitle: title,
      contextLabel: "Selected Destination"
    },
    inquiryTitle: "Planning an international departure?",
    inquiryDescription:
      `Use this page as the destination entry point, then contact the team with your dates, group type, and hotel preference to shape the final itinerary for ${title}.`,
    inquiryActions: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Back To International Tours", href: "/international-tours", tone: "secondary" }
    ]
  };
}

function buildProgram(
  slug: string,
  title: string,
  eyebrow: string,
  image: string,
  description: string
): DetailPageContent {
  return {
    slug,
    eyebrow,
    title,
    description,
    image,
    caption: `${title} community and identity`,
    meta: [
      { label: "Program Type", value: "Community-Led" },
      { label: "Model", value: "Scheduled + Enquiry" },
      { label: "Best Fit", value: "Focused Audience" }
    ],
    sections: [
      {
        title: "What This Program Is",
        description:
          `${title} extends the main Explorers identity into a more specific participant profile. It is designed to feel more intentional, safer to join, and easier to relate to than a generic open departure.`
      },
      {
        title: "What Participants Can Expect",
        bullets: [
          "A clearer experience style tailored to the audience this program serves.",
          "Structured support and communication before, during, and after each batch.",
          "Options to blend treks, camps, training, travel, and community events."
        ]
      },
      {
        title: "How To Join",
        bullets: [
          "Start with the contact route if you want the next available batch or a custom enquiry.",
          "Use the trek board for departures that already fit your season or difficulty preference.",
          "This route can later connect to dedicated forms, schedules, and category filters."
        ]
      }
    ],
    enquiryForm: {
      variant: "specialty",
      title: "Program enquiry form",
      description: "Use this form to ask about batches, age fit, timing, and how this program works.",
      contextTitle: title,
      contextLabel: "Selected Program"
    },
    inquiryTitle: "Interested in this program line?",
    inquiryDescription:
      `Use the contact page to ask about the next ${title} batch, typical audience fit, or how this program differs from the main trek board.`,
    inquiryActions: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Browse Treks", href: "/trips", tone: "secondary" }
    ]
  };
}

function buildHubPage(
  title: string,
  description: string,
  image: string,
  caption: string,
  items: DetailPageContent[],
  contactHref: string
): LandingPageContent {
  return {
    eyebrow: title,
    title: `${title} pages designed as premium editorial gateways.`,
    description,
    image,
    caption,
    actions: [
      { label: "Contact Us", href: contactHref },
      { label: "Browse Treks", href: "/trips", tone: "secondary" }
    ],
    stats: [
      { label: "Destinations", value: String(items.length) },
      { label: "Style", value: "Curated" },
      { label: "Flow", value: "Hub to Detail" },
      { label: "Next Step", value: "Enquiry" }
    ],
    cards: items.map((item) => ({
      title: item.title,
      description: item.description,
      href:
        title === "Camping"
          ? `/camping/${item.slug}`
          : title === "Jungle Safari"
            ? `/jungle-safari/${item.slug}`
            : `/international-tours/${item.slug}`,
      image: item.image,
      caption: item.caption,
      meta: item.eyebrow
    })),
    ctaTitle: `Need help choosing the right ${title.toLowerCase()} route?`,
    ctaDescription:
      "These pages give users a much cleaner place to start than a single long page. From here, the final data and enquiry integrations can be layered in without changing the UX structure.",
    ctaActions: [
      { label: "Talk To Support", href: contactHref },
      { label: "Open Home Page", href: "/", tone: "secondary" }
    ]
  };
}
