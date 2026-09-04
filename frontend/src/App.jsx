import { useState, useEffect, useRef } from "react";

// 
// TRANSLATIONS — English & Kinyarwanda
// 
const T = {
  en: {
    // Nav
    navHome: "Home", navPredict: "Predict",
    navLearn: "Learn", navStories: "Stories", navCalc: "Calculator", navDash: "Dashboard",
    navLogin: "Login", navSignUp: "Sign Up", navSignOut: "Sign Out",
    // Hero badge & hero
    heroBadge: "Free · Instant · Built for Rwandan Entrepreneurs",
    heroTitle1: "Find Your Perfect",
    heroTitle2: "Side Hustle",
    heroTitle3: "in Rwanda",
    heroSub: "Not sure which business to start? Tell us your skills, budget and location — we'll show you the top 3 businesses most likely to succeed for you.",
    heroCTA: "Find My Best Hustle",
    heroMember: "Already a member?",
    // Benefits strip
    b1t: "Personalised for You", b1d: "Get hustle recommendations matched to your own skills, location and budget — not generic advice.",
    b2t: "See Real Profit Estimates", b2d: "Know upfront how much monthly profit, startup cost and revenue to expect before you invest a single franc.",
    b3t: "Works Across All Rwanda", b3d: "Whether you're in Kigali, Musanze, Rubavu or a rural district — results are tailored to your area.",
    b4t: "Business Advisor", b4d: "After your prediction, chat with our Business Advisor for personalised tips on marketing, loans and growing your hustle.",
    // How it works
    howTitle: "How It Works",
    h1t: "Create Your Profile", h1d: "Tell us your name, skills, budget and free hours per day",
    h2t: "Smart Matching", h2d: "We find the businesses that best fit your unique situation",
    h3t: "See Your Top 3", h3d: "Get your 3 best business options with expected monthly income",
    h4t: "Take Action", h4d: "Follow your personalised plan and launch with confidence",
    // CTA section
    ctaTitle: "Ready to Discover Your Hustle?",
    ctaSub: "Free · Takes 2 minutes · Results tailored to you",
    ctaBtn: "Get Started Free ",
    // Auth
    authWelcome: "Welcome Back", authJoin: "Join RwandaHustle",
    authSignIn: "Sign in to your account", authCreate: "Create your free account",
    authName: "Full Name", authEmail: "Email", authPassword: "Password",
    authNamePh: "Jean de Dieu", authEmailPh: "you@example.rw", authPassPh: "••••••••",
    authBtnLogin: "Sign In ", authBtnSignup: "Create Account ",
    authProcessing: "Processing...",
    authFill: "Fill all fields.", authEnterName: "Enter your name.",
    authNoAcc: "No account? ", authHaveAcc: "Have one? ",
    authSignUpFree: "Sign Up Free", authLoginLink: "Login",
    authQuickLogin: "Login as",
    authEntrepreneur: "Entrepreneur Account",
    authAdmin: "Support Technician",
    authConfirmPass: "Confirm Password",
    authPhoneEmail: "Phone or Email",
    authRole: "Select Your Role",
    authRoleEnt: "Entrepreneur",
    authRoleTech: "Support Technician",
    authPassMatch: "Passwords do not match",
    authVerify: "Verify Your Account",
    authVerifyNote: "We've sent a code to your email/phone. Enter it below to activate your account.",
    authCode: "Verification Code",
    authDone: "Verify & Continue",
    authForgot: "Forgot Password?",
    authForgotTitle: "Reset Password",
    authForgotSub: "Enter your contact to receive a reset code.",
    authResetBtn: "Send Reset Code",
    authNewPass: "New Password",
    authResetDone: "Set New Password & Login",
    resendOtp: "Resend OTP",
    resendOtpSending: "Sending...",
    resendOtpSuccess: "OTP resent successfully! Check your email/SMS.",
    resendOtpError: "Failed to resend OTP. Please try again.",
    resendOtpWait: (sec) => `Resend available in ${sec}s`,
    // Predict page
    predictBadge: "Personalised Business Prediction",
    predictTitle: "Enter Your Details",
    predictSub: "Fill all fields — we use each input to find your best business match.",
    // Sections
    sec1: "Hustle Identity", sec2: "Personal Profile", sec3: "Your Skills", sec4: "Capital & Available Time",
    skillNote: "Select all skills you have — this is the most important factor!",
    skillMultiNote: "Select all that apply (No Ctrl key needed)",
    // Fields
    fHustleId: "Hustle ID *", fHustleIdPh: "e.g. RWH-001", fHustleIdHint: "Your unique reference number",
    fName: "Full Name *", fNamePh: "Your full name",
    fAge: "Age *", fAgePh: "e.g. 28",
    fDistrict: "Location / District *",
    fSector: "Sector / Umurenge *",
    fSelectSector: "Select your sector",
    fSkills: "Your Skills / Experience",
    otherSkill: "Other Skill (Specify)",
    otherSkillPh: "e.g. Tailoring, Carpentry, Welding...",
    fCapital: "Startup Capital (RWF) *", fCapitalPh: "e.g. 500000",
    fHours: "Hours Available per Day *", fHoursPh: "e.g. 4",
    fHoursHint: "hrs/week (7 days)",
    fDisability: "Do you have any physical disability? *",
    fDisabilityOptions: ["No disability", "Visual impairment", "Hearing impairment", "Mobility impairment", "Cognitive disability", "Other"],
    fSmartphone: "Do you have access to a smartphone? *",
    fYes: "Yes", fNo: "No",
    prefLang: "Preferred Language",
    prefLangEn: "English",
    prefLangRw: "Kinyarwanda",
    prefLangFr: "French",
    prefLangSw: "Swahili",
    prefLangCn: "Chinese",
    prefLangDe: "German",
    jobStatus: "Employment Status *",
    jobEmployed: "Employed",
    jobUnemployed: "Unemployed",
    jobSpecify: "Current Job / Specify",
    jobSpecifyPh: "e.g. Teacher, Driver, Nurse...",
    jobSelectPh: "Select employment status",
    jobLabels: { "Employed":"Employed", "Self-employed":"Self-employed", "Student":"Student", "Unemployed":"Unemployed", "Other":"Other (specify below)" },
    fEduLevel: "Education Level *",
    fEduPh: "Select education level",
    eduLabels: { "Primary":"Primary", "Secondary":"Secondary", "Vocational":"Vocational / TVET", "University":"University", "Bachelor":"Bachelor's Degree", "Master":"Master's Degree", "Degree/PHD":"Doctorate / PHD", "Other":"Other (specify)" },
    jobSpecify: "Current Job (if any)",
    // Validation errors
    errId: "Enter your Hustle ID", errName: "Enter your name",
    errAge: "Valid age 14–80", errSkills: "Select at least 1 skill",
    errCapital: "Enter startup capital (RWF)", errHours: "Hours per day 0–24",
    // Results
    resultTitle: "Your Business Recommendations",
    resultSub: "Success Likelihood",
    medal1: "Best Match", medal2: "Strong Match", medal3: "Good Match",
    statProfit: "Avg Monthly Profit", statCapital: "Startup Required",
    statRevenue: "Monthly Revenue", statHours: "Hours/Week",
    yourCapital: "Your capital:", avgNeeded: "Avg needed:",
    capFull: "Fully Funded", capNear: "Near Budget — Plan a small loan", capShort: "Consider BRD / Umurenge SACCO loan",
    actionPlan: "Action Plan for",
    lvlHighTag: "High Success Potential", lvlHighMsg: "Excellent profile! Strong indicators for side hustle success.",
    lvlMedTag: "Good Success Potential", lvlMedMsg: "Solid profile. Focus on the right hustle and you can do very well.",
    lvlGrowTag: "Growing Potential", lvlGrowMsg: "Keep building skills & capital — great opportunities are ahead.",
    top3Title: "Your Top 3 Recommended Businesses",
    btnPredict: " Predict Again", btnHome: "Home",
    matchPct: "match",
    download: "Download Report",
    getBizPlan: "Get Business Plan",
    bizPlanTitle: "Business Plan",
    bizPlanLoading: "Generating your business plan...",
    bizPlanBack: " Back to Results",
    bizPlanDownload: " Download",
    bizPlanExec: "Executive Summary",
    bizPlanDesc: "Business Description",
    bizPlanMarket: "Market Analysis",
    bizPlanMarketing: "Marketing Strategy",
    bizPlanOps: "Operations Plan",
    bizPlanFinance: "Financial Plan",
    bizPlanSwot: "SWOT Analysis",
    bizPlanRisk: "Risk Assessment",
    bizPlanStrengths: "Strengths", bizPlanWeaknesses: "Weaknesses",
    bizPlanOpps: "Opportunities", bizPlanThreats: "Threats",
    bizPlanMonthly: "Monthly Projections (Year 1)",
    bizPlanYearly: "3-Year Forecast",
    bizPlanMonth: "Month", bizPlanRevenue: "Revenue (RWF)", bizPlanExpenses: "Expenses (RWF)", bizPlanProfit: "Profit (RWF)",
    bizPlanYear: "Year",
    // Dashboard
    dashboard: "Dashboard",
    newPredict: "New Prediction",
    history: "Prediction History",
    terminal: "Technician Terminal",
    admin: "Admin Control",
    verified: "Verified",
    unverified: "Unverified",
    manageUsers: "Manage Users",
    manageStories: "Stories",
    manageAnnounce: "Announcements",
    all_users: "All Platform Users",
    no_stories: "No stories yet.",
    no_announce: "No announcements yet.",
    opps: "Opportunities",
    stories: "Success Stories",
    announce: "Announcements",
    adminAnalytics: "System Analytics",
    adminUsers: "User Management",
    adminStoriesAdd: "Add Success Story",
    adminRequests: "User Requests",
    adminSystem: "System Tools",
    adminBackup: "Database Backup",
    adminUpdate: "Update Hustle",
    adminSecurity: "Security Check",
    adminTotalUsers: "Total Users",
    adminVerified: "Verified Accounts",
    adminPredictions: "Total Predictions",
    adminInbox: "User Inbox",
    adminBackupMsg: "Creating a secure copy of the database...",
    adminUpdateMsg: "Checking for engine and data updates...",
    shareStoryTitle: "Share Your Success Story",
    shareStorySub: "Tell the community how RwandaHustle helped you grow. Your story can inspire thousands of others!",
    shareStoryPh: "Write your story here... (e.g. My business started with 50K and now I earn 200K monthly)",
    shareStoryBtn: "Submit Story for Review",
    // Chatbot
    chatTitle: "Rwanda Business Advisor",
    chatLive: "Live · Business Expert",
    chatGreet: (name) => `Muraho ${name}! I'm your Rwanda Business Advisor.\n\nI can help with:\n• Business strategy & planning\n• Marketing via WhatsApp, MoMo & Irembo\n• Loans & finance in Rwanda\n• Growing your hustle step-by-step\n\nWhat would you like to know?`,
    chatPh: "Ask about your hustle...",
    chatQ1: "How to get BRD loan?", chatQ2: "How to use MoMo?", chatQ3: "How to register on Irembo?", chatQ4: "Best marketing in Kigali",
    chatErr: "Connection error. Please try again.",
    // Skills
    skills: ["Technology / IT","Teaching / Education","Cooking / Food","Sewing / Fashion","Driving / Transport","Agriculture / Farming","Beauty / Hairdressing","Business / Finance","Photography / Media","Construction / Trades","Events / Tourism","Crafts / Art","Other","None of the above"],
    // Recommendations per category
    recs: {
      "Food & Beverage": ["Get hygiene certification from RURA to build trust with customers","Accept MoMo Pay from day one — over 80% of Rwanda transactions are mobile","Partner with offices, schools and churches for consistent bulk orders"],
      "Fashion & Tailoring": ["Register on the Rwanda Fashion Network to reach new clients","Showcase your work daily on Instagram and WhatsApp Status with good lighting","Offer Ibitenge custom designs for graduation, weddings & events — premium pricing"],
      "Agriculture & Farming": ["Apply for BRD agricultural loan (interest as low as 12% p.a.)","Join an agri-cooperative to access bulk inputs at 20-30% lower cost","Use Agri-Connect platform or contact NAEB to find direct buyers and cut out middlemen"],
      "Transport & Delivery": ["Register with Yegomoto or SafeMotos app for consistent ride income","Maintain your PSV permit and comprehensive insurance — it protects your income","Build 5–10 corporate clients who need regular delivery for predictable income"],
      "Digital & Financial Services": ["Register as Irembo agent at nearest RDB office — it only takes one day","Keep a float of 500K+ RWF in your MoMo account to handle all transactions","Bundle services (Irembo + MoMo + Passport photos) to increase revenue per visit"],
      "Creative & Digital": ["Build a strong LinkedIn + Behance portfolio with your best 5 projects","Price monthly retainer packages — e.g. 50K/month for social media management","Start with local SMEs who need digital presence — restaurants, boutiques, salons"],
      "Tourism & Events": ["Register your business with Rwanda Tourism Board","Partner with Kigali hotels — give them a referral commission for bookings","Master conversational English and French to serve international visitors"],
      "Construction & Trades": ["Get certified with IPRC Rwanda for formal qualification","Join Rwanda Contractors Association (ROCA) for networking and tenders","Always carry a portfolio of past work on your phone — photos win contracts"],
      "Beauty & Wellness": ["Obtain RURA health certificate — required for all beauty businesses","Offer home/mobile services to reach customers who can't leave the house","Stock quality African hair products — customers pay premium for good brands"],
      "Education & Training": ["Advertise at local primary schools, churches and community centers","Offer group sessions (3–5 students) — more income per hour than 1-on-1","Create printed learning materials — parents see value and are willing to pay more"],
      "Other Services": ["Formalise with RDB (costs only 10,000 RWF) for credibility","Accept mobile payments and issue receipts — builds trust with clients","Join a local business association for referrals and support"],
      "Trade": ["Research competition in your specific sector before picking a location","Maintain a clean digital or physical ledger of all sales and expenses","Build relationships with 2-3 reliable wholesalers for best pricing"],
      "Services": ["Focus on high-quality customer service to drive repeat business","Offer a 'first-time customer' discount to build your initial client base","Ask satisfied clients for WhatsApp/Facebook reviews to build credibility"],
      "Craft & Manufacturing": ["Focus on unique designs that stand out from mass-produced items","Source raw materials in bulk to maintain a healthy profit margin","Showcase the 'making-of' process on social media to justify premium pricing"],
      "Digital": ["Build a professional portfolio on LinkedIn or Behance","Offer fixed-price packages to make it easy for clients to hire you","Stay updated with the latest digital trends in the Rwandan market"],
      "Transport": ["Ensure all permits and insurance are up to date at all times","Build a network of regular clients for more predictable daily income","Maintain your equipment/vehicle weekly to avoid expensive emergency repairs"],
    },
    // System prompt for chatbot
    chatSystem: (ctx) => `You are a warm, expert Rwanda business advisor. Deep knowledge of Rwanda's startup ecosystem: MTN MoMo, Irembo, BRD loans, RDB registration, RURA permits, Kigali markets, Umurenge SACCO, WDA/TVET training.\n${ctx}\nResponses: 3-5 sentences, practical, Rwanda-specific. Max 2 emojis. Reply in Kinyarwanda if the user writes in Kinyarwanda.`,
    // New Predict Keys
    submitBtn: "Get My Prediction",
    submitLoading: "Analyzing Your Profile...",
    submitHint: "Calculated using 10,000+ Rwandan business records",
    previewLabel: "Live Preview",
    selectedSkills: "Skills Selected:",
    fDisabilityType: "Please specify your disability",
    fDisabilityTypePh: "e.g. Visual impairment, mobility",
    errDisabilityType: "Please describe your disability type",
  },

  rw: {
    // Nav
    navHome: "Ahabanza", navPredict: "Menya Ubukanishi",
    navLearn: "Kwiga", navStories: "Inkuru", navCalc: "Imibare", navDash: "Igenzura",
    navLogin: "Injira", navSignUp: "Iyandikishe", navSignOut: "Sohoka",
    // Hero
    heroBadge: "Ubuntu · Vuba · Yakozwe ku Banyarwanda",
    heroTitle1: "Shaka",
    heroTitle2: "Akazi Gacye",
    heroTitle3: "Kakugirira mu Rwanda",
    heroSub: "Ntazi uwo gutangira? Tubwire ubumenyi bwawe, ingengo y'imari n'aho utuye — tuzakwereka amakorwa 3 akubereye cyane.",
    heroCTA: "Shaka Akazi Gacye Kanje",
    heroMember: "Usanzwe ufite konti?",
    // Benefits
    b1t: "Ibigufitiye", b1d: "Mbona amakimbirane yakugenewe wowe, ikiciro cy'imari n'aho utuye — si inama rusange.",
    b2t: "Reba Inyungu Nyayo", b2d: "Menya mbere inyungu za buri kwezi, igiciro cyo gutangira n'umusaruro mbere yo gushyira amafaranga.",
    b3t: "Ikora mu Rwanda Hose", b3d: "Niba uri Kigali, Musanze, Rubavu cyangwa akarere — ibisubizo bihuye n'aho utuye.",
    b4t: "Umujyanama w'Ubucuruzi", b4d: "Nyuma yo gupima, vugana n'umujyanama w'ubucuruzi ku makuru y'ingenzi ku bucuruzi, inguzanyo no gutera imbere.",
    // How it works
    howTitle: "Uburyo Bikora",
    h1t: "Uzuza Amakuru Yawe", h1d: "Tubwire izina, ubumenyi, ingengo y'imari n'amasaha ufite ku munsi",
    h2t: "Gusesengura Neza", h2d: "Dushaka amakorwa akubereye cyane wowe",
    h3t: "Reba Inzira 3 Nziza", h3d: "Kubona amakorwa 3 akwiye n'inyungu zateganijwe buri kwezi",
    h4t: "Gukora", h4d: "Kurikira gahunda yawe maze utangire wizeye",
    // CTA
    ctaTitle: "Witeguye Kubona Akazi Gacye Kawe?",
    ctaSub: "Ubuntu · Iminota 2 · Ibisubizo Bigenewe Wowe",
    ctaBtn: "Tangira Ubuntu ",
    // Auth
    authWelcome: "Murakaza neza", authJoin: "Iyandikishe kuri RwandaHustle",
    authSignIn: "Injira muri konti yawe", authCreate: "Fungura konti yawe ubuntu",
    authName: "Amazina Yose", authEmail: "Imeyili", authPassword: "Ijambobanga",
    authNamePh: "Amazina yawe yose", authEmailPh: "imeyili@urugero.rw", authPassPh: "••••••••",
    authBtnLogin: "Injira ", authBtnSignup: "Fungura Konti ",
    authProcessing: "Birakozwe...",
    authFill: "Uzuza imirima yose.", authEnterName: "Injiza amazina yawe.",
    authNoAcc: "Nta konti ufite? ", authHaveAcc: "Usanzwe ufite konti? ",
    authSignUpFree: "Iyandikishe Ubuntu", authLoginLink: "Injira",
    authQuickLogin: "Injira nka",
    authEntrepreneur: "Konti y'Uwihangiye Umurimo",
    authAdmin: "Inkunga ya Tekiniki",
    authConfirmPass: "Emeza Ijambobanga",
    authPhoneEmail: "Terefone cyangwa Imeyili",
    authRole: "Hitamo Inshingano",
    authRoleEnt: "Uwihangiye Umurimo",
    authRoleTech: "Inkunga ya Tekiniki",
    authPassMatch: "Amagambo banga ntaguhura",
    authVerify: "Emeza Konti Yawe",
    authVerifyNote: "Tukwoherereje kode kuri imeyili/terefone yawe. Iyinjize hano kugira ngo ufungure konti.",
    authCode: "Kode yo Kwemeza",
    authDone: "Emeza & Komeza",
    authForgot: "Wibagiwe ijambo-banga?",
    authForgotTitle: "Hindura Ijambo-banga",
    authForgotSub: "Injiza imeyili/terefone tukoherereze kode.",
    authResetBtn: "Ohereza Kode",
    authNewPass: "Ijambo-banga rishya",
    authResetDone: "Emeza Ijambo-banga Rishya",
    resendOtp: "Ongera Ukohereze OTP",
    resendOtpSending: "Iroherezwa...",
    resendOtpSuccess: "OTP yongeye koherezwa neza! Reba imeyili/ubutumwa.",
    resendOtpError: "Ntibyakunze. Gerageza ukundi.",
    resendOtpWait: (sec) => `Ongera ukohereze nyuma ya ${sec}s`,
    // Predict
    predictBadge: "Gupima Ubukanishi Bwawe",
    predictTitle: "Injiza Amakuru Yawe",
    predictSub: "Uzuza imirima yose — buri makuru akoreshwa mu gushaka akazi gacye kakubereye.",
    // Sections
    sec1: "Umwirondoro w'Akazi Gacye", sec2: "Amakuru Yawe", sec3: "Ubumenyi Bwawe", sec4: "Imari n'Igihe Ufite",
    skillNote: "Hitamo ubumenyi bwose ufite — ni ingenzi cyane!",
    skillMultiNote: "Hitamo byose ufite (Nta gukanda Ctrl)",
    // Fields
    fHustleId: "Inomero y'Akazi Gacye *", fHustleIdPh: "urugero: RWH-001", fHustleIdHint: "Inomero yawe idasanzwe",
    fName: "Amazina Yose *", fNamePh: "Amazina yawe yose",
    fAge: "Imyaka *", fAgePh: "urugero: 28",
    fDistrict: "Aho Utuye / Akarere *",
    fSector: "Umurenge / Agace *",
    fSelectSector: "Hitamo umurenge wawe",
    fSkills: "Ubumenyi / Ubunararibonye",
    otherSkill: "Ubundi bumunyi (Buvuge)",
    otherSkillPh: "urug. Kudoda, Kubaza, Gusudira...",
    fCapital: "Imari yo Gutangira (RWF) *", fCapitalPh: "urugero: 500000",
    fHours: "Amasaha Ufite ku Munsi *", fHoursPh: "urugero: 4",
    fHoursHint: "amasaha mu cyumweru (iminsi 7)",
    fDisability: "Waba ufite ubumuga bw'ingingo? *",
    fDisabilityOptions: ["Nta bumuga", "Kutabona neza", "Kutumva neza", "Ubumuga bw'ingingo", "Ubumuga bwo mu mutwe", "Ibindi"],
    fSmartphone: "Waba ufite telefone ngendanwa (smartphone)? *",
    fYes: "Yego", fNo: "Oya",
    prefLang: "Ururimi Wifuza",
    prefLangEn: "Icyongereza",
    prefLangRw: "Ikinyarwanda",
    prefLangFr: "Igifaransa",
    prefLangSw: "Igiswahili",
    prefLangCn: "Igishinwa",
    prefLangDe: "Ikidage",
    jobStatus: "Imiterere y'Akazi *",
    jobEmployed: "Mfite akazi",
    jobUnemployed: "Nta kazi",
    jobSpecify: "Akazi / Sobanura",
    jobSpecifyPh: "urug. Umwarimu, Shoferi, Umuforomo...",
    jobSelectPh: "Hitamo imiterere y'akazi",
    jobLabels: { "Employed":"Mfite akazi", "Self-employed":"Nkora ubwanjye", "Student":"Umunyeshuri", "Unemployed":"Nta kazi", "Other":"Ikindi (sobanura hepfo)" },
    fEduLevel: "Amashuri Wize *",
    fEduPh: "Hitamo amashuri wize",
    eduLabels: { "Primary":"Amashuri Abanza", "Secondary":"Amashuri Yisumbuye", "Vocational":"Imyuga / TVET", "University":"Kaminuza", "Bachelor":"Impamyabumenyi ya Bachelor", "Master":"Impamyabumenyi ya Master", "Degree/PHD":"Impamyabumenyi ya Doctorate / PHD", "Other":"Izindi (Sobanura)" },
    jobSpecify: "Akazi ufite ubu (niba gahari)",
    // Errors
    errId: "Injiza inomero y'akazi gacye", errName: "Injiza amazina yawe",
    errAge: "Imyaka iri hagati ya 14–80", errSkills: "Hitamo ubumenyi bumwe nibura",
    errCapital: "Injiza imari yo gutangira (RWF)", errHours: "Amasaha 0–24 ku munsi",
    // Results
    resultTitle: "Amakorwa Yakugenewe",
    resultSub: "Ubukanishi Bwo Gutsinda",
    medal1: "Ahagaze Neza Cyane", medal2: "Ahagaze Neza", medal3: "Ahagaze Neza Bihagije",
    statProfit: "Inyungu ya Buri Kwezi", statCapital: "Imari Isabwa",
    statRevenue: "Umusaruro wa Buri Kwezi", statHours: "Amasaha/Inshuro",
    yourCapital: "Imari yawe:", avgNeeded: "Isabwa hagati:",
    capFull: "Imari Ihagije", capNear: "Hafi — Shaka inguzanyo nto", capShort: "Fata inguzanyo ya BRD / SACCO",
    actionPlan: "Gahunda y'Ibikorwa kuri",
    lvlHighTag: "Ubukanishi Burebure", lvlHighMsg: "Profili nziza cyane! Ibimenyetso byiza byo gutsinda mu kazi gacye.",
    lvlMedTag: "Ubukanishi Bwiza", lvlMedMsg: "Profili nziza. Niyo ugaragara neza, uzagenda neza cyane.",
    lvlGrowTag: "Ubukanishi Bugenda Bwiyongera", lvlGrowMsg: "Komeza kongera ubumenyi n'imari — amahirwe manini ari imbere.",
    top3Title: "Amakorwa 3 Akubereye Cyane",
    btnPredict: " Subiramo Gupima", btnHome: "Ahabanza",
    matchPct: "guhuza",
    download: "Kuramo Raporo",
    getBizPlan: "Gufata Gahunda y'Ubucuruzi",
    bizPlanTitle: "Gahunda y'Ubucuruzi",
    bizPlanLoading: "Gutegura gahunda y'ubucuruzi...",
    bizPlanBack: " Subira ku Bisubizo",
    bizPlanDownload: " Kuramo",
    bizPlanExec: "Incamake",
    bizPlanDesc: "Ibisobanuro by'Ubucuruzi",
    bizPlanMarket: "Isesengura ry'Isoko",
    bizPlanMarketing: "Ingamba zo Kwamamaza",
    bizPlanOps: "Gahunda y'Ibikorwa",
    bizPlanFinance: "Gahunda y'Imari",
    bizPlanSwot: "Isesengura rya SWOT",
    bizPlanRisk: "Isesengura ry'Ingorane",
    bizPlanStrengths: "Ingufu", bizPlanWeaknesses: "Inzitizi",
    bizPlanOpps: "Amahirwe", bizPlanThreats: "Ingorane",
    bizPlanMonthly: "Igenamigambi bya Buri Kwezi (Umwaka wa 1)",
    bizPlanYearly: "Igenamigambi ry'Imyaka 3",
    bizPlanMonth: "Ukwezi", bizPlanRevenue: "Umusaruro (RWF)", bizPlanExpenses: "Ibyasohotse (RWF)", bizPlanProfit: "Inyungu (RWF)",
    bizPlanYear: "Umwaka",
    // Dashboard
    dashboard: "Igenzura",
    newPredict: "Gupima Gushya",
    history: "Ibihe byashize",
    terminal: "Ibiro bya Tekiniki",
    admin: "Igenzura rya Admin",
    verified: "Byemejwe",
    unverified: "Ntibyeemejwe",
    manageUsers: "Gucunga Abakoresha",
    manageStories: "Inkuru",
    manageAnnounce: "Amatangazo",
    all_users: "Abakoresha Bose",
    no_stories: "Nta nkuru zirahari.",
    no_announce: "Nta matangazo arahari.",
    opps: "Amahirwe",
    stories: "Inkuru z'Inyungu",
    announce: "Amatangazo",
    adminAnalytics: "Imibare ya Sisitemu",
    adminUsers: "Gucunga Abakoresha",
    adminStoriesAdd: "Ongeraho Inkuru y'Intsinzi",
    adminRequests: "Ubusabe bw'Abakoresha",
    adminSystem: "Ibikoresho bya Sisitemu",
    adminBackup: "Backup ya Database",
    adminUpdate: "Vugurura Hustle",
    adminSecurity: "Genzura Umutekano",
    adminTotalUsers: "Abakoresha Bose",
    adminVerified: "Konti Zemejwe",
    adminPredictions: "Predictions Zose",
    adminInbox: "Ubutumwa bwinjiye",
    adminBackupMsg: "Gukora kopi y'umutekano ya database...",
    adminUpdateMsg: "Gushaka amavugurura ya sisitemu...",
    shareStoryTitle: "Sangiza Abandi Inkuru yawe y'Intsinzi",
    shareStorySub: "Bwira abandi buryo RwandaHustle yagufashije gutera imbere. Inkuru yawe ishobora gutinyura abandi bacye!",
    shareStoryPh: "Andika inkuru yawe hano... (urug. Natangiye mfite 50K none ubu nunguka 200K buri kwezi)",
    shareStoryBtn: "Ohereza Inkuru Gusuzumwa",
    chatGreet: (name) => `Muraho ${name}! Ndi umujyanama wawe mu by'ubucuruzi mu Rwanda.\n\nNshobora kugufasha mu:\n• Gahunda n'ingamba z'ubucuruzi\n• Kwamamaza binyuze kuri WhatsApp, MoMo & Irembo\n• Inguzanyo n'imari mu Rwanda\n• Gukura kwa hustle yawe intambwe ku yindi\n\nNi iki nshobora kugufasha?`,
    recs: {
      "Food & Beverage": ["Bona icyemezo cy'isuku kuva RURA kugira ngo abaguzi bakuzerere","Emera MoMo Pay kuva umunsi wa mbere — kariya 80% by'ibikorwa mu Rwanda bikozwe kwa telefone","Fatanya n'ibiro, amashuri n'amatorero kugira ngo ubone abakiriya bamwe na bamwe"],
      "Fashion & Tailoring": ["Iyandikishe kuri Rwanda Fashion Network kugira ngo ugere ku bakiriya bashya","Erekana akazi kawe buri munsi kuri Instagram na WhatsApp Status","Tanga imyenda y'Ibitenge yakozwe ku itegeko kuri impamyabukwe, ibibukiro n'ibikorwa by'ingirakamaro"],
      "Agriculture & Farming": ["Saba inguzanyo y'ubuhinzi ya BRD (inyungu nto nka 12% ku mwaka)","Injira mu muryango w'abahinzi kugira ngo ubone ibikoresho ku giciro gito (20-30% cyarushije)","Koresha urubuga rwa Agri-Connect cyangwa wahamagara NAEB kugira ngo ubone abaguzi bonyine"],
      "Transport & Delivery": ["Iyandikishe kuri Yegomoto cyangwa SafeMotos kugira ngo ubone akazi kamwe na kamwe","Bika impushya za PSV n'ubwishingizi bwuzuye — birinda inyungu zawe","Kubaka abakiriya 5-10 b'amasosiyete bakeneye gushyira ahantu buri ge"],
      "Digital & Financial Services": ["Iyandikishe nk'umukozi wa Irembo ku biro bya RDB biri hafi — bitwara umunsi umwe","Bika amafaranga 500K+ mu konti ya MoMo kugira ngo gukurikirana ibikorwa byose","Huza serivisi (Irembo + MoMo + Amafoto ya Pasiporo) kugira ngo wongereze umusaruro buri mukiriya"],
      "Creative & Digital": ["Kubaka portfolio ikomeye kuri LinkedIn + Behance ifite ibikorwa byawe 5 byiza","Ishyura paketi za buri kwezi — urugero: 50K/kwezi kugira ngo ugenzure ituze ry'imibereho","Tangira n'amasosiyete mato akeneye kuba kuri interineti — inzu z'indyo, amatsinda, salons"],
      "Tourism & Events": ["Iyandikishe ubucuruzi bwawe kuri Rwanda Tourism Board","Fatanya n'amahoteli yo i Kigali — baha komisiyoni y'imperuka","Menya Icyongereza n'Igifaransa kugira ngo usezereze inkeragutabara"],
      "Construction & Trades": ["Bona impamyabumenyi ya IPRC Rwanda","Injira mu muryango wa Rwanda Contractors Association (ROCA)","Bika portfolio y'akazi wabanje gukorera kuri telefone yawe — amafoto azakwinjirisha amasezerano"],
      "Beauty & Wellness": ["Bona icyemezo cy'ubuzima cya RURA — gisabwa kuri salon yose","Tanga serivisi zo mu rugo/zinjira abantu bakeneye","Bika ibikoresho by'imisatsi y'Afurika — abaguzi bashyura bike bishyuye cyane"],
      "Education & Training": ["Kwamamaza mu mashuri abanza, amatorero n'imiturirwa","Tanga amasomo y'itsinda (3–5 abanyeshuri) — inyungu nyinshi ku isaha kuruta 1-ku-1","Kora ibikoresho by'inyigisho byanditswe — ababyeyi babona agaciro kandi bifuza kwishyura"],
      "Other Services": ["Iyemeze na RDB (giciro ni 10,000 RWF gusa) kugira ngo ube nyawo","Emera kwishyura kwa telefone kandi utange inyemeza — byubaka icyizere","Injira mu muryango w'ubucuruzi bw'akarere kugira imperuka no gutukirana"],
    },
    chatSystem: (ctx) => `Uri umujyanama w'ubucuruzi mu Rwanda, ufite ubunararibonye bwimbitse mu buryo bw'imari n'amakorwa: MTN MoMo, Irembo, inguzanyo za BRD, kwiyandikisha kuri RDB, impushya za RURA, isoko i Kigali, Umurenge SACCO, amahugurwa ya WDA/TVET.\n${ctx}\nSubiza: interuro 3-5, ibikorwa by'ingenzi, bigenewe u Rwanda. Emoji 2 cyane. Subiza mu Kinyarwanda igihe umuturage yandika mu Kinyarwanda.`,
    // New Predict Keys
    submitBtn: "Reba Ibipimo Byanje",
    submitLoading: "Gusesengura Umwirondoro...",
    submitHint: "Bibazwe hifashishijwe amakuru 10,000+ y'ubucuruzi mu Rwanda",
    previewLabel: "Ibyo Wujuje",
    selectedSkills: "Ubumenyi Wahisemo:",
    fDisabilityType: "Vuga ubumuga ufite",
    fDisabilityTypePh: "urugero: kutabona neza, ubumuga bw'ingingo",
    errDisabilityType: "Nyamuneka vuga ubwoko bw'ubumuga ufite",
  },
  fr: {
    navHome: "Accueil", navPredict: "Prédire", navLearn: "Apprendre", navStories: "Histoires", navCalc: "Calculateur", navDash: "Tableau de bord",
    navLogin: "Connexion", navSignUp: "S'inscrire", navSignOut: "Déconnexion",
    heroBadge: "Gratuit · Instantané · Pour le Rwanda",
    heroTitle1: "Trouvez Votre", heroTitle2: "Activité Idéale", heroTitle3: "au Rwanda",
    heroSub: "Vous ne savez pas quelle entreprise lancer ? Dites-nous vos compétences, votre budget et votre emplacement.",
    heroCTA: "Trouver Mon Activité", heroMember: "Déjà membre ?",
    authWelcome: "Bon retour", authJoin: "Rejoindre RwandaHustle", authSignIn: "Connectez-vous", authCreate: "Créer un compte",
    authRole: "Sélectionnez votre rôle", authRoleEnt: "Entrepreneur", authRoleTech: "Support Technique",
    authVerify: "Vérifiez votre compte", authCode: "Code de vérification", authDone: "Vérifier & Continuer",
    dashboard: "Tableau de bord", newPredict: "Nouvelle prédiction", history: "Historique", terminal: "Terminal Technique",
    prefLang: "Langue préférée", prefLangEn: "Anglais", prefLangRw: "Kinyarwanda", prefLangFr: "Français", prefLangSw: "Swahili", prefLangCn: "Chinois", prefLangDe: "Allemand",
    skills: ["Technologie / IT","Enseignement / Éducation","Cuisine / Alimentation","Couture / Mode","Conduite / Transport","Agriculture / Élevage","Beauté / Coiffure","Affaires / Finance","Photographie / Médias","Construction / Métiers","Événements / Tourisme","Artisanat / Art","Autre","Aucun"],
    chatGreet: (name) => `Bonjour ${name}! Je suis votre conseiller en affaires au Rwanda.`,
    chatPh: "Posez votre question...",
    recs: {}, chatSystem: (ctx) => `Expert business advisor Rwanda... ${ctx}`
  },
  sw: {
    navHome: "Nyumbani", navPredict: "Bashiri", navLearn: "Jifunze", navStories: "Hadithi", navCalc: "Kikokotoo", navDash: "Dashibodi",
    navLogin: "Ingia", navSignUp: "Jisajili", navSignOut: "Ondoka",
    heroBadge: "Bure · Papo hapo · Kwa ajili ya Rwanda",
    heroTitle1: "Pata Biashara", heroTitle2: "Yako Bora", heroTitle3: "nchini Rwanda",
    heroSub: "Hujui biashara gani ya kuanza? Tuambie ujuzi wako, bajeti na eneo lako.",
    heroCTA: "Pata Biashara Yangu", heroMember: "Tayari ni mwanachama?",
    authWelcome: "Karibu tena", authJoin: "Jiunge na RwandaHustle", authSignIn: "Ingia kwenye akaunti yako", authCreate: "Fungua akaunti ya bure",
    authRole: "Chagua Jukumu Lako", authRoleEnt: "Mjasiriamali", authRoleTech: "Msaidizi wa Kiufundi",
    authVerify: "Thibitisha Akaunti Yako", authCode: "Nambari ya Uhakiki", authDone: "Thibitisha & Endelea",
    dashboard: "Dashibodi", newPredict: "Utabiri Mpya", history: "Historia", terminal: "Kituo cha Ufundi",
    prefLang: "Lugha unayopendelea", prefLangEn: "Kiingereza", prefLangRw: "Kinyarwanda", prefLangFr: "Kifaransa", prefLangSw: "Kiswahili", prefLangCn: "Kichina", prefLangDe: "Kijerumani",
    skills: ["Teknolojia / IT","Ufundishaji / Elimu","Mapishi / Chakula","Ushonaji / Mitindo","Uendeshaji / Usafiri","Kilimo / Ufugaji","Urembo / Ususi","Biashara / Fedha","Upigaji picha / Vyombo vya habari","Ujenzi / Amali","Hafla / Utalii","Ufundi / Sanaa","Nyingine","Hakuna"],
    chatGreet: (name) => `Jambo ${name}! Mimi ni mshauri wako wa biashara nchini Rwanda.`,
    chatPh: "Uliza kuhusu biashara yako...",
    recs: {}, chatSystem: (ctx) => `Expert business advisor Rwanda... ${ctx}`
  },
  cn: {
    navHome: "", navPredict: "", navLearn: "", navStories: "", navCalc: "", navDash: "",
    navLogin: "", navSignUp: "", navSignOut: "",
    heroBadge: " ·  · ",
    heroTitle1: "", heroTitle2: "", heroTitle3: "",
    heroSub: "",
    heroCTA: "", heroMember: "",
    authWelcome: "", authJoin: " RwandaHustle", authSignIn: "", authCreate: "",
    authRole: "", authRoleEnt: "", authRoleTech: "",
    authVerify: "", authCode: "", authDone: "",
    dashboard: "", newPredict: "", history: "", terminal: "",
    prefLang: "", prefLangEn: "", prefLangRw: "", prefLangFr: "", prefLangSw: "", prefLangCn: "", prefLangDe: "",
    skills: [" / IT"," / "," / "," / "," / "," / "," / "," / "," / "," / "," / "," / ","",""],
    chatGreet: (name) => ` ${name}! `,
    chatPh: "...",
    recs: {}, chatSystem: (ctx) => `Expert business advisor Rwanda... ${ctx}`
  },
  de: {
    navHome: "Startseite", navPredict: "Vorhersage", navLearn: "Lernen", navStories: "Geschichten", navCalc: "Rechner", navDash: "Dashboard",
    navLogin: "Anmelden", navSignUp: "Registrieren", navSignOut: "Abmelden",
    heroBadge: "Kostenlos · Sofort · Für Ruanda entwickelt",
    heroTitle1: "Finden Sie Ihren", heroTitle2: "Perfekten Hustle", heroTitle3: "in Ruanda",
    heroSub: "Sie wissen nicht, welches Unternehmen Sie gründen sollen? Nennen Sie uns Ihre Fähigkeiten, Ihr Budget und Ihren Standort.",
    heroCTA: "Meinen Hustle finden", heroMember: "Bereits Mitglied?",
    authWelcome: "Willkommen zurück", authJoin: "RwandaHustle beitreten", authSignIn: "In Ihr Konto einloggen", authCreate: "Kostenloses Konto erstellen",
    authRole: "Wählen Sie Ihre Rolle", authRoleEnt: "Unternehmer", authRoleTech: "Technischer Support",
    authVerify: "Konto verifizieren", authCode: "Bestätigungscode", authDone: "Verifizieren & Weiter",
    dashboard: "Dashboard", newPredict: "Neue Vorhersage", history: "Verlauf", terminal: "Technisches Terminal",
    prefLang: "Bevorzugte Sprache", prefLangEn: "Englisch", prefLangRw: "Kinyarwanda", prefLangFr: "Französisch", prefLangSw: "Suaheli", prefLangCn: "Chinesisch", prefLangDe: "Deutsch",
    skills: ["Technologie / IT","Lehre / Bildung","Kochen / Essen","Nähen / Mode","Fahren / Transport","Landwirtschaft","Schönheit / Friseur","Business / Finanzen","Fotografie / Medien","Bauwesen / Handwerk","Events / Tourismus","Handwerk / Kunst","Andere","Keine"],
    chatGreet: (name) => `Hallo ${name}! Ich bin Ihr Business-Berater in Ruanda.`,
    chatPh: "Fragen Sie nach Ihrem Hustle...",
    recs: {}, chatSystem: (ctx) => `Expert business advisor Rwanda... ${ctx}`
  }
};

// 
// DATASET — 310 hustles from 29,000 Rwanda records
// 
// DATASET — Synchronized with backend stats
let HD = {};

// Skill  hustle affinity (uses English skill keys internally)
const SKILL_MAP_EN = {
  "Technology / IT":["E-commerce Store Management","Freelance Web Design","Social Media Management","Digital Marketing Services","IT Support & Troubleshooting","Computer & Laptop Repair","Network Cable Installation","CCTV Installation & Monitoring","Irembo Multi-Service Cyber Café","YouTube Content Creation","Data Entry & Virtual Assistant","Podcast Recording Services"],
  "Teaching / Education":["Tutoring / Private Lessons","Language School (Home-based)","Computer Training (Basic Skills)","Music Lessons (Guitar/Drums)","Yoga / Aerobics Classes","English/French Tutoring Online"],
  "Cooking / Food":["Catering Services","Street Food Vendor","Chapati Making","Bread Baking (Home-based)","Mandazi / Doughnut Making","Grilled Chicken (Poulet Grille)","Yogurt / Fermented Milk Making","Sausage Making & Selling","Canteen / Food Delivery","Samosa Making & Selling"],
  "Sewing / Fashion":["Tailoring","Tailoring (Men's Suits)","Wedding & Event Attire Tailoring","Uniform & School Bag Sewing","Ibitenge Tailored Outfits (Custom)","Embroidery & Custom Design","Kigali Fashion Rental (Outfits for Events)","Dress Hire (Formal/Wedding)","Female Fashion Boutique","School Uniform Supply"],
  "Driving / Transport":["Motorcycle Taxi","Moto Taxi (Gig - Own Bike)","Bodaboda App Driver (Yegomoto)","Cargo Moto (Heavy Goods)","Cold Chain Delivery (Perishables)","E-commerce Last-Mile Delivery Agent","Inter-District Parcel Network"],
  "Agriculture / Farming":["Mushroom Farming","Strawberry Farming","Greenhouse Vegetable Growing","Flower Farming (Roses)","Tilapia Farming","Catfish Farming","Aquaponics (Fish + Vegetables)","Honey Production & Selling","Garlic Farming & Selling","Sunflower Oil Pressing","Aloe Vera Farming & Gel Production","Black Soldier Fly Larvae Farming"],
  "Beauty / Hairdressing":["Beauty Salon (Basic)","Hair Braiding (Home-based)","Barber Shop","Nail Art & Manicure","Makeup Artist (Events)","Lash & Eyebrow Technician","Spa & Relaxation Services (Mobile)","Traditional Massage Therapy","Men's Grooming & Beard Care","Wig Making & Selling"],
  "Business / Finance":["Mobile Money Agent","Irembo Agent (General Services)","Insurance Agent (Part-time)","Forex Exchange (Small Bureau)","Irembo Agent - Business Registration (RDB)","Irembo Agent - Tax Declaration (RRA)","Property Management (Rentals)","Bill Payment Agent (RSSB WASAC)","Irembo Agent + Passport Photo Studio","Real Estate Agent (Part-time)"],
  "Photography / Media":["Event Photography & Videography","Freelance Photography","Drone Photography Services","Podcast Recording Services","Invitation Card Design & Printing","Banner & Flex Printing","YouTube Content Creation"],
  "Construction / Trades":["Electrical Wiring Services","Plumbing Services","Welding & Metal Fabrication","Carpentry & Furniture Making","Tiling & Floor Laying","Roofing Services (Iron Sheets)","CCTV Installation & Monitoring","Solar Panel Installation (Assistant)","Fumigation & Pest Control","Home Security System Installation","Network Cable Installation"],
  "Events / Tourism":["Wedding Planning Services","Wedding Decoration Services","Event Photography & Videography","Gorilla Trekking Tour Operator","Akagera Safari Day Tours","Tour Guide (Kigali/Akagera)","Lake Kivu Boat Tours","Cultural Dance Performance Group","Event MC (Master of Ceremonies)","Coffee Tour Experience"],
  "Crafts / Art":["Craft & Basket Weaving","Painting & Wall Art (Murals)","Souvenir Shop (Imigongo/Crafts)","Invitation Card Design & Printing","Graphic Design (Freelance)","Embroidery & Custom Design"],
  "Other":[],
  "None of the above":[],
};
// Map Kinyarwanda skill labels  English keys (same index order)
const EN_SKILLS = Object.keys(SKILL_MAP_EN);

const ICONS = {
  "Food & Beverage":"","Fashion & Tailoring":"","Agriculture & Farming":"","Transport & Delivery":"",
  "Digital & Financial Services":"","Creative & Digital":"","Tourism & Events":"","Construction & Trades":"",
  "Beauty & Wellness":"","Education & Training":"","Other Services":"",
  "Agriculture":"","Trade":"","Services":"","Digital":"","Transport":"","Food & Beverage":"","Craft & Manufacturing":""
};
const COLORS = {
  "Food & Beverage":"#334155","Fashion & Tailoring":"#2563EB","Agriculture & Farming":"#0F766E","Transport & Delivery":"#1D4ED8",
  "Digital & Financial Services":"#4338CA","Creative & Digital":"#6D28D9","Tourism & Events":"#0369A1","Construction & Trades":"#475569",
  "Beauty & Wellness":"#BE185D","Education & Training":"#1E3A8A","Other Services":"#374151",
  "Agriculture":"#0F766E","Trade":"#0369A1","Services":"#475569","Digital":"#2563EB","Transport":"#1D4ED8","Craft & Manufacturing":"#6D28D9"
};
const LOCS = [
  "Bugesera","Burera","Gakenke","Gasabo","Gatsibo","Gicumbi","Gisagara","Huye","Kamonyi","Karongi",
  "Kayonza","Kicukiro","Kirehe","Muhanga","Musanze","Ngoma","Ngororero",
  "Nyabihu","Nyagatare","Nyamagabe","Nyamasheke","Nyanza","Nyarugenge","Nyaruguru","Rubavu","Ruhango","Rulindo",
  "Rusizi","Rutsiro","Rwamagana"
];

// 
// RWANDA DISTRICTS & SECTORS (IMIRENGE) — Complete Administrative Data
// 
const RWANDA_SECTORS = {
  "Bugesera": ["Gashora", "Juru", "Kamabuye", "Ntarama", "Mareba", "Mayange", "Musenyi", "Mwogo", "Ngeruka", "Nyamata", "Nyarugenge", "Rilima", "Ruhuha", "Rweru", "Shyara"],
  
  "Burera": ["Bungwe", "Butaro", "Cyanika", "Cyeru", "Gahunga", "Gatebe", "Gitovu", "Kagogo", "Kinoni", "Kinyababa", "Kivuye", "Nemba", "Rugatwa", "Rugendabari", "Ruhunde", "Rusarabuye", "Rwerere"],
  
  "Gakenke": ["Busengo", "Coko", "Cyabingo", "Gakenke", "Gashenyi", "Janja", "Kamubuga", "Karambo", "Kivuruga", "Mataba", "Minazi", "Mugunga", "Muhondo", "Muyongwe", "Muzo", "Nemba", "Ruli", "Rusasa", "Rushashi"],
  
  "Gasabo": ["Bumbogo", "Gatsata", "Gikomero", "Gisozi", "Jabana", "Jali", "Kacyiru", "Karuruma", "Kinyinya", "Ndera", "Nduba", "Remera", "Rusororo", "Rutunga"],
  
  "Gatsibo": ["Gasange", "Gatsibo", "Gitoki", "Kabarore", "Kageyo", "Kiramuruzi", "Kiziguro", "Muhura", "Murambi", "Ngarama", "Nyagihanga", "Remera", "Rugarama", "Rwimbogo"],
  
  "Gicumbi": ["Bukure", "Bwisige", "Byumba", "Cyumba", "Giti", "Kaniga", "Manyagiro", "Miyove", "Kageyo", "Mukarange", "Muko", "Mutete", "Nyamiyaga", "Nyankenke", "Rubaya", "Rukomo", "Rushaki", "Rutare", "Ruvune", "Rwamiko", "Shangasha"],
  
  "Gisagara": ["Gikonko", "Gishubi", "Kansi", "Kibilizi", "Kigembe", "Mamba", "Muganza", "Mugombwa", "Mukingo", "Musha", "Ndora", "Nyanza", "Save"],
  
  "Huye": ["Gishamvu", "Huye", "Karama", "Kigoma", "Kinazi", "Maraba", "Mbazi", "Mukura", "Ngoma", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba"],
  
  "Kamonyi": ["Gacurabwenge", "Karama", "Kayenzi", "Kayumbu", "Mugina", "Musambira", "Ngamba", "Nyamiyaga", "Nyarubaka", "Rukoma", "Rugarika", "Runda"],
  
  "Karongi": ["Bwishyura", "Gishyita", "Gitesi", "Mubuga", "Murambi", "Murundi", "Mutuntu", "Rubengera", "Rugabano", "Ruganda", "Rwankuba", "Twumba"],
  
  "Kayonza": ["Gahini", "Kabare", "Kabarondo", "Mukarange", "Murama", "Murundi", "Mwiri", "Ndego", "Nyamirama", "Rukara", "Ruramira", "Rwinkwavu"],
  
  "Kicukiro": ["Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Kigarama", "Masaka", "Niboye", "Nyarugunga"],
  
  "Kirehe": ["Gahara", "Gatore", "Kigarama", "Kigina", "Kirehe", "Mahama", "Mpanga", "Musaza", "Mushikiri", "Nasho", "Nyamugari", "Nyarubuye"],
  
  "Muhanga": ["Cyeza", "Kabacuzi", "Kibangu", "Kiyumba", "Muhanga", "Mushishiro", "Nyabinoni", "Nyamabuye", "Nyarusange", "Rongi", "Rugendabari", "Shyogwe"],
  
  "Musanze": ["Busogo", "Cyuve", "Gacaca", "Gashaki", "Gataraga", "Kimonyi", "Kinigi", "Muhoza", "Muko", "Musanze", "Nkotsi", "Nyange", "Remera", "Rwaza", "Shingiro"],
  
  "Ngoma": ["Gashanda", "Jarama", "Kibungo", "Mugesera", "Murama", "Mutenderi", "Remera", "Rukira", "Rukumberi", "Rurenge", "Sake", "Zaza"],
  
  "Ngororero": ["Bwira", "Gatumba", "Hindiro", "Kabaya", "Kageyo", "Kavumu", "Matembe", "Muhanda", "Muhororo", "Ndaro", "Ngororero", "Nyange", "Sovu"],
  
  "Nyabihu": ["Bigogwe", "Jenda", "Jomba", "Kabatwa", "Karago", "Kintobo", "Mukamira", "Muringa", "Rambura", "Rugera", "Rurembo", "Shyira"],
  
  "Nyagatare": ["Gatunda", "Karama", "Karangazi", "Katabagemu", "Kiyombe", "Matimba", "Mimuli", "Mukama", "Musheli", "Nyagatare", "Rukomo", "Rwempasha", "Rwimiyaga", "Tabagwe"],
  
  "Nyamagabe": ["Buruhukiro", "Cyanika", "Gasaka", "Gatare", "Kaduha", "Kamegeri", "Kibirizi", "Kibumbwe", "Kitabi", "Mbazi", "Mugano", "Musange", "Musebeya", "Mushubi", "Nkomane", "Tare", "Uwinkingi"],
  
  "Nyamasheke": ["Bushekeri", "Bushenge", "Cyato", "Gihombo", "Kagano", "Kanjongo", "Karambi", "Karengera", "Kirimbi", "Macuba", "Mahembe", "Nyabitekeri", "Rangiro", "Ruharambuga", "Shangi", "Tuzamurana"],
  
  "Nyanza": ["Busasamana", "Busoro", "Cyabakamyi", "Kibirizi", "Kibilizi", "Mukingo", "Muyira", "Ntyazo", "Nyagisozi", "Rwabicuma"],
  
  "Nyarugenge": ["Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageragere", "Muhima", "Nyakabanda", "Nyamirambo", "Nyarugenge", "Rwezamenyo"],
  
  "Nyaruguru": ["Busanze", "Cyahinda", "Kibeho", "Kibumbwe", "Kinazi", "Kivu", "Mata", "Muganza", "Munini", "Ngera", "Ngoma", "Nyabimata", "Nyagisozi", "Ruheru", "Ruramba", "Rusenge"],
  
  "Rubavu": ["Bugeshi", "Busasamana", "Cyanzarwe", "Gisenyi", "Kanama", "Kanzenze", "Mudende", "Nyakiriba", "Nyamyumba", "Nyundo", "Rubavu", "Rugerero"],
  
  "Ruhango": ["Bweramana", "Byimana", "Kabagari", "Kinazi", "Kinihira", "Mbuye", "Mwendo", "Ntongwe", "Ruhango"],
  
  "Rulindo": ["Base", "Burega", "Bushoki", "Buyoga", "Cyinzuzi", "Cyungo", "Kinihira", "Kisaro", "Masoro", "Mbogo", "Murambi", "Ngoma", "Ntarabana", "Rukozo", "Rusiga", "Shyorongi", "Tumba"],
  
  "Rusizi": ["Bugarama", "Butare", "Bweyeye", "Gashonga", "Giheke", "Gihundwe", "Gitambi", "Impala", "Kamembe", "Muganza", "Mururu", "Nkanka", "Nkombo", "Nkungu", "Nyakabuye", "Nyakarenzo", "Nzahaha", "Rwimbogo"],
  
  "Rutsiro": ["Boneza", "Gihango", "Kivumu", "Kigeyo", "Manihira", "Mukura", "Murunda", "Musasa", "Mushonyi", "Mushubati", "Nyabirasi", "Ruhango", "Rusebeya"],
  
  "Rwamagana": ["Fumbwe", "Gahengeri", "Gishari", "Karenge", "Kigabiro", "Muhazi", "Munyaga", "Munyiginya", "Musha", "Muyumbu", "Mwulire", "Nzige", "Rubona", "Rurenge"]
};

// 
// SIDE HUSTLES BY SECTOR (Akazi Gacye ku Murenge)
// Popular business opportunities per sector across Rwanda
// 

// Cache for sector hustles to avoid repeated lookups
const SECTOR_HUSTLES_CACHE = {};

const SECTOR_HUSTLES = {
  //  KIGALI URBAN SECTORS (City Center & Business Districts) 
  "Kacyiru": ["Mobile Money Agent", "Web Development", "Graphic Design", "English Tutoring", "Event Photography", "Food Delivery", "Coffee Shop", "Boutique"],
  "Remera": ["App Development", "Digital Marketing", "Co-working Space", "Gym & Fitness", "Restaurant", "Electronics Repair", "Salon & Spa", "Car Wash"],
  "Kimisagara": ["Retail Shop", "Tailoring", "Phone Accessories", "Street Food", "Barbershop", "Laundry Service", "Wholesale Trade", "Construction Materials"],
  "Nyamirambo": ["Wholesale Market", "Carpentry", "Metalwork", "Auto Repair", "Ibitenge Sales", "Charcoal Sales", "Moto Transport", "Hardware"],
  "Muhima": ["Textile Trade", "Second-hand Clothes", "Tailoring", "Shoe Repair", "Phone Repair", "Retail", "Food Kiosk", "Hairdressing"],
  "Kigali": ["Import/Export", "Construction", "Real Estate", "IT Consulting", "Legal Services", "Accounting", "Hotel & Tourism", "Manufacturing"],
  "Kanyinya": ["Grocery Store", "Poultry Farming", "Catering", "Bakery", "Moto Taxi", "Phone Charging", "Vegetable Sales", "Beauty Salon"],
  "Nyakabanda": ["Market Vending", "Food Processing", "Butchery", "Dairy Products", "Animal Feed", "Carpentry", "Tailoring", "Barbershop"],
  "Nyarugenge": ["Professional Services", "Banking", "Insurance", "Travel Agency", "Hotel", "Restaurant", "Pharmacy", "Supermarket"],
  "Gitega": ["Construction", "Plumbing", "Electrical Work", "Painting", "Tile Installation", "Hardware Store", "Tool Rental", "Building Materials"],
  "Rwezamenyo": ["Grocery", "Bakery", "Butchery", "Poultry Sales", "Vegetable Market", "Transport", "Salon", "Phone Accessories"],
  "Mageragere": ["Carpentry", "Welding", "Metal Fabrication", "Furniture Making", "Wood Sales", "Hardware", "Moto Transport", "Food Kiosk"],
  "Gisozi": ["IT Services", "Graphic Design", "Tutoring", "Language School", "Event Planning", "Catering", "Photography", "Printing"],
  "Kinyinya": ["Real Estate", "Home Renovation", "Interior Design", "Garden Services", "Security", "Cleaning", "Laundry", "Catering"],
  "Gatsata": ["Agri Supplies", "Veterinary Drugs", "Animal Feed", "Seeds & Fertilizer", "Farm Tools", "Poultry", "Pig Farming", "Dairy"],
  "Jabana": ["Stone Quarry", "Sand & Gravel", "Construction Materials", "Truck Transport", "Machinery Rental", "Masonry", "Concrete Blocks"],
  "Bumbogo": ["Commercial Farming", "Greenhouse Vegetables", "Flower Farming", "Fruit Orchard", "Fish Farming", "Beekeeping", "Dairy", "Agro-processing"],
  "Gikomero": ["Maize Milling", "Sorghum Processing", "Cassava Processing", "Bean Trading", "Rice Sales", "Farm Inputs", "Livestock Trade", "Vet Services"],
  "Jali": ["Vegetable Farming", "Mushroom Growing", "Hydroponics", "Organic Farming", "Farm-to-Market", "Agri-Extension", "Tractor Rental", "Irrigation"],
  "Ndera": ["Health Services", "Pharmacy", "Laboratory", "Physiotherapy", "Mental Health", "Medical Supplies", "Ambulance", "Home Care"],
  "Nduba": ["Warehouse", "Logistics", "Cargo Handling", "Cold Storage", "Packaging", "Distribution", "Truck Rental", "Freight Forwarding"],
  "Rusororo": ["Dairy Farming", "Milk Collection", "Yogurt Production", "Cheese Making", "Animal Feed", "Veterinary", "Livestock Trade", "Butchery"],
  "Rutunga": ["Poultry Farming", "Egg Production", "Broiler Chicken", "Hatchery", "Feed Mill", "Vet Supplies", "Meat Processing", "Cold Storage"],
  "Karuruma": ["Brick Making", "Sand Extraction", "Stone Quarry", "Gravel Sales", "Construction Materials", "Cement Retail", "Hardware", "Masonry"],
  "Gahanga": ["Tech Hub", "Software Development", "Data Analysis", "Digital Marketing", "E-commerce", "Online Tutoring", "Content Creation", "Social Media"],
  "Kagarama": ["Retail Shop", "Boutique", "Supermarket", "Pharmacy", "Restaurant", "Café", "Bakery", "Electronics"],
  "Gikondo": ["Manufacturing", "Metal Fabrication", "Woodworking", "Plastics", "Textile Factory", "Printing", "Packaging", "Assembly"],
  "Kicukiro": ["Professional Services", "Consulting", "Training Center", "Conference", "Hotel", "Restaurant", "Car Rental", "Real Estate"],
  "Kanombe": ["Airport Services", "Cargo Handling", "Freight", "Customs", "Warehousing", "Logistics", "Car Rental", "Hotel"],
  "Gatenga": ["School Supplies", "Bookstore", "Stationery", "Printing", "Tutoring", "Daycare", "After-school Programs", "Educational Toys"],
  "Kigarama": ["Grocery", "Market Vending", "Food Processing", "Bakery", "Butchery", "Fish Sales", "Vegetable Market", "Fruit Stall"],
  "Masaka": ["Transport Hub", "Bus Terminal", "Food Kiosks", "Phone Accessories", "Luggage Storage", "Money Exchange", "Travel Agency", "Hotel"],
  "Niboye": ["Construction Materials", "Hardware", "Plumbing", "Electrical Goods", "Painting", "Tile Shop", "Cement", "Tools"],
  "Nyarugunga": ["Housing Development", "Real Estate", "Property Management", "Home Improvement", "Garden Services", "Security", "Cleaning", "Moving"],
  
  //  MUSANZE (Northern Province - Tourism & Agriculture) 
  "Muhoza": ["Hotel & Lodging", "Tour Guide Services", "Souvenir Shop", "Restaurant", "Car Rental", "Crafts Sales", "Coffee Shop", "Supermarket"],
  "Kinigi": ["Gorilla Tourism", "Porter Services", "Homestay", "Tour Guide", "Craft Making", "Potato Farming", "Pyrethrum Growing", "Beekeeping"],
  "Cyuve": ["Irish Potato Farming", "Pyrethrum Growing", "Wheat Farming", "Dairy Farming", "Vegetable Farming", "Beekeeping", "Poultry", "Market Vending"],
  "Gacaca": ["Potato Wholesale", "Vegetable Market", "Grain Trading", "Livestock Market", "Farm Inputs", "Transport", "Market Stall", "Food Kiosk"],
  "Busogo": ["Tea Plantation", "Dairy Farming", "Banana Growing", "Irish Potatoes", "Market Vending", "Grocery", "Moto Taxi", "Phone Charging"],
  "Shingiro": ["Mixed Farming", "Dairy", "Poultry", "Vegetable Growing", "Beekeeping", "Market Vending", "Grocery", "Tailoring"],
  "Remera": ["Retail Shop", "Market Stall", "Tailoring", "Barbershop", "Phone Repair", "Grocery", "Bakery", "Butchery"],
  "Muko": ["Agriculture", "Livestock", "Market Vending", "Grocery", "Phone Accessories", "Tailoring", "Food Stall", "Charcoal Sales"],
  
  //  RUBAVU (Western Province - Border Trade & Tourism) 
  "Gisenyi": ["Hotel & Tourism", "Restaurant", "Forex Bureau", "Import/Export", "Wholesale Trade", "Car Rental", "Souvenir Shop", "Beach Services"],
  "Rubavu": ["Cross-border Trade", "Wholesale Market", "Import/Export", "Money Exchange", "Transport", "Warehousing", "Retail", "Hotel"],
  "Nyamyumba": ["Fishing", "Fish Processing", "Boat Rental", "Beach Restaurant", "Fish Sales", "Net Making", "Ice Sales", "Fish Transport"],
  "Bugeshi": ["Lake Fishing", "Fish Trading", "Agriculture", "Market Vending", "Boat Services", "Restaurant", "Grocery", "Retail"],
  "Nyundo": ["Crafts & Art", "Wood Carving", "Pottery", "Painting", "Sculpture", "Art School", "Gallery", "Souvenir Sales"],
  "Kanama": ["Mixed Farming", "Coffee Growing", "Banana Plantation", "Market Vending", "Livestock", "Grocery", "Tailoring", "Transport"],
  
  //  HUYE (Southern Province - Education & Services) 
  "Huye": ["Student Accommodation", "Printing & Photocopy", "Bookstore", "Restaurant", "Café", "Internet Café", "Tutoring", "Stationery"],
  "Ngoma": ["Student Housing", "Food Services", "Mobile Money", "Phone Accessories", "Barbershop", "Salon", "Laundry", "Retail"],
  "Tumba": ["Agriculture", "Livestock", "Market Vending", "Grocery", "Tailoring", "Barbershop", "Phone Charging", "Food Stall"],
  "Rusatira": ["Coffee Growing", "Tea Plantation", "Banana Growing", "Livestock", "Market Vending", "Grocery", "Moto Transport", "Phone Repair"],
  
  //  DEFAULT CATEGORIES BY AREA TYPE 
  "DEFAULT_RURAL": ["Subsistence Farming", "Cassava Growing", "Bean Cultivation", "Maize Farming", "Sweet Potato", "Banana Plantation", "Livestock", "Charcoal Making"],
  "DEFAULT_SEMI_URBAN": ["Grocery Shop", "Tailoring", "Phone Charging", "Barbershop", "Hair Salon", "Moto Taxi", "Food Kiosk", "Phone Repair"],
  "DEFAULT_URBAN": ["Retail Shop", "Mobile Money Agent", "Restaurant", "Beauty Salon", "Electronics", "Boutique", "Supermarket", "Digital Services"]
};

// Helper function to get hustles for a sector (with caching)
function getSectorHustles(sector) {
  // Return cached result if available
  if (SECTOR_HUSTLES_CACHE[sector]) {
    return SECTOR_HUSTLES_CACHE[sector];
  }
  
  let result;
  
  // Check if sector has specific hustles defined
  if (SECTOR_HUSTLES[sector]) {
    result = SECTOR_HUSTLES[sector];
  }
  //  INTELLIGENT CATEGORIZATION SYSTEM 
  else {
    // 1. URBAN CENTERS - Major city sectors
    const urbanCenters = ["Kigali", "Kacyiru", "Remera", "Kimisagara", "Nyarugenge", "Kicukiro", "Gasabo",
                          "Muhoza", "Gisenyi", "Huye", "Nyanza", "Ruhango", "Muhanga", "Gisozi", "Kinyinya"];
    if (urbanCenters.some(kw => sector.includes(kw))) {
      result = SECTOR_HUSTLES["DEFAULT_URBAN"];
    }
    // 2. SEMI-URBAN - Trading centers
    else if (["Market", "Center", "Gikondo", "Nyamirambo", "Kanombe", "Masaka", "Rwamagana", "Kayonza", "Nyagatare"].some(kw => sector.includes(kw))) {
      result = SECTOR_HUSTLES["DEFAULT_SEMI_URBAN"];
    }
    // 3. AGRICULTURAL ZONES
    else if (["Bumbogo", "Gatsata", "Gikomero", "Jali", "Rusororo", "Rutunga", "Cyuve", "Busogo", "Gacaca", "Shingiro", "Tumba", "Rusatira"].some(kw => sector.includes(kw))) {
      result = ["Mixed Farming", "Crop Growing", "Livestock", "Market Vending", "Dairy", "Poultry", "Vegetable Sales", "Farm Inputs"];
    }
    // 4. TOURISM ZONES
    else if (["Kinigi", "Nyamyumba", "Bugeshi", "Nyundo", "Rusizi", "Karongi", "Rubengera", "Nkombo", "Kivu"].some(kw => sector.includes(kw))) {
      result = ["Tourism Services", "Craft Sales", "Tour Guide", "Restaurant", "Accommodation", "Transport", "Souvenir Shop", "Local Produce"];
    }
    // 5. FISHING COMMUNITIES
    else if (["Nyamyumba", "Bugeshi", "Nkombo", "Nkungu", "Karongi", "Kamembe"].some(kw => sector.includes(kw))) {
      result = ["Fishing", "Fish Trading", "Boat Services", "Fish Processing", "Net Sales", "Ice Sales", "Beach Restaurant", "Transport"];
    }
    // 6. MINING/QUARRY AREAS
    else if (["Jabana", "Karuruma", "Bugesera", "Rutsiro", "Ngororero"].some(kw => sector.includes(kw))) {
      result = ["Stone Quarry", "Sand Extraction", "Construction Materials", "Masonry", "Brick Making", "Gravel Sales", "Transport", "Hardware"];
    }
    // 7. TEA/COFFEE ZONES
    else if (["Rusatira", "Gishamvu", "Maraba", "Busogo", "Nyamasheke", "Rutsiro"].some(kw => sector.includes(kw))) {
      result = ["Coffee Growing", "Tea Plantation", "Cooperative Services", "Processing", "Market Vending", "Farm Inputs", "Transport", "Packaging"];
    }
    // 8. BORDER AREAS
    else if (["Rubavu", "Rusizi", "Kamembe", "Cyangugu", "Kagitumba", "Gatuna"].some(kw => sector.includes(kw))) {
      result = ["Cross-border Trade", "Import/Export", "Money Exchange", "Warehousing", "Transport", "Retail", "Wholesale", "Customs Services"];
    }
    // 9. HEALTH/EDUCATION HUBS
    else if (["Ndera", "Huye", "Ngoma", "Butare", "Kacyiru", "Remera"].some(kw => sector.includes(kw))) {
      result = ["Student Services", "Accommodation", "Food Services", "Bookstore", "Printing", "Internet Café", "Tutoring", "Stationery"];
    }
    // DEFAULT: Rural agricultural & basic services
    else {
      result = SECTOR_HUSTLES["DEFAULT_RURAL"];
    }
  }
  
  // Cache the result
  SECTOR_HUSTLES_CACHE[sector] = result;
  return result;
}

//  ML ENGINE 
// How this works per hustle:
//  base      : avg_score × 10           (0–100)
//  capital   : strict gate              (−30 to +20)
//  hours     : daily availability fit  (−10 to +12)
//  skills    : match boost OR None/Other penalty  (−20 to +20)
//  location  : area bonus               (0 to +6)
//  age       : category fit bonus       (0 to +5)
//  roi       : profit/capital ratio     (0 to +8)
// Max realistic score ≈ 151  normalised to matchPct

function mlPredict(form) {
  const cap      = parseInt(form.capital) || 0;
  const hrsDay   = parseFloat(form.hoursPerDay) || 4;
  const hrsWeek  = hrsDay * 7;
  const age      = parseInt(form.age) || 25;
  const skills   = form.skills || [];
  const loc      = form.location || "Gasabo";
  const sector   = form.sector || "";
  const hasDisability = form.hasDisability && form.hasDisability !== "No disability" && form.hasDisability !== "Nta bumuga";
  const hasSmartphone = form.hasSmartphone !== "No";

  const hasNone  = skills.includes("None of the above");
  const realSkills = skills.filter(s => s !== "None of the above" && s !== "Other");
  const hasITSkill = realSkills.includes("Technology / IT");
  const lang = form.language || "Kinyarwanda";
  
  // Get sector-specific hustles for additional matching
  const sectorHustles = sector ? getSectorHustles(sector) : [];

  // Jobs that need the user to actually know a specific language
  const LANG_REQUIRED = {
    "English/French Tutoring Online": ["English", "French"],
    "Language School (Home-based)": ["English", "French", "Swahili", "Chinese", "German"],
    "Tour Guide (Kigali/Akagera)": ["English", "French"],
    "Gorilla Trekking Tour Operator": ["English", "French"],
  };

  // Jobs that strictly require IT / computer literacy
  const REQUIRES_IT = new Set([
    "Data Entry & Virtual Assistant", "Social Media Management", "Freelance Web Design",
    "E-commerce Store Management", "Digital Marketing Services", "IT Support & Troubleshooting",
    "YouTube Content Creation", "Podcast Recording Services", "Computer Training (Basic Skills)",
    "Irembo Multi-Service Cyber Café",
  ]);

  const SKILLED_CATS  = new Set(["Creative & Digital","Construction & Trades","Education & Training","Beauty & Wellness","Fashion & Tailoring","Digital & Financial Services"]);
  const EASY_CATS     = new Set(["Food & Beverage","Agriculture & Farming","Other Services"]);
  const DIGITAL_CATS  = new Set(["Creative & Digital","Digital & Financial Services"]);
  const PHYSICAL_CATS = new Set(["Construction & Trades","Agriculture & Farming","Transport & Delivery"]);

  // Kigali city districts + other urban districts
  const URBAN_LOCS = new Set(["Gasabo","Kicukiro","Nyarugenge","Muhanga","Rubavu","Musanze","Huye"]);
  
  // Urban sectors - city centers and major town centers (expanded)
  const URBAN_SECTORS = new Set([
    // Kigali urban sectors
    "Kacyiru", "Remera", "Kimisagara", "Nyamirambo", "Muhima", "Kigali", "Nyarugenge", 
    "Gitega", "Gisozi", "Kinyinya", "Gahanga", "Kagarama", "Gikondo", "Kicukiro", 
    "Kanombe", "Gatenga", "Nyakabanda", "Rwezamenyo", "Mageragere", "Niboye", "Nyarugunga",
    "Masaka", "Kigarama", "Ndera",
    // Other major town centers
    "Muhoza", "Gisenyi", "Rubavu", "Huye", "Ngoma", "Ruhango", "Nyanza", "Muhanga",
    "Rwamagana", "Kayonza", "Nyagatare", "Kibungo", "Karongi", "Gitarama"
  ]);
  
  // Agricultural sectors (for better matching)
  const AGRICULTURAL_SECTORS = new Set([
    "Bumbogo", "Gatsata", "Gikomero", "Jali", "Rusororo", "Rutunga", "Karuruma",
    "Cyuve", "Busogo", "Gacaca", "Shingiro", "Tumba", "Rusatira", "Kanama",
    "Kinigi", "Gataraga", "Cyumba", "Kivuye", "Nemba"
  ]);
  
  // Tourism sectors
  const TOURISM_SECTORS = new Set([
    "Kinigi", "Muhoza", "Nyamyumba", "Bugeshi", "Gisenyi", "Rubavu", "Nyundo",
    "Nkombo", "Karongi", "Rubengera"
  ]);

  const scored = Object.entries(HD).map(([name, d]) => {
    const [avgScore,,avgCap,avgHrs,cat,,pctExp,skillCat,minCap,minHrs] = d;
    
    // 
    // NEW BALANCED SCORING SYSTEM - All factors equally weighted
    // Total possible score: 550 points
    // 
    
    let skillScore = 0;      // Max 100 pts
    let capitalScore = 0;    // Max 100 pts
    let timeScore = 0;       // Max 100 pts
    let locationScore = 0;   // Max 100 pts
    let ageScore = 0;        // Max 50 pts
    let disabilityScore = 0; // Max 50 pts
    let phoneScore = 0;      // Max 50 pts
    
    //  1. SKILLS MATCH (100 points) 
    if (hasNone) {
      // User has no skills
      if (EASY_CATS.has(cat)) skillScore = 60; // Easy categories
      else if (SKILLED_CATS.has(cat)) skillScore = 0; // Skilled categories blocked
      else skillScore = 30;
    } else {
      // Check skill matches
      const directCatMatch = skillCat && realSkills.includes(skillCat);
      const datasetMatch = realSkills.filter(sk => (SKILL_MAP_EN[sk]||[]).includes(name)).length;
      const catMatch = realSkills.filter(sk => {
        const skHustles = SKILL_MAP_EN[sk] || [];
        return skHustles.some(h => HD[h]?.[4] === cat);
      }).length;

      if (directCatMatch) skillScore = 100;      // Perfect match
      else if (datasetMatch >= 2) skillScore = 85;
      else if (datasetMatch === 1) skillScore = 70;
      else if (catMatch >= 1) skillScore = 50;
      else if (SKILLED_CATS.has(cat)) skillScore = 0; // Complete mismatch
      else skillScore = 30; // Neutral categories
      
      // HARD SKILL REQUIREMENTS - Must have matching skills
      if (cat === "Agriculture & Farming" && !realSkills.includes("Agriculture / Farming")) {
        skillScore = 0; // Block completely
      }
      if (cat === "Construction & Trades" && !realSkills.includes("Construction / Trades")) {
        skillScore = 0;
      }
      if (cat === "Craft & Manufacturing" && !realSkills.some(sk => ["Crafts / Art", "Sewing / Fashion", "Construction / Trades"].includes(sk))) {
        skillScore = 0;
      }
      if (DIGITAL_CATS.has(cat) && !hasITSkill) {
        skillScore = 0; // Digital needs IT skills
      }
    }

    //  2. CAPITAL MATCH (100 points) 
    const capMin = minCap || avgCap * 0.5;
    if (avgCap > 0 && cap > 0) {
      if (cap < capMin * 0.3) {
        capitalScore = 0; // Cannot afford at all
      } else if (cap < capMin * 0.6) {
        capitalScore = 30; // Significantly underfunded
      } else if (cap < capMin) {
        capitalScore = 60; // Slightly underfunded
      } else if (cap < avgCap * 0.8) {
        capitalScore = 80; // Close to average
      } else if (cap >= avgCap) {
        capitalScore = 100; // Fully funded or more
      }
    } else {
      capitalScore = 50; // No capital info, neutral
    }

    //  3. TIME AVAILABLE MATCH (100 points) 
    const hrsMin = minHrs || avgHrs * 0.5;
    if (avgHrs > 0 && hrsWeek > 0) {
      if (hrsWeek < hrsMin * 0.4) {
        timeScore = 0; // Not enough time
      } else if (hrsWeek < hrsMin * 0.7) {
        timeScore = 40; // Limited time
      } else if (hrsWeek < hrsMin) {
        timeScore = 70; // Close to minimum
      } else if (hrsWeek >= avgHrs * 0.8) {
        timeScore = 100; // Good time availability
      } else {
        timeScore = 85;
      }
    } else {
      timeScore = 50; // No time info, neutral
    }

    //  4. LOCATION/SECTOR MATCH (100 points) 
    const isUrban = URBAN_LOCS.has(loc);
    const isUrbanSector = sector && URBAN_SECTORS.has(sector);
    const isAgricSector = sector && AGRICULTURAL_SECTORS.has(sector);
    const isTourismSector = sector && TOURISM_SECTORS.has(sector);
    const isRuralSector = sector && !URBAN_SECTORS.has(sector) && !AGRICULTURAL_SECTORS.has(sector) && !TOURISM_SECTORS.has(sector);
    
    locationScore = 50; // Base score
    
    // Sector-specific matching
    if (isUrbanSector) {
      if (DIGITAL_CATS.has(cat) || cat === "Other Services") locationScore = 100;
      else if (cat === "Beauty & Wellness" || cat === "Fashion & Tailoring") locationScore = 85;
      else if (cat === "Agriculture & Farming") locationScore = 0; // Farming in city
      else locationScore = 60;
    } else if (isAgricSector) {
      if (cat === "Agriculture & Farming" && realSkills.includes("Agriculture / Farming")) {
        locationScore = 100; // Perfect: farming skills in farm area
      } else if (cat === "Agriculture & Farming") {
        locationScore = 20; // Location match but no skills
      } else if (cat === "Food & Beverage") locationScore = 70;
      else if (DIGITAL_CATS.has(cat)) locationScore = 10; // Digital not viable in farms
      else locationScore = 40;
    } else if (isTourismSector) {
      if (cat === "Tourism & Events") locationScore = 100;
      else if (cat === "Food & Beverage") locationScore = 80;
      else if (cat === "Crafts & Manufacturing") locationScore = 70;
      else locationScore = 50;
    } else if (isRuralSector || (!sector && !isUrban)) {
      if (cat === "Agriculture & Farming" && realSkills.includes("Agriculture / Farming")) {
        locationScore = 90;
      } else if (cat === "Food & Beverage" || cat === "Other Services") locationScore = 75;
      else if (DIGITAL_CATS.has(cat)) locationScore = 20;
      else locationScore = 50;
    } else if (!sector && isUrban) {
      if (DIGITAL_CATS.has(cat) || cat === "Tourism & Events") locationScore = 85;
      else if (cat === "Beauty & Wellness" || cat === "Other Services") locationScore = 75;
      else locationScore = 60;
    }
    
    // Sector hustle matching bonus
    if (sector && sectorHustles.length > 0) {
      const nameLower = name.toLowerCase();
      const hasMatch = sectorHustles.some(sh => {
        const shLower = sh.toLowerCase();
        return nameLower === shLower || nameLower.includes(shLower) || shLower.includes(nameLower);
      });
      if (hasMatch) locationScore = Math.min(100, locationScore + 25);
    }

    //  5. AGE APPROPRIATENESS (50 points) 
    ageScore = 25; // Base score
    
    if (age < 25 && DIGITAL_CATS.has(cat)) ageScore = 50; // Young people good for digital
    else if (age < 30 && cat === "Transport & Delivery") ageScore = 45;
    else if (age > 40 && (cat === "Agriculture & Farming" || cat === "Food & Beverage")) ageScore = 50;
    else if (age > 50 && PHYSICAL_CATS.has(cat)) ageScore = 15; // Less physical stamina
    else if (age >= 25 && age <= 40) ageScore = 40; // Prime working age
    else ageScore = 30;

    //  6. DISABILITY COMPATIBILITY (50 points) 
    if (hasDisability) {
      if (PHYSICAL_CATS.has(cat)) {
        disabilityScore = 0; // Physical work not suitable
      } else if (DIGITAL_CATS.has(cat) || cat === "Education & Training") {
        disabilityScore = 50; // Digital/teaching very suitable
      } else if (cat === "Food & Beverage" || cat === "Other Services") {
        disabilityScore = 30; // Moderately suitable
      } else {
        disabilityScore = 20;
      }
    } else {
      disabilityScore = 50; // No disability, all businesses suitable
    }

    //  7. SMARTPHONE ACCESS (50 points) 
    if (DIGITAL_CATS.has(cat) || name.includes("App") || name.includes("Online") || name.includes("Social media")) {
      phoneScore = hasSmartphone ? 50 : 0; // Digital needs phone
    } else if (cat === "Transport & Delivery" || cat === "Other Services") {
      phoneScore = hasSmartphone ? 50 : 30; // Phone helpful but not required
    } else {
      phoneScore = hasSmartphone ? 50 : 40; // Phone not critical
    }
    
    // Language requirements check
    if (LANG_REQUIRED[name] && !LANG_REQUIRED[name].includes(lang)) {
      skillScore = Math.min(skillScore, 20); // Severe penalty for language mismatch
    }
    
    // 
    // TOTAL SCORE (max 550)
    // 
    const totalScore = skillScore + capitalScore + timeScore + locationScore + ageScore + disabilityScore + phoneScore;
    
    // Add small historical success bonus (max 30 pts)
    const successBonus = avgScore * 5;

    return { name, s: totalScore + successBonus, d, breakdown: { skillScore, capitalScore, timeScore, locationScore, ageScore, disabilityScore, phoneScore, totalScore } };
  });

  scored.sort((a, b) => b.s - a.s);

  // Diverse Top 3 — one per category, skip disqualified (score < 100)
  const diverse = [];
  const usedCats = new Set();
  for (const item of scored) {
    if (item.s < 100) continue; // Skip low-scoring items (less than 100/550 points)
    const cat = item.d[4];
    if (!usedCats.has(cat)) { diverse.push(item); usedCats.add(cat); }
    if (diverse.length === 3) break;
  }
  // Fallback: if not enough diverse results, fill with best remaining
  if (diverse.length < 3) {
    for (const item of scored) {
      if (!diverse.includes(item) && item.s >= 50) diverse.push(item); // Minimum 50 points
      if (diverse.length === 3) break;
    }
  }

  const bestScore = diverse[0]?.s || 0;
  // New scoring: max 550 points (+ 30 bonus) = 580 total
  // Convert to percentage: 580 pts = 98%, 290 pts = 65%, 145 pts = 50%
  const topMatch  = Math.min(98, Math.max(50, Math.round((bestScore / 580) * 100)));

  const top3 = diverse.map((x, i) => {
    const [sc, profit, capReq, hrs, cat, rev] = x.d;
    return {
      rank: i+1, name: x.name, category: cat,
      matchPct: Math.max(50, topMatch - (i * 6)),
      avgProfit: Math.round(profit), avgCapital: Math.round(capReq), avgRevenue: Math.round(rev),
      avgScore: sc, avgHrs: Math.round(hrs * 10) / 10,
      icon: ICONS[cat]||"", color: COLORS[cat]||"#334155",
    };
  });

  const prob  = Math.min(96, Math.max(38, Math.round((bestScore / 580) * 100)));
  const level = prob >= 75 ? "High" : prob >= 58 ? "Medium" : "Growing";

  return { top3, prob, level };
}

//  STYLES 
const G = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{width:100%;min-height:100vh;}
body{font-family:'DM Sans',sans-serif;background:#F0F7FF;color:#0F172A}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#2563EB;border-radius:99px}
@keyframes up{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dot{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0.3)}50%{box-shadow:0 0 0 8px rgba(37,99,235,0)}}
.u1{animation:up .4s ease both}.u2{animation:up .4s .1s ease both}.u3{animation:up .4s .2s ease both}.u4{animation:up .4s .3s ease both}
.pop{animation:pop .3s ease both}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;border-radius:10px;padding:12px 24px;font-size:18px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.btn-g{background:linear-gradient(135deg,#2563EB,#1E40AF);color:#fff}
.btn-g:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(37,99,235,0.3)}
.btn-o{background:transparent;color:#2563EB;border:1.5px solid #2563EB}
.btn-o:hover{background:rgba(37,99,235,0.07)}
.inp{width:100%;padding:12px 16px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:18px;font-family:'DM Sans',sans-serif;background:#fff;color:#0F172A;outline:none;transition:all .2s}
.inp:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,0.1)}
.sel{width:100%;padding:12px 16px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:18px;font-family:'DM Sans',sans-serif;background:#fff;color:#0F172A;outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%232563EB' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;transition:all .2s}
.sel:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,0.1)}
.multi-sel{width:100%;padding:8px 12px;border:1.5px solid #E2E8F0;border-radius:10px;font-size:17px;font-family:'DM Sans',sans-serif;background:#fff;color:#0F172A;outline:none;cursor:pointer;min-height:110px;transition:all .2s}
.multi-sel:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,0.1)}
.multi-sel option{padding:6px 10px;border-radius:6px;margin:2px 0;cursor:pointer}
.multi-sel option:checked{background:#2563EB;color:#fff}
.card{background:#fff;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)}
.lbl{display:block;font-size:15px;font-weight:700;color:#1E40AF;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:1.5px solid #E2E8F0;background:#fff;cursor:pointer;font-size:16px;font-weight:500;color:#475569;transition:all .15s}
.chip:hover{border-color:#3B82F6;background:#EFF6FF}
.chip.on{border-color:#2563EB;background:#2563EB;color:#fff}
.lang-toggle{display:flex;background:#F1F5F9;border-radius:8px;padding:2px;border:1px solid #E2E8F0}
.lang-btn{border:none;border-radius:6px;padding:4px 10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;background:transparent;color:#64748B}
.lang-btn.active{background:#fff;color:#2563EB;box-shadow:0 1px 2px rgba(0,0,0,0.1)}
.toast-warn{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1E3A8A;color:#fff;padding:12px 24px;border-radius:12px;font-size:17px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(30,58,138,0.4);animation:up .3s ease both}
`;

//  NAV 
function Nav({ pg, go, user, logout, lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navPages = [
    {id:"home", label: t.navHome},
    {id:"predict", label: t.navPredict},
    {id:"stories", label: t.navStories||"Stories"},
    ...(user ? [{id:"dashboard", label: user.role === 'support_technician' ? (t.terminal || "Terminal") : (t.navDash || "Dashboard")}] : []),
  ];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(255,255,255,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid #DBEAFE",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",boxShadow:"0 4px 12px rgba(37,99,235,0.05)"}}>
      <div onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
        <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#2563EB,#1E40AF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",fontWeight:800}}>RH</div>
        <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:20,color:"#0F172A"}}>Rwanda<span style={{color:"#2563EB"}}>Hustle</span></span>
      </div>
      {/* Desktop nav */}
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
        {navPages.map(p=>(
          <button key={p.id} onClick={()=>go(p.id)} style={{background:pg===p.id?"#EFF6FF":"transparent",border:"none",borderRadius:6,padding:"6px 10px",color:pg===p.id?"#2563EB":"#475569",fontWeight:pg===p.id?700:500,cursor:"pointer",fontSize:15,fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>
            {p.label}
          </button>
        ))}
        <div className="lang-toggle">
          <button className={`lang-btn ${lang==="en"?"active":""}`} onClick={()=>setLang("en")}>EN</button>
          <button className={`lang-btn ${lang==="rw"?"active":""}`} onClick={()=>setLang("rw")}>RW</button>
        </div>
        {user ? (
          <>
            <span style={{fontSize:14,color:"#64748B",fontWeight:600,padding:"0 4px",cursor:"pointer"}} onClick={()=>go("profile")}>{user.name}</span>
            <button className="btn btn-o" style={{padding:"5px 10px",fontSize:14}} onClick={logout}>{t.navSignOut}</button>
          </>
        ) : (
          <>
            <button className="btn btn-o" style={{padding:"5px 10px",fontSize:14}} onClick={()=>go("login")}>{t.navLogin}</button>
            <button className="btn btn-g" style={{padding:"5px 10px",fontSize:14}} onClick={()=>go("signup")}>{t.navSignUp}</button>
          </>
        )}
      </div>
    </nav>
  );
}

//  HOME 
function Home({ go, user, t }) {
  const benefits=[
    {icon:"",title:t.b1t,desc:t.b1d},
    {icon:"",title:t.b2t,desc:t.b2d},
    {icon:"",title:t.b3t,desc:t.b3d},
    {icon:"",title:t.b4t,desc:t.b4d},
  ];
  const how=[[t.h1t,t.h1d],[t.h2t,t.h2d],[t.h3t,t.h3d],[t.h4t,t.h4d]];
  return (
    <div style={{paddingTop:60}}>
      <section style={{minHeight:"90vh",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"60px 20px",background:"linear-gradient(160deg,#EFF6FF,#DBEAFE 60%,#BFDBFE)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:480,height:480,borderRadius:"50%",background:"rgba(37,99,235,.07)",top:-110,right:-100,pointerEvents:"none"}}/>
        <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",background:"rgba(59,130,246,.06)",bottom:-70,left:-50,pointerEvents:"none"}}/>
        <div style={{position:"relative",maxWidth:700}}>
          <div className="u1" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:"1.5px solid #DBEAFE",borderRadius:100,padding:"6px 18px",fontSize:15,color:"#2563EB",fontWeight:600,marginBottom:24,boxShadow:"0 2px 8px rgba(37,99,235,0.05)"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#2563EB",display:"inline-block",animation:"glow 2s infinite"}}/>
            {t.heroBadge}
          </div>
          <h1 className="u2" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(28px,5vw,52px)",lineHeight:1.15,color:"#0F172A",marginBottom:16}}>
            {t.heroTitle1}<br/><span style={{color:"#2563EB"}}>{t.heroTitle2}</span><br/>{t.heroTitle3}
          </h1>
          <p className="u3" style={{fontSize:19,color:"#475569",lineHeight:1.7,marginBottom:32,maxWidth:500,margin:"0 auto 32px"}}>
            {t.heroSub}
          </p>
          <div className="u4" style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-g" style={{fontSize:18}} onClick={()=>go(user?"predict":"signup")}>{t.heroCTA}</button>
            {user ? (
              <button className="btn btn-o" style={{fontSize:17}} onClick={()=>go("dashboard")}>{t.navDash}</button>
            ) : (
              <button className="btn btn-o" style={{fontSize:17}} onClick={()=>go("login")}>{t.heroMember}</button>
            )}
          </div>
        </div>
      </section>

      <section style={{background:"#0F172A",padding:"48px 20px"}}>
        <div style={{maxWidth:820,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:24}}>
          {benefits.map(({icon,title,desc},i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:35,marginBottom:8}}>{icon}</div>
              <div style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:6,fontFamily:"'Sora',sans-serif"}}>{title}</div>
              <div style={{color:"#94A3B8",fontSize:15,lineHeight:1.6}}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"72px 20px",background:"#F0F6FF"}}>
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:33,textAlign:"center",marginBottom:44,color:"#0F172A"}}>{t.howTitle}</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:18}}>
            {how.map(([title,desc],i)=>(
              <div key={i} className="card" style={{padding:22,position:"relative",overflow:"hidden"}}>
                <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,#2563EB,#1E40AF)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:16,marginBottom:12}}>0{i+1}</div>
                <h3 style={{fontWeight:700,marginBottom:6,color:"#0F172A",fontSize:18}}>{title}</h3>
                <p style={{color:"#475569",fontSize:16,lineHeight:1.6}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:"72px 20px",background:"linear-gradient(135deg,#2563EB,#1E40AF)",textAlign:"center"}}>
        <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:33,color:"#fff",marginBottom:12}}>{t.ctaTitle}</h2>
        <p style={{color:"rgba(255,255,255,.8)",fontSize:19,marginBottom:30}}>{t.ctaSub}</p>
        <button className="btn" style={{background:"#fff",color:"#1E40AF",fontSize:19,padding:"14px 36px",fontWeight:700}} onClick={()=>go("signup")}>{t.ctaBtn}</button>
      </section>
    </div>
  );
}

//  RESEND COUNTDOWN COMPONENT 
// Isolated component to prevent the entire Auth from re-rendering on every countdown tick
function ResendCountdown({ initialSeconds, onComplete, t }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds); // Reset when initialSeconds changes
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && onComplete) {
      onComplete();
    }
  }, [seconds, onComplete]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums", minWidth: "50px", display: "inline-block" }}>
      {t.resendOtpWait(seconds)}
    </span>
  );
}

//  AUTH 
function Auth({ mode, go, onAuth, onVerify, t, lang, API_URL }) {
  const [step, setStep]           = useState("form");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [code, setCode]           = useState("");
  const [newPass, setNewPass]     = useState("");
  const [testPassword, setTestPassword] = useState(""); // Store generated password for display
  const [f, setF] = useState({ name:"", email_phone:"", password:"", employment_status:"Unemployed", language:lang });
  const [err, setErr]             = useState("");
  const [info, setInfo]           = useState("");
  const [busy, setBusy]           = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  
  // OTP step state
  const [canResend, setCanResend] = useState(false);
  const [otpResendMsg, setOtpResendMsg] = useState("");
  const [otpResending, setOtpResending] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0); // Key to reset countdown component
  
  const login = mode === "login";

  //  Signup submit 
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setInfo("");
    if (!f.email_phone) { setErr(t.authFill); return; }
    if (!login && !f.name) { setErr(t.authEnterName); return; }
    setBusy(true);
    const res = await onAuth(f, mode);
    setBusy(false);
    if (res.error) {
      setErr(res.error);
      if (res.unverified) { setStep("verify"); setVerifyEmail(f.email_phone); }
    } else if (res.auto_logged_in) {
      // User was automatically logged in after signup - no need to show anything
      // Already redirected to dashboard by onAuth
    } else if (res.redirect_login) {
      // Signup done — show success message and redirect to login
      setInfo(lang === "rw" 
        ? "Konti yarakozwe neza! Ijambo-banga ryoherejwe kuri imeyili yawe. Urasubira kuri login page..."
        : "Account created successfully! Password sent to your email. Redirecting to login...");
      setTimeout(() => {
        go("login");
      }, 3000);
    } else if (res.otp_required) {
      setVerifyEmail(res.email_phone || f.email_phone);
      setStep("otp");
    } else if (res.verify) {
      setVerifyEmail(res.email_phone || f.email_phone);
      setStep("verify");
    }
  };

  //  Verify account (signup OTP) 
  const handleVerify = async (e) => {
    e.preventDefault(); setErr("");
    setBusy(true);
    const res = await onVerify(verifyEmail, code);
    setBusy(false);
    if (res.error) setErr(res.error);
  };

  //  Login OTP verify 
  const handleLoginOtp = async (e) => {
    e.preventDefault(); setErr("");
    if (!code) { setErr("Enter the OTP code"); return; }
    setBusy(true);
    console.log("[DEBUG] Submitting OTP:", code, "for email:", verifyEmail);
    try {
      const r = await fetch(`${API_URL}/auth/login-verify`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email_phone: verifyEmail, code })
      });
      const d = await r.json();
      console.log("[DEBUG] OTP verification response:", d);
      setBusy(false);
      if (d.error) { 
        console.error("[DEBUG] OTP verification error:", d.error);
        setErr(d.error); 
        return; 
      }
      console.log("[DEBUG] Calling onVerify with data:", d);
      const result = await onVerify(verifyEmail, code, d); // pass token+user up
      console.log("[DEBUG] onVerify result:", result);
    } catch (error) { 
      console.error("[DEBUG] OTP verification exception:", error);
      setBusy(false); 
      setErr("Connection error"); 
    }
  };

  //  Forgot password 
  const handleForgot = async (e) => {
    e.preventDefault(); setErr("");
    if (!f.email_phone) { setErr(t.authFill); return; }
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/auth/forgot-password`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email_phone: f.email_phone })
      });
      const d = await r.json();
      setBusy(false);
      if (d.error) setErr(d.error);
      else { setVerifyEmail(f.email_phone); setStep("reset"); }
    } catch { setBusy(false); setErr("Connection error"); }
  };

  //  Reset password 
  const handleReset = async (e) => {
    e.preventDefault(); setErr("");
    if (!code || !newPass) { setErr(t.authFill); return; }
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/auth/reset-password`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email_phone: verifyEmail, code, password: newPass })
      });
      const d = await r.json();
      setBusy(false);
      if (d.error) setErr(d.error);
      else { alert(d.message); setStep("form"); go("login"); }
    } catch { setBusy(false); setErr("Connection error"); }
  };

  const Card = ({title, sub, children}) => (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F0F6FF",padding:"40px 20px"}}>
      <div className="card pop" style={{maxWidth:440,width:"100%",padding:40}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,background:"linear-gradient(135deg,#2563EB,#1E40AF)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"#fff",fontSize:28,fontWeight:800}}>RH</div>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:27,color:"#0F172A",marginBottom:6}}>{title}</h2>
          <p style={{color:"#64748B",fontSize:17}}>{sub}</p>
        </div>
        {err && <div style={{background:"#FEF2F2",color:"#DC2626",borderRadius:10,padding:"12px 14px",fontSize:16,marginBottom:18,border:"1px solid #FEE2E2"}}>{err}</div>}
        {info && <div style={{background:"#EFF6FF",color:"#1E40AF",borderRadius:10,padding:"12px 14px",fontSize:16,marginBottom:18,border:"1px solid #BFDBFE"}}>{info}</div>}
        {children}
      </div>
    </div>
  );

  //  Verify account step 
  if (step === "signup_done") {
    const isPhone = f.email_phone.match(/^[+]?[0-9]{9,15}$/);
    
    const handleResendPassword = async () => {
      setResending(true);
      setResendMsg("");
      try {
        const res = await fetch(`${API_URL}/auth/resend-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_phone: f.email_phone })
        });
        const data = await res.json();
        setResending(false);
        if (data.error) {
          setResendMsg(data.error);
        } else {
          setResendMsg(lang === "rw" 
            ? (isPhone ? "Ijambo-banga ryongewe koherezwa kuri terefone!" : "Ijambo-banga ryongewe koherezwa kuri imeyili!")
            : (isPhone ? "Password resent to your phone!" : "Password resent to your email!"));
        }
      } catch (e) {
        setResending(false);
        setResendMsg(lang === "rw" ? "Ikibazo cyabaye. Ongera ugerageze." : "Connection error. Try again.");
      }
    };
    
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F0F6FF",padding:"40px 20px"}}>
        <div className="card pop" style={{maxWidth:500,width:"100%",padding:40,textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"#10B981",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:40}}></div>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:28,color:"#0F172A",marginBottom:12}}>
            {lang === "rw" ? "Konti Yarakozwe Neza!" : "Account Created Successfully!"}
          </h2>
          <p style={{color:"#64748B",fontSize:17,lineHeight:1.7,marginBottom:28}}>
            {lang === "rw" 
              ? (isPhone 
                  ? <>Ijambo-banga ryoherejwe kuri terefone yawe. Reba ubutumwa bwawe maze <button type="button" onClick={()=>go("login")} onMouseOver={(e)=>e.target.style.color="#1E40AF"} onMouseOut={(e)=>e.target.style.color="#2563EB"} style={{background:"none",border:"none",color:"#2563EB",fontWeight:800,cursor:"pointer",textDecoration:"underline",fontSize:20,padding:0,margin:0,verticalAlign:"baseline"}}>uinjire hano</button>.</>
                  : <>Ijambo-banga ryoherejwe kuri imeyili yawe. Reba inbox yawe maze <button type="button" onClick={()=>go("login")} onMouseOver={(e)=>e.target.style.color="#1E40AF"} onMouseOut={(e)=>e.target.style.color="#2563EB"} style={{background:"none",border:"none",color:"#2563EB",fontWeight:800,cursor:"pointer",textDecoration:"underline",fontSize:20,padding:0,margin:0,verticalAlign:"baseline"}}>uinjire hano</button>.</>)
              : (isPhone
                  ? <>Your password has been sent to your phone via SMS. Check your messages and <button type="button" onClick={()=>go("login")} onMouseOver={(e)=>e.target.style.color="#1E40AF"} onMouseOut={(e)=>e.target.style.color="#2563EB"} style={{background:"none",border:"none",color:"#2563EB",fontWeight:800,cursor:"pointer",textDecoration:"underline",fontSize:20,padding:0,margin:0,verticalAlign:"baseline"}}>login here</button>.</>
                  : <>Your password has been sent to your email. Check your inbox and <button type="button" onClick={()=>go("login")} onMouseOver={(e)=>e.target.style.color="#1E40AF"} onMouseOut={(e)=>e.target.style.color="#2563EB"} style={{background:"none",border:"none",color:"#2563EB",fontWeight:800,cursor:"pointer",textDecoration:"underline",fontSize:20,padding:0,margin:0,verticalAlign:"baseline"}}>login here</button>.</>)}
          </p>
          <div style={{background:"#EFF6FF",borderRadius:12,padding:16,marginBottom:24,border:"1px solid #BFDBFE"}}>
            <div style={{fontSize:14,color:"#1E40AF",fontWeight:600}}>
              {lang === "rw" ? (isPhone ? "Terefone:" : "Imeyili:") : (isPhone ? "Phone:" : "Email:")} {f.email_phone}
            </div>
          </div>
          {resendMsg && (
            <div style={{background:resendMsg.includes("error") || resendMsg.includes("Ikibazo") ? "#FEF2F2" : "#F0FDF4",color:resendMsg.includes("error") || resendMsg.includes("Ikibazo") ? "#DC2626" : "#16A34A",borderRadius:10,padding:"12px 14px",fontSize:15,marginBottom:18,border:resendMsg.includes("error") || resendMsg.includes("Ikibazo") ? "1px solid #FEE2E2" : "1px solid #BBF7D0"}}>
              {resendMsg}
            </div>
          )}
          <button 
            className="btn btn-g" 
            style={{width:"100%",padding:14,fontSize:17,marginBottom:12}} 
            onClick={()=>go("login")}
          >
            {lang === "rw" ? "Injira Ubu" : "Login Now"}
          </button>
          <button 
            type="button"
            className="btn btn-o"
            style={{width:"100%",padding:14,fontSize:15,marginBottom:12}}
            onClick={handleResendPassword}
            disabled={resending}
          >
            {resending ? (lang === "rw" ? "Iroherezwa..." : "Resending...") : (lang === "rw" ? "Ongera Ukohereze Ijambo-banga" : "Resend Password")}
          </button>
          <button 
            type="button" 
            onClick={()=>setStep("form")} 
            style={{width:"100%",background:"none",border:"none",color:"#64748B",fontSize:15,cursor:"pointer",marginTop:8}}
          >
            {lang === "rw" ? " Subira" : " Back"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "verify") return (
    <Card title={t.authVerify} sub={t.authVerifyNote}>
      <form onSubmit={handleVerify}>
        <div style={{marginBottom:18}}>
          <label className="lbl">{t.authCode}</label>
          <input className="inp" placeholder="123456" value={code} onChange={e=>setCode(e.target.value)} maxLength="6" style={{textAlign:"center",fontSize:25,letterSpacing:8,fontWeight:800}}/>
        </div>
        <button className="btn btn-g" style={{width:"100%",padding:13,marginBottom:12}} disabled={busy}>{busy?t.authProcessing:t.authDone}</button>
        <button type="button" onClick={()=>setStep("form")} style={{width:"100%",background:"none",border:"none",color:"#64748B",fontSize:16,cursor:"pointer"}}> Back</button>
      </form>
    </Card>
  );

  //  Login OTP step 
  if (step === "otp") {
    const isPhone = verifyEmail.match(/^[+]?[0-9]{9,15}$/);

    const handleResendOtp = async () => {
      setOtpResending(true);
      setOtpResendMsg("");
      try {
        const res = await fetch(`${API_URL}/auth/resend-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email_phone: verifyEmail })
        });
        const data = await res.json();
        if (res.ok) {
          setOtpResendMsg(t.resendOtpSuccess);
          setCountdownKey(k => k + 1); // Reset countdown by changing key
          setCanResend(false);
        } else {
          setOtpResendMsg(data.error || t.resendOtpError);
        }
      } catch (error) {
        setOtpResendMsg(t.resendOtpError);
      }
      setOtpResending(false);
    };

    return (
      <Card title="Login Verification" sub={`OTP sent to ${verifyEmail}`}>
        <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:12,padding:16,marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:16,color:"#1E40AF"}}>
            {isPhone 
              ? (lang === "rw" ? "Reba ubutumwa bwawe kugira ngo ubone code" : "Check your SMS messages for the verification code")
              : (lang === "rw" ? "Reba imeyili yawe kugira ngo ubone code" : "Check your email for the verification code")}
          </div>
        </div>
        {otpResendMsg && (
          <div style={{
            background: otpResendMsg.includes("success") || otpResendMsg.includes("neza") ? "#F0FDF4" : "#FEF2F2",
            color: otpResendMsg.includes("success") || otpResendMsg.includes("neza") ? "#16A34A" : "#DC2626",
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 15,
            marginBottom: 18,
            border: otpResendMsg.includes("success") || otpResendMsg.includes("neza") ? "1px solid #BBF7D0" : "1px solid #FEE2E2"
          }}>
            {otpResendMsg}
          </div>
        )}
        <form onSubmit={handleLoginOtp}>
          <div style={{marginBottom:18}}>
            <label className="lbl">Enter OTP Code</label>
            <input className="inp" placeholder="123456" value={code} onChange={e=>setCode(e.target.value)} maxLength="6" style={{textAlign:"center",fontSize:25,letterSpacing:8,fontWeight:800}}/>
          </div>
          <button className="btn btn-g" style={{width:"100%",padding:13,marginBottom:12}} disabled={busy}>{busy?t.authProcessing:"Verify & Login "}</button>
          <button 
            type="button" 
            onClick={handleResendOtp} 
            disabled={!canResend || otpResending}
            className="btn btn-o"
            style={{
              width:"100%",
              minHeight: 48,
              padding:13,
              marginBottom:12,
              opacity: !canResend || otpResending ? 0.5 : 1,
              cursor: !canResend || otpResending ? "not-allowed" : "pointer"
            }}
          >
            <span style={{ minWidth: "220px", display: "inline-block" }}>
              {otpResending 
                ? t.resendOtpSending 
                : (canResend ? t.resendOtp : <ResendCountdown key={countdownKey} initialSeconds={60} onComplete={() => setCanResend(true)} t={t} />)}
            </span>
          </button>
          <button type="button" onClick={()=>setStep("form")} style={{width:"100%",background:"none",border:"none",color:"#64748B",fontSize:16,cursor:"pointer"}}> Back</button>
        </form>
      </Card>
    );
  }

  //  Forgot password step 
  if (step === "forgot") return (
    <Card title={t.authForgotTitle} sub={t.authForgotSub}>
      <form onSubmit={handleForgot}>
        <div style={{marginBottom:18}}>
          <label className="lbl">{t.authPhoneEmail}</label>
          <input className="inp" placeholder={t.authEmailPh} value={f.email_phone} onChange={e=>setF({...f,email_phone:e.target.value})}/>
        </div>
        <button className="btn btn-g" style={{width:"100%",padding:13,marginBottom:12}} disabled={busy}>{busy?t.authProcessing:t.authResetBtn}</button>
        <button type="button" onClick={()=>setStep("form")} style={{width:"100%",background:"none",border:"none",color:"#64748B",fontSize:16,cursor:"pointer"}}> Back</button>
      </form>
    </Card>
  );

  //  Reset password step 
  if (step === "reset") return (
    <Card title={t.authForgotTitle} sub={`Code sent to ${verifyEmail}`}>
      <form onSubmit={handleReset}>
        <div style={{marginBottom:14}}>
          <label className="lbl">{t.authCode}</label>
          <input className="inp" placeholder="123456" value={code} onChange={e=>setCode(e.target.value)} maxLength="6"/>
        </div>
        <div style={{marginBottom:18}}>
          <label className="lbl">{t.authNewPass}</label>
          <input className="inp" type="password" placeholder="New password" value={newPass} onChange={e=>setNewPass(e.target.value)}/>
        </div>
        <button className="btn btn-g" style={{width:"100%",padding:13,marginBottom:12}} disabled={busy}>{busy?t.authProcessing:t.authResetDone}</button>
      </form>
    </Card>
  );

  //  Main form 
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F0F6FF",padding:"40px 20px"}}>
      <div className="card pop" style={{maxWidth:460,width:"100%",padding:40}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,background:"linear-gradient(135deg,#2563EB,#1E40AF)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"#fff",fontSize:28,fontWeight:800}}>RH</div>
          <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:27,color:"#0F172A",marginBottom:6}}>{login?t.authWelcome:t.authJoin}</h2>
          <p style={{color:"#64748B",fontSize:17}}>{login?t.authSignIn:t.authCreate}</p>
        </div>
        {err && <div style={{background:"#FEF2F2",color:"#DC2626",borderRadius:10,padding:"12px 14px",fontSize:16,marginBottom:18,border:"1px solid #FEE2E2"}}>{err}</div>}
        <form onSubmit={submit}>
          {!login && (
            <div style={{marginBottom:16}}>
              <label className="lbl">{t.authName}</label>
              <input className="inp" placeholder={t.authNamePh} value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
            </div>
          )}
          <div style={{marginBottom:16}}>
            <label className="lbl">{t.authPhoneEmail}</label>
            <input className="inp" placeholder={t.authEmailPh} value={f.email_phone} onChange={e=>setF({...f,email_phone:e.target.value})}/>
          </div>
          {login && (
            <div style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <label className="lbl" style={{marginBottom:0}}>{t.authPassword}</label>
                <button type="button" onClick={()=>setStep("forgot")} style={{background:"none",border:"none",color:"#2563EB",fontSize:15,fontWeight:600,cursor:"pointer"}}>{t.authForgot}</button>
              </div>
              <input className="inp" type="password" placeholder={t.authPassPh} value={f.password||""} onChange={e=>setF({...f,password:e.target.value})}/>
              <div style={{marginTop:8,fontSize:14,color:"#64748B",display:"flex",alignItems:"center",gap:6}}>
                <span></span>
                <span>{lang==="rw"?"Ijambobanga riri muri imeyili yawe":"Check your email for password"}</span>
              </div>
            </div>
          )}
          {!login && (
            <div style={{background:"#EFF6FF",borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:16,color:"#1E40AF",border:"1px solid #BFDBFE"}}>
              {lang==="rw"?"Ijambobanga rizakohererezwa kuri imeyili yawe nyuma yo kwiyandikisha.":"A secure password will be sent to your email after signup."}
            </div>
          )}
          <button className="btn btn-g" style={{width:"100%",padding:14,fontSize:18,marginBottom:20}} disabled={busy}>
            {busy?t.authProcessing:(login?t.authBtnLogin:t.authBtnSignup)}
          </button>
          <div style={{textAlign:"center",fontSize:17,color:"#64748B"}}>
            {login?t.authNoAcc:t.authHaveAcc}
            <button type="button" onClick={()=>go(login?"signup":"login")} style={{background:"none",border:"none",color:"#2563EB",fontWeight:800,cursor:"pointer",marginLeft:4,textDecoration:"underline",fontSize:19}}>
              {login?t.authSignUpFree:t.authLoginLink}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//  PREDICT 
function Predict({ user, token, go, setResults, t, lang }) {
  const [busy, setBusy] = useState(false);
  const [errs, setErrs] = useState({});
  const [toast, setToast] = useState("");
  const [otherSkillText, setOtherSkillText] = useState("");
  const [form, setForm] = useState(() => {
    // Calculate age from birthday if available
    let age = "";
    if (user.birthday) {
      const birth = new Date(user.birthday);
      const today = new Date();
      age = String(today.getFullYear() - birth.getFullYear() - (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0));
    }
    return {
      name: user.name,
      age,
      skills: [],
      capital: "",
      location: user.location || "Gasabo",
      sector: user.sector || "",
      hoursPerDay: "",
      education_level: user.education_level || user.degree || "",
      gender: user.gender || "",
      hasDisability: "No disability",
      disabilityType: "",
      hasSmartphone: "Yes",
      employment_status: user.employment_status || "Unemployed",
      job_specify: user.job_specify || "",
      language: user.language || lang
    };
  });
  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:""}));};

  const showToast=(msg)=>{ setToast(msg); setTimeout(()=>setToast(""),3500); };

  const EN_SKILLS = ["Technology / IT","Teaching / Education","Cooking / Food","Sewing / Fashion","Driving / Transport","Agriculture / Farming","Beauty / Hairdressing","Business / Finance","Photography / Media","Construction / Trades","Events / Tourism","Crafts / Art","Other","None of the above"];
  
  const toggleSkill=(enKey)=>{
    if(enKey==="None of the above"){
      set("skills", form.skills.includes("None of the above") ? [] : ["None of the above"]);
      setOtherSkillText("");
      return;
    }
    const without = form.skills.filter(s=>s!=="None of the above" && s!=="Other");
    const others = form.skills.filter(s=>s==="Other");
    const isSelected = form.skills.includes(enKey);
    
    if(isSelected) {
      set("skills", form.skills.filter(s=>s!==enKey));
      if(enKey==="Other") setOtherSkillText("");
    } else {
      set("skills", [...form.skills.filter(s=>s!=="Other"), enKey]);
    }
  };

  const validate=()=>{
    const e={};
    if(!form.name.trim())e.name=t.errName;
    if(!form.age||+form.age<14||+form.age>80)e.age=t.errAge;
    if(form.skills.length===0)e.skills=t.errSkills;
    if(form.skills.includes("Other") && !otherSkillText.trim()) e.otherSkill = t.errSkills;
    if(!form.capital||+form.capital<0)e.capital=t.errCapital;
    if(!form.hoursPerDay || +form.hoursPerDay < 0 || +form.hoursPerDay > 24) e.hoursPerDay = t.errHours;
    if((form.hasDisability==="Other" || form.hasDisability==="Ibindi") && !form.disabilityType.trim()) e.disabilityType = t.errDisabilityType;
    if(Object.keys(e).length){
      const first=Object.values(e)[0];
      showToast(""+first);
    }
    setErrs(e); return !Object.keys(e).length;
  };

  const run = async () => {
    if (!validate()) return;
    setBusy(true);
    
    let finalSkills = [...form.skills];
    if (finalSkills.includes("Other") && otherSkillText) {
      finalSkills = finalSkills.map(s => s === "Other" ? `Other: ${otherSkillText}` : s);
    }
    
    const submissionData = { ...form, skills: finalSkills };

    try {
      const prediction = mlPredict(submissionData);
      const localResults = { 
        ...prediction, 
        userInput: { ...submissionData }, 
        date: new Date().toISOString() 
      };
      setResults(localResults);
      
      const r = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(submissionData)
      });
      
      if (r.ok) {
        const data = await r.json();
        console.log("[DEBUG] Backend prediction response:", data);
        const backendResults = {
          ...localResults,
          level: data.prediction?.label || localResults.level,
          prob: data.prediction?.overall_score || localResults.prob,
          top3: data.top_3_businesses.map((res, i) => ({
            rank: i + 1,
            name: res.name,
            category: res.category,
            matchPct: res.match_pct || (90 - i * 5),
            avgProfit: res.avg_profit,
            avgCapital: res.avg_capital,
            avgRevenue: res.avg_revenue,
            avgScore: res.avg_score,
            avgHrs: res.avg_hours_per_week,
            icon: ICONS[res.category] || "",
            color: COLORS[res.category] || "#334155"
          }))
        };
        setResults(backendResults);
        console.log("[DEBUG] Prediction saved to database successfully");
      } else {
        console.error("[DEBUG] Failed to save prediction:", r.status);
      }
    } catch (e) {
      console.error("Prediction Error:", e);
    } finally {
      setBusy(false);
    }
  };

  const E=({k})=>errs[k]?<div style={{color:"#DC2626",fontSize:15,marginTop:5}}>{errs[k]}</div>:null;
  const sec=(n,title,children)=>(
    <div style={{borderBottom:"1px solid #DBEAFE",paddingBottom:26,marginBottom:26}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#2563EB,#1E40AF)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:16}}>{n}</div>
        <h3 style={{fontWeight:700,color:"#0F172A",fontSize:18}}>{title}</h3>
      </div>
      {children}
    </div>
  );

  const LANGS = [
    { k: "rw", l: t.prefLangRw },
    { k: "en", l: t.prefLangEn },
    { k: "fr", l: t.prefLangFr },
    { k: "sw", l: t.prefLangSw },
    { k: "cn", l: t.prefLangCn },
    { k: "de", l: t.prefLangDe }
  ];

  const toggleLang = (k) => {
    const cur = Array.isArray(form.language) ? form.language : [form.language];
    if (cur.includes(k)) set("language", cur.filter(x => x !== k));
    else set("language", [...cur, k]);
  };

  const skillLabels = t.skills;

  // Function to download sector hustles as formatted document
  const downloadSectorHustlesPDF = () => {
    if (!form.sector || !form.location) return;
    
    const hustles = getSectorHustles(form.sector);
    const title = lang === "rw" 
      ? `Amakorwa Akunda Gukorwa muri ${form.sector}, ${form.location}` 
      : `Popular Businesses in ${form.sector}, ${form.location}`;
    
    // Create formatted HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { 
      font-family: 'Arial', 'Segoe UI', sans-serif; 
      max-width: 800px; 
      margin: 40px auto; 
      padding: 30px;
      line-height: 1.6;
      color: #1F2937;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #16A34A;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 { 
      color: #15803D; 
      font-size: 28px; 
      margin-bottom: 10px;
      font-weight: 700;
    }
    .subtitle {
      color: #6B7280;
      font-size: 16px;
    }
    .info-box {
      background: #F0FDF4;
      border-left: 4px solid #16A34A;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 6px;
    }
    .business-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin: 25px 0;
    }
    .business-item {
      background: #fff;
      border: 2px solid #BBF7D0;
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .business-number {
      background: #16A34A;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }
    .business-name {
      color: #15803D;
      font-weight: 600;
      font-size: 15px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #E5E7EB;
      text-align: center;
      color: #6B7280;
      font-size: 14px;
    }
    .note {
      background: #FEF3C7;
      border-left: 4px solid #F59E0B;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 6px;
      color: #92400E;
    }
    @media print {
      body { margin: 0; padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1> ${title}</h1>
    <div class="subtitle">
      ${lang === "rw" ? "Urutonde rw'Amahirwe y'Ubucuruzi" : "Business Opportunities Guide"}
    </div>
  </div>

  <div class="info-box">
    <strong>${lang === "rw" ? " Aho:" : " Location:"}</strong> ${form.sector}, ${form.location}<br>
    <strong>${lang === "rw" ? " Itariki:" : " Date:"}</strong> ${new Date().toLocaleDateString(lang === "rw" ? 'rw-RW' : 'en-RW', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}<br>
    <strong>${lang === "rw" ? " Umubare w'Amakorwa:" : " Total Opportunities:"}</strong> ${hustles.length}
  </div>

  <h2 style="color: #15803D; margin-top: 30px; margin-bottom: 20px;">
    ${lang === "rw" ? "Amakorwa Yakugenewe:" : "Recommended Businesses:"}
  </h2>

  <div class="business-grid">
    ${hustles.map((hustle, idx) => `
      <div class="business-item">
        <div class="business-number">${idx + 1}</div>
        <div class="business-name">${hustle}</div>
      </div>
    `).join('')}
  </div>

  <div class="note">
    <strong>${lang === "rw" ? " Icyitonderwa:" : " Note:"}</strong><br>
    ${lang === "rw" 
      ? "Izi ni amakorwa akunda gukorwa cyane muri uyu murenge. Hitamo rimwe rikubereye ukurikije ubumenyi, imari ufite, n'amasaha ufite buri munsi. Shaka inama z'inzobere mbere yo gutangira ubucuruzi ubwo ari bwo bwose."
      : "These are popular business opportunities in this sector. Choose one that matches your skills, capital, and available time. Seek expert advice before starting any business venture."}
  </div>

  <div class="footer">
    <strong>RwandaHustle.rw</strong><br>
    ${lang === "rw" ? "Gufasha Abanyarwanda Kubona Akazi Gacye Kakwiriye" : "Helping Rwandans Find the Right Side Hustle"}<br>
    <a href="https://rwandahustle.rw" style="color: #16A34A;">www.rwandahustle.rw</a>
  </div>
</body>
</html>
    `.trim();
    
    // Open in new window for printing/downloading as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Trigger print dialog after content loads
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 250);
    }
    
    showToast(lang === "rw" ? "Kanda Ctrl+P kugira ngo usave nka PDF " : "Press Ctrl+P to save as PDF ");
  };

  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F0F6FF"}}>
      <div style={{maxWidth:680,margin:"0 auto",padding:"36px 20px"}}>
        {toast&&<div className="toast-warn">{toast}</div>}
        <div className="u1" style={{marginBottom:28}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",borderRadius:100,padding:"6px 16px",fontSize:15,color:"#1E40AF",fontWeight:600,marginBottom:12}}>{t.predictBadge}</div>
          <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:31,color:"#0F172A",marginBottom:6}}>{t.predictTitle}</h1>
          <p style={{color:"#475569",fontSize:17}}>{t.predictSub}</p>
        </div>
        <div className="card u2" style={{padding:30}}>

          {sec("2",t.sec2,
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
                <div>
                  <label className="lbl">{t.fAge}</label>
                  <input className="inp" type="number" placeholder={t.fAgePh} min="14" max="80" value={form.age} onChange={e=>set("age",e.target.value)}/>
                  <E k="age"/>
                </div>
                <div>
                  <label className="lbl">{t.fDistrict}</label>
                  <select className="sel" value={form.location} onChange={e=>{set("location",e.target.value); set("sector","");}}>
                    {LOCS.map(l=><option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="lbl">{t.fSector}</label>
                  <select className="sel" value={form.sector} onChange={e=>set("sector",e.target.value)} disabled={!form.location}>
                    <option value="">{t.fSelectSector}</option>
                    {form.location && RWANDA_SECTORS[form.location] && RWANDA_SECTORS[form.location].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              
              {/* Display sector hustles - HIDDEN */}
              {false && form.sector && (
                <div style={{background:"#F0FDF4",border:"1.5px solid #BBF7D0",borderRadius:12,padding:16,marginBottom:24}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#15803D",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span></span> {lang === "rw" ? "Amakorwa Akunda Gukorwa muri" : "Popular Businesses in"} {form.sector}
                    </div>
                    <button 
                      type="button"
                      onClick={downloadSectorHustlesPDF}
                      style={{
                        background:"#16A34A",
                        color:"#fff",
                        border:"none",
                        borderRadius:8,
                        padding:"6px 14px",
                        fontSize:13,
                        fontWeight:600,
                        cursor:"pointer",
                        display:"flex",
                        alignItems:"center",
                        gap:6,
                        transition:"all 0.2s"
                      }}
                      onMouseOver={e => e.target.style.background = "#15803D"}
                      onMouseOut={e => e.target.style.background = "#16A34A"}
                    >
                      <span></span> {lang === "rw" ? "Kuramo" : "Download"}
                    </button>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {getSectorHustles(form.sector).map((hustle, idx) => (
                      <span key={idx} style={{background:"#fff",color:"#15803D",borderRadius:8,padding:"6px 12px",fontSize:14,fontWeight:500,border:"1px solid #BBF7D0"}}>
                        {hustle}
                      </span>
                    ))}
                  </div>
                  <div style={{fontSize:13,color:"#16A34A",marginTop:10,fontStyle:"italic"}}>
                    {lang === "rw" ? "Izi ni amakorwa akunda gukorwa cyane muri uwo murenge. Kanda 'Kuramo' kugira ngo ubibone kuri mudasobwa yawe." : "These are common business opportunities in this sector. Click 'Download' to save this list to your device."}
                  </div>
                </div>
              )}
              
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:14,marginBottom:24}}>
                <div>
                  <label className="lbl">Gender *</label>
                  <select className="sel" value={form.gender||"Male"} onChange={e=>set("gender",e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              
              <div style={{marginBottom:24}}>
                <label className="lbl">{t.prefLang}</label>
                <div style={{display:"flex", flexWrap:"wrap", gap:8}}>
                  {LANGS.map(lang => {
                    const isActive = Array.isArray(form.language) ? form.language.includes(lang.k) : form.language === lang.k;
                    return (
                      <button key={lang.k} type="button" className={`chip ${isActive ? "on" : ""}`} onClick={() => toggleLang(lang.k)} style={{fontSize:15, padding:"8px 12px"}}>
                        {isActive && <span style={{marginRight:4}}></span>} {lang.l}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <div>
                  <label className="lbl">{t.fEduLevel}</label>
                  <select className="sel" value={form.education_level||"Secondary"} onChange={e=>set("education_level",e.target.value)}>
                    {["Primary","Secondary","Vocational","University","Bachelor","Master","Degree/PHD","Other"].map(l=>(
                      <option key={l} value={l}>{t.eduLabels?.[l]||l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="lbl">{t.jobStatus}</label>
                  <select className="sel" value={form.employment_status||"Unemployed"} onChange={e=>set("employment_status",e.target.value)}>
                    {["Employed","Self-employed","Student","Unemployed","Other"].map(s=>(
                      <option key={s} value={s}>{t.jobLabels?.[s]||s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {form.education_level==="Other"&&(
                <div style={{marginBottom:20}}>
                  <label className="lbl">{lang === "rw" ? "Sobanura Amashuri Wize" : "Specify Education Level"}</label>
                  <input className="inp" placeholder={lang === "rw" ? "Andika amashuri wize..." : "Please specify your education level..."} value={form.education_other||""} onChange={e=>set("education_other",e.target.value)}/>
                </div>
              )}
              {form.employment_status==="Employed"&&(
                <div style={{marginBottom:20}}>
                  <label className="lbl">Current Job Title</label>
                  <input className="inp" placeholder="e.g. Teacher, Nurse, Engineer..." value={form.job_specify} onChange={e=>set("job_specify",e.target.value)}/>
                </div>
              )}
              {form.employment_status==="Self-employed"&&(
                <div style={{marginBottom:20}}>
                  {/* Current Business field removed */}
                </div>
              )}
              {form.employment_status==="Student"&&(
                <div style={{marginBottom:20}}>
                  <label className="lbl">School / Field of Study</label>
                  <input className="inp" placeholder="e.g. UR — Computer Science, IPRC — Electrical..." value={form.job_specify} onChange={e=>set("job_specify",e.target.value)}/>
                </div>
              )}
              {form.employment_status==="Other"&&(
                <div style={{marginBottom:20}}>
                  <label className="lbl">Please Specify</label>
                  <input className="inp" placeholder="Describe your current situation..." value={form.job_specify} onChange={e=>set("job_specify",e.target.value)}/>
                </div>
              )}
            </>
          )}
          {sec("3",t.sec3,
            <>
              <p style={{color:"#475569",fontSize:16,marginBottom:14}}>{t.skillNote}</p>
              <div style={{display:"flex", flexWrap:"wrap", gap:10, marginBottom:16}}>
                {EN_SKILLS.map((enKey, i) => {
                  const isActive = form.skills.includes(enKey);
                  return (
                    <button
                      key={enKey}
                      type="button"
                      className={`chip ${isActive ? "on" : ""}`}
                      style={{
                        padding: "10px 16px",
                        fontSize:"16px",
                        borderRadius: "12px",
                        transition: "all 0.2s",
                        flex: "1 1 auto",
                        justifyContent: "center",
                        minWidth: "140px"
                      }}
                      onClick={() => toggleSkill(enKey)}
                    >
                      {isActive && <span style={{marginRight: 6}}></span>}
                      {t.skills[i]}
                    </button>
                  );
                })}
              </div>
              <E k="skills"/>
              {form.skills.includes("Other") && (
                <div style={{marginBottom:16}} className="pop">
                  <label className="lbl" style={{color:"#2563EB"}}>{t.otherSkill}</label>
                  <input className="inp" style={{borderColor:"#2563EB",background:"#F8FAFF", boxShadow:"0 0 0 3px rgba(37,99,235,0.1)"}} placeholder={t.otherSkillPh} value={otherSkillText} onChange={e=>setOtherSkillText(e.target.value)}/>
                  <E k="otherSkill"/>
                </div>
              )}
              {form.skills.length>0&&(
                <div style={{marginTop:10,fontSize:16,color:"#2563EB",fontWeight:600,background:"#EFF6FF",borderRadius:10,padding:"10px 14px", border:"1px solid #BFDBFE"}}>
                  {t.selectedSkills} {form.skills.map(k=> k === "Other" ? (otherSkillText || t.skills[EN_SKILLS.indexOf(k)]) : t.skills[EN_SKILLS.indexOf(k)]).filter(Boolean).join(" · ")}
                </div>
              )}
            </>
          )}
          {sec("4",t.sec4,
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label className="lbl">{t.fCapital}</label>
                <input className="inp" type="number" placeholder={t.fCapitalPh} min="0" value={form.capital} onChange={e=>set("capital",e.target.value)}/>
                <E k="capital"/>
                {form.capital&&<div style={{fontSize:14,color:"#64748B",marginTop:4}}>≈ ${Math.round(+form.capital/1200)} USD</div>}
              </div>
              <div>
                <label className="lbl">{t.fHours}</label>
                <input className="inp" type="number" placeholder={t.fHoursPh} min="0" max="24" step="0.5" value={form.hoursPerDay} onChange={e=>set("hoursPerDay",e.target.value)}/>
                <E k="hoursPerDay"/>
                {form.hoursPerDay !== "" && <div style={{fontSize:14,color:"#64748B",marginTop:4}}>= {Math.round(+form.hoursPerDay*7)} {t.fHoursHint}</div>}
              </div>
            </div>
          )}
          {sec("5", t.fDisability,
            <div>
              <select 
                className="sel" 
                value={form.hasDisability || "No disability"} 
                onChange={e => {
                  const val = e.target.value;
                  set("hasDisability", val);
                  // Clear disability type if "No disability" is selected
                  if (val === "No disability" || val === "Nta bumuga") {
                    set("disabilityType", "");
                  } else if (val !== "Other" && val !== "Ibindi") {
                    // Auto-fill disabilityType with the selected option
                    set("disabilityType", val);
                  }
                }}
              >
                {(t.fDisabilityOptions || ["No disability", "Visual impairment", "Hearing impairment", "Mobility impairment", "Cognitive disability", "Other"]).map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {(form.hasDisability === "Other" || form.hasDisability === "Ibindi") && (
                <div style={{marginTop:12}}>
                  <label className="lbl">{t.fDisabilityType}</label>
                  <input 
                    className="inp" 
                    placeholder={t.fDisabilityTypePh} 
                    value={form.disabilityType} 
                    onChange={e=>set("disabilityType",e.target.value)}
                  />
                  <E k="disabilityType"/>
                </div>
              )}
            </div>
          )}
          {sec("6", t.fSmartphone,
            <div style={{display:"flex", gap:12}}>
              <button type="button" className={`chip ${form.hasSmartphone==="Yes"?"on":""}`} onClick={()=>set("hasSmartphone","Yes")}>{t.fYes}</button>
              <button type="button" className={`chip ${form.hasSmartphone==="No"?"on":""}`} onClick={()=>set("hasSmartphone","No")}>{t.fNo}</button>
            </div>
          )}
          {/* Preview */}
          {(form.name||form.capital)&&(
            <div style={{background:"#F8FAFC",border:"1.5px solid #E2E8F0",borderRadius:12,padding:14,marginBottom:20}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1E40AF",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{t.previewLabel}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,fontSize:15,color:"#475569"}}>
                {form.name&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}>{form.name}</span>}
                {form.age&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}>{form.age}</span>}
                {form.location&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}>{form.location}</span>}
                {form.sector&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}> {form.sector}</span>}
                {form.capital&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}>{(+form.capital).toLocaleString()} RWF</span>}
                {form.hoursPerDay&&<span style={{background:"#fff",borderRadius:6,padding:"3px 8px",border:"1px solid #E2E8F0"}}> {form.hoursPerDay} hrs</span>}
              </div>
            </div>
          )}
          <button className="btn btn-g" style={{width:"100%",padding:14,fontSize:18,opacity:busy?.8:1}} onClick={run} disabled={busy}>
            {busy
              ?<span style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center"}}><span style={{width:16,height:16,border:"2px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .8s linear infinite",display:"inline-block"}}/>{t.submitLoading}</span>
              :t.submitBtn}
          </button>
          <div style={{textAlign:"center",marginTop:8,fontSize:14,color:"#94A3B8"}}>{t.submitHint}</div>
        </div>
      </div>
    </div>
  );
}

//  RESULTS 
const MEDALS = ["","",""];
function Gauge({ pct, color }) {
  const arc=(pct/100)*Math.PI, r=52;
  const x1=65-r*Math.cos(Math.PI), y1=68;
  const x2=65-r*Math.cos(Math.PI-arc), y2=68-r*Math.sin(Math.PI-arc);
  const lg=arc>Math.PI?1:0;
  return (
    <svg width={130} height={72} viewBox="0 0 130 72">
      <path d={`M 13 68 A ${r} ${r} 0 0 1 117 68`} fill="none" stroke="#F1F5F9" strokeWidth={10} strokeLinecap="round"/>
      {pct>0&&<path d={`M ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round"/>}
      <text x="65" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill={color} fontFamily="'Sora',sans-serif">{pct}%</text>
    </svg>
  );
}

//  EDIT PROFILE COMPONENT 
function EditProfile({ user, token, API_URL, onSave, onSkip }) {
  const EDU = ["Primary","Secondary","Vocational","University","Bachelor","Master","Degree/PHD","Other"];
  const EMP = ["Employed","Self-employed","Student","Unemployed","Other"];
  const LANGS = [
    { code: "en", label: "English" },
    { code: "rw", label: "Kinyarwanda" },
    { code: "fr", label: "French" },
    { code: "sw", label: "Swahili" }
  ];
  
  // Use global LOCS and RWANDA_SECTORS (defined at top of file)
  // If not available, create local copy
  const districts = typeof LOCS !== 'undefined' ? LOCS : [
    "Bugesera","Burera","Gakenke","Gasabo","Gatsibo","Gicumbi","Gisagara","Huye","Kamonyi","Karongi",
    "Kayonza","Kicukiro","Kirehe","Muhanga","Musanze","Ngoma","Ngororero",
    "Nyabihu","Nyagatare","Nyamagabe","Nyamasheke","Nyanza","Nyarugenge","Nyaruguru","Rubavu","Ruhango","Rulindo",
    "Rusizi","Rutsiro","Rwamagana"
  ];
  
  const [form, setForm] = useState({ 
    name: user?.name || "", 
    location: user?.location || "",
    sector: user?.sector || "",
    birthday: user?.birthday || "", 
    education_level: user?.education_level || "", 
    employment_status: user?.employment_status || "", 
    gender: user?.gender || "",
    language: user?.language || "en"
  });
  const [passForm, setPassForm] = useState({ old_password:"", new_password:"", confirm:"" });
  const [tab, setTab] = useState("profile");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const saveProfile = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    if (!form.name.trim()) { setErr("Name is required"); return; }
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/api/user/profile`, { method:"PUT", headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`}, body:JSON.stringify(form) });
      const d = await r.json();
      if (d.error) { setErr(d.error); setBusy(false); return; }
      setMsg("Profile saved!");
      setTimeout(() => onSave(d.user), 800);
    } catch { setErr("Could not save. Please try again."); }
    setBusy(false);
  };

  const savePassword = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    if (!passForm.old_password || !passForm.new_password) { setErr("Fill all fields"); return; }
    if (passForm.new_password !== passForm.confirm) { setErr("Passwords do not match"); return; }
    if (passForm.new_password.length < 6) { setErr("Password must be at least 6 characters"); return; }
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/api/user/change-password`, { method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`}, body:JSON.stringify({old_password:passForm.old_password,new_password:passForm.new_password}) });
      const d = await r.json();
      if (d.error) { setErr(d.error); setBusy(false); return; }
      setMsg("Password changed successfully!");
      setPassForm({ old_password:"", new_password:"", confirm:"" });
    } catch { setErr("Could not change password."); }
    setBusy(false);
  };

  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F0F6FF",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 20px 40px"}}>
      <div style={{maxWidth:560,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#1E40AF)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:37}}></div>
          <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:27,color:"#0F172A",marginBottom:6}}>Complete Your Profile</h1>
          <p style={{color:"#64748B",fontSize:17}}>Add your details to get better recommendations</p>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20,background:"#fff",borderRadius:12,padding:6,border:"1px solid #E2E8F0"}}>
          {[["profile","Profile"],["password","Change Password"]].map(([k,l])=>(
            <button key={k} onClick={()=>{setTab(k);setErr("");setMsg("");}} style={{flex:1,padding:"10px",borderRadius:8,border:"none",fontWeight:700,fontSize:16,cursor:"pointer",background:tab===k?"linear-gradient(135deg,#2563EB,#1E40AF)":"transparent",color:tab===k?"#fff":"#64748B"}}>{l}</button>
          ))}
        </div>
        <div className="card" style={{padding:28}}>
          {msg && <div style={{background:"#F0FDF4",color:"#16A34A",borderRadius:10,padding:"12px 14px",fontSize:16,marginBottom:16,border:"1px solid #BBF7D0",fontWeight:600}}>{msg}</div>}
          {err && <div style={{background:"#FEF2F2",color:"#DC2626",borderRadius:10,padding:"12px 14px",fontSize:16,marginBottom:16,border:"1px solid #FECACA"}}>{err}</div>}
          {tab==="profile" && (
            <form onSubmit={saveProfile}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div style={{gridColumn:"1/-1"}}><label className="lbl">Full Name *</label><input className="inp" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name"/></div>
                <div><label className="lbl">District / Location</label><select className="sel" value={form.location||"Gasabo"} onChange={e=>setForm({...form,location:e.target.value,sector:""})}>{districts.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="lbl">Sector / Umurenge</label><select className="sel" value={form.sector||""} onChange={e=>setForm({...form,sector:e.target.value})}><option value="">Select sector</option>{form.location && RWANDA_SECTORS[form.location] && RWANDA_SECTORS[form.location].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="lbl">Date of Birth</label><input className="inp" type="date" value={form.birthday} onChange={e=>setForm({...form,birthday:e.target.value})}/></div>
                <div><label className="lbl">Education Level</label><select className="sel" value={form.education_level||"Secondary"} onChange={e=>setForm({...form,education_level:e.target.value})}>{EDU.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="lbl">Employment Status</label><select className="sel" value={form.employment_status||"Unemployed"} onChange={e=>setForm({...form,employment_status:e.target.value})}>{EMP.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="lbl">Gender</label><select className="sel" value={form.gender||"Male"} onChange={e=>setForm({...form,gender:e.target.value})}><option value="Male">Male</option><option value="Female">Female</option></select></div>
                <div><label className="lbl">Preferred Language</label><select className="sel" value={form.language||"en"} onChange={e=>setForm({...form,language:e.target.value})}>{LANGS.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}</select></div>
              </div>
              <button className="btn btn-g" style={{width:"100%",padding:13,fontSize:18,marginBottom:10}} disabled={busy}>{busy?"Saving...":"Save & Continue"}</button>
            </form>
          )}
          {tab==="password" && (
            <form onSubmit={savePassword}>
              <div style={{marginBottom:14}}><label className="lbl">Current Password</label><input className="inp" type="password" placeholder="Your current password" value={passForm.old_password} onChange={e=>setPassForm({...passForm,old_password:e.target.value})}/></div>
              <div style={{marginBottom:14}}><label className="lbl">New Password</label><input className="inp" type="password" placeholder="New password (min 6 characters)" value={passForm.new_password} onChange={e=>setPassForm({...passForm,new_password:e.target.value})}/></div>
              <div style={{marginBottom:20}}><label className="lbl">Confirm New Password</label><input className="inp" type="password" placeholder="Repeat new password" value={passForm.confirm} onChange={e=>setPassForm({...passForm,confirm:e.target.value})}/></div>
              <button className="btn btn-g" style={{width:"100%",padding:13,fontSize:18,marginBottom:10}} disabled={busy}>{busy?"Changing...":"Change Password"}</button>
            </form>
          )}
          <button onClick={onSkip} style={{width:"100%",padding:11,background:"none",border:"1.5px solid #E2E8F0",borderRadius:10,color:"#64748B",fontWeight:600,fontSize:16,cursor:"pointer",marginTop:4}}>Skip for now </button>
        </div>
      </div>
    </div>
  );
}

//  BUSINESS PLAN COMPONENT 
function BusinessPlan({ plan, t, onBack, userInput, token, API_URL }) {
  const { hustle_name, category, kb_data, financials, swot, marketing_strategies,
          pricing_strategy, distribution_channels, customer_retention, operations_plan, generated_at } = plan;
  const fmt = (n) => Math.round(n).toLocaleString();
  const date = new Date(generated_at).toLocaleDateString('en-RW', { year:'numeric', month:'long', day:'numeric' });
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadDocx = async () => {
    setDownloading(true);
    try {
      // Try to get DOCX from backend first
      const r = await fetch(`${API_URL}/api/business-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ hustle_name, user_profile: userInput, format: 'docx' })
      });
      
      if (r.ok) {
        // Backend supports DOCX - download it
        const blob = await r.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BusinessPlan_${hustle_name.replace(/\s+/g,'_')}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        setDownloaded(true);
        setDownloading(false);
      } else {
        // Backend doesn't support DOCX - use browser print
        setDownloading(false);
        // Trigger browser print dialog which can save as PDF
        window.print();
        setDownloaded(true);
      }
    } catch(e) { 
      // Fallback to browser print
      setDownloading(false);
      window.print();
      setDownloaded(true);
    }
  };

  const Section = ({ icon, title, children }) => (
    <div style={{marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:"2px solid #EFF6FF"}}>
        <span style={{fontSize:23}}>{icon}</span>
        <h2 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:20,color:"#0F172A",margin:0}}>{title}</h2>
      </div>
      {children}
    </div>
  );

  const handlePrint = () => window.print();

  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F0F6FF"}}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{maxWidth:860,margin:"0 auto",padding:"24px 20px"}}>

        {/* Top bar */}
        <div className="no-print" style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={onBack} style={{padding:"10px 18px",background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:10,fontWeight:700,fontSize:16,cursor:"pointer",color:"#475569",display:"flex",alignItems:"center",gap:6}}>
            {t.bizPlanBack}
          </button>
          <button onClick={handleDownloadDocx} disabled={downloading}
            style={{padding:"10px 18px",background:downloaded?"#16A34A":"linear-gradient(135deg,#2563EB,#1E40AF)",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",gap:6,opacity:downloading?0.7:1}}>
            {downloading ? <><span style={{width:14,height:14,border:"2px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .8s linear infinite",display:"inline-block"}}/> Generating...</> : downloaded ? "Downloaded!" : t.bizPlanDownload}
          </button>
          {downloaded && (
            <span style={{fontSize:15,color:"#16A34A",fontWeight:600}}>File saved to your downloads folder</span>
          )}
        </div>

        <div className="card print-page" style={{padding:36}}>

          {/* Cover */}
          <div style={{textAlign:"center",marginBottom:36,paddingBottom:28,borderBottom:"2px solid #EFF6FF"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#EFF6FF",borderRadius:100,padding:"6px 18px",fontSize:15,color:"#1E40AF",fontWeight:700,marginBottom:16}}>
              {t.bizPlanTitle}
            </div>
            <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:900,fontSize:31,color:"#0F172A",marginBottom:8}}>{hustle_name}</h1>
            <div style={{display:"inline-block",background:"#2563EB",color:"#fff",padding:"4px 14px",borderRadius:100,fontSize:15,fontWeight:700,marginBottom:16}}>{category}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginTop:20}}>
              {[
                ["", "Entrepreneur", userInput?.name || "—"],
                ["", "Location", userInput?.location || "—"],
                ["", "Capital", `${fmt(financials.user_capital)} RWF`],
                ["", "Date", date],
                ["", "Success Rate", `${kb_data.success_rate}%`],
                ["", "Break-even", `${kb_data.avg_break_even} months`],
              ].map(([ic,lbl,val],i)=>(
                <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:"12px",border:"1px solid #E2E8F0"}}>
                  <div style={{fontSize:21,marginBottom:4}}>{ic}</div>
                  <div style={{fontSize:13,color:"#64748B",fontWeight:700,textTransform:"uppercase"}}>{lbl}</div>
                  <div style={{fontWeight:800,color:"#0F172A",fontSize:16}}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Executive Summary */}
          <Section icon="" title={t.bizPlanExec}>
            <p style={{color:"#475569",lineHeight:1.8,fontSize:17}}>
              This business plan outlines a comprehensive strategy for establishing and growing a <strong>{hustle_name}</strong> business in Rwanda.
              Based on analysis of {kb_data.count || "multiple"} similar businesses in our dataset, this venture has a <strong>{kb_data.success_rate}%</strong> historical success rate
              with an average monthly profit of <strong>{fmt(kb_data.avg_monthly_profit)} RWF</strong>.
              The business falls under the <strong>{category}</strong> sector and requires an estimated startup capital of <strong>{fmt(kb_data.avg_capital)} RWF</strong>.
              With the entrepreneur's available capital of <strong>{fmt(financials.user_capital)} RWF</strong>, the business is projected to break even within <strong>{kb_data.avg_break_even} months</strong>.
            </p>
          </Section>

          {/* 2. Business Description */}
          <Section icon="" title={t.bizPlanDesc}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                ["Business Type", hustle_name],
                ["Category", category],
                ["Required Skills", kb_data.skills_required || "General business skills"],
                ["Risk Level", kb_data.risk_level],
                ["Competition", kb_data.competition_level],
                ["Market Demand", kb_data.demand_level],
                ["Avg Hours/Week", `${kb_data.avg_hours_per_week} hrs`],
                ["Growth Rate", `${kb_data.avg_growth_rate}% per year`],
              ].map(([lbl,val],i)=>(
                <div key={i} style={{background:"#F8FAFC",borderRadius:8,padding:"10px 14px",border:"1px solid #E2E8F0"}}>
                  <div style={{fontSize:14,color:"#64748B",fontWeight:700,textTransform:"uppercase",marginBottom:3}}>{lbl}</div>
                  <div style={{fontWeight:700,color:"#0F172A",fontSize:16}}>{val}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 3. Market Analysis */}
          <Section icon="" title={t.bizPlanMarket}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
              {[
                ["Demand Level", kb_data.demand_level, kb_data.demand_level==="High"?"#16A34A":kb_data.demand_level==="Medium"?"#D97706":"#DC2626"],
                ["Competition", kb_data.competition_level, kb_data.competition_level==="Low"?"#16A34A":kb_data.competition_level==="Medium"?"#D97706":"#DC2626"],
                ["Risk Level", kb_data.risk_level, kb_data.risk_level==="Low"?"#16A34A":kb_data.risk_level==="Medium"?"#D97706":"#DC2626"],
              ].map(([lbl,val,col],i)=>(
                <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:16,border:`2px solid ${col}30`,textAlign:"center"}}>
                  <div style={{fontSize:14,color:"#64748B",fontWeight:700,textTransform:"uppercase",marginBottom:6}}>{lbl}</div>
                  <div style={{fontWeight:900,color:col,fontSize:21}}>{val}</div>
                </div>
              ))}
            </div>
            <p style={{color:"#475569",lineHeight:1.8,fontSize:17}}>
              The {hustle_name} market in Rwanda shows <strong>{kb_data.demand_level.toLowerCase()}</strong> demand with <strong>{kb_data.competition_level.toLowerCase()}</strong> competition.
              Located in <strong>{userInput?.location}</strong>, this business benefits from local market conditions.
              The sector has demonstrated a <strong>{kb_data.avg_growth_rate}%</strong> average annual growth rate, indicating a positive market trajectory.
            </p>
          </Section>

          {/* 4. Marketing Strategy */}
          <Section icon="" title={t.bizPlanMarketing}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {marketing_strategies.map((s,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",background:"#F8FAFC",borderRadius:8,padding:"10px 14px",border:"1px solid #E2E8F0"}}>
                  <div style={{width:24,height:24,borderRadius:6,background:"#2563EB",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:16,color:"#374151",lineHeight:1.6}}>{s}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 5. Operations Plan */}
          <Section icon="" title={t.bizPlanOps}>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {operations_plan.map((s,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",background:"#F8FAFC",borderRadius:8,padding:"10px 14px",border:"1px solid #E2E8F0"}}>
                  <div style={{width:24,height:24,borderRadius:6,background:"#0891B2",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:16,color:"#374151",lineHeight:1.6}}>{s}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* 6. Financial Plan */}
          <Section icon="" title={t.bizPlanFinance}>
            {/* Summary cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:20}}>
              {[
                ["","Startup Capital",`${fmt(financials.user_capital)} RWF`,"#2563EB"],
                ["","Monthly Revenue",`${fmt(financials.estimated_monthly_revenue)} RWF`,"#16A34A"],
                ["","Monthly Expenses",`${fmt(financials.estimated_monthly_expenses)} RWF`,"#DC2626"],
                ["","Monthly Profit",`${fmt(financials.estimated_monthly_profit)} RWF`,"#7C3AED"],
                ["","Profit Margin",`${kb_data.avg_profit_margin_pct}%`,"#D97706"],
                ["","Break-even",`${kb_data.avg_break_even} months`,"#0891B2"],
              ].map(([ic,lbl,val,col],i)=>(
                <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:"12px",border:`2px solid ${col}20`,textAlign:"center"}}>
                  <div style={{fontSize:23,marginBottom:4}}>{ic}</div>
                  <div style={{fontSize:13,color:"#64748B",fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{lbl}</div>
                  <div style={{fontWeight:900,color:col,fontSize:17}}>{val}</div>
                </div>
              ))}
            </div>

            {/* Monthly table */}
            <div style={{marginBottom:20}}>
              <h3 style={{fontWeight:700,fontSize:17,color:"#0F172A",marginBottom:10}}>{t.bizPlanMonthly}</h3>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:15}}>
                  <thead>
                    <tr style={{background:"#1E40AF",color:"#fff"}}>
                      {[t.bizPlanMonth,t.bizPlanRevenue,t.bizPlanExpenses,t.bizPlanProfit].map((h,i)=>(
                        <th key={i} style={{padding:"8px 12px",textAlign:i===0?"center":"right",fontWeight:700}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {financials.monthly_projections.map((m,i)=>(
                      <tr key={i} style={{background:i%2===0?"#F8FAFC":"#fff",borderBottom:"1px solid #E2E8F0"}}>
                        <td style={{padding:"7px 12px",textAlign:"center",fontWeight:700,color:"#1E40AF"}}>M{m.month}</td>
                        <td style={{padding:"7px 12px",textAlign:"right",color:"#16A34A",fontWeight:600}}>{fmt(m.revenue)}</td>
                        <td style={{padding:"7px 12px",textAlign:"right",color:"#DC2626",fontWeight:600}}>{fmt(m.expenses)}</td>
                        <td style={{padding:"7px 12px",textAlign:"right",color:"#7C3AED",fontWeight:700}}>{fmt(m.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3-year forecast */}
            <div>
              <h3 style={{fontWeight:700,fontSize:17,color:"#0F172A",marginBottom:10}}>{t.bizPlanYearly}</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {financials.yearly_projections.map((y,i)=>(
                  <div key={i} style={{background:i===0?"#EFF6FF":i===1?"#F0FDF4":"#FAF5FF",borderRadius:12,padding:16,border:`2px solid ${i===0?"#BFDBFE":i===1?"#BBF7D0":"#E9D5FF"}`,textAlign:"center"}}>
                    <div style={{fontWeight:800,color:i===0?"#1E40AF":i===1?"#15803D":"#6D28D9",fontSize:19,marginBottom:8}}>{t.bizPlanYear} {y.year}</div>
                    <div style={{fontSize:14,color:"#64748B",fontWeight:700,marginBottom:2}}>REVENUE</div>
                    <div style={{fontWeight:800,color:"#0F172A",fontSize:17,marginBottom:8}}>{fmt(y.revenue)} RWF</div>
                    <div style={{fontSize:14,color:"#64748B",fontWeight:700,marginBottom:2}}>PROFIT</div>
                    <div style={{fontWeight:800,color:i===0?"#1E40AF":i===1?"#15803D":"#6D28D9",fontSize:17}}>{fmt(y.profit)} RWF</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 7. SWOT */}
          <Section icon="" title={t.bizPlanSwot}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                [t.bizPlanStrengths, swot.strengths, "#16A34A", "#F0FDF4", "#BBF7D0"],
                [t.bizPlanWeaknesses, swot.weaknesses, "#DC2626", "#FEF2F2", "#FECACA"],
                [t.bizPlanOpps, swot.opportunities, "#2563EB", "#EFF6FF", "#BFDBFE"],
                [t.bizPlanThreats, swot.threats, "#D97706", "#FFFBEB", "#FDE68A"],
              ].map(([title, items, col, bg, border],i)=>(
                <div key={i} style={{background:bg,borderRadius:12,padding:16,border:`1.5px solid ${border}`}}>
                  <div style={{fontWeight:800,color:col,fontSize:16,marginBottom:10,textTransform:"uppercase",letterSpacing:.5}}>{title}</div>
                  {(Array.isArray(items) ? items : String(items).split(';')).map((item,j)=>(
                    <div key={j} style={{display:"flex",gap:8,marginBottom:6,fontSize:15,color:"#374151",lineHeight:1.5}}>
                      <span style={{color:col,fontWeight:800,flexShrink:0}}>•</span>
                      <span>{item.trim()}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          {/* 8. Risk Assessment */}
          <Section icon="" title={t.bizPlanRisk}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {risk:"Market Competition", level:kb_data.competition_level, mitigation:"Differentiate through quality and customer service. Build loyal repeat customers."},
                {risk:"Capital Shortage", level:+financials.user_capital < kb_data.avg_capital ? "High" : "Low", mitigation:"Apply for BRD loan or Umurenge SACCO credit. Start small and reinvest profits."},
                {risk:"Seasonal Demand", level:"Medium", mitigation:"Diversify product/service offerings. Build savings during peak seasons."},
                {risk:"Operational Risk", level:kb_data.risk_level, mitigation:"Maintain an emergency fund of 3 months expenses. Get business insurance if available."},
              ].map((r,i)=>{
                const col = r.level==="High"?"#DC2626":r.level==="Low"?"#16A34A":"#D97706";
                return (
                  <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:14,border:"1px solid #E2E8F0"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:16,color:"#0F172A"}}>{r.risk}</div>
                      <span style={{background:`${col}15`,color:col,padding:"2px 10px",borderRadius:100,fontSize:14,fontWeight:700}}>{r.level}</span>
                    </div>
                    <div style={{fontSize:15,color:"#475569",lineHeight:1.6}}><strong>Mitigation:</strong> {r.mitigation}</div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Footer */}
          <div style={{marginTop:32,paddingTop:20,borderTop:"2px solid #EFF6FF",textAlign:"center",color:"#94A3B8",fontSize:15}}>
            <div style={{fontWeight:700,color:"#1E40AF",marginBottom:4}}>RwandaHustle — Empowering Entrepreneurs Across Rwanda</div>
            <div>Generated on {date} · Based on 10,000+ Rwandan business records</div>
          </div>

        </div>

        {/* Bottom buttons */}
        <div className="no-print" style={{display:"flex",gap:12,marginTop:20,justifyContent:"center",flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={onBack} style={{padding:"12px 24px",background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:10,fontWeight:700,fontSize:16,cursor:"pointer",color:"#475569"}}>
            {t.bizPlanBack}
          </button>
          <button onClick={handleDownloadDocx} disabled={downloading}
            style={{padding:"12px 24px",background:downloaded?"#16A34A":"linear-gradient(135deg,#2563EB,#1E40AF)",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:16,cursor:"pointer",opacity:downloading?0.7:1}}>
            {downloading ? "Generating..." : downloaded ? "Downloaded!" : t.bizPlanDownload}
          </button>
        </div>
      </div>
    </div>
  );
}

function Results({ results, go, user, t, lang, token, API_URL }) {
  if(!results)return null;
  const {top3,prob,level,userInput}=results;
  const [bizPlan, setBizPlan] = useState(null);
  const [bizPlanLoading, setBizPlanLoading] = useState(false);
  const [bizPlanError, setBizPlanError] = useState("");

  const fetchBizPlan = async (hustle) => {
    setBizPlanLoading(true);
    setBizPlanError("");
    setBizPlan(null);
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const r = await fetch(`${API_URL}/api/business-plan`, {
        method: "POST",
        headers,
        body: JSON.stringify({ hustle_name: hustle.name, user_profile: userInput })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Server error");
      setBizPlan({ ...data, hustle });
    } catch(e) {
      if (e.message.includes("fetch")) {
        setBizPlanError("Cannot connect to server. Make sure python app.py is running.");
      } else {
        setBizPlanError(e.message || "Could not generate business plan. Please try again.");
      }
    } finally {
      setBizPlanLoading(false);
    }
  };

  if (bizPlanLoading) return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F8FAFC",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
      <div style={{width:48,height:48,border:"4px solid #DBEAFE",borderTopColor:"#2563EB",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
      <div style={{fontWeight:700,color:"#1E40AF",fontSize:19}}>{t.bizPlanLoading}</div>
    </div>
  );

  if (bizPlanError) return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F8FAFC",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:"40px 20px"}}>
      <div style={{fontSize:43}}></div>
      <div style={{fontWeight:700,color:"#DC2626",fontSize:19,textAlign:"center"}}>{bizPlanError}</div>
      <button onClick={()=>setBizPlanError("")} style={{padding:"10px 24px",background:"#2563EB",color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}> Back to Results</button>
    </div>
  );

  if (bizPlan) return <BusinessPlan plan={bizPlan} t={t} onBack={()=>setBizPlan(null)} userInput={userInput} token={token} API_URL={API_URL} />;

  const lvl={
    "High":{c:"#2563EB",bg:"#EFF6FF",tag:t.lvlHighTag,msg:t.lvlHighMsg},
    "Medium":{c:"#0891B2",bg:"#ECFEFF",tag:t.lvlMedTag,msg:t.lvlMedMsg},
    "Growing":{c:"#4F46E5",bg:"#EEF2FF",tag:t.lvlGrowTag,msg:t.lvlGrowMsg},
  }[level]||{};

  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F8FAFC"}}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"24px 20px"}}>
        {/* Header - Professional Dashboard Look */}
        <div className="u1 card" style={{background:"#0F172A",padding:"28px",marginBottom:24,color:"#fff",position:"relative"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div>
              <div style={{fontSize:14,color:"#94A3B8",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>
                {userInput.name} · {userInput.hustleId}
              </div>
              <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:27,marginBottom:6}}>{t.resultTitle}</h1>
              <p style={{color:"#64748B",fontSize:16,marginBottom:8}}>
                {userInput.location}
                {userInput.sector && ` · ${userInput.sector}`}
                {' · '}{(+userInput.capital).toLocaleString()} RWF · {userInput.hoursPerDay} hrs/day
              </p>
              
              {/* Skills Display */}
              {userInput.skills && userInput.skills.length > 0 && !userInput.skills.includes("None of the above") && (
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginTop:8}}>
                  <span style={{fontSize:14,color:"#94A3B8",fontWeight:600}}>Skills:</span>
                  {userInput.skills.map((skill, idx) => (
                    <span key={idx} style={{
                      background:"rgba(59,130,246,0.15)",
                      color:"#3B82F6",
                      padding:"4px 12px",
                      borderRadius:20,
                      fontSize:13,
                      fontWeight:600,
                      border:"1px solid rgba(59,130,246,0.3)"
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{textAlign:"center",background:"rgba(255,255,255,0.03)",padding:"16px 24px",borderRadius:16,border:"1px solid rgba(255,255,255,0.1)"}}>
                <Gauge pct={prob} color="#3B82F6"/>
                <div style={{fontWeight:600,fontSize:15,color:"#94A3B8",marginTop:4}}>{t.resultSub}</div>
                <div style={{color:"#3B82F6",fontSize:14,fontWeight:800,marginTop:4,textTransform:"uppercase"}}>{lvl.tag}</div>
              </div>
              <button onClick={() => {
                const report = `RWANDA HUSTLE REPORT\nUser: ${userInput.name}\nLevel: ${lvl.tag}\nScore: ${prob}%\n\nRecommendations:\n` + 
                  top3.map(b => `${b.rank}. ${b.name} (${b.matchPct}% match)\n   Capital: ${b.avgCapital} RWF\n   Profit: ${b.avgProfit} RWF`).join('\n\n');
                const blob = new Blob([report], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `HustleReport_${userInput.name}.txt`;
                a.click();
              }} style={{ padding: "12px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize:"16px" }}>
                {t.download}
              </button>
            </div>
          </div>
        </div>

        <div className="u2" style={{background:lvl.bg,border:`1.5px solid ${lvl.c}20`,borderRadius:12,padding:"12px 18px",marginBottom:24,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:25}}></span>
          <div>
            <div style={{fontWeight:800,color:lvl.c,fontSize:16,textTransform:"uppercase"}}>{lvl.tag}</div>
            <div style={{fontSize:16,color:"#475569"}}>{lvl.msg}</div>
          </div>
        </div>

        <h2 className="u3" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:23,marginBottom:16,color:"#0F172A"}}>{t.top3Title}</h2>

        {/* Low capital warning */}
        {+userInput.capital < 50000 && (
          <div style={{background:"#FFF8E1",border:"1px solid #FFE082",borderRadius:12,padding:"12px 18px",marginBottom:18,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:23,flexShrink:0}}></span>
            <div>
              <div style={{fontWeight:700,color:"#E65100",fontSize:17,marginBottom:3}}>
                {t.lowCapitalTitle||"Low startup capital detected"}
              </div>
              <div style={{fontSize:16,color:"#6D4C41",lineHeight:1.6}}>
                {typeof t.lowCapitalMsg==="function" ? t.lowCapitalMsg(userInput.capital) : t.lowCapitalMsg}
              </div>
            </div>
          </div>
        )}

        {/* Disability advisory */}
        {userInput?.hasDisability && userInput.hasDisability !== "No disability" && userInput.hasDisability !== "Nta bumuga" && (
          <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:12,padding:"14px 18px",marginBottom:18,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:25,flexShrink:0}}></span>
            <div>
              <div style={{fontWeight:700,color:"#1E40AF",fontSize:17,marginBottom:3}}>{t.disabilityAdvice}</div>
              <div style={{fontSize:16,color:"#1E3A8A",lineHeight:1.6,marginBottom:6}}>{t.disabilityNote}</div>
              {userInput.disabilityType&&<div style={{fontSize:15,color:"#3B82F6",fontWeight:600}}>{lang==="en"?"Disability noted:":"Ubumuga bwawe:"} {userInput.disabilityType}</div>}
              <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
                {["Data Entry & Virtual Assistant","Social Media Management","English/French Tutoring Online","Freelance Web Design","Graphic Design (Freelance)","E-commerce Store Management","YouTube Content Creation","Podcast Recording Services"].map((job,j)=>(
                  <span key={j} style={{background:"#DBEAFE",color:"#1E40AF",borderRadius:100,padding:"3px 10px",fontSize:15,fontWeight:600}}>{job}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No skills warning */}
        {(userInput.skills||[]).includes("None of the above") && (
          <div style={{background:"#F3E5F5",border:"1px solid #CE93D8",borderRadius:12,padding:"12px 18px",marginBottom:18,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:23,flexShrink:0}}></span>
            <div>
              <div style={{fontWeight:700,color:"#6A1B9A",fontSize:17,marginBottom:3}}>
                {t.noSkillTitle||"No specific skills selected"}
              </div>
              <div style={{fontSize:16,color:"#4A148C",lineHeight:1.6}}>
                {t.noSkillMsg||"Results show businesses that need minimal skill to start. Consider WDA/TVET free training to unlock higher-earning opportunities."}
              </div>
            </div>
          </div>
        )}

        {top3.map((b,i)=>{
          const hustleRecs = {
            "Motorcycle Taxi":["Register on Yegomoto or SafeMotos for app-based bookings","Maintain your bike weekly — a breakdown costs more than regular servicing","Build a base of 10–15 regular customers for predictable daily income"],
            "Moto Taxi (Gig - Own Bike)":["Register on Yegomoto — app customers tip better and are safer","Join a bodaboda stage with other riders for security and referrals"],
            "Bodaboda App Driver (Yegomoto)":["Complete 10+ rides daily to qualify for Yegomoto's weekly bonus","Save 20% of daily earnings for bike maintenance and emergencies"],
            "Water Delivery (Jerry Can)":["Map your delivery route to serve 15–20 households efficiently","Partner with a water source kiosk owner for a bulk discount"],
            "Chapati Making":["Set up near schools, markets or bus stages for high traffic","Start at 5am to catch the breakfast rush — the highest-revenue time"],
            "Mandazi / Doughnut Making":["Make 200+ pieces before 6am and sell at school gates","Sell in bags of 5 for 500 RWF for easy pricing"],
            "Samosa Making & Selling":["Supply to local shops and restaurants on a consignment basis","Deliver fresh to offices at lunch time for high demand"],
            "Vegetable Selling":["Buy from Kimironko market early morning for the freshest stock","Offer a weekly vegetable basket subscription for steady income"],
            "Egg Selling":["Partner with a poultry farmer for wholesale prices","Offer free delivery for orders of 5+ trays to offices"],
            "Street Food Vendor":["Choose your spot carefully — near markets earn 3× more","Keep your space very clean to attract and keep customers"],
            "Juice Selling":["Use seasonal fruits like passion fruit to keep costs low","Sell in sealed 500ml bottles for hygiene and better pricing"],
            "English/French Tutoring Online":["Post in Kigali expat Facebook groups — they pay higher rates","Offer a free 30-minute trial lesson to prove quality"],
            "Tutoring / Private Lessons":["Start with subjects you scored best in (Maths/Science)","Offer holiday intensive sessions before national exams"],
            "Social Media Management":["Create a content calendar template to show clients organization","Ask for a 3-month retainer upfront for stable income"],
            "Freelance Web Design":["Build 3 demo websites for local businesses to show portfolio","Charge a monthly maintenance fee (20–30K RWF) for stability"],
            "E-commerce Store Management":["Start on Jumia Rwanda or Facebook Marketplace — no setup cost","Product photos matter most — use natural light and clean background"],
            "Data Entry & Virtual Assistant":["Create a profile on Upwork — international clients pay in USD","Deliver 1 day early always to get 5-star reviews"],
            "Digital Marketing Services":["Offer a free social media audit to businesses to open sales","Specialise in one industry first to become the go-to expert"],
            "YouTube Content Creation":["Pick one niche like Rwanda travel or business tips","Post every week on the same day to build subscribers"],
            "Mobile Money Agent":["Choose a high-foot-traffic spot near a market or bus stop","Keep 500K+ RWF float at all times to avoid losing customers"],
            "Insurance Agent (Part-time)":["Start with SORAS or SONARWA for best commission rates","Host free education sessions at markets to generate leads"],
            "Real Estate Agent (Part-time)":["Focus on one district first — referrals drive this business","List on Kigali Property Hub and use WhatsApp groups daily"],
            "Property Management (Rentals)":["Charge 10–15% of monthly rent as your management fee","Provide monthly income reports to landlords to build trust"],
            "Irembo Agent (General Services)":["Set up next to the sector office for high government demand","Offer passport photos on the spot as a value-add service"],
            "Irembo Multi-Service Cyber Café":["Offer printing and scanning alongside Irembo for more revenue","Market to small businesses that need tax declarations"],
            "Mushroom Farming":["Start with oyster mushrooms — fastest growing (3 weeks)","Supply to supermarkets — they pay 2× street price"],
            "Strawberry Farming":["Musanze climate is ideal for the highest yields","Supply to Kigali supermarkets (Simba/Nakumatt) for premium prices"],
            "Greenhouse Vegetable Growing":["Start with tomatoes and capsicum — fastest ROI in Rwanda","Apply for BRD greenhouse loan — subsidised at 12% interest"],
            "Honey Production & Selling":["Register with Rwanda Beekeepers Cooperative for training","Package in branded 250g jars — retail price is much higher"],
            "Household Cleaning Services":["Start with neighbours and friends for initial referrals","Create a WhatsApp Business profile with before/after photos"],
            "Laundry & Ironing Service":["Offer pickup and delivery — convenience sells for 30% more","Set a 24-hour turnaround promise to beat competitors"],
            "Shoe Shining & Repair":["Set up near office building entrances for the morning rush","Offer minor repairs as an upsell to increase daily revenue"],
            "Phone Repair":["Learn screen replacement first — it's the most common repair","Offer a 30-day warranty to build trust and referrals"],
            "Hair Braiding (Home-based)":["Post your work on Instagram daily — visual proof sells","Offer mobile service (go to client) and charge more"],
            "Beauty Salon (Basic)":["Offer student discounts on weekdays to fill slow periods","Add nail art — it has the highest profit margin in salons"],
            "Makeup Artist (Events)":["Build a portfolio of 20 looks before charging full price","Partner with wedding photographers for constant referrals"],
            "Tailoring":["Specialise in school uniforms — bulk orders give steady income","Offer free minor alterations to build long-term loyalty"],
            "Secondhand Clothes (Caguwa)":["Buy at Nyabugogo market early Monday for best selection","Sort by quality — Grade A items sell for much more"],
            "Plumbing Services":["Get tools certified by IPRC to build client trust","Start with emergency repairs — people pay premium for speed"],
            "Solar Panel Installation (Assistant)":["Get certified by REG for government-funded projects","Target rural areas where solar demand is highest"],
            // Agriculture specific
            "Tomato farm 0.5 ha":["Apply for BRD agricultural loan (interest as low as 12% p.a.)","Use drip irrigation to save water and increase yield by 30%"],
            "Tomato farm 2 ha":["Join NAEB program for export market access","Use greenhouse to extend growing season and double annual revenue"],
            "Maize farm 1 ha":["Plant improved varieties (ZM-607) for 40% higher yield than local seeds","Store in hermetic bags to prevent post-harvest loss and sell when prices peak"],
            "Maize farm 2 ha":["Apply for BRD loan at 12% interest — lower than any SACCO","Use tractor services from local cooperative to save 50% on ploughing cost"],
            "Bean farm 0.5 ha":["Plant bush beans (RWR 2245) — mature in 60 days for quick returns","Mix-crop with maize to increase land productivity by 30%"],
            "Irish Potato farm 1 ha":["Buy certified seeds from RAB for disease-free high yield","Target Kigali market directly — cut out middlemen for 25% more profit"],
            "Cassava farm 1 ha":["Plant improved varieties (MM96/5280) — double the yield of local cassava","Sell to breweries (Skol, Bralirwa) for guaranteed premium price"],
            "Mushroom Farming":["Contact NAEB for free training on mushroom production","Start small (50kg substrate) and reinvest profits to scale"],
            "Strawberry Farming":["Target hotels and supermarkets in Kigali for premium prices","Use mulching to keep soil moist and reduce water needs by 40%"],
            "Greenhouse Vegetable Growing":["Install drip irrigation system — saves 50% water cost","Grow high-value crops like peppers and tomatoes for Kigali market"],
            "Poultry Farming":["Start with 50-100 layers — less risk than broilers","Join a SACCO to access group vet services at lower cost"],
            "Poultry (200 layers)":["Buy point-of-lay pullets at 18 weeks to start earning in 2 weeks","Collect eggs twice daily to prevent cracking and maximize sales"],
            "Poultry (500 broilers)":["Partner with hotels and restaurants for contract orders before you start","Raise for 6-7 weeks to reach 2.5kg market weight"],
            "Pig Rearing":["Feed kitchen waste mixed with commercial feed to cut costs by 40%","Target hotels and restaurants for steady bulk orders"],
            "Pig rearing 10 heads":["Buy weaners at 8 weeks and sell at 6 months for fastest turnover","Build simple concrete pens — last 15+ years with no repairs"],
            "Rabbit Rearing":["Rabbits breed fast — start with 10 does, reach 200 in 6 months","Sell both meat to restaurants and fur to craft businesses"],
            "Rabbit rearing 50":["Feed with kitchen waste and grass to keep costs under 500 RWF per rabbit","Does give birth every 30 days — exponential growth potential"],
            "Dairy Farming":["Join a milk collection center for guaranteed daily income","Plant Napier grass — one acre can feed 3 cows year-round"],
            "Dairy cow 2 heads":["Buy local breeds (Ankole cross) — cheaper and more heat-tolerant","Sell to collection centers daily — guaranteed payment in 7 days"],
            "Fish Farming":["Start with tilapia — most beginner-friendly fish in Rwanda","Feed twice daily and harvest in 6 months for best profit"],
            "Tilapia Farming":["Stock 3 fish per square meter for optimal growth","Sell live fish to restaurants for 30% higher price than market"],
            "Catfish Farming":["Catfish grow faster than tilapia — harvest in 4-5 months","Build concrete ponds — last 20+ years with minimal maintenance"],
            // Teaching/Education specific
            "Private tutoring":["Focus on national exam subjects (P6, S3, S6) for highest demand","Offer free first session to build trust with parents"],
            "Online tutoring":["Set up Zoom account and use WhatsApp for bookings","Record lessons and sell access for passive income"],
            "Computer Training":["Partner with schools to offer after-school programs","Get MINEDUC certification to charge premium rates"],
            "English/French Classes":["Target professionals who need language for work — they pay better","Offer morning classes (6-7am) for working adults"],
            // Food/Cooking specific
            "Catering Services":["Start with small events (20-30 people) to build portfolio","Always deliver 1 hour early to build reputation for reliability"],
            "Street Food Vendor":["Position near bus stops or markets for maximum foot traffic","Accept MoMo Pay — 80% of street food buyers use mobile money"],
            "Chapati Making":["Make 200+ per day to reach break-even profitability","Sell to small restaurants at 150 RWF each for bulk steady income"],
            "Bread Baking":["Bake at 4am for fresh morning sales — sells 3x faster","Deliver to small shops on credit — they'll become regular customers"],
            "Restaurant":["Start as takeaway only — saves 60% on furniture and space costs","Menu of 5-7 items max keeps food costs predictable"],
            "Mandazi Making":["Fry in the evening for next-day morning sales","Partner with tea shops — they'll order 100+ daily"],
            // Transport specific
            "Motorcycle Taxi":["Register with SafeMotos or Yego — app gives you 5-10 more rides per day","Always carry helmet for passenger — it's law and builds trust"],
            "Moto Taxi":["Buy second-hand bike (300-400K) instead of new to start faster","Service every 2 weeks to avoid costly repairs"],
            "Cargo Moto":["Invest in good cargo carrier — can charge 2x for heavy goods","Target construction sites and hardware stores for daily orders"],
          };
          const normalizedName = b.name.toLowerCase();
          const hustleKeys = Object.keys(hustleRecs);
          const matchedKey = hustleKeys.find(k => k.toLowerCase() === normalizedName);
          
          const tipList = (matchedKey ? hustleRecs[matchedKey] : null) || t.recs[b.category] || t.recs["Other Services"];
          const capFull = +userInput.capital >= b.avgCapital;
          const capNear = +userInput.capital >= b.avgCapital * 0.7;
          return (
            <div key={i} className="card u1" style={{marginBottom:16,overflow:"hidden",border:`1px solid #E2E8F0`}}>
              <div style={{display:"flex",alignItems:"stretch",flexWrap:"wrap"}}>
                <div style={{width:160,background:"#F8FAFC",borderRight:"1px solid #E2E8F0",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
                  <div style={{width:48,height:48,borderRadius:12,background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:25,marginBottom:12}}>{b.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"#64748B",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{[t.medal1,t.medal2,t.medal3][i]}</div>
                  <div style={{fontSize:19,fontWeight:800,color:"#2563EB",fontFamily:"'Sora',sans-serif"}}>{b.matchPct}%</div>
                  <div style={{fontSize:12,color:"#94A3B8",textTransform:"uppercase"}}>{t.matchPct}</div>
                </div>
                <div style={{flex:1,padding:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ background: "#2563eb", color: "#fff", padding: "2px 8px", borderRadius: "6px", fontSize:"15px", fontWeight: "800" }}>#{b.rank}</span>
                        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 17, color: "#0F172A", marginBottom: 0 }}>{b.name}</h3>
                      </div>
                      <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>{b.category}</span>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:8,marginBottom:16}}>
                    {[[``,t.statProfit,`${Math.round(b.avgProfit).toLocaleString()} RWF`],[``,t.statCapital,`${Math.round(b.avgCapital).toLocaleString()} RWF`],[``,t.statHours,`${(+b.avgHrs).toFixed(1)} hrs`]].map(([ic,lbl,val],j)=>(
                      <div key={j} style={{background:"#F1F5F9",borderRadius:8,padding:"8px 10px"}}>
                        <div style={{fontSize:13,color:"#64748B",textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{lbl}</div>
                        <div style={{fontWeight:700,color:"#0F172A",fontSize:15}}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"#F8FAFC",borderRadius:10,padding:14,border:"1px solid #E2E8F0"}}>
                    <div style={{fontWeight:700,fontSize:15,color:"#1E40AF",marginBottom:8}}>{t.actionPlan}</div>
                    {tipList.slice(0,2).map((tip,j)=>(
                      <div key={j} style={{display:"flex",gap:8,marginBottom:4,fontSize:15,color:"#475569",lineHeight:1.5}}>
                        <span style={{color:"#2563EB",fontWeight:800}}>•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={()=>fetchBizPlan(b)}
                    style={{marginTop:14,width:"100%",padding:"11px 0",background:"linear-gradient(135deg,#2563EB,#1E40AF)",color:"#fff",border:"none",borderRadius:10,fontWeight:700,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,letterSpacing:.3}}
                  >
                    {t.getBizPlan}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{display:"flex",gap:14,justifyContent:"center",marginTop:28,flexWrap:"wrap"}}>
          <button className="btn btn-o" onClick={()=>go("predict")}>{t.btnPredict}</button>
          <button className="btn btn-g" onClick={()=>go("home")}>{t.btnHome}</button>
        </div>
      </div>
    </div>
  );
}

//  CHATBOT 
function Chatbot({ user, results, t }) {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState(null);
  const [inp,setInp]=useState("");
  const [busy,setBusy]=useState(false);
  const ref=useRef();

  // Re-init greeting when language changes (t changes)
  useEffect(()=>{
    setMsgs([{role:"assistant",text:t.chatGreet(user?.name||"")}]);
  },[t,user?.name]);

  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const send=async()=>{
    if(!inp.trim()||busy||!msgs)return;
    const txt=inp.trim();setInp("");
    setMsgs(m=>[...m,{role:"user",text:txt}]);setBusy(true);
    const ctx=results?.top3?`User top businesses: ${results.top3.map(b=>b.name).join(", ")}. Success likelihood ${results.prob}% (${results.level}). Profile: ${results.userInput?.age} yrs, ${results.userInput?.location}, ${(+results.userInput?.capital||0).toLocaleString()} RWF.`:"";
    const langRule = t === T.en
      ? "IMPORTANT: Always reply in English only, regardless of what language the user writes in."
      : "IMPORTANT: Subiza mu Kinyarwanda gusa, ntukoresha Icyongereza.";
    const system = t.chatSystem(ctx) + "\n" + langRule;

    //  Business Advisor (local responses) 
    const keywords = txt.toLowerCase();
    let reply = "";

    if (keywords.includes("brd") || keywords.includes("loan") || keywords.includes("inguzanyo")) {
      reply = "BRD (Development Bank of Rwanda) offers agricultural and SME loans starting from 500,000 RWF at 12-15% interest p.a. Visit brd.rw or go to the nearest BRD branch with your business plan and national ID. For smaller amounts, try Umurenge SACCO in your sector — loans from 50,000 RWF with simpler requirements.";
    } else if (keywords.includes("momo") || keywords.includes("mobile money") || keywords.includes("payment")) {
      reply = "To set up MTN MoMo for your business: dial *182#  MoMo Pay  Register as merchant. It's free and takes 5 minutes. You'll get a merchant code customers can pay to directly. Over 80% of Rwandan transactions are done via MoMo — set it up on day one.";
    } else if (keywords.includes("irembo") || keywords.includes("register") || keywords.includes("rdb")) {
      reply = "To register your business with RDB: visit irembo.gov.rw or the nearest Irembo agent. Business registration costs only 10,000 RWF and takes one day. You'll need your national ID and business name. A registered business builds trust with customers and allows you to open a business bank account.";
    } else if (keywords.includes("market") || keywords.includes("marketing") || keywords.includes("kwamamaza")) {
      reply = "Best marketing strategies in Rwanda: (1) WhatsApp Business — create a profile and share daily updates, (2) Facebook Marketplace — list your products/services for free, (3) Word of mouth — offer first customers a discount for referrals, (4) Market days — participate in local sector/district market days. Start with free channels before spending on advertising.";
    } else if (keywords.includes("sacco") || keywords.includes("umurenge")) {
      reply = "Umurenge SACCOs are in every sector of Rwanda and offer micro-loans from 50,000 RWF. Interest rates are typically 18-24% p.a. — much lower than informal lenders. Visit your sector office with 3-6 months of savings history to qualify. Many entrepreneurs start with SACCO loans before graduating to BRD.";
    } else if (keywords.includes("skill") || keywords.includes("training") || keywords.includes("inyigisho")) {
      reply = "Free and subsidized training is available through: (1) WDA/TVET centers — practical skills in tailoring, cooking, electrical, etc., (2) IPRC campuses — technical training with certificates, (3) RDB Skills Development — entrepreneurship workshops. Training is one of the strongest predictors of business success in Rwanda.";
    } else if (keywords.includes("start") || keywords.includes("begin") || keywords.includes("tangira")) {
      reply = "To start your business in Rwanda: (1) Register at RDB — 10,000 RWF, one day, (2) Set up MTN MoMo Pay for payments, (3) Open a business account at Bank of Kigali or Equity Bank, (4) Create a WhatsApp Business profile, (5) Source your first supplies and launch with a small pilot. Track every franc from day one.";
    } else if (keywords.includes("capital") || keywords.includes("imari") || keywords.includes("money")) {
      reply = "If you need more capital: (1) Umurenge SACCO — micro-loans from 50K RWF, (2) BRD — SME loans from 500K RWF at 12%, (3) Youth Entrepreneurship Program — grants for under-35 entrepreneurs at rdb.rw/yep, (4) Microfinance — Urwego Bank, UNGUKA, CLECAM. Start small, reinvest profits, and scale gradually.";
    } else {
      reply = `Good question about "${txt}". As a Rwanda business advisor, I recommend: focus on businesses that match your skills and location, start with the minimum viable capital, register with RDB from day one, and use MTN MoMo Pay for all transactions. Would you like specific advice on marketing, funding, or business registration?`;
    }

    setMsgs(m=>[...m,{role:"assistant",text:reply}]);
    setBusy(false);
  };

  if(!msgs)return null;
  const QUICK=[t.chatQ1,t.chatQ2,t.chatQ3,t.chatQ4];

  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} style={{position:"fixed",bottom:22,right:22,zIndex:999,width:54,height:54,borderRadius:"50%",background:"linear-gradient(135deg,#2563EB,#1E40AF)",border:"none",cursor:"pointer",boxShadow:"0 6px 20px rgba(37,99,235,.45)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
        <span style={{fontSize:25,lineHeight:1,display:"block",marginTop:open?0:2}}>{open?"":""}</span>
      </button>
      {open&&(
        <div style={{position:"fixed",bottom:84,right:22,zIndex:998,width:330,height:490,borderRadius:20,background:"#fff",boxShadow:"0 20px 60px rgba(0,0,0,.18)",display:"flex",flexDirection:"column",overflow:"hidden",animation:"pop .25s ease"}}>
          <div style={{background:"linear-gradient(135deg,#2563EB,#1E40AF)",padding:"13px 16px",color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}></div>
              <div><div style={{fontWeight:700,fontSize:16}}>{t.chatTitle}</div><div style={{fontSize:14,opacity:.8}}>{t.chatLive}</div></div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"12px 12px 6px",display:"flex",flexDirection:"column",gap:9}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"87%",padding:"9px 12px",borderRadius:13,background:m.role==="user"?"#2563EB":"#EFF6FF",color:m.role==="user"?"#fff":"#0F172A",fontSize:16,lineHeight:1.65,borderBottomRightRadius:m.role==="user"?4:13,borderBottomLeftRadius:m.role==="assistant"?4:13,whiteSpace:"pre-wrap"}}>{m.text}</div>
              </div>
            ))}
            {busy&&<div style={{display:"flex",gap:5,padding:"9px 12px",background:"#EFF6FF",borderRadius:13,width:52,borderBottomLeftRadius:4}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#2563EB",animation:`dot 1.2s ${i*.2}s infinite`}}/>)}</div>}
            <div ref={ref}/>
          </div>
          {msgs.length<3&&<div style={{padding:"2px 10px 6px",display:"flex",flexWrap:"wrap",gap:5}}>{QUICK.map((q,i)=><button key={i} onClick={()=>setInp(q)} style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:100,padding:"4px 9px",fontSize:14,color:"#1E40AF",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{q}</button>)}</div>}
          <div style={{padding:"9px 12px",borderTop:"1px solid #DBEAFE",display:"flex",gap:7}}>
            <input className="inp" style={{flex:1,padding:"8px 12px",fontSize:16}} placeholder={t.chatPh} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button onClick={send} style={{width:36,height:36,borderRadius:"50%",background:inp.trim()?"#2563EB":"#EFF6FF",border:"none",cursor:"pointer",fontSize:17,color:inp.trim()?"#fff":"#94A3B8",transition:"background .2s"}}></button>
          </div>
        </div>
      )}
    </>
  );
}

//  DASHBOARDS 


function TechnicalDashboard({ user, token, go, t, refreshStories, refreshAnnouncements }) {
  const API_URL = ""; // Add API_URL constant
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({ total_users: 0, verified_users: 0, total_predictions: 0, total_requests: 0 });
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [storyForm, setStoryForm] = useState({ name: "", category: "", story: "", image: "" });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    console.log("[DEBUG TechnicalDashboard] Component mounted. User:", user?.name, "Token:", token ? "present" : "missing");
    if (token) {
      loadData();
    } else {
      console.error("[DEBUG TechnicalDashboard] No token available!");
      setLoading(false);
    }
    const interval = setInterval(() => {
      if (token) loadData();
    }, 60000);
    return () => clearInterval(interval);
  }, [tab, token]);

  const loadData = async () => {
    console.log("[DEBUG TechnicalDashboard] loadData called");
    setLoading(true);
    try {
      const [sRes, uRes, rRes, pRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/requests`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/predictions`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      console.log("[DEBUG TechnicalDashboard] API responses:", { 
        stats: sRes.status, 
        users: uRes.status, 
        requests: rRes.status,
        predictions: pRes.status
      });
      if (sRes.ok) setStats(await sRes.json());
      if (uRes.ok) setUsers(await uRes.json());
      if (rRes.ok) setRequests(await rRes.json());
      if (pRes.ok) setPredictions(await pRes.json());
    } catch (e) { 
      console.error("[DEBUG TechnicalDashboard] loadData error:", e);
    }
    setLoading(false);
  };

  const doAction = async (endpoint, msg) => {
    setActionMsg(msg);
    try {
      const r = await fetch(`${API_URL}/api/admin/${endpoint}`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });
      if (!r.ok) {
        const errText = await r.text();
        alert(`Server error (${r.status}): ${errText.substring(0, 50)}...`);
        setActionMsg("");
        return;
      }
      const data = await r.json();
      alert(data.message || data.error);
    } catch (e) { 
      console.error(e);
      alert("Error connecting to server: " + e.message); 
    }
    setActionMsg("");
  };

  const addStory = async () => {
    if(!storyForm.name || !storyForm.story) return alert("Fill required fields");
    try {
      const r = await fetch(`${API_URL}/api/admin/stories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(storyForm)
      });
      if(r.ok) {
        alert(t.adminStoriesAdd + " Successful!");
        setStoryForm({ name: "", category: "", story: "", image: "" });
        if (refreshStories) refreshStories();
      }
    } catch(e) { alert("Error"); }
  };
  const deleteUser = async (id, name) => {
    if(!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      const r = await fetch(`${API_URL}/api/admin/delete-user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if(r.ok) {
        alert("User deleted");
        loadData();
      }
    } catch(e) { alert("Error deleting user"); }
  };

  const submitReply = async () => {
    if (!replyText.trim()) return;
    setActionMsg("Sending Reply...");
    try {
      const res = await fetch(`${API_URL}/api/admin/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ request_id: replyingTo, reply: replyText })
      });
      if (res.ok) {
        alert("Reply Sent!");
        loadData();
      }
    } catch (e) { console.error(e); }
    setActionMsg("");
    setReplyingTo(null);
    setReplyText("");
  };

  const toggleVerify = async (id) => {
    console.log("Toggling user verification for ID:", id);
    try {
      const r = await fetch(`${API_URL}/api/admin/toggle-verify/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await r.json();
      if(r.ok) {
        alert(data.message || "Status Updated");
        loadData();
      } else {
        alert(data.error || "Failed to update");
      }
    } catch(e) { alert("Error updating status: " + e.message); }
  };

  const SidebarBtn = ({ id, icon, label }) => (
    <button 
      onClick={() => setTab(id)}
      style={{
        display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 16px",
        borderRadius: 12, border: "none", background: tab === id ? "#2563EB" : "transparent",
        color: tab === id ? "#fff" : "#CBD5E1", fontWeight: tab === id ? 700 : 500,
        textAlign: "left", cursor: "pointer", transition: "all 0.2s ease"
      }}
      onMouseOver={(e) => { if(tab !== id) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
      onMouseOut={(e) => { if(tab !== id) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = tab === id ? "#fff" : "#CBD5E1"; }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 14 }}>{label}</span>
    </button>
  );

  // Show loading screen while data loads
  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#F0F7FF", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, border: "4px solid #DBEAFE", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 24px" }}></div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1E40AF" }}>Loading Admin Dashboard...</div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>User: {user?.name || "Unknown"}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F7FF", color: "#0F172A" }}>
      {/* Sidebar */}
      <div style={{ width: 280, background: "#0F172A", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "80px 24px 24px", display: "flex", flexDirection: "column", gap: 10, color: "#fff" }}>
        <div style={{ padding: "0 10px 30px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff" }}>RH</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Admin Panel</h2>
          </div>
          <p style={{ fontSize: 12, color: "#94A3B8" }}>Technical Support Terminal</p>
        </div>
        <SidebarBtn id="overview" icon="" label={t.adminAnalytics} />
        <SidebarBtn id="users" icon="" label={t.adminUsers} />
        <SidebarBtn id="inbox" icon="" label={t.adminInbox} />
        <SidebarBtn id="system" icon="" label={t.adminSystem} />
        
        <div style={{ marginTop: "auto", padding: 20, background: "rgba(37,99,235,0.1)", borderRadius: 12, border: "1px solid rgba(37,99,235,0.2)" }}>
          <div style={{ fontSize: 11, color: "#60A5FA", marginBottom: 4 }}>System Status</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#fff" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }}></span>
            Operational
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "100px 60px 40px", overflowY: "auto" }}>
        <header style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="d-flex align-items-center gap-3">
            {/* RH Logo */}
            <div style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,99,235,0.2)"
            }}>
              <span style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "21px",
                fontFamily: "'Sora', sans-serif"
              }}>RH</span>
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>
                {t[`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`] || tab.toUpperCase()}
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 0 }}>Welcome back, {user.name}. System is running smoothly.</p>
            </div>
          </div>
          <button className="btn btn-o" style={{ borderColor: "#E2E8F0", color: "#64748B" }} onClick={loadData}>Refresh Data</button>
        </header>

        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 }}>
              <div className="card" onClick={()=>setTab("users")} style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e)=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.1)";}} onMouseOut={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700, marginBottom: 12 }}>{t.adminTotalUsers}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#2563EB" }}>{stats.total_users}</div>
                <div style={{ fontSize: 11, color: "#10B981", marginTop: 8 }}> 12% this month</div>
              </div>
              <div className="card" onClick={()=>setTab("users")} style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e)=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.1)";}} onMouseOut={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700, marginBottom: 12 }}>{t.adminVerified}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#10B981" }}>{stats.verified_users}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 8 }}>{Math.round((stats.verified_users/stats.total_users)*100 || 0)}% of platform</div>
              </div>
              <div className="card" onClick={()=>setTab("predictions")} style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e)=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.1)";}} onMouseOut={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700, marginBottom: 12 }}>{t.adminPredictions}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#F59E0B" }}>{stats.total_predictions}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 8 }}>Powered by 10,000+ business records</div>
              </div>
              <div className="card" onClick={()=>setTab("inbox")} style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e)=>{e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.1)";}} onMouseOut={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none";}}>
                <div style={{ fontSize: 13, color: "#94A3B8", fontWeight: 700, marginBottom: 12 }}>{t.adminInbox}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#EC4899" }}>{stats.total_requests}</div>
                <div style={{ fontSize: 11, color: "#F87171", marginTop: 8 }}>{requests.length} Pending</div>
              </div>
            </div>

            <div className="card" style={{ background: "#FFFFFF", padding: 32, border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#2563EB" }}></span> System Activity (7 Days)
                </h3>
                <div style={{ fontSize:"15px", color: "#64748B", fontWeight: 600, background: "#F8FAFC", padding: "6px 12px", borderRadius: "20px", border: "1px solid #E2E8F0" }}>
                  Active Users per Day
                </div>
              </div>
              <div style={{ height: 260, display: "flex", alignItems: "flex-end", gap: 24, padding: "0 10px", borderBottom: "2px solid #F1F5F9" }}>
                {[45, 60, 40, 85, 90, 65, 80].map((h, i) => (
                  <div key={i} className="u1" style={{ 
                    flex: 1, 
                    background: i === 6 ? "linear-gradient(180deg, #2563EB 0%, #1E40AF 100%)" : "linear-gradient(180deg, #3B82F6 0%, #2563EB 100%)", 
                    height: `${h}%`, 
                    borderRadius: "8px 8px 0 0", 
                    position: "relative",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    animationDelay: `${i * 0.05}s`
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "scaleX(1.05)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 800, color: i === 6 ? "#2563EB" : "#64748B" }}>{h}%</div>
                    <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 700, color: "#64748B", whiteSpace: "nowrap" }}>Day {i+1}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, display: "flex", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#64748B" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "#2563EB" }}></div> Peak Usage
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#64748B" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "#DBEAFE" }}></div> Normal Usage
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "users" && (
          <div className="card" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
              <thead style={{ background: "#F8FAFC" }}>
                <tr>
                  <th style={{ textAlign: "left", padding: "26px 20px", fontSize: 15, color: "#64748B", textTransform: "uppercase", borderBottom: "2px solid #E2E8F0" }}>User / Email</th>
                  <th style={{ textAlign: "left", padding: "26px 20px", fontSize: 15, color: "#64748B", textTransform: "uppercase", borderBottom: "2px solid #E2E8F0" }}>Role</th>
                  <th style={{ textAlign: "left", padding: "26px 20px", fontSize: 15, color: "#64748B", textTransform: "uppercase", borderBottom: "2px solid #E2E8F0" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "26px 20px", fontSize: 15, color: "#64748B", textTransform: "uppercase", borderBottom: "2px solid #E2E8F0" }}>Created</th>
                  <th style={{ textAlign: "right", padding: "26px 20px", fontSize: 15, color: "#64748B", textTransform: "uppercase", borderBottom: "2px solid #E2E8F0" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
                    <td style={{ padding: "28px 20px", borderRight: "1px solid #F1F5F9" }}>
                      <div style={{ fontWeight: 800, fontSize: 20, color: "#0F172A", marginBottom: 4 }}>{u.name}</div>
                      <div style={{ fontSize: 16, color: "#64748B" }}>{u.email_phone}</div>
                    </td>
                    <td style={{ padding: "28px 20px", borderRight: "1px solid #F1F5F9" }}>
                      <span style={{ fontSize: 16, background: "#F1F5F9", color: "#475569", padding: "8px 16px", borderRadius: 8, fontWeight: 700 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: "28px 20px", borderRight: "1px solid #F1F5F9" }}>
                      <span 
                        onClick={() => toggleVerify(u.id)}
                        style={{ 
                          padding: "8px 16px", borderRadius: 100, fontSize: 14, fontWeight: 800, cursor: "pointer",
                          background: u.verified ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", 
                          color: u.verified ? "#10B981" : "#EF4444", 
                          border: u.verified ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)",
                          transition: "all 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                      >
                        {u.verified ? "Authorized" : "Denied"}
                      </span>
                    </td>
                    <td style={{ padding: "28px 20px", fontSize: 16, color: "#64748B", fontWeight: 700, borderRight: "1px solid #F1F5F9" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: "28px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", alignItems: "center" }}>
                        {!u.verified && (
                          <button 
                            onClick={() => toggleVerify(u.id)}
                            style={{ 
                              color: "#2563EB", background: "none", 
                              border: "1px solid #2563EB", 
                              padding: "6px 12px", borderRadius: 6,
                              fontWeight: 700, cursor: "pointer", fontSize: 13,
                              transition: "all 0.2s", whiteSpace: "nowrap"
                            }}
                            onMouseOver={(e) => { e.target.style.background = "#2563EB"; e.target.style.color = "#fff"; }}
                            onMouseOut={(e) => { e.target.style.background = "none"; e.target.style.color = "#2563EB"; }}
                          >
                            Grant
                          </button>
                        )}
                        <button 
                          onClick={() => deleteUser(u.id, u.name)}
                          style={{ 
                            color: "#94A3B8", background: "none", border: "1px solid #E2E8F0", 
                            padding: "6px 12px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13,
                            transition: "all 0.2s"
                          }}
                          onMouseOver={(e) => { e.target.style.color = "#EF4444"; e.target.style.borderColor = "#EF4444"; }}
                          onMouseOut={(e) => { e.target.style.color = "#94A3B8"; e.target.style.borderColor = "#E2E8F0"; }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "inbox" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {requests.length === 0 ? <div className="card" style={{ background: "#FFFFFF", padding: 40, border: "1px solid #E2E8F0", textAlign: "center", color: "#64748B" }}>No user requests at the moment.</div> : 
              requests.map(r => (
                <div key={r.id} className="card pop" style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(37, 99, 235, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}></div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{r.contact}</div>
                        <div style={{ fontSize: 11, color: "#64748B" }}>User ID: {r.user_id || "Guest"} · Status: <span style={{color: r.status==='Replied'?'#10B981':'#F59E0B'}}>{r.status}</span></div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{new Date(r.created_at).toLocaleString()}</div>
                  </div>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, background: "#F8FAFC", padding: 20, borderRadius: 12, marginBottom: 20 }}>{r.message}</p>
                  
                  {r.reply && (
                    <div style={{ background: "#F0F9FF", border: "1px solid #BAE6FD", padding: 16, borderRadius: 12, marginBottom: 20 }}>
                      <div style={{ fontWeight: 800, fontSize: 12, color: "#0369A1", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                        <span>Your Reply:</span>
                        <span style={{ fontWeight: 400, color: "#64748B" }}>{new Date(r.replied_at).toLocaleString()}</span>
                      </div>
                      <div style={{ fontSize: 14, color: "#0C4A6E" }}>{r.reply}</div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12 }}>
                    {replyingTo === r.id ? (
                      <div style={{ width: "100%" }}>
                        <textarea 
                          className="inp" 
                          style={{ minHeight: 100, marginBottom: 12, borderColor: "#2563EB" }} 
                          placeholder="Type your reply here..."
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                        />
                        <div style={{ display: "flex", gap: 12 }}>
                          <button className="btn btn-g" onClick={submitReply} disabled={!!actionMsg}>Send Reply</button>
                          <button className="btn btn-o" onClick={() => setReplyingTo(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button className="btn btn-g" style={{ width: "auto", padding: "8px 20px" }} onClick={() => setReplyingTo(r.id)}>Reply Now</button>
                        <button className="btn btn-o" style={{ width: "auto", padding: "8px 20px", color: "#64748B", borderColor: "#E2E8F0" }} onClick={() => { setRequests(requests.filter(req => req.id !== r.id)); alert("Message Archived"); }}>Archive</button>
                      </>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {tab === "system" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div className="card" style={{ background: "#FFFFFF", padding: 32, border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}></div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#0F172A" }}>{t.adminBackup}</h3>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>Create an encrypted snapshot of the entire platform database. Recommended before any major update.</p>
              <button className="btn btn-g" onClick={() => doAction("backup", t.adminBackupMsg)} disabled={!!actionMsg}>
                {actionMsg === t.adminBackupMsg ? "Processing..." : "Run Full Backup"}
              </button>
              <div style={{ marginTop: 16, fontSize: 12, color: "#64748B", padding: 12, background: "#F8FAFC", borderRadius: 6 }}>
                Last backup: Check your backup folder for .db files
              </div>
            </div>
            
            <div className="card" style={{ background: "#FFFFFF", padding: 32, border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}></div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#0F172A" }}>{t.adminSecurity}</h3>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>Security audit: Check for unverified accounts, duplicate emails, and system vulnerabilities.</p>
              <button 
                className="btn btn-o" 
                style={{ color: "#2563EB", borderColor: "#2563EB" }}
                onClick={async (e) => {
                  const b = e.target;
                  const oldText = b.innerText;
                  b.innerText = "Auditing...";
                  b.disabled = true;
                  
                  try {
                    // Count security issues
                    const unverifiedCount = users.filter(u => !u.verified).length;
                    const oldAccounts = users.filter(u => {
                      const created = new Date(u.created_at);
                      const daysSince = (Date.now() - created) / (1000 * 60 * 60 * 24);
                      return !u.verified && daysSince > 7;
                    }).length;
                    
                    setTimeout(() => {
                      b.innerText = oldText;
                      b.disabled = false;
                      b.style.color = unverifiedCount > 0 ? "#EF4444" : "#10B981";
                      b.style.borderColor = unverifiedCount > 0 ? "#EF4444" : "#10B981";
                      
                      alert(`Security Audit Complete:\n\n Total Users: ${users.length}\n Unverified: ${unverifiedCount}\n Unverified >7 days: ${oldAccounts}\n Verified: ${users.filter(u => u.verified).length}`);
                    }, 1500);
                  } catch (e) {
                    b.innerText = oldText;
                    b.disabled = false;
                  }
                }}
              >
                Start Security Audit
              </button>
            </div>
          </div>
        )}

        {tab === "predictions" && (
          <div>
            <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>All User Predictions</h2>
              <div style={{ fontSize: 14, color: "#64748B" }}>{predictions.length} total predictions</div>
            </div>
            
            {predictions.length === 0 ? (
              <div className="card" style={{ background: "#FFFFFF", padding: 40, border: "1px solid #E2E8F0", textAlign: "center", color: "#94A3B8" }}>
                No predictions yet
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {predictions.map((p) => {
                  const top3 = p.result_data?.top_3 || p.result_data?.top_3_businesses || p.result_data?.recommendations || [];
                  const inputData = p.input_data || {};
                  
                  return (
                    <div key={p.id} className="card" style={{ background: "#FFFFFF", padding: 28, border: "1px solid #E2E8F0" }}>
                      {/* Header with user info */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #F1F5F9" }}>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>
                            {p.user_name}
                          </div>
                          <div style={{ fontSize: 14, color: "#64748B" }}>{p.email_phone}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>
                            {new Date(p.timestamp).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: 11, color: "#CBD5E1" }}>
                            {new Date(p.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* User Input Summary */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24, padding: 16, background: "#F8FAFC", borderRadius: 8 }}>
                        <div>
                          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>CAPITAL</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                            {inputData.capital ? `${parseInt(inputData.capital).toLocaleString()} RWF` : "N/A"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>LOCATION</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                            {inputData.district || inputData.location || "N/A"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>HOURS/DAY</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                            {inputData.hours_per_day || inputData.hours || "N/A"}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>SKILLS</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                            {inputData.skills ? (Array.isArray(inputData.skills) ? inputData.skills.join(", ") : inputData.skills) : "N/A"}
                          </div>
                        </div>
                      </div>

                      {/* Top 3 Predictions */}
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 800, color: "#64748B", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Top 3 Business Recommendations
                        </h4>
                        {top3.length === 0 ? (
                          <div style={{ padding: 20, textAlign: "center", color: "#94A3B8", background: "#F8FAFC", borderRadius: 8 }}>
                            No recommendations data available
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                            {top3.slice(0, 3).map((rec, idx) => (
                              <div key={idx} style={{ 
                                padding: 20, 
                                border: idx === 0 ? "2px solid #2563EB" : "1px solid #E2E8F0",
                                borderRadius: 12,
                                background: idx === 0 ? "#EFF6FF" : "#FFFFFF",
                                position: "relative"
                              }}>
                                <div style={{ 
                                  position: "absolute", 
                                  top: 12, 
                                  right: 12, 
                                  width: 28, 
                                  height: 28, 
                                  borderRadius: "50%", 
                                  background: idx === 0 ? "#2563EB" : "#94A3B8",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 13,
                                  fontWeight: 800
                                }}>
                                  #{idx + 1}
                                </div>
                                <div style={{ fontSize: 17, fontWeight: 800, color: idx === 0 ? "#1E40AF" : "#0F172A", marginBottom: 8 }}>
                                  {rec.name || rec.business || "Unknown Business"}
                                </div>
                                <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>
                                  Match: <span style={{ fontWeight: 700, color: idx === 0 ? "#2563EB" : "#0F172A" }}>
                                    {rec.match_pct ? rec.match_pct + "%" : rec.confidence ? (rec.confidence * 100).toFixed(1) + "%" : rec.score ? rec.score + "%" : "N/A"}
                                  </span>
                                </div>
                                {(rec.avg_profit || rec.monthly_profit) && (
                                  <div style={{ fontSize: 12, color: "#64748B" }}>
                                     Monthly Profit: <strong>{parseInt(rec.avg_profit || rec.monthly_profit).toLocaleString()} RWF</strong>
                                  </div>
                                )}
                                {rec.category && (
                                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                                     Category: <strong>{rec.category}</strong>
                                  </div>
                                )}
                                {rec.avg_capital && (
                                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                                     Startup Capital: <strong>{parseInt(rec.avg_capital).toLocaleString()} RWF</strong>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ user, token, allResults, go, t, announcements, stories, fetchStories, fetchAnnouncements }) {
  const [myRequests, setMyRequests]     = useState([]);
  const [dbPredictions, setDbPredictions] = useState([]);
  const [viewPred, setViewPred]         = useState(null);
  const [showPreds, setShowPreds]       = useState(false); // hidden by default
  const [generatingPlan, setGeneratingPlan] = useState(null); // Track which business plan is being generated
  const API_URL = "";

  useEffect(() => {
    fetchMyRequests();
    fetchDbPredictions();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const r = await fetch(`${API_URL}/api/user/my-requests`, { headers:{ Authorization:`Bearer ${token}` } });
      if (r.ok) setMyRequests(await r.json());
    } catch {}
  };

  const fetchDbPredictions = async () => {
    try {
      const r = await fetch(`${API_URL}/api/user/my-predictions`, { headers:{ Authorization:`Bearer ${token}` } });
      if (r.ok) {
        const data = await r.json();
        console.log("[DEBUG] Fetched predictions from DB:", data);
        setDbPredictions(data);
      } else {
        console.error("[DEBUG] Failed to fetch predictions:", r.status);
      }
    } catch (e) {
      console.error("[DEBUG] Error fetching predictions:", e);
    }
  };

  // Generate and download business plan directly from dashboard
  const generateBusinessPlan = async (businessName, prediction) => {
    const planKey = `${prediction.id}-${businessName}`;
    setGeneratingPlan(planKey);
    
    try {
      // Parse input data from prediction
      let inputData = prediction;
      
      // If prediction has input_data field (from database), parse it
      if (prediction.input_data) {
        inputData = typeof prediction.input_data === 'string' 
          ? JSON.parse(prediction.input_data) 
          : prediction.input_data;
      }
      
      // If prediction has skills as a string, parse it to array
      if (inputData.skills && typeof inputData.skills === 'string') {
        try {
          inputData.skills = JSON.parse(inputData.skills);
        } catch {
          inputData.skills = inputData.skills.split(',').map(s => s.trim());
        }
      }

      console.log('[DEBUG] Generating business plan for:', businessName);
      console.log('[DEBUG] User input data:', inputData);

      const response = await fetch(`${API_URL}/api/business-plan`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          hustle_name: businessName,
          user_profile: {
            name: user.name,
            age: inputData.age || 30,
            gender: inputData.gender || 'Male',
            education_level: inputData.education_level || 'Secondary',
            employment_status: inputData.employment_status || 'Unemployed',
            location: inputData.location || 'Gasabo',
            startup_capital_rwf: inputData.startup_capital_rwf || inputData.capital || 0,
            hoursPerDay: inputData.hoursPerDay || inputData.hours_per_day || 4,
            skills: inputData.skills || [],
            has_smartphone: inputData.has_smartphone !== 'No',
            hasDisability: inputData.hasDisability && inputData.hasDisability !== 'No disability' && inputData.hasDisability !== 'Nta bumuga',
          },
          format: 'docx'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ERROR] Server response:', errorText);
        throw new Error(`Failed to generate business plan: ${response.status}`);
      }

      const blob = await response.blob();
      console.log('[DEBUG] Received blob size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Received empty document');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BusinessPlan_${businessName.replace(/\s+/g, '_')}_${user.name.replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log(`[DEBUG] Business plan for ${businessName} downloaded successfully`);
    } catch (error) {
      console.error('[ERROR] Failed to generate business plan:', error);
      alert(`Failed to generate business plan: ${error.message}`);
    } finally {
      setGeneratingPlan(null);
    }
  };

  if (user?.role === "support_technician") {
    return <TechnicalDashboard user={user} token={token} go={go} t={t} refreshStories={fetchStories} refreshAnnouncements={fetchAnnouncements} />;
  }

  // Use DB predictions as source of truth; fall back to in-memory only if DB is empty
  const totalPredictions = dbPredictions.length || allResults?.length || 0;
  const latest = allResults?.[0] || null;
  const topBusiness = latest?.top3?.[0] || null;

  // Prediction detail view
  if (viewPred) return (
    <div style={{paddingTop:80,minHeight:"100vh",background:"#F8FAFC",padding:"80px 20px 40px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <button onClick={()=>setViewPred(null)} className="btn btn-outline-secondary mb-4"> Back to Dashboard</button>

        {/* Header */}
        <div className="card p-4 mb-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div>
              <h4 className="fw-bold mb-1">Prediction #{dbPredictions.indexOf(viewPred)+1}</h4>
              <small className="text-muted">{new Date(viewPred.timestamp).toLocaleString()}</small>
            </div>
            <span className="badge bg-primary fs-6">{viewPred.match_pct}% Top Match</span>
          </div>
          <hr/>
          {/* User profile summary */}
          <h6 className="fw-bold mb-3">User Profile</h6>
          <div className="row g-2 mb-2">
            {[
              ["Location", viewPred.location||"—"],
              ["Capital", `${Number(viewPred.capital||0).toLocaleString()} RWF`],
              ["Match", `${viewPred.match_pct}%`],
              ["Date", new Date(viewPred.timestamp).toLocaleDateString()],
            ].map(([l,v],i)=>(
              <div key={i} className="col-6 col-md-3">
                <div className="p-3 bg-light rounded text-center">
                  <div className="small text-muted mb-1">{l}</div>
                  <div className="fw-bold">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Businesses */}
        <h5 className="fw-bold mb-3">Top 3 Recommended Businesses</h5>
        {(viewPred.top3||[]).map((b,i)=>(
          <div key={i} className="card mb-3 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
                <div>
                  <span className="badge bg-primary me-2">#{i+1}</span>
                  <strong className="fs-5">{b.name}</strong>
                  <span className="badge bg-light text-dark ms-2">{b.category}</span>
                </div>
                <span className="fw-bold text-primary fs-5">{b.match_pct}%</span>
              </div>
              <div className="row g-2 mb-3">
                {[
                  ["Avg Profit", `${Number(b.avg_profit||0).toLocaleString()} RWF/mo`],
                  ["Avg Capital", `${Number(b.avg_capital||0).toLocaleString()} RWF`],
                  ["Revenue", `${Number(b.avg_revenue||0).toLocaleString()} RWF/mo`],
                  ["Hours/Week", `${Number(b.avg_hours_per_week||b.avgHrs||0).toFixed(1)} hrs`],
                ].map(([l,v],j)=>(
                  <div key={j} className="col-6 col-md-3">
                    <div className="p-2 bg-light rounded text-center">
                      <div style={{fontSize:14}} className="text-muted">{l}</div>
                      <div className="fw-bold small">{v}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary btn-sm w-100"
                onClick={()=>{
                  // Navigate to results page with this prediction to use Get Business Plan
                  go("predict");
                }}
              >
                Get Business Plan for {b.name}
              </button>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="card border-0 shadow-sm p-3 mt-2">
          <div className="row text-center g-3">
            <div className="col-4">
              <div className="fw-bold text-primary fs-4">{(viewPred.top3||[]).length}</div>
              <div className="small text-muted">Businesses Shown</div>
            </div>
            <div className="col-4">
              <div className="fw-bold text-success fs-4">{viewPred.match_pct}%</div>
              <div className="small text-muted">Best Match</div>
            </div>
            <div className="col-4">
              <div className="fw-bold text-warning fs-4">
                {Number((viewPred.top3||[])[0]?.avg_profit||0).toLocaleString()}
              </div>
              <div className="small text-muted">Top Profit (RWF)</div>
            </div>
          </div>
        </div>

        <button onClick={()=>setViewPred(null)} className="btn btn-outline-secondary mt-4 w-100"> Back to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div style={{paddingTop:80,minHeight:"100vh",background:"#F8FAFC",padding:"80px 20px 40px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            {/* RH Logo */}
            <div style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,99,235,0.2)"
            }}>
              <span style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "21px",
                fontFamily: "'Sora', sans-serif"
              }}>RH</span>
            </div>
            <div>
              <div>
                <span className="badge bg-primary me-2">Entrepreneur</span>
                <h2 className="d-inline fw-bold" style={{fontFamily:"'Sora',sans-serif"}}>{t.dashboard}</h2>
              </div>
              <p className="text-muted mt-1 mb-0">Welcome back, <strong>{user.name}</strong></p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={()=>go("predict")}>{t.newPredict}</button>
        </div>

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="card border-primary border-opacity-25 h-100"
                 style={{cursor:"pointer"}}
                 onClick={()=>{ setShowPreds(s=>!s); setTimeout(()=>document.getElementById("pred-section")?.scrollIntoView({behavior:"smooth"}),50); }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <i className="bi bi-bar-chart-fill text-primary" style={{fontSize:27}}></i>
                  <small className="text-muted">{showPreds ? "click to hide " : "click to view "}</small>
                </div>
                <div className="fs-2 fw-bold text-primary">{totalPredictions}</div>
                <div className="small text-muted fw-semibold">My Predictions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Full width - left column only */}
          <div className="col-12">

            {/* Predictions History — shown when user clicks stat card */}
            {showPreds && (
            <div className="card mb-4" id="pred-section">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">{t.history} ({totalPredictions})</h5>
              </div>
              <div className="card-body p-0">
                {dbPredictions.length === 0 && (!allResults || allResults.length === 0) ? (
                  <div className="text-center p-5">
                    <p className="text-muted mb-0">No predictions yet.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Rank</th>
                          <th>Business</th>
                          <th>Category</th>
                          <th>Match</th>
                          <th>Profit/mo</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dbPredictions.length > 0 ? dbPredictions.map((p,i)=>(
                          (p.top3||[{name:p.top_business,category:p.top_category,match_pct:p.match_pct,avg_profit:0}]).map((b,j)=>(
                            <tr key={`${i}-${j}`}>
                              {j===0 && <td rowSpan={(p.top3||[]).length||1} className="align-middle text-center">
                                <span className="badge bg-secondary">{i+1}</span>
                                <div className="small text-muted mt-1">{new Date(p.timestamp).toLocaleDateString()}</div>
                              </td>}
                              <td><span className={`badge ${j===0?"bg-primary":j===1?"bg-secondary":"bg-light text-dark"}`}>#{j+1}</span></td>
                              <td><strong>{b.name||"—"}</strong></td>
                              <td><span className="badge bg-light text-dark">{b.category||"—"}</span></td>
                              <td><span className="fw-bold text-primary">{b.match_pct}%</span></td>
                              <td className="small text-muted">{Number(b.avg_profit||0).toLocaleString()} RWF</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-primary"
                                  onClick={() => generateBusinessPlan(b.name, p)}
                                  disabled={generatingPlan === `${p.id}-${b.name}`}
                                >
                                  {generatingPlan === `${p.id}-${b.name}` ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                      Generating...
                                    </>
                                  ) : (
                                    'Business Plan'
                                  )}
                                </button>
                              </td>
                              {j===0 && <td rowSpan={(p.top3||[]).length||1} className="align-middle">
                                <button className="btn btn-sm btn-outline-secondary" onClick={()=>setViewPred(p)}>Detail</button>
                              </td>}
                            </tr>
                          ))
                        )) : allResults?.map((res,i)=>(
                          (res.top3||[]).map((b,j)=>(
                            <tr key={`${i}-${j}`}>
                              {j===0 && <td rowSpan={res.top3.length} className="align-middle text-center">
                                <span className="badge bg-secondary">{i+1}</span>
                                <div className="small text-muted mt-1">{new Date(res.date).toLocaleDateString()}</div>
                              </td>}
                              <td><span className={`badge ${j===0?"bg-primary":j===1?"bg-secondary":"bg-light text-dark"}`}>#{j+1}</span></td>
                              <td><strong>{b.name||"—"}</strong></td>
                              <td><span className="badge bg-light text-dark">{b.category||"—"}</span></td>
                              <td><span className="fw-bold text-primary">{b.matchPct||b.match_pct}%</span></td>
                              <td className="small text-muted">{Number(b.avgProfit||b.avg_profit||0).toLocaleString()} RWF</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-primary"
                                  onClick={() => generateBusinessPlan(b.name, res.userInput || {})}
                                  disabled={generatingPlan === `mem-${i}-${b.name}`}
                                >
                                  {generatingPlan === `mem-${i}-${b.name}` ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                      Generating...
                                    </>
                                  ) : (
                                    'Business Plan'
                                  )}
                                </button>
                              </td>
                              {j===0 && <td rowSpan={res.top3.length} className="align-middle">
                                <button className="btn btn-sm btn-outline-secondary">Detail</button>
                              </td>}
                            </tr>
                          ))
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            )} {/* end showPreds */}

            {/* Support Messages */}
            <div className="card mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Support Messages</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={fetchMyRequests}>Refresh</button>
              </div>
              <div className="card-body">
                {myRequests.length === 0 ? (
                  <div className="text-center p-4 text-muted">No support requests yet.</div>
                ) : myRequests.map((req,i)=>(
                  <div key={i} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <small className="text-muted">{new Date(req.created_at).toLocaleDateString()}</small>
                      <span className={`badge ${req.status==="Replied"?"bg-success":"bg-warning text-dark"}`}>{req.status}</span>
                    </div>
                    <p className="fst-italic text-secondary mb-2">"{req.message}"</p>
                    {req.reply && (
                      <div className="bg-light border rounded p-3">
                        <small className="fw-bold text-primary">Technician Reply:</small>
                        <p className="mb-0 mt-1">{req.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


//  LEARN 
function Learn({ go, t }) {
  const [tab, setTab] = useState(0);
  const topics = [
    {
      icon:"", title:"Starting a Business",
      tips:[
        {q:"How do I register my business?", a:"Register on Irembo.gov.rw or visit the nearest RDB office. It costs only 10,000 RWF and takes 1 day. You'll get a TIN number and business certificate."},
        {q:"Do I need a business plan?", a:"For a small hustle, a simple one-page plan is enough. Write your product/service, target customers, startup cost, and expected monthly profit."},
        {q:"What is the best time to start?", a:"Start part-time while you still have income. Test your idea with small capital first — if it works, scale up. Never quit your job before your hustle earns double your salary."},
        {q:"How do I find my first customers?", a:"Start with people you know — family, friends, neighbours, church members. Ask them to refer others. WhatsApp is the #1 marketing tool for small businesses in Rwanda."},
      ]
    },
    {
      icon:"", title:"Finance & Loans",
      tips:[
        {q:"How do I get a BRD loan?", a:"Visit any BRD branch with your national ID, business registration certificate, and a simple business plan. BRD offers loans from 500K to 50M RWF at 12–15% interest per year."},
        {q:"What is Umurenge SACCO?", a:"Every sector (Umurenge) in Rwanda has a SACCO — a community savings group. Save regularly, then borrow up to 3× your savings at low interest. Perfect for small hustle capital."},
        {q:"How do I accept payments?", a:"Register a MTN MoMo or Airtel Money merchant account (free). Share your merchant code with customers. Money arrives instantly. Reduces theft risk from keeping cash."},
        {q:"How much profit should I reinvest?", a:"Reinvest at least 30% of monthly profit back into your hustle for the first year. Use the rest for personal needs. This compounds your growth quickly."},
      ]
    },
    {
      icon:"", title:"Marketing & Growth",
      tips:[
        {q:"How do I market my business for free?", a:"Create a WhatsApp Business profile with your logo, description and catalogue. Post on Facebook Marketplace. Ask every happy customer to refer 2 friends."},
        {q:"Should I use Instagram?", a:"Yes if your business is visual — food, fashion, beauty, events. Post daily with good lighting. Use local hashtags like #Kigali #Rwanda #RwandaFood. Stories get more views than posts."},
        {q:"How do I keep customers coming back?", a:"Remember their names. Offer a small loyalty reward (10th purchase free). Follow up via WhatsApp after a sale. People return to businesses that make them feel valued."},
        {q:"When should I hire someone?", a:"When you're turning away customers or working more than 12 hours/day. Your first hire should do the task you're worst at, so you focus on growing the business."},
      ]
    },
    {
      icon:"", title:"Rwanda Resources",
      tips:[
        {q:"What is Irembo?", a:"Irembo (irembo.gov.rw) is Rwanda's e-government platform. You can register businesses, pay taxes, get permits, apply for documents — all online or via an Irembo agent near you."},
        {q:"What does WDA/TVET offer?", a:"The Workforce Development Authority offers FREE vocational training in over 30 skills — tailoring, construction, ICT, hospitality, agribusiness. Apply at wda.gov.rw or any IPRC campus."},
        {q:"What is the RDB?", a:"Rwanda Development Board (rdb.rw) supports entrepreneurs with business registration, investment facilitation and export support. They run free entrepreneurship programmes for youth."},
        {q:"Where can I sell my products online?", a:"Use Jumia Rwanda, KiMarket, or Facebook Marketplace for physical products. For digital services, use Upwork or Fiverr. WhatsApp Business is #1 for local sales in Rwanda."},
      ]
    },
  ];
  const [openQ, setOpenQ] = useState(null);
  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F8FAFC"}}>
      <div style={{maxWidth:760,margin:"0 auto",padding:"36px 20px"}}>
        <div className="u1" style={{marginBottom:28,textAlign:"center"}}>
          <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:31,color:"#0D1F0D",marginBottom:8}}>Business Learning Centre</h1>
          <p style={{color:"#4A6741",fontSize:18}}>Free knowledge to help you launch and grow your hustle in Rwanda</p>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
          {topics.map((tp,i)=>(
            <button key={i} onClick={()=>{setTab(i);setOpenQ(null);}} style={{background:tab===i?"#2563EB":"#fff",color:tab===i?"#fff":"#475569",border:`2px solid ${tab===i?"#2563EB":"#E2E8F0"}`,borderRadius:100,padding:"8px 18px",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s"}}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>
        {/* FAQ accordion */}
        <div className="u1">
          {topics[tab].tips.map((tip,i)=>(
            <div key={i} className="card" style={{marginBottom:10,overflow:"hidden",cursor:"pointer"}} onClick={()=>setOpenQ(openQ===i?null:i)}>
              <div style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <div style={{fontWeight:600,fontSize:18,color:"#0F172A"}}>{tip.q}</div>
                <div style={{fontSize:21,color:"#2563EB",flexShrink:0,transition:"transform .2s",transform:openQ===i?"rotate(180deg)":"none"}}></div>
              </div>
              {openQ===i&&(
                <div style={{padding:"0 20px 18px",fontSize:17,color:"#475569",lineHeight:1.75,borderTop:"1px solid #E8F5E9",paddingTop:14}}>{tip.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:28}}>
          <button className="btn btn-g" onClick={()=>go("predict")}>Ready? Find Your Hustle</button>
        </div>
      </div>
    </div>
  );
}

//  SUCCESS STORIES 
function Stories({ stories, t, user, token, API_URL, fetchStories }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ hustle: "", quote: "", tags: "" });
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.hustle.trim() || !form.quote.trim()) { setErr("Please fill all fields."); return; }
    setBusy(true); setErr("");
    try {
      const r = await fetch(`${API_URL}/api/user/submit-story`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title: form.hustle, content: form.quote, tags: form.tags, name: user?.name })
      });
      const d = await r.json();
      if (d.error) { setErr(d.error); setBusy(false); return; }
      setSuccess("Your story has been submitted for review. Thank you!");
      setForm({ hustle: "", quote: "", tags: "" });
      setShowForm(false);
      if (fetchStories) fetchStories();
    } catch { setErr("Could not submit. Please try again."); }
    setBusy(false);
  };

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize:"43px", fontWeight: 800, marginBottom: "16px" }}>{t.stories}</h1>
        <p style={{ color: "#64748b", fontSize:"21px", marginBottom: "24px" }}>Real stories of success from the Rwanda Hustle community</p>
        {user && (
          <button onClick={() => { setShowForm(!showForm); setSuccess(""); setErr(""); }}
            style={{ padding: "12px 28px", background: showForm ? "#fff" : "linear-gradient(135deg,#2563EB,#1E40AF)", color: showForm ? "#2563EB" : "#fff", border: "1.5px solid #2563EB", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            {showForm ? "Cancel" : "Share Your Story"}
          </button>
        )}
      </div>

      {/* Submit form */}
      {showForm && user && (
        <div className="card u1" style={{ maxWidth: 640, margin: "0 auto 48px", padding: 32 }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{t.shareStoryTitle}</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>{t.shareStorySub}</p>
          <form onSubmit={submit}>
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Your Business / Hustle Name *</label>
              <input className="inp" placeholder="e.g. Mobile Money Agent, Tailoring Shop..." value={form.hustle} onChange={e => setForm({ ...form, hustle: e.target.value })} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Your Success Story *</label>
              <textarea className="inp" placeholder={t.shareStoryPh} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })}
                style={{ minHeight: 130, resize: "vertical" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="lbl">Tags (optional, comma-separated)</label>
              <input className="inp" placeholder="e.g. Kigali, Trade, 2024" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
            </div>
            {err && <div style={{ background: "#FEF2F2", color: "#DC2626", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{err}</div>}
            <button type="submit" disabled={busy} className="btn btn-g" style={{ width: "100%", padding: 13 }}>
              {busy ? "Submitting..." : t.shareStoryBtn}
            </button>
          </form>
        </div>
      )}

      {success && (
        <div style={{ background: "#F0FDF4", color: "#16A34A", borderRadius: 10, padding: "14px 20px", maxWidth: 640, margin: "0 auto 32px", textAlign: "center", fontWeight: 600, border: "1px solid #BBF7D0" }}>
          {success}
        </div>
      )}

      {!user && (
        <div style={{ background: "#EFF6FF", borderRadius: 10, padding: "16px 20px", maxWidth: 640, margin: "0 auto 32px", textAlign: "center", border: "1px solid #BFDBFE" }}>
          <span style={{ color: "#1E40AF", fontWeight: 600 }}>Want to share your story? </span>
          <span style={{ color: "#64748b" }}>Log in to inspire the community.</span>
        </div>
      )}

      {stories.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px" }}>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>No success stories yet. Be the first to share yours!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {stories.map((s, i) => (
            <div key={i} className="card u1" style={{ padding: "28px", position: "relative", animationDelay: `${i*0.05}s` }}>
              <div style={{ position: "absolute", top: "20px", right: "20px", fontSize:"43px", opacity: 0.07 }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)", borderRadius: "50%", display: "grid", placeItems: "center", fontSize:"25px", flexShrink: 0 }}></div>
                <div>
                  <h3 style={{ fontSize:"19px", fontWeight: 700, marginBottom: 2 }}>{s.name}</h3>
                  <div style={{ color: "#2563eb", fontWeight: 600, fontSize:"16px" }}>{s.hustle || s.title}</div>
                </div>
              </div>
              <p style={{ color: "#475569", lineHeight: "1.7", fontStyle: "italic", marginBottom: "16px", fontSize: 14 }}>"{s.quote || s.content}"</p>
              {s.tags && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {s.tags.split(',').map((tag, j) => (
                    <span key={j} style={{ padding: "3px 10px", background: "#f1f5f9", borderRadius: "100px", fontSize:"14px", fontWeight: 600, color: "#64748b" }}>{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function Announcements({ announcements, t }) {
  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize:"43px", fontWeight: 800, marginBottom: "16px" }}>{t.announce}</h1>
        <p style={{ color: "#64748b", fontSize:"21px" }}>Stay updated with the latest opportunities and platform news</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {announcements.length === 0 ? (
          <div className="card" style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
            <p>No announcements at this time.</p>
          </div>
        ) : (
          announcements.map((a, i) => (
            <div key={i} className="card u1" style={{ padding: "24px", display: "flex", gap: "24px", alignItems: "flex-start", animationDelay: `${i*0.1}s` }}>
              <div style={{ padding: "8px 16px", borderRadius: "12px", fontSize:"15px", fontWeight: "700", background: a.category === 'Opportunity' ? "#f0fdf4" : "#eff6ff", color: a.category === 'Opportunity' ? "#16a34a" : "#2563eb", whiteSpace: "nowrap" }}>
                {a.category}
              </div>
              <div>
                <h3 style={{ fontSize:"21px", fontWeight: 700, marginBottom: "8px" }}>{a.title}</h3>
                <p style={{ color: "#475569", lineHeight: "1.6" }}>{a.content}</p>
                <div style={{ marginTop: "12px", fontSize:"15px", color: "#94a3b8", fontWeight: "600" }}>{new Date().toLocaleDateString()}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


//  CALCULATOR 
function Calculator({ go, t }) {
  const [tab, setTab] = useState(0);
  // Profit calculator
  const [revenue, setRevenue] = useState("");
  const [costs, setCosts] = useState("");
  // Loan calculator
  const [loanAmt, setLoanAmt] = useState("");
  const [loanRate, setLoanRate] = useState("15");
  const [loanMonths, setLoanMonths] = useState("12");
  // Savings calculator
  const [saveAmt, setSaveAmt] = useState("");
  const [saveMonths, setSaveMonths] = useState("6");
  const [saveGoal, setSaveGoal] = useState("");

  const profit = (+revenue||0) - (+costs||0);
  const margin = revenue ? Math.round((profit / +revenue) * 100) : 0;

  const monthlyRate = (+loanRate||15) / 100 / 12;
  const n = +loanMonths||12;
  const monthlyPayment = loanAmt
    ? Math.round((+loanAmt * monthlyRate) / (1 - Math.pow(1+monthlyRate, -n)))
    : 0;
  const totalRepay = monthlyPayment * n;
  const totalInterest = totalRepay - (+loanAmt||0);

  const totalSaved = (+saveAmt||0) * (+saveMonths||6);
  const goalMet = saveGoal ? totalSaved >= +saveGoal : false;
  const monthsToGoal = saveGoal && saveAmt ? Math.ceil(+saveGoal / +saveAmt) : 0;

  const tabs = ["Profit","Loan","Savings"];
  return (
    <div style={{paddingTop:60,minHeight:"100vh",background:"#F8FAFC"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"36px 20px"}}>
        <div className="u1" style={{marginBottom:28,textAlign:"center"}}>
          <h1 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:31,color:"#0F172A",marginBottom:8}}>Business Calculator</h1>
          <p style={{color:"#475569",fontSize:18}}>Plan your profit, loan repayments and savings goal</p>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:24,background:"#EFF6FF",borderRadius:12,padding:4}}>
          {tabs.map((tb,i)=>(
            <button key={i} onClick={()=>setTab(i)} style={{flex:1,background:tab===i?"#fff":"transparent",border:"none",borderRadius:10,padding:"10px 8px",fontSize:16,fontWeight:tab===i?700:500,color:tab===i?"#2563EB":"#475569",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .2s",boxShadow:tab===i?"0 2px 8px rgba(0,0,0,.08)":"none"}}>
              {tb}
            </button>
          ))}
        </div>

        {tab===0&&(
          <div className="card u1" style={{padding:28}}>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:21,marginBottom:20,color:"#0F172A"}}>Monthly Profit Calculator</h3>
            <div style={{marginBottom:16}}><label className="lbl">Monthly Revenue (RWF)</label><input className="inp" type="number" placeholder="e.g. 500000" value={revenue} onChange={e=>setRevenue(e.target.value)}/></div>
            <div style={{marginBottom:20}}><label className="lbl">Monthly Costs (rent, supplies, transport...)</label><input className="inp" type="number" placeholder="e.g. 200000" value={costs} onChange={e=>setCosts(e.target.value)}/></div>
            {revenue&&costs&&(
              <div style={{background:profit>0?"linear-gradient(135deg,#EFF6FF,#F1F8E9)":"linear-gradient(135deg,#FFEBEE,#FFF5F5)",borderRadius:14,padding:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,textAlign:"center"}}>
                  {[["Net Profit",`${profit.toLocaleString()} RWF`,profit>0?"#2563EB":"#E53935"],["Profit Margin",`${margin}%`,margin>20?"#2563EB":margin>10?"#F9A825":"#E53935"],["Per Day",`${Math.round(profit/30).toLocaleString()} RWF`,profit>0?"#2563EB":"#E53935"]].map(([l,v,c],i)=>(
                    <div key={i}><div style={{fontSize:14,color:"#94A3B8",textTransform:"uppercase",fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontWeight:800,fontSize:21,color:c,fontFamily:"'Sora',sans-serif"}}>{v}</div></div>
                  ))}
                </div>
                <div style={{marginTop:14,fontSize:16,color:"#475569",textAlign:"center"}}>
                  {profit>0 ? margin>30 ? "Excellent margin! Reinvest 30% for fast growth." : margin>15 ? "Good profit. Keep reducing costs to improve margin." : "Thin margin. Find ways to increase prices or cut costs." : "Running at a loss. Review your pricing immediately."}
                </div>
              </div>
            )}
          </div>
        )}

        {tab===1&&(
          <div className="card u1" style={{padding:28}}>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:21,marginBottom:20,color:"#0F172A"}}>Loan Repayment Calculator</h3>
            <div style={{marginBottom:14}}><label className="lbl">Loan Amount (RWF)</label><input className="inp" type="number" placeholder="e.g. 1000000" value={loanAmt} onChange={e=>setLoanAmt(e.target.value)}/></div>
            <div style={{marginBottom:14}}><label className="lbl">Annual Interest Rate (%)</label>
              <select className="sel" value={loanRate} onChange={e=>setLoanRate(e.target.value)}>
                <option value="12">12% — BRD Agricultural Loan</option>
                <option value="15">15% — BRD Business Loan</option>
                <option value="18">18% — Umurenge SACCO</option>
                <option value="24">24% — Bank of Kigali</option>
                <option value="36">36% — Microfinance</option>
              </select>
            </div>
            <div style={{marginBottom:20}}><label className="lbl">Repayment Period (months)</label>
              <select className="sel" value={loanMonths} onChange={e=>setLoanMonths(e.target.value)}>
                {[3,6,12,18,24,36,48,60].map(m=><option key={m} value={m}>{m} months ({m<12?m+" months":Math.floor(m/12)+(m%12?" year "+m%12+" months":" years")})</option>)}
              </select>
            </div>
            {loanAmt&&(
              <div style={{background:"linear-gradient(135deg,#EFF6FF,#F1F8E9)",borderRadius:14,padding:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,textAlign:"center",marginBottom:12}}>
                  {[["Monthly Payment",`${monthlyPayment.toLocaleString()} RWF`,"#2563EB"],["Total Repay",`${totalRepay.toLocaleString()} RWF`,"#0F172A"],["Total Interest",`${totalInterest.toLocaleString()} RWF`,"#E65100"],["Interest %",`${Math.round((totalInterest/(+loanAmt))*100)}%`,"#E65100"]].map(([l,v,c],i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 8px"}}><div style={{fontSize:13,color:"#94A3B8",textTransform:"uppercase",fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontWeight:800,fontSize:19,color:c,fontFamily:"'Sora',sans-serif"}}>{v}</div></div>
                  ))}
                </div>
                <div style={{fontSize:16,color:"#475569",textAlign:"center"}}>
                  Make sure your monthly profit is at least <b style={{color:"#2563EB"}}>{(monthlyPayment*2).toLocaleString()} RWF</b> before taking this loan (2× repayment rule).
                </div>
              </div>
            )}
          </div>
        )}

        {tab===2&&(
          <div className="card u1" style={{padding:28}}>
            <h3 style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:21,marginBottom:20,color:"#0F172A"}}>Savings Goal Calculator</h3>
            <div style={{marginBottom:14}}><label className="lbl">Monthly Savings Amount (RWF)</label><input className="inp" type="number" placeholder="e.g. 50000" value={saveAmt} onChange={e=>setSaveAmt(e.target.value)}/></div>
            <div style={{marginBottom:14}}><label className="lbl">Savings Goal (RWF) — optional</label><input className="inp" type="number" placeholder="e.g. 500000" value={saveGoal} onChange={e=>setSaveGoal(e.target.value)}/></div>
            <div style={{marginBottom:20}}><label className="lbl">How many months will you save?</label>
              <select className="sel" value={saveMonths} onChange={e=>setSaveMonths(e.target.value)}>
                {[1,2,3,4,5,6,8,10,12,18,24].map(m=><option key={m} value={m}>{m} month{m>1?"s":""}</option>)}
              </select>
            </div>
            {saveAmt&&(
              <div style={{background:"linear-gradient(135deg,#EFF6FF,#F1F8E9)",borderRadius:14,padding:20}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,textAlign:"center",marginBottom:12}}>
                  {[["Total Saved",`${totalSaved.toLocaleString()} RWF`,"#2563EB"],["Per Year",`${(+saveAmt*12).toLocaleString()} RWF`,"#0F172A"]].map(([l,v,c],i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 8px"}}><div style={{fontSize:13,color:"#94A3B8",textTransform:"uppercase",fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontWeight:800,fontSize:19,color:c,fontFamily:"'Sora',sans-serif"}}>{v}</div></div>
                  ))}
                </div>
                {saveGoal&&(
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:15,color:"#475569",marginBottom:6}}>
                      <span>Progress to goal</span><span>{Math.min(100,Math.round((totalSaved/+saveGoal)*100))}%</span>
                    </div>
                    <div style={{height:10,background:"#DBEAFE",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${Math.min(100,Math.round((totalSaved/+saveGoal)*100))}%`,background:"linear-gradient(90deg,#2563EB,#1E40AF)",borderRadius:99,transition:"width .4s"}}/>
                    </div>
                    <div style={{fontSize:16,color:"#475569",textAlign:"center",marginTop:10}}>
                      {goalMet ? `Goal reached in ${saveMonths} months!` : `Need ${monthsToGoal} months to reach your goal of ${(+saveGoal).toLocaleString()} RWF`}
                    </div>
                  </div>
                )}
                <div style={{fontSize:16,color:"#475569",textAlign:"center"}}>
                  Save with <b>Umurenge SACCO</b> to earn interest AND qualify for a loan up to 3× your savings.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{textAlign:"center",marginTop:24}}>
          <button className="btn btn-g" onClick={()=>go("predict")}>Find Your Best Hustle</button>
        </div>
      </div>
    </div>
  );
}

//  SUPPORT REQUEST 
function Support({ user, t, go }) {
  const [msg, setMsg] = useState("");
  const [contact, setContact] = useState(user?.email_phone || "");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setBusy(true);
    try {
      const r = await fetch("/api/user/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id || null,
          contact: contact,
          message: msg
        })
      });
      if (r.ok) {
        setDone(true);
        setMsg("");
      } else {
        alert("Failed to send request. Please try again.");
      }
    } catch (e) {
      alert("Connection error.");
    }
    setBusy(false);
  };

  if (done) {
    return (
      <div className="container" style={{ paddingTop: "140px", textAlign: "center" }}>
        <div className="card u1" style={{ maxWidth: "500px", margin: "0 auto", padding: "60px 40px" }}>
          <div style={{ fontSize:"67px", marginBottom: "24px" }}></div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize:"31px", marginBottom: "16px" }}>Request Sent!</h2>
          <p style={{ color: "#64748B", lineHeight: "1.6", marginBottom: "32px" }}>
            Your message has been received by our technical support team. We will contact you via <b>{contact}</b> within 24 hours.
          </p>
          <button className="btn btn-g" style={{ width: "100%" }} onClick={() => go("dashboard")}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize:"43px", fontWeight: 800, marginBottom: "16px" }}>Technical Support</h1>
          <p style={{ color: "#64748B", fontSize:"21px" }}>Need help with your account or have a technical question? Send us a message.</p>
        </div>

        <div className="card u1" style={{ padding: "40px", border: "1px solid #E2E8F0" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <label className="lbl">Contact Information</label>
              <input 
                className="inp" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
                placeholder="Email or Phone number"
                required
              />
              <p style={{ fontSize:"15px", color: "#94A3B8", marginTop: "8px" }}>We'll use this to reply to your request.</p>
            </div>
            <div style={{ marginBottom: "32px" }}>
              <label className="lbl">How can we help you?</label>
              <textarea 
                className="inp" 
                value={msg} 
                onChange={(e) => setMsg(e.target.value)} 
                placeholder="Describe your issue or question in detail..."
                required
                style={{ minHeight: "180px", resize: "vertical" }}
              />
            </div>
            <button type="submit" disabled={busy} className="btn btn-g" style={{ width: "100%", padding: "16px", fontSize:"19px" }}>
              {busy ? "Sending..." : "Send Support Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

//  ADMIN PANEL 
function AdminPanel({ user, token, t }) {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const r = await fetch("/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const d = await r.json();
      if(Array.isArray(d)) setUsers(d);
    } catch (e) {}
  };

  const postStory = async (e) => {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.target);
    try {
      const r = await fetch("/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title: f.get("title"), content: f.get("content") })
      });
      if (r.ok) { setMsg("Story published successfully! "); e.target.reset(); }
    } catch (e) {}
    setBusy(false);
  };

  const postAnnounce = async (e) => {
    e.preventDefault();
    setBusy(true);
    const f = new FormData(e.target);
    try {
      const r = await fetch("/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title: f.get("title"), content: f.get("content"), category: f.get("category") })
      });
      if (r.ok) { setMsg("Announcement live! "); e.target.reset(); }
    } catch (e) {}
    setBusy(false);
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "100vh", background: "#F8FAFC" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize:"31px", color: "#0F172A", marginBottom: "8px" }}>Management Console</h1>
          <p style={{ color: "#64748B" }}>Control platform content and monitor user activity.</p>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", overflowX: "auto", paddingBottom: "4px" }}>
          {[
            {id: "users", label: t.manageUsers, ic: ""},
            {id: "story", label: t.manageStories, ic: ""},
            {id: "announce", label: t.manageAnnounce, ic: ""}
          ].map(tab => (
            <button key={tab.id} className={`chip ${activeTab === tab.id ? 'on' : ''}`} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 20px", borderRadius: "12px" }}>
              {tab.ic} {tab.label}
            </button>
          ))}
        </div>

        {msg && (
          <div className="pop" style={{ padding: "14px 20px", background: "#F0FDF4", color: "#166534", borderRadius: "12px", marginBottom: "24px", border: "1px solid #DCFCE7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>{msg}</span>
            <button onClick={() => setMsg("")} style={{ background: "none", border: "none", color: "#166534", cursor: "pointer", fontWeight: 800 }}></button>
          </div>
        )}

        <div className="card pop" style={{ padding: "32px", border: "1px solid #E2E8F0" }}>
          {activeTab === "users" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize:"23px" }}>{t.all_users}</h3>
                <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 12px", borderRadius: "20px", fontSize:"15px", fontWeight: 700 }}>{users.length} Registered</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#64748B", fontSize:"15px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      <th style={{ padding: "12px 16px" }}>User</th>
                      <th style={{ padding: "12px 16px" }}>Contact Info</th>
                      <th style={{ padding: "12px 16px" }}>Role</th>
                      <th style={{ padding: "12px 16px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ background: "#F8FAFC", borderRadius: "12px", transition: "transform 0.2s" }}>
                        <td style={{ padding: "16px", borderRadius: "12px 0 0 12px", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", borderLeft: "1px solid #F1F5F9" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "36px", height: "36px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize:"21px", border: "1px solid #E2E8F0" }}></div>
                            <div style={{ fontWeight: 700, color: "#0F172A" }}>{u.name}</div>
                          </div>
                        </td>
                        <td style={{ padding: "16px", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", color: "#475569", fontSize:"16px" }}>{u.email_phone}</td>
                        <td style={{ padding: "16px", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
                          <span style={{ fontSize:"15px", fontWeight: 600, color: u.role === 'support_technician' ? "#7C3AED" : "#2563EB", background: u.role === 'support_technician' ? "#F5F3FF" : "#EFF6FF", padding: "4px 10px", borderRadius: "6px" }}>{u.role}</span>
                        </td>
                        <td style={{ padding: "16px", borderRadius: "0 12px 12px 0", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", borderRight: "1px solid #F1F5F9" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: u.verified ? "#10B981" : "#EF4444" }}></div>
                            <span style={{ fontSize:"15px", fontWeight: 700, color: u.verified ? "#059669" : "#DC2626" }}>{u.verified ? t.verified : t.unverified}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "story" && (
            <div style={{ maxWidth: "600px" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize:"23px", marginBottom: "24px" }}>Create Success Story</h3>
              <form onSubmit={postStory}>
                <div style={{ marginBottom: "16px" }}>
                  <label className="lbl">Story Title</label>
                  <input name="title" className="inp" placeholder="e.g. Jean's Grocery Shop Success" required />
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label className="lbl">Content / Quote</label>
                  <textarea name="content" className="inp" placeholder="Describe the success story..." required style={{ minHeight: "150px", resize: "vertical" }} />
                </div>
                <button type="submit" disabled={busy} className="btn btn-g" style={{ width: "100%", padding: "14px" }}>
                  {busy ? "Publishing..." : "Publish Story"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "announce" && (
            <div style={{ maxWidth: "600px" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize:"23px", marginBottom: "24px" }}>New Announcement</h3>
              <form onSubmit={postAnnounce}>
                <div style={{ marginBottom: "16px" }}>
                  <label className="lbl">Announcement Title</label>
                  <input name="title" className="inp" placeholder="e.g. New BRD Loan Opportunity" required />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label className="lbl">Category</label>
                  <select name="category" className="sel">
                    <option value="Announcement">Announcement</option>
                    <option value="Opportunity">Opportunity</option>
                    <option value="Update">System Update</option>
                  </select>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label className="lbl">Details</label>
                  <textarea name="content" className="inp" placeholder="Provide all the details..." required style={{ minHeight: "150px", resize: "vertical" }} />
                </div>
                <button type="submit" disabled={busy} className="btn btn-g" style={{ width: "100%", padding: "14px" }}>
                  {busy ? "Posting..." : "Post Announcement"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


//  APP ROOT 
export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("hustleLang") || "en");
  const [pg, setPg] = useState("home");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("hustleUser") || "null"));
  const [token, setToken] = useState(localStorage.getItem("hustleToken") || "");
  const [results, setResults] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [stories, setStories] = useState([
    { name: "Jean de Dieu", hustle: "Electronics Repair", quote: "I started with just a screwdriver kit in Kigali. Rwanda Hustle helped me see the potential in my skills. Now I have a shop in Nyarugenge!", tags: "Technology,Success,Kigali" },
    { name: "Marie Claire", hustle: "Ibitenge Fashion", quote: "The profit estimates were so accurate! I knew exactly how much to reinvest. My tailoring business is now supporting my whole family.", tags: "Fashion,Musanze,Growth" },
    { name: "Emmanuel", hustle: "Poultry Farming", quote: "BRD loans seemed scary until I used the calculator here. I applied for 2M RWF and now have over 200 chickens in Bugesera.", tags: "Agri,Bugesera,Finance" }
  ]);
  const [announcements, setAnnouncements] = useState([
    { title: "New BRD Entrepreneurship Grant", category: "Opportunity", content: "Apply for interest-free grants for tech-based side hustles. Visit the RDB portal for details." },
    { title: "Kigali Market Day", category: "Announcement", content: "Join the local entrepreneurs meet-up at Car Free Zone this Saturday. Networking and sales!" },
    { title: "System Update: SMS Verification", category: "Update", content: "We have integrated Africa's Talking for faster account activation via SMS." }
  ]);

  const t = T[lang] || T["en"];
  const API_URL = "";  // Vite proxy forwards /auth and /api to Flask:8080


  useEffect(() => {
    localStorage.setItem("hustleLang", lang);
  }, [lang]);

  useEffect(() => {
    fetchStories();
    fetchAnnouncements();
    fetchHustleData();
  }, []);

  const fetchHustleData = async () => {
    try {
      const r = await fetch(`${API_URL}/api/hustle-data`);
      const data = await r.json();
      if (data && typeof data === 'object') {
        // Convert backend object format to frontend array format
        const converted = {};
        Object.entries(data).forEach(([name, d]) => {
          converted[name] = [
            d.avg_score,
            d.avg_profit,
            d.avg_capital,
            d.avg_hours_per_week,
            d.category,
            d.avg_revenue,
            d.pct_experience || 0.5,
            d.skill_category || "",       // [7] direct skill category key
            d.min_capital || d.avg_capital * 0.5,  // [8] minimum capital
            d.min_hours_per_week || d.avg_hours_per_week * 0.5, // [9] min hours
          ];
        });
        HD = converted;
      }
    } catch (e) {
      console.error("Failed to sync hustle data:", e);
    }
  };

  const fetchStories = async () => {
    try {
      const r = await fetch(`${API_URL}/api/stories`);
      const d = await r.json();
      if(Array.isArray(d)) setStories(d);
    } catch (e) {}
  };

  const fetchAnnouncements = async () => {
    try {
      const r = await fetch(`${API_URL}/api/announcements`);
      const d = await r.json();
      if(Array.isArray(d)) setAnnouncements(d);
    } catch (e) {}
  };

  const onAuth = async (data, mode) => {
    try {
      if (mode === "signup") {
        const r = await fetch(`${API_URL}/auth/signup`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const d = await r.json();
        if (d.error) return { error: d.error };
        
        // Check if auto-login is enabled
        if (d.auto_login && d.token && d.user) {
          // Auto-login the user - redirect to profile
          const dest = d.user?.role === "support_technician" ? "admin" : "profile";
          
          localStorage.setItem("hustleToken", d.token);
          localStorage.setItem("hustleUser", JSON.stringify(d.user));
          setUser(d.user);
          setToken(d.token);
          
          setTimeout(() => setPg(dest), 10);
          return { success: true, auto_logged_in: true };
        }
        
        return {
          redirect_login: true,
          temp_password: d.test_password
        };
      } else {
        const r = await fetch(`${API_URL}/auth/login`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const d = await r.json();
        if (d.error) return { error: d.error, unverified: d.unverified };
        if (d.otp_required) {
          return { 
            otp_required: true, 
            email_phone: d.email_phone || data.email_phone,
            otp_code: d.test_code
          };
        }
        setUser(d.user);
        setToken(d.token);
        localStorage.setItem("hustleToken", d.token);
        localStorage.setItem("hustleUser", JSON.stringify(d.user));
        const dest = d.user?.role === "support_technician" ? "admin" : "profile";
        setTimeout(() => setPg(dest), 10);
        return { success: true };
      }
    } catch (e) {
      return { error: "Cannot connect to server. Make sure python app.py is running." };
    }
  };

  const onVerify = async (email_phone, code, directData) => {
    console.log("[DEBUG onVerify] Called with:", { email_phone, code, directData });
    try {
      // directData = already-resolved login data from OTP step
      if (directData?.token) {
        console.log("[DEBUG onVerify] Using directData token");
        const dest = directData.user?.role === "support_technician" ? "admin" : "profile";
        console.log("[DEBUG onVerify] User:", directData.user.name, "Role:", directData.user?.role, "Destination:", dest);
        
        // Write to localStorage FIRST
        localStorage.setItem("hustleToken", directData.token);
        localStorage.setItem("hustleUser", JSON.stringify(directData.user));
        
        // Set both state values together
        setUser(directData.user);
        setToken(directData.token);
        
        // Navigate after state is set - use setTimeout to ensure React batches the updates
        setTimeout(() => {
          console.log("[DEBUG onVerify] Navigating to:", dest);
          setPg(dest);
        }, 10);
        
        return { success: true };
      }
      
      const r = await fetch(`${API_URL}/auth/verify`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_phone, code }),
      });
      const d = await r.json();
      if (d.error) return { error: d.error };
      
      const dest = d.user?.role === "support_technician" ? "admin" : "profile";
      console.log("[DEBUG onVerify] User:", d.user.name, "Role:", d.user?.role, "Destination:", dest);
      
      localStorage.setItem("hustleToken", d.token);
      localStorage.setItem("hustleUser", JSON.stringify(d.user));
      setUser(d.user);
      setToken(d.token);
      
      setTimeout(() => {
        console.log("[DEBUG onVerify] Navigating to:", dest);
        setPg(dest);
      }, 10);
      
      return { success: true };
    } catch (e) {
      console.error("[DEBUG onVerify] Error:", e);
      return { error: "Verification failed. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("hustleToken");
    localStorage.removeItem("hustleUser");
    setPg("home");
  };

  const go = (p) => {
    setPg(p);
    window.scrollTo(0, 0);
  };

  const onResults = (res) => {
    setResults(res);
    setAllResults(prev => [res, ...prev]);
    setPg("results");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0F7FF", color: "#0f172a", fontFamily: "'Inter', sans-serif" }}>
      <style>{G}</style>
      <Nav pg={pg} go={go} user={user} logout={logout} lang={lang} setLang={setLang} t={t} />
      
      {console.log("[DEBUG RENDER] Current page:", pg, "User:", user?.name, "Role:", user?.role)}
      
      {pg === "home" && <Home go={go} user={user} t={t} />}
      {(pg === "login" || pg === "signup") && <Auth mode={pg} go={go} onAuth={onAuth} onVerify={onVerify} t={t} lang={lang} API_URL={API_URL} />}
      {pg === "stories" && <Stories stories={stories} t={t} user={user} token={token} API_URL={API_URL} fetchStories={fetchStories} />}
      {pg === "announce" && <Announcements announcements={announcements} t={t} />}
      
      {pg === "predict" && (
        user ? (
          <Predict user={user} token={token} go={go} setResults={onResults} t={t} lang={lang} />
        ) : (
          <Auth mode="login" go={go} onAuth={onAuth} onVerify={onVerify} t={t} lang={lang} API_URL={API_URL} />
        )
      )}

      {pg === "results" && <Results results={results} go={go} user={user} t={t} lang={lang} token={token} API_URL={API_URL} />}
      {pg === "profile" && user && (
        <EditProfile
          user={user} token={token} API_URL={API_URL}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("hustleUser", JSON.stringify(updatedUser));
            setPg("dashboard");
          }}
          onSkip={() => setPg("dashboard")}
        />
      )}
      {pg === "dashboard" && user && <Dashboard user={user} token={token} allResults={allResults} go={go} t={t} announcements={announcements} stories={stories} fetchStories={fetchStories} fetchAnnouncements={fetchAnnouncements} />}
      {pg === "support" && <Support user={user} t={t} go={go} />}
      
      {/* Admin page - Technical Support only */}
      {pg === "admin" && !user && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, border: "4px solid #DBEAFE", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 24px" }}></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1E40AF" }}>Loading Admin Dashboard...</div>
            <p style={{ color: "#64748B", marginTop: 8 }}>If this persists, <button style={{background:"none",border:"none",color:"#2563EB",cursor:"pointer",textDecoration:"underline"}} onClick={() => { localStorage.removeItem("hustleToken"); localStorage.removeItem("hustleUser"); go("login"); }}>log in again</button>.</p>
          </div>
        </div>
      )}
      {pg === "admin" && user?.role === 'support_technician' && (
        <>
          {console.log("[DEBUG] Rendering TechnicalDashboard for user:", user.name, "role:", user.role)}
          <TechnicalDashboard user={user} token={token} go={go} t={t} refreshStories={fetchStories} refreshAnnouncements={fetchAnnouncements} />
        </>
      )}
      {pg === "admin" && user && user?.role !== 'support_technician' && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "#FEE2E2" }}>
          <div className="card" style={{ maxWidth: 500, padding: 40, textAlign: "center", background: "#fff" }}>
            <h2 style={{ color: "#DC2626", marginBottom: 16 }}> Access Denied</h2>
            <p style={{ color: "#64748B", marginBottom: 24 }}>You need technical support privileges to access this page.</p>
            <p style={{ color: "#64748B", marginBottom: 24 }}>Current user: {user?.name || "none"} | Role: {user?.role || "none"}</p>
            <button className="btn btn-g" onClick={() => setPg("dashboard")}>Go to Dashboard</button>
          </div>
        </div>
      )}
      {!pg && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="card" style={{ maxWidth: 500, padding: 40, textAlign: "center" }}>
            <h2 style={{ color: "#DC2626", marginBottom: 16 }}> Loading...</h2>
            <p style={{ color: "#64748B" }}>Current page: {pg || "undefined"}</p>
            <p style={{ color: "#64748B" }}>User role: {user?.role || "none"}</p>
            <button className="btn btn-g" onClick={() => setPg("home")}>Go to Home</button>
          </div>
        </div>
      )}
      
      {user && <Chatbot user={user} results={results} t={t} />}
    </div>
  );
}
