// Robert Locust - Verified AI & Technology Credentials Portfolio
// Master dataset and client-side reactive search/filtering logic

const credentialsData = [
  {
    "number": 1,
    "id": "CT190TJLYPT7",
    "title": "Generative AI Strategic Leader Specialization",
    "institution": "Vanderbilt University",
    "type": "Specialization",
    "date": "February 3, 2026",
    "category": "AI Strategy and Organizational Leadership",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/CT190TJLYPT7",
    "share_url": "https://coursera.org/share/5e8b71d5dae3e5b3123ef736bc25cbda",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Generative AI Deep Research: Strategic AI Edge for Leaders", "id": "C1OY5VKS1F0D", "url": "https://coursera.org/verify/C1OY5VKS1F0D"},
      {"title": "Prompt Engineering for ChatGPT", "id": "I5E6CQWH84N5", "url": "https://coursera.org/verify/I5E6CQWH84N5"},
      {"title": "Generative AI Primer", "id": "MJ18SQN0FE2H", "url": "https://coursera.org/verify/MJ18SQN0FE2H"},
      {"title": "Agentic AI and AI Agents: A Primer for Leaders", "id": "97SZ3BLWQE6M", "url": "https://coursera.org/verify/97SZ3BLWQE6M"}
    ]
  },
  {
    "number": 2,
    "id": "DA024S7Y1GKH",
    "title": "Google AI Essentials Specialization",
    "institution": "Google",
    "type": "Specialization",
    "date": "February 10, 2026",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/DA024S7Y1GKH",
    "share_url": "https://coursera.org/share/2ab55e432c7f467c2e6d88c6ba5ede25",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Introduction to AI", "id": "16X9SJ5DCVMI", "url": "https://coursera.org/verify/16X9SJ5DCVMI"},
      {"title": "Maximize Productivity With AI Tools", "id": "VBZ89ZYHFTJY", "url": "https://coursera.org/verify/VBZ89ZYHFTJY"},
      {"title": "Discover the Art of Prompting", "id": "UTCZBMA99EQH", "url": "https://coursera.org/verify/UTCZBMA99EQH"},
      {"title": "Use AI Responsibly", "id": "V0EEKK8BU94M", "url": "https://coursera.org/verify/V0EEKK8BU94M"},
      {"title": "Stay Ahead of the AI Curve", "id": "094LSH2E5ZRV", "url": "https://coursera.org/verify/094LSH2E5ZRV"}
    ]
  },
  {
    "number": 3,
    "id": "NC3UJ0LDPVND",
    "title": "Google IT Support Professional Certificate",
    "institution": "Google",
    "type": "Professional Certificate",
    "date": "February 8, 2026",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/NC3UJ0LDPVND",
    "share_url": "",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Technical Support Fundamentals", "id": "1DAZO0613LCX", "url": "https://coursera.org/verify/1DAZO0613LCX"},
      {"title": "The Bits and Bytes of Computer Networking", "id": "MD4QIT2NZ0FW", "url": "https://coursera.org/verify/MD4QIT2NZ0FW"},
      {"title": "Operating Systems and You: Becoming a Power User", "id": "AC72DQE4VRZ3", "url": "https://coursera.org/verify/AC72DQE4VRZ3"},
      {"title": "System Administration and IT Infrastructure Services", "id": "9TAUPELDAV34", "url": "https://coursera.org/verify/9TAUPELDAV34"},
      {"title": "IT Security: Defense against the digital dark arts", "id": "4QRBEXO29EQE", "url": "https://coursera.org/verify/4QRBEXO29EQE"},
      {"title": "Accelerate Your Job Search with AI", "id": "7SNN99T1UB4L", "url": "https://coursera.org/verify/7SNN99T1UB4L"}
    ]
  },
  {
    "number": 4,
    "id": "46TOQXSQP79M",
    "title": "Organizational Strategy with Generative AI & AI Agents Specialization",
    "institution": "Vanderbilt University",
    "type": "Specialization",
    "date": "January 2026",
    "category": "AI Strategy and Organizational Leadership",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/46TOQXSQP79M",
    "share_url": "",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Generative AI & AI Agent Organizational Strategy for Leaders", "id": "U0NWVTL5GEBO", "url": "https://coursera.org/verify/U0NWVTL5GEBO"},
      {"title": "Agentic AI and AI Agents: A Primer for Leaders", "id": "97SZ3BLWQE6M", "url": "https://coursera.org/verify/97SZ3BLWQE6M"},
      {"title": "Prompt Engineering for ChatGPT", "id": "I5E6CQWH84N5", "url": "https://coursera.org/verify/I5E6CQWH84N5"},
      {"title": "OpenAI GPTs: Creating Your Own Custom AI Assistants", "id": "7I2797IVCKD0", "url": "https://coursera.org/verify/7I2797IVCKD0"}
    ]
  },
  {
    "number": 5,
    "id": "VC6X0HJ0ZKVP",
    "title": "Google Prompting Essentials Specialization",
    "institution": "Google",
    "type": "Specialization",
    "date": "January 2026",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/VC6X0HJ0ZKVP",
    "share_url": "",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Start Writing Prompts like a Pro", "id": "H18LC18NHGSU", "url": "https://coursera.org/verify/H18LC18NHGSU"},
      {"title": "Design Prompts for Everyday Work Tasks", "id": "P81DQ55BZPIE", "url": "https://coursera.org/verify/P81DQ55BZPIE"},
      {"title": "Speed Up Data Analysis and Presentation Building", "id": "H1Y7HBZEGZAB", "url": "https://coursera.org/verify/H1Y7HBZEGZAB"},
      {"title": "Use AI as a Creative or Expert Partner", "id": "O4HVO1E1NS2D", "url": "https://coursera.org/verify/O4HVO1E1NS2D"}
    ]
  },
  {
    "number": 6,
    "id": "Y54CWPZ5JJ4Q",
    "title": "Generative AI for Educators & Teachers Specialization",
    "institution": "Vanderbilt University",
    "type": "Specialization",
    "date": "January 2026",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/specialization/certificate/Y54CWPZ5JJ4Q",
    "share_url": "",
    "status": "VERIFIED",
    "component_courses": [
      {"title": "Generative AI Primer", "id": "MJ18SQN0FE2H", "url": "https://coursera.org/verify/MJ18SQN0FE2H"},
      {"title": "Innovative Teaching with ChatGPT", "id": "VEYQVWMDW9US", "url": "https://coursera.org/verify/VEYQVWMDW9US"},
      {"title": "GPT Vision: Seeing the World through Generative AI", "id": "W0OYGOV55T46", "url": "https://coursera.org/verify/W0OYGOV55T46"},
      {"title": "Trustworthy Generative AI", "id": "BQ90OEBLRNM0", "url": "https://coursera.org/verify/BQ90OEBLRNM0"}
    ]
  },
  {
    "number": 7,
    "id": "OUQE6VJ2V2CJ",
    "title": "Vibe Coding Fundamentals",
    "institution": "University of Colorado System",
    "type": "Course",
    "date": "March 5, 2026",
    "category": "AI Automation and Productivity",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/OUQE6VJ2V2CJ",
    "share_url": "https://coursera.org/share/5e8b71d5dae3e5b3123ef736bc25cbda",
    "status": "VERIFIED"
  },
  {
    "number": 8,
    "id": "JX20B2YS8BZ3",
    "title": "Introduction to Networking",
    "institution": "NVIDIA",
    "type": "Course",
    "date": "February 5, 2026",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/JX20B2YS8BZ3",
    "share_url": "https://coursera.org/share/f0d069ef3d3c808530615cbdfb9786da",
    "status": "VERIFIED"
  },
  {
    "number": 9,
    "id": "B2X2YFSXDROO",
    "title": "Introduction to Data Analytics",
    "institution": "Meta",
    "type": "Course",
    "date": "February 2, 2026",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/B2X2YFSXDROO",
    "share_url": "https://coursera.org/share/a4c63a5bacaf385cfed8364be002008e",
    "status": "VERIFIED"
  },
  {
    "number": 10,
    "id": "NEB39550YVSI",
    "title": "Prepare Data for Exploration",
    "institution": "Google",
    "type": "Course",
    "date": "January 19, 2026",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/NEB39550YVSI",
    "share_url": "https://coursera.org/share/4bd070e3efdd23d4f3ab3a21af68bb38",
    "status": "VERIFIED"
  },
  {
    "number": 11,
    "id": "E8GYK27VYCO7",
    "title": "ChatGPT Advanced Data Analysis",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 13, 2026",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/E8GYK27VYCO7",
    "share_url": "https://coursera.org/share/dbad64714a16cc58c7dfab372418613d",
    "status": "VERIFIED"
  },
  {
    "number": 12,
    "id": "NEJQC0AI63GK",
    "title": "Ask Questions to Make Data-Driven Decisions",
    "institution": "Google",
    "type": "Course",
    "date": "December 2025",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/NEJQC0AI63GK",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 13,
    "id": "HPIJ9TXEWSJ2",
    "title": "Foundations: Data, Data, Everywhere",
    "institution": "Google",
    "type": "Course",
    "date": "December 2025",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/HPIJ9TXEWSJ2",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 14,
    "id": "GTXC25N732MW",
    "title": "Prompt Engineering for Generative AI: Build Better AI Prompts",
    "institution": "IBM",
    "type": "Course",
    "date": "December 2025",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/GTXC25N732MW",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 15,
    "id": "M08UCKJRSXLF",
    "title": "Claude Code: Software Engineering with Generative AI Agents",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "December 2025",
    "category": "AI Agents and Agentic Systems",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/M08UCKJRSXLF",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 16,
    "id": "HU3GGYB0TGGM",
    "title": "Introduction to Information Technology and AWS Cloud",
    "institution": "Amazon Web Services",
    "type": "Course",
    "date": "November 2025",
    "category": "Cloud Computing and Infrastructure",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/HU3GGYB0TGGM",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 17,
    "id": "8QH3UK49X0UM",
    "title": "Generative AI Essentials: From Fundamentals to Real-World Applications",
    "institution": "IBM",
    "type": "Course",
    "date": "November 2025",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/8QH3UK49X0UM",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 18,
    "id": "QFAOKQFWKO7B",
    "title": "AI Foundations: How Artificial Intelligence Works",
    "institution": "IBM",
    "type": "Course",
    "date": "September 2025",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/QFAOKQFWKO7B",
    "share_url": "",
    "status": "VERIFIED"
  },
  {
    "number": 19,
    "id": "C1OY5VKS1F0D",
    "title": "Generative AI Deep Research: Strategic AI Edge for Leaders",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "February 2026",
    "category": "AI Strategy and Organizational Leadership",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/C1OY5VKS1F0D",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI Strategic Leader Specialization"
  },
  {
    "number": 20,
    "id": "I5E6CQWH84N5",
    "title": "Prompt Engineering for ChatGPT",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "November 2025",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/I5E6CQWH84N5",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI Strategic Leader Specialization"
  },
  {
    "number": 21,
    "id": "MJ18SQN0FE2H",
    "title": "Generative AI Primer",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "December 2025",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/MJ18SQN0FE2H",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI Strategic Leader Specialization"
  },
  {
    "number": 22,
    "id": "97SZ3BLWQE6M",
    "title": "Agentic AI and AI Agents: A Primer for Leaders",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 2026",
    "category": "AI Agents and Agentic Systems",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/97SZ3BLWQE6M",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI Strategic Leader Specialization"
  },
  {
    "number": 23,
    "id": "16X9SJ5DCVMI",
    "title": "Introduction to AI",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/16X9SJ5DCVMI",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google AI Essentials Specialization"
  },
  {
    "number": 24,
    "id": "VBZ89ZYHFTJY",
    "title": "Maximize Productivity With AI Tools",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "AI Automation and Productivity",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/VBZ89ZYHFTJY",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google AI Essentials Specialization"
  },
  {
    "number": 25,
    "id": "UTCZBMA99EQH",
    "title": "Discover the Art of Prompting",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/UTCZBMA99EQH",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google AI Essentials Specialization"
  },
  {
    "number": 26,
    "id": "V0EEKK8BU94M",
    "title": "Use AI Responsibly",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "Responsible AI and Related Topics",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/V0EEKK8BU94M",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google AI Essentials Specialization"
  },
  {
    "number": 27,
    "id": "094LSH2E5ZRV",
    "title": "Stay Ahead of the AI Curve",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/094LSH2E5ZRV",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google AI Essentials Specialization"
  },
  {
    "number": 28,
    "id": "1DAZO0613LCX",
    "title": "Technical Support Fundamentals",
    "institution": "Google",
    "type": "Course",
    "date": "September 2025",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/1DAZO0613LCX",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 29,
    "id": "MD4QIT2NZ0FW",
    "title": "The Bits and Bytes of Computer Networking",
    "institution": "Google",
    "type": "Course",
    "date": "October 2025",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/MD4QIT2NZ0FW",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 30,
    "id": "AC72DQE4VRZ3",
    "title": "Operating Systems and You: Becoming a Power User",
    "institution": "Google",
    "type": "Course",
    "date": "October 2025",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/AC72DQE4VRZ3",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 31,
    "id": "9TAUPELDAV34",
    "title": "System Administration and IT Infrastructure Services",
    "institution": "Google",
    "type": "Course",
    "date": "February 2026",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/9TAUPELDAV34",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 32,
    "id": "4QRBEXO29EQE",
    "title": "IT Security: Defense against the digital dark arts",
    "institution": "Google",
    "type": "Course",
    "date": "January 2026",
    "category": "Information Technology and Technical Support",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/4QRBEXO29EQE",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 33,
    "id": "7SNN99T1UB4L",
    "title": "Accelerate Your Job Search with AI",
    "institution": "Google",
    "type": "Course",
    "date": "December 2025",
    "category": "AI Automation and Productivity",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/7SNN99T1UB4L",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google IT Support Professional Certificate"
  },
  {
    "number": 34,
    "id": "U0NWVTL5GEBO",
    "title": "Generative AI & AI Agent Organizational Strategy for Leaders",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 2026",
    "category": "AI Strategy and Organizational Leadership",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/U0NWVTL5GEBO",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Organizational Strategy with Generative AI & AI Agents Specialization"
  },
  {
    "number": 35,
    "id": "7I2797IVCKD0",
    "title": "OpenAI GPTs: Creating Your Own Custom AI Assistants",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 2026",
    "category": "AI Agents and Agentic Systems",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/7I2797IVCKD0",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Organizational Strategy with Generative AI & AI Agents Specialization"
  },
  {
    "number": 36,
    "id": "H18LC18NHGSU",
    "title": "Start Writing Prompts like a Pro",
    "institution": "Google",
    "type": "Course",
    "date": "December 2025",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/H18LC18NHGSU",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google Prompting Essentials Specialization"
  },
  {
    "number": 37,
    "id": "P81DQ55BZPIE",
    "title": "Design Prompts for Everyday Work Tasks",
    "institution": "Google",
    "type": "Course",
    "date": "January 2026",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/P81DQ55BZPIE",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google Prompting Essentials Specialization"
  },
  {
    "number": 38,
    "id": "H1Y7HBZEGZAB",
    "title": "Speed Up Data Analysis and Presentation Building",
    "institution": "Google",
    "type": "Course",
    "date": "January 2026",
    "category": "Data Analytics and Business Intelligence",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/H1Y7HBZEGZAB",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google Prompting Essentials Specialization"
  },
  {
    "number": 39,
    "id": "O4HVO1E1NS2D",
    "title": "Use AI as a Creative or Expert Partner",
    "institution": "Google",
    "type": "Course",
    "date": "January 2026",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/O4HVO1E1NS2D",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Google Prompting Essentials Specialization"
  },
  {
    "number": 40,
    "id": "VEYQVWMDW9US",
    "title": "Innovative Teaching with ChatGPT",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 2026",
    "category": "Prompt Engineering and AI Applications",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/VEYQVWMDW9US",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI for Educators & Teachers Specialization"
  },
  {
    "number": 41,
    "id": "W0OYGOV55T46",
    "title": "GPT Vision: Seeing the World through Generative AI",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "December 2025",
    "category": "Generative AI and Large Language Models",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/W0OYGOV55T46",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI for Educators & Teachers Specialization"
  },
  {
    "number": 42,
    "id": "BQ90OEBLRNM0",
    "title": "Trustworthy Generative AI",
    "institution": "Vanderbilt University",
    "type": "Course",
    "date": "January 2026",
    "category": "Responsible AI and Related Topics",
    "direct_url": "https://www.coursera.org/account/accomplishments/verify/BQ90OEBLRNM0",
    "share_url": "",
    "status": "VERIFIED",
    "parent_specialization": "Generative AI for Educators & Teachers Specialization"
  }
];

// DOM references
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const institutionFilter = document.getElementById('institutionFilter');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const resultsCount = document.getElementById('resultsCount');
const resetBtn = document.getElementById('resetBtn');

function renderCards(items) {
  if (items.length === 0) {
    cardsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matching credentials found</h3>
        <p>Try adjusting your search keywords or resetting your filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    resultsCount.textContent = 'Showing 0 credentials';
    return;
  }

  resultsCount.textContent = `Showing ${items.length} of ${credentialsData.length} credentials`;

  cardsContainer.innerHTML = items.map(c => {
    const isSpec = c.type === 'Specialization' || c.type === 'Professional Certificate';
    const hasComponents = c.component_courses && c.component_courses.length > 0;
    
    // Category pill class
    const categorySlug = c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const institutionSlug = c.institution.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return `
      <article class="credential-card ${isSpec ? 'card-specialization' : 'card-course'}" data-id="${c.id}">
        <div class="card-header">
          <div class="badges-row">
            <span class="badge badge-type badge-${c.type.toLowerCase().replace(/\s+/g, '-')}">${c.type}</span>
            <span class="badge badge-verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              VERIFIED
            </span>
            <span class="credential-seq">#${c.number}</span>
          </div>
          <h3 class="credential-title">${escapeHtml(c.title)}</h3>
          <div class="credential-meta">
            <span class="institution-tag inst-${institutionSlug}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
              ${escapeHtml(c.institution)}
            </span>
            <span class="completion-date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${escapeHtml(c.date)}
            </span>
          </div>
        </div>

        <div class="card-body">
          <div class="category-pill cat-${categorySlug}">
            ${escapeHtml(c.category)}
          </div>
          
          <div class="credential-id-box">
            <span class="id-label">Credential ID:</span>
            <code class="id-code">${c.id}</code>
            <button class="btn-copy-id" onclick="copyToClipboard('${c.id}', this)" title="Copy ID">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>

          ${c.parent_specialization ? `
            <div class="parent-spec-notice">
              <span>Part of:</span> <strong>${escapeHtml(c.parent_specialization)}</strong>
            </div>
          ` : ''}

          ${hasComponents ? `
            <div class="components-accordion">
              <button class="btn-accordion-toggle" onclick="toggleComponents(this)">
                <span>Includes ${c.component_courses.length} Component Courses</span>
                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="components-panel" style="display: none;">
                <ul class="components-list">
                  ${c.component_courses.map(cc => `
                    <li>
                      <span class="comp-title">${escapeHtml(cc.title)}</span>
                      <a href="${cc.url}" target="_blank" rel="noopener noreferrer" class="comp-verify-link">
                        Verify [${cc.id}] ↗
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="card-footer">
          <a href="${c.direct_url}" target="_blank" rel="noopener noreferrer" class="btn btn-verify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            VIEW VERIFIED CERTIFICATE
          </a>
          ${c.share_url ? `
            <a href="${c.share_url}" target="_blank" rel="noopener noreferrer" class="btn btn-share" title="Public Coursera Share Link">
              Share Link ↗
            </a>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

function filterCredentials() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedInst = institutionFilter.value;
  const selectedCat = categoryFilter.value;
  const selectedType = typeFilter.value;

  const filtered = credentialsData.filter(c => {
    // Search match
    const titleMatch = c.title.toLowerCase().includes(query);
    const idMatch = c.id.toLowerCase().includes(query);
    const instMatch = c.institution.toLowerCase().includes(query);
    const catMatch = c.category.toLowerCase().includes(query);
    const searchPass = !query || titleMatch || idMatch || instMatch || catMatch;

    // Institution filter
    const instPass = !selectedInst || c.institution === selectedInst;

    // Category filter
    const catPass = !selectedCat || c.category === selectedCat;

    // Type filter
    const typePass = !selectedType || c.type === selectedType;

    return searchPass && instPass && catPass && typePass;
  });

  renderCards(filtered);
}

function resetFilters() {
  searchInput.value = '';
  institutionFilter.value = '';
  categoryFilter.value = '';
  typeFilter.value = '';
  renderCards(credentialsData);
}

function toggleComponents(btn) {
  const panel = btn.nextElementSibling;
  const chevron = btn.querySelector('.chevron');
  if (panel.style.display === 'none' || !panel.style.display) {
    panel.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  } else {
    panel.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  }
}

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = `<span style="color:#10b981;font-size:11px;font-weight:bold;">Copied!</span>`;
    setTimeout(() => {
      btn.innerHTML = original;
    }, 1500);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

// Event Listeners
searchInput.addEventListener('input', filterCredentials);
institutionFilter.addEventListener('change', filterCredentials);
categoryFilter.addEventListener('change', filterCredentials);
typeFilter.addEventListener('change', filterCredentials);
resetBtn.addEventListener('click', resetFilters);

// Quick Category Filter Buttons
document.querySelectorAll('.cat-quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.getAttribute('data-cat');
    categoryFilter.value = cat;
    filterCredentials();
    document.getElementById('credentialsSection').scrollIntoView({ behavior: 'smooth' });
  });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderCards(credentialsData);
});
