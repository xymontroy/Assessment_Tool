document.addEventListener("DOMContentLoaded", () => {
  // Google Sheet submission URL - Replace with your own Google Apps Script Web App URL
  const GOOGLE_SHEET_URL ="https://script.google.com/macros/s/AKfycbyLUr5elIrWBdESEOiJDsYDLGCVpYes2GcRmSPXRLExwLNbcJc2mlQRxF1tSOPo5YWY/exec";

  // Data objects
  // Qualification categories and items
  const qualificationCategories = {
    "CRM & Quality Assurance": [
      "CRM Software Expertise",
      "Data Analysis & Reporting",
      "Call Evaluation & Scoring",
      "Lead Qualification Techniques",
      "Sales Performance Analysis",
      "Coaching & Training",
    ],
    "HR & Finance": [
      "Payroll Management",
      "Labor Law Compliance",
      "Employee Records Management",
      "People Management",
      "Policy Development",
      "Project Management",
      "Financial Planning",
      "General Ledger Accounting",
      "Financial Reporting",
      "Budgeting & Forecasting",
    ],
    "Operations & Client Success": [
      "Process Optimization",
      "Project Management",
      "Team Leadership",
      "Customer Retention Strategies",
      "Account Management",
      "Workflow Management",
      "Lead Generation Strategy",
      "Sales Pipeline Management",
      "B2B Sales & Negotiation",
      "Lead Qualification",
      "Prospecting",
    ],
    "Marketing & Lead Generation": [
      "Performance Analytics",
      "PPC Management",
      "Prospecting",
      "CRM Management",
      "List Building",
      "Content Planning",
      "Engagement Strategy",
    ],
    "Creative & Digital Marketing": [
      "Frontend & Backend Development",
      "CMS Management",
      "SEO Strategy",
      "Website Analytics",
      "On-Page/Off-Page SEO",
      "Google Analytics",
      "Marketing Compliance",
      "Content Quality Review",
      "Objection Handling",
      "Social Media Advertising",
      "Community Engagement",
    ],
    "Database & Research": [
      "Data Management",
      "Database Optimization",
      "Market Research",
      "Data Collection",
      "Statistical Analysis",
      "Data Visualization",
      "Data Modeling",
      "Database Segmentation",
      "Data Verification",
    ],
    "Digital Marketing & Content": [
      "Paid Advertising",
      "Marketing Automation",
      "Email Automation",
      "A/B Testing",
      "Graphic Design",
      "UI/UX Design",
      "Copywriting",
      "Marketing Content Optimization",
      "LinkedIn Outreach",
      "B2B Networking",
    ],
    "Recruitment and L&D": [
      "Applicant Screening",
      "Talent Sourcing",
      "Employer Branding",
      "Social Media Recruitment",
      "Applicant Database Management",
      "Data Entry",
      "Training Program Development",
      "Performance Evaluation",
      "Content Production",
    ],
    "Project & Process Management": [
      "Agile & Scrum Methodologies",
      "Risk Management",
      "Coding & Programming",
      "Software Testing",
      "Process Mapping",
      "Business Process Optimization",
    ],
    "IT & Security": [
      "IT Infrastructure Management",
      "Cybersecurity",
      "Threat Detection",
      "Compliance & Risk Management",
      "Network & Security Management",
      "Server Maintenance",
      "IT Troubleshooting & System Maintenance",
      "LinkedIn Profile Management",
      "Technical Documentation & Support",
    ],
  }

  // Technical skills categories and items
  const technicalCategories = {
    "CRM & Quality Assurance": [
      "CRM platforms (Salesforce, HubSpot)",
      "Data Reporting Tools (Power BI, Tableau)",
      "QA Software (Call Listening Tools, QA Scorecards)",
      "Google Sheets/Excel (Pivot Tables, Data Validation)",
      "Sales Analytics Tools (HubSpot, Gong.io)",
      "Performance Tracking Software (Power BI, Salesforce Analytics)",
    ],
    "HR & Finance": [
      "Payroll Systems (ADP, QuickBooks)",
      "HRIS (BambooHR, Workday)",
      "HRMS (SAP SuccessFactors, Workday)",
      "Document Management Systems (Google Drive, SharePoint)",
      "Compliance Software (HRIS, OSHA Compliance Tools)",
      "ATS (Greenhouse, Lever)",
      "ERP Systems",
      "Financial Planning Software (NetSuite, QuickBooks)",
      "Accounting Software (Xero, QuickBooks)",
      "Excel (Financial Modeling, Macros)",
      "Budgeting Tools (SAP, NetSuite)",
      "Financial Reporting Software (Power BI, Tableau)",
    ],
    "Operations & Client Success": [
      "Project Management Tools (Asana, Monday.com)",
      "ERP Systems (SAP, NetSuite)",
      "CRM (Salesforce, Zendesk)",
      "Customer Support Tools (Intercom, Freshdesk)",
      "Workflow Management (ClickUp, Wrike)",
      "QA Tools (ISO Compliance Software)",
      "CRM (Pipedrive, Salesforce)",
      "Email Outreach Platforms (Apollo, Outreach.io)",
      "Dialer Software (RingCentral, Aircall)",
      "Lead Tracking Software (HubSpot, Reply.io)",
    ],
    "Marketing & Lead Generation": [
      "Marketing Automation Tools (Marketo, HubSpot)",
      "Google Analytics",
      "Lead Enrichment Tools (LinkedIn Sales Navigator, ZoomInfo)",
      "CRM (Salesforce, Pipedrive)",
      "Data Scraping Tools (Scrapy, Octoparse)",
      "SQL (Basic Queries)",
    ],
    "Creative & Digital Marketing": [
      "Social Media Management Tools (Hootsuite, Sprout Social)",
      "Canva/Adobe Photoshop",
      "Programming Languages (HTML, CSS, JavaScript)",
      "CMS (WordPress, Shopify)",
      "SEO Tools (Ahrefs, SEMrush)",
      "Google Docs",
      "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Figma",
      "Google Search Console",
      "Keyword Research Tools (Moz, SEMrush)",
      "Technical SEO Tools (Screaming Frog, Google PageSpeed Insights)",
      "A/B Testing Tools (Google Optimize, VWO)",
      "SEO Audit Tools (SEMrush, Ahrefs)",
      "Dialer Software (Five9, Aircall)",
      "Social Listening Tools (Brandwatch, Sprout Social)",
      "Content Scheduling Tools (Buffer, Later)",
    ],
    "Database & Research": [
      "Database Management (MySQL, PostgreSQL)",
      "Data Processing (Excel, Google Sheets)",
      "Market Research Platforms (Statista, IBISWorld)",
      "Survey Tools (Google Forms, Typeform)",
      "Data Visualization Tools (Power BI, Tableau)",
      "SQL (Intermediate Queries)",
      "Database Cleaning Tools (OpenRefine, Trifacta)",
      "CRM Enrichment (Clearbit, ZoomInfo)",
      "Database Management Systems (SQL Server, MongoDB)",
      "IT Support Tools (Zendesk, Jira)",
      "Data Governance Software (Collibra, Alation)",
      "Cloud Storage (AWS S3, Google Cloud)",
    ],
    "Digital Marketing & Content": [
      "PPC Tools (Google Ads, Facebook Ads Manager)",
      "Marketing Analytics (Google Data Studio, HubSpot)",
      "Email Platforms (Mailchimp, Klaviyo)",
      "A/B Testing Software (Litmus, Optimizely)",
      "UI/UX Design Tools (Figma, Adobe XD)",
      "HTML/CSS (Basic for Web Design)",
      "CMS (WordPress, Ghost)",
      "Copywriting Tools (Grammarly, Hemingway Editor)",
      "LinkedIn Sales Navigator",
      "LinkedIn Analytics",
    ],
    "Recruitment & Training": [
      "ATS",
      "LinkedIn Recruiter",
      "Job Boards",
      "Social Media Ads (Meta Business Suite, LinkedIn Ads)",
      "Design Software",
      "Applicant Database Management (Google Sheets, SQL)",
      "LMS Platforms (Moodle, TalentLMS)",
      "E-learning Tools (Articulate, Captivate)",
      "Video Editing Software (Adobe Premiere Pro, Camtasia)",
      "Audio Recording Tools (Audacity, GarageBand)",
    ],
    "Project & Process Management": [
      "Project Management Tools (Trello, Jira)",
      "Risk Assessment Software (Lucidchart, Asana)",
      "Programming Languages (Python, Java, C#)",
      "Version Control (Git, GitHub)",
      "Process Mapping Tools (Bizagi, Microsoft Visio)",
    ],
    "IT & Security": [
      "ITSM Tools (ServiceNow, Freshservice)",
      "Cloud Management (AWS, Azure)",
      "SIEM Tools (Splunk, IBM QRadar)",
      "Endpoint Security (CrowdStrike, Symantec)",
      "Network Monitoring (Wireshark, Nagios)",
      "Firewall Configurations (Cisco, Fortinet)",
      "Help Desk Software (Zendesk, Freshdesk)",
      "Remote Desktop Tools (TeamViewer, AnyDesk)",
      "Ticketing Systems (Jira Service Desk, Zoho Desk)",
      "Knowledge Base Software (Confluence, Notion)",
    ],
  }

  // Industry data
  const industryData = [
    "B2B Sales & Lead Generation",
    "Customer Success / Client Management",
    "Data & Analytics",
    "Digital Marketing & Content Creation",
    "E-commerce",
    "UI/UX & Product Design",
  ]

  // Education data with point values
  const educationData = [
    { level: "Completed Courses/Certifications", points: 0.5 },
    { level: "Bachelor's Degree", points: 1 },
    { level: "Master's Degree", points: 2 },
  ]

  // Years of experience options with point values
  const experienceData = [
    { level: "1 to 2 years", points: 0.3 },
    { level: "3 to 4 years", points: 0.5 },
    { level: "4 to 5 years", points: 0.8 },
    { level: "5+ years", points: 1 },
  ]

  // Role descriptions for results page
  const roleDescriptions = {
    "CRM Manager":
      "Responsible for managing CRM systems, ensuring data quality, and generating reports for business insights.",
    "Quality Assurance Analyst":
      "Evaluates call quality, ensures compliance with standards, and provides feedback for improvement.",
    "Sales Performance and QA Coordinator":
      "Monitors sales performance metrics and ensures quality standards are maintained across sales teams.",
    "HR/Finance": "Manages HR functions and financial processes, including payroll and compliance with labor laws.",
    "HR/Admin Specialist": "Handles employee records, administrative tasks, and supports HR operations.",
    "HR/Admin Manager":
      "Oversees HR policies, people management, and administrative functions within the organization.",
    "HR/Admin and Finance Director":
      "Leads HR, administrative, and financial planning for the organization at a strategic level.",
    "Finance Associate": "Manages accounting tasks, financial reporting, and general ledger maintenance.",
    "Finance Manager (Coordinator)": "Oversees budgeting, forecasting, and financial management processes.",
    "Operations Manager": "Optimizes business processes, manages projects, and leads operational teams.",
    "Client Success Manager": "Focuses on customer retention, relationship management, and account growth strategies.",
    "Production Manager": "Manages workflow, project timelines, and team coordination for production processes.",
    "Business Development Manager":
      "Develops sales strategies, manages the sales pipeline, and leads business growth initiatives.",
    "Business Development Representative": "Qualifies leads, conducts outreach, and supports the sales process.",
    "Marketing Manager": "Oversees marketing campaigns, analyzes performance metrics, and manages marketing projects.",
    "Lead Generator": "Identifies and qualifies potential leads through various prospecting methods.",
    "Social Media Specialist": "Plans content, manages engagement, and implements social media strategies.",
    "Web Developer": "Builds and maintains websites, focusing on both frontend and backend development.",
    "SEO Program Manager": "Develops SEO strategies, analyzes website performance, and manages SEO projects.",
    "SEO Specialist": "Implements on-page and off-page SEO techniques and monitors analytics.",
    "Quality Assurance Analyst (SEO)": "Ensures marketing compliance and reviews content quality for SEO purposes.",
    "Sales Development Representative": "Prospects for new business, handles objections, and builds sales pipelines.",
    "Social Media Marketer": "Manages social media advertising and community engagement across platforms.",
    "Database Coordinator": "Optimizes database systems and ensures data management best practices.",
    Researcher: "Conducts market research and collects data for business insights.",
    "Data Analyst": "Analyzes data sets, creates visualizations, and develops data models for insights.",
    "Data Profiler": "Segments databases and verifies data accuracy and completeness.",
    "Digital Marketing Manager": "Manages paid advertising campaigns and marketing automation strategies.",
    "Email Marketing Specialist/Associate":
      "Develops email campaigns, conducts A/B testing, and optimizes email performance.",
    "Digital Designer": "Creates graphic designs and user interfaces for digital platforms.",
    "Content Writer": "Develops marketing copy, email content, and other written materials optimized for engagement.",
    "LinkedIn Champion": "Specializes in LinkedIn outreach and B2B networking strategies.",
    "Recruitment Coordinator":
      "Manages the recruitment process, screens applicants, and coordinates hiring activities.",
    "Recruitment Associate": "Sources talent, screens applicants, and supports the recruitment process.",
    "Recruitment Branding Specialist": "Develops employer branding and manages social media recruitment efforts.",
    "Recruitment Database Specialist": "Manages applicant databases and handles recruitment data entry.",
    "Learning and Development Coordinator":
      "Develops training programs, evaluates performance, and manages learning initiatives.",
    "Production Specialist": "Evaluates performance and produces content for training and development.",
    "Project Manager": "Applies Agile methodologies, manages risks, and leads project teams.",
    "Software Developer": "Writes code, tests software, and implements technical solutions.",
    "Business Process Manager": "Maps processes, manages projects, and optimizes business operations.",
    "IT Manager": "Manages IT infrastructure, ensures cybersecurity, and leads technical teams.",
    "IT Security Manager": "Detects threats, manages compliance, and mitigates security risks.",
    "Network Administrator": "Manages network systems, security protocols, and server maintenance.",
    "Tech Support": "Troubleshoots IT issues and maintains system functionality.",
    "Non-Voice Tech Support": "Manages LinkedIn profiles and provides technical documentation and support.",
  }

  // Required qualifications for each role
  const roleQualifications = {
    "CRM Manager": ["CRM Software Expertise", "Data Analysis & Reporting"],
    "Quality Assurance Analyst": ["Call Evaluation & Scoring", "Lead Qualification Techniques"],
    "Sales Performance and QA Coordinator": ["Sales Performance Analysis", "Coaching & Training"],
    "HR/Finance": ["Payroll Management", "Labor Law Compliance"],
    "HR/Admin Specialist": ["Employee Records Management", "People Management"],
    "HR/Admin Manager": ["Policy Development", "People Management", "Labor Law Compliance", "Project Management"],
    "HR/Admin and Finance Director": ["Financial Planning", "Payroll Management"],
    "Finance Associate": ["General Ledger Accounting", "Financial Reporting"],
    "Finance Manager (Coordinator)": ["Budgeting & Forecasting", "Payroll Management"],
    "Operations Manager": ["Process Optimization", "Project Management", "Team Leadership"],
    "Client Success Manager": ["Customer Retention Strategies", "Account Management"],
    "Production Manager": ["Workflow Management", "Project Management", "Team Leadership"],
    "Business Development Manager": [
      "Lead Generation Strategy",
      "Sales Pipeline Management",
      "B2B Sales & Negotiation",
    ],
    "Business Development Representative": ["Lead Qualification", "Prospecting"],
    "Marketing Manager": ["Performance Analytics", "PPC Management", "Project Management"],
    "Lead Generator": ["Prospecting", "CRM Management", "List Building"],
    "Social Media Specialist": ["Content Planning", "Engagement Strategy"],
    "Web Developer": ["Frontend & Backend Development", "CMS Management"],
    "SEO Program Manager": ["SEO Strategy", "Website Analytics", "Project Management"],
    "SEO Specialist": ["On-Page/Off-Page SEO", "Google Analytics"],
    "Quality Assurance Analyst (SEO)": ["Marketing Compliance", "Content Quality Review"],
    "Sales Development Representative": ["Prospecting", "Objection Handling", "List Building"],
    "Social Media Marketer": ["Social Media Advertising", "Community Engagement"],
    "Database Coordinator": ["Data Management", "Database Optimization"],
    Researcher: ["Market Research", "Data Collection"],
    "Data Analyst": ["Statistical Analysis", "Data Visualization", "Data Modeling"],
    "Data Profiler": ["Database Segmentation", "Data Verification"],
    "Digital Marketing Manager": ["Paid Advertising", "Marketing Automation"],
    "Email Marketing Specialist/Associate": ["Email Automation", "A/B Testing"],
    "Digital Designer": ["Graphic Design", "UI/UX Design"],
    "Content Writer": ["Copywriting", "Marketing Content Optimization"],
    "LinkedIn Champion": ["LinkedIn Outreach", "B2B Networking"],
    "Recruitment Coordinator": ["Applicant Screening", "Project Management", "Team Leadership"],
    "Recruitment Associate": ["Talent Sourcing", "Applicant Screening"],
    "Recruitment Branding Specialist": ["Employer Branding", "Social Media Recruitment"],
    "Recruitment Database Specialist": ["Applicant Database Management", "Data Entry"],
    "Learning and Development Coordinator": [
      "Training Program Development",
      "Performance Evaluation",
      "Project Management",
    ],
    "Production Specialist": ["Performance Evaluation", "Content Production"],
    "Project Manager": ["Agile & Scrum Methodologies", "Risk Management", "Project Management", "Team Leadership"],
    "Software Developer": ["Coding & Programming", "Software Testing"],
    "Business Process Manager": ["Process Mapping", "Project Management", "Business Process Optimization"],
    "IT Manager": ["IT Infrastructure Management", "Cybersecurity", "Project Management", "Team Leadership"],
    "IT Security Manager": ["Threat Detection", "Compliance & Risk Management"],
    "Network Administrator": ["Network & Security Management", "Server Maintenance"],
    "Tech Support": ["IT Troubleshooting & System Maintenance", "Network & Security Management"],
    "Non-Voice Tech Support": ["LinkedIn Profile Management", "Technical Documentation & Support"],
  }

  // Technical skills for each role
  const roleTechnicalSkills = {
    "CRM Manager": ["CRM platforms (Salesforce, HubSpot)", "Data Reporting Tools (Power BI, Tableau)"],
    "Quality Assurance Analyst": [
      "QA Software (Call Listening Tools, QA Scorecards)",
      "Google Sheets/Excel (Pivot Tables, Data Validation)",
    ],
    "Sales Performance and QA Coordinator": [
      "Sales Analytics Tools (HubSpot, Gong.io)",
      "Performance Tracking Software (Power BI, Salesforce Analytics)",
    ],
    "HR/Finance": ["Payroll Systems (ADP, QuickBooks)", "HRIS (BambooHR, Workday)"],
    "HR/Admin Specialist": [
      "HRMS (SAP SuccessFactors, Workday)",
      "Document Management Systems (Google Drive, SharePoint)",
    ],
    "HR/Admin Manager": ["Compliance Software (HRIS, OSHA Compliance Tools)", "ATS (Greenhouse, Lever)"],
    "HR/Admin and Finance Director": ["ERP Systems", "Financial Planning Software (NetSuite, QuickBooks)"],
    "Finance Associate": ["Accounting Software (Xero, QuickBooks)", "Excel (Financial Modeling, Macros)"],
    "Finance Manager (Coordinator)": [
      "Budgeting Tools (SAP, NetSuite)",
      "Financial Reporting Software (Power BI, Tableau)",
    ],
    "Operations Manager": ["Project Management Tools (Asana, Monday.com)", "ERP Systems (SAP, NetSuite)"],
    "Client Success Manager": ["CRM (Salesforce, Zendesk)", "Customer Support Tools (Intercom, Freshdesk)"],
    "Production Manager": ["Workflow Management (ClickUp, Wrike)", "QA Tools (ISO Compliance Software)"],
    "Business Development Manager": ["CRM (Pipedrive, Salesforce)", "Email Outreach Platforms (Apollo, Outreach.io)"],
    "Business Development Representative": ["CRM (Pipedrive, Salesforce)", "Dialer Software (RingCentral, Aircall)"],
    "Marketing Manager": ["Marketing Automation Tools (Marketo, HubSpot)", "Google Analytics"],
    "Lead Generator": ["Lead Enrichment Tools (LinkedIn Sales Navigator, ZoomInfo)", "CRM (Salesforce, Pipedrive)"],
    "Social Media Specialist": ["Social Media Management Tools (Hootsuite, Sprout Social)", "Canva/Adobe Photoshop"],
    "Web Developer": ["Programming Languages (HTML, CSS, JavaScript)", "CMS (WordPress, Shopify)"],
    "SEO Program Manager": ["Google Search Console", "Keyword Research Tools (Moz, SEMrush)"],
    "SEO Specialist": ["Technical SEO Tools (Screaming Frog, Google PageSpeed Insights)", "Google Analytics"],
    "Quality Assurance Analyst (SEO)": [
      "A/B Testing Tools (Google Optimize, VWO)",
      "SEO Audit Tools (SEMrush, Ahrefs)",
    ],
    "Sales Development Representative": ["CRM (Salesforce, HubSpot)", "Dialer Software (Five9, Aircall)"],
    "Social Media Marketer": [
      "Social Listening Tools (Brandwatch, Sprout Social)",
      "Content Scheduling Tools (Buffer, Later)",
    ],
    "Database Coordinator": ["Database Management (MySQL, PostgreSQL)", "Data Processing (Excel, Google Sheets)"],
    Researcher: ["Market Research Platforms (Statista, IBISWorld)", "Survey Tools (Google Forms, Typeform)"],
    "Data Analyst": ["Data Visualization Tools (Power BI, Tableau)", "SQL (Intermediate Queries)"],
    "Data Profiler": ["Database Cleaning Tools (OpenRefine, Trifacta)", "CRM Enrichment (Clearbit, ZoomInfo)"],
    "Digital Marketing Manager": [
      "PPC Tools (Google Ads, Facebook Ads Manager)",
      "Marketing Analytics (Google Data Studio, HubSpot)",
    ],
    "Email Marketing Specialist/Associate": [
      "Email Platforms (Mailchimp, Klaviyo)",
      "A/B Testing Software (Litmus, Optimizely)",
    ],
    "Digital Designer": ["UI/UX Design Tools (Figma, Adobe XD)", "HTML/CSS (Basic for Web Design)"],
    "Content Writer": ["CMS (WordPress, Ghost)", "Copywriting Tools (Grammarly, Hemingway Editor)"],
    "LinkedIn Champion": ["LinkedIn Sales Navigator", "LinkedIn Analytics"],
    "Recruitment Coordinator": ["ATS", "LinkedIn Recruiter"],
    "Recruitment Associate": ["Job Boards", "ATS"],
    "Recruitment Branding Specialist": [
      "Social Media Ads (Meta Business Suite, LinkedIn Ads)",
      "Design Software",
      "Job Boards",
    ],
    "Recruitment Database Specialist": ["Applicant Database Management (Google Sheets, SQL)", "ATS"],
    "Learning and Development Coordinator": [
      "LMS Platforms (Moodle, TalentLMS)",
      "E-learning Tools (Articulate, Captivate)",
    ],
    "Production Specialist": [
      "Video Editing Software (Adobe Premiere Pro, Camtasia)",
      "Audio Recording Tools (Audacity, GarageBand)",
    ],
    "Project Manager": ["Project Management Tools (Trello, Jira)", "Risk Assessment Software (Lucidchart, Asana)"],
    "Software Developer": ["Programming Languages (Python, Java, C#)", "Version Control (Git, GitHub)"],
    "Business Process Manager": ["Process Mapping Tools (Bizagi, Microsoft Visio)", "ERP Systems"],
    "IT Manager": ["ITSM Tools (ServiceNow, Freshservice)", "Cloud Management (AWS, Azure)"],
    "IT Security Manager": ["SIEM Tools (Splunk, IBM QRadar)", "Endpoint Security (CrowdStrike, Symantec)"],
    "Network Administrator": ["Network Monitoring (Wireshark, Nagios)", "Firewall Configurations (Cisco, Fortinet)"],
    "Tech Support": ["Help Desk Software (Zendesk, Freshdesk)", "Remote Desktop Tools (TeamViewer, AnyDesk)"],
    "Non-Voice Tech Support": [
      "Ticketing Systems (Jira Service Desk, Zoho Desk)",
      "Knowledge Base Software (Confluence, Notion)",
    ],
  }

  // Role data for matching
  const roleData = {
    "CRM Manager": {
      industries: ["B2B Sales & Lead Generation", "Customer Success / Client Management", "Data & Analytics"],
    },
    "Quality Assurance Analyst": {
      industries: ["B2B Sales & Lead Generation", "Customer Success / Client Management"],
    },
    "Sales Performance and QA Coordinator": {
      industries: ["B2B Sales & Lead Generation", "Customer Success / Client Management"],
    },
    "HR/Finance": {
      industries: ["Customer Success / Client Management"],
    },
    "HR/Admin Specialist": {
      industries: ["Customer Success / Client Management"],
    },
    "HR/Admin Manager": {
      industries: ["Customer Success / Client Management"],
    },
    "HR/Admin and Finance Director": {
      industries: ["Customer Success / Client Management"],
    },
    "Finance Associate": {
      industries: ["Customer Success / Client Management", "Data & Analytics"],
    },
    "Finance Manager (Coordinator)": {
      industries: ["Customer Success / Client Management", "Data & Analytics"],
    },
    "Operations Manager": {
      industries: ["Customer Success / Client Management", "B2B Sales & Lead Generation"],
    },
    "Client Success Manager": {
      industries: ["Customer Success / Client Management", "B2B Sales & Lead Generation"],
    },
    "Production Manager": {
      industries: ["Customer Success / Client Management", "Digital Marketing & Content Creation"],
    },
    "Business Development Manager": {
      industries: ["B2B Sales & Lead Generation", "Customer Success / Client Management"],
    },
    "Business Development Representative": {
      industries: ["B2B Sales & Lead Generation"],
    },
    "Marketing Manager": {
      industries: ["Digital Marketing & Content Creation", "B2B Sales & Lead Generation"],
    },
    "Lead Generator": {
      industries: ["B2B Sales & Lead Generation", "Data & Analytics"],
    },
    "Social Media Specialist": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "Web Developer": {
      industries: ["Digital Marketing & Content Creation", "UI/UX & Product Design", "E-commerce"],
    },
    "SEO Program Manager": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "SEO Specialist": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "Quality Assurance Analyst (SEO)": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "Sales Development Representative": {
      industries: ["B2B Sales & Lead Generation"],
    },
    "Social Media Marketer": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "Database Coordinator": {
      industries: ["Data & Analytics", "B2B Sales & Lead Generation"],
    },
    Researcher: {
      industries: ["Data & Analytics", "B2B Sales & Lead Generation"],
    },
    "Data Analyst": {
      industries: ["Data & Analytics", "Digital Marketing & Content Creation"],
    },
    "Data Profiler": {
      industries: ["Data & Analytics", "B2B Sales & Lead Generation"],
    },
    "Digital Marketing Manager": {
      industries: ["Digital Marketing & Content Creation", "E-commerce"],
    },
    "Email Marketing Specialist/Associate": {
      industries: ["Digital Marketing & Content Creation", "B2B Sales & Lead Generation", "E-commerce"],
    },
    "Digital Designer": {
      industries: ["Digital Marketing & Content Creation", "UI/UX & Product Design", "E-commerce"],
    },
    "Content Writer": {
      industries: ["Digital Marketing & Content Creation", "B2B Sales & Lead Generation"],
    },
    "LinkedIn Champion": {
      industries: ["B2B Sales & Lead Generation", "Digital Marketing & Content Creation"],
    },
    "Recruitment Coordinator": {
      industries: ["Customer Success / Client Management", "B2B Sales & Lead Generation"],
    },
    "Recruitment Associate": {
      industries: ["Customer Success / Client Management", "B2B Sales & Lead Generation"],
    },
    "Recruitment Branding Specialist": {
      industries: ["Digital Marketing & Content Creation", "Customer Success / Client Management"],
    },
    "Recruitment Database Specialist": {
      industries: ["Data & Analytics", "Customer Success / Client Management"],
    },
    "Learning and Development Coordinator": {
      industries: ["Customer Success / Client Management", "Digital Marketing & Content Creation"],
    },
    "Production Specialist": {
      industries: ["Digital Marketing & Content Creation", "Customer Success / Client Management"],
    },
    "Project Manager": {
      industries: [
        "Customer Success / Client Management",
        "Digital Marketing & Content Creation",
        "UI/UX & Product Design",
      ],
    },
    "Software Developer": {
      industries: ["UI/UX & Product Design", "Digital Marketing & Content Creation", "E-commerce"],
    },
    "Business Process Manager": {
      industries: ["Customer Success / Client Management", "Data & Analytics"],
    },
    "IT Manager": {
      industries: ["Customer Success / Client Management", "Data & Analytics"],
    },
    "IT Security Manager": {
      industries: ["Data & Analytics", "Customer Success / Client Management"],
    },
    "Network Administrator": {
      industries: ["Data & Analytics", "Customer Success / Client Management"],
    },
    "Tech Support": {
      industries: ["Customer Success / Client Management", "UI/UX & Product Design"],
    },
    "Non-Voice Tech Support": {
      industries: ["Customer Success / Client Management", "Digital Marketing & Content Creation"],
    },
  }

  // DOM Elements
  const views = {
    home: document.getElementById("home-view"),
    assessment: document.getElementById("assessment-view"),
    loading: document.getElementById("loading-view"),
    results: document.getElementById("results-view"),
  }

  const tabs = {
    applicant: document.getElementById("applicant-tab"),
    education: document.getElementById("education-tab"),
    qualifications: document.getElementById("qualifications-tab"),
    technical: document.getElementById("technical-tab"),
    industry: document.getElementById("industry-tab"),
    experience: document.getElementById("experience-tab"),
  }

  const buttons = {
    startAssessment: document.getElementById("start-assessment-btn"),
    prev: document.getElementById("prev-btn"),
    next: document.getElementById("next-btn"),
    submit: document.getElementById("submit-btn"),
    newAssessment: document.getElementById("new-assessment-btn"),
  }

  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  // Form data
  let formData = {
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    qualifications: {},
    technical: {},
    industry: {},
  }

  // Results data
  let resultsData = []

  // Current tab index
  let currentTabIndex = 0
  const tabNames = ["applicant", "education", "qualifications", "technical", "industry", "experience"]

  // Initialize form elements
  initializeEducationOptions()
  initializeQualifications()
  initializeTechnicalSkills()
  initializeIndustryOptions()
  initializeExperienceOptions()

  // Event Listeners
  buttons.startAssessment.addEventListener("click", startAssessment)
  buttons.prev.addEventListener("click", goToPrevTab)
  buttons.next.addEventListener("click", goToNextTab)
  buttons.submit.addEventListener("click", submitAssessment)
  buttons.newAssessment.addEventListener("click", startNewAssessment)

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const tabName = trigger.getAttribute("data-tab")
      switchTab(tabName)
    })
  })

  // Functions
  function startAssessment() {
    showView("assessment")
  }

  function startNewAssessment() {
    formData = {
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      qualifications: {},
      technical: {},
      industry: {},
    }

    // Reset form fields
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""

    // Reset radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false
    })

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false
    })

    // Reset to first tab
    currentTabIndex = 0
    switchTab(tabNames[currentTabIndex])
    showView("assessment")
  }

  function showView(viewName) {
    Object.keys(views).forEach((key) => {
      views[key].classList.add("hidden")
    })
    views[viewName].classList.remove("hidden")
  }

  function switchTab(tabName) {
    // Update tab triggers
    tabTriggers.forEach((trigger) => {
      if (trigger.getAttribute("data-tab") === tabName) {
        trigger.classList.add("active")
      } else {
        trigger.classList.remove("active")
      }
    })

    // Update tab contents
    tabContents.forEach((content) => {
      if (content.id === `${tabName}-tab`) {
        content.classList.remove("hidden")
        content.classList.add("active")
      } else {
        content.classList.add("hidden")
        content.classList.remove("active")
      }
    })

    // Update current tab index
    currentTabIndex = tabNames.indexOf(tabName)

    // Update buttons
    updateNavigationButtons()
  }

  function updateNavigationButtons() {
    buttons.prev.disabled = currentTabIndex === 0

    if (currentTabIndex === tabNames.length - 1) {
      buttons.next.classList.add("hidden")
      buttons.submit.classList.remove("hidden")
    } else {
      buttons.next.classList.remove("hidden")
      buttons.submit.classList.add("hidden")
    }
  }

  function goToNextTab() {
    if (validateCurrentTab()) {
      if (currentTabIndex < tabNames.length - 1) {
        switchTab(tabNames[currentTabIndex + 1])
      }
    }
  }

  function goToPrevTab() {
    if (currentTabIndex > 0) {
      switchTab(tabNames[currentTabIndex - 1])
    }
  }

  function validateCurrentTab() {
    const tabName = tabNames[currentTabIndex]
    const errorElement = document.getElementById(`${tabName}-error`)
    let isValid = true

    switch (tabName) {
      case "applicant":
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value

        formData.name = name
        formData.email = email
        formData.phone = phone

        if (!name || !email) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "education":
        const educationRadios = document.querySelectorAll('input[name="education"]')
        let educationSelected = false

        educationRadios.forEach((radio) => {
          if (radio.checked) {
            formData.education = radio.value
            educationSelected = true
          }
        })

        if (!educationSelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "qualifications":
        const qualificationCheckboxes = document.querySelectorAll('input[name^="qualification-"]')
        let qualificationsSelected = false

        qualificationCheckboxes.forEach((checkbox) => {
          const qualification = checkbox.value
          formData.qualifications[qualification] = checkbox.checked
          if (checkbox.checked) {
            qualificationsSelected = true
          }
        })

        if (!qualificationsSelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "technical":
        const technicalCheckboxes = document.querySelectorAll('input[name^="technical-"]')
        let technicalSelected = false

        technicalCheckboxes.forEach((checkbox) => {
          const technical = checkbox.value
          formData.technical[technical] = checkbox.checked
          if (checkbox.checked) {
            technicalSelected = true
          }
        })

        if (!technicalSelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "industry":
        const industryCheckboxes = document.querySelectorAll('input[name^="industry-"]')
        let industrySelected = false

        industryCheckboxes.forEach((checkbox) => {
          const industry = checkbox.value
          formData.industry[industry] = checkbox.checked
          if (checkbox.checked) {
            industrySelected = true
          }
        })

        if (!industrySelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break

      case "experience":
        const experienceRadios = document.querySelectorAll('input[name="experience"]')
        let experienceSelected = false

        experienceRadios.forEach((radio) => {
          if (radio.checked) {
            formData.experience = radio.value
            experienceSelected = true
          }
        })

        if (!experienceSelected) {
          errorElement.classList.remove("hidden")
          isValid = false
        } else {
          errorElement.classList.add("hidden")
        }
        break
    }

    return isValid
  }

  function submitAssessment() {
    if (validateCurrentTab()) {
      showView("loading")

      // Calculate matches
      const matches = calculateRoleMatches()
      resultsData = matches

      // Submit to Google Sheets
      submitToGoogleSheet(matches)
    }
  }

  function calculateRoleMatches() {
    // Calculate score for each role
    const roleScores = Object.keys(roleData).map((role) => {
      const roleInfo = roleData[role]
      let totalPoints = 0
      let maxPoints = 0

      // Calculate qualifications score
      if (roleQualifications[role]) {
        roleQualifications[role].forEach((qualification) => {
          if (formData.qualifications[qualification]) {
            totalPoints += 3 // Points for having the qualification
          }
          maxPoints += 3 // Maximum possible points for this qualification
        })
      }

      // Calculate technical skills score
      if (roleTechnicalSkills[role]) {
        roleTechnicalSkills[role].forEach((tech) => {
          if (formData.technical[tech]) {
            totalPoints += 2 // Points for having the technical skill
          }
          maxPoints += 2 // Maximum possible points for this technical skill
        })
      }

      // Calculate industry experience score
      if (roleInfo.industries) {
        roleInfo.industries.forEach((ind) => {
          if (formData.industry[ind]) {
            totalPoints += 2
          }
          maxPoints += 2 // Maximum possible points for this industry
        })
      }

      // Calculate raw score as a percentage
      const rawScore = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0

      const result = {
        role,
        rawScore,
        description: roleDescriptions[role] || "",
        qualifications: roleQualifications[role] || [],
        technicalSkills: roleTechnicalSkills[role] || [],
        industries: roleInfo.industries || [],
      }

      // Add education points if available
      if (formData.education) {
        const educationInfo = educationData.find((edu) => edu.level === formData.education)
        if (educationInfo) {
          result.rawScore += educationInfo.points
          result.educationPoints = educationInfo.points
        }
      }

      // Add experience points if available
      if (formData.experience) {
        const experienceInfo = experienceData.find((exp) => exp.level === formData.experience)
        if (experienceInfo) {
          result.rawScore += experienceInfo.points
          result.experiencePoints = experienceInfo.points
        }
      }

      return result
    })

    // Sort roles by score (highest first)
    const sortedRoles = roleScores.sort((a, b) => b.rawScore - a.rawScore)

    // Get top 3 roles
    const top3Matches = sortedRoles.slice(0, 3)

    // Calculate the sum of the top 3 raw scores
    const totalRawScore = top3Matches.reduce((sum, match) => sum + match.rawScore, 0)

    // Normalize scores to make them add up to 100%
    if (totalRawScore > 0) {
      top3Matches.forEach((match) => {
        match.normalizedScore = Math.round((match.rawScore / totalRawScore) * 100)
      })
    } else {
      // If all scores are 0, distribute evenly
      top3Matches.forEach((match) => {
        match.normalizedScore = Math.round(100 / top3Matches.length)
      })
    }

    return top3Matches
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container")
    resultsContainer.innerHTML = ""

    results.forEach((match, index) => {
      const resultCard = document.createElement("div")
      resultCard.className = "result-card"

      let matchTitle
      if (index === 0) {
        matchTitle = "Best Match"
      } else if (index === 1) {
        matchTitle = "2nd Best Match"
      } else {
        matchTitle = "3rd Best Match"
      }

      let bonusHTML = ""
      if (match.educationPoints || match.experiencePoints) {
        bonusHTML = `
                    <div class="result-bonus">
                        ${match.educationPoints ? `<span class="bonus-badge">+${match.educationPoints} pts from education</span>` : ""}
                        ${match.educationPoints && match.experiencePoints ? " " : ""}
                        ${match.experiencePoints ? `<span class="bonus-badge">+${match.experiencePoints} pts from experience</span>` : ""}
                    </div>
                `
      }

      resultCard.innerHTML = `
                <div class="result-header">
                    <div class="result-match">${matchTitle}</div>
                    <div class="result-score">${match.normalizedScore}% Match</div>
                </div>
                ${bonusHTML}
                <h3 class="result-title">${match.role}</h3>
                <p class="result-description">${match.description}</p>
                <div class="result-details">
                    <div class="result-columns">
                        <div>
                            <h4 class="result-column-title">Required Qualifications</h4>
                            <ul class="result-list">
                                ${match.qualifications
                                  .map(
                                    (qualification) => `
                                    <li class="result-list-item">
                                        <input type="checkbox" checked disabled>
                                        <label>${qualification}</label>
                                    </li>
                                `,
                                  )
                                  .join("")}
                            </ul>
                        </div>
                        <div>
                            <h4 class="result-column-title">Technical Skills</h4>
                            <ul class="result-list">
                                ${match.technicalSkills
                                  .map(
                                    (tech) => `
                                    <li class="result-list-item">
                                        <input type="checkbox" checked disabled>
                                        <label>${tech}</label>
                                    </li>
                                `,
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    </div>
                </div>
            `

      resultsContainer.appendChild(resultCard)
    })
  }

  function submitToGoogleSheet(matches) {
    // Show loading message
    document.getElementById("submission-status").textContent = "Saving results to Google Sheets..."
    document.getElementById("submission-status").classList.remove("hidden")

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString()
    const selectedQualifications = Object.keys(formData.qualifications)
      .filter((q) => formData.qualifications[q])
      .join(", ")
    const selectedTechnical = Object.keys(formData.technical)
      .filter((t) => formData.technical[t])
      .join(", ")
    const selectedIndustries = Object.keys(formData.industry)
      .filter((i) => formData.industry[i])
      .join(", ")

    // Format results with detailed information for Google Sheets
    const role1 = matches[0]
      ? {
          role: matches[0].role,
          normalizedScore: matches[0].normalizedScore,
          rawScore: matches[0].rawScore,
          educationPoints: matches[0].educationPoints || 0,
          experiencePoints: matches[0].experiencePoints || 0,
        }
      : null

    const role2 = matches[1]
      ? {
          role: matches[1].role,
          normalizedScore: matches[1].normalizedScore,
          rawScore: matches[1].rawScore,
        }
      : null

    const role3 = matches[2]
      ? {
          role: matches[2].role,
          normalizedScore: matches[2].normalizedScore,
          rawScore: matches[2].rawScore,
        }
      : null

    // Create data object with all assessment details
    const data = {
      timestamp: timestamp,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      education: formData.education,
      experience: formData.experience,
      qualifications: selectedQualifications,
      technical: selectedTechnical,
      industries: selectedIndustries,
      role1: role1 ? role1.role : "None", // Changed to only send the role name without percentage
      role1_raw_score: role1 ? role1.rawScore : 0,
      role1_normalized_score: role1 ? role1.normalizedScore : 0,
      education_points: role1 ? role1.educationPoints : 0,
      experience_points: role1 ? role1.experiencePoints : 0,
      role2: role2 ? role2.role : "None", // Changed to only send the role name without percentage
      role2_raw_score: role2 ? role2.rawScore : 0,
      role2_normalized_score: role2 ? role2.normalizedScore : 0,
      role3: role3 ? role3.role : "None", // Changed to only send the role name without percentage
      role3_raw_score: role3 ? role3.rawScore : 0,
      role3_normalized_score: role3 ? role3.normalizedScore : 0,
    }

    console.log("Sending data to Google Sheets:", data)

    // Use fetch method only (removing the form submission to prevent duplicates)
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // This is important for CORS issues
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        console.log("Data submitted via fetch")
        document.getElementById("submission-status").textContent =
          "Results have been saved to Google Sheets successfully!"
        
        // Show results after successful submission
        setTimeout(() => {
          displayResults(matches)
          showView("results")
        }, 1500)
      })
      .catch((error) => {
        console.error("Error in submission:", error)
        document.getElementById("submission-status").textContent =
          "There was an error saving your results. Please try again."
        
        // Still show results even if submission fails
        setTimeout(() => {
          displayResults(matches)
          showView("results")
        }, 1500)
      })
  }

  // Initialization Functions
  function initializeEducationOptions() {
    const educationContainer = document.getElementById("education-options")
    educationContainer.innerHTML = ""

    educationData.forEach((education, index) => {
      const radioItem = document.createElement("div")
      radioItem.className = "radio-item"

      radioItem.innerHTML = `
                <input type="radio" id="education-${index}" name="education" value="${education.level}">
                <label for="education-${index}">${education.level}</label>
            `

      educationContainer.appendChild(radioItem)
    })
  }

  function initializeQualifications() {
    const qualificationsContainer = document.getElementById("qualifications-container")
    qualificationsContainer.innerHTML = ""

    Object.entries(qualificationCategories).forEach(([category, qualifications]) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"

      let categoryHTML = `<h3 class="category-title">${category}</h3>`
      categoryHTML += '<div class="category-items">'

      qualifications.forEach((qualification) => {
        categoryHTML += `
                    <div class="checkbox-item">
                        <input type="checkbox" id="qualification-${qualification}" name="qualification-${qualification}" value="${qualification}">
                        <label for="qualification-${qualification}">${qualification}</label>
                    </div>
                `
      })

      categoryHTML += "</div>"
      categoryDiv.innerHTML = categoryHTML
      qualificationsContainer.appendChild(categoryDiv)
    })
  }

  function initializeTechnicalSkills() {
    const technicalContainer = document.getElementById("technical-container")
    technicalContainer.innerHTML = ""

    Object.entries(technicalCategories).forEach(([category, skills]) => {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "category"

      let categoryHTML = `<h3 class="category-title">${category}</h3>`
      categoryHTML += '<div class="category-items">'

      skills.forEach((skill) => {
        categoryHTML += `
                    <div class="checkbox-item">
                        <input type="checkbox" id="technical-${skill}" name="technical-${skill}" value="${skill}">
                        <label for="technical-${skill}">${skill}</label>
                    </div>
                `
      })

      categoryHTML += "</div>"
      categoryDiv.innerHTML = categoryHTML
      technicalContainer.appendChild(categoryDiv)
    })
  }

  function initializeIndustryOptions() {
    const industryContainer = document.getElementById("industry-container")
    industryContainer.innerHTML = ""

    industryData.forEach((industry) => {
      const checkboxItem = document.createElement("div")
      checkboxItem.className = "checkbox-item"

      checkboxItem.innerHTML = `
                <input type="checkbox" id="industry-${industry}" name="industry-${industry}" value="${industry}">
                <label for="industry-${industry}">${industry}</label>
            `

      industryContainer.appendChild(checkboxItem)
    })
  }

  function initializeExperienceOptions() {
    const experienceContainer = document.getElementById("experience-options")
    experienceContainer.innerHTML = ""

    experienceData.forEach((experience, index) => {
      const radioItem = document.createElement("div")
      radioItem.className = "radio-item"

      radioItem.innerHTML = `
                <input type="radio" id="experience-${index}" name="experience" value="${experience.level}">
                <label for="experience-${index}">${experience.level}</label>
            `

      experienceContainer.appendChild(radioItem)
    })
  }
})