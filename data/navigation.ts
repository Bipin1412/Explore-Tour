export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

export interface NavigationItem {
  label: string;
  href: string;
  groups?: NavigationGroup[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Team Explorers",
    href: "/team-explorers",
    groups: [
      {
        title: "About Explorers",
        links: [
          {
            label: "About Us",
            href: "/team-explorers",
            description: "Our story, approach, and community-first outdoor philosophy."
          },
          {
            label: "Team Explorers",
            href: "/team-explorers",
            description: "Meet trek leaders, trainers, and coordinators behind every program."
          }
        ]
      }
    ]
  },
  {
    label: "Upcoming Treks",
    href: "/trips",
    groups: [
      {
        title: "Weekend Treks",
        links: [
          { label: "Winter Treks", href: "/trips?season=Winter" },
          { label: "Summer Treks", href: "/trips?season=Summer" },
          { label: "Rainy Treks", href: "/trips?season=Rainy" }
        ]
      },
      {
        title: "Signature Categories",
        links: [
          { label: "Children Special", href: "/trips?q=junior" },
          { label: "Himalayan Treks", href: "/trips?category=Himalayan%20Treks" }
        ]
      }
    ]
  },
  {
    label: "Speciality Tours",
    href: "/programs/atlas",
    groups: [
      {
        title: "Seasonal Tours",
        links: [
          { label: "Winter Tours", href: "/trips?season=Winter" },
          { label: "Summer Tours", href: "/trips?season=Summer" },
          { label: "Rainy Tours", href: "/trips?season=Rainy" }
        ]
      },
      {
        title: "Communities",
        links: [
          { label: "Junior Explorers", href: "/programs/junior-explorers" },
          { label: "Lady Explorers", href: "/programs/lady-explorers" },
          { label: "Silver Trails", href: "/programs/silver-trails" }
        ]
      }
    ]
  },
  {
    label: "Upcoming Tours",
    href: "/upcoming-tours"
  },
  {
    label: "Camping",
    href: "/camping",
    groups: [
      {
        title: "Packages",
        links: [
          { label: "Pawna", href: "/camping/pawna" },
          { label: "Panshet", href: "/camping/panshet" },
          { label: "Mulshi", href: "/camping/mulshi" },
          { label: "Malvan", href: "/camping/malvan" },
          { label: "Revdanda", href: "/camping/revdanda" },
          { label: "Madheghat", href: "/camping/madheghat" }
        ]
      }
    ]
  },
  {
    label: "International Tours",
    href: "/international-tours",
    groups: [
      {
        title: "Destinations",
        links: [
          { label: "Nepal", href: "/international-tours/nepal" },
          { label: "Sri Lanka", href: "/international-tours/sri-lanka" },
          { label: "Thailand", href: "/international-tours/thailand" },
          { label: "Bali", href: "/international-tours/bali" },
          { label: "Maldives", href: "/international-tours/maldives" },
          { label: "Singapore", href: "/international-tours/singapore" },
          { label: "Malaysia", href: "/international-tours/malaysia" },
          { label: "Dubai", href: "/international-tours/dubai" },
          { label: "Philippines", href: "/international-tours/philippines" },
          { label: "Bhutan", href: "/international-tours/bhutan" }
        ]
      }
    ]
  },
  {
    label: "Corporate Outings",
    href: "/corporate-outings"
  },
  {
    label: "Himalayan Treks",
    href: "/himalayan-treks"
  },
  {
    label: "Jungle Safari",
    href: "/jungle-safari",
    groups: [
      {
        title: "Wildlife Circuits",
        links: [
          { label: "Tadoba", href: "/jungle-safari/tadoba" },
          { label: "Pench", href: "/jungle-safari/pench" },
          { label: "Kanha", href: "/jungle-safari/kanha" },
          { label: "Bandhavgad", href: "/jungle-safari/bandhavgad" }
        ]
      }
    ]
  },
  {
    label: "Equipment Rental",
    href: "/equipment-rental"
  }
];

export const contactItem: NavigationLink = {
  label: "Contact Us",
  href: "/contact-us",
  description: "Call, WhatsApp, or connect with the Explorers support desk."
};

export const footerQuickLinks = [
  "Monsoon Treks",
  "Summer Treks",
  "Winter Adventures",
  "Camping",
  "Himalayan Treks",
  "Jungle Safaris",
  "Junior Explorers",
  "Lady Explorers",
  "Silver Trails",
  "Explorers on Wheels",
  "Explorers Mountain Rush",
  "Green Explorers",
  "Explorers Fitness Academy",
  "India Tours",
  "International Tours",
  "Kokan Tours"
];

export const primaryAccessLinks = [
  {
    title: "Browse All Treks",
    description: "See every current category, batch window, difficulty, and cost in one place.",
    href: "/trips"
  },
  {
    title: "Winter Treks Board",
    description: "Open the listing with winter-friendly departures already filtered for fast browsing.",
    href: "/trips?season=Winter"
  },
  {
    title: "Himalayan Treks Board",
    description: "Jump straight into mountain departures with the Himalayan category preselected.",
    href: "/himalayan-treks"
  }
];

export const footerPrograms = [
  "Junior Explorers",
  "Lady Explorers",
  "Silver Trails",
  "ATLAS Academy",
  "Corporate Tours",
  "School Tours",
  "Weekend Treks",
  "International Tours"
];

export const footerCompanyLinks = [
  "About Us",
  "Work With Us",
  "Become a Leader",
  "Careers",
  "Cancellation Policy",
  "Rules During Event",
  "Terms & Conditions",
  "Privacy Policy",
  "Bank Details"
];

export const footerQuickLinkHrefs: Record<string, string> = {
  "Monsoon Treks": "/trips?season=Rainy",
  "Summer Treks": "/trips?season=Summer",
  "Winter Adventures": "/trips?season=Winter",
  Camping: "/camping",
  "Himalayan Treks": "/himalayan-treks",
  "Jungle Safaris": "/jungle-safari",
  "Junior Explorers": "/programs/junior-explorers",
  "Lady Explorers": "/programs/lady-explorers",
  "Silver Trails": "/programs/silver-trails",
  "Explorers on Wheels": "/programs/explorers-on-wheels",
  "Explorers Mountain Rush": "/programs/explorers-mountain-rush",
  "Green Explorers": "/team-explorers",
  "Explorers Fitness Academy": "/programs/explorers-fitness-club",
  "India Tours": "/upcoming-tours",
  "International Tours": "/international-tours",
  "Kokan Tours": "/camping/revdanda"
};

export const footerProgramHrefs: Record<string, string> = {
  "Junior Explorers": "/programs/junior-explorers",
  "Lady Explorers": "/programs/lady-explorers",
  "Silver Trails": "/programs/silver-trails",
  "ATLAS Academy": "/programs/atlas",
  "Corporate Tours": "/corporate-outings",
  "School Tours": "/contact-us",
  "Weekend Treks": "/trips?category=Weekend%20Treks",
  "International Tours": "/international-tours"
};

export const footerCompanyLinkHrefs: Record<string, string> = {
  "About Us": "/team-explorers",
  "Work With Us": "/contact-us",
  "Become a Leader": "/programs/atlas",
  Careers: "/contact-us",
  "Cancellation Policy": "/trips",
  "Rules During Event": "/trips",
  "Terms & Conditions": "/contact-us",
  "Privacy Policy": "/contact-us",
  "Bank Details": "#footer"
};
