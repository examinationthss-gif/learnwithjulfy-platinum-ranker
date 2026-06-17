const fs = require("fs");
const path = require("path");

// Explicit syllabus topics database copied from notesData.ts
const syllabusTopics = {
  "unit1": {
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
  "unit2": {
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
  "unit3": {
    1: {
      enTitle: "Environmental Education - Importance and Aims",
      asTitle: "পৰিৱেশ শিক্ষা - গুৰুত্ব আৰু লক্ষ্যসমূহ",
      enConcept: "Studying the role of environmental education in creating eco-conscious citizens and conservation efforts.",
      asConcept: "পৰিৱেশ সচেতন নাগৰিক আৰু সংৰক্ষণৰ প্ৰয়াস গঢ়ি তোলাত পৰিৱেশ শিক্ষাৰ ভূমিকা অধ্যয়ন কৰা।",
      enExplanation: "Environmental Education aims at developing a world population that is aware of and concerned about the environment and its associated problems. It seeks to provide knowledge, attitudes, motivation, commitment, and skills to work individually and collectively toward solutions of current problems.",
      asExplanation: "পৰিৱেশ শিক্ষাৰ লক্ষ্য হৈছে পৰিৱেশ আৰু ইয়াৰ সৈতে জড়িত সমস্যাসমূহৰ বিষয়ে সচেতন আৰু চিন্তিত বিশ্বৰ এক জনসমষ্টি গঢ়ি তোলা। ই জ্ঞান, মনোভাৱ, প্ৰেৰণা, প্ৰতিশ্ৰুতি আৰু দক্ষতা প্ৰদান কৰিবলৈ বিচাৰে যাতে বৰ্তমানৰ সমস্যাসমূহৰ সমাধানৰ বাবে কাম কৰিব পৰা যায়।",
      enPoints: [
        "Awareness: Gain sensitivity towards the environment and ecological challenges.",
        "Attitude: Build strong values and motivation to participate in conservation.",
        "Skills: Identify and solve local environmental issues programmatically."
      ],
      asPoints: [
        "সচেতনতা: পৰিৱেশ আৰু পৰিৱেশগত প্ৰত্যাহ্বানসমূহৰ প্ৰতি সংবেদনশীলতা লাভ কৰা।",
        "মনোভাৱ: সংৰক্ষণত অংশগ্ৰহণ কৰিবলৈ দৃঢ় মূল্যবোধ আৰু অনুপ্ৰেৰণা গঢ়ি তোলা।",
        "দক্ষতা: স্থানীয় পৰিৱেশৰ সমস্যাসমূহ দিগদৰ্শন কৰা।"
      ],
      enTip: "Remember the Tbilisi Declaration (1977) objectives: Awareness, Knowledge, Attitude, Skills, and Participation.",
      asTip: "তবিলিচি ঘোষণা (১৯৭৭) ৰ উদ্দেশ্যসমূহ মনত ৰাখিব: সচেতনতা, জ্ঞান, মনোভাৱ, দক্ষতা আৰু অংশগ্ৰহণ।",
      enQuestions: [
        "What is environmental education?",
        "List three major objectives of environmental education."
      ],
      asQuestions: [
        "পৰিৱেশ শিক্ষা কি?",
        "পৰিৱেশ শিক্ষাৰ তিনিটা প্ৰধান উদ্দেশ্য তালিকাভুক্ত কৰা।"
      ]
    }
  },
  "unit4": {
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
        "স্থায়ী পৰিৱৰ্তন: আচৰণৰ পৰিৱৰ্তন স্থায়ী হব লাগিব।",
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
  "unit5": {
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
  "unit6": {
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
  "unit7": {
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

const fallbackTopics = {
  "unit1": [
    "Secondary Education Commission Targets", "Language Formula Recommendations", "Teacher Training Standards Mudaliar", "Secondary School Guidance Bureaus", "NEP 1986 Key Features", "Navodaya Vidyalayas Purpose", "Operation Blackboard Targets", "Programme of Action (POA) 1992 Highlights", "Secondary Education Administration in Assam", "Guwahati High School Growth Patterns", "Vocationalization of Assam Schools", "Infrastructure Challenges in High Schools", "Assam Education Boards Administration", "SEBA Rules and Regulation History", "AHSEC High Yield Syllabus Planning", "Teacher Eligibility Tests (TET) Role", "Funding Schemes for Rural Schools", "Curriculum Reforms under NEP 2020 Overview", "Evaluation & Grading Reforms", "Secondary Level Student Dropout Factors"
  ],
  "unit2": [
    "Scope of Non-formal Education", "Open Universities in India", "Role of IGNOU", "Correspondence Education Aims", "Mass Media as Educational Agency", "Educational Radio Broadcasts", "Educational Television Programs (Gyan Darshan)", "Role of Press & Newspapers", "Limitations of Mass Media", "Open School System in Assam", "Distance Learning Merits", "Demerits of Correspondence Study", "Technological Aids in Non-formal Setup", "Adult Education Program Mappings", "National Literacy Mission Overview", "Online Classrooms & Virtual Mediums", "Comparison: Formal vs Non-formal", "Role of Community in Learning", "State Open Schooling Initiatives", "Modern Trends in Distance Education"
  ],
  "unit3": [
    "Introduction to Current Education Trends", "Environmental Degradation & Conservation", "Sustainable Development Goals in Education", "Population Education Concept & Scope", "Causes of Population Growth", "Population Education Aims & Policies", "Physical Education Definitions", "Need for Physical Training in Schools", "Yoga and Health Education Programs", "Value Education Meaning & Scope", "Moral Values vs Social Values", "Methods of Imparting Value Education", "Human Rights Education", "Child Rights Protection Policies", "Democratic Values in School Culture", "Gender Equality in Classrooms", "Vocational Training Alignment", "Life Skills Education Curriculum", "Integration of Values in Science Subjects", "Role of Teacher in Imparting Values"
  ],
  "unit4": [
    "Definition of Learning by Woodworth & Gates", "S-R Association Theory of Learning", "Trial and Error Learning Experiment", "Thorndike's Primary Law of Readiness", "Thorndike's Law of Exercise & Effect", "Educational Implications of Trial & Error", "Pavlov's Classical Conditioning Experiment", "Principles of Classical Conditioning", "Conditioned Stimulus and Extinction", "Skinner's Operant Conditioning Theory", "Reinforcement Schedules in Classrooms", "Insightful Learning Theory (Kohler)", "Experiment with Chimpanzee (Sultan)", "Characteristics of Insightful Learning", "Comparison: Conditioning vs Insightful", "Transfer of Learning Definition", "Positive, Negative, and Zero Transfer", "Theories of Transfer of Learning", "Role of Motivation in Learning", "Teacher's Role in Optimizing Learning"
  ],
  "unit5": [
    "Definition and Characteristics of Memory", "Registration (Encoding) Process", "Retention (Storage) Mechanisms", "Recall and Recognition (Reproduction)", "Good Memory Characteristics", "Types of Memory: Immediate & Permanent", "Logical vs Rote Memory", "Forgetting: Definition and Curve", "Active and Passive Forgetting Causes", "Ebbinghaus Curve of Forgetting", "Methods to Improve Memory Power", "Attention: Definition and Nature", "Types of Attention: Voluntary & Involuntary", "Subjective Factors of Attention", "Objective Factors of Attention", "Interest: Definition and Relation to Attention", "Educational Value of Drawing Attention", "Distraction: Types and Prevention", "Fluctuation of Attention Mechanisms", "Creating Interest in Classroom Subjects"
  ],
  "unit6": [
    "Concept of Mental Health", "Concept of Mental Hygiene", "Differences: Mental Health vs Hygiene", "Objectives of Mental Hygiene", "Characteristics of a Mentally Healthy Person", "Home Environment and Mental Health", "School Environment and Mental Health", "Role of Teacher in Preventing Maladjustment", "Concept of Maladjustment", "Causes of Maladjustment in Teens", "Frustration and Conflict Meanings", "Types of Conflict (Approach-Avoidance)", "Defense Mechanisms: Rationalization", "Defense Mechanisms: Projection & Regression", "Defense Mechanisms: Sublimation & Identification", "Delinquency: Meaning and Causes", "Guidance and Counseling Services", "Types of Guidance: Educational & Vocational", "Personal Counseling Strategies", "Creating Adaptive School Ecosystems"
  ],
  "unit7": [
    "Need for Statistics in Education", "Methods of Data Collection", "Tabulation of Data (Frequency Distribution)", "Class Intervals and Mid-points", "Tally Marks Method", "Graphical Representation: Histogram", "Graphical Representation: Frequency Polygon", "How to Draw Cumulative Frequency Curves", "Measures of Central Tendency Concept", "Arithmetic Mean Definition", "Calculation of Mean (Short Method)", "Calculation of Mean (Long Method)", "Median Definition & Mathematical Properties", "Calculation of Median from Grouped Data", "Calculation of Median from Ungrouped Data", "Mode Definition & Uses", "Calculation of Mode (Empirical Formula)", "Comparison: Mean, Median, and Mode", "Percentile & Percentile Ranks Overview", "Summary of Educational Statistics"
  ]
};

const fallbackAsTopics = {
  "unit1": [
    "মাধ্যমিক শিক্ষা আয়োগৰ লক্ষ্যসমূহ", "ভাষা নীতি সম্পৰ্কে চুপাৰিছসমূহ", "শিক্ষক প্ৰশিক্ষণৰ মানদণ্ড", "মাধ্যমিক বিদ্যালয়ৰ নিৰ্দেশনা ব্যৱস্থা", "ৰাষ্ট্ৰীয় শিক্ষানীতি ১৯৮৬ ৰ বৈশিষ্ট্যসমূহ", "নৱোদয় বিদ্যালয়ৰ লক্ষ্য", "অপাৰেচন ব্লেকবৰ্ড আঁচনি", "কাৰ্যসূচী ১৯৯২ ৰ মূল দিশসমূহ", "অসমৰ মাধ্যমিক শিক্ষাৰ প্ৰশাসন", "মাধ্যমিক বিদ্যালয়ৰ বিকাশৰ ধাৰা", "অসমৰ বিদ্যালয়ত বৃত্তিমুখীকৰণ", "উচ্চ মাধ্যমিক বিদ্যালয়ৰ প্ৰত্যাহ্বানসমূহ", "অসম শিক্ষা বোৰ্ডৰ নিয়মাৱলী", "SEBA ৰ ভূমিকা আৰু ইতিহাস", "AHSEC পাঠ্যক্ৰম পৰিকল্পনা", "টেট (TET) পৰীক্ষাৰ ভূমিকা", "গ্ৰাম্য বিদ্যালয়ৰ পুজি যোগান", "NEP ২০২০ ৰ মাধ্যমিক শিক্ষা নীতি", "মূল্যায়ন আৰু গ্ৰেডিং সংস্কাৰ", "মাধ্যমিক স্তৰত ছাত্ৰ ড্ৰপআউটৰ কাৰকসমূহ"
  ],
  "unit2": [
    "অনানুষ্ঠানিক শিক্ষাৰ পৰিসৰ", "ভাৰতৰ মুক্ত বিশ্ববিদ্যালয়সমূহ", "ইগনু (IGNOU) ৰ শৈক্ষিক অৱদান", "পত্ৰযোগ শিক্ষাৰ লক্ষ্যসমূহ", "শিক্ষাৰ মাধ্যম হিচাপে গণমাধ্যম", "শৈক্ষিক ৰেডিঅ’ সম্প্ৰচাৰ", "শৈক্ষিক দূৰদৰ্শন কাৰ্যসূচী (জ্ঞান দৰ্শন)", "সংবাদ পত্ৰ আৰু প্ৰেছৰ ভূমিকা", "গণমাধ্যমৰ সীমাবদ্ধতাসমূহ", "অসমৰ মুক্ত বিদ্যালয় ব্যৱস্থা", "দূৰ শিক্ষাৰ গুণাগুণসমূহ", "পত্ৰযোগ শিক্ষাৰ আসোঁৱাহসমূহ", "অনানুষ্ঠানিক শিক্ষাৰ প্ৰযুক্তি", "প্ৰাপ্তবয়স্ক শিক্ষা কাৰ্যসূচী", "ৰাষ্ট্ৰীয় সাক্ষৰতা অভিযান", "অনলাইন শ্ৰেণীকোঠাৰ ধাৰণা", "তুলনা: আনুষ্ঠানিক বনাম অনানুষ্ঠানিক", "শিক্ষণত সমাজৰ ভূমিকা", "ৰাজ্যিক মুক্ত বিদ্যালয় আঁচনি", "দূৰ শিক্ষাৰ আধুনিক ধাৰা"
  ],
  "unit3": [
    "সাম্প্ৰতিক শৈক্ষিক ধাৰাৰ পৰিচয়", "পৰিৱেশ অৱনতি আৰু সংৰক্ষণ", " বহনক্ষম উন্নয়ন আৰু শিক্ষা", "জনসংখ্যা শিক্ষাৰ পৰিসৰ", "জনসংখ্যা বৃদ্ধিৰ কাৰণসমূহ", "জনসংখ্যা শিক্ষাৰ আঁচনি", "শাৰীৰিক শিক্ষাৰ সংজ্ঞা", "বিদ্যালয়ত শাৰীৰিক প্ৰশিক্ষণৰ প্ৰয়োজন", "যোগ আৰু স্বাস্থ্য শিক্ষা আঁচনি", "মূলয়বোধ শিক্ষাৰ অৰ্থ", "নৈতিক মূল্যবোধ বনাম সামাজিক মূল্যবোধ", "মূল্যবোধ শিক্ষা প্ৰদানৰ পদ্ধতি", "মানৱ অধিকাৰ শিক্ষা", "শিশু অধিকাৰ সুৰক্ষা নীতি", "শৈক্ষিক পৰিৱেশত গণতান্ত্ৰিক মূল্যবোধ", "শ্ৰেণীকোঠাত লিংগ সমতা", "বৃত্তিমূলক প্ৰশিক্ষণৰ সংগতি", "জীৱন শৈলী শিক্ষাৰ পাঠ্যক্ৰম", "বিজ্ঞান বিষয়ত মূল্যবোধৰ সংহতি", "মূল্যবোধ শিক্ষাত শিক্ষকৰ ভূমিকা"
  ],
  "unit4": [
    "উডৱৰ্থ আৰু গেটছৰ শিকনৰ সংজ্ঞা", "শিকনৰ সংযোগবাদ তত্ত্ব", "প্ৰচেষ্টা আৰু ভুল শিকন পৰীক্ষা", "থৰ্নডাইকৰ প্ৰস্তুতিৰ সূত্ৰ", "থৰ্নডাইকৰ অনুশীলন আৰু ফলপ্ৰসূতাৰ সূত্ৰ", "প্ৰচেষ্টা আৰু ভুল পদ্ধতিৰ শৈক্ষিক মূল্য", "পাভলভৰ ধ্ৰুপদী অনুৱৰ্তন পৰীক্ষা", "ধ্ৰুপদী অনুৱৰ্তনৰ নীতিসমূহ", "অনুবৰ্তিত উদ্দীপক আৰু বিলোপন", "স্কিনাৰৰ সক্ৰিয় অনুৱৰ্তন তত্ত্ব", "শ্ৰেণীকোঠাত পুৰস্কাৰৰ ব্যৱহাৰ", "অন্তৰ্দৃষ্টিমূলক শিকন তত্ত্ব (কোহলাৰ)", "চিম্পাঞ্জী (চুলতান) ৰ ওপৰত কৰা পৰীক্ষা", "অন্তৰ্দৃষ্টিমূলক শিকনৰ বৈশিষ্ট্যসমূহ", "তুলনা: অনুৱৰ্তন বনাম অন্তৰ্দৃষ্টিমূলক", "শিকন সঞ্চালনৰ সংজ্ঞা", "ইতিবাচক, নেতিবাচক আৰু শূন্য সঞ্চালন", "শিকন সঞ্চালনৰ বিভিন্ন তত্ত্ব", "শিকনত প্ৰেৰণাৰ ভূমিকা", "শিকন উন্নত কৰাত শিক্ষকৰ ভূমিকা"
  ],
  "unit5": [
    "স্মৃতিৰ সংজ্ঞা আৰু বৈশিষ্ট্য", "সংকেতীকৰণ বা প্ৰৱেশ প্ৰক্ৰিয়া", "ধাৰণ বা সংৰক্ষণ প্ৰক্ৰিয়া", "স্মৰণ আৰু প্ৰত্যভিজ্ঞা", "ভাল স্মৃতিৰ বৈশিষ্ট্যসমূহ", "স্মৃতিৰ প্ৰকাৰ: হ্ৰস্বম্যাদী আৰু দীৰ্ঘম্যাদী", "যৌক্তিক বনাম যান্ত্ৰিক স্মৃতি", "বিস্মৃতি: অৰ্থ আৰু বক্ৰৰেখা", "সক্ৰিয় আৰু নিষ্ক্ৰিয় বিস্মৃতিৰ কাৰণ", "এবিংহাউচৰ বিস্মৃতিৰ বক্ৰৰেখা", "স্মৃতিশক্তি উন্নত কৰাৰ উপায়", "মনোযোগ: সংজ্ঞা আৰু প্ৰকৃতি", "মনোযোগৰ প্ৰকাৰ: ইচ্ছাকৃত আৰু অনিচ্ছাকৃত", "মনোযোগৰ ব্যক্তিগত কাৰকসমূহ", "মনোযোগৰ বস্তুনিষ্ঠ কাৰকসমূহ", "আগ্ৰহ: অৰ্থ আৰু মনোযোগৰ সৈতে সম্বন্ধ", "মনোযোগ আকৰ্ষণ কৰাৰ শৈক্ষিক মূল্য", "মনোযোগ বিচ্যুতি আৰু প্ৰতিৰোধ", "মনোযোগৰ বিচ্যুতিৰ গতিশীলতা", "শ্ৰেণীকোঠাত আগ্ৰহ সৃষ্টিৰ উপায়"
  ],
  "unit6": [
    "মানসিক স্বাস্থ্যৰ ধাৰণা", "মানসিক বিজ্ঞানৰ ধাৰণা", "পাৰ্থক্য: মানসিক স্বাস্থ্য বনাম বিজ্ঞান", "মানসিক বিজ্ঞানৰ লক্ষ্যসমূহ", "মানসিকভাবে সুস্থ ব্যক্তিৰ লক্ষণ", "ঘৰুৱা পৰিৱেশ আৰু মানসিক স্বাস্থ্য", "বিদ্যালয়ৰ পৰিৱেশ আৰু মানসিক স্বাস্থ্য", "অপসংগতি প্ৰতিৰোধত শিক্ষকৰ ভূমিকা", "অপসংগতিৰ ধাৰণা", "কিশোৰ কালৰ অপসংগতিৰ কাৰণ", "হতাশা আৰু সংঘাতৰ অৰ্থ", "সংঘাতৰ প্ৰকাৰসমূহ", "প্ৰতিৰক্ষা কৌশল: যুক্তিকৰণ", "প্ৰতিৰক্ষা কৌশল: প্ৰক্ষেপণ আৰু প্ৰত্যাৱৰ্তন", "প্ৰতিৰক্ষা কৌশল: উদীকৰণ আৰু তাদাত্ম্যকৰণ", "অপৰাধ প্ৰৱণতা: অৰ্থ আৰু কাৰণ", "নিৰ্দেশনা আৰু পৰামৰ্শ সেৱা", "নিৰ্দেশনাৰ প্ৰকাৰ: শৈক্ষিক আৰু বৃত্তিমূলক", "ব্যক্তিগত পৰামৰ্শ কৌশল", "অভিযোজনমূলক শৈক্ষিক পৰিৱেশ"
  ],
  "unit7": [
    "শিক্ষাত পৰিসংখ্যাৰ প্ৰয়োজনীয়তা", "তথ্য সংগ্ৰহৰ পদ্ধতিসমূহ", "তথ্যৰ তালিকাভুক্তি (পৌনঃপুনিকতা বিভাজন)", "শ্ৰেণী অন্তৰাল আৰু মধ্যবিন্দু", "টেলী চিহ্ন পদ্ধতি", "লেখচিত্ৰ উপস্থাপন: হিষ্টগ্ৰাম", "লেখচিত্ৰ উপস্থাপন: পৌনঃপুনিকতা বহুভুজ", "ক্ৰমপুঞ্জিত পৌনঃপুনিকতা ৰেখা অংকন", "কেন্দ্ৰীয় প্ৰৱণতাৰ ধাৰণা", "গাণিতিক গড়ৰ সংজ্ঞা", "গড় গণনা (সংক্ষিপ্ত পদ্ধতি)", "গড় গণনা (দীৰ্ঘ পদ্ধতি)", "মধ্যমাৰ সংজ্ঞা আৰু ধৰ্মসমূহ", "শ্ৰেণীভুক্ত তথ্যৰ পৰা মধ্যমা নিৰূপণ", "অশ্ৰেণীভুক্ত তথ্যৰ পৰা মধ্যমা নিৰূপণ", "প্ৰচুৰকৰ সংজ্ঞা আৰু ব্যৱহাৰ", "প্ৰচুৰক নিৰূপণ (অভিজ্ঞতালব্ধ সূত্ৰ)", "তুলনা: গড়, মধ্যমা আৰু প্ৰচুৰক", "শততমক আৰু শততমক স্থান", "শৈক্ষিক পৰিসংখ্যাৰ সাৰাংশ"
  ]
};

// Generate 5 board-aligned interactive MCQs for any given day
function generateDayMCQs(titleEn, titleAs) {
  return [
    {
      id: 1,
      qEn: `Which of the following best describes the main concept of ${titleEn}?`,
      qAs: `তলৰ কোনটোৱে ${titleAs} ৰ মূল ধাৰণাটো সঠিকভাৱে বৰ্ণনা কৰে?`,
      optsEn: [
        `A structured framework to study ${titleEn}`,
        `A temporary arrangement with no academic weight`,
        `An obsolete syllabus standard from previous decades`,
        `A method only useful for elementary school classes`
      ],
      optsAs: [
        `${titleAs} অধ্যয়ন কৰাৰ বাবে এক নিৰ্দিষ্ট গাঁথনি`,
        `কোনো শৈক্ষিক গুৰুত্ব নথকা এক অস্থায়ী ব্যৱস্থা`,
        `পূৰ্বৰ দশকৰ এক পুৰণি পাঠ্যক্ৰমৰ মানদণ্ড`,
        `কেৱল প্ৰাথমিক শ্ৰেণীৰ বাবে উপযোগী এক পদ্ধতি`
      ],
      correct: 0,
      expEn: `This topic details critical educational aspects of ${titleEn} designed for secondary level evaluations.`,
      expAs: `এই বিষয়টোৱে মাধ্যমিক স্তৰৰ শিক্ষাৰ বাবে নিৰ্ধাৰিত ${titleAs} ৰ গুৰুত্বপূৰ্ণ দিশসমূহ বৰ্ণনা কৰে।`
    },
    {
      id: 2,
      qEn: `What is the primary objective of analyzing ${titleEn} in the AHSEC Class 12 syllabus?`,
      qAs: `AHSEC দ্বাদশ শ্ৰেণীৰ পাঠ্যক্ৰমত ${titleAs} বিশ্লেষণ কৰাৰ মূল উদ্দেশ্য কি?`,
      optsEn: [
        `To ignore practical educational reforms`,
        `To enable students to apply ${titleEn} principles in board examinations`,
        `To focus solely on rote memorization without understanding`,
        `To substitute school infrastructure plans`
      ],
      optsAs: [
        `ব্যৱহাৰিক শিক্ষাগত সংস্কাৰক আওকাণ কৰা`,
        `শিক্ষাৰ্থীসকলক বোৰ্ড পৰীক্ষাত ${titleAs} ৰ নীতিসমূহ প্ৰয়োগ কৰিবলৈ সক্ষম কৰা`,
        `বুজি নোপোৱাকৈ কেৱল মুখস্থ বিদ্যাৰ ওপৰত গুৰুত্ব দিয়া`,
        `বিদ্যালয়ৰ আন্তঃগাঁথনি পৰিকল্পনাৰ বিকল্প নিৰূপণ কৰা`
      ],
      correct: 1,
      expEn: `Understanding ${titleEn} enables students to explain, relate, and implement key educational structures successfully.`,
      expAs: `${titleAs} বুজি পালে শিক্ষাৰ্থীসকলে এই শৈক্ষিক গাঁথনিসমূহ ব্যাখ্যা আৰু প্ৰয়োগ কৰিব পাৰিব।`
    },
    {
      id: 3,
      qEn: `When answering a board question about ${titleEn}, what is the recommended student strategy for scoring maximum marks?`,
      qAs: `${titleAs} সম্পৰ্কে বোৰ্ড পৰীক্ষাত উত্তৰ লিখাৰ বাবে আটাইতকৈ উপযুক্ত কৌশল কোনটো?`,
      optsEn: [
        `Rote memorize only the first paragraph`,
        `Structure definitions with points and use clear academic subheadings`,
        `Avoid mentioning historical or psychological contexts`,
        `Translate terms randomly mid-answer`
      ],
      optsAs: [
        `কেৱল প্ৰথম অনুচ্ছেদটো মুখস্থ কৰা`,
        `স্পষ্ট শৈক্ষিক উপ-শিৰোনাম আৰু পইণ্ট ব্যৱহাৰ কৰি সংজ্ঞা লিখা`,
        `ঐতিহাসিক বা মনোবৈজ্ঞানিক প্ৰসংগ উল্লেখ নকৰা`,
        `উত্তৰ লিখাৰ মাজতে যধে-মধে ভাষা সলনি কৰা`
      ],
      correct: 1,
      expEn: `Structuring points and highlighting key terminologies guarantees higher marks in AHSEC evaluations.`,
      expAs: `পইণ্ট আৰু সংজ্ঞা স্পষ্টকৈ লিখিলে বোৰ্ড পৰীক্ষাত সৰ্বাধিক নম্বৰ লাভ কৰাত সহায় হয়।`
    },
    {
      id: 4,
      qEn: `Which area of Class 12 Education curriculum is directly impacted by ${titleEn}?`,
      qAs: `দ্বাদশ শ্ৰেণীৰ শিক্ষা বিষয়ৰ কোনটো অংশ ${titleAs} ৰ দ্বাৰা প্ৰত্যক্ষভাৱে প্ৰভাৱিত হয়?`,
      optsEn: [
        `Syllabus development and student assessment systems`,
        `Physical education logistics only`,
        `Only non-formal institutions with no board recognition`,
        `Statistical calculations with zero board relevance`
      ],
      optsAs: [
        `পাঠ্যক্ৰমৰ বিকাশ আৰু ছাত্ৰ মূল্যায়ন ব্যৱস্থা`,
        `কেৱল শাৰীৰিক শিক্ষাৰ লজিষ্টিক`,
        `কেৱল বোৰ্ডৰ স্বীকৃতি নথকা অনানুষ্ঠানিক প্ৰতিষ্ঠানসমূহ`,
        `বোৰ্ডৰ কোনো গুৰুত্ব নথকা পৰিসংখ্যা গণনা`
      ],
      correct: 0,
      expEn: `${titleEn} forms a core component of the secondary education curriculum and syllabus mapping in Assam.`,
      expAs: `${titleAs} হ'ল অসমৰ মাধ্যমিক শিক্ষা পাঠ্যক্ৰমৰ এক অন্যতম গুৰুত্বপূৰ্ণ অংশ।`
    },
    {
      id: 5,
      qEn: `Why is a thorough review of ${titleEn} essential for high-ranking students?`,
      qAs: `উচ্চ স্থান লাভ কৰিব বিচৰা শিক্ষাৰ্থীসকলৰ বাবে ${titleAs} ৰ পৰ্যালোচনা কিয় প্ৰয়োজনীয়?`,
      optsEn: [
        `It has zero marks weightage`,
        `It is a high-yield topic frequently tested in 4-mark and 6-mark board questions`,
        `It has been fully omitted in recent board announcements`,
        `It is meant only for university postgraduate level research`
      ],
      optsAs: [
        `ইয়াৰ কোনো নম্বৰ নাই`,
        `বোৰ্ড পৰীক্ষাত প্ৰায়ে ৪ নম্বৰ আৰু ৬ নম্বৰৰ প্ৰশ্ন হিচাপে এই বিষয়টো আহে`,
        `শেহতীয়া বোৰ্ডৰ ঘোষণা অনুসৰি ইয়াক সম্পূৰ্ণৰূপে বাদ দিয়া হৈছে`,
        `ই কেৱল বিশ্ববিদ্যালয়ৰ স্নাতকোত্তৰ মহলাৰ গৱেষণাৰ বাবেহে উপযোগী`
      ],
      correct: 1,
      expEn: `High-yield topics like ${titleEn} are frequently tested in board exams as long-form questions.`,
      expAs: `${titleAs} ৰ দৰে গুৰুত্বপূৰ্ণ বিষয়সমূহ বোৰ্ড পৰীক্ষাত দীৰ্ঘম্যাদী প্ৰশ্ন হিচাপে প্ৰায়ে সোধা হয়।`
    }
  ];
}

function generate() {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
  }

  const searchRecords = [];

  for (let u = 1; u <= 7; u++) {
    const unitId = `unit${u}`;
    const unitDir = path.join(contentDir, unitId);
    if (!fs.existsSync(unitDir)) {
      fs.mkdirSync(unitDir);
    }

    const explicitUnitData = syllabusTopics[unitId] || {};
    const enTopicsList = fallbackTopics[unitId] || [];
    const asTopicsList = fallbackAsTopics[unitId] || [];

    for (let d = 1; d <= 20; d++) {
      const dayId = `day${d}`;
      let enData, asData;

      if (explicitUnitData[d]) {
        const expl = explicitUnitData[d];
        enData = {
          title: expl.enTitle,
          concept: expl.enConcept,
          explanation: expl.enExplanation,
          points: expl.enPoints,
          examTip: expl.enTip,
          questions: expl.enQuestions
        };
        asData = {
          title: expl.asTitle,
          concept: expl.asConcept,
          explanation: expl.asExplanation,
          points: expl.asPoints,
          examTip: expl.asTip,
          questions: expl.asQuestions
        };
      } else {
        // Fallback calculations
        const enTitle = enTopicsList[d - 1] ? `Unit ${u} Day ${d}: ${enTopicsList[d - 1]}` : `Day ${d} Lesson Overview`;
        const asTitle = asTopicsList[d - 1] ? `গোট ${u} দিন ${d}: ${asTopicsList[d - 1]}` : `দিন ${d} পাঠৰ আলোচনা`;

        const enConcept = `Detailed analytical study of ${enTopicsList[d - 1] || "syllabus standards"} mapped for independent study in Class 12 board preparations.`;
        const asConcept = `দ্বাদশ শ্ৰেণীৰ বোৰ্ড পৰীক্ষাৰ প্ৰস্তুতিৰ বাবে নিৰ্ধাৰিত ${asTopicsList[d - 1] || "পাঠ্যক্ৰমৰ মানদণ্ড"}ৰ বিতং বিশ্লেষণাত্মক আলোচনা।`;

        const enExplanation = `This lesson covers the primary aspects of ${enTopicsList[d - 1] || "the topic"}. Under the AHSEC board syllabus guidelines, student evaluation focuses heavily on explaining core definitions, remembering key dates/proponents, and drawing clear links to practical application in schools.`;
        const asExplanation = `এই পাঠত ${asTopicsList[d - 1] || "বিষয়টো"}ৰ মূল দিশসমূহ আলোচনা কৰা হৈছে। AHSEC বোৰ্ডৰ পাঠ্যক্ৰমৰ নিৰ্দেশনা অনুসৰি, শিক্ষাৰ্থীৰ মূল্যায়নত ধাৰণাসমূহৰ সংজ্ঞা, গুৰুত্বপূৰ্ণ তাৰিখ/প্ৰবক্তা আৰু শ্ৰেণীকোঠাত ইয়াৰ ব্যৱহাৰিক প্ৰয়োগৰ ওপৰত অধিক গুৰুত্ব আৰোপ কৰা হয়।`;

        const enPoints = [
          `Understand the historical/psychological origin of ${enTopicsList[d - 1] || "the theory"}.`,
          "Differentiate the primary features from secondary alternatives.",
          "Formulate structured points to write in 4-mark and 6-mark board exam answers."
        ];
        const asPoints = [
          `${asTopicsList[d - 1] || "তত্ত্বটো"}ৰ ঐতিহাসিক/মনোবৈজ্ঞানিক পটভূমি বুজি লওক।`,
          "ইয়াৰ প্ৰধান বৈশিষ্ট্যসমূহ অন্য বিকল্পৰ সৈতে তুলনা কৰক।",
          "পৰীক্ষাত ৪ আৰু ৬ নম্বৰৰ প্ৰশ্নৰ উত্তৰ লিখিবলৈ স্পষ্ট পইণ্টসমূহ সাজু কৰক।"
        ];

        const enTip = `Write clear sub-headings in your answer sheets. For ${enTopicsList[d - 1] || "this topic"}, highlighting definitions with bullet points guarantees higher marks.`;
        const asTip = `উত্তৰ বহীত স্পষ্ট উপ-শিৰোনাম ব্যৱহাৰ কৰিব। ${asTopicsList[d - 1] || "এই বিষয়টো"}ৰ ক্ষেত্ৰত বুলেট পইণ্টেৰে সংজ্ঞা লিখিলে ভাল নম্বৰ পোৱা যায়।`;

        const enQuestions = [
          `Explain the concept of ${enTopicsList[d - 1] || "this lesson"} in your own words.`,
          "How does this help in reconstructing the educational system in Assam?"
        ];
        const asQuestions = [
          `${asTopicsList[d - 1] || "এই পাঠটো"}ৰ মূল ধাৰণাটো নিজৰ ভাষাত বুজাই লিখা।`,
          "অসমৰ শৈক্ষিক ব্যৱস্থাৰ পুনৰ্গঠনত ই কেনেদৰে সহায় কৰে আলোচনা কৰা।"
        ];

        enData = {
          title: enTitle,
          concept: enConcept,
          explanation: enExplanation,
          points: enPoints,
          examTip: enTip,
          questions: enQuestions
        };
        asData = {
          title: asTitle,
          concept: asConcept,
          explanation: asExplanation,
          points: asPoints,
          examTip: asTip,
          questions: asQuestions
        };
      }

      // Add Julfy Signature Features: Board Focus, Memory Engine, Rapid Revision
      enData.boardFocus = `This topic is highly relevant for AHSEC Class 12 board examinations. It frequently appears as a 4-mark explain-type or 6-mark analysis-type question. Students should prioritize understanding definitions and recommendations.`;
      asData.boardFocus = `এই বিষয়টো AHSEC দ্বাদশ শ্ৰেণীৰ বোৰ্ড পৰীক্ষাৰ বাবে অত্যন্ত গুৰুত্বপূৰ্ণ। প্ৰায়েই ই ৪ নম্বৰীয়া ব্যাখ্যাধৰ্মী বা ৬ নম্বৰীয়া বিশ্লেষণাত্মক প্ৰশ্ন হিচাপে আহে। শিক্ষাৰ্থীসকলে ইয়াৰ সংজ্ঞা আৰু চুপাৰিছসমূহ শিকা উচিত।`;

      enData.memoryEngine = `Mnemonic: Focus on the key term - "${enData.title}". Break it down into points: Core Purpose, Key Recommendations, and Structural Impact. Repeat this structure to retain detail.`;
      asData.memoryEngine = `মনত ৰখাৰ উপায়: মূল শব্দটোত গুৰুত্ব দিয়ক - "${asData.title}"। ইয়াক তিনিটা ভাগত মনত ৰাখক: মূল উদ্দেশ্য, গুৰুত্বপূৰ্ণ চুপাৰিছ আৰু গাঁথনিগত প্ৰভাৱ।`;

      enData.rapidRevision = `1. Core definition and context of ${enData.title}.\n2. Key recommendations and structural changes.\n3. Implementation challenges and exam advice.`;
      asData.rapidRevision = `১. ${asData.title} ৰ মূল সংজ্ঞা আৰু প্ৰসংগ।\n২. ইয়াৰ প্ৰধান চুপাৰিছ আৰু গাঁথনিগত পৰিৱৰ্তন।\n৩. প্ৰয়োগৰ প্ৰত্যাহ্বান আৰু পৰীক্ষাৰ পৰামৰ্শ।`;

      // Pack content as required by v3.0 schema: content field holds full text including bullets
      const enContentString = `${enData.explanation}\n\nKey Points:\n${enData.points.map(p => `• ${p}`).join("\n")}\n\nExam Tip:\n${enData.examTip}\n\nTypical Questions:\n${enData.questions.map(q => `- ${q}`).join("\n")}`;
      const asContentString = `${asData.explanation}\n\nমূল পইণ্টসমূহ:\n${asData.points.map(p => `• ${p}`).join("\n")}\n\nপৰীক্ষাৰ টিপছ:\n${asData.examTip}\n\nআৰ্হি প্ৰশ্ন:\n${asData.questions.map(q => `- ${q}`).join("\n")}`;

      // Generate 5 MCQs per day
      const mcqs = generateDayMCQs(enData.title, asData.title);

      const dayContent = {
        english: {
          title: enData.title,
          content: enContentString,
          boardFocus: enData.boardFocus,
          memoryEngine: enData.memoryEngine,
          rapidRevision: enData.rapidRevision
        },
        assamese: {
          title: asData.title,
          content: asContentString,
          boardFocus: asData.boardFocus,
          memoryEngine: asData.memoryEngine,
          rapidRevision: asData.rapidRevision
        },
        mcqs: mcqs.map(q => ({
          id: q.id,
          question: q.qEn,
          options: q.optsEn,
          correct: q.correct,
          explanation: q.expEn
        })),
        asMcqs: mcqs.map(q => ({
          id: q.id,
          question: q.qAs,
          options: q.optsAs,
          correct: q.correct,
          explanation: q.expAs
        }))
      };

      const dayFile = path.join(unitDir, `${dayId}.json`);
      fs.writeFileSync(dayFile, JSON.stringify(dayContent, null, 2), "utf8");

      // Add search indexing records
      const catMap = {
        "unit1": { en: "Secondary Education", as: "মাধ্যমিক শিক্ষা" },
        "unit2": { en: "Non-Formal Education", as: "অনানুষ্ঠানিক শিক্ষা" },
        "unit3": { en: "Current Trends", as: "সাম্প্ৰতিক ধাৰা" },
        "unit4": { en: "Learning Theory", as: "শিকন তত্ত্ব" },
        "unit5": { en: "Memory & Attention", as: "স্মৃতি আৰু মনোযোগ" },
        "unit6": { en: "Mental Health", as: "মানসিক স্বাস্থ্য" },
        "unit7": { en: "Statistics", as: "পৰিসংখ্যা" }
      };
      const cat = catMap[unitId] || { en: "Education", as: "শিক্ষা" };

      const keywordsEn = `${unitId} ${dayId} ${enData.title} ${enData.concept}`;
      const keywordsAs = `${unitId} ${dayId} ${asData.title} ${asData.concept}`;
      searchRecords.push({
        unitId,
        dayId,
        enTitle: enData.title,
        asTitle: asData.title,
        enConcept: enData.concept,
        asConcept: asData.concept,
        keywordsEn,
        keywordsAs,
        categoryEn: cat.en,
        categoryAs: cat.as
      });
    }
  }

  // Delete obsolete content folders if any (with hyphens)
  try {
    for (let u = 1; u <= 7; u++) {
      const obsoleteDir = path.join(contentDir, `unit-${u}`);
      if (fs.existsSync(obsoleteDir)) {
        fs.rmSync(obsoleteDir, { recursive: true, force: true });
      }
    }
  } catch (e) {
    // ignore
  }

  // Write Fuse.js search index
  const dataDir = path.join(process.cwd(), "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(dataDir, "searchIndex.json"),
    JSON.stringify(searchRecords, null, 2),
    "utf8"
  );

  console.log("Successfully generated 140 JSON content files (v3.0 schema) and searchIndex.json!");
}

generate();
