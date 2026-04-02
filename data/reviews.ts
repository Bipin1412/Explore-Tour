export interface ReviewCategory {
  id: string;
  label: string;
  items: Array<{
    author: string;
    location: string;
    text: string;
    source: string;
    format: "text" | "video";
  }>;
}

export const reviewCategories: ReviewCategory[] = [
  {
    id: "parents",
    label: "Parents",
    items: [
      {
        author: "Neha Kulkarni",
        location: "Pune",
        text: "Our daughter came back more confident, disciplined, and excited about the outdoors. The team handled safety and communication brilliantly.",
        source: "Google Reviews",
        format: "text"
      },
      {
        author: "Ritesh Shah",
        location: "Mumbai",
        text: "The junior program felt organized from pickup to return. Parents got timely updates and the children had a genuine adventure experience.",
        source: "Facebook Reviews",
        format: "video"
      }
    ]
  },
  {
    id: "corporate",
    label: "Corporate",
    items: [
      {
        author: "HR Team, Blueframe Labs",
        location: "Pune",
        text: "Explorers delivered a polished offsite with team-building activities, smooth logistics, and a strong energy that our employees still talk about.",
        source: "Google Reviews",
        format: "text"
      },
      {
        author: "People Ops, Vertex Mobility",
        location: "Bengaluru",
        text: "We wanted a one-day adventure that still felt premium. The coordination was clear, professional, and very easy for our leadership team.",
        source: "Facebook Reviews",
        format: "video"
      }
    ]
  },
  {
    id: "trekkers",
    label: "Trekkers",
    items: [
      {
        author: "Anish Patil",
        location: "Nashik",
        text: "The pace planning, safety briefings, and local coordination were outstanding. It felt like a team that really understands mountain experiences.",
        source: "Google Reviews",
        format: "text"
      },
      {
        author: "Pooja More",
        location: "Thane",
        text: "From Sahyadri weekends to Himalayan departures, the group energy and professionalism make every trek feel thoughtfully designed.",
        source: "TripAdvisor",
        format: "video"
      }
    ]
  },
  {
    id: "tourists",
    label: "Tourists",
    items: [
      {
        author: "Sonal Desai",
        location: "Ahmedabad",
        text: "The itinerary never felt rushed and the accommodations were chosen with care. It had the polish of a tour brand with the soul of an explorer club.",
        source: "TripAdvisor",
        format: "text"
      },
      {
        author: "Aman Dutta",
        location: "Delhi",
        text: "We booked as a family and appreciated how the team balanced sightseeing, downtime, and support. Very warm experience overall.",
        source: "Facebook Reviews",
        format: "video"
      }
    ]
  },
  {
    id: "schools",
    label: "Schools",
    items: [
      {
        author: "Principal, Riverdale School",
        location: "Pune",
        text: "Our educational camp ran on time, students stayed engaged, and the outdoor learning activities were genuinely memorable for the staff as well.",
        source: "Google Reviews",
        format: "text"
      },
      {
        author: "Activity Coordinator, Hillside Academy",
        location: "PCMC",
        text: "Explorers understood school expectations immediately. Safety, discipline, and experiential learning were all handled with confidence.",
        source: "TripAdvisor",
        format: "video"
      }
    ]
  }
];
