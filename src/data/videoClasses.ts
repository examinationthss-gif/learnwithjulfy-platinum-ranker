export interface RelatedNote {
  dayId: string;
  labelEn: string;
  labelAs: string;
}

export interface RelatedMcq {
  dayId: string;
  labelEn: string;
  labelAs: string;
}

export interface NextVideoRef {
  youtubeId: string;
  titleEn: string;
  titleAs: string;
  isPlaylist: boolean;
  durationEn: string;
  durationAs: string;
  dayId?: string;
}

export interface MemoryEngineItem {
  formulaEn: string;
  formulaAs: string;
  breakdownEn: { key: string; val: string }[];
  breakdownAs: { key: string; val: string }[];
}

export interface VideoClass {
  id: string;
  titleEn: string;
  titleAs: string;
  durationEn: string;
  durationAs: string;
  youtubeId: string; // supports video ID or playlist ID
  isPlaylist: boolean; // flag for playlist embedding iframe (?list=...)
  descriptionEn: string;
  descriptionAs: string;
  typeEn?: string;
  typeAs?: string;
  topicEn?: string;
  topicAs?: string;
  dayId?: string;
  learningObjectivesEn?: string[];
  learningObjectivesAs?: string[];
  timelineEn?: { time: string; label: string }[];
  timelineAs?: { time: string; label: string }[];
  subtopicEn?: string;
  subtopicAs?: string;
  boardRelevanceEn?: string;
  boardRelevanceAs?: string;
  questionFrequencyEn?: string;
  questionFrequencyAs?: string;
  difficultyEn?: string;
  difficultyAs?: string;
  boardFocusEn?: string[];
  boardFocusAs?: string[];
  memoryEngine?: MemoryEngineItem;
  relatedNotes?: RelatedNote[];
  relatedMcq?: RelatedMcq;
  nextVideo?: NextVideoRef;
  previousVideo?: NextVideoRef;
}

export const videoClassesData: Record<string, VideoClass[]> = {
  unit1: [
    {
      id: "u1v1",
      titleEn: "AHSEC Class 12 Education: Mudaliar Commission (1952–53) | Chapter 1 Part 1",
      titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মুডালিয়াৰ আয়োগ (১৯৫২-৫৩) | অধ্যায় ১ খণ্ড ১",
      durationEn: "Approx. 9 Minutes",
      durationAs: "প্ৰায় ৯ মিনিট",
      youtubeId: "VvoNEuC-3JQ",
      isPlaylist: false,
      descriptionEn: "Learn everything about the Mudaliar Commission (1952–53) for AHSEC Class 12 Education. This lesson covers the background, formation, objectives, five pillars of education, impact on India and Assam, and board examination importance.",
      descriptionAs: "AHSEC দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ মুডালিয়াৰ আয়োগ (১৯৫২-৫৩) ৰ বিষয়ে সকলোখিনি শিকক। এই পাঠটোত ইয়াৰ পটভূমি, গঠন, উদ্দেশ্য, শিক্ষাৰ পাঁচটা স্তম্ভ, ভাৰত আৰু অসমত ইয়াৰ প্ৰভাৱ আৰু বোৰ্ড পৰীক্ষাৰ গুৰুত্ব আলোচনা কৰা হৈছে।",
      typeEn: "Video Lecture",
      typeAs: "ভিডিঅ' বক্তৃতা",
      topicEn: "Mudaliar Commission (1952–53)",
      topicAs: "মুডালিয়াৰ আয়োগ (১৯৫২-৫৩)",
      subtopicEn: "Secondary Education Commission",
      subtopicAs: "মাধ্যমিক শিক্ষা আয়োগ",
      boardRelevanceEn: "Very High",
      boardRelevanceAs: "অতি উচ্চ",
      questionFrequencyEn: "High",
      questionFrequencyAs: "উচ্চ",
      difficultyEn: "Moderate",
      difficultyAs: "মধ্যমীয়া",
      dayId: "day1",
      learningObjectivesEn: [
        "Explain the background of Mudaliar Commission",
        "Describe the formation of the Secondary Education Commission (1952)",
        "Discuss the five major aims of secondary education",
        "Explain Democratic Citizenship",
        "Explain Vocational Efficiency",
        "Explain Personality Development",
        "Explain Leadership Development",
        "Explain Character Formation",
        "Analyse the impact of the Commission on Indian education",
        "Relate the Commission with NEP 2020"
      ],
      learningObjectivesAs: [
        "মুডালিয়াৰ আয়োগৰ পটভূমি ব্যাখ্যা কৰা",
        "মাধ্যমিক শিক্ষা আয়োগৰ গঠন (১৯৫২) বৰ্ণনা কৰা",
        "মাধ্যমিক শিক্ষাৰ পাঁচটা প্ৰধান লক্ষ্য আলোচনা কৰা",
        "গণতান্ত্ৰিক নাগৰিকত্ব ব্যাখ্যা কৰা",
        "বৃত্তিমূলক দক্ষতা ব্যাখ্যা কৰা",
        "ব্যক্তিত্বৰ বিকাশ ব্যাখ্যা কৰা",
        "নেতৃত্বৰ বিকাশ ব্যাখ্যা কৰা",
        "চৰিত্ৰ গঠন ব্যাখ্যা কৰা",
        "ভাৰতীয় শিক্ষাৰ ওপৰত আয়োগৰ প্ৰভাৱ বিশ্লেষণ কৰা",
        "ৰাষ্ট্ৰীয় শিক্ষানীতি (NEP) ২০২০ৰ সৈতে আয়োগৰ সম্পৰ্ক নিৰূপণ কৰা"
      ],
      boardFocusEn: ["Very Short Questions", "Short Questions", "Long Questions", "Unit Tests", "Model Tests", "Board Examinations"],
      boardFocusAs: ["অতি চুটি উত্তৰৰ প্ৰশ্ন", "চুটি উত্তৰৰ প্ৰশ্ন", "দীঘল উত্তৰৰ প্ৰশ্ন", "গোট পৰীক্ষা", "আৰ্হি পৰীক্ষা", "বোৰ্ড পৰীক্ষা"],
      memoryEngine: {
        formulaEn: "DVPLC",
        formulaAs: "DVPLC",
        breakdownEn: [
          { key: "D", val: "Democratic Citizenship" },
          { key: "V", val: "Vocational Efficiency" },
          { key: "P", val: "Personality Development" },
          { key: "L", val: "Leadership Development" },
          { key: "C", val: "Character Formation" }
        ],
        breakdownAs: [
          { key: "D", val: "গণতান্ত্ৰিক নাগৰিকত্ব (Democratic Citizenship)" },
          { key: "V", val: "বৃত্তিমূলক দক্ষতা (Vocational Efficiency)" },
          { key: "P", val: "ব্যক্তিত্বৰ বিকাশ (Personality Development)" },
          { key: "L", val: "নেতৃত্বৰ বিকাশ (Leadership Development)" },
          { key: "C", val: "চৰিত্ৰ গঠন (Character Formation)" }
        ]
      },
      timelineEn: [
        { time: "00:00", label: "Introduction" },
        { time: "00:10", label: "Why Mudaliar Commission Matters Today" },
        { time: "00:36", label: "India After Independence (1947)" },
        { time: "00:55", label: "The Hidden Crisis in Education" },
        { time: "01:21", label: "Why Educational Reform Became Necessary" },
        { time: "01:42", label: "Formation of the Secondary Education Commission (1952)" },
        { time: "01:53", label: "Report That Changed Indian Education" },
        { time: "02:03", label: "Problems in the Old British Education System" },
        { time: "02:24", label: "What a New India Needed" },
        { time: "02:40", label: "Dr. Lakshman Swami Mudaliar" },
        { time: "03:00", label: "What the Commission Discovered" },
        { time: "03:19", label: "The Five Great Pillars of Education" },
        { time: "03:25", label: "Democratic Citizenship" },
        { time: "04:00", label: "Vocational Efficiency" },
        { time: "04:28", label: "Personality Development" },
        { time: "05:09", label: "Leadership Development" },
        { time: "05:42", label: "Character Formation" },
        { time: "06:18", label: "Impact on Indian Education" },
        { time: "06:36", label: "Impact on Assam Education" },
        { time: "06:54", label: "Connection with NEP 2020" },
        { time: "07:25", label: "Board Exam Intelligence" },
        { time: "07:45", label: "Topper Answer Writing Tips" },
        { time: "07:54", label: "Memory Trick (DVPLC Formula)" },
        { time: "08:15", label: "Why Mudaliar Commission Is a Milestone" },
        { time: "08:36", label: "Final Revision & Conclusion" }
      ],
      timelineAs: [
        { time: "00:00", label: "পৰিচয়" },
        { time: "00:10", label: "মুডালিয়াৰ আয়োগ আজিকালি কিয় প্ৰাসংগিক" },
        { time: "00:36", label: "স্বাধীনতাৰ পিছৰ ভাৰত (১৯৪৭)" },
        { time: "00:55", label: "শিক্ষাৰ গুপ্ত সংকট" },
        { time: "01:21", label: "শৈক্ষিক সংস্কাৰ কিয় প্ৰয়োজনীয় হৈ পৰিল" },
        { time: "01:42", label: "মাধ্যমিক শিক্ষা আয়োগৰ গঠন (১৯৫২)" },
        { time: "01:53", label: "ভাৰতীয় শিক্ষাক সলনি কৰা প্ৰতিবেদন" },
        { time: "02:03", label: "পুৰণি ব্ৰিটিছ শিক্ষা ব্যৱস্থাৰ সমস্যাসমূহ" },
        { time: "02:24", label: "নতুন ভাৰতক কিহৰ প্ৰয়োজন আছিল" },
        { time: "02:40", label: "ড° লক্ষ্মণ স্বামী মুডালিয়াৰ" },
        { time: "03:00", label: "আয়োগৰ আৱিষ্কাৰসমূহ" },
        { time: "03:19", label: "শিক্ষাৰ পাঁচটা গুৰুত্বপূৰ্ণ স্তম্ভ" },
        { time: "03:25", label: "গণতান্ত্ৰিক নাগৰিকত্ব" },
        { time: "04:00", label: "বৃত্তিমূলক দক্ষতা" },
        { time: "04:28", label: "ব্যক্তিত্বৰ বিকাশ" },
        { time: "05:09", label: "নেতৃত্বৰ বিকাশ" },
        { time: "05:42", label: "চৰিত্ৰ গঠন" },
        { time: "06:18", label: "ভাৰতীয় শিক্ষাত প্ৰভাৱ" },
        { time: "06:36", label: "অসমৰ শিক্ষাত প্ৰভাৱ" },
        { time: "06:54", label: "ৰাষ্ট্ৰীয় শিক্ষানীতি (NEP) ২০২০ৰ সৈতে সম্পৰ্ক" },
        { time: "07:25", label: "বোৰ্ড পৰীক্ষাৰ গুৰুত্বপূৰ্ণ টিপছ" },
        { time: "07:45", label: "টপাৰৰ উত্তৰ লিখাৰ কৌশল" },
        { time: "07:54", label: "মনত ৰখাৰ কৌশল (DVPLC ফৰ্মূলা)" },
        { time: "08:15", label: "মুডালিয়াৰ আয়োগ কিয় এক মাইলৰ খুঁটি" },
        { time: "08:36", label: "চূড়ান্ত পুনৰীক্ষণ আৰু সামৰণি" }
      ],
      relatedNotes: [
        { dayId: "day1", labelEn: "Day 1 Notes", labelAs: "দিন ১ ৰ টোকা" },
        { dayId: "day2", labelEn: "Day 2 Notes", labelAs: "দিন ২ ৰ টোকা" },
        { dayId: "day3", labelEn: "Day 3 Notes", labelAs: "দিন ৩ ৰ টোকা" },
        { dayId: "day4", labelEn: "Day 4 Notes", labelAs: "দিন ৪ ৰ টোকা" }
      ],
      relatedMcq: {
        dayId: "day1",
        labelEn: "Mudaliar Commission MCQ Set",
        labelAs: "মুডালিয়াৰ আয়োগ MCQ ছেট"
      },
      nextVideo: {
        youtubeId: "uFSll_pU1Yo",
        titleEn: "AHSEC Class 12 Education: Defects of Secondary Education (Mudaliar Commission) | Part 2",
        titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ (মুডালিয়াৰ আয়োগ) | খণ্ড ২",
        isPlaylist: false,
        durationEn: "Approx. 10 Minutes",
        durationAs: "প্ৰায় ১০ মিনিট",
        dayId: "day2"
      }
    },
    {
      id: "u1v2",
      titleEn: "AHSEC Class 12 Education: Defects of Secondary Education (Mudaliar Commission) | Part 2",
      titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ (মুডালিয়াৰ আয়োগ) | খণ্ড ২",
      durationEn: "Approx. 10 Minutes",
      durationAs: "প্ৰায় ১০ মিনিট",
      youtubeId: "uFSll_pU1Yo",
      isPlaylist: false,
      descriptionEn: "Understand the seven major defects of the old Indian secondary education system as identified by the Mudaliar Commission (1952–53). This lesson explains the shortcomings of the education system and their impact on students, making it highly important for AHSEC Class 12 Education Chapter 1 examination preparation.",
      descriptionAs: "মুডালিয়াৰ আয়োগ (১৯৫২-৫৩) ৰ দ্বাৰা চিনাক্ত কৰা পুৰণি ভাৰতীয় মাধ্যমিক শিক্ষা ব্যৱস্থাৰ সাতটা প্ৰধান ত্ৰুটি বুজি লওক। এই পাঠটোৱে শিক্ষা ব্যৱস্থাৰ ত্ৰুটিসমূহ আৰু ছাত্ৰ-ছাত্ৰীৰ ওপৰত ইয়াৰ প্ৰভাৱ ব্যাখ্যা কৰে, যাৰ বাবে ই AHSEC দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ প্ৰথম অধ্যায়ৰ পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে অতি গুৰুত্বপূৰ্ণ।",
      typeEn: "Video Lecture",
      typeAs: "ভিডিঅ' বক্তৃতা",
      topicEn: "Defects of Secondary Education",
      topicAs: "মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ",
      subtopicEn: "Mudaliar Commission (1952–53)",
      subtopicAs: "মুডালিয়াৰ আয়োগ (১৯৫২-৫৩)",
      boardRelevanceEn: "Very High",
      boardRelevanceAs: "অতি উচ্চ",
      questionFrequencyEn: "High",
      questionFrequencyAs: "উচ্চ",
      difficultyEn: "Moderate",
      difficultyAs: "মধ্যমীয়া",
      dayId: "day2",
      learningObjectivesEn: [
        "Explain the defects of secondary education identified by the Mudaliar Commission",
        "Discuss the limitations of bookish education",
        "Explain the examination-centred system",
        "Understand the importance of vocational education",
        "Analyze the problem of overloaded curriculum",
        "Explain the neglect of individual differences",
        "Discuss the importance of guidance services",
        "Explain the role of character formation in education",
        "Relate educational defects with educational reforms"
      ],
      learningObjectivesAs: [
        "মুডালিয়াৰ আয়োগৰ দ্বাৰা চিনাক্ত কৰা মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ ব্যাখ্যা কৰা",
        "পুথিগত শিক্ষাৰ সীমাবদ্ধতাসমূহ আলোচনা কৰা",
        "পৰীক্ষা-কেন্দ্ৰিক ব্যৱস্থাটো ব্যাখ্যা কৰা",
        "বৃত্তিমূলক শিক্ষাৰ গুৰুত্ব বুজি পোৱা",
        "ভাৰাক্ৰান্ত পাঠ্যক্ৰমৰ সমস্যা বিশ্লেষণ কৰা",
        "ব্যক্তিগত পাৰ্থক্যক অৱহেলা কৰাৰ বিষয়টো ব্যাখ্যা কৰা",
        "নিৰ্দেশনা সেৱাৰ গুৰুত্ব আলোচনা কৰা",
        "শিক্ষাত চৰিত্ৰ গঠনৰ ভূমিকা ব্যাখ্যা কৰা",
        "শৈক্ষিক ত্ৰুটিসমূহক শৈক্ষিক সংস্কাৰৰ সৈতে সম্পৰ্কিত কৰা"
      ],
      boardFocusEn: ["MCQ Questions", "Very Short Questions", "Short Questions", "Long Questions", "Unit Tests", "Model Tests", "Board Examinations"],
      boardFocusAs: ["MCQ প্ৰশ্ন", "অতি চুটি উত্তৰৰ প্ৰশ্ন", "চুটি উত্তৰৰ প্ৰশ্ন", "দীঘল উত্তৰৰ প্ৰশ্ন", "গোট পৰীক্ষা", "আৰঁহি পৰীক্ষা", "বোৰ্ড পৰীক্ষা"],
      memoryEngine: {
        formulaEn: "BEVOIGC",
        formulaAs: "BEVOIGC",
        breakdownEn: [
          { key: "B", val: "Bookish Education" },
          { key: "E", val: "Examination-Centred System" },
          { key: "V", val: "Vocational Education Missing" },
          { key: "O", val: "Overloaded Curriculum" },
          { key: "I", val: "Individual Differences Ignored" },
          { key: "G", val: "Guidance Services Missing" },
          { key: "C", val: "Character Formation Weak" }
        ],
        breakdownAs: [
          { key: "B", val: "পুথিগত শিক্ষা (Bookish Education)" },
          { key: "E", val: "পৰীক্ষা-কেন্দ্ৰিক ব্যৱস্থা (Examination-Centred System)" },
          { key: "V", val: "বৃত্তিমূলক শিক্ষাৰ অভাৱ (Vocational Education Missing)" },
          { key: "O", val: "ভাৰাক্ৰান্ত পাঠ্যক্ৰম (Overloaded Curriculum)" },
          { key: "I", val: "ব্যক্তিগত পাৰ্থক্যক অৱহেলা (Individual Differences Ignored)" },
          { key: "G", val: "নিৰ্দেশনা সেৱাৰ অভাৱ (Guidance Services Missing)" },
          { key: "C", val: "দুৰ্বল চৰিত্ৰ গঠন (Character Formation Weak)" }
        ]
      },
      timelineEn: [
        { time: "00:00", label: "Introduction – India after Independence and the old education system" },
        { time: "00:26", label: "Rahul's Story – Good Marks vs Real-Life Reality" },
        { time: "01:00", label: "Formation and Purpose of Mudaliar Commission" },
        { time: "01:27", label: "Defect 1 – Bookish Education" },
        { time: "02:25", label: "Defect 2 – Examination-Centred System" },
        { time: "03:23", label: "Defect 3 – Lack of Vocational Education" },
        { time: "04:23", label: "Defect 4 – Overloaded Curriculum" },
        { time: "04:56", label: "Defect 5 – Neglect of Individual Differences" },
        { time: "05:43", label: "Defect 6 – Lack of Guidance Services" },
        { time: "06:36", label: "Defect 7 – Weak Character Formation" },
        { time: "07:50", label: "Impact on Indian Education System" },
        { time: "08:18", label: "Quick Revision – Seven Defects Summary" },
        { time: "08:46", label: "Memory Trick – BEVOIGC Formula" },
        { time: "09:09", label: "Board Exam Quick Facts" },
        { time: "09:32", label: "Conclusion" }
      ],
      timelineAs: [
        { time: "00:00", label: "পৰিচয় – স্বাধীনতাৰ পিছৰ ভাৰত আৰু পুৰণি শিক্ষা ব্যৱস্থা" },
        { time: "00:26", label: "ৰাহুলৰ কাহিনী – ভাল নম্বৰ বনাম বাস্তৱ জীৱনৰ সত্য" },
        { time: "01:00", label: "মুডালিয়াৰ আয়োগৰ গঠন আৰু উদ্দেশ্য" },
        { time: "01:27", label: "ত্ৰুটি ১ – পুথিগত শিক্ষা" },
        { time: "02:25", label: "ত্ৰুটি ২ – পৰীক্ষা-কেন্দ্ৰিক ব্যৱস্থা" },
        { time: "03:23", label: "ত্ৰুটি ৩ – বৃত্তিমূলক শিক্ষাৰ অভাৱ" },
        { time: "04:23", label: "ত্ৰুটি ৪ – ভাৰাক্ৰান্ত পাঠ্যক্ৰম" },
        { time: "04:56", label: "ত্ৰুটি ৫ – ব্যক্তিগত পাৰ্থক্যক অৱহেলা" },
        { time: "05:43", label: "ত্ৰুটি ৬ – নিৰ্দেশনা সেৱাৰ অভাৱ" },
        { time: "06:36", label: "ত্ৰুটি ৭ – দুৰ্বল চৰিত্ৰ গঠন" },
        { time: "07:50", label: "ভাৰতীয় শিক্ষা ব্যৱস্থাৰ ওপৰত প্ৰভাৱ" },
        { time: "08:18", label: "দ্ৰুত পুনৰীক্ষণ – সাতটা ত্ৰুটিৰ সাৰাংশ" },
        { time: "08:46", label: "মনত ৰখাৰ কৌশল – BEVOIGC ফৰ্মূলা" },
        { time: "09:09", label: "বোৰ্ড পৰীক্ষাৰ গুৰুত্বপূৰ্ণ তথ্য" },
        { time: "09:32", label: "সামৰণি" }
      ],
      relatedNotes: [
        { dayId: "day4", labelEn: "Day 4 Notes", labelAs: "দিন ৪ ৰ টোকা" },
        { dayId: "day5", labelEn: "Day 5 Notes", labelAs: "দিন ৫ ৰ টোকা" },
        { dayId: "day6", labelEn: "Day 6 Notes", labelAs: "দিন ৬ ৰ টোকা" },
        { dayId: "day7", labelEn: "Day 7 Notes", labelAs: "দিন ৭ ৰ টোকা" }
      ],
      relatedMcq: {
        dayId: "day2",
        labelEn: "Defects of Secondary Education MCQ Set",
        labelAs: "মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ MCQ ছেট"
      },
      previousVideo: {
        youtubeId: "VvoNEuC-3JQ",
        titleEn: "AHSEC Class 12 Education: Mudaliar Commission (1952–53) | Chapter 1 Part 1",
        titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মুডালিয়াৰ আয়োগ (১৯৫২-৫৩) | অধ্যায় ১ খণ্ড ১",
        isPlaylist: false,
        durationEn: "Approx. 9 Minutes",
        durationAs: "প্ৰায় ৯ মিনিট",
        dayId: "day1"
      },
      nextVideo: {
        youtubeId: "xh3wQh6aqD4",
        titleEn: "AHSEC Class 12 Education: Aims of Secondary Education (Mudaliar Commission) | Part 3",
        titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মাধ্যমিক শিক্ষাৰ লক্ষ্যসমূহ (মুডালিয়াৰ আয়োগ) | খণ্ড ৩",
        isPlaylist: false,
        durationEn: "Approx. 8 Minutes",
        durationAs: "প্ৰায় ৮ মিনিট",
        dayId: "day3"
      }
    },
    {
      id: "u1v3",
      titleEn: "AHSEC Class 12 Education: Aims of Secondary Education (Mudaliar Commission) | Part 3",
      titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মাধ্যমিক শিক্ষাৰ লক্ষ্যসমূহ (মুডালিয়াৰ আয়োগ) | খণ্ড ৩",
      durationEn: "Approx. 8 Minutes",
      durationAs: "প্ৰায় ৮ মিনিট",
      youtubeId: "xh3wQh6aqD4",
      isPlaylist: false,
      descriptionEn: "Master the five revolutionary aims of secondary education proposed by the Mudaliar Commission (1952–53). This lesson explains how independent India redefined education beyond examinations and degrees by emphasizing democratic citizenship, vocational efficiency, personality development, leadership development, and character formation.",
      descriptionAs: "মুডালিয়াৰ আয়োগ (১৯৫২-৫৩) ৰ দ্বাৰা প্ৰস্তাৱিত মাধ্যমিক শিক্ষাৰ পাঁচটা বৈপ্লৱিক লক্ষ্য আয়ত্ত কৰক। এই পাঠটোত বুজাই দিয়া হৈছে যে স্বাধীন ভাৰতত পৰীক্ষা আৰু ডিগ্ৰীৰ বাহিৰেও গণতান্ত্ৰিক নাগৰিকত্ব, বৃত্তিমূলক দক্ষতা, ব্যক্তিত্বৰ বিকাশ, নেতৃত্বৰ বিকাশ আৰু চৰিত্ৰ গঠনৰ ওপৰত জোৰ দি শিক্ষাক কেনেকৈ নতুন ৰূপ দিয়া হৈছিল।",
      typeEn: "Video Lecture",
      typeAs: "ভিডিঅ' বক্তৃতা",
      topicEn: "Aims of Secondary Education",
      topicAs: "মাধ্যমিক শিক্ষাৰ লক্ষ্যসমূহ",
      subtopicEn: "Mudaliar Commission (1952–53)",
      subtopicAs: "মুডালিয়াৰ আয়োগ (১৯৫২-৫৩)",
      boardRelevanceEn: "Very High",
      boardRelevanceAs: "অতি উচ্চ",
      questionFrequencyEn: "Very High",
      questionFrequencyAs: "অতি উচ্চ",
      difficultyEn: "Moderate",
      difficultyAs: "মধ্যমীয়া",
      dayId: "day3",
      learningObjectivesEn: [
        "Explain the aims of secondary education according to Mudaliar Commission",
        "Discuss Democratic Citizenship",
        "Explain Vocational Efficiency",
        "Explain Personality Development",
        "Discuss Leadership Development",
        "Explain Character Formation",
        "Analyze the relevance of these aims in modern education",
        "Relate Mudaliar Commission recommendations with NEP 2020",
        "Write high-scoring board examination answers"
      ],
      learningObjectivesAs: [
        "মুডালিয়াৰ আয়োগৰ মতে মাধ্যমিক শিক্ষাৰ লক্ষ্যসমূহ ব্যাখ্যা কৰা",
        "গণতান্ত্ৰিক নাগৰিকত্ব আলোচনা কৰা",
        "বৃত্তিমূলক দক্ষতা ব্যাখ্যা কৰা",
        "ব্যক্তিত্বৰ বিকাশ ব্যাখ্যা কৰা",
        "নেতৃত্বৰ বিকাশ আলোচনা কৰা",
        "চৰিত্ৰ গঠন ব্যাখ্যা কৰা",
        "আধুনিক শিক্ষাত এই লক্ষ্যসমূহৰ প্ৰাসংগিকতা বিশ্লেষণ কৰা",
        "মুডালিয়াৰ আয়োগৰ চুপাৰiছসমূহক ৰাষ্ট্ৰীয় শিক্ষানীতি (NEP) ২০২০ৰ সৈতে সম্পৰ্কিত কৰা",
        "বোৰ্ড পৰীক্ষাত সৰ্বাধিক নম্বৰ লাভ কৰাৰ উত্তৰ লিখন শৈলী আয়ত্ত কৰা"
      ],
      boardFocusEn: ["MCQs", "Very Short Questions", "Short Questions", "Long Questions", "Unit Tests", "Model Tests", "Board Examinations"],
      boardFocusAs: ["MCQ প্ৰশ্ন", "অতি চুটি উত্তৰৰ প্ৰশ্ন", "চুটি উত্তৰৰ প্ৰশ্ন", "দীঘল উত্তৰৰ প্ৰশ্ন", "গোট পৰীক্ষা", "আৰ্হি পৰীক্ষা", "বোৰ্ড পৰীক্ষা"],
      memoryEngine: {
        formulaEn: "DVPLC",
        formulaAs: "DVPLC",
        breakdownEn: [
          { key: "D", val: "Democratic Citizenship" },
          { key: "V", val: "Vocational Efficiency" },
          { key: "P", val: "Personality Development" },
          { key: "L", val: "Leadership Development" },
          { key: "C", val: "Character Formation" }
        ],
        breakdownAs: [
          { key: "D", val: "গণতান্ত্ৰিক নাগৰিকত্ব (Democratic Citizenship)" },
          { key: "V", val: "বৃত্তিমূলক দক্ষতা (Vocational Efficiency)" },
          { key: "P", val: "ব্যক্তিত্বৰ বিকাশ (Personality Development)" },
          { key: "L", val: "নেতৃত্বৰ বিকাশ (Leadership Development)" },
          { key: "C", val: "চৰিত্ৰ গঠন (Character Formation)" }
        ]
      },
      timelineEn: [
        { time: "00:00", label: "Introduction – Independent India and Educational Crisis" },
        { time: "00:30", label: "Is Education Only for Jobs?" },
        { time: "00:36", label: "Why Independent India Needed New Educational Aims" },
        { time: "00:52", label: "Limitations of the Old British Education System" },
        { time: "01:03", label: "Need for National Reconstruction" },
        { time: "01:14", label: "Mudaliar Commission Introduction" },
        { time: "01:20", label: "Formation of Secondary Education Commission (1952–53)" },
        { time: "01:37", label: "Challenge 1 – New Democracy" },
        { time: "02:00", label: "Democratic Citizenship" },
        { time: "02:15", label: "Citizenship, Discipline and National Integration" },
        { time: "02:20", label: "Challenge 2 – Degrees Without Skills" },
        { time: "02:47", label: "Vocational Efficiency" },
        { time: "02:59", label: "Beginning of Skill-Based Education" },
        { time: "03:09", label: "Challenge 3 – Incomplete Personality Development" },
        { time: "03:37", label: "Personality Development" },
        { time: "03:48", label: "Concept of All-Round Development" },
        { time: "03:59", label: "Challenge 4 – Lack of Leadership" },
        { time: "04:30", label: "Leadership Development" },
        { time: "04:40", label: "Building Future Leaders in Schools" },
        { time: "05:14", label: "Challenge 5 – Lack of Moral Values" },
        { time: "05:41", label: "Character Formation" },
        { time: "05:53", label: "Morality and Responsibility" },
        { time: "05:59", label: "Impact on Assam and Indian Education" },
        { time: "06:11", label: "School Expansion and Vocational Guidance" },
        { time: "06:26", label: "Connection with NEP 2020" },
        { time: "06:47", label: "Board Exam Master Revision" },
        { time: "06:59", label: "DVPLC Memory Trick" },
        { time: "07:17", label: "Democratic Citizenship" },
        { time: "07:20", label: "Vocational Efficiency" },
        { time: "07:24", label: "Personality Development" },
        { time: "07:27", label: "Leadership Development" },
        { time: "07:30", label: "Character Formation" },
        { time: "07:38", label: "Quick Revision for Board Exams" },
        { time: "07:49", label: "Why Character Matters More Than Marks" },
        { time: "08:09", label: "Final Thought" }
      ],
      timelineAs: [
        { time: "00:00", label: "পৰিচয় – স্বাধীন ভাৰত আৰু শৈক্ষিক সংকট" },
        { time: "00:30", label: "শিক্ষা কেৱল চাকৰিৰ বাবেই নেকি?" },
        { time: "00:36", label: "স্বাধীন ভাৰতক কিয় শিক্ষাৰ নতুন লক্ষ্যৰ প্ৰয়োজন আছিল" },
        { time: "00:52", label: "পুৰণি ব্ৰিটিছ শিক্ষা ব্যৱস্থাৰ সীমাবদ্ধতাসমূহ" },
        { time: "01:03", label: "ৰাষ্ট্ৰীয় পুনৰ্নিৰ্মাণৰ প্ৰয়োজনীয়তা" },
        { time: "01:14", label: "মুডালিয়াৰ আয়োগৰ পৰিচয়" },
        { time: "01:20", label: "মাধ্যমিক শিক্ষা আয়োগ গঠন (১৯৫২-৫৩)" },
        { time: "01:37", label: "প্ৰত্যাহ্বান ১ – নতুন গণতন্ত্ৰ" },
        { time: "02:00", label: "গণতান্ত্ৰিক নাগৰিকত্ব" },
        { time: "02:15", label: "নাগৰিকত্ব, শৃংখলা আৰু ৰাষ্ট্ৰীয় সংহতি" },
        { time: "02:20", label: "প্ৰত্যাহ্বান ২ – দক্ষতা অবিহনে ডিগ্ৰী" },
        { time: "02:47", label: "বৃত্তিমূলক দক্ষতা" },
        { time: "02:59", label: "দক্ষতা-ভিত্তিক শিক্ষাৰ সূচনা" },
        { time: "03:09", label: "প্ৰত্যাহ্বান ৩ – অপূৰ্ণ ব্যক্তিত্বৰ বিকাশ" },
        { time: "03:37", label: "ব্যক্তিত্বৰ বিকাশ" },
        { time: "03:48", label: "সৰ্বাংগীণ বিকাশৰ ধাৰণা" },
        { time: "03:59", label: "প্ৰত্যাহ্বান ৪ – নেতৃত্বৰ অভাৱ" },
        { time: "04:30", label: "নেতৃত্বৰ বিকাশ" },
        { time: "04:40", label: "বিদ্যালয়সমূহত ভৱিষ্যতৰ নেতা গঢ়ি তোলা" },
        { time: "05:14", label: "প্ৰত্যাহ্বান ৫ – নৈতিক মূল্যবোধৰ অভাৱ" },
        { time: "05:41", label: "চৰিত্ৰ গঠন" },
        { time: "05:53", label: "নৈতিকতা আৰু দায়িত্ববোধ" },
        { time: "05:59", label: "অসম আৰু ভাৰতীয় শিক্ষাৰ ওপৰত প্ৰভাৱ" },
        { time: "06:11", label: "বিদ্যালয়ৰ সম্প্ৰসাৰণ আৰু বৃত্তিমূলক নিৰ্দেশনা" },
        { time: "06:26", label: "ৰাষ্ট্ৰীয় শিক্ষানীতি (NEP) ২০২০ৰ সৈতে সংযোগ" },
        { time: "06:47", label: "বোৰ্ড পৰীক্ষাৰ বাবে মূল পুনৰীক্ষণ" },
        { time: "06:59", label: "DVPLC মনত ৰখাৰ কৌশল" },
        { time: "07:17", label: "গণতান্ত্ৰিক নাগৰিকত্ব" },
        { time: "07:20", label: "বৃত্তিমূলক দক্ষতা" },
        { time: "07:24", label: "ব্যক্তিত্বৰ বিকাশ" },
        { time: "07:27", label: "নেতৃত্বৰ বিকাশ" },
        { time: "07:30", label: "চৰিত্ৰ গঠন" },
        { time: "07:38", label: "বোৰ্ড পৰীক্ষাৰ বাবে দ্ৰুত পুনৰীক্ষণ" },
        { time: "07:49", label: "নম্বৰতকৈ চৰিত্ৰৰ গুৰুত্ব কিয় বেছি" },
        { time: "08:09", label: "চূড়ান্ত চিন্তা" }
      ],
      relatedNotes: [
        { dayId: "day8", labelEn: "Day 8 Notes", labelAs: "দিন ৮ ৰ টোকা" },
        { dayId: "day9", labelEn: "Day 9 Notes", labelAs: "দিন ৯ ৰ টোকা" },
        { dayId: "day10", labelEn: "Day 10 Notes", labelAs: "দিন ১০ ৰ টোকা" },
        { dayId: "day11", labelEn: "Day 11 Notes", labelAs: "দিন ১১ ৰ টোকা" }
      ],
      relatedMcq: {
        dayId: "day3",
        labelEn: "Aims of Secondary Education MCQ Set",
        labelAs: "মাধ্যমিক শিক্ষাৰ লক্ষ্যসমূহ MCQ ছেট"
      },
      previousVideo: {
        youtubeId: "uFSll_pU1Yo",
        titleEn: "AHSEC Class 12 Education: Defects of Secondary Education (Mudaliar Commission) | Part 2",
        titleAs: "AHSEC দ্বাদশ শ্ৰেণী শিক্ষা: মাধ্যমিক শিক্ষাৰ ত্ৰুটিসমূহ (মুডালিয়াৰ আয়োগ) | খণ্ড ২",
        isPlaylist: false,
        durationEn: "Approx. 10 Minutes",
        durationAs: "প্ৰায় ১০ মিনিট",
        dayId: "day2"
      },
      nextVideo: {
        youtubeId: "coming-soon",
        titleEn: "Kothari Commission (1964–66) (Coming Soon)",
        titleAs: "কোঠাৰী আয়োগ (১৯৬৪–৬৬) (অতি সোনকালে আহিব)",
        isPlaylist: false,
        durationEn: "Coming Soon",
        durationAs: "অতি সোনকালে"
      }
    },
    {
      id: "u1v4",
      titleEn: "Kothari Commission (1964-66) - Structure & Recommendations",
      titleAs: "কোঠাৰী আয়োগ (১৯৬৪-৬৬) - শৈক্ষিক গাঁথনি আৰু চুপাৰিছসমূহ",
      durationEn: "25 mins",
      durationAs: "২৫ মিনিট",
      youtubeId: "dQw4w9WgXcQ",
      isPlaylist: false,
      descriptionEn: "Detailed review of the 10+2+3 educational structure and integration of education with national development goals.",
      descriptionAs: "১০+২+৩ শিক্ষাগত গাঁথনি আৰু ৰাষ্ট্ৰীয় উন্নয়নৰ লক্ষ্যৰ সৈতে শিক্ষাৰ সংহতিৰ ওপৰত কৰা আলোচনা।",
      dayId: "day5"
    }
  ],
  unit2: [
    {
      id: "u2v1",
      titleEn: "Non-formal Education - Characteristics & Target Groups",
      titleAs: "অনানুষ্ঠানিক শিক্ষা - বৈশিষ্ট্য আৰু লক্ষ্যসমূহ",
      durationEn: "15 mins",
      durationAs: "১৫ মিনিট",
      youtubeId: "tgbNymZ7vqY",
      isPlaylist: false,
      descriptionEn: "Defining non-formal education as a flexible, organized learning model operating outside traditional classroom setups.",
      descriptionAs: "অনানুষ্ঠানিক শিক্ষাক পৰম্পৰাগত শ্ৰেণীকোঠাৰ বাহিৰত চলোৱা এক নমনীয় আৰু সংগঠিত শিক্ষণ আৰ্হি হিচাপে বুজি লওক।"
    },
    {
      id: "u2v2",
      titleEn: "Open Schooling and Distance Learning in Assam",
      titleAs: "অসমত মুক্ত বিদ্যালয় আৰু দূৰ শিক্ষা ব্যৱস্থা",
      durationEn: "20 mins",
      durationAs: "২০ মিনিট",
      youtubeId: "PL_u2v2_ASSO",
      isPlaylist: true,
      descriptionEn: "Understanding the role of NIOS, ASOS, and correspondence learning systems in helping school dropouts and adult learners.",
      descriptionAs: "আধাতে পঢ়া এৰা ছাত্ৰ আৰু প্ৰাপ্তবয়স্ক শিক্ষাৰ্থীসকলৰ বাবে NIOS, ASOS আৰু পত্ৰযোগ শিক্ষাৰ ভূমিকা বুজি পোৱা।"
    }
  ],
  unit3: [
    {
      id: "u3v1",
      titleEn: "Environmental Education - Tbilisi Declaration Aims",
      titleAs: "পৰিৱেশ শিক্ষা - তবিলিচি ঘোষণাৰ লক্ষ্যসমূহ",
      durationEn: "16 mins",
      durationAs: "১৬ মিনিট",
      youtubeId: "9xxpY0EwqX8",
      isPlaylist: false,
      descriptionEn: "Analyzing global environmental education objectives: Awareness, Knowledge, Attitude, Skills, and Participation.",
      descriptionAs: "পৰিৱেশ শিক্ষাৰ বিশ্বব্যাপী লক্ষ্যসমূহ বিশ্লেষণ কৰা: সচেতনতা, জ্ঞান, মনোভাৱ, দক্ষতা আৰু অংশগ্ৰহণ।"
    },
    {
      id: "u3v2",
      titleEn: "Value Education & Human Rights in Schools",
      titleAs: "মূল্যবোধ শিক্ষা আৰু মানৱ অধিকাৰ",
      durationEn: "19 mins",
      durationAs: "১৯ মিনিট",
      youtubeId: "dQw4w9WgXcQ",
      isPlaylist: false,
      descriptionEn: "Integrating democratic, moral, and social values into secondary education curriculum.",
      descriptionAs: "মাধ্যমিক শিক্ষাৰ পাঠ্যক্ৰমত গণতান্ত্ৰিক, নৈতিক আৰু সামাজিক মূল্যবোধৰ একত্ৰীকৰণ কৰাৰ নিয়ম।"
    }
  ],
  unit4: [
    {
      id: "u4v1",
      titleEn: "Thorndike's Trial and Error Theory of Learning",
      titleAs: "থৰ্নডাইকৰ প্ৰচেষ্টা আৰু ভুল শিকন তত্ত্ব",
      durationEn: "24 mins",
      durationAs: "২৪ মিনিট",
      youtubeId: "J8k5qE8Cq_U",
      isPlaylist: false,
      descriptionEn: "Detailed study of Thorndike's puzzle box experiment and the primary laws of Readiness, Exercise, and Effect.",
      descriptionAs: "থৰ্নডাইকৰ পাজল বক্সৰ পৰীক্ষা আৰু প্ৰস্তুতি, অনুশীলন আৰু ফলপ্ৰসূতাৰ মূল সূত্ৰসমূহৰ বিষয়ে বিতং অধ্যয়ন।"
    },
    {
      id: "u4v2",
      titleEn: "Pavlov's Classical Conditioning Experiment",
      titleAs: "পাভলভৰ ধ্ৰুপদী অনুৱৰ্তন পৰীক্ষা",
      durationEn: "21 mins",
      durationAs: "২১ মিনিট",
      youtubeId: "hK51A4sJgB0",
      isPlaylist: false,
      descriptionEn: "Understanding conditioned and unconditioned stimulus-response concepts in human and animal behavior.",
      descriptionAs: "মানুহ আৰু প্ৰাণীৰ আচৰণত অনুবৰ্তিত আৰু অননুবৰ্তিত উদ্দীপক-প্ৰতিক্ৰিয়াৰ ধাৰণাসমূহ বুজি পোৱা।"
    }
  ],
  unit5: [
    {
      id: "u5v1",
      titleEn: "Memory Processes & The Three Fundamental Stages",
      titleAs: "স্মৃতি প্ৰক্ৰিয়া আৰু তিনিটা প্ৰাথমিক পৰ্যায়",
      durationEn: "17 mins",
      durationAs: "১৭ মিনিট",
      youtubeId: "rVfD4H2WqC4",
      isPlaylist: false,
      descriptionEn: "Psychological study of Registration (Encoding), Retention (Storage), and Reproduction (Recall/Recognition).",
      descriptionAs: "তথ্যৰ সংকেতীকৰণ (প্ৰৱেশ), সংৰক্ষণ (ধাৰণ), আৰু পুনৰুদ্ধাৰ (স্মৰণ আৰু প্ৰত্যভিজ্ঞা) ৰ মনোবৈজ্ঞানিক অধ্যয়ন।"
    },
    {
      id: "u5v2",
      titleEn: "Ebbinghaus Curve of Forgetting & Memory Improvement",
      titleAs: "এবিংহাউচৰ বিস্মৃতি বক্ৰ আৰু স্মৃতিশক্তি বিকাশৰ উপায়",
      durationEn: "18 mins",
      durationAs: "১৮ মিনিট",
      youtubeId: "PL_u5v2_EBB",
      isPlaylist: true,
      descriptionEn: "Analyzing why we forget and strategies high-performing students use to protect long-term retention.",
      descriptionAs: "আমি কিয় পাহৰি যাওঁ তাৰ কাৰণসমূহ আৰু দীৰ্ঘম্যাদীভাৱে মনত ৰাখিবলৈ ব্যৱহাৰ কৰা বিভিন্ন কৌশলসমূহ।"
    }
  ],
  unit6: [
    {
      id: "u6v1",
      titleEn: "Mental Health and Mental Hygiene Concepts",
      titleAs: "মানসিক স্বাস্থ্য আৰু মানসিক বিজ্ঞানৰ ধাৰণাসমূহ",
      durationEn: "15 mins",
      durationAs: "১৫ মিনিট",
      youtubeId: "c7FpLsz3oQY",
      isPlaylist: false,
      descriptionEn: "Understanding mental hygiene as the preventive science to preserve psychological balance and adaptive home/school life.",
      descriptionAs: "মানসিক ভাৰসাম্য আৰু ঘৰুৱা/বিদ্যালয়ৰ সুস্থ পৰিৱেশ ৰক্ষা কৰাৰ বাবে প্ৰতিৰোধমূলক বিজ্ঞান হিচাপে মানসিক বিজ্ঞানক বুজা।"
    },
    {
      id: "u6v2",
      titleEn: "Frustrations, Conflicts & Common Defense Mechanisms",
      titleAs: "হতাশা, সংঘাত আৰু সাধাৰণ প্ৰতিৰক্ষা কৌশলসমূহ",
      durationEn: "22 mins",
      durationAs: "২২ মিনিট",
      youtubeId: "dQw4w9WgXcQ",
      isPlaylist: false,
      descriptionEn: "How students deal with stress using Rationalization, Projection, Sublimation, and Regression.",
      descriptionAs: "যুক্তিকৰণ, প্ৰক্ষেপণ, উদীকৰণ আৰু প্ৰত্যাৱৰ্তনৰ জৰিয়তে শিক্ষাৰ্থীসকলে মানসিক চাপ চম্ভালিবলৈ কৰা উপায়সমূহ।"
    }
  ],
  unit7: [
    {
      id: "u7v1",
      titleEn: "Statistics in Education - Frequency Distribution & Tabulation",
      titleAs: "শৈক্ষিক পৰিসংখ্যা - পৌনঃপুনিকতা বিভাজন আৰু তালিকাভুক্তি",
      durationEn: "28 mins",
      durationAs: "২৮ মিনিট",
      youtubeId: "m1K3QG_U3s8",
      isPlaylist: false,
      descriptionEn: "Learn how to calculate tally marks, class intervals, and midpoint values from board exam raw score datasets.",
      descriptionAs: "বোৰ্ড পৰীক্ষাৰ নম্বৰসমূহৰ পৰা টেলী চিহ্ন, শ্ৰেণী অন্তৰাল আৰু মধ্যবিন্দুৰ মান কেনেকৈ নিৰূপণ কৰিব লাগে তাৰ পৰিচয়।"
    },
    {
      id: "u7v2",
      titleEn: "Calculations of Mean, Median & Mode (Short & Long Methods)",
      titleAs: "গড়, মধ্যমা আৰু প্ৰচুৰক উলিওৱাৰ নিয়ম (সংক্ষিপ্ত আৰু দীৰ্ঘ পদ্ধতি)",
      durationEn: "35 mins",
      durationAs: "৩৫ মিনিট",
      youtubeId: "PL_u7v2_STAT",
      isPlaylist: true,
      descriptionEn: "Step-by-step math tutorial solving central tendency averages from grouped frequency tables.",
      descriptionAs: "শ্ৰেণীভুক্ত পৌনঃপুনিকতা তালিকাৰ পৰা গড়, মধ্যমা আৰু প্ৰচুৰক নিৰূপণ কৰাৰ সম্পূৰ্ণ খোপে-খোপে গণিত টিউটৰিয়েল।"
    }
  ]
};
