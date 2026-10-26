// ============================================================
//  PORTFOLIO DATA: Edit ONLY this file to update your site!
// ============================================================

const DATA = {

  // ──────────────────────────────────────────────────
  //  PERSONAL INFO
  // ──────────────────────────────────────────────────
  name: "Suwaj Aryal",
  firstName: "Suwaj",
  title: "Water Resource and Hydropower Engineer",
  tagline: "I design how water moves, from rivers to turbines.",
  location: "Budhanilkantha-10, Kathmandu, Nepal",
  phone: "+977 9869667002",
  email: "suwajaryal2016@gmail.com",
  academicEmail: "080MSHPE023.suwaj@pcampus.edu.np",
  social: {
    linkedin: "https://www.linkedin.com/in/suwaj-aryal-7a1527265/",
    github: "https://github.com/SuwajAryal",
  },

  // ──────────────────────────────────────────────────
  //  HERO: Rotating titles
  // ──────────────────────────────────────────────────
  heroWords: [
    "Water Resources Engineer",
    "Hydroinfromatics Enthusiast",
    "Hydropower Engineert",
    "Hydraulic Modeller",
    "Physics-Governed ML Modeller",
    "Scientific Python Developer",
    "Football Lover",
    "Nature Enjoyer",
  ],

  // ──────────────────────────────────────────────────
  //  ABOUT ME
  // ──────────────────────────────────────────────────
  aboutIntro: "Computational and Hydro-informatics Researcher specializing in Water Resources. Integrating physical principles with AI to model complex sediment dynamics.",
  
  aboutStory: `My academic interests lie at the intersection of classical hydraulics and modern computational methods. I am particularly driven by the challenge of modeling river systems in data-scarce environments, where traditional empirical formulas often struggle to capture complex sediment dynamics. My goal is to develop more robust predictive tools by informing data-driven models with established physical principles.

I completed my Bachelor's degree at the Institute of Engineering, Pulchowk Campus, and am currently pursuing my Master's degree in Hydropower Engineering at the same institution. My academic journey has been defined by a commitment to rigorous analysis, supported by national-level merit scholarships for both my undergraduate and graduate studies.

While my primary focus is research, my background includes significant practical design experience. I have worked on projects ranging from full irrigation system design to 1D and 2D hydraulic modeling for urban planning. This balance between theoretical research and design engineering ensures that my computational work remains grounded in real-world feasibility.

Beyond my academic pursuits, I love to watch and play football. I find that engaging in diverse interests, from music and gaming to reading manga, helps maintain the persistence and creative outlook required for long-term research projects. I am currently seeking opportunities to further my research at the doctoral level, specifically in areas where computational fluid dynamics and scientific computing can solve pressing water resource challenges.`,

  aboutHighlights: [
    { icon: "🌊", label: "Water Resources & Hydraulics" },
    { icon: "⚡", label: "Hydropower Design" },
    { icon: "🌍", label: "River & Sediment Systems" },
    { icon: "🛠️", label: "Engineering Design" },
  ],

  // ──────────────────────────────────────────────────
  //  EDUCATION
  // ──────────────────────────────────────────────────
  education: [
    {
      degree: "M.Sc. in Hydropower Engineering",
      institution: "Pulchowk Campus, Tribhuvan University",
      period: "2024 – Present",
      status: "Ongoing",
      highlights: [
        "Merit scholarship through national-level entrance",
        "Focus areas: Hydraulic modelling, sediment dynamics, physical adherance and river engineering",
        "Researching physics informed machine learning model for better physical consistency and reliablity ",
      ],
    },
    {
      degree: "B.E. in Civil Engineering",
      institution: "Pulchowk Campus, Tribhuvan University",
      period: "2018 – 2023",
      status: "Completed",
      highlights: [
        "Full merit scholarship through national-level entrance",
        "Final Year Project: Complete irrigation system design from headwork to canal network",
      ],
    },
  ],

  // ──────────────────────────────────────────────────
  //  WORK EXPERIENCE
  // ──────────────────────────────────────────────────
  experience: [
    {
      role: "Intern / Trainee Engineer",
      company: "NCER",
      period: "~2.5 months",
      story: "Worked as an intern on international hydraulic projects, gaining exposure to global engineering standards and US-based terrain modification studies.",
      points: [
        "Hydraulic modelling using HEC-RAS, HEC-HMS, and EPA SWMM",
        "Developed automation scripts using VBA for engineering workflows",
        "Conducted drainage system design and watershed analysis",
        "Applied international engineering standards to local water management problems",
      ],
    },
    {
      role: "Civil Design Engineer",
      company: "Madi Consultancy Pvt. Ltd.",
      period: "Short-term",
      story: "Joined after obtaining my engineering license to design water distribution systems for rural communities.",
      points: [
        "Designed irrigation and rural water supply distribution networks",
        "Design of lift water supply system",
      ],
    },
    {
      role: "Freelance Engineer",
      company: "Independent",
      period: "Project-based",
      story: "Managed independent projects, ranging from sizing hydropower components to 2D modelling of critical river systems.",
      points: [
        "Pre-feasibility study of Junbesi Khola Cascade Hydropower Project (990kW): intake, weir, settling basin, and powerhouse design",
        "1D and 2D Hydraulic modelling of Bagmati River for urban area planning",
      ],
    },
  ],

  // ──────────────────────────────────────────────────
  //  RESEARCH & PROJECTS
  // ──────────────────────────────────────────────────
  research: [
    {
      title: "Suspended Sediment Load Prediction in Flashy Catchments",
      type: "Conference Paper ",
      description: "Preparing a submission for the CEISD-2026 detailing the importance of Machine Learning, Deep Learning and Tree Based Learning in sediment prediction in Himalayan catchments.",
    },
    {
      title: "Hydrological Impact of Land-Use Change in Kathmandu Watershed",
      type: "Research Collaboration",
      description: "Analysed how urbanization affects water flow patterns using GIS, Remote Sensing Data and HEC-RAS for hydrological modelling in the Kathmandu valley catchment.",
    },
    {
      title: "Pre-Feasibility Study of Badigad Hydropower Project",
      type: "Master's Minor Project",
      description: "Evaluated hydrological feasibility and layout planning for a run-of-river plant, including intake and headrace tunnel design.",
    },
    {
      title: "Reservoir Sediment Management Strategies",
      type: "Academic Research",
      description: "Explored management approaches using RESCON 2 to understand how sediment accumulation affects long-term dam performance.",
    },
    {
      title: "Detail Design of Bhuteni Irrigation Project",
      type: "Bachelor's Final Year Project",
      description: "Designed a complete irrigation system from the ground up: barrage, under-sluice, canal network, and cross-drainage structures.",
    },
  ],

  // ──────────────────────────────────────────────────
  //  RESEARCH INTERESTS
  // ──────────────────────────────────────────────────
  researchInterests: [
    "Computational Hydraulics & River Modelling",
    "Machine Learning in Hydrology and Hydraulics",
    "Sediment Transport & Reservoir Sustainability",
    "Data Driven Machine Learning architecture Design",
    "Hydroinformatic Automation Systems and APIs",
    "Data Analysis and Engineering",
    "Hydropower System Design & Optimization",
    "Flood & Watershed Modelling",
  ],

  // ──────────────────────────────────────────────────
  //  TECHNICAL SKILLS
  // ──────────────────────────────────────────────────
  skills: [
    { category: "Hydrological Tools",                 items: ["HEC-HMS", "HEC-RAS", "HEC-ResSim", "SWAT", "EPA SWMM"] },
    { category: "Programming & Web",                  items: ["Python", "JavaScript", "HTML", "CSS", "VBA", "C", "FORTRAN"] },
    { category: "General Purpose Engineering Tools",  items: ["QGIS","ArcGIS","Google Earth Engine", "AutoCAD", "Civil 3D"] },
    { category: "CFD & Modelling",                    items: ["OpenFOAM", "RESCON 2"] },
    { category: "Academic Tools",                     items: ["Excel", "Zotero", "LaTeX", "Word", "PowerPoint"] },
  ],

  // ──────────────────────────────────────────────────
  //  TRAINING
  // ──────────────────────────────────────────────────
  training: [
    {
      name: "Hydraulic Design Software Training",
      duration: "2 Weeks",
      items: ["HEC-RAS", "HEC-ResSim", "HEC-HMS", "SWAT"],
    },
  ],

  // ──────────────────────────────────────────────────
  //  BEYOND ENGINEERING
  // ──────────────────────────────────────────────────
  beyondEngineering: [
    {
      icon: "football",
      title: "Football & Futsal",
      description: "My primary sport for fitness and fun. I play weekly futsal for the exercise and the community.",
    },
    {
      icon: "cricket",
      title: "Cricket",
      description: "Enjoy casual weekend matches, focusing on the fun and the rare boundary.",
    },
    {
      icon: "tabletennis",
      title: "Table Tennis",
      description: "My go-to game for a quick indoor break. I love a good rally with friends to get the energy up.",
    },
    {
      icon: "gaming",
      title: "Gaming",
      description: "Playing Valorant with friends to unwind, hang out digitally, and stay mentally sharp.",
    },
    {
      icon: "guitar",
      title: "Guitar",
      description: "Self-taught strummer playing for vibes, chords, and good times.",
    },
    {
      icon: "manga",
      title: "Manga & Anime",
      description: "A loyal reader and watcher. These stories offer great perspective on persistence and plot twists.",
    },
    {
      icon: "hiking",
      title: "Hiking",
      description: "Exploring the trails of Nepal to clear my head and appreciate the mountain landscapes.",
    },
  ],

  // ──────────────────────────────────────────────────
  //  WHERE I'M HEADED
  // ──────────────────────────────────────────────────
  futureGoals: "Solving water resource challenges, demands collaborative innovation. I aim to work alongside experts to bridge the gap between physical hydrology and advanced computation. ",

  // ──────────────────────────────────────────────────
  //  FOOTER
  // ──────────────────────────────────────────────────
  footerQuote: "Water is the driving force of all nature. - Leonardo da Vinci",
};
