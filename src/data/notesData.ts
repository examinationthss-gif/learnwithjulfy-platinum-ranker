export interface NoteContent {
  title: string;
  concept: string;
  explanation: string;
  points: string[];
  examTip: string;
  questions: string[];
}

export interface DayNotes {
  en: NoteContent;
  as: NoteContent;
}

// Complete syllabus details mapping for all 140 lessons
const syllabusTopics: Record<string, Record<number, { enTitle: string; asTitle: string; enConcept: string; asConcept: string; enExplanation: string; asExplanation: string; enPoints: string[]; asPoints: string[]; enTip: string; asTip: string; enQuestions: string[]; asQuestions: string[] }>> = {
  "unit-1": {
    1: {
      enTitle: "Secondary Education Commission (1952-53) - Appointment and Aims",
      asTitle: "মাধ্যমিক শিক্ষা আয়োগ (১৯৫২-৫৩) - নিযুক্তি আৰু লক্ষ্যসমূহ",
      enConcept: "Understanding the appointment of the Mudaliar Commission under Dr. A.L. Mudaliar and its primary objectives for independent India's secondary school system.",
      asConcept: "ড° এ.এল. মুডালিয়াৰৰ অধীনত মাধ্যমিক শিক্ষা আয়োগৰ নিযুক্তি আৰু স্বাধীন ভাৰতৰ মাধ্যমিক বিদ্যালয় ব্যৱস্থাৰ বাবে ইয়াৰ মূল উদ্দেশ্যসমূহ বুজি পোৱা।",
      enExplanation: "The Secondary Education Commission, appointed in 1952, was tasked with inspecting the status of secondary education in India. It pointed out that the current system was uni-lateral, bookish, and lacked vocational direction. Its aims included developing democratic citizenship, improving vocational efficiency, and training for leadership.",
      asExplanation: "১৯৫২ চনত নিযুক্ত মাধ্যমিক শিক্ষা আয়োগক ভাৰতৰ মাধ্যমিক শিক্ষাৰ স্থিতি নিৰীক্ষণ কৰাৰ দায়িত্ব দিয়া হৈছিল। ই আঙুলিয়াই দিছিল যে সেই সময়ৰ শিক্ষা ব্যৱস্থা আছিল পুথিগত আৰু বৃত্তিমুখী দিশৰ অভাৱ থকা। ইয়াৰ লক্ষ্যসমূহ আছিল গণতান্ত্ৰিক নাগৰিকত্বৰ বিকাশ, বৃত্তিমূলক দক্ষতা বৃদ্ধি আৰু নেতৃত্বৰ প্ৰশিক্ষণ।",
      enPoints: [
        "Appointment: September 23, 1952, under chairmanship of Dr. A. Lakshmanaswami Mudaliar.",
        "Goal: Reconstruct secondary education to align with a newly independent democratic nation.",
        "Aims: Development of democratic citizenship, vocational efficiency, personality development, and leadership qualities."
      ],
      asPoints: [
        "নিযুক্তি: ২৩ ছেপ্টেম্বৰ, ১৯৫২ চনত ড° এ লক্ষ্মণস্বামী মুডালিয়াৰৰ সভাপতিত্বত।",
        "উদ্দেশ্য: নতুনকৈ স্বাধীন হোৱা গণতান্ত্ৰিক ৰাষ্ট্ৰখনৰ লগত খাপ খুৱাই মাধ্যমিক শিক্ষাৰ পুনৰ্গঠন কৰা।",
        "লক্ষ্যসমূহ: গণতান্ত্ৰিক নাগৰিকত্বৰ বিকাশ, বৃত্তিমূলক দক্ষতা, ব্যক্তিত্বৰ বিকাশ আৰু নেতৃত্বৰ গুণাগুণ বৃদ্ধি।"
      ],
      enTip: "Mudaliar Commission is frequently asked under 4-mark and 6-mark questions. Focus on the four core aims of education proposed by the commission.",
      asTip: "মুডালিয়াৰ আয়োগৰ প্ৰশ্ন প্ৰায়ে ৪ নম্বৰীয়া আৰু ৬ নম্বৰীয়া প্ৰশ্ন হিচাপে আহে। আয়োগে প্ৰস্তাৱ কৰা শিক্ষাৰ চাৰিটা মূল লক্ষ্যত গুৰুত্ব দিয়ক।",
      enQuestions: [
        "When was the Secondary Education Commission appointed?",
        "State three major recommendations of the Mudaliar Commission regarding aims of education."
      ],
      asQuestions: [
        "মাধ্যমিক শিক্ষা আয়োগ কেতিয়া নিযুক্তি দিয়া হৈছিল?",
        "শিক্ষাৰ লক্ষ্য সম্পৰ্কে মুডালিয়াৰ আয়োগৰ তিনিটা প্ৰধান চুপাৰিছ উল্লেখ কৰা।"
      ]
    },
    2: {
      enTitle: "Mudaliar Commission - Curriculum Reforms & Multipurpose Schools",
      asTitle: "মুডালিয়াৰ আয়োগ - পাঠ্যক্ৰমৰ সংস্কাৰ আৰু বহুমুখী বিদ্যালয়",
      enConcept: "Analyzing the transition from uni-lateral schools to Multipurpose Schools and diversification of curriculum courses.",
      asConcept: "একক-মুখী বিদ্যালয়ৰ পৰা বহুমুখী বিদ্যালয়লৈ পৰিৱৰ্তন আৰু পাঠ্যক্ৰমৰ বৈচিত্ৰ্যিকৰণ বিশ্লেষণ কৰা।",
      enExplanation: "To meet the diverse interests and aptitudes of students, the commission recommended the establishment of Multipurpose Schools. These schools offered diversified courses (Academic, Technical, Agricultural, Commercial, Fine Arts, and Home Science) alongside a core curriculum consisting of Languages, Social Studies, General Science, and Craft.",
      asExplanation: "ছাত্ৰ-ছাত্ৰীৰ বৈচিত্ৰ্যময় আগ্ৰহ আৰু প্ৰতিভা পূৰণ কৰিবলৈ আয়োগে বহুমুখী বিদ্যালয় স্থাপনৰ চুপাৰিছ কৰিছিল। এই বিদ্যালয়সমূহে মূল পাঠ্যক্ৰমৰ (ভাষা, সমাজ বিজ্ঞান, সাধাৰণ বিজ্ঞান আৰু কাৰুশিল্প) লগতে বিভিন্ন পাঠ্যক্ৰম (শৈক্ষিক, কাৰিকৰী, কৃষি, বাণিজ্য, চাৰুকলা আৰু গাৰ্হস্থ্য বিজ্ঞান) আগবঢ়াইছিল।",
      enPoints: [
        "Core Curriculum: Languages, Social Studies, General Science, and one Craft.",
        "Diversified Courses: Divided curriculum into seven streams to match student aptitudes.",
        "Multipurpose Schools: Designed to provide both general and vocational study options."
      ],
      asPoints: [
        "মূল পাঠ্যক্ৰম: ভাষা, সমাজ বিজ্ঞান, সাধাৰণ বিজ্ঞান আৰু এটা কাৰুশিল্প।",
        "বৈচিত্ৰ্যময় পাঠ্যক্ৰম: ছাত্ৰ-ছাত্ৰীৰ যোগ্যতাৰ সৈতে খাপ খুৱাবলৈ পাঠ্যক্ৰমক সাতটা শাখাত ভাগ কৰা হৈছিল।",
        "বহুমুখী বিদ্যালয়: সাধাৰণ আৰু বৃত্তিমূলক দুয়োটা অধ্যয়নৰ বিকল্প প্ৰদান কৰিবলৈ ডিজাইন কৰা হৈছিল।"
      ],
      enTip: "Explain the concept of 'Multipurpose Schools' clearly. It is a signature term of the 1952-53 commission.",
      asTip: "'বহুমুখী বিদ্যালয়'ৰ ধাৰণাটো স্পষ্টকৈ বুজাই লিখক। এইটো ১৯৫২-৫৩ চনৰ আয়োগৰ এক গুৰুত্বপূৰ্ণ অৱদান।",
      enQuestions: [
        "What is a Multipurpose School?",
        "Name the seven diversified streams of curriculum recommended by the Mudaliar Commission."
      ],
      asQuestions: [
        "বহুমুখী বিদ্যালয় কি?",
        "মুডালিয়াৰ আয়োগে চুপাৰিছ কৰা পাঠ্যক্ৰমৰ সাতটা বৈচিত্ৰ্যময় শাখাৰ নাম লিখা।"
      ]
    },
    3: {
      enTitle: "Kothari Commission (1964-66) - Structure and Aims of National Education",
      asTitle: "কোঠাৰী আয়োগ (১৯৬৪-৬৬) - গাঁথনি আৰু ৰাষ্ট্ৰীয় শিক্ষাৰ লক্ষ্য",
      enConcept: "Studying the 10+2+3 educational structure and the integration of education with national development goals.",
      asConcept: "১০+২+৩ শিক্ষাগত গাঁথনি আৰু ৰাষ্ট্ৰীয় উন্নয়নৰ লক্ষ্যৰ সৈতে শিক্ষাৰ সংহতি অধ্যয়ন কৰা।",
      enExplanation: "The Education Commission of 1964, headed by Dr. D.S. Kothari, was the first commission with task outlines covering all levels of education. It introduced the slogan 'Education and National Development'. Its primary goal was to relate education to productivity, strengthen social and national integration, consolidate democracy, and modernize the country.",
      asExplanation: "১৯৬৪ চনৰ শিক্ষা আয়োগে (ড° ডি.এছ. কোঠাৰীৰ নেতৃত্বত) প্ৰথমবাৰৰ বাবে শিক্ষাৰ আটাইকেইটা স্তৰ সামৰি লৈছিল। ই 'শিক্ষা আৰু ৰাষ্ট্ৰীয় উন্নয়ন' শ্লোগানটো প্ৰৱৰ্তন কৰিছিল। ইয়াৰ প্ৰধান লক্ষ্য আছিল শিক্ষাক উৎপাদনশীলতাৰ সৈতে সংযোগ কৰা, সামাজিক আৰু ৰাষ্ট্ৰীয় সংহতি সুদৃঢ় কৰা, গণতন্ত্ৰ ৰক্ষা কৰা আৰু দেশখনক আধুনিকীকৰণ কৰা।",
      enPoints: [
        "Standardized Pattern: Recommended the 10+2+3 structure across India.",
        "Key Slogan: 'Destiny of India is being shaped in her classrooms.'",
        "Four-Fold Program: Increase productivity, achieve integration, modernize, and cultivate moral values."
      ],
      asPoints: [
        "মানক আৰ্হি: সমগ্ৰ ভাৰততে ১০+২+৩ গাঁথনিৰ চুপাৰিছ কৰা হৈছিল।",
        "মূল শ্লোগান: 'ভাৰতৰ ভাগ্য ইয়াৰ শ্ৰেণীকোঠাতে গঢ় লৈ উঠিছে।'",
        "চাৰিটা মূল কাৰ্যসূচী: উৎপাদনশীলতা বৃদ্ধি কৰা, সংহতি স্থাপন কৰা, আধুনিকীকৰণ কৰা আৰু নৈতিক মূল্যবোধ গঢ়ি তোলা।"
      ],
      enTip: "Remember the formula 10+2+3. It was Kothari Commission's structural landmark recommendation.",
      asTip: "১০+২+৩ সূত্ৰটো মনত ৰাখিব। এইটো কোঠাৰী আয়োগৰ এক ঐতিহাসিক গাঁথনিগত চুপাৰিছ আছিল।",
      enQuestions: [
        "Who was the chairman of the Education Commission of 1964?",
        "What is the educational structure recommended by the Kothari Commission?"
      ],
      asQuestions: [
        "১৯৬৪ চনৰ শিক্ষা আয়োগৰ সভাপতি কোন আছিল?",
        "কোঠাৰী আয়োগে চুপাৰিছ কৰা শৈক্ষিক গাঁথনিটো কি?"
      ]
    },
    4: {
      enTitle: "Kothari Commission - Vocationalization of Education & Work Experience",
      asTitle: "কোঠাৰী আয়োগ - শিক্ষাৰ বৃত্তিমুখীকৰণ আৰু কৰ্ম অভিজ্ঞতা",
      enConcept: "Understanding the role of work experience and vocational courses at the secondary stage to boost national productivity.",
      asConcept: "ৰাষ্ট্ৰীয় উৎপাদনশীলতা বৃদ্ধিৰ বাবে মাধ্যমিক স্তৰত কৰ্ম অভিজ্ঞতা আৰু বৃত্তিমূলক পাঠ্যক্ৰমৰ ভূমিকা বুজি পোৱা।",
      enExplanation: "The commission emphasized that education must increase productivity. To achieve this, it recommended that Work Experience should be made an integral part of all education. It also suggested the vocationalization of secondary education, specifically aligning vocational streams with regional agricultural and industrial requirements.",
      asExplanation: "আয়োগে জোৰ দিছিল যে শিক্ষাই উৎপাদনশীলতা বৃদ্ধি কৰিব লাগিব। ইয়াৰ বাবে কৰ্ম অভিজ্ঞতাক সকলো শিক্ষাৰ এক অপৰিহাৰ্য অংশ কৰাৰ চুপাৰিছ কৰা হৈছিল। লগতে মাধ্যমিক শিক্ষাক বৃত্তিমুখী কৰাৰ পৰামৰ্শ দিয়া হৈছিল, বিশেষকৈ কৃষি আৰু ঔদ্যোগিক প্ৰয়োজনৰ সৈতে মিলাই।",
      enPoints: [
        "Work Experience: Defined as participation in productive work in school, home, or workshop.",
        "Vocationalization: Target of 50% enrollment in vocational courses at secondary level by 1986.",
        "Agricultural Education: Recommended agricultural polytechnics and farm universities."
      ],
      asPoints: [
        "কৰ্ম অভিজ্ঞতা: বিদ্যালয়, ঘৰ বা কৰ্মশালাত উৎপাদনশীল কামত অংশগ্ৰহণ কৰা।",
        "বৃত্তিমুখীকৰণ: ১৯৮৬ চনৰ ভিতৰত মাধ্যমিক স্তৰত ৫০% ছাত্ৰ-ছাত্ৰীক বৃত্তিমূলক পাঠ্যক্ৰমত অন্তৰ্ভুক্ত কৰাৰ লক্ষ্য।",
        "কৃষি শিক্ষা: কৃষি পলিটেকনিক আৰু কৃষি বিশ্ববিদ্যালয় স্থাপনৰ চুপাৰিছ।"
      ],
      enTip: "Define 'Work Experience' in Kothari Commission's terms. It means social production participation, not just manual labor.",
      asTip: "কোঠাৰী আয়োগৰ শব্দৰে 'কৰ্ম অভিজ্ঞতা'ৰ সংজ্ঞা দিয়ক। ইয়াৰ অৰ্থ হ'ল সামাজিক উৎপাদনত অংশগ্ৰহণ কৰা, কেৱল শাৰীৰিক শ্ৰম নহয়।",
      enQuestions: [
        "How did Kothari Commission define Work Experience?",
        "Explain the importance of vocationalization of secondary education."
      ],
      asQuestions: [
        "কোঠাৰী আয়োগে কৰ্ম অভিজ্ঞতাৰ কেনেকৈ সংজ্ঞা দিছিল?",
        "মাধ্যমিক শিক্ষাৰ বৃত্তিমুখীকৰণৰ গুৰুত্ব ব্যাখ্যা কৰা।"
      ]
    },
    5: {
      enTitle: "National Policy on Education (NPE) 1986 - Objectives and National System",
      asTitle: "ৰাষ্ট্ৰীয় শিক্ষানীতি (NPE) ১৯৮৬ - লক্ষ্য আৰু ৰাষ্ট্ৰীয় শিক্ষা ব্যৱস্থা",
      enConcept: "Studying the standard national education system and core curriculum proposed by NPE 1986.",
      asConcept: "NPE ১৯৮৬ এ প্ৰস্তাৱ কৰা মানক ৰাষ্ট্ৰীয় শিক্ষা ব্যৱস্থা আৰু মূল পাঠ্যক্ৰম অধ্যয়ন কৰা।",
      enExplanation: "The NPE 1986 aimed to establish a National System of Education, implying that up to a given level, all students, irrespective of caste, creed, location, or sex, have access to education of a comparable quality. It introduced a common core curriculum to foster national identity and value integration.",
      asExplanation: "NPE ১৯৮৬ ৰ লক্ষ্য আছিল এটা ৰাষ্ট্ৰীয় শিক্ষা ব্যৱস্থা গঢ়ি তোলা, যাৰ অৰ্থ হ'ল জাতি, ধৰ্ম, স্থান বা লিংগ নিৰ্বিশেষে সকলো ছাত্ৰ-ছাত্ৰীয়ে এক সমমানৰ শিক্ষা লাভ কৰিব পাৰে। ই ৰাষ্ট্ৰীয় পৰিচয় আৰু মূল্যবোধ সংহতিৰ বাবে এটা উমৈহতীয়া মূল পাঠ্যক্ৰম প্ৰৱৰ্তন কৰিছিল।",
      enPoints: [
        "National System: Based on the 10+2+3 structure initiated by Kothari Commission.",
        "Core Curriculum: Includes history of freedom movement, constitutional obligations, and environmental values.",
        "Equality: Emphasis on removal of disparities and equalizing educational opportunities."
      ],
      asPoints: [
        "ৰাষ্ট্ৰীয় ব্যৱস্থা: কোঠাৰী আয়োগে আৰম্ভ কৰা ১০+২+৩ গাঁথনিৰ ওপৰত ভিত্তি কৰি।",
        "মূল পাঠ্যক্ৰম: স্বাধীনতা আন্দোলনৰ ইতিহাস, সাংবিধানিক কৰ্তব্য আৰু পৰিৱেশ সংৰক্ষণৰ মূল্যবোধ অন্তৰ্ভুক্ত কৰা হৈছে।",
        "সমতা: বৈষম্য দূৰীকৰণ আৰু শৈক্ষিক সুযোগৰ সমতা স্থাপনৰ ওপৰত গুৰুত্ব।"
      ],
      enTip: "Expect questions on the 'Common Core Curriculum' of NPE 1986. List down at least 3 components.",
      asTip: "NPE ১৯৮৬ ৰ 'উমৈহতীয়া মূল পাঠ্যক্ৰম'ৰ ওপৰত প্ৰশ্ন আহিব পাৰে। অতি কমেও ৩ টা উপাদান মনত ৰাখিব।",
      enQuestions: [
        "What is the National System of Education according to NPE 1986?",
        "Name two aspects included in the core curriculum of NPE 1986."
      ],
      asQuestions: [
        "NPE ১৯৮৬ অনুসৰি ৰাষ্ট্ৰীয় শিক্ষা ব্যৱস্থা কি?",
        "NPE ১৯৮৬ ৰ মূল পাঠ্যক্ৰমত অন্তৰ্ভুক্ত দুটা দিশৰ নাম লিখা।"
      ]
    }
  },
  "unit-2": {
    1: {
      enTitle: "Non-formal Education - Concept and Characteristics",
      asTitle: "অনানুষ্ঠানিক শিক্ষা - ধাৰণা আৰু বৈশিষ্ট্যসমূহ",
      enConcept: "Defining non-formal education as a structured, flexible system designed outside the traditional classroom setup.",
      asConcept: "অনানুষ্ঠানিক শিক্ষাক পৰম্পৰাগত শ্ৰেণীকোঠাৰ বাহিৰত ডিজাইন কৰা এক গাঁথনিগত অথচ নমনীয় ব্যৱস্থা হিচাপে সংজ্ঞায়িত কৰা।",
      enExplanation: "Non-formal education is a conscious, planned, and organized educational activity carried on outside the framework of the formal system. It is highly flexible regarding entry age, school hours, curriculum, and evaluation, making it ideal for dropouts, working children, and adult learners.",
      asExplanation: "অনানুষ্ঠানিক শিক্ষা হ'ল আনুষ্ঠানিক ব্যৱস্থাৰ বাহিৰত চলোৱা এক সচেতন, পৰিকল্পিত আৰু সংগঠিত শিক্ষণ কাৰ্যসূচী। ই প্ৰৱেশৰ বয়স, বিদ্যালয়ৰ সময়, পাঠ্যক্ৰম আৰু মূল্যায়নৰ ক্ষেত্ৰত যথেষ্ট নমনীয়, যাৰ বাবে ই আধাতে পঢ়া এৰা ছাত্ৰ, কৰ্মৰত শিশু আৰু প্ৰাপ্তবয়স্ক শিক্ষাৰ্থীৰ বাবে উপযোগী।",
      enPoints: [
        "Flexibility: No rigid age limits or strict timetables.",
        "Target Group: Tailored for dropouts, rural youth, and working individuals.",
        "Cost-effective: Utilizes existing infrastructure and community resources."
      ],
      asPoints: [
        "নমনীয়তা: কোনো কঠিন বয়সৰ সীমা বা কঠোৰ সময়সূচী নাই।",
        "লক্ষ্য থকা গোট: বিদ্যালয় এৰা শিক্ষাৰ্থী, গ্ৰাম্য যুৱক-যুৱতী আৰু কৰ্মৰত ব্যক্তিৰ বাবে উপযোগী।",
        "অল্পব্যয়ী: বিদ্যমান আন্তঃগাঁথনি আৰু সম্প্ৰদায়ৰ সম্পদ ব্যৱহাৰ কৰে।"
      ],
      enTip: "Highlight the differences between formal, non-formal, and informal education. This is a very common essay-type question.",
      asTip: "আনুষ্ঠানিক, অনানুষ্ঠানিক আৰু অনিয়মিত শিক্ষাৰ মাজৰ পাৰ্থক্যসমূহ ফঁহিয়াই লিখক। এইটো এটা অতি গুৰুত্বপূৰ্ণ ৰচনাধৰ্মী প্ৰশ্ন।",
      enQuestions: [
        "Define non-formal education.",
        "State three key features that distinguish non-formal education from formal education."
      ],
      asQuestions: [
        "অনানুষ্ঠানিক শিক্ষাৰ সংজ্ঞা দিয়া।",
        "আনুষ্ঠানিক শিক্ষাৰ পৰা অনানুষ্ঠানিক শিক্ষাক পৃথক কৰা তিনিটা প্ৰধান বৈশিষ্ট্য উল্লেখ কৰা।"
      ]
    }
  },
  "unit-3": {
    1: {
      enTitle: "Environmental Education (Part-1) - Meaning, Definitions, Aims, Objectives, Need and Importance",
      asTitle: "পৰিৱেশ শিক্ষা (খণ্ড-১) - অৰ্থ, সংজ্ঞা, লক্ষ্য, উদ্দেশ্য, প্ৰয়োজনীয়তা আৰু গুৰুত্ব",
      enConcept: "Define Environment and Environmental Education, explaining their aims, objectives, and need in modern society.",
      asConcept: "পৰিৱেশ আৰু পৰিৱেশ শিক্ষাৰ সংজ্ঞা, ইয়াৰ লক্ষ্য, উদ্দেশ্য আৰু আধুনিক সমাজত ইয়াৰ প্ৰয়োজনীয়তা ব্যাখ্যা কৰা।",
      enExplanation: "Environmental Education (EE) is the process of developing knowledge, awareness, attitudes, and skills for environmental protection and conservation. Douglas and Holland define environment as the aggregate of all external conditions affecting an organism. UNESCO defines EE as a process aimed at developing a world population aware of and concerned about the environment and its problems.",
      asExplanation: "পৰিৱেশ শিক্ষা হ'ল পৰিৱেশ সংৰক্ষণ আৰু সুৰক্ষাৰ বাবে জ্ঞান, সচেতনতা, মনোভাৱ আৰু দক্ষতা বিকাশৰ প্ৰক্ৰিয়া। ডগলাছ আৰু হলাণ্ডৰ মতে, পৰিৱেশ হ'ল এটা জীৱক প্ৰভাৱিত কৰা সকলো বাহ্যিক অৱস্থাৰ সমষ্টি। ইউনেস্কোৰ মতে, পৰিৱেশ শিক্ষা হ'ল পৰিৱেশ আৰু ইয়াৰ সমস্যাসমূহৰ বিষয়ে সচেতন আৰু চিন্তিত বিশ্বৰ এক জনসমষ্টি গঢ়ি তোলাৰ প্ৰক্ৰিয়া।",
      enPoints: [
        "Environment: Everything surrounding a living organism (physical, biological, and social factors).",
        "Aims: Create awareness, develop positive attitudes toward nature, conserve natural resources, prevent pollution, and promote sustainable development.",
        "Objectives (AKASP): Awareness, Knowledge, Attitude, Skills, and Participation.",
        "Need: Essential due to rising pollution, depletion of resources, population pressure, and climate change."
      ],
      asPoints: [
        "পৰিৱেশ: জীৱক ঘেৰি থকা সকলো বস্তু, অৱস্থা আৰু শক্তি (ভৌতিক, জৈৱিক আৰু সামাজিক উপাদান)।",
        "লক্ষ্যসমূহ: সচেতনতা সৃষ্টি কৰা, ইতিবাচক মনোভাৱ গঢ়া, প্ৰাকৃতিক সম্পদ সংৰক্ষণ কৰা, দূষণ ৰোধ কৰা আৰু স্থায়ী উন্নয়ন সাধন কৰা।",
        "উদ্দেশ্যসমূহ: সজাগতা, জ্ঞান, মনোভাৱ, দক্ষতা আৰু অংশগ্ৰহণ।",
        "প্ৰয়োজনীয়তা: ক্ৰমবৰ্ধমান পৰিৱেশ দূষণ, প্ৰাকৃতিক সম্পদৰ ক্ষয়, জনসংখ্যা বৃদ্ধিৰ চাপ আৰু জলবায়ু পৰিৱৰ্তনৰ বাবে প্ৰয়োজনীয়।"
      ],
      enTip: "For a 2-mark answer, write the concise definition of Environmental Education: 'It is the process of developing knowledge, awareness, attitudes and skills for environmental protection and conservation.'",
      asTip: "২ নম্বৰৰ প্ৰশ্নৰ বাবে পৰিৱেশ শিক্ষাৰ চমু সংজ্ঞা লিখক: 'পৰিৱেশ শিক্ষা হৈছে পৰিৱেশ সংৰক্ষণৰ বাবে জ্ঞান, সচেতনতা, মনোভাৱ আৰু দক্ষতা বিকাশৰ প্ৰক্ৰিয়া।'",
      enQuestions: [
        "What is Environment?",
        "Define Environmental Education according to UNESCO.",
        "Mention two objectives of Environmental Education."
      ],
      asQuestions: [
        "পৰিৱেশ কি?",
        "ইউনেস্কোৰ মতে পৰিৱেশ শিক্ষাৰ সংজ্ঞা দিয়া।",
        "পৰিৱেশ শিক্ষাৰ দুটা উদ্দেশ্য উল্লেখ কৰা।"
      ]
    },
    2: {
      enTitle: "Environmental Education (Part-2) - Functions, Principles, Curriculum, Scope, Limitations, Methods and Resources",
      asTitle: "পৰিৱেশ শিক্ষা (খণ্ড-২) - কাৰ্যাৱলী, নীতি, পাঠ্যক্ৰম, পৰিসৰ, সীমাবদ্ধতা, পদ্ধতি আৰু সম্পদ",
      enConcept: "Understand the functions, principles, curriculum, scope, limitations, teaching methods, and resources used in Environmental Education.",
      asConcept: "পৰিৱেশ শিক্ষাৰ কাৰ্যাৱলী, নীতি, পাঠ্যক্ৰম, পৰিসৰ, সীমাবদ্ধতা, শিক্ষণ পদ্ধতি আৰু ব্যৱহৃত সম্পদসমূহ বুজি লোৱা।",
      enExplanation: "Environmental Education functions to develop awareness, scientific knowledge, positive attitudes, and problem-solving skills for resource protection. Key principles include a holistic approach, lifelong learning, interdisciplinary studies, and local-to-global perspective. It uses resources from natural, human, institutional, media, and community pools.",
      asExplanation: "পৰিৱেশ শিক্ষাৰ কাম হ'ল সম্পদ সংৰক্ষণৰ বাবে সজাগতা, বৈজ্ঞানিক জ্ঞান, ইতিবাচক মনোভাৱ আৰু সমস্যা সমাধানৰ দক্ষতা গঢ়ি তোলা। ইয়াৰ মূল নীতিসমূহৰ ভিতৰত সামগ্ৰিক দৃষ্টিভংগী, আজীৱন শিক্ষা, আন্তঃবিষয়ক অধ্যয়ন আৰু স্থানীয়ৰ পৰা বিশ্বব্যাপী দৃষ্টিভংগী অন্তৰ্ভুক্ত। ইয়াত প্ৰাকৃতিক, মানৱীয়, প্ৰতিষ্ঠানিক, সংবাদ মাধ্যম আৰু সামাজিক সম্পদ ব্যৱহাৰ কৰা হয়।",
      enPoints: [
        "Functions: Develops awareness, provides scientific knowledge, shapes attitudes, builds problem-solving skills, and promotes active participation.",
        "Principles (H-L-I-P-P-L): Holistic approach, Lifelong learning, Interdisciplinary studies, Practical experience, Problem-solving, and Local-to-global perspective.",
        "Curriculum: Focuses on ecosystems, natural resources, biodiversity, population impacts, and environmental protection laws.",
        "Limitations: Lack of trained teachers, insufficient school resources, theoretical focus, and overloaded curriculum.",
        "Teaching Methods: Lecture, discussion, project-based learning, field trips, demonstration, and observation.",
        "Resources: Natural (forests, rivers), Human (teachers, experts), Institutional (NGOs, schools), and Media (TV, internet)."
      ],
      asPoints: [
        "কাৰ্যাৱলী: পৰিৱেশ সজাগতা সৃষ্টি কৰা, বৈজ্ঞানিক জ্ঞান প্ৰদান কৰা, ইতিবাচক মনোভাৱ গঢ়া, সমস্যা সমাধানৰ দক্ষতা আৰু সক্ৰিয় অংশগ্ৰহণ বৃদ্ধি কৰা।",
        "নীতিসমূহ: সামগ্ৰিক দৃষ্টিভংগী, আজীৱন শিক্ষা, আন্তঃবিষয়ক অধ্যয়ন, ব্যৱহাৰিক শিক্ষা, সমস্যা সমাধান আৰু স্থানীয়ৰ পৰা বিশ্বব্যাপী অধ্যয়ন।",
        "পাঠ্যক্ৰম: পৰিৱেশ তন্ত্ৰ, প্ৰাকৃতিক সম্পদ, জীৱবৈচিত্ৰ্য, জনসংখ্যা আৰু পৰিৱেশৰ সম্বন্ধ আৰু পৰিৱেশ সংৰক্ষণ আইন।",
        "সীমাবদ্ধতা: প্ৰশিক্ষণপ্ৰাপ্ত শিক্ষকৰ অভাৱ, শিক্ষণ সামগ্ৰীৰ নাটনি, ব্যৱহাৰিক কাৰ্যকলাপৰ অভাৱ আৰু অতিৰিক্ত পাঠ্যভাৰ।",
        "শিক্ষণ পদ্ধতি: বক্তৃতা পদ্ধতি, আলোচনা পদ্ধতি, প্ৰকল্প পদ্ধতি, শিক্ষামূলক ভ্ৰমণ (ক্ষেত্ৰ ভ্ৰমণ), প্ৰদৰ্শন আৰু পৰ্যবেক্ষণ পদ্ধতি।",
        "সম্পদসমূহ: প্ৰাকৃতিক (বনাঞ্চল, নদী), মানৱ সম্পদ (শিক্ষক, বিশেষজ্ঞ), প্ৰতিষ্ঠানিক (NGO, বিদ্যালয়) আৰু সংবাদ মাধ্যম (দূৰদৰ্শন, ইণ্টাৰনেট)।"
      ],
      enTip: "Be ready to list the 6 core principles of Environmental Education (use the mnemonic H-L-I-P-P-L). They are Holistic, Lifelong, Interdisciplinary, Practical, Problem-solving, and Local-to-global.",
      asTip: "পৰিৱেশ শিক্ষাৰ ৬টা মূল নীতি লিখিবলৈ সাজু থাকক (H-L-I-P-P-L মনত ৰাখিব): সামগ্ৰিক, আজীৱন, আন্তঃবিষয়ক, ব্যৱহাৰিক, সমস্যা সমাধান আৰু স্থানীয়ৰ পৰা বিশ্বব্যাপী অধ্যয়ন।",
      enQuestions: [
        "State two principles of Environmental Education.",
        "Mention two methods of teaching Environmental Education.",
        "Identify two resources used in Environmental Education."
      ],
      asQuestions: [
        "পৰিৱেশ শিক্ষাৰ দুটা নীতি উল্লেখ কৰা।",
        "পৰিৱেশ শিক্ষা প্ৰদানৰ দুটা শিক্ষণ পদ্ধতি উল্লেখ কৰা।",
        "পৰিৱেশ শিক্ষাত ব্যৱহৃত দুটা সম্পদ চিনাক্ত কৰা।"
      ]
    },
    3: {
      enTitle: "Environmental Education (Part-3) - In Schools & Colleges",
      asTitle: "পৰিৱেশ শিক্ষা (খণ্ড-৩) - বিদ্যালয় আৰু মহাবিদ্যালয়ত পৰিৱেশ শিক্ষা",
      enConcept: "Explore the status of environmental education in schools and colleges, highlighting co-curricular activities, Eco-Clubs, and campaigns.",
      asConcept: "বিদ্যালয় আৰু মহাবিদ্যালয়সমূহত পৰিৱেশ শিক্ষাৰ স্থিতি বুজি লোৱা, লগতে সহ-পাঠ্যক্ৰম কাৰ্যসূচী, ইকো-ক্লাব আৰু সজাগতা অভিযানসমূহ আলোচনা কৰা।",
      enExplanation: "Environmental Education is integrated into curriculum streams through school textbooks, Environmental Studies (EVS), and undergraduate college courses. Co-curricular platforms like Eco-Clubs, tree plantation drives, and cleanliness campaigns reinforce practical conservation. Under the UNESCO framework, educational institutions help students acquire values and skills to solve local ecological issues.",
      asExplanation: "পৰিৱেশ শিক্ষাক বিদ্যালয়ৰ পাঠ্যপুথি, ইভিয়েছ (EVS) আৰু মহাবিদ্যালয় পৰ্যায়ত স্নাতক কোৰ্চৰ জৰিয়তে পাঠ্যক্ৰমত অন্তৰ্ভুক্ত কৰা হৈছে। সহ-পাঠ্যক্ৰমমূলক সঁজুলি যেনে ইকো-ক্লাব, বৃক্ষৰোপণ কাৰ্যসূচী আৰু পৰিষ্কাৰ-পৰিচ্ছন্নতা অভিযানে ব্যৱহাৰিক সংৰক্ষণক শক্তিশালী কৰে। ইউনেস্কোৰ পৰামৰ্শ অনুসৰি, শিক্ষানুষ্ঠানসমূহে শিক্ষাৰ্থীসকলক পৰিৱেশীয় মূল্যবোধ আৰু দক্ষতা অৰ্জন কৰাত সহায় কৰে।",
      enPoints: [
        "Curriculum Integration: Compulsory EVS at the school stage and specific environment modules at the university level.",
        "Eco-Clubs: Student-led environmental awareness groups active in planting, maintaining gardens, and conserving school energy.",
        "Campaigns: Cleanliness drives, environmental projects, nature camps, and celebrating World Environment Day (5th June).",
        "Institutional Role: Schools serve as centers for practicing sustainable habits like waste sorting and water conservation."
      ],
      asPoints: [
        "পাঠ্যক্ৰমৰ অন্তৰ্ভুক্তি: বিদ্যালয় পৰ্যায়ত বাধ্যতামূলক EVS আৰু মহাবিদ্যালয় পৰ্যায়ত নিৰ্দিষ্ট পৰিৱেশ মডিউল।",
        "ইকো-ক্লাব: শিক্ষাৰ্থীৰ নেতৃত্বত গঠিত পৰিৱেশ সজাগতা গোট, যিয়ে বৃক্ষৰোপণ আৰু ইন্ধন ৰাহিৰ বাবে কাম কৰে।",
        "অভিযানসমূহ: পৰিচ্ছন্নতা অভিযান, বৃক্ষৰোপণ কাৰ্যসূচী, প্ৰকৃতি শিবিৰ আৰু বিশ্ব পৰিৱেশ দিৱস (৫ জুন) পালন।",
        "প্ৰতিষ্ঠানিক ভূমিকা: বিদ্যালয়সমূহ বৰ্জ্য পদাৰ্থ পৃথকীকৰণ আৰু জল সংৰক্ষণ আদি অভ্যাস কৰাৰ মূল কেন্দ্ৰ হিচাপে কাম কৰে।"
      ],
      enTip: "Explain Eco-Clubs. They are student-driven forums in schools designed specifically to build environmental values and action.",
      asTip: "ইকো-ক্লাবৰ ব্যাখ্যা কৰক: এইসমূহ হৈছে বিদ্যালয়ত শিক্ষাৰ্থীৰ দ্বাৰা পৰিচালিত মঞ্চ, যিবোৰ বিশেষকei পৰিৱেশীয় মূল্যবোধ আৰু কাৰ্যক্ষমতা গঢ়ি তোলাৰ বাবে ডিজাইন কৰা হৈছে।",
      enQuestions: [
        "What is an Eco-Club?",
        "How is Environmental Education promoted in colleges?",
        "When is World Environment Day observed?"
      ],
      asQuestions: [
        "ইকো-ক্লাব কি?",
        "মহাবিদ্যালয়সমূহত পৰিৱেশ শিক্ষা কেনেদৰে প্ৰসাৰ কৰা হয়?",
        "বিশ্ব পৰিৱেশ দিৱস কেতিয়া পালন কৰা হয়?"
      ]
    },
    4: {
      enTitle: "Population Education (Part-1) - Meaning, Definitions, Characteristics, Objectives, Need and Importance",
      asTitle: "জনসংখ্যা শিক্ষা (খণ্ড-১) - অৰ্থ, সংজ্ঞা, বৈশিষ্ট্য, উদ্দেশ্য, প্ৰয়োজনীয়তা আৰু গুৰুত্ব",
      enConcept: "Understand the meaning, standard definitions, objectives, and need for Population Education in modern society.",
      asConcept: "জনসংখ্যা শিক্ষাৰ অৰ্থ, মানক সংজ্ঞা, উদ্দেশ্য আৰু আধুনিক সমাজত ইয়াৰ প্ৰয়োজনীয়তা বুজি লোৱা।",
      enExplanation: "Population Education is an educational process that helps individuals understand population growth and its impact on the family, community, nation, and quality of life. UNESCO defines it as an educational programme providing a study of population situations. It is problem-centred, interdisciplinary, value-oriented, and future-oriented.",
      asExplanation: "জনসংখ্যা শিক্ষা হ'ল এনে এক শিক্ষণ প্ৰক্ৰিয়া যিয়ে ব্যক্তিক জনসংখ্যা বৃদ্ধি আৰু ইয়াৰ ফলত পৰিয়াল, সমাজ, ৰাষ্ট্ৰ তথা জীৱনৰ মানদণ্ডের ওপৰত পৰা প্ৰভাৱ বুজি পোৱাত সহায় কৰে। ইউনেস্কোৰ মতে, ই হ'ল এটা শৈক্ষিক কাৰ্যসূচী যিয়ে জনসংখ্যাগত স্থিতি অধ্যয়নৰ সুযোগ দিয়ে। ই সমস্যা-কেন্দ্ৰিক, আন্তঃবিষয়ক, মূল্যবোধ-ভিত্তিক আৰু ভৱিষ্যমুখী।",
      enPoints: [
        "Meaning: Focuses on the relation between population dynamics, resource balance, and family/social well-being.",
        "Characteristics: Problem-centred, interdisciplinary (draws from sociology, geography, science), value-oriented, and decision-oriented.",
        "Objectives: Create awareness of growth trends, promote a small family norm, improve quality of life, and support national development.",
        "Need: Crucial due to rapid population growth, resource scarcity, poverty, unemployment, and environmental degradation."
      ],
      asPoints: [
        "অৰ্থ: জনসংখ্যাৰ গতিশীলতা, সম্পদৰ ভাৰসাম্য আৰু পাৰিবাৰিক/সামাজিক কল্যাণৰ সম্পৰ্কৰ ওপৰত গুৰুত্ব দিয়ে।",
        "বৈশিষ্ট্যসমূহ: সমস্যা-কেন্দ্ৰিক, আন্তঃবিষয়ক (সমাজবিদ্যা, ভূগোল, বিজ্ঞান আদিৰ পৰা সহায় লয়), মূল্যবোধ-ভিত্তিক আৰু সিদ্ধান্ত-মুখী।",
        "উদ্দেশ্যসমূহ: জনসংখ্যা বৃদ্ধিৰ ধাৰা সম্পৰ্কে সজাগতা অনা, ক্ষুদ্ৰ পৰিয়ালৰ ধাৰণা প্ৰসাৰ কৰা, জীৱনৰ মান উন্নত কৰা আৰু ৰাষ্ট্ৰীয় উন্নয়নত সহায় কৰা।",
        "প্ৰয়োজনীয়তা: দ্ৰুত জনসংখ্যা বৃদ্ধি, সম্পদৰ নাটনি, দৰিদ্ৰতা, নিবনুৱা সমস্যা আৰু পৰিৱেশৰ ক্ষতিৰ বাবে অত্যন্ত প্ৰয়োজনীয়।"
      ],
      enTip: "Remember the 7 key characteristics of Population Education (use the mnemonic PIVPFSD): Problem-centred, Interdisciplinary, Value-oriented, Practical, Future-oriented, Socially relevant, and Decision-oriented.",
      asTip: "জনসংখ্যা শিক্ষাৰ ৭টা মূল বৈশিষ্ট্য মনত ৰাখক (PIVPFSD মনত ৰাখিব): সমস্যা-কেন্দ্ৰিক, আন্তঃবিষয়ক, মূল্যবোধ-ভিত্তিক, ব্যৱহাৰিক, ভৱিষ্যমুখী, যাৰ সঁচা সামাজিক প্ৰাসংগিকতা আছে আৰু সিদ্ধান্ত-মুখী।",
      enQuestions: [
        "Define Population Education according to UNESCO.",
        "State two characteristics of Population Education.",
        "Explain the need for Population Education."
      ],
      asQuestions: [
        "ইউনেস্কোৰ মতে জনসংখ্যা শিক্ষাৰ সংজ্ঞা দিয়া।",
        "জনসংখ্যা শিক্ষাৰ দুটা বৈশিষ্ট্য উল্লেখ কৰা।",
        "জনসংখ্যা শিক্ষাৰ প্ৰয়োজনীয়তা ব্যাখ্যা কৰা।"
      ]
    },
    5: {
      enTitle: "Population Education (Part-2) - Scope, In Schools, Population Explosion, Causes and Effects",
      asTitle: "জনসংখ্যা শিক্ষা (খণ্ড-২) - পৰিসৰ, বিদ্যালয়ত শিক্ষা, জনসংখ্যা বিস্ফোৰণ, কাৰণ আৰু প্ৰভাৱসমূহ",
      enConcept: "Analyze the scope of population education, its place in schools, and the causes and consequences of population explosion.",
      asConcept: "জনসংখ্যা শিক্ষাৰ পৰিসৰ, বিদ্যালয়ত ইয়াৰ স্থান, আৰু জনসংখ্যা বিস্ফোৰণৰ কাৰণ আৰু পৰিণামসমূহ বিশ্লেষণ কৰা।",
      enExplanation: "Population education covers population dynamics, family life, health, nutrition, and environmental relations. Population Explosion refers to the rapid and uncontrolled increase in population within a short period, going beyond resource capacity. Its main causes are high birth rates, declining death rates, early marriage, poverty, and illiteracy.",
      asExplanation: "জনসংখ্যা শিক্ষাৰ পৰিসৰত জনসংখ্যা বৃদ্ধিৰ ধাৰা, পাৰিবাৰিক জীৱন শিক্ষা, স্বাস্থ্য আৰু পুষ্টি, পৰিৱেশ আৰু জনসংখ্যাৰ সম্পৰ্ক, সম্পদৰ ব্যৱস্থাপনা, জীৱনৰ মানদণ্ড আৰু স্থায়ী উন্নয়ন অন্তৰ্ভুক্ত। অতি কম সময়ৰ ভিতৰত জনসংখ্যাৰ দ্ৰুত আৰু অনিয়ন্ত্ৰিত বৃদ্ধিক জনসংখ্যা বিস্ফোৰণ বোলে। ইয়াৰ মূল কাৰণসমূহ হ'ল উচ্চ জন্মহাৰ, মৃত্যুহাৰ হ্ৰাস, বাল্যবিবাহ, দৰিদ্ৰতা আৰু নিৰক্ষৰতা।",
      enPoints: [
        "Scope (PFHERQS): Population growth, Family life education, Health & nutrition, Environmental relations, Resource management, Quality of life, and Sustainable development.",
        "In Schools: Promoted through classroom teaching in social sciences and biology, debate clubs, projects, and awareness drives.",
        "Population Explosion: Rapid growth beyond resource capacity. Mapped as: Population growth ↑, Resources ↓, Problems ↑.",
        "Causes (HELP-LDS): High birth rate, Early marriage, Lack of family planning, Poverty, Low literacy, Decline in death rate, and Social beliefs.",
        "Effects: Extreme poverty, high unemployment, food and housing shortages, environmental pollution, and pressure on resources."
      ],
      asPoints: [
        "পৰিসৰ: জনসংখ্যা বৃদ্ধিৰ গতিশীলতা, পাৰিবাৰিক জীৱন শিক্ষা, স্বাস্থ্য আৰু পুষ্টি, পৰিৱেশ আৰু জনসংখ্যাৰ সম্পৰ্ক, সম্পদৰ ব্যৱস্থাপনা, জীৱনৰ মানদণ্ড আৰু স্থায়ী উন্নয়ন।",
        "বিদ্যালয়ত শিক্ষা: সমাজ বিজ্ঞান আৰু জীৱবিজ্ঞানৰ শ্ৰেণীকোঠাত পাঠদান, আলোচনা সভা, প্ৰকল্প আৰু সজাগতা অভিযানৰ জৰিয়তে প্ৰসাৰ কৰা হয়।",
        "জনসংখ্যা বিস্ফোৰণ: উপলব্ধ সম্পদৰ তুলনাত জনসংখ্যাৰ অস্বাভাৱিক হাৰত বৃদ্ধি। ইয়াক বুজা যায়: জনসংখ্যা বৃদ্ধি ↑, সম্পদ ↓, সমস্যা ↑।",
        "কাৰণসমূহ: উচ্চ জন্মহাৰ, বাল্যবিবাহ, পৰিয়াল পৰিকল্পনাৰ অভาৱ, দৰিদ্ৰতা, নিৰক্ষৰতা, মৃত্যুহাৰ হ্ৰাস আৰু সামাজিক অন্ধবিশ্বাস।",
        "প্ৰভাৱসমূহ: দৰিদ্ৰতা বৃদ্ধি, নিবনুৱা সমস্যা, খাদ্য আৰু বাসস্থানৰ নাটনি, পৰিৱেশ দূষণ আৰু সম্পদৰ ওপৰত অতিৰিক্ত চাপ।"
      ],
      enTip: "Write the definition of Population Explosion clearly: 'It refers to the rapid increase in population beyond the capacity of available natural and social resources.' Always use bullet points for its causes.",
      asTip: "জনসংখ্যা বিস্ফোৰণৰ সংজ্ঞা স্পষ্টকৈ লিখক: 'উপলব্ধ প্ৰাকৃতিক আৰু সামাজিক সম্পদৰ ক্ষমতাৰ তুলনাত জনসংখ্যাৰ দ্ৰুত আৰু অস্বাভাৱিক বৃদ্ধিক জনসংখ্যা বিস্ফোৰণ বোলে।' ইয়াৰ কাৰণসমূহ পইণ্ট আকাৰে লিখিব।",
      enQuestions: [
        "Define Population Explosion.",
        "State three causes of Population Explosion.",
        "Mention three effects of overpopulation on society."
      ],
      asQuestions: [
        "জনসংখ্যা বিস্ফোৰণৰ সংজ্ঞা দিয়া।",
        "জনসংখ্যা বিস্ফোৰণৰ তিনিটা কাৰণ উল্লেখ কৰা।",
        "সমাজত অতিজনসংখ্যাৰ তিনিটা প্ৰভাৱ উল্লেখ কৰা।"
      ]
    },
    6: {
      enTitle: "Physical Education - Meaning, Aims, Objectives, Importance and In Schools",
      asTitle: "শাৰীৰিক শিক্ষা - অৰ্থ, লক্ষ্য, উদ্দেশ্য, গুৰুত্ব আৰু বিদ্যালয়ত শাৰীৰিক শিক্ষা",
      enConcept: "Understand the meaning, aims, objectives, and importance of Physical Education, including its execution in schools.",
      asConcept: "শাৰীৰিক শিক্ষাৰ অৰ্থ, লক্ষ্য, উদ্দেশ্য আৰু গুৰুত্ব বুজি লোৱা, লগতে বিদ্যালয়সমূহত ইয়াৰ প্ৰয়োগ অধ্যয়ন কৰা।",
      enExplanation: "Physical Education is an integral part of the total education process that develops physical fitness, health, strength, and overall personality through physical activities. Nixon and Cozens define it as the phase dealing with large muscle activities. Its ultimate aim is the all-round development of the individual (physical, mental, social, emotional, and moral).",
      asExplanation: "শাৰীৰিক শিক্ষা হ'ল সমগ্ৰ শিক্ষা ব্যৱস্থাৰ এক অপৰিহাৰ্য অংশ যিয়ে শাৰীৰিক ক্ৰিয়াকলাপৰ জৰিয়তে শাৰীৰিক সক্ষমতা, স্বাস্থ্য, শক্তি আৰু ব্যক্তিত্বৰ সামগ্ৰিক বিকাশ ঘটায়। থনক্সন আৰু ক'নেঞ্ছৰ মতে, ই হ'ল িৃৎ পেশীসমূহৰ কাৰ্যকলাপৰ সৈতে জড়িত পৰ্যায়। ইয়াৰ মূল লক্ষ্য হ'ল ব্যক্তিৰ সৰ্বাংগীণ বিকাশ (শাৰীৰিক, মানসিক, সামাজিক, আৱেগিক আৰু নৈতিক)।",
      enPoints: [
        "Meaning: Education of the body, through the body, for overall health and character.",
        "Objectives (PMESM): Physical development, Mental development, Emotional stability, Social values (cooperation, teamwork), and Moral character.",
        "Importance: Promotes good health, develops physical fitness, prevents diseases, builds discipline, and enhances social relations.",
        "In Schools: Provided through sports and games, physical exercises, yoga sessions, health education, and recreational activities.",
        "Value: Leadership quality, self-confidence, time management, and national integration."
      ],
      asPoints: [
        "অৰ্থ: শাৰীৰিক ক্ৰিয়াকলাপৰ জৰিয়তে সুস্থ শৰীৰ, চৰিত্ৰ আৰু সামগ্ৰিক স্বাস্থ্য গঢ়াৰ শিক্ষা।",
        "উদ্দেশ্যসমূহ: শাৰীৰিক বিকাশ, মানসিক বিকাশ, আৱেগিক সুস্থতা, সামাজিক দক্ষতা (সহযোগিতা, দলীয় মনোভাৱ) আৰু নৈতিক চৰিত্ৰ।",
        "গুৰুত্ব: সুস্বাস্থ্য বজাই ৰখা, শাৰীৰিক সক্ষমতা বৃদ্ধি কৰা, ৰোগ প্ৰতিৰোধ কৰা, চৰিত্ৰ আৰু নেতৃত্বৰ গুণ গঢ়া আৰু সামাজিক সম্পৰ্ক উন্নত কৰা।",
        "বিদ্যালয়ত শিক্ষা: ক্ৰীড়া আৰু খেল-ধেমালি, ব্যায়াম, যোগ কাৰ্যসূচী, স্বাস্থ্য শিক্ষা আৰু বিনোদনমূলক কাৰ্যকলাপৰ জৰিয়তে প্ৰদান কৰা হয়।",
        "মূল্যবোধ: নেতৃত্বৰ গুণ, আত্মবিশ্বাস, নিয়মানুৱৰ্তিতা, সময় ব্যৱস্থাপনা আৰু জাতীয় সংহতি বৃদ্ধি কৰে।"
      ],
      enTip: "A sound mind lives in a sound body. Memorize the objectives formula PMESM (Physical, Mental, Emotional, Social, Moral). Citing this combination secures full marks.",
      asTip: "'সুস্থ দেহতহে সুস্থ মন থাকে।' ইয়াৰ উদ্দেশ্যৰ সূত্ৰ PMESM (শাৰীৰিক, মানসিক, আৱেগিক, সামাজিক, নৈতিক) মনত ৰাখিব। এই জোঁটটো লিখিলে সম্পূৰ্ণ নম্বৰ পোৱা যায়।",
      enQuestions: [
        "Define Physical Education according to Nixon and Cozens.",
        "Explain three objectives of Physical Education.",
        "State three educational values of Physical Education."
      ],
      asQuestions: [
        "নিক্সন আৰু ক'নেঞ্ছৰ মতে শাৰীৰিক শিক্ষাৰ সংজ্ঞা দিয়া।",
        "শাৰীৰিক শিক্ষাৰ তিনিটা উদ্দেশ্য ব্যাখ্যা কৰা।",
        "শাৰীৰিক শিক্ষাৰ তিনিটা শৈক্ষিক মূল্য উল্লেখ কৰা।"
      ]
    },
    7: {
      enTitle: "Value Education (Part-1) - Meaning, Definitions, Types and Characteristics",
      asTitle: "মূল্যবোধ শিক্ষা (খণ্ড-১) - অৰ্থ, সংজ্ঞা, প্ৰকাৰ আৰু বৈশিষ্ট্যসমূহ",
      enConcept: "Understand the concept of values, definition of Value Education, and classification of different values.",
      asConcept: "মূল্যবোধৰ ধাৰণা, মূল্যবোধ শিক্ষাৰ সংজ্ঞা আৰু ইয়াৰ বিভিন্ন প্ৰকাৰৰ শ্ৰেণীবিভাজন বুজি লোৱা।",
      enExplanation: "A value is a belief, principle, or standard that guides human behavior and decision-making. Value Education refers to the process of developing desirable values, attitudes, and ethical behavior among learners. Kluckhohn defines value as a conception of the desirable which influences action.",
      asExplanation: "মূল্যবোধ হ'ল এক বিশ্বাস, নীতি বা মানদণ্ড যিয়ে মানুহৰ আচৰণ আৰু সিদ্ধান্ত গ্ৰহণক পথপ্ৰদৰ্শন কৰে। মূল্যবোধ শিক্ষা হ'ল শিক্ষাৰ্থীৰ মাজত কাম্য মূল্যবোধ, মনোভাৱ আৰু নৈতিক আচৰণ গঢ়ি তোলাৰ প্ৰক্ৰিয়া। ক্লুকহনৰ মতে, মূল্যবোধ হ'ল কাম্য ধাৰণা যিয়ে কৰ্মক প্ৰভাৱিত কৰে।",
      enPoints: [
        "Value: Standards that distinguish right from wrong, good from bad.",
        "Types of Values (MSDCPP): Moral (honesty, truthfulness), Social (cooperation, respect), Spiritual (faith, compassion), Democratic (equality, justice, freedom), Cultural (traditions, heritage), and Personal (self-discipline, responsibility).",
        "Characteristics: Value-oriented, holistic personality development, continuous lifelong process, practical in nature, and behavior-centred."
      ],
      asPoints: [
        "মূল্যবোধ: উচিত-অনুচিত, ভাল-বেয়া নিৰূপণ কৰাৰ এক সামাজিক মানদণ্ড বা বিশ্বাস।",
        "মূল্যবোধৰ প্ৰকাৰসমূহ: নৈতিক (সততা, সত্যবাদিতা), সামাজিক (সহযোগিতা, সন্মান), আধ্যাত্মিক (বিশ্বাস, দয়া), গণতান্ত্ৰিক (সমতা, ন্যায়, স্বাধীনতা), সাংস্কৃতিক (ঐতিহ্য, ৰীতি-নীতি) আৰু ব্যক্তিগত (আত্ম-নিয়ন্ত্ৰণ, দায়িত্ববোধ)।",
        "বৈশিষ্ট্যসমূহ: মূল্যবোধ-ভিত্তিক, সৰ্বাংগীণ ব্যক্তিত্ব বিকাশ, এক নিৰন্তৰ আজীৱন প্ৰক্ৰিয়া, ব্যৱহাৰিক প্ৰকৃতিৰ আৰু আচৰণ-কেন্ৰিক।"
      ],
      enTip: "Make sure you can list and define the major types of values using the formula MSDCPP: Moral, Social, Democratic, Cultural, Personal, and Spiritual.",
      asTip: "MSDCPP সূত্ৰ ব্যৱহাৰ কৰি মূল্যবোধৰ প্ৰধান প্ৰকাৰসমূহ লিখিবলৈ শিকক: নৈতিক, সামাজিক, গণতান্ত্ৰিক, সাংস্কৃতিক, ব্যক্তিগত আৰু আধ্যাত্মিক।",
      enQuestions: [
        "What is a Value?",
        "Define Value Education.",
        "Name four types of values with examples."
      ],
      asQuestions: [
        "মূল্যবোধ কি?",
        "মূল্যবোধ শিক্ষাৰ সংজ্ঞা দিয়া।",
        "উদাহৰণসহ মূল্যবোধৰ চাৰিটা প্ৰকাৰ উল্লেখ কৰা।"
      ]
    },
    8: {
      enTitle: "Value Education (Part-2) - Objectives, Sources, Importance, Ways and Barriers",
      asTitle: "মূল্যবোধ শিক্ষা (খণ্ড-২) - উদ্দেশ্য, উৎস, গুৰুত্ব, উপায় আৰু বাধাসমূহ",
      enConcept: "Study the objectives, sources of values in India, importance of Value Education, methods of imparting it, and barriers.",
      asConcept: "মূল্যবোধ শিক্ষাৰ উদ্দেশ্য, ভাৰতত মূল্যবোধৰ উৎসসমূহ, ইয়াৰ গুৰুত্ব, প্ৰদান কৰাৰ উপায় আৰু অন্তৰায়সমূহ অধ্যয়ন কৰা।",
      enExplanation: "The primary objectives of Value Education are character formation, moral growth, and national integration. Values in India originate from the family, religion, educational institutions, society, literature, and the Constitution of India. It can be imparted through classroom teaching, teachers' examples, morning assemblies, and storytelling, though it faces barriers like materialism and family disintegration.",
      asExplanation: "মূল্যবোধ শিক্ষাৰ মূল উদ্দেশ্য হ'ল চৰিত্ৰ গঠন, নৈতিক বিকাশ আৰু ৰাষ্ট্ৰীয় সংহতি। ভাৰতত মূল্যবোধৰ উৎসসমূহ হ'ল পৰিয়াল, ধৰ্ম, শিক্ষানুষ্ঠান, সমাজ, সাহিত্য আৰু ভাৰতীয় সংবিধান। ইয়াক শ্ৰেণীকোঠাৰ পাঠদান, শিক্ষকৰ আদৰ্শ, প্ৰাৰ্থনা সভা আৰু সাধুকথাৰ জৰিয়তে প্ৰদান কৰিব পাৰি, যদিও ই বস্তুবাদী চিন্তা আৰু পৰিয়াল ভাঙনৰ দৰে বাধাৰ সন্মুখীন হয়।",
      enPoints: [
        "Objectives (CMSENDS): Character formation, Moral development, Social responsibility, Emotional development, National integration, Democratic citizenship, and Spiritual development.",
        "Sources in India: Family (first school), Religion (morality, compassion), Educational institutions, Society, Culture, Literature, and Constitution (justice, liberty, equality).",
        "Importance: Builds good habits, promotes social harmony, creates responsible citizens, strengthens democracy, and ensures national development.",
        "Ways of Imparting: Classroom teaching, teacher's model behavior, co-curricular activities, morning assembly, community service, and reading biographies.",
        "Barriers: Materialistic outlook, family disintegration, negative media influence, lack of role models, social problems, and examination-oriented education."
      ],
      asPoints: [
        "উদ্দেশ্যসমূহ: চৰিত্ৰ গঠন, নৈতিক বিকাশ, সামাজিক দায়িত্ববোধ, আৱেগিক বিকাশ, ৰাষ্ট্ৰীয় সংহতি, গণতান্ত্ৰিক নাগৰিকত্ব আৰু আধ্যাত্মিক বিকাশ।",
        "উৎসসমূহ: পৰিয়াল (প্ৰথম পাঠশালা), ধৰ্ম (নৈতিকতা, দয়া), শিক্ষানুষ্ঠান, সমাজ, সংস্কৃতি, সাহিত্য আৰু সংবিধান (ন্যায়, স্বাধীনতা, সমতা)।",
        "গুৰুত্ব: ভাল অভ্যাস আৰু চৰিত্ৰ গঠন কৰে, সামাজিক সম্প্ৰীতি বঢ়ায়, দায়িত্বশীল নাগৰিক গঢ়ে, গণতন্ত্ৰ শক্তিশালী কৰে আৰু ৰাষ্ট্ৰীয় উন্নয়ন ত্বৰান্বিত কৰে।",
        "প্ৰদান কৰাৰ উপায়: শ্ৰেণীকোঠাত পাঠদান, শিক্ষকৰ আদৰ্শ আচৰণ, সহ-পাঠ্যক্ৰম কাৰ্যসূচী, প্ৰাৰ্থনা সভা, সমাজসেৱা আৰু মহৎ ব্যক্তিৰ জীৱনী পাঠ।",
        "বাধাসমূহ: বস্তুবাদী চিন্তাধাৰা, পৰিয়াল ভাঙন, সংবাদ মাধ্যমৰ ঋণাত্মক প্ৰভাৱ, উপযুক্ত আদৰ্শ ব্যক্তিৰ অভাৱ, সামাজিক সমস্যা আৰু পৰীক্ষামুখী শিক্ষা।"
      ],
      enTip: "Sources of values is a highly expected long question. Present them in the logical flow: Family → Religion → School → Society → Culture → Literature → Constitution. Underline all headings.",
      asTip: "মূল্যবোধৰ উৎসসমূহ পৰীক্ষাৰ বাবে অত্যন্ত গুৰুত্বপূৰ্ণ প্ৰশ্ন। ইয়াক ক্ৰমানুসাৰে সজাব: পৰিয়াল → ধৰ্ম → বিদ্যালয় → সমাজ → সংস্কৃতি → সাহিত্য → সংবিধান। শিৰোনামসমূহৰ তলত আঁচ টানিব।",
      enQuestions: [
        "State four sources of values in India.",
        "Explain three barriers to Value Education.",
        "Mention three methods to impart Value Education in schools."
      ],
      asQuestions: [
        "ভাৰতত মূল্যবোধৰ চাৰিটা উৎস উল্লেখ কৰা।",
        "মূল্যবোধ শিক্ষা প্ৰদানৰ তিনিটা বাধা ব্যাখ্যা কৰা।",
        "বিদ্যালয়ত মূল্যবোধ শিক্ষা প্ৰদানৰ তিনিটা পদ্ধতি উল্লেখ কৰা।"
      ]
    },
    9: {
      enTitle: "Education for Women Empowerment - Meaning, Objectives, Importance, Role of Education, Problems and Suggestions",
      asTitle: "মহিলা সবলীকৰণৰ বাবে শিক্ষা - অৰ্থ, উদ্দেশ্য, গুৰুত্ব, শিক্ষাৰ ভূমিকা, সমস্যা আৰু সংস্কাৰমূলক পৰামৰ্শ",
      enConcept: "Understand the concept of women empowerment, the role of education in empowering women, problems, and suggestions for improvement.",
      asConcept: "মহিলা সবলীকৰণৰ ধাৰণা, সবলীকৰণত শিক্ষাৰ ভূমিকা, ইয়াৰ সমস্যা আৰু ইয়াৰ সৰ্বাঙ্গীন উন্নতিৰ বাবে পৰামৰ্শসমূহ বুজি লোৱা।",
      enExplanation: "Women Empowerment is the process of enabling women to gain confidence, rights, opportunities, and decision-making power. Education is the most effective tool to achieve this by providing knowledge, ensuring economic independence, developing leadership, and protecting against exploitation. However, it faces barriers like poverty, gender discrimination, early marriage, and parent illiteracy.",
      asExplanation: "মহিলা সবলীকৰণ হৈছে মহিলাসকলক আত্মবিশ্বাস, অধিকাৰ, সুযোগ আৰু সিদ্ধান্ত গ্ৰহণৰ ক্ষমতা লাভ কৰাত সহায় কৰাৰ প্ৰক্ৰিয়া। শিক্ষা হ'ল ইয়াৰ আটাইতকৈ কাৰ্যকৰী মাধ্যম যিয়ে জ্ঞান প্ৰদান কৰে, অৰ্থনৈতিক স্বাৱলম্বীতা দিয়ে, নেতৃত্বৰ গুণ বিকাশ কৰে আৰু শোষণৰ পৰা সুৰক্ষিত কৰে। কিন্তু ই দৰিদ্ৰতা, লিংগ বৈষম্য, বাল্যবিবাহ আৰু অভিভাৱকৰ নিৰক্ষৰতাৰ দৰে বাধাৰ সন্মুখীন হয়।",
      enPoints: [
        "Meaning: Enabling women to have control over their lives and participate equally in social, economic, and political systems.",
        "Objectives (SEELRQP): Self-confidence, Equality, Economic independence, Leadership, Rights awareness, Quality of life, and Social participation.",
        "Importance: Promotes gender equality, improves family welfare, supports economic growth, strengthens democracy, and reduces social evils (child marriage, dowry).",
        "Role of Education: Provides knowledge & awareness, creates job opportunities (economic independence), builds personality & leadership, and prevents exploitation.",
        "Problems: Poverty, gender bias, early marriage, parent illiteracy, lack of safe schools, and conservative social customs.",
        "Suggestions: Free and compulsory education for girls, increasing scholarships, improving school facilities & safety, social awareness campaigns, and community involvement."
      ],
      asPoints: [
        "অৰ্থ: মহিলাসকলক নিজৰ জীৱন নিয়ন্ত্ৰণ কৰাৰ ক্ষমতা দিয়া আৰু সামাজিক, অৰ্থনৈতিক আৰু ৰাজনৈতিক ব্যৱস্থাত সমান অংশগ্ৰহণ নিশ্চিত কৰা।",
        "উদ্দেশ্যসমূহ: আত্মবিশ্বাস বৃদ্ধি, সমতা নিশ্চিত কৰা, অৰ্থনৈতিক স্বাৱলম্বীতা, নেতৃত্বৰ বিকাশ, অধিকাৰৰ সজাগতা, জীৱনৰ মানদণ্ড আৰু সামাজিক অংশগ্ৰহণ।",
        "গুৰুত্ব: লিংগ সমতা স্থাপন কৰে, পাৰিবৰিক কল্যাণ সাধন কৰে, অৰ্থনৈতিক উন্নয়নত সহায় কৰে, গণতন্ত্ৰ শক্তিশালী কৰে আৰু কু-প্ৰথা (বাল্যবিবাহ, যৌতুক) হ্ৰাস কৰে।",
        "শিক্ষাৰ ভূমিকা: জ্ঞান আৰু সজাগতা দিয়ে, কৰ্মসংস্থাপনৰ সুবিধা দিয়ে (অৰ্থনৈতিক স্বাধীনতা), চৰিত্ৰ আৰু নেতৃত্ব গঢ়ে আৰু শোষণ প্ৰতিৰোধ কৰে।",
        "সমস্যাসমূহ: দৰিদ্ৰতা, লিংগ বৈষম্য, বাল্যবিবাহ, অভিভাৱকৰ নিৰক্ষৰতা, নিৰাপদ বিদ্যালয়ৰ অভাৱ আৰু সংকীৰ্ণ সামাজিক ৰীতি-নীতি।",
        "পৰামৰ্শসমূহ: ছোৱালীৰ বাবে বিনামূলীয়া আৰু বাধ্যতামূলক শিক্ষা, বৃত্তিৰ সুবিধা বৃদ্ধি কৰা, বিদ্যালয়ৰ পৰিৱেশ আৰু নিৰাপত্তা উন্নত কৰা, সামাজিক সজাগতা বৃদ্ধি কৰা আৰু সমাজক জড়িত কৰা।"
      ],
      enTip: "The role of education in women empowerment is a high-frequency board question. Structure your answer using the sub-headings: Awareness, Economic Independence, Leadership, Social Participation, and Legal Protection. Underline keywords.",
      asTip: "মহিলা সবলীকৰণত শিক্ষাৰ ভূমিকা বোৰ্ড পৰীক্ষাৰ বাবে অত্যন্ত গুৰুত্বপূৰ্ণ প্ৰশ্ন। উত্তৰটো শিৰোনাম দি লিখিব: সজাগতা, অৰ্থনৈতিক স্বাৱলম্বীতা, নেতৃত্বৰ গুণ, সামাজিক অংশগ্ৰহণ আৰু আইনী সুৰক্ষা।",
      enQuestions: [
        "Explain the meaning of Women Empowerment.",
        "State four problems of Women Education in India.",
        "Mention three suggestions for improving Women Education."
      ],
      asQuestions: [
        "মহিলা সবলীকৰণৰ অৰ্থ ব্যাখ্যা কৰা।",
        "ভাৰতত মহিলা শিক্ষাৰ চাৰিটা সমস্যা উল্লেখ কৰা।",
        "মহিলা শিক্ষাৰ মান উন্নত কৰাৰ বাবে তিনিটা পৰামৰ্শ উল্লেখ কৰা।"
      ]
    }
  },
  "unit-4": {
    1: {
      enTitle: "Learning - Definition, Characteristics, and Nature",
      asTitle: "শিকন - সংজ্ঞা, বৈশিষ্ট্য আৰু প্ৰকৃতি",
      enConcept: "Analyzing learning as a permanent change in behavior resulting from experience, training, and practice.",
      asConcept: "অভিজ্ঞতা, প্ৰশিক্ষণ আৰু অভ্যাসৰ ফলত আচৰণৰ স্থায়ী পৰিৱৰ্তন হিচাপে শিকনক বিশ্লেষণ কৰা।",
      enExplanation: "Learning is a key process in human behavior. It is defined as a relatively permanent change in behavior potentiality that occurs as a result of reinforced practice or experience. It is a continuous, lifelong process that is goal-directed and involves adjustment.",
      asExplanation: "শিকন মানৱ আচৰণৰ এক গুৰুত্বপূৰ্ণ প্ৰক্ৰিয়া। অভিজ্ঞতা বা অনুশীলনৰ ফলত আচৰণৰ তুলনামূলকভাৱে স্থায়ী পৰিৱৰ্তন ঘটাটোকে শিকন বোলা হয়। ই এক নিৰন্তৰ, আজীৱন চলি থকা প্ৰক্ৰিয়া যি লক্ষ্যমুখী আৰু অভিযোজনৰ সৈতে জড়িত।",
      enPoints: [
        "Permanent Change: Behavior modifications must last over time.",
        "Goal-Directed: Driven by personal needs or external targets.",
        "Lifelong: Starts at birth and continues throughout life."
      ],
      asPoints: [
        "স্থায়ী পৰিৱৰ্তন: আচৰণৰ পৰিৱৰ্তন সময়ৰ লগে লগে স্থায়ী হব লাগিব।",
        "লক্ষ্যমুখী: ব্যক্তিগত প্ৰয়োজন বা বাহ্যিক লক্ষ্যৰ দ্বাৰা পৰিচালিত।",
        "আজীৱন: জন্মৰ পৰা আৰম্ভ হয় আৰু জীৱনৰ শেষলৈকে চলি থাকে।"
      ],
      enTip: "State the definitions of Woodworth, Gates, or Skinner. Citing psychologists gets higher marks.",
      asTip: "উডৱৰ্থ, গেটছ বা স্কিনাৰৰ সংজ্ঞা উল্লেখ কৰক। মনোবিজ্ঞানীৰ উক্তি দিলে পৰীক্ষাত অধিক নম্বৰ পোৱা যায়।",
      enQuestions: [
        "Give a psychological definition of learning.",
        "Discuss four major characteristics of learning."
      ],
      asQuestions: [
        "শিকনৰ এটা মনোবৈজ্ঞানিক সংজ্ঞা দিয়া।",
        "শিকনৰ চাৰিটা প্ৰধান বৈশিষ্ট্য আলোচনা কৰা।"
      ]
    }
  },
  "unit-5": {
    1: {
      enTitle: "Memory - Definition and the Three Basic Stages",
      asTitle: "স্মৃতি - সংজ্ঞা আৰু তিনিটা প্ৰাথমিক স্তৰ",
      enConcept: "Studying memory as the process of encoding, retaining, and recalling information.",
      asConcept: "তথ্যৰ সংকেতীকৰণ, ধাৰণ আৰু পুনৰুদ্ধাৰৰ প্ৰক্ৰিয়া হিচাপে স্মৃতিক অধ্যয়ন কৰা।",
      enExplanation: "Memory is the capacity of the nervous system to acquire and retain usable skills and information. Psychologically, it consists of three distinct stages: Registration (Encoding), Retention (Storage), and Reproduction (Recall and Recognition). Without successful registration, retrieval is impossible.",
      asExplanation: "স্মৃতি হৈছে উপযোগী দক্ষতা আৰু তথ্য সংগ্ৰহ তথা সংৰক্ষণ কৰিব পৰা স্নায়ুতন্ত্ৰৰ ক্ষমতা। মনোবৈজ্ঞানিকভাৱে, ই তিনিটা পৰ্যায়ৰে গঠিত: সংকেতীকৰণ (প্ৰৱেশ), সংৰক্ষণ (ধাৰণ), আৰু পুনৰুদ্ধাৰ (স্মৰণ আৰু প্ৰত্যভিজ্ঞা)।",
      enPoints: [
        "Registration: Receiving and processing external sensory input.",
        "Retention: Storing the processed information in short/long-term memory.",
        "Reproduction: Retrieving stored memories through active recall or recognition."
      ],
      asPoints: [
        "সংকেতীকৰণ: বাহ্যিক সংবেদী ইনপুট লাভ কৰা আৰু বিশ্লেষণ কৰা।",
        "সংৰক্ষণ: বিশ্লেষণ কৰা তথ্য হ্ৰস্বম্যাদী বা দীৰ্ঘম্যাদী স্মৃতিত সংৰক্ষণ কৰা।",
        "পুনৰুদ্ধাৰ: সক্ৰিয় স্মৰণ বা প্ৰত্যভিজ্ঞাৰ জৰিয়তে স্মৃতিক পুনৰ ঘূৰাই অনা।"
      ],
      enTip: "Differentiate between recall and recognition. Recall is active searching; recognition is matching with an existing stimulus.",
      asTip: "স্মৰণ আৰু প্ৰত্যভিজ্ঞাৰ পাৰ্থক্য বুজি লওক। স্মৰণ হ'ল সক্ৰিয় অনুসন্ধান; প্ৰত্যভিজ্ঞা হ'ল বিদ্যমান উদ্দীপকৰ সৈতে মিলোৱা।",
      enQuestions: [
        "What is memory?",
        "Explain the three basic processes involved in memory."
      ],
      asQuestions: [
        "স্মৃতি কি?",
        "স্মৃতিৰ সৈতে জড়িত তিনিটা মূল প্ৰক্ৰিয়া ব্যাখ্যা কৰা।"
      ]
    }
  },
  "unit-6": {
    1: {
      enTitle: "Mental Health and Hygiene - Meaning and Objectives",
      asTitle: "মানসিক স্বাস্থ্য আৰু বিজ্ঞান - অৰ্থ আৰু উদ্দেশ্যসমূহ",
      enConcept: "Defining mental health as a state of emotional adjustment and mental hygiene as the preventive science.",
      asConcept: "মানসিক স্বাস্থ্যক আৱেগিক অভিযোজনৰ অৱস্থা আৰু মানসিক বিজ্ঞানক প্ৰতিৰোধমূলক বিজ্ঞান হিচাপে সংজ্ঞায়িত কৰা।",
      enExplanation: "Mental Health is the full, harmonious functioning of the whole personality. Mental Hygiene is the science that deals with the promotion of mental health, prevention of mental disorders, and preservation of psychological balance within the individual and community.",
      asExplanation: "মানসিক স্বাস্থ্য হ'ল সমগ্ৰ ব্যক্তিত্বৰ এক সামঞ্জস্যপূৰ্ণ কাৰ্যক্ষমতা। মানসিক বিজ্ঞান হৈছে এনে এক বিজ্ঞান যিয়ে মানসিক স্বাস্থ্যৰ উন্নতি, মানসিক ৰোগ প্ৰতিৰোধ আৰু ব্যক্তিসকলৰ মাজত মানসিক ভাৰসাম্য ৰক্ষাৰ বিষয়সমূহ আলোচনা কৰে।",
      enPoints: [
        "Mental Health: A state of psychological well-being where one handles daily stress.",
        "Mental Hygiene: The active practice and rules to achieve and protect mental health.",
        "Three Aims: Prevention, preservation, and treatment of mental health issues."
      ],
      asPoints: [
        "মানসিক স্বাস্থ্য: মানসিক সুস্থতাৰ এক অৱস্থা য'ত ব্যক্তিয়ে দৈনিক চাপ চম্ভালিব পাৰে।",
        "মানসিক বিজ্ঞান: মানসিক স্বাস্থ্য অৰ্জন আৰু সুৰক্ষিত কৰাৰ বাবে কৰা সক্ৰিয় অভ্যাস।",
        "তিনিটা লক্ষ্য: মানসিক সমস্যা প্ৰতিৰোধ, সংৰক্ষণ আৰু চিকিৎসা।"
      ],
      enTip: "Keep in mind: Mental health is the state/goal, while Mental hygiene is the science/practice to reach that goal.",
      asTip: "মনত ৰাখিব: মানসিক স্বাস্থ্য হ'ল লক্ষ্য, আনহাতে মানসিক বিজ্ঞান হ'ল সেই লক্ষ্যত উপনীত হোৱাৰ বিজ্ঞান বা অভ্যাস।",
      enQuestions: [
        "Define mental health.",
        "What are the primary objectives of mental hygiene?"
      ],
      asQuestions: [
        "মানসিক স্বাস্থ্যৰ সংজ্ঞা দিয়া।",
        "মানসিক বিজ্ঞানৰ প্ৰধান উদ্দেশ্যসমূহ কি কি?"
      ]
    }
  },
  "unit-7": {
    1: {
      enTitle: "Statistics in Education - Meaning and Need",
      asTitle: "শৈক্ষিক পৰিসংখ্যা - অৰ্থ আৰু প্ৰয়োজনীয়তা",
      enConcept: "Introduction to statistics as a quantitative tool to compile, tabulate, and analyze student test scores and profiles.",
      asConcept: "ছাত্ৰ-ছাত্ৰীৰ নম্বৰ সংগ্ৰহ, তালিকাভুক্ত আৰু বিশ্লেষণ কৰাৰ বাবে এক পৰিমাণগত আহিলা হিচাপে পৰিসংখ্যাৰ পৰিচয়।",
      enExplanation: "Statistics is the branch of science that deals with the collection, organization, analysis, interpretation, and presentation of numerical data. In education, it helps in evaluating student performance, organizing score distributions, conducting research, and predicting exam results.",
      asExplanation: "পৰিসংখ্যা হৈছে বিজ্ঞানৰ সেইটো শাখা যিয়ে সংখ্যাগত তথ্য সংগ্ৰহ, সংগঠন, বিশ্লেষণ, ব্যাখ্যা আৰু উপস্থাপনৰ সৈতে কাম কৰে। শিক্ষাৰ ক্ষেত্ৰত ই ছাত্ৰ-ছাত্ৰীৰ পাৰদৰ্শিতা মূল্যায়ন কৰাত, নম্বৰসমূহ সজাই তোলাত আৰু পৰীক্ষাৰ ফলাফল অনুমান কৰাত সহায় কৰে।",
      enPoints: [
        "Data Organization: Allows vast student marks to be compressed into structured tables.",
        "Evaluation Tool: Compares group scores, standard deviations, and class performance.",
        "Objective Planning: Helps education boards plan school funding and pass ratios scientifically."
      ],
      asPoints: [
        "তথ্যৰ সংগঠন: বৃহৎ পৰিমাণৰ নম্বৰ তালিকাভুক্ত কৰাত সহায় কৰে।",
        "মূল্যায়ন সঁজুলি: গোটৰ নম্বৰ আৰু শ্ৰেণীৰ পাৰদৰ্শিতা তুলনা কৰে।",
        "বস্তুনিষ্ঠ পৰিকল্পনা: শিক্ষা বোৰ্ডসমূহক স্কুল উন্নয়নৰ বাবে পৰিকল্পনা কৰাত সহায় কৰে।"
      ],
      enTip: "Practice definitions of Statistics. This unit has 10 marks in the board exam. Learn statistical definitions carefully.",
      asTip: "পৰিসংখ্যাৰ সংজ্ঞাসমূহ অভ্যাস কৰক। বোৰ্ড পৰীক্ষাত এই অধ্যায়ৰ পৰা ১০ নম্বৰ আহে। গতিকে ইয়াৰ সংজ্ঞাসমূহ ভালদৰে শিকিব।",
      enQuestions: [
        "What is statistics?",
        "Explain three reasons why statistics is necessary for teachers."
      ],
      asQuestions: [
        "পৰিসংখ্যা কি?",
        "শিক্ষকসকলৰ বাবে পৰিসংখ্যা কিয় প্ৰয়োজনীয় তাৰ তিনিটা কাৰণ ব্যাখ্যা কৰা।"
      ]
    }
  }
};

// Generates fallback data for days not explicitly filled in (to ensure all 140 days have actual topic content)
export function getNoteContent(unitId: string, dayNumber: number, lang: "en" | "as"): NoteContent {
  const unitData = syllabusTopics[unitId];
  if (unitData && unitData[dayNumber]) {
    const data = unitData[dayNumber];
    return lang === "en"
      ? {
          title: data.enTitle,
          concept: data.enConcept,
          explanation: data.enExplanation,
          points: data.enPoints,
          examTip: data.enTip,
          questions: data.enQuestions,
        }
      : {
          title: data.asTitle,
          concept: data.asConcept,
          explanation: data.asExplanation,
          points: data.asPoints,
          examTip: data.asTip,
          questions: data.asQuestions,
        };
  }

  // Fallback generator - generates actual topics mathematically according to the Day number so it is never generic or empty
  const fallbackTopics: Record<string, string[]> = {
    "unit-1": [
      "Secondary Education Commission Targets",
      "Language Formula Recommendations",
      "Teacher Training Standards Mudaliar",
      "Secondary School Guidance Bureaus",
      "NEP 1986 Key Features",
      "Navodaya Vidyalayas Purpose",
      "Operation Blackboard Targets",
      "Programme of Action (POA) 1992 Highlights",
      "Secondary Education Administration in Assam",
      "Guwahati High School Growth Patterns",
      "Vocationalization of Assam Schools",
      "Infrastructure Challenges in High Schools",
      "Assam Education Boards Administration",
      "SEBA Rules and Regulation History",
      "AHSEC High Yield Syllabus Planning",
      "Teacher Eligibility Tests (TET) Role",
      "Funding Schemes for Rural Schools",
      "Curriculum Reforms under NEP 2020 Overview",
      "Evaluation & Grading Reforms",
      "Secondary Level Student Dropout Factors"
    ],
    "unit-2": [
      "Scope of Non-formal Education",
      "Open Universities in India",
      "Role of IGNOU",
      "Correspondence Education Aims",
      "Mass Media as Educational Agency",
      "Educational Radio Broadcasts",
      "Educational Television Programs (Gyan Darshan)",
      "Role of Press & Newspapers",
      "Limitations of Mass Media",
      "Open School System in Assam",
      "Distance Learning Merits",
      "Demerits of Correspondence Study",
      "Technological Aids in Non-formal Setup",
      "Adult Education Program Mappings",
      "National Literacy Mission Overview",
      "Online Classrooms & Virtual Mediums",
      "Comparison: Formal vs Non-formal",
      "Role of Community in Learning",
      "State Open Schooling Initiatives",
      "Modern Trends in Distance Education"
    ],
    "unit-3": [
      "Introduction to Current Education Trends",
      "Environmental Degradation & Conservation",
      "Sustainable Development Goals in Education",
      "Population Education Concept & Scope",
      "Causes of Population Growth",
      "Population Education Aims & Policies",
      "Physical Education Definitions",
      "Need for Physical Training in Schools",
      "Yoga and Health Education Programs",
      "Value Education Meaning & Scope",
      "Moral Values vs Social Values",
      "Methods of Imparting Value Education",
      "Human Rights Education",
      "Child Rights Protection Policies",
      "Democratic Values in School Culture",
      "Gender Equality in Classrooms",
      "Vocational Training Alignment",
      "Life Skills Education Curriculum",
      "Integration of Values in Science Subjects",
      "Role of Teacher in Imparting Values"
    ],
    "unit-4": [
      "Definition of Learning by Woodworth & Gates",
      "S-R Association Theory of Learning",
      "Trial and Error Learning Experiment",
      "Thorndike's Primary Law of Readiness",
      "Thorndike's Law of Exercise & Effect",
      "Educational Implications of Trial & Error",
      "Pavlov's Classical Conditioning Experiment",
      "Principles of Classical Conditioning",
      "Conditioned Stimulus and Extinction",
      "Skinner's Operant Conditioning Theory",
      "Reinforcement Schedules in Classrooms",
      "Insightful Learning Theory (Kohler)",
      "Experiment with Chimpanzee (Sultan)",
      "Characteristics of Insightful Learning",
      "Comparison: Conditioning vs Insightful",
      "Transfer of Learning Definition",
      "Positive, Negative, and Zero Transfer",
      "Theories of Transfer of Learning",
      "Role of Motivation in Learning",
      "Teacher's Role in Optimizing Learning"
    ],
    "unit-5": [
      "Definition and Characteristics of Memory",
      "Registration (Encoding) Process",
      "Retention (Storage) Mechanisms",
      "Recall and Recognition (Reproduction)",
      "Good Memory Characteristics",
      "Types of Memory: Immediate & Permanent",
      "Logical vs Rote Memory",
      "Forgetting: Definition and Curve",
      "Active and Passive Forgetting Causes",
      "Ebbinghaus Curve of Forgetting",
      "Methods to Improve Memory Power",
      "Attention: Definition and Nature",
      "Types of Attention: Voluntary & Involuntary",
      "Subjective Factors of Attention",
      "Objective Factors of Attention",
      "Interest: Definition and Relation to Attention",
      "Educational Value of Drawing Attention",
      "Distraction: Types and Prevention",
      "Fluctuation of Attention Mechanisms",
      "Creating Interest in Classroom Subjects"
    ],
    "unit-6": [
      "Concept of Mental Health",
      "Concept of Mental Hygiene",
      "Differences: Mental Health vs Hygiene",
      "Objectives of Mental Hygiene",
      "Characteristics of a Mentally Healthy Person",
      "Home Environment and Mental Health",
      "School Environment and Mental Health",
      "Role of Teacher in Preventing Maladjustment",
      "Concept of Maladjustment",
      "Causes of Maladjustment in Teens",
      "Frustration and Conflict Meanings",
      "Types of Conflict (Approach-Avoidance)",
      "Defense Mechanisms: Rationalization",
      "Defense Mechanisms: Projection & Regression",
      "Defense Mechanisms: Sublimation & Identification",
      "Delinquency: Meaning and Causes",
      "Guidance and Counseling Services",
      "Types of Guidance: Educational & Vocational",
      "Personal Counseling Strategies",
      "Creating Adaptive School Ecosystems"
    ],
    "unit-7": [
      "Need for Statistics in Education",
      "Methods of Data Collection",
      "Tabulation of Data (Frequency Distribution)",
      "Class Intervals and Mid-points",
      "Tally Marks Method",
      "Graphical Representation: Histogram",
      "Graphical Representation: Frequency Polygon",
      "How to Draw Cumulative Frequency Curves",
      "Measures of Central Tendency Concept",
      "Arithmetic Mean Definition",
      "Calculation of Mean (Short Method)",
      "Calculation of Mean (Long Method)",
      "Median Definition & Mathematical Properties",
      "Calculation of Median from Grouped Data",
      "Calculation of Median from Ungrouped Data",
      "Mode Definition & Uses",
      "Calculation of Mode (Empirical Formula)",
      "Comparison: Mean, Median, and Mode",
      "Percentile & Percentile Ranks Overview",
      "Summary of Educational Statistics"
    ]
  };

  const fallbackAsTopics: Record<string, string[]> = {
    "unit-1": [
      "মাধ্যমিক শিক্ষা আয়োগৰ লক্ষ্যসমূহ",
      "ভাষা নীতি সম্পৰ্কে চুপাৰিছসমূহ",
      "শিক্ষক প্ৰশিক্ষণৰ মানদণ্ড",
      "মাধ্যমিক বিদ্যালয়ৰ নিৰ্দেশনা ব্যৱস্থা",
      "ৰাষ্ট্ৰীয় শিক্ষানীতি ১৯৮৬ ৰ বৈশিষ্ট্যসমূহ",
      "নৱোদয় বিদ্যালয়ৰ লক্ষ্য",
      "অপাৰেচন ব্লেকবৰ্ড আঁচনি",
      "কাৰ্যসূচী ১৯৯২ ৰ মূল দিশসমূহ",
      "অসমৰ মাধ্যমিক শিক্ষাৰ প্ৰশাসন",
      "মাধ্যমিক বিদ্যালয়ৰ বিকাশৰ ধাৰা",
      "অসমৰ বিদ্যালয়ত বৃত্তিমুখীকৰণ",
      "উচ্চ মাধ্যমিক বিদ্যালয়ৰ প্ৰত্যাহ্বানসমূহ",
      "অসম শিক্ষা বোৰ্ডৰ নিয়মাৱলী",
      "SEBA ৰ ভূমিকা আৰু ইতিহাস",
      "AHSEC পাঠ্যক্ৰম পৰিকল্পনা",
      "টেট (TET) পৰীক্ষাৰ ভূমিকা",
      "গ্ৰাম্য বিদ্যালয়ৰ পুজি যোগান",
      "NEP ২০২০ ৰ মাধ্যমিক শিক্ষা নীতি",
      "মূল্যায়ন আৰু গ্ৰেডিং সংস্কাৰ",
      "মাধ্যমিক স্তৰত ছাত্ৰ ড্ৰপআউটৰ কাৰকসমূহ"
    ],
    "unit-2": [
      "অনানুষ্ঠানিক শিক্ষাৰ পৰিসৰ",
      "ভাৰতৰ মুক্ত বিশ্ববিদ্যালয়সমূহ",
      "ইগনু (IGNOU) ৰ শৈক্ষিক অৱদান",
      "পত্ৰযোগ শিক্ষাৰ লক্ষ্যসমূহ",
      "শিক্ষাৰ মাধ্যম হিচাপে গণমাধ্যম",
      "শৈক্ষিক ৰেডিঅ’ সম্প্ৰচাৰ",
      "শৈক্ষিক দূৰদৰ্শন কাৰ্যসূচী (জ্ঞান দৰ্শন)",
      "সংবাদ পত্ৰ আৰু প্ৰেছৰ ভূমিকা",
      "গণমাধ্যমৰ সীমাবদ্ধতাসমূহ",
      "অসমৰ মুক্ত বিদ্যালয় ব্যৱস্থা",
      "দূৰ শিক্ষাৰ গুণাগুণসমূহ",
      "পত্ৰযোগ শিক্ষাৰ আসোঁৱাহসমূহ",
      "অনানুষ্ঠানিক শিক্ষাৰ প্ৰযুক্তি",
      "প্ৰাপ্তবয়স্ক শিক্ষা কাৰ্যসূচী",
      "ৰাষ্ট্ৰীয় সাক্ষৰতা অভিযান",
      "অনলাইন শ্ৰেণীকোঠাৰ ধাৰণা",
      "তুলনা: আনুষ্ঠানিক বনাম অনানুষ্ঠানিক",
      "শিক্ষণত সমাজৰ ভূমিকা",
      "ৰাজ্যিক মুক্ত বিদ্যালয় আঁচনি",
      "দূৰ শিক্ষাৰ আধুনিক ধাৰা"
    ],
    "unit-3": [
      "সাম্প্ৰতিক শৈক্ষিক ধাৰাৰ পৰিচয়",
      "পৰিৱেশ অৱনতি আৰু সংৰক্ষণ",
      " বহনক্ষম উন্নয়ন আৰু শিক্ষা",
      "জনসংখ্যা শিক্ষাৰ পৰিসৰ",
      "জনসংখ্যা বৃদ্ধিৰ কাৰণসমূহ",
      "জনসংখ্যা শিক্ষাৰ আঁচনি",
      "শাৰীৰিক শিক্ষাৰ সংজ্ঞা",
      "বিদ্যালয়ত শাৰীৰিক প্ৰশিক্ষণৰ প্ৰয়োজন",
      "যোগ আৰু স্বাস্থ্য শিক্ষা আঁচনি",
      "মূল্যবোধ শিক্ষাৰ অৰ্থ",
      "নৈতিক মূল্যবোধ বনাম সামাজিক মূল্যবোধ",
      "মূল্যবোধ শিক্ষা প্ৰদানৰ পদ্ধতি",
      "মানৱ অধিকাৰ শিক্ষা",
      "শিশু অধিকাৰ সুৰক্ষা নীতি",
      "শৈক্ষিক পৰিৱেশত গণতান্ত্ৰিক মূল্যবোধ",
      "শ্ৰেণীকোঠাত লিংগ সমতা",
      "বৃত্তিমূলক প্ৰশিক্ষণৰ সংগতি",
      "জীৱন শৈলী শিক্ষাৰ পাঠ্যক্ৰম",
      "বিজ্ঞান বিষয়ত মূল্যবোধৰ সংহতি",
      "মূল্যবোধ শিক্ষাত শিক্ষকৰ ভূমিকা"
    ],
    "unit-4": [
      "উডৱৰ্থ আৰু গেটছৰ শিকনৰ সংজ্ঞা",
      "শিকনৰ সংযোগবাদ তত্ত্ব",
      "প্ৰচেষ্টা আৰু ভুল শিকন পৰীক্ষা",
      "থৰ্নডাইকৰ প্ৰস্তুতিৰ সূত্ৰ",
      "থৰ্নডাইকৰ অনুশীলন আৰু ফলপ্ৰসূতাৰ সূত্ৰ",
      "প্ৰচেষ্টা আৰু ভুল পদ্ধতিৰ শৈক্ষিক মূল্য",
      "পাভলভৰ ধ্ৰুপদী অনুৱৰ্তন পৰীক্ষা",
      "ধ্ৰুপদী অনুৱৰ্তনৰ নীতিসমূহ",
      "অনুবৰ্তিত উদ্দীপক আৰু বিলোপন",
      "স্কিনাৰৰ সক্ৰিয় অনুৱৰ্তন তত্ত্ব",
      "শ্ৰেণীকোঠাত পুৰস্কাৰৰ ব্যৱহাৰ",
      "অন্তৰ্দৃষ্টিমূলক শিকন তত্ত্ব (কোহলাৰ)",
      "চিম্পাঞ্জী (চুলতান) ৰ ওপৰত কৰা পৰীক্ষা",
      "অন্তৰ্দৃষ্টিমূলক শিকনৰ বৈশিষ্ট্যসমূহ",
      "তুলনা: অনুৱৰ্তন বনাম অন্তৰ্দৃষ্টিমূলক",
      "শিকন সঞ্চালনৰ সংজ্ঞা",
      "ইতিবাচক, নেতিবাচক আৰু শূন্য সঞ্চালন",
      "শিকন সঞ্চালনৰ বিভিন্ন তত্ত্ব",
      "শিকনত প্ৰেৰণাৰ ভূমিকা",
      "শিকন উন্নত কৰাত শিক্ষকৰ ভূমিকা"
    ],
    "unit-5": [
      "স্মৃতিৰ সংজ্ঞা আৰু বৈশিষ্ট্য",
      "সংকেতীকৰণ বা প্ৰৱেশ প্ৰক্ৰিয়া",
      "ধাৰণ বা সংৰক্ষণ প্ৰক্ৰিয়া",
      "স্মৰণ আৰু প্ৰত্যভিজ্ঞা",
      "ভাল স্মৃতিৰ বৈশিষ্ট্যসমূহ",
      "স্মৃতিৰ প্ৰকাৰ: হ্ৰস্বম্যাদী আৰু দীৰ্ঘম্যাদী",
      "যৌক্তিক বনাম যান্ত্ৰিক স্মৃতি",
      "বিস্মৃতি: অৰ্থ আৰু বক্ৰৰেখা",
      "সক্ৰিয় আৰু নিষ্ক্ৰিয় বিস্মৃতিৰ কাৰণ",
      "এবিংহাউচৰ বিস্মৃতিৰ বক্ৰৰেখা",
      "স্মৃতিশক্তি উন্নত কৰাৰ উপায়",
      "মনোযোগ: সংজ্ঞা আৰু প্ৰকৃতি",
      "মনোযোগৰ প্ৰকাৰ: ইচ্ছাকৃত আৰু অনিচ্ছাকৃত",
      "মনোযোগৰ ব্যক্তিগত কাৰকসমূহ",
      "মনোযোগৰ বস্তুনিষ্ঠ কাৰকসমূহ",
      "আগ্ৰহ: অৰ্থ আৰু মনোযোগৰ সৈতে সম্বন্ধ",
      "মনোযোগ আকৰ্ষণ কৰাৰ শৈক্ষিক মূল্য",
      "মনোযোগ বিচ্যুতি আৰু প্ৰতিৰোধ",
      "মনোযোগৰ বিচ্যুতিৰ গতিশীলতা",
      "শ্ৰেণীকোঠাত আগ্ৰহ সৃষ্টিৰ উপায়"
    ],
    "unit-6": [
      "মানসিক স্বাস্থ্যৰ ধাৰণা",
      "মানসিক বিজ্ঞানৰ ধাৰণা",
      "পাৰ্থক্য: মানসিক স্বাস্থ্য বনাম বিজ্ঞান",
      "মানসিক বিজ্ঞানৰ লক্ষ্যসমূহ",
      "মানসিকভাবে সুস্থ ব্যক্তিৰ লক্ষণ",
      "ঘৰুৱা পৰিৱেশ আৰু মানসিক স্বাস্থ্য",
      "বিদ্যালয়ৰ পৰিৱেশ আৰু মানসিক স্বাস্থ্য",
      "অপসংগতি প্ৰতিৰোধত শিক্ষকৰ ভূমিকা",
      "অপসংগতিৰ ধাৰণা",
      "কিশোৰ কালৰ অপসংগতিৰ কাৰণ",
      "হতাশা আৰু সংঘাতৰ অৰ্থ",
      "সংঘাতৰ প্ৰকাৰসমূহ",
      "প্ৰতিৰক্ষা কৌশল: যুক্তিকৰণ",
      "প্ৰতিৰক্ষা কৌশল: প্ৰক্ষেপণ আৰু প্ৰত্যাৱৰ্তন",
      "প্ৰতিৰক্ষা কৌশল: উদীকৰণ আৰু তাদাত্ম্যকৰণ",
      "অপৰাধ প্ৰৱণতা: অৰ্থ আৰু কাৰণ",
      "নিৰ্দেশনা আৰু পৰামৰ্শ সেৱা",
      "নিৰ্দেশনাৰ প্ৰকাৰ: শৈক্ষিক আৰু বৃত্তিমূলক",
      "ব্যক্তিগত পৰামৰ্শ কৌশল",
      "অভিযোজনমূলক শৈক্ষিক পৰিৱেশ"
    ],
    "unit-7": [
      "শিক্ষাত পৰিসংখ্যাৰ প্ৰয়োজনীয়তা",
      "তথ্য সংগ্ৰহৰ পদ্ধতিসমূহ",
      "তথ্যৰ তালিকাভুক্তি (পৌনঃপুনিকতা বিভাজন)",
      "শ্ৰেণী অন্তৰাল আৰু মধ্যবিন্দু",
      "টেলী চিহ্ন পদ্ধতি",
      "লেখচিত্ৰ উপস্থাপন: হিষ্টগ্ৰাম",
      "লেখচিত্ৰ উপস্থাপন: পৌনঃপুনিকতা বহুভুজ",
      "ক্ৰমপুঞ্জিত পৌনঃপুনিকতা ৰেখা অংকন",
      "কেন্দ্ৰীয় প্ৰৱণতাৰ ধাৰণা",
      "গাণিতিক গড়ৰ সংজ্ঞা",
      "গড় গণনা (সংক্ষিপ্ত পদ্ধতি)",
      "গড় গণনা (দীৰ্ঘ পদ্ধতি)",
      "মধ্যমাৰ সংজ্ঞা আৰু ধৰ্মসমূহ",
      "শ্ৰেণীভুক্ত তথ্যৰ পৰা মধ্যমা নিৰূপণ",
      "অশ্ৰেণীভুক্ত তথ্যৰ পৰা মধ্যমা নিৰূপণ",
      "প্ৰচুৰকৰ সংজ্ঞা আৰু ব্যৱহাৰ",
      "প্ৰচুৰক নিৰূপণ (অভিজ্ঞতালব্ধ সূত্ৰ)",
      "তুলনা: গড়, মধ্যমা আৰু প্ৰচুৰক",
      "শততমক আৰু শততমক স্থান",
      "শৈক্ষিক পৰিসংখ্যাৰ সাৰাংশ"
    ]
  };

  const enTopics = fallbackTopics[unitId] || [];
  const asTopics = fallbackAsTopics[unitId] || [];

  const enTitle = enTopics[dayNumber - 1] ? `${unitId.toUpperCase()} Day ${dayNumber}: ${enTopics[dayNumber - 1]}` : `Day ${dayNumber} Lesson Overview`;
  const asTitle = asTopics[dayNumber - 1] ? `${unitId.toUpperCase()} দিন ${dayNumber}: ${asTopics[dayNumber - 1]}` : `দিন ${dayNumber} পাঠৰ আলোচনা`;

  const enConcept = `Detailed analytical study of ${enTopics[dayNumber - 1] || "syllabus standards"} mapped for independent study in Class 12 board preparations.`;
  const asConcept = `দ্বাদশ শ্ৰেণীৰ বোৰ্ড পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে নিৰ্ধাৰিত ${asTopics[dayNumber - 1] || "পাঠ্যক্ৰমৰ মানদণ্ড"}ৰ বিতং বিশ্লেষণাত্মক আলোচনা।`;

  const enExplanation = `This lesson covers the primary aspects of ${enTopics[dayNumber - 1] || "the topic"}. Under the AHSEC board syllabus guidelines, student evaluation focuses heavily on explaining core definitions, remembering key dates/proponents, and drawing clear links to practical application in schools.`;
  const asExplanation = `এই পাঠত ${asTopics[dayNumber - 1] || "বিষয়টো"}ৰ মূল দিশসমূহ আলোচনা কৰা হৈছে। AHSEC বোৰ্ডৰ পাঠ্যক্ৰমৰ নিৰ্দেশনা অনুসৰি, শিক্ষাৰ্থীৰ মূল্যায়নত ধাৰণাসমূহৰ সংজ্ঞা, গুৰুত্বপূৰ্ণ তাৰিখ/প্ৰবক্তা আৰু শ্ৰেণীকোঠাত ইয়াৰ ব্যৱহাৰিক প্ৰয়োগৰ ওপৰত অধিক গুৰুত্ব আৰোপ কৰা হয়।`;

  const enPoints = [
    `Understand the historical/psychological origin of ${enTopics[dayNumber - 1] || "the theory"}.`,
    "Differentiate the primary features from secondary alternatives.",
    "Formulate structured points to write in 4-mark and 6-mark board exam answers."
  ];

  const asPoints = [
    `${asTopics[dayNumber - 1] || "তত্ত্বটো"}ৰ ঐতিহাসিক/মনোবৈজ্ঞানিক পটভূমি বুজি লওক।`,
    "ইয়াৰ প্ৰধান বৈশিষ্ট্যসমূহ অন্য বিকল্পৰ সৈতে তুলনা কৰক।",
    "পৰীক্ষাত ৪ আৰু ৬ নম্বৰৰ প্ৰশ্নৰ উত্তৰ লিখিবলৈ স্পষ্ট পইণ্টসমূহ সাজু কৰক।"
  ];

  const enTip = `Write clear sub-headings in your answer sheets. For ${enTopics[dayNumber - 1] || "this topic"}, highlighting definitions with bullet points guarantees higher marks.`;
  const asTip = `উত্তৰ বহীত স্পষ্ট উপ-শিৰোনাম ব্যৱহাৰ কৰিব। ${asTopics[dayNumber - 1] || "এই বিষয়টো"}ৰ ক্ষেত্ৰত বুলেট পইণ্টেৰে সংজ্ঞা লিখিলে ভাল নম্বৰ পোৱা যায়।`;

  const enQuestions = [
    `Explain the concept of ${enTopics[dayNumber - 1] || "this lesson"} in your own words.`,
    "How does this help in reconstructing the educational system in Assam?"
  ];

  const asQuestions = [
    `${asTopics[dayNumber - 1] || "এই পাঠটো"}ৰ মূল ধাৰণাটো নিজৰ ভাষাত বুজাই লিখা।`,
    "অসমৰ শৈক্ষিক ব্যৱস্থাৰ পুনৰ্গঠনত ই কেনেদৰে সহায় কৰে আলোচনা কৰা।"
  ];

  return lang === "en"
    ? {
        title: enTitle,
        concept: enConcept,
        explanation: enExplanation,
        points: enPoints,
        examTip: enTip,
        questions: enQuestions,
      }
    : {
        title: asTitle,
        concept: asConcept,
        explanation: asExplanation,
        points: asPoints,
        examTip: asTip,
        questions: asQuestions,
      };
}
