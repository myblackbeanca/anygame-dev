// ============================================================
// DATA: AI in Game Development — Research Data
// All data sourced from parallel wide research, May 2026
// ============================================================

export const geoData = [
  {
    id: "north-america",
    name: "North America",
    flag: "🇺🇸",
    color: "#5B4FE8",
    market2024: 100.9,
    market2030: 143.4,
    cagr: 7.5,
    aiAdoption: "High" as const,
    dominantPlatform: "Mobile, Console, PC",
    keyPlayers: ["Activision Blizzard", "Electronic Arts", "Take-Two Interactive", "Epic Games", "Riot Games", "Insomniac Games", "Bungie"],
    aiTools: ["GitHub Copilot", "Ubisoft Ghostwriter", "Stability AI (EA)", "Inworld AI", "Convai"],
    trends: [
      "AI-assisted coding generating ~46% of developer code",
      "Major studios integrating generative AI into asset pipelines",
      "10,500+ AAA layoffs in 2023 linked to AI cost-cutting",
      "Indie market growing at 14.32% CAGR",
      "US game industry supports 250,000+ jobs"
    ],
    challenges: [
      "Developer backlash: 52% believe AI negatively impacts the industry",
      "Market saturation on Steam (14,000+ new titles in 2024)",
      "IP and copyright concerns around AI-generated content",
      "Talent displacement from AAA restructuring"
    ],
    opportunities: [
      "AI-powered indie studios competing with AAA quality",
      "Procedural content generation at scale",
      "Real-time AI NPC middleware market",
      "Game preservation via AI (Microsoft Muse)"
    ],
    notableStat: "The U.S. video game industry generates $95.8 billion in total economic impact and supports 250,000+ jobs.",
    description: "North America remains the global epicenter of game development innovation, with the highest concentration of major studios, AI tool adoption, and venture investment. The region is simultaneously experiencing the most significant structural disruption from AI-driven layoffs."
  },
  {
    id: "europe",
    name: "Europe",
    flag: "🇪🇺",
    color: "#FF6B47",
    market2024: 53.95,
    market2030: 80.70,
    cagr: 6.5,
    aiAdoption: "Medium" as const,
    dominantPlatform: "Mobile",
    keyPlayers: ["Ubisoft", "CD Projekt Red", "Embracer Group", "Paradox Interactive", "IO Interactive", "Thunderful Group", "Gameloft"],
    aiTools: ["Ubisoft Ghostwriter", "GitHub Copilot", "Blender AI extensions", "Godot Engine"],
    trends: [
      "GDPR creating distinct AI governance frameworks",
      "Strong indie scene in UK, Poland, Sweden, Germany",
      "Open-source adoption accelerating post-Unity controversy",
      "116,419 people employed in European gaming (end of 2024)",
      "CD Projekt Red and Ubisoft leading responsible AI frameworks"
    ],
    challenges: [
      "GDPR compliance adds complexity to AI training data",
      "Fragmented regulatory landscape across EU member states",
      "Talent competition with North American studios",
      "Lower average salaries driving talent drain"
    ],
    opportunities: [
      "Ethical AI frameworks as competitive differentiator",
      "Strong narrative game tradition + AI storytelling tools",
      "Government grants and cultural funding for game studios",
      "Cross-border EU digital single market expansion"
    ],
    notableStat: "The European gaming industry employed 116,419 people at the end of 2024, a 1.8% increase from 2023.",
    description: "Europe is navigating a careful balance between AI adoption and regulatory compliance. The region's strong tradition of narrative-driven, artistically ambitious games positions it well for AI-augmented storytelling tools, while GDPR creates both constraints and opportunities for differentiated AI governance."
  },
  {
    id: "asia-pacific",
    name: "Asia-Pacific",
    flag: "🌏",
    color: "#F5A623",
    market2024: 155.26,
    market2030: 281.54,
    cagr: 10.9,
    aiAdoption: "High" as const,
    dominantPlatform: "Mobile",
    keyPlayers: ["Tencent", "NetEase", "Sony", "Nintendo", "miHoYo/HoYoverse", "Krafton", "Bandai Namco", "Virtuos"],
    aiTools: ["In-house AI tools (Tencent, NetEase)", "AI for player behavior analysis", "AI monetization optimization", "AI-driven content personalization"],
    trends: [
      "1.3 billion mobile gamers — largest base globally",
      "China's AI game development startups growing rapidly",
      "South Korea leading in esports AI analytics",
      "Japan focusing on AI for animation and character design",
      "India emerging as outsourcing hub for AI game assets"
    ],
    challenges: [
      "Regulatory hurdles and content censorship in China",
      "Cultural preference fragmentation across 20+ markets",
      "Mobile device hardware limitations for AI features",
      "Operational costs for large-scale AI infrastructure"
    ],
    opportunities: [
      "Mobile-first AI game experiences at massive scale",
      "AI-driven localization for diverse Asian markets",
      "Cloud gaming infrastructure investment",
      "AI for culturally-rooted storytelling and aesthetics"
    ],
    notableStat: "Asia-Pacific boasts over 1.3 billion mobile gamers and is the fastest-growing region at 10.9% CAGR through 2030.",
    description: "Asia-Pacific is the world's largest gaming market by revenue and player count. Mobile dominance shapes AI adoption patterns — the focus is on personalization, monetization optimization, and behavioral analytics rather than the asset-generation tools more common in Western studios."
  },
  {
    id: "latin-america",
    name: "Latin America",
    flag: "🌎",
    color: "#4CAF8A",
    market2024: 9.2,
    market2030: 16.1,
    cagr: 9.3,
    aiAdoption: "Emerging" as const,
    dominantPlatform: "Mobile",
    keyPlayers: ["Aquiris Game Studio", "Etermax", "NGD Studios", "Efecto Studios", "Rogue Snail", "Big Moxi Games"],
    aiTools: ["ChatGPT", "Claude Code", "Leonardo AI", "Bing Image Creator"],
    trends: [
      "Brazil leads with 1,000+ game developers and 70%+ gaming penetration",
      "Mobile-first development driving accessibility",
      "Growing esports infrastructure as cultural foundation",
      "Localization becoming a strategic competitive advantage",
      "Procedural content generation for resource-constrained teams"
    ],
    challenges: [
      "Talent drain to North American and European studios",
      "Limited access to venture funding",
      "Market fragmentation across 20+ countries",
      "Infrastructure limitations outside major cities"
    ],
    opportunities: [
      "AI enabling small teams to compete globally",
      "Rapid prototyping with generative AI tools",
      "Open-source stack (Godot + Blender) reducing costs",
      "Strategic partnerships with global publishers"
    ],
    notableStat: "Brazil is home to 1,000+ game developers and leads the region with gaming market penetration exceeding 70% of the population.",
    description: "Latin America is an emerging market with strong growth fundamentals. The combination of mobile-first infrastructure, a young demographic, and AI tools that dramatically reduce production costs is enabling a new generation of studios to build globally competitive games with lean teams."
  },
  {
    id: "mea",
    name: "Middle East & Africa",
    flag: "🌍",
    color: "#E8B84B",
    market2024: 10.583,
    market2030: 17.912,
    cagr: 8.5,
    aiAdoption: "Emerging" as const,
    dominantPlatform: "Mobile",
    keyPlayers: ["Sandsoft Games", "Tamatem Games", "Boss Bunny Games", "Falafel Games", "Nine66 (Savvy Games Group)", "Babil Games"],
    aiTools: ["Generative AI techniques", "Diffusion models", "Large Language Models"],
    trends: [
      "Saudi Arabia Vision 2030 investing billions in gaming infrastructure",
      "UAE positioning as a regional game development hub",
      "African mobile gaming growing on the back of smartphone penetration",
      "Esports investment surging across Gulf states",
      "MEA accounted for 3.6% of global gaming market in 2024"
    ],
    challenges: [
      "Varying regulatory frameworks and content restrictions",
      "Cultural resistance to gaming in some markets",
      "Limited local talent pipeline",
      "Infrastructure gaps outside major urban centers"
    ],
    opportunities: [
      "Saudi Vision 2030 government funding for game studios",
      "Culturally authentic Arabic-language game content",
      "AI-powered localization for Arabic and African languages",
      "First-mover advantage in underpenetrated markets"
    ],
    notableStat: "Saudi Arabia's Vision 2030 initiative has committed billions to building a domestic gaming industry, with Nine66 (Savvy Games Group) as the primary vehicle.",
    description: "The Middle East and Africa represent the most nascent but potentially high-velocity opportunity in global game development. Saudi Arabia's government-backed investment is creating an entirely new industry from scratch, while African mobile gaming is growing organically on the back of smartphone adoption."
  }
];

export const aiToolsData = [
  {
    category: "AI-Assisted Coding",
    tools: [
      { name: "GitHub Copilot", use: "Code completion & generation", impact: "Generates ~46% of developer code, 55% faster task completion", tier: "Industry Standard" },
      { name: "Cursor", use: "AI-native code editor", impact: "Full codebase context, multi-file edits", tier: "Rising" },
      { name: "Amazon CodeWhisperer", use: "Code suggestions", impact: "AWS-integrated development acceleration", tier: "Enterprise" }
    ]
  },
  {
    category: "3D Asset Generation",
    tools: [
      { name: "Sloyd.ai", use: "Text-to-3D game assets", impact: "Game-ready textured models in minutes", tier: "Specialist" },
      { name: "Meshy.ai", use: "Text/image to 3D + textures", impact: "Supports GLB, FBX, OBJ, BLEND export", tier: "Specialist" },
      { name: "Luma AI Genie", use: "3D generation from prompts", impact: "High-fidelity 3D object creation", tier: "Rising" }
    ]
  },
  {
    category: "AI NPC & Dialogue",
    tools: [
      { name: "Inworld AI", use: "Real-time AI NPCs", impact: "Speech-to-speech, voice cloning, multi-language", tier: "Industry Standard" },
      { name: "Convai", use: "Conversational AI characters", impact: "Multimodal perception, narrative-driven design", tier: "Rising" },
      { name: "Charisma AI", use: "Interactive story characters", impact: "NLP-powered branching dialogue", tier: "Specialist" }
    ]
  },
  {
    category: "Animation",
    tools: [
      { name: "Cascadeur", use: "AI-assisted keyframe animation", impact: "AutoPosing, AutoPhysics, Animation Unbaking", tier: "Industry Standard" },
      { name: "Kinetix", use: "Human motion generation", impact: "3D motion understanding and synthesis", tier: "Rising" }
    ]
  },
  {
    category: "Concept Art & Textures",
    tools: [
      { name: "Midjourney", use: "Concept art generation", impact: "Rapid visual ideation and style exploration", tier: "Industry Standard" },
      { name: "Leonardo AI", use: "Game-focused image generation", impact: "Consistent character and environment art", tier: "Rising" },
      { name: "Polycam", use: "AI texture generation", impact: "Seamlessly tileable PBR textures", tier: "Specialist" }
    ]
  },
  {
    category: "Level Design & World Building",
    tools: [
      { name: "Promethean AI", use: "Environment design assistant", impact: "AI-powered scene composition", tier: "Specialist" },
      { name: "No Man's Sky PCG", use: "Procedural world generation", impact: "Entire planets generated algorithmically", tier: "Benchmark" }
    ]
  }
];

export const caseStudies = [
  {
    id: "roblox",
    title: "Roblox",
    subtitle: "The UGC Economy as AI Infrastructure",
    category: "Platform / UGC",
    year: "2023–2026",
    heroStat: "$2.2B+",
    heroStatLabel: "Creator payouts in 2025",
    color: "#5B4FE8",
    metrics: [
      { label: "Daily Active Users (Q4 2025)", value: "144M", delta: "+69% YoY" },
      { label: "Creator Payouts (2025)", value: "$2.2B+", delta: "+46% YoY" },
      { label: "Top 10 Creator Avg Earnings", value: "$33.9M", delta: "2025" },
      { label: "Hours Engaged (Q1 2026)", value: "31B hrs", delta: "+43% YoY" }
    ],
    aiFeatures: [
      "Planning Mode: Agentic AI assistant that analyzes code, clarifies intent, and generates action plans",
      "Mesh Generation: Text-to-3D object creation within Roblox Studio",
      "Procedural Model Generation: Editable 3D assets from natural language",
      "Automated playtesting and bug detection",
      "3D/4D generative AI research presented at SIGGRAPH 2023 & 2024"
    ],
    keyInsight: "Roblox is not a game — it is a platform economy. The AI tooling investment is a flywheel: easier creation → more creators → more content → more players → more revenue → more AI investment.",
    strategicRead: "For founders, Roblox demonstrates that AI-powered creation tools are the most defensible moat in UGC platforms. The platform that makes creation easiest wins the creator economy."
  },
  {
    id: "age-of-empires",
    title: "Age of Empires",
    subtitle: "Reviving Legacy IP with Modern Infrastructure",
    category: "AAA / RTS",
    year: "2021–2026",
    heroStat: "Muse AI",
    heroStatLabel: "Microsoft's game preservation model",
    color: "#FF6B47",
    metrics: [
      { label: "Franchise Age", value: "28 yrs", delta: "1997–2026" },
      { label: "AI Pathfinding", value: "Flow Field", delta: "vs. legacy A*" },
      { label: "Muse Training Data", value: "Bleeding Edge", delta: "Xbox 2020" },
      { label: "Modding Priority", value: "First-class", delta: "AoE IV launch" }
    ],
    aiFeatures: [
      "Microsoft Muse: Generative AI model for game visuals and controller actions",
      "Flow field pathfinding replacing A* for more organic unit movement",
      "Modern networking backend from Relic Entertainment across all editions",
      "DeepMind AlphaStar benchmark: grandmaster-level RTS AI via reinforcement learning",
      "Modding tools as first-class feature to extend franchise lifecycle"
    ],
    keyInsight: "The AoE revival demonstrates that modernizing classic IP requires both technical infrastructure upgrades (networking, pathfinding) and community empowerment (modding tools). AI is the next layer — Microsoft Muse signals a future where AI preserves and ports entire game libraries.",
    strategicRead: "Legacy IP + AI preservation = new revenue from back catalogs. The studios that own beloved franchises and invest in AI porting tools will unlock significant untapped value."
  }
];

export const marketStats = [
  { label: "Developers Using AI", value: "90%", source: "GoodFirms 2026" },
  { label: "AI in Gaming Market (2033)", value: "$51B", source: "Industry Projections" },
  { label: "Steam Games Using AI (2026)", value: "7,300+", source: "BCG Report 2026" },
  { label: "Code Generated by Copilot", value: "46%", source: "GitHub 2025" },
  { label: "Global Game Market (2030)", value: "$556B", source: "Analyst Consensus" },
  { label: "Indie Market CAGR", value: "14.32%", source: "Mordor Intelligence 2026" }
];

export const openSourceData = {
  blender: {
    name: "Blender",
    type: "3D Creation Suite",
    license: "GPL",
    useCase: "Game asset creation: modeling, sculpting, UV mapping, animation, rendering",
    adoption: "Widely adopted by indie and mid-size studios as primary 3D pipeline",
    aiIntegration: "Growing ecosystem of AI extensions for texture generation and rigging automation",
    strengths: ["Zero licensing cost", "Full pipeline coverage", "Active community", "Engine export support (GLB, FBX, OBJ)"]
  },
  godot: {
    name: "Godot Engine",
    type: "Game Engine (2D + 3D)",
    license: "MIT",
    useCase: "Full game development: scripting, physics, rendering, deployment",
    adoption: "Steam games doubled annually 2023–2025; 107,000+ GitHub stars",
    aiIntegration: "Summer Engine built on Godot; growing AI plugin ecosystem",
    steamGrowth: [
      { period: "2023–2024", games: 618 },
      { period: "2024–2025", games: 1500 },
      { period: "2025–2026", games: 2864 }
    ],
    strengths: ["MIT license (no royalties)", "Modifiable engine source", "Strong 2D performance", "Cross-platform export"]
  },
  otherTools: [
    { name: "Krita", use: "2D art and texture painting" },
    { name: "GIMP", use: "Image manipulation and texture editing" },
    { name: "Audacity", use: "Audio editing and sound design" },
    { name: "LMMS", use: "Music production for game soundtracks" },
    { name: "O3DE", use: "Open 3D Engine (Amazon Lumberyard successor)" },
    { name: "Cocos", use: "2D/3D engine (went fully open-source Jan 2026)" }
  ]
};

export const futureOutlook = [
  {
    year: "2026",
    title: "AI as Core Engine Infrastructure",
    description: "AI capabilities are being embedded directly into game engines. Summer Engine (Godot-based), GDevelop AI, Unity AI, and Unreal Engine plugins all offer natural language interfaces for game creation.",
    probability: "Happening now"
  },
  {
    year: "2027",
    title: "Real-Time AI NPCs at Scale",
    description: "Inworld AI and Convai are building the infrastructure for millions of concurrent AI-powered NPCs. The bottleneck shifts from technology to cost-per-interaction economics.",
    probability: "High confidence"
  },
  {
    year: "2028",
    title: "AI-Generated Adaptive Narratives",
    description: "Games with fully procedural storylines that adapt to player behavior in real-time. Every playthrough is unique. The writer's role shifts to defining constraints and tone rather than scripting dialogue.",
    probability: "Medium confidence"
  },
  {
    year: "2030",
    title: "Global Game Market: $556B",
    description: "AI is expected to be a fundamental aspect of game design by 2030, influencing character behavior, adaptive narratives, and real-time cinematic sequences. Metaverse gaming alone projected at $648B by 2034.",
    probability: "Analyst consensus"
  }
];
