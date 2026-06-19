"use client";

import { useState } from "react";
import { Search, Check, X, HelpCircle, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MCQ {
  id: number;
  unitId: string;
  enUnitNumber: string;
  asUnitNumber: string;
  dayNumber: number;
  enQuestion: string;
  asQuestion: string;
  enOptions: string[];
  asOptions: string[];
  correctIndex: number;
  enExplanation: string;
  asExplanation: string;
}

const mcqData: MCQ[] = [
  {
    "id": 1,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "In which year was the Secondary Education Commission appointed?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগ কোন বছৰত নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "1948",
      "1952",
      "1964",
      "1986"
    ],
    "asOptions": [
      "১৯৪৮",
      "১৯৫২",
      "১৯৬৪",
      "১৯৮৬"
    ],
    "correctIndex": 1,
    "enExplanation": "The Secondary Education Commission was appointed by the Government of India in 1952.",
    "asExplanation": "ভাৰত চৰকাৰে ১৯৫২ চনত মাধ্যমিক শিক্ষা আয়োগ নিযুক্ত কৰিছিল।"
  },
  {
    "id": 2,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Who was the Chairman of the Secondary Education Commission?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগৰ সভাপতি কোন আছিল?",
    "enOptions": [
      "D. S. Kothari",
      "A. Lakshmanaswami Mudaliar",
      "J. P. Naik",
      "Zakir Hussain"
    ],
    "asOptions": [
      "ডি. এছ. কোঠাৰী",
      "এ. লক্ষ্ণিস্বামী মুডালিয়াৰ",
      "কে. পি. নায়ক",
      "জাকিৰ হুছেইন"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was chaired by Dr. A. Lakshmanaswami Mudaliar.",
    "asExplanation": "ড° এ. লক্ষ্ণিস্বামী মুডালিয়াৰ এই আয়াগৰ সভাপতি আছিল।"
  },
  {
    "id": 3,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Why was the Secondary Education Commission appointed?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগ কি নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "To reform higher education",
      "To examine and improve secondary education",
      "To establish universities",
      "To regulate primary schools"
    ],
    "asOptions": [
      "উচ্চ শিক্ষাৰ সংস্কাৰৰ বাযব",
      "মাধ্যমিক শিক্ষা পৰ্যালোচনা আৰু উন্ন নৰ বাযব",
      "বিশ্ববিদযালস্থ াপনৰ বাযব",
      "প্ৰাথমিক বিদযাল মন ন্ত্ৰ ণৰ বাযব"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was formed to study the problems of secondary education and suggest reforms.",
    "asExplanation": "মাধ্যমিক শিক্ষাৰ সসিযা অধ্য ন কমৰ উন্ন নৰ পৰামিয দিবলল এই আয়াগ গঠন কৰা হৈছিল।"
  },
  {
    "id": 4,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which educational level was directly studied by the Mudaliar Commission?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ প্ৰ তযক্ষভাযে কোন শিক্ষাস্তৰ অধ্য ন কৰিছিল?",
    "enOptions": [
      "Primary Education",
      "Secondary Education",
      "University Education",
      "Adult Education"
    ],
    "asOptions": [
      "প্ৰাথমিক শিক্ষা",
      "মাধ্যমিক শিক্ষা",
      "বিশ্ববিদ্যালয় শিক্ষা",
      "প্ৰাপ্তব স্ক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission specifically examined the structure, curriculum and problems of secondary education.",
    "asExplanation": "আয়াযগ মাধ্যমিক শিক্ষাৰ গঠন, পাঠযক্ৰম আৰু সসিযাসমূৈ অধ্য ন কৰিছিল।"
  },
  {
    "id": 5,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which defect of secondary education was strongly criticized by the Mudaliar Commission?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ মাধ্যমিক শিক্ষাৰ কোন ত্ৰু টিয়াক তীব্ৰভাযে সমাযলাচনায়কৰিছিল?",
    "enOptions": [
      "Excessive practical work",
      "Bookish and examination-oriented education",
      "Excessive sports activities",
      "Lack of libraries"
    ],
    "asOptions": [
      "অত্যাধিক বযেৈাৰিক কাম",
      "পুথিগত আৰু পৰীক্ষামুখী শিক্ষা",
      "অত্যাধিক ক্ৰ ীডা কাযযসূচী",
      "পুথিভঁৰালৰ অভাৱ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission believed that education had become too book-centered and examination-driven.",
    "asExplanation": "আয়াগৰ যিত শিক্ষা অত্যাধিক পুথিগত আৰু পৰীক্ষামুখী হৈ পৰিছিল।"
  },
  {
    "id": 6,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "According to the Mudaliar Commission, the curriculum of secondary education failed mainly because it—",
    "asQuestion": "মুডালিয়াৰ আয়োগৰ যিত মাধ্যমিক শিক্ষাৰ পাঠযক্ৰমৰ মুখয ত্ৰু টি কি আছিল?",
    "enOptions": [
      "Was too vocational",
      "Ignored individual differences and practical needs",
      "Focused excessively on arts",
      "Included too many co-curricular activities"
    ],
    "asOptions": [
      "অত্যাধিক ক বৃত্তিমূলক আছিল",
      "বযকি্তগত পার্থক্য আৰু বযেৈাৰিক প্ৰ য়ােন উপেক্ষা কৰিছিল",
      "কলা বিষ ত অত্যাধিক গু ৰুত্ব দিছিল",
      "সৈ-পাঠযক্ৰম কাযযসূচী কবছি আছিল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission felt that the curriculum did not adequately address students' varied interests, abilities and\npractical life needs.",
    "asExplanation": "আয়াগৰ যিত পাঠযক্ৰযম শিক্ষাৰ্থীৰ ভিন্ন আগ্ৰহ, সাৰি্থ্য আৰু জীৱনমুখী প্ৰ য়ােনসমূৈ যযথষ্ট গু ৰুত্ব মদা নাছিল।"
  },
  {
    "id": 7,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "A school evaluates students only through annual written examinations. According to the Mudaliar\nCommission, what is the major drawback of this practice?",
    "asQuestion": "এখন বিদ্যালয়ে কেৱল িাবষিে লিখিত পৰীক্ষাৰ জবৰ়েযত শিক্ষাৰ্থীৰ মূলযা়েন েৰা হ়ে। মুদ্াবল়োৰ আয়োগৰ যিত ই়োৰ মুখয অসুবিধা বে?",
    "enOptions": [
      "It increases vocational efficiency",
      "It ignores all-round development",
      "It promotes co-curricular activities",
      "It improves guidance services"
    ],
    "asOptions": [
      "ই িৃবিমূলে দক্ষ তা িৃবি কৰে",
      "ই শিক্ষাৰ্থীৰ সিিাঙ্গীন বিকাশ উপেক্ষা কৰে",
      "ই সহ-পাঠ্যক্ৰম কাৰ্যসূচী উন্নত কৰে",
      "ই বনযদ্িিনা সেৱা উন্নত কৰে"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission criticized examination-centered education because it neglected students' overall\ndevelopment and practical abilities.",
    "asExplanation": "আয়োগে পৰীক্ষাকেন্দ্ৰিক শিক্ষাৰ সমাযলাচনা েবৰবিল, োৰণ ই়োত শিক্ষাৰ্থীৰ সিিাঙ্গীন বিকাশ আৰু ব্যৱহাৰিক দক্ষ তা উযপবক্ষত হৈছিল।"
  },
  {
    "id": 8,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "A student scores high marks but lacks practical skills required in daily life. Which defect of secondary\neducation does this situation represent?",
    "asQuestion": "এজন শিক্ষাৰ্থীয়ে উচ্চ ন্িবৰ লাভ কৰে, বেন্তু দৈনন্দিন জীৱনৰ িাযি প্ৰ য়োজনী়ে ব্যৱহাৰিক দক্ষ তা নাই। এই অৱস্থাই মাধযবমে শিক্ষাৰ কোন ত্ৰু টি প্ৰ োি কৰে?",
    "enOptions": [
      "Lack of libraries",
      "Overcrowded classrooms",
      "Absence of life-centered education",
      "Lack of sports facilities"
    ],
    "asOptions": [
      "পুবৰ্থভঁৰালৰ অভাৱ",
      "অবতমাত্ৰা বভৰৰ্ুক্ত কেণীযোঠ্া",
      "জীৱনমুখী শিক্ষাৰ অভাৱ",
      "ক্ৰ ীডা সুবিধাৰ অভাৱ"
    ],
    "correctIndex": 2,
    "enExplanation": "One major criticism was that secondary education was disconnected from practical life and real-world\nneeds.",
    "asExplanation": "মাধযবমে শিক্ষা িাস্তৱ জীৱন আৰু ব্যৱহাৰিক প্ৰ য়োজনৰ হসযত ৰ্ যৰ্থষ্ট সংৰ্ুক্ত নাবিল িুবল সমাযলাচনা েৰা হৈছিল।"
  },
  {
    "id": 9,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Which aim of secondary education focuses on developing responsible citizens in a democracy?",
    "asQuestion": "মাধযবমে শিক্ষাৰ কোন লক্ষযই গণতাবিে সমাজৰ দ্ াব়েত্বিীল নাগবৰে গব়ি কতালাৰ ওপৰত গু ৰুত্ব বদ্য়ে?",
    "enOptions": [
      "Vocational efficiency",
      "Democratic citizenship",
      "Physical fitness",
      "Cultural entertainment"
    ],
    "asOptions": [
      "িৃবিমূলে দক্ষ তা",
      "গণতাবিে নাগবৰেত্ব",
      "িাৰীবৰে সক্ষতিা",
      "সাংস্কৃ বতে বিযনাদ্ন"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized democratic citizenship as a major aim of secondary education.",
    "asExplanation": "মুদ্াবল়োৰ আয়োগে গণতাবিে নাগবৰেত্বে মাধযবমে শিক্ষাৰ এে মুখয লক্ষয বহচাযপ গণয েবৰবিল।"
  },
  {
    "id": 10,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Character formation as an aim of secondary education primarily seeks to develop—",
    "asQuestion": "মাধযবমে শিক্ষাৰ লক্ষয বহচাযপ চবৰত্ৰ গঠ্নৰ মূল উযেিয বে?",
    "enOptions": [
      "Examination skills only",
      "Moral and ethical qualities",
      "Business management abilities",
      "Technical specialization"
    ],
    "asOptions": [
      "কেৱল পৰীক্ষামূলে দক্ষ তা",
      "হনবতে আৰু চাবিবত্ৰে গু ণ",
      "িযৱসা়ে পবৰচালনা দক্ষ তা",
      "োবৰেৰী বিযিষজ্ঞতা"
    ],
    "correctIndex": 1,
    "enExplanation": "Character formation promotes honesty, responsibility, discipline and ethical conduct.",
    "asExplanation": "চবৰত্ৰ গঠ্যন সততা, দ্ াব়েত্বযিাধ, িৃংখলা আৰু হনবতে আচৰণ বিকাশ কৰে।"
  },
  {
    "id": 11,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "A secondary school introduces skill-based courses in agriculture, commerce and technology to prepare\nstudents for employment. Which aim of secondary education is being fulfilled?",
    "asQuestion": "এখন মাধ্ যমিক বিদযালয মিক্ষ াথীক কযিসংস্থ াপনৰ বাযব কৃষি, বাণিেয আৰু প্ৰ যুকি্ত ভিমিক দক্ষতা পাঠযক্ৰম আৰ্িভ কৰা হৈছে। ই াত মাধ্যমিক শিক্ষাৰ কোন লক্ষয পূৰণ হৈছে?",
    "enOptions": [
      "Democratic citizenship",
      "Vocational efficiency",
      "Cultural recreation",
      "Physical development"
    ],
    "asOptions": [
      "গণতানি্ত্ৰক নাগৰিকত্ব",
      "বৃত্তিমূলক দক্ষ তা",
      "সাংস্কৃ তিক যিনাৰঞ্জ ন",
      "িাৰীৰিক বিকাশ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized vocational efficiency to prepare students for productive work and\nself-reliance.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ মিক্ষ াথীক উৎপাদনিীল কযি আৰু আত্ম নিভযৰিীলতাৰ বাযব প্ৰস্তু ত কৰিবলৈ বৃত্তিমূলক দক্ষ তাৰ ওপৰত গু ৰুত্ব দিছিল।"
  },
  {
    "id": 12,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "A school regularly organizes student councils and leadership camps. Which aim of secondary education is\nmainly promoted?",
    "asQuestion": "এখন বিদযালয মন মিতভাযে ছাত্র সংসদ আৰু নেতৃত্ব মিবিৰ আয়ােন কৰা ৈ । ই াৰ দ্ব াৰা মাধ্ যমিক মিক্ষ াৰ কোন লক্ষয অধি্ক বিকমিত ৈ?",
    "enOptions": [
      "Leadership qualities",
      "Examination success",
      "Memorization skills",
      "University admission"
    ],
    "asOptions": [
      "নেতৃত্ব ৰ গু ণ",
      "পৰীক্ষাত সফলতা",
      "মুখস্থ কৰাৰ দক্ষতা",
      "বিশ্ববিদ্যালয় ত ভতিয"
    ],
    "correctIndex": 0,
    "enExplanation": "Leadership activities help students develop initiative, responsibility and cooperation.",
    "asExplanation": "নেতৃত্ব মূলক কাযযসূচীয মিক্ষ াথীৰ উযদযাগ, দাম ত্ব যবাধ্ আৰু সৈযযাগিতাৰ গু ণ বিকাশ কযৰ।"
  },
  {
    "id": 13,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "Assertion (A):\nSecondary education should develop democratic citizenship.\nReason (R):\nCitizens must understand rights, duties and social responsibilities.",
    "asQuestion": "উকি্ত ( A): মাধ্যমিক শিক্ষাই গণতানি্ত্ৰক নাগৰিকত্ব গ়িি তুলিব লাযগ। কাৰণ (R): নাগৰিযক নিেৰ অধি্কাৰ, কতযবয আৰু সামামেক দাম ত্ব বুমেব লাযগ।",
    "enOptions": [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Democratic citizenship requires awareness of rights, duties and responsibilities; therefore the reason\ncorrectly explains the assertion.",
    "asExplanation": "গণতানি্ত্ৰক নাগৰিকত্ব গ়িি তুলিবলল অধি্কাৰ, কতযবয আৰু দাম ত্ব ৰ জ্ঞান প্ৰ য়ােন। কসয যৈ R এ A-ৰ সঠিক ব্যাখ্যা কযৰ।"
  },
  {
    "id": 14,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "Why did the Mudaliar Commission recommend a diversified curriculum?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ হবচিত্রম পাঠযক্ৰমৰ পৰামিয কি দিছিল?",
    "enOptions": [
      "To reduce school enrolment",
      "To meet diverse interests and abilities of students",
      "To eliminate practical subjects",
      "To make education purely academic"
    ],
    "asOptions": [
      "বিদযাল ত নাভিতিযৰ সংখযা হ্ৰাস কৰিবলৈ",
      "শিক্ষাৰ্থীৰ বিভিন্ন আগ্ৰহ আৰু সাৰি্থ্য পূৰণ কৰিবলৈ",
      "বযেৈাৰিক বিষ সমূৈ বিযলাপ কৰিবলৈ",
      "শিক্ষাক ককেল একাযিমিক কৰিবলৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "Students differ in interests, talents and career aspirations; therefore diversified curricula provide suitable\neducational opportunities.",
    "asExplanation": "শিক্ষাৰ্থীৰ আগ্ৰহ, প্ৰ তিভা আৰু ভমেষযৎ লক্ষয কবযলগ কবযলগ ৈ । কসয যৈ হবচিত্রম পাঠযক্ৰমৰ প্ৰ য়ােন।"
  },
  {
    "id": 15,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "How does a multipurpose school differ from a traditional academic school?",
    "asQuestion": "এখন বহু মুখী বিদযাল এখন পৰ্িপ ৰাগত একাযিমিক বিদযাল ৰ পৰা ককযনলক পৃথক?",
    "enOptions": [
      "It offers only science subjects",
      "It provides a variety of academic, technical and vocational courses",
      "It focuses only on examinations",
      "It excludes co-curricular activities"
    ],
    "asOptions": [
      "ককেল বিজ্ঞান বিষপ্ৰ দান কযৰ",
      "একাযিমিক, কাৰিকৰী আৰু বৃত্তিমূলক বিভিন্ন পাঠযক্ৰ ম প্ৰ দান কযৰ",
      "ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব দিয",
      "সৈ-পাঠযক্ৰম কাযযসূচী বাদ দিয"
    ],
    "correctIndex": 1,
    "enExplanation": "Multipurpose schools were recommended to provide diverse educational opportunities according to students'\nneeds and abilities.",
    "asExplanation": "শিক্ষাৰ্থীৰ প্ৰ য়ােন আৰু সামৰ্থ্য অনুসমৰ বিভিন্ন শিক্ষামূলক সুযযাগ প্ৰ দানৰ বাযব বহুমুখী বিদযাল ৰ পৰামিয মদা হৈছিল।"
  },
  {
    "id": 16,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "A student is confused about selecting a suitable career after secondary education. Which recommendation of\nthe Mudaliar Commission would best help the student?",
    "asQuestion": "এেন শিক্ষাৰ্থী মাধ্যমিক শিক্ষা কিষ কৰাৰ পিছত উপযুক্ত কপছা বাছমন কৰিবলৈ বিভ্ৰান্ত হৈছে। মুডালিয়াৰ আয়াগৰ কোন পৰামিযই কতওঁক সবযাধি্ক সৈা কৰিব?",
    "enOptions": [
      "Examination reform",
      "Guidance and counselling service",
      "Multipurpose school",
      "Physical education programme"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "নিযদযিনা আৰু পৰামিযদান কসো",
      "বহুমুখী বিদযাল",
      "িাৰীৰিক শিক্ষা কাযযসূচী"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission recommended guidance and counselling services to help students understand their abilities,\ninterests and career opportunities.",
    "asExplanation": "আয়াযগ শিক্ষার্থীক নিেৰ সাৰি্থ্য, আগ্ৰহ আৰু কপছাগত সুযযাগ বুমেবলল নিযদযিনা আৰু পৰামিযদান কসোৰ পৰামিয দিছিল।"
  },
  {
    "id": 17,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "A school encourages debates, sports, cultural programmes and social service activities. Which\nrecommendation of the Mudaliar Commission is reflected here?",
    "asQuestion": "এখন বিদযালয বিতকয, ক্ৰ ীডা, সাংস্কৃ তিক অনুষ্ঠ ান আৰু সমােযসোমূলক কাযযসূচী উৎসামৈত কৰা ৈ । ই াত মুডালিয়াৰ আয়োগৰ কোন পৰামিয প্ৰ তিফমলত হৈছে?",
    "enOptions": [
      "Vocational education only",
      "Co-curricular activities",
      "University education",
      "Examination-centered education"
    ],
    "asOptions": [
      "ককেল বৃত্তিমূলক মিক্ষ া",
      "সৈ-পাঠযক্ৰম কাযযসূচী",
      "বিশ্ববিদ্যালয় শিক্ষা",
      "পৰীক্ষামুখী শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission emphasized co-curricular activities for the all-round development of students.",
    "asExplanation": "আয়াযগ শিক্ষাৰ্থীৰ সবযাঙ্গীন বিকাশৰ বাযব সৈ -পাঠযক্ৰম কাযযসূচীৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 18,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "Why did the Mudaliar Commission recommend reforms in the examination system?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ পৰীক্ষা বযেস্থাত সংস্কাৰৰ পৰামিয কি দিছিল?",
    "enOptions": [
      "To increase the number of examinations",
      "To make education more book-centered",
      "To reduce the excessive influence of examinations on learning",
      "To abolish all written tests"
    ],
    "asOptions": [
      "পৰীক্ষ াৰ সংখযা বৃত্তি কৰিবলৈ",
      "শিক্ষাক অধি্ক পুথিগত কৰিবলৈ",
      "শিক্ষাৰ ওপৰত পৰীক্ষাৰ অত্যাধিক প্ৰ ভাে হ্ৰাস কৰিবলৈ",
      "সকযলা লিখিত পৰীক্ষা বিযলাপ কৰিবলৈ"
    ],
    "correctIndex": 2,
    "enExplanation": "The Commission believed that education had become overly examination-oriented and reforms were\nnecessary to improve learning.",
    "asExplanation": "আয়াগৰ যিত শিক্ষা অত্যাধিক পৰীক্ষামুখী হৈ পৰিছিল আৰু মিকন -প্ৰ কি্ৰা উন্নত কৰিবলৈ সংস্কাৰ প্ৰ য়ােন আছিল।"
  },
  {
    "id": 19,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "Which of the following best represents the educational philosophy behind the DVPLC objectives\nrecommended by the Mudaliar Commission?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ প্ৰস্তামেত DVPLC লক্ষযসমূৈৰ শিক্ষাগত দিযন কোনয়া বিকল্পই সবযাধি্ক সঠিকভাযে প্ৰ কাি কযৰ?",
    "enOptions": [
      "Education should focus only on examinations.",
      "Education should promote balanced development of the individual and society.",
      "Education should prepare students only for universities.",
      "Education should emphasize memorization alone."
    ],
    "asOptions": [
      "শিক্ষা ককেল পৰীক্ষাৰ ওপৰত ককমিত ৈ’ব লাযগ।",
      "শিক্ষা বযকি্তগত আৰু সামামেক উভ বিকাশ সাধ্ন কৰিব লাযগ।",
      "শিক্ষা ককেল বিশ্ববিদ্যালয় ৰ বাযব প্ৰস্তু মত ৈ’ব লাযগ।",
      "শিক্ষা ককেল মুখস্থ বিদযাৰ ওপৰত গু ৰুত্ব দিব লাযগ।"
    ],
    "correctIndex": 1,
    "enExplanation": "The DVPLC framework reflects a balanced educational philosophy emphasizing democratic citizenship,\nvocational efficiency, personality development, leadership and character formation.",
    "asExplanation": "DVPLC ধ্ াৰণাই গণতানি্ত্ৰক নাগৰিকত্ব, বৃত্তিমূলক দক্ষ তা, ব্যক্তিত্ব বিকাশ, নেতৃত্ব আৰু চৰিত্র গঠনৰ সমিিত বিকাশৰ ওপৰত গু ৰুত্ব দিয ।"
  },
  {
    "id": 20,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "Which statement best evaluates the contribution of the Mudaliar Commission to secondary education in\nIndia?",
    "asQuestion": "ভাৰতৰ মাধ্যমিক শিক্ষাৰ কক্ষত্রত মুডালিয়াৰ আয়োগৰ অেদানৰ সযবযািম মূলযা ন কোনয়া?",
    "enOptions": [
      "It focused only on administrative reforms.",
      "It ignored students' individual differences.",
      "It provided a comprehensive framework for improving secondary education.",
      "It recommended the abolition of secondary education."
    ],
    "asOptions": [
      "ই ককেল প্ৰ িাসনিক সংস্কাৰৰ ওপৰত গু ৰুত্ব দিছিল।",
      "ই শিক্ষাৰ্থীৰ বযকি্তগত পার্থক্য উপেক্ষা কৰিছিল।",
      "ই মাধ্ যমিক মিক্ষ াৰ উন্ন নৰ বাযব এক বিস্তৃ ত কাঠাযমা প্ৰ দান কৰিছিল।",
      "ই মাধ্যমিক শিক্ষা বিযলাপৰ পৰামিয দিছিল।"
    ],
    "correctIndex": 2,
    "enExplanation": "The Mudaliar Commission significantly influenced curriculum reform, guidance services, vocational\neducation, examination reform and democratic citizenship.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ পাঠযক্ৰম সংস্কাৰ, নিযদযিনায়কসো, বৃত্তিমূলক মিক্ষ া, পৰীক্ষা সংস্কাৰ আৰু গণতানি্ত্ৰক নাগৰিকত্বৰ কক্ষত্রত গভীৰ প্ৰ ভাে কপলাইছিল।"
  },
  {
    "id": 21,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "In which year was the Kothari Commission appointed?",
    "asQuestion": "কোঠাৰী আয়োগ কোন বছৰত নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "1952",
      "1964",
      "1968",
      "1986"
    ],
    "asOptions": [
      "১৯৫২",
      "১৯৬৪",
      "১৯৬৮",
      "১৯৮৬"
    ],
    "correctIndex": 1,
    "enExplanation": "The Education Commission, popularly known as the Kothari Commission, was appointed in 1964.",
    "asExplanation": "শিক্ষা আয়াগ, যাক কোঠাৰী আয়োগ বুলিও কোৱা ৈ, ১৯৬৪ চনত নিযুক্ত কৰা হৈছিল।"
  },
  {
    "id": 22,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "Who was the Chairman of the Kothari Commission?",
    "asQuestion": "কোঠাৰী আয়োগৰ সভাপতি কোন আছিল?",
    "enOptions": [
      "A. Lakshmanaswami Mudaliar",
      "Zakir Hussain",
      "D. S. Kothari",
      "J. P. Naik"
    ],
    "asOptions": [
      "এ. লক্ষ্ণিস্বামী মুডালিয়াৰ",
      "জাকিৰ হুছেইন",
      "ডি. এছ. কোঠাৰী",
      "কে. পি. নায়ক"
    ],
    "correctIndex": 2,
    "enExplanation": "The Commission was chaired by Dr. D. S. Kothari, a distinguished scientist and educationist.",
    "asExplanation": "ড° ডি. এছ. কোঠাৰী এই আয়াগৰ সভাপতি আছিল, যিেন এেন বিশিষ্ট বিজ্ঞানী আৰু শিক্ষাবিদ আছিল।"
  },
  {
    "id": 23,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "The Kothari Commission viewed education primarily as an instrument for—",
    "asQuestion": "কোঠাৰী আয়াযগ শিক্ষাক মূলতঃ কিৈৰ উপা মৈচাযপ গণয কৰিছিল?",
    "enOptions": [
      "Examination success",
      "National development",
      "Religious instruction",
      "Administrative control"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা",
      "জাতীয় উন্ন ন",
      "ধৰ্মীয় শিক্ষা",
      "প্ৰশাসনিক মন ন্ত্ৰ ণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission emphasized that education should contribute to national development,\nmodernization and social transformation.",
    "asExplanation": "কোঠাৰী আয়াযগ শিক্ষা জাতীয় উন্ন ন, আধুনিকীকৰণ আৰু সামামেক পৰিেতযনৰ শক্তিশালী উপা বুমল তি প্ৰ কাি কৰিছিল।"
  },
  {
    "id": 24,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "Assertion (A):\nThe Kothari Commission emphasized equal educational opportunities.\nReason (R):\nEducation should help reduce social and economic inequalities.",
    "asQuestion": "উকি্ত ( A): কোঠাৰী আয়াযগ সমান শিক্ষাৰ সুযোগৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল। কাৰণ (R): শিক্ষাই সামামেক আৰু অৰ্থনৈতিক বৈষ্িয হ্ৰাস কৰাত সৈা কৰিব লাযগ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed that equal educational opportunities are essential for reducing inequalities and\npromoting social justice.",
    "asExplanation": "আয়াগৰ যিত সমান শিক্ষাৰ সুযযাগ সামামেক নযাপ্ৰ তিষ্ঠা আৰু বৈষ্িয হ্ৰাসৰ বাযব অতযন্ত প্ৰ য়ােনী ।"
  },
  {
    "id": 25,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "Which recommendation of the Kothari Commission aimed at providing equal educational opportunities to\nall children regardless of social background?",
    "asQuestion": "সামামেক প ভূমি নিবিযযিযষ সকযলা শিশুক সমান শিক্ষাৰ সুযযাগ প্ৰ দান কৰাৰ উযেযিয কোঠাৰী আয়াযগ কোন পৰামিয আগব়িাইছিল?",
    "enOptions": [
      "Multipurpose Schools",
      "Common School System",
      "Operation Blackboard",
      "Open Universities"
    ],
    "asOptions": [
      "বহুমুখী বিদযাল",
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "অপাযৰচন কেকব'িয",
      "মুক্ত বিশ্ববিদ্যালয়"
    ],
    "correctIndex": 1,
    "enExplanation": "The Common School System was recommended to promote equality and reduce educational disparities.",
    "asExplanation": "সাধ্ াৰণ বিদযাল বযেস্থ া সতিা বৃত্তি আৰু মিক্ষ াগত বৈষ্িয হ্ৰাস কৰাৰ উযেযিয পৰামিয মদা হৈছিল।"
  },
  {
    "id": 26,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "Which educational structure was recommended by the Kothari Commission for India?",
    "asQuestion": "কোঠাৰী আয়াযগ ভাৰতৰ বাযব কোন শিক্ষা গাঁথনিৰ পৰামিয আগব়িাইছিল?",
    "enOptions": [
      "8+4+3",
      "10+2+3",
      "11+2+2",
      "7+5+3"
    ],
    "asOptions": [
      "৮+৪+৩",
      "১০+২+৩",
      "১১+২+২",
      "৭+৫+৩"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission recommended the 10+2+3 structure, which later became the standard educational\npattern in India.",
    "asExplanation": "কোঠাৰী আয়াযগ ১০+২+৩ শিক্ষা গাঁথনিৰ পৰামিয আগব়িাইছিল, যি পিছত ভাৰতৰ মানক শিক্ষা বযেস্থা মৈচাযপ গৃৈীত ৈ ।"
  },
  {
    "id": 27,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "A student completes ten years of schooling and then enters a two-year higher secondary programme. Which\nrecommendation of the Kothari Commission is reflected here?",
    "asQuestion": "এেন মিক্ষ াথীয দৈ বছৰৰ বিদযাল মিক্ষ া স্িপূ ণয কৰাৰ পিছত দুবছৰী া উচ্চ মাধ্ যমিক কাযযসূচীত কযাগদান কযৰ। ই াত কোঠাৰী আয়োগৰ কোন পৰামিয প্ৰ তিফলিত হৈছে?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "10+2+3 Structure",
      "Adult Education"
    ],
    "asOptions": [
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "কযি অভিজ্ঞতা",
      "১০+২+৩ গাঁথনি",
      "প্ৰাপ্তব স্ক শিক্ষা"
    ],
    "correctIndex": 2,
    "enExplanation": "The 10+2+3 pattern consists of ten years of schooling, two years of higher secondary education and three\nyears of degree education.",
    "asExplanation": "১০+২+৩ গাঁথনি অনুসমৰ ১০ বছৰ বিদযাল শিক্ষা, ২ বছৰ উচ্চ মাধ্যমিক আৰু ৩ বছৰ ডিগ্ৰী শিক্ষা থাযক।"
  },
  {
    "id": 28,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "A school requires students to participate in community service, gardening and productive activities as part of\nlearning. Which recommendation of the Kothari Commission does this represent?",
    "asQuestion": "এখন বিদযালয শিক্ষার্থীক শিক্ষা প্ৰ কি্ৰাৰ অংি মৈচাযপ সমােযসো, বাগিচা কযি আৰু উৎপাদনিীল কাযযত অংিগ্ৰৈণ কৰায়া বাধ্যতামূলক কৰিযছ। ই াত কোঠাৰী আয়োগৰ কোন পৰামিয প্ৰ তিফলিত হৈছে?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Examination Reform",
      "Open Learning"
    ],
    "asOptions": [
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "কযি অভিজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ",
      "মুক্ত শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission emphasized work experience to connect education with productive work and\nsocial responsibility.",
    "asExplanation": "কোঠাৰী আয়াযগ শিক্ষাক উৎপাদনিীল কযি আৰু সামামেক দাম ত্ব ৰ হসযত সংযযাগ কৰিবলৈ কযি অভিজ্ঞতাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 29,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "Why did the Kothari Commission place special emphasis on equal educational opportunity?",
    "asQuestion": "কোঠাৰী আয়াযগ সমান শিক্ষাৰ সুযোগৰ ওপৰত বিযিষ গু ৰুত্ব কি আযৰাপ কৰিছিল?",
    "enOptions": [
      "To increase examination competition",
      "To reduce social inequality and promote national integration",
      "To increase private schooling",
      "To reduce higher education enrolment"
    ],
    "asOptions": [
      "পৰীক্ষ ামূলক প্ৰ তিযযাগিতা বৃত্তি কৰিবলৈ",
      "সামামেক বৈষ্িয হ্ৰাস আৰু জাতীয় সংহতি শক্তিশালী কৰিবলৈ",
      "ব্যক্তি গত বিদযাল বৃত্তি কৰিবলৈ",
      "উচ্চ শিক্ষাত নাভিতিয হ্ৰাস কৰিবলৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission viewed educational equality as a means to achieve social justice, national integration and\nbalanced development.",
    "asExplanation": "আয়াগৰ যিত শিক্ষাগত সতিা সামামেক নযা, জাতীয় সংহতি আৰু সমিবকাি নিমিত কৰাৰ এক মুখয উপা ।"
  },
  {
    "id": 30,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "Assertion (A):\nThe Kothari Commission emphasized science education.\nReason (R):\nScientific knowledge is essential for modernization and national development.",
    "asQuestion": "উকি্ত ( A): কোঠাৰী আয়াযগ বিজ্ঞান শিক্ষাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল। কাৰণ (R): আধুনিকীকৰণ আৰু জাতীয় উন্ন নৰ বাযব বৈজ্ঞানিক জ্ঞান অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed science education was essential for technological progress, modernization and\neconomic development.",
    "asExplanation": "আয়াগৰ যিত বিজ্ঞান শিক্ষা প্ৰ যুকি্তগত অগ্ৰগতি, আধুনিকীকৰণ আৰু অৰ্থনৈতিক বিকাশৰ বাযব অতযন্ত প্ৰ য়ােনী ।"
  },
  {
    "id": 31,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "In which year was the National Policy on Education introduced?",
    "asQuestion": "ৰাষ্ট্ৰীয়য় শিক্ষা নীতি ( NPE) কোন বছৰত প্ৰ েতযন কৰা হৈছিল?",
    "enOptions": [
      "1968",
      "1976",
      "1986",
      "1992"
    ],
    "asOptions": [
      "১৯৬৮",
      "১৯৭৬",
      "১৯৮৬",
      "১৯৯২"
    ],
    "correctIndex": 2,
    "enExplanation": "The National Policy on Education was announced in 1986 to promote educational development and equality.",
    "asExplanation": "মিক্ষ াৰ উন্ন ন আৰু সতিা বৃত্তিৰ উযেযিয ১৯৮৬ চনত ৰাষ্ট্ৰ ী মিক্ষ া নীতি ক াষণা কৰা হৈছিল।"
  },
  {
    "id": 32,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "One of the major objectives of the National Policy on Education (1986) was to—",
    "asQuestion": "ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -ৰ অনযতম মুখয উযেিয কি আছিল?",
    "enOptions": [
      "Reduce access to education",
      "Promote equality of educational opportunity",
      "Eliminate secondary education",
      "Restrict vocational education"
    ],
    "asOptions": [
      "শিক্ষাৰ সুযযাগ হ্ৰাস কৰা",
      "মিক্ষ াৰ সমান সুযযাগ বৃত্তি কৰা",
      "মাধ্যমিক শিক্ষা বিযলাপ কৰা",
      "বৃত্তিমূলক মিক্ষ া সীমাবি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The NPE 1986 aimed to ensure equal educational opportunities for all sections of society.",
    "asExplanation": "NPE 1986-এ সমােৰ সকযলা কেণীৰ বাযব সমান শিক্ষাৰ সুযযাগ নিমিত কৰাৰ লক্ষয হলছিল।"
  },
  {
    "id": 33,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "A government programme provides classrooms, teaching materials and basic facilities to improve school\ninfrastructure. Which initiative of NPE 1986 does this describe?",
    "asQuestion": "এ া চৰকাৰী কাযযসূচীয বিদযাল সমূৈক কেণীযকাঠা, মিক্ষণ সাগি্ৰী আৰু কমৌলিক সুবিধ্া প্ৰ দান কযৰ। ই NPE 1986-ৰ কোন পদযক্ষপৰ উদাৈৰণ?",
    "enOptions": [
      "Work Experience",
      "Common School System",
      "Operation Blackboard",
      "Adult Education"
    ],
    "asOptions": [
      "কযি অভিজ্ঞতা",
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "অপাযৰচন কেকব'িয",
      "প্ৰাপ্তব স্ক শিক্ষা"
    ],
    "correctIndex": 2,
    "enExplanation": "Operation Blackboard was launched to improve essential facilities and teaching resources in schools.",
    "asExplanation": "বিদযাল সমূৈত কমৌলিক সুবিধ্া আৰু মিক্ষণ স্িপদ উন্নত কৰাৰ বাযব অপাযৰচন কেকব 'িয আৰ্িভ কৰা হৈছিল।"
  },
  {
    "id": 34,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "Why did the National Policy on Education (1986) emphasize teacher education and training?",
    "asQuestion": "ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -এ মিক্ষক শিক্ষা আৰু প্ৰ মিক্ষণৰ ওপৰত বিযিষ গু ৰুত্ব কি আযৰাপ কৰিছিল?",
    "enOptions": [
      "To reduce the number of teachers",
      "To improve the quality of education",
      "To replace schools with technology",
      "To eliminate examinations"
    ],
    "asOptions": [
      "মিক্ষকৰ সংখযা হ্ৰাস কৰিবলৈ",
      "শিক্ষাৰ গু ণগত মান উন্নত কৰিবলৈ",
      "বিদযাল ৰ পৰিেযতয প্ৰ যুকি্ত বযেৈাৰ কৰিবলৈ",
      "পৰীক্ষা বিযলাপ কৰিবলৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "The policy recognized that educational quality depends greatly on well-trained and professionally competent\nteachers.",
    "asExplanation": "নীতিখযন স্ব ীকাৰ কৰিছিল কয শিক্ষাৰ গু ণগত মান দক্ষ আৰু সু -প্ৰ মিকি্ষত মিক্ষকৰ ওপৰত নিভযৰ কযৰ।"
  },
  {
    "id": 35,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "A secondary school introduces courses in agriculture, computer applications and business skills to prepare\nstudents for employment. This reflects the concept of—",
    "asQuestion": "এখন মাধ্ যমিক বিদযালয কৃষি, কমি্পউ াৰ প্ৰ য়াগ আৰু বযেসাম ক দক্ষতাৰ পাঠযক্ৰম আৰ্িভ কৰা হৈছে যাযত শিক্ষাথীসকল কযিসংস্থাপনৰ বাযব প্ৰস্তু ত ৈ । ই কোন ধ্ াৰণাক প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Examination Reform",
      "Vocationalisation of Education",
      "Common School System",
      "Democratic Citizenship"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "মিক্ষ াৰ বৃত্তিমুখীকৰণ",
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "গণতানি্ত্ৰক নাগৰিকত্ব"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation aims to equip students with practical skills and employment-oriented knowledge.",
    "asExplanation": "বৃত্তিমুখীকৰণৰ লক্ষ য হৈছে মিক্ষ াথীক বযেৈাৰিক দক্ষ তা আৰু কযিমুখী জ্ঞান প্ৰ দান কৰা।"
  },
  {
    "id": 36,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "What is the primary objective of vocationalisation of secondary education?",
    "asQuestion": "মাধ্ যমিক মিক্ষ াৰ বৃত্তিমুখীকৰণৰ মুখয উযেিয কি?",
    "enOptions": [
      "To increase examination marks only",
      "To prepare students for productive employment",
      "To reduce practical activities",
      "To eliminate academic subjects"
    ],
    "asOptions": [
      "ককেল পৰীক্ষ াৰ ন্িব ৰ বৃত্তি কৰা",
      "শিক্ষার্থীক উৎপাদনিীল কযিসংস্থাপনৰ বাযব প্ৰস্তু ত কৰা",
      "বযেৈাৰিক কাযযকলাপ হ্ৰাস কৰা",
      "একাযিমিক বিষ বিযলাপ কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation aims to equip students with practical skills and occupational competence for employment\nand self-reliance.",
    "asExplanation": "বৃত্তিমুখীকৰযণ মিক্ষ াথীক বযেৈামৰক দক্ষ তা আৰু কপছাগত কযাগযতাযৰ সমিত কমৰ কযিসংস্থ ান আৰু আত্মিনভযৰিীলতাৰ বাযব প্ৰস্তু ত কযৰ।"
  },
  {
    "id": 37,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "A region faces high youth unemployment despite many students completing school education. Which\neducational approach can best address this issue?",
    "asQuestion": "এ া অঞ্চ লত বহু মিক্ষ াথীয বিদযাল মিক্ষ া স্িপূ ণয কৰাৰ পিছযতা যুে কবকাৰত্ব অধি্ ক। কোন মিক্ষ াগত পিতিয এই সসিযাৰ উিম সমাধ্ান দিব পাযৰ?",
    "enOptions": [
      "Examination-oriented education",
      "Vocationalisation of education",
      "Memorization-based learning",
      "Reduction of practical work"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা",
      "মিক্ষ াৰ বৃত্তিমুখীকৰণ",
      "মুখস্থভিমিক শিক্ষা",
      "বযেৈাৰিক কাযয হ্ৰাস"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocational education helps students acquire employable skills and reduces the gap between education and\nemployment.",
    "asExplanation": "বৃত্তিমুখী মিক্ষ াই মিক্ষ াথীক কযযিাপযযাগী দক্ষ তা প্ৰ দান কমৰ মিক্ষ া আৰু কযিসংস্থ াপনৰ মােৰ বযেধ্ ান হ্ৰাস কযৰ।"
  },
  {
    "id": 38,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "One major feature of the development of secondary education in Assam after independence was—",
    "asQuestion": "স্ব াধ্ীনতাৰ পিছত অসমত মাধ্যমিক শিক্ষাৰ বিকাশৰ এ া মুখয হবমিষ্টয কি আছিল?",
    "enOptions": [
      "Reduction in school enrolment",
      "Expansion of educational institutions",
      "Closure of rural schools",
      "Elimination of science education"
    ],
    "asOptions": [
      "বিদযাল ত নাভিতিয হ্ৰাস",
      "শিক্ষানুষ্ঠানৰ স্িপ্ৰসাৰণ",
      "গ্ৰাযি বিদযাল বন্ধ",
      "বিজ্ঞান শিক্ষা বিযলাপ"
    ],
    "correctIndex": 1,
    "enExplanation": "After independence, Assam witnessed a significant expansion in secondary schools and educational\nopportunities.",
    "asExplanation": "স্ব াধ্ীনতাৰ পিছত অসমত মাধ্যমিক বিদযাল আৰু শিক্ষাৰ সুযোগৰ উযেখযযাগয স্িপ্ৰসাৰণ টিছিল।"
  },
  {
    "id": 39,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "Which factor contributed most significantly to the growth of secondary education in Assam after\nindependence?",
    "asQuestion": "স্ব াধ্ীনতাৰ পিছত অসমত মাধ্যমিক শিক্ষাৰ বিকািত কোন কাৰযক সবযাধি্ক গু ৰুত্বপূণয ভূমিকা পালন কৰিছিল?",
    "enOptions": [
      "Reduction of public investment",
      "Expansion of schools and government initiatives",
      "Restriction of teacher training",
      "Decrease in literacy programmes"
    ],
    "asOptions": [
      "চৰকাৰী বিনিয়াগ হ্ৰাস",
      "বিদযাল স্িপ্ৰসাৰণ আৰু চৰকাৰী পদযক্ষপ",
      "মিক্ষক প্ৰ মিক্ষণ সীমিতকৰণ",
      "সাক্ষৰতা কাযযসূচী হ্ৰাস"
    ],
    "correctIndex": 1,
    "enExplanation": "Government policies, expansion of institutions and increased educational awareness contributed\nsignificantly to educational development.",
    "asExplanation": "চৰকাৰী নীতি, বিদযাল স্িপ্ৰ সাৰণ আৰু মিক্ষ াৰ প্ৰ মত সযচতনতা বৃত্তিয মিক্ষ াৰ বিকািত বিযিষ ভূমিকা পালন কৰিছিল।"
  },
  {
    "id": 40,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "A rural district has schools but lacks sufficient teachers, laboratories and learning resources. Which\nchallenge of secondary education in Assam does this situation best represent?",
    "asQuestion": "এ া গ্ৰাযি মেলাত বিদযাল আযছ, কিন্তু পযযাপ্ত মিক্ষক, পৰীক্ষাগাৰ আৰু মিক্ষণ স্িপদ নাই। এই অেস্থাই অসৰি মাধ্যমিক শিক্ষাৰ কোন সসিযাক সবযাধি্ক সঠিকভাযে প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Excessive vocationalisation",
      "Inequality in educational facilities",
      "Overdevelopment of infrastructure",
      "Lack of educational demand"
    ],
    "asOptions": [
      "অত্যাধিক ক বৃত্তিমুখীকৰণ",
      "শিক্ষাগত সুবিধ্াৰ অসম বণ্টন",
      "আন্তঃগাঁথনিৰ অত্যাধিক উন্ন ন",
      "শিক্ষাৰ প্ৰ মত চামৈদাৰ অভাৱ"
    ],
    "correctIndex": 1,
    "enExplanation": "Unequal distribution of educational resources remains a challenge in ensuring quality secondary education\nacross all regions.",
    "asExplanation": "শিক্ষাগত স্িপদৰ অসম বণ্টন এমতাও সকযলা অঞ্চলত গু ণগত মাধ্যমিক শিক্ষা নিমিত কৰাৰ কক্ষত্রত এক গু ৰুত্বপূণয সসিযা।"
  },
  {
    "id": 41,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "Which factor played a major role in strengthening secondary education in Assam after independence?",
    "asQuestion": "স্ব াধ্ীনতাৰ পিছত অসমত মাধ্যমিক শিক্ষা শক্তিশালী কৰাৰ কক্ষত্রত কোন কাৰযক গু ৰুত্বপূণয ভূমিকা পালন কৰিছিল?",
    "enOptions": [
      "Closure of educational institutions",
      "Government support and educational expansion",
      "Reduction of teacher recruitment",
      "Elimination of science subjects"
    ],
    "asOptions": [
      "শিক্ষানুষ্ঠান বন্ধ কৰা",
      "চৰকাৰী সৈা আৰু শিক্ষাৰ স্িপ্ৰসাৰণ",
      "মিক্ষক নিযুকি্ত হ্ৰাস",
      "বিজ্ঞান বিষ বিযলাপ"
    ],
    "correctIndex": 1,
    "enExplanation": "Government initiatives, institutional growth and educational planning helped strengthen secondary\neducation in Assam.",
    "asExplanation": "চৰকাৰী পদযক্ষপ, মিক্ষ ানুষ্ঠ ানৰ বৃত্তি আৰু মিক্ষ াগত পৰিকল্প নাই অসমত মাধ্ যমিক মিক্ষ া িকি্ত িালী কৰাত সৈা কৰিছিল।"
  },
  {
    "id": 42,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "Which educational issue is highlighted by this case?",
    "asQuestion": "এই নায়াযে কোন শিক্ষাগত সসিযাক উজ্জ্বলভাযে প্ৰ কাি কযৰ?",
    "enOptions": [
      "Excessive vocationalisation",
      "Educational inequality",
      "Overcrowding in universities",
      "Lack of examinations"
    ],
    "asOptions": [
      "অত্যাধিক ক বৃত্তিমুখীকৰণ",
      "শিক্ষাগত অসতিা",
      "বিশ্ববিদ্যালয় ত অতিমাত্রা ভিৰ",
      "পৰীক্ষাৰ অভাৱ"
    ],
    "correctIndex": 1,
    "enExplanation": "Differences in facilities and educational resources indicate educational inequality among regions.",
    "asExplanation": "সুবিধ্া আৰু শিক্ষাগত স্িপদৰ পার্থক্যই অঞ্চলসমূৈৰ মােত শিক্ষাগত অসতিা প্ৰ কাি কযৰ।"
  },
  {
    "id": 43,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "Which measure would be most effective in improving the quality of secondary education in rural Assam?",
    "asQuestion": "গ্ৰাযি অসমত মাধ্যমিক শিক্ষাৰ গু ণগত মান উন্নত কৰাৰ বাযব কোন বযেস্থা সবযাধি্ক ফলপ্ৰসূ ৈ’ব?",
    "enOptions": [
      "Reducing teacher training",
      "Increasing examination pressure",
      "Improving infrastructure and teacher quality",
      "Limiting educational access"
    ],
    "asOptions": [
      "মিক্ষক প্ৰ মিক্ষণ হ্ৰাস কৰা",
      "পৰীক্ষ াৰ চাপ বৃত্তি কৰা",
      "আন্তঃগাঁথনি আৰু মিক্ষকৰ গু ণগত মান উন্নত কৰা",
      "শিক্ষাৰ সুযযাগ সীমিত কৰা"
    ],
    "correctIndex": 2,
    "enExplanation": "Quality education depends on trained teachers, adequate infrastructure and effective learning resources.",
    "asExplanation": "গু ণগত শিক্ষা দক্ষ মিক্ষক, উপযুক্ত আন্তঃগাঁথনি আৰু মিক্ষণ স্িপদৰ ওপৰত মনভযৰিীল।"
  },
  {
    "id": 44,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "Why are the recommendations of the Mudaliar and Kothari Commissions still considered relevant today?",
    "asQuestion": "মুডালিয়াৰ আৰু কোঠাৰী আয়োগৰ পৰামিযসমূৈ আমেও কিপ্ৰাসংগিক বুমল গণয কৰা ৈ?",
    "enOptions": [
      "They focused only on examinations.",
      "They addressed issues of quality, equality and national development.",
      "They discouraged educational reform.",
      "They eliminated vocational education."
    ],
    "asOptions": [
      "কতওঁযলাযক ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব দিছিল।",
      "কতওঁযলাযক গু ণগত মান, সতিা আৰু জাতীয় উন্ন নৰ বিষ সমূৈ সয্িবাধ্ন কৰিছিল।",
      "কতওঁযলাযক শিক্ষাগত সংস্কাৰ মনৰুৎসামৈত কৰিছিল।",
      "কতওঁযলাযক বৃত্তিমুখী মিক্ষ া বিযলাপ কৰিছিল।"
    ],
    "correctIndex": 1,
    "enExplanation": "Many recommendations regarding educational quality, equality, vocationalisation and national development\nremain relevant in modern education.",
    "asExplanation": "শিক্ষাৰ গু ণগত মান, সতিা, বৃত্তিমুখীকৰণ আৰু জাতীয় উন্ন নৰ হসযত েডিত বহু পৰামিয আমেও অতযন্ত প্ৰাসংগিক।"
  },
  {
    "id": 45,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "A state government plans to reform secondary education by improving vocational training, strengthening\nscience education and ensuring equal opportunities for all learners. These reforms are most closely aligned\nwith which educational vision?",
    "asQuestion": "এখন ৰােয চৰকাৰে মাধ্ যমিক মিক্ষ া সংস্ক াৰৰ বাযব বৃত্তিমূলক প্ৰ মিক্ষ ণ উন্ন ত কৰা, বিজ্ঞান শিক্ষা শক্তিশালী কৰা আৰু সকযলা শিক্ষাৰ্থীৰ বাযব সমান সুযযাগ নিমিত কৰাৰ পৰিকল্পনায়কৰিযছ। এই সংস্কাৰসমূৈ কোন শিক্ষাগত দৃষি্ট ভংগীৰ হসযত অধি্ ক মিল খা?",
    "enOptions": [
      "Examination-oriented education",
      "Combined vision of the Mudaliar and Kothari Commissions",
      "Elimination of secondary education",
      "Restriction of educational access"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা",
      "মুডালিয়াৰ আৰু কোঠাৰী আয়োগৰ সমিিত দৃষি্ট ভংগী",
      "মাধ্যমিক শিক্ষা বিযলাপ",
      "শিক্ষাৰ সুযযাগ সীমিতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The reforms combine key ideas from both commissions, including vocational efficiency, science education,\nequality and national development.",
    "asExplanation": "এই সংস্কাৰসমূযৈ মুডালিয়াৰ আৰু কোঠাৰী আয়োগৰ মূল ধ্ াৰণাসমূৈ —বৃত্তিমূলক দক্ষ তা, বিজ্ঞান শিক্ষা, সতিা আৰু জাতীয় উন্ন ন —সমিিতভাযে অন্তভুযক্ত কযৰ।"
  },
  {
    "id": 46,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "Case:\nA state education department finds that student enrolment has increased significantly, but learning outcomes\nremain poor. The department plans to improve teacher training, guidance services and curriculum quality.\nWhich educational principle is most clearly reflected in this reform effort?",
    "asQuestion": "না: এখন ৰামেযক মিক্ষ া বিভাযগ লক্ষ য কমৰযছ কয মিক্ষ াথীৰ নাভিতিয বৃত্তি পাইযছ, কিন্তু মিক্ষণ ফলাফল সযন্তাষেনক নৈ । বিভাগয়াযে মিক্ষক প্ৰ মিক্ষণ, নিযদযিনায়কসো আৰু পাঠযক্ৰমৰ মান উন্নত কৰাৰ পমৰকল্পনায়কমৰযছ। এই সংস্কাৰ প্ৰ যচষ্টাই কোন শিক্ষাগত নীতিক সবযাধি্ক স্পষ্ট ভাযে প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Expansion without quality",
      "Quality-oriented educational reform",
      "Reduction of educational opportunities",
      "Examination-centred education"
    ],
    "asOptions": [
      "গু ণগত মান অবিৈযন স্িপ্ৰসাৰণ",
      "গু ণগত শিক্ষামুখী সংস্কাৰ",
      "শিক্ষাৰ সুযযাগ হ্ৰাস",
      "পৰীক্ষামুখী শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "Educational reform should focus not only on access but also on improving the quality of teaching,\ncurriculum and student support.",
    "asExplanation": "মিক্ষ াগত সংস্ক াযৰ ককেল সুযযাগ বৃত্তিৰ ওপৰত নৈ, শিক্ষাদান, পাঠযক্ৰম আৰু শিক্ষাৰ্থী সৈা বযেস্থাৰ গু ণগত মান উন্নত কৰাৰ ওপৰযতা গু ৰুত্ব দিব লাযগ।"
  },
  {
    "id": 47,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "A country faces a growing mismatch between academic qualifications and employment opportunities.\nWhich recommendation from educational reforms would most directly address this issue?",
    "asQuestion": "এখন কদিত একাযিমিক কযাগযতা আৰু কযিসংস্থ াপনৰ সুযোগৰ মােত বযেধ্ ান বৃত্তি পাইযছ। মিক্ষ াগত সংস্ক াৰৰ কোন পৰামিযই এই সসিযাক সবযাধি্ক প্ৰ তযক্ষভাযে সমাধ্ান কৰিব?",
    "enOptions": [
      "Increasing written examinations",
      "Vocationalisation of education",
      "Reducing science education",
      "Limiting school expansion"
    ],
    "asOptions": [
      "লিখিত পৰীক্ষ া বৃত্তি",
      "মিক্ষ াৰ বৃত্তিমুখীকৰণ",
      "বিজ্ঞান শিক্ষা হ্ৰাস",
      "বিদযাল স্িপ্ৰসাৰণ সীমিতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation links education with practical skills and labour market needs.",
    "asExplanation": "বৃত্তিমুখীকৰযণ মিক্ষ াক বযেৈাৰিক দক্ষ তা আৰু কযিবোৰৰ প্ৰ য়ােনৰ হসযত সংযুক্ত কযৰ।"
  },
  {
    "id": 48,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "Assertion (A):\nEqual educational opportunity remains an important goal of modern education.\nReason (R):\nEducational inequality can limit social mobility and national development.",
    "asQuestion": "উকি্ত ( A): সমান শিক্ষাৰ সুযযাগ আধ্ুনিক শিক্ষাৰ এক গু ৰুত্বপূণয লক্ষয হৈ আযছ। কাৰণ (R): শিক্ষাগত অসমতাই সামামেক গমতিীলতা আৰু জাতীয় উন্ন ন সীমিত কৰিব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Equal opportunity promotes social justice and allows individuals to contribute fully to national development.",
    "asExplanation": "সমান সুযযাযগ সামামেক নযাপ্ৰ তিষ্ঠ া কযৰ আৰু ব্যক্তি ক জাতীয় উন্ন নত স্িপূ ণযভাযে অেদান ৰাখিবলল সক্ষ ম কযৰ।"
  },
  {
    "id": 49,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "Which educational reform proposal best combines the visions of the Mudaliar Commission, the Kothari\nCommission and the National Policy on Education (1986)?",
    "asQuestion": "কোন শিক্ষাগত সংস্কাৰ প্ৰস্তাযে মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -ৰ দৃষি্ট ভংগীক সবযাধি্ ক সফলভাযে একতি্র ত কযৰ?",
    "enOptions": [
      "Focus only on board examinations",
      "Promote equality, quality, vocational skills and national development",
      "Reduce access to secondary education",
      "Eliminate practical learning"
    ],
    "asOptions": [
      "ককেল ব'িয পৰীক্ষাৰ ওপৰত গু ৰুত্ব মদা",
      "সতিা, গু ণগত মান, বৃত্তিমূলক দক্ষ তা আৰু জাতীয় উন্ন নক উৎসামৈত কৰা",
      "মাধ্যমিক শিক্ষাৰ সুযযাগ হ্ৰাস কৰা",
      "বযেৈাৰিক মিক্ষণ বিযলাপ কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The common vision across these reforms includes educational quality, equality, vocational relevance and\nnational progress.",
    "asExplanation": "এই সকযলা সংস্কাৰৰ মূল লক্ষয হৈছে শিক্ষাৰ গু ণগত মান, সমতা, বৃত্তিমুখী প্ৰাসংগিকতা আৰু জাতীয় অগ্ৰ গমত।"
  },
  {
    "id": 50,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "A future-ready secondary education system should primarily aim to—",
    "asQuestion": "ভমেষযৎমুখী মাধ্যমিক শিক্ষা বযেস্থাৰ মুখয লক্ষয কি ৈ’ব লাযগ?",
    "enOptions": [
      "Prepare students only for examinations",
      "Develop knowledgeable, skilled, responsible and adaptable citizens",
      "Eliminate vocational education",
      "Focus only on academic achievement"
    ],
    "asOptions": [
      "ককেল পৰীক্ষাৰ বাযব শিক্ষার্থীক প্ৰস্তু ত কৰা",
      "জ্ঞানস্িপন্ন, দক্ষ, দাম ত্ব িীল আৰু অভিযযােনক্ষম নাগৰিক গ়িি কতালা",
      "বৃত্তিমুখী মিক্ষ া বিযলাপ কৰা",
      "ককেল একাযিমিক সফলতাৰ ওপৰত গু ৰুত্ব মদা"
    ],
    "correctIndex": 1,
    "enExplanation": "Modern educational reforms aim to develop holistic individuals who can contribute effectively to society\nand national development.",
    "asExplanation": "আধ্ুনিক শিক্ষাগত সংস্কাৰৰ লক্ষয হৈছে এযন সবযাঙ্গীন ব্যক্তিত্ব গ়িি কতালা যিয সমাে আৰু জাতীয় উন্ন নত ফলপ্ৰসূ অেদান ৰাখিব পাযৰ।"
  },
  {
    "id": 51,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "What was the central philosophy of the Kothari Commission regarding education?",
    "asQuestion": "শিক্ষাৰ কক্ষত্রত কোঠাৰী আয়োগৰ ককিী দিযন কি আছিল?",
    "enOptions": [
      "Education for examinations",
      "Education for national development",
      "Education for memorization",
      "Education for administration only"
    ],
    "asOptions": [
      "পৰীক্ষাৰ বাযব শিক্ষা",
      "জাতীয় উন্ন নৰ বাযব শিক্ষা",
      "মুখস্থ বিদযাৰ বাযব শিক্ষা",
      "ককেল প্ৰ িাসনৰ বাযব শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission viewed education as the most powerful instrument of national development.",
    "asExplanation": "কোঠাৰী আয়াযগ শিক্ষাক জাতীয় উন্ন নৰ আ াইতলক শক্তিশালী উপা মৈচাযপ গণয কৰিছিল।"
  },
  {
    "id": 52,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "Which common objective was emphasized by both the Kothari Commission and the National Policy on\nEducation (1986)?",
    "asQuestion": "কোঠাৰী আয়োগ আৰু ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) উভয ই কোন সাধ্াৰণ লক্ষযৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল?",
    "enOptions": [
      "Restricting access to education",
      "Equality of educational opportunity",
      "Reducing science education",
      "Limiting vocational education"
    ],
    "asOptions": [
      "শিক্ষাৰ সুযযাগ সীমিত কৰা",
      "শিক্ষাৰ সমান সুযযাগ",
      "বিজ্ঞান শিক্ষা হ্ৰাস কৰা",
      "বৃত্তিমুখী মিক্ষ া সীমিত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Both emphasized educational equality as a means to promote social justice and national progress.",
    "asExplanation": "উভয ই সামামেক নযা আৰু জাতীয় অগ্ৰগতিৰ বাযব শিক্ষাগত সমতাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 53,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "Which statement correctly distinguishes the Mudaliar Commission from the Kothari Commission?",
    "asQuestion": "কোন বক্ত বযই মুডালিয়াৰ আয়োগক কোঠাৰী আয়োগৰ পৰা সঠিকভাযে পৃথক কযৰ?",
    "enOptions": [
      "Mudaliar Commission focused mainly on secondary education, while Kothari Commission examined",
      "Both dealt only with university education.",
      "Kothari Commission focused only on secondary education.",
      "Both commissions had identical objectives and scope."
    ],
    "asOptions": [
      "মুডালিয়াৰ আয়াযগ মূলতঃ মাধ্যমিক শিক্ষাৰ ওপৰত গু ৰুত্ব দিছিল, আনৈাযত কোঠাৰী আয়াযগ সগি্ৰ শিক্ষা",
      "দুয়া াই ককেল বিশ্ববিদ্যালয় শিক্ষা অধ্য ন কৰিছিল।",
      "কোঠাৰী আয়াযগ ককেল মাধ্যমিক শিক্ষাৰ ওপৰত গু ৰুত্ব দিছিল।",
      "দুয়া া আয়াগৰ লক্ষয আৰু পৰিসৰ এযক আছিল।"
    ],
    "correctIndex": 0,
    "enExplanation": "The Mudaliar Commission concentrated on secondary education, whereas the Kothari Commission reviewed\nthe entire educational system.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ মাধ্যমিক শিক্ষাৰ ওপৰত গু ৰুত্ব দিছিল, কিন্তু কোঠাৰী আয়াযগ সগি্ৰ শিক্ষা বযেস্থাৰ পৰ্যালোচনায়কৰিছিল।"
  },
  {
    "id": 54,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "A district administration plans to improve secondary education by opening new schools, appointing trained\nteachers and providing laboratories. Which educational goal is being pursued?",
    "asQuestion": "এখন মেলা প্ৰ িাসযন নতুন বিদযালস্থ াপন, প্ৰ মিকি্ষত মিক্ষক নিযুকি্ত আৰু পৰীক্ষাগাৰ স্থ াপনৰ েমৰ যত মাধ্যমিক শিক্ষা উন্নত কৰাৰ পমৰকল্পনায়কমৰযছ। ই াত কোন শিক্ষাগত লক্ষয অনুসৰণ কৰা হৈছে?",
    "enOptions": [
      "Educational expansion and quality improvement",
      "Restriction of educational access",
      "Reduction of educational facilities",
      "Examination reform only"
    ],
    "asOptions": [
      "শিক্ষাৰ স্িপ্ৰসাৰণ আৰু গু ণগত উন্ন ন",
      "শিক্ষাৰ সুযযাগ সীমিতকৰণ",
      "শিক্ষাগত সুবিধ্া হ্ৰাস",
      "ককেল পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 0,
    "enExplanation": "Educational development requires both expansion of access and improvement in quality.",
    "asExplanation": "শিক্ষাৰ বিকাশৰ বাযব সুযোগৰ স্িপ্ৰসাৰণ আৰু গু ণগত উন্ন ন দুয়া াই প্ৰ য়ােন।"
  },
  {
    "id": 55,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "If you were designing a modern secondary education system based on Unit I concepts, which combination\nwould be most appropriate?",
    "asQuestion": "Unit I-ৰ ধ্ াৰণাসমূৈৰ ভিমিত যমদ আপুমন এখন আধ্ুমনক মাধ্যমিক শিক্ষা বযেস্থা মিোইন কযৰ, কতযন্ত কোন সমি য়া সবযাধি্ক উপযুক্ত ৈ 'ব?",
    "enOptions": [
      "Examinations + Memorization",
      "Equality + Vocational Skills + Quality Education + Scientific Outlook",
      "Reduced Access + Limited Curriculum",
      "Academic Learning Only"
    ],
    "asOptions": [
      "পৰীক্ষা + মুখস্থ বিদযা",
      "সতিা + বৃত্তিমূলক দক্ষ তা + গু ণগত মিক্ষ া + হবজ্ঞানিক দৃষি্ট ভংগী",
      "সীমিত সুযযাগ + সীমিত পাঠযক্ৰম",
      "ককেল একাযিমিক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "Modern educational reforms emphasize equity, quality, vocational competence and scientific thinking for\nholistic development.",
    "asExplanation": "আধ্ুনিক শিক্ষাগত সংস্কাযৰ সবযাঙ্গীন বিকাশৰ বাযব সতিা, গু ণগত শিক্ষা, বৃত্তিমূলক দক্ষ তা আৰু হবজ্ঞানিক চিন্তাধ্াৰাৰ ওপৰত গু ৰুত্ব দিয ।"
  },
  {
    "id": 56,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "A school organizes mock parliament sessions, community discussions and civic awareness programmes.\nWhich aim of secondary education is primarily promoted?",
    "asQuestion": "এখন বিদযালয নকল সংসদ অধি্যেিন, সামামেক আযলাচনা আৰু নাগৰিক সযচতনতা কাযযসূচী আয়ােন কযৰ। ই াৰ দ্ব াৰা মাধ্যমিক শিক্ষাৰ কোন লক্ষয মূলতঃ বিকমিত ৈ?",
    "enOptions": [
      "Vocational efficiency",
      "Democratic citizenship",
      "Technical specialization",
      "Examination preparation"
    ],
    "asOptions": [
      "বৃত্তিমূলক দক্ষ তা",
      "গণতানি্ত্ৰক নাগৰিকত্ব",
      "কাৰিকৰী বিযিষজ্ঞতা",
      "পৰীক্ষাৰ প্ৰস্তু তি"
    ],
    "correctIndex": 1,
    "enExplanation": "These activities help students understand democratic values, rights, duties and civic responsibilities.",
    "asExplanation": "এই কাযযসূচীযবাযৰ শিক্ষার্থীক গণতানি্ত্ৰক মূলযযবাধ্, অধি্কাৰ, কতযবয আৰু নাগৰিক দাম ত্ব ৰ জ্ঞান প্ৰ দান কযৰ।"
  },
  {
    "id": 57,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "Which recommendation of the Mudaliar Commission most directly addressed the problem of a rigid and\nbook-centered curriculum?",
    "asQuestion": "কযঠাৰ আৰু পুথিযকমিক পাঠযক্ৰমৰ সসিযাৰ সবযাধি্ক প্ৰ তযক্ষ সমাধ্ান মৈচাযপ মুডালিয়াৰ আয়াযগ কোন পৰামিয আগব়িাইছিল?",
    "enOptions": [
      "Diversified curriculum",
      "Increasing examinations",
      "Restricting co-curricular activities",
      "Reducing guidance services"
    ],
    "asOptions": [
      "হবচিত্রম পাঠযক্ৰম",
      "পৰীক্ষ া বৃত্তি",
      "সৈ-পাঠযক্ৰম কাযয সীমিতকৰণ",
      "নিযদযিনায়কসো হ্ৰাস"
    ],
    "correctIndex": 0,
    "enExplanation": "A diversified curriculum was introduced to meet different interests, aptitudes and future needs of learners.",
    "asExplanation": "শিক্ষাৰ্থীৰ বিভিন্ন আগ্ৰহ, কযাগযতা আৰু ভমেষযৎ প্ৰ য়ােন পূৰণৰ বাযব হবচিত্রম পাঠযক্ৰমৰ পৰামিয মদা হৈছিল।"
  },
  {
    "id": 58,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "Assertion (A):\nScience education received special emphasis in educational reforms.\nReason (R):\nScientific thinking is essential for modernization and national progress.",
    "asQuestion": "উকি্ত ( A): শিক্ষাগত সংস্কাৰসমূৈত বিজ্ঞান শিক্ষাৰ ওপৰত বিযিষ গু ৰুত্ব আযৰাপ কৰা হৈছিল। কাৰণ (R): বৈজ্ঞানিক চিন্তাধ্াৰা আধুনিকীকৰণ আৰু জাতীয় অগ্ৰগতিৰ বাযব অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Science education was promoted because scientific temper is vital for technological advancement and\ndevelopment.",
    "asExplanation": "বিজ্ঞান শিক্ষা গু ৰুত্ব মদা হৈছিল কাৰণ বৈজ্ঞানিক যিনাভাে প্ৰ যুকি্তগত আৰু জাতীয় বিকাশৰ বাযব অতযন্ত প্ৰ য়ােনী ।"
  },
  {
    "id": 59,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "Case:\nA state reports that thousands of students complete secondary education every year, yet many remain\nunemployed because they lack practical job skills.\nWhich reform would be most effective?",
    "asQuestion": "না: এখন ৰােযত ৈাোৰ ৈাোৰ মিক্ষ াথীয মাধ্ যমিক মিক্ষ া স্িপূ ণয কযৰ, কিন্তু বযেৈাৰিক কযিদক্ষতাৰ অভাৱত বহুেন নিবনুো হৈ থাযক। কোন সংস্কাৰ সবযাধি্ক ফলপ্ৰসূ ৈ 'ব?",
    "enOptions": [
      "More written examinations",
      "Vocationalisation of secondary education",
      "Reduction of practical training",
      "Limiting technical courses"
    ],
    "asOptions": [
      "অধি্ক লিখিত পৰীক্ষা",
      "মাধ্ যমিক মিক্ষ াৰ বৃত্তিমুখীকৰণ",
      "বযেৈাৰিক প্ৰ মিক্ষণ হ্ৰাস",
      "কাৰিকৰী পাঠযক্ৰম সীমিতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation equips learners with employable skills and reduces the gap between education and\nemployment.",
    "asExplanation": "বৃত্তিমুখীকৰযণ মিক্ষ াথীক কযযিাপযযাগী দক্ষ তা প্ৰ দান কমৰ মিক্ষ া আৰু কযিসংস্থ াপনৰ মােৰ বযেধ্ ান হ্ৰাস কযৰ।"
  },
  {
    "id": 60,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "Which combination best represents the collective vision of the Mudaliar Commission, Kothari Commission\nand National Policy on Education (1986)?",
    "asQuestion": "মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -ৰ সামূমৈক দৃষি্ট ভংগীক কোন সমি য়াযে সবযাধি্ক সঠিকভাযে প্ৰ কাি কযৰ?",
    "enOptions": [
      "Examination + Memorization + Competition",
      "Equality + Quality + Vocational Skills + National Development",
      "Restriction + Uniformity + Elimination of Practical Work",
      "Academic Achievement Only"
    ],
    "asOptions": [
      "পৰীক্ষা + মুখস্থ বিদযা + প্ৰ তিযযাগিতা",
      "সতিা + গু ণগত মান + বৃত্তিমূলক দক্ষ তা + জাতীয় উন্ন ন",
      "সীমাবিতা + একৰূপতা + বযেৈাৰিক শিক্ষাৰ বিযলাপ",
      "ককেল একাযিমিক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major reforms consistently promoted educational quality, equal opportunity, vocational relevance and\nnational development.",
    "asExplanation": "এই সকযলা শিক্ষাগত সংস্কাযৰ গু ণগত শিক্ষা, সমান সুযযাগ, বৃত্তিমুখী প্ৰাসংগিকতা আৰু জাতীয় উন্ন নৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 61,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "Case:\nA secondary school offers Science, Commerce, Agriculture, Fine Arts and Technical subjects under one\ninstitution so that students can choose according to their interests and abilities.\nThis model is best described as:",
    "asQuestion": "না: এখন মাধ্যমিক বিদযালয বিজ্ঞান, বাণিেয, কৃষি, চিত্রকলা আৰু কামৰকৰী বিষ এযক প্ৰ তিষ্ঠানৰ অন্তগযতভাযে প্ৰ দান কৰা ৈ যাযত শিক্ষাথীসকযল মনেৰ আগ্ৰহ আৰু সামৰ্থ্য অনুসমৰ বিষ বাছমন কমৰব পাযৰ। এই যিিলয়াক সবযাধি্ক উপযুক্তভাযে কি বুমল কোৱা ৈ?",
    "enOptions": [
      "Traditional School",
      "Multipurpose School",
      "Open University",
      "Correspondence School"
    ],
    "asOptions": [
      "পৰ্িপৰাগত বিদযাল",
      "বহুমুখী বিদযাল",
      "মুক্ত বিশ্ববিদ্যালয়",
      "িাকযযাযগ শিক্ষা/যযাগাযযাগ শিক্ষা বিদযাল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission recommended multipurpose schools to cater to diverse interests, aptitudes and\nvocational needs.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ শিক্ষাৰ্থীৰ বিভিন্ন আগ্ৰহ, কযাগযতা আৰু বৃত্তিমূলক প্ৰ য়ােন পূৰণৰ বাযব বহু মুখী বিদযাল ৰ পৰামিয দিছিল।"
  },
  {
    "id": 62,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "A school integrates gardening, community service, school maintenance and productive manual work into the\ncurriculum.\nWhich recommendation of the Kothari Commission is most clearly reflected?",
    "asQuestion": "এখন বিদযালয বাগিচা কযি, সমােযসো, বিদযাল ৰক্ষণাযবক্ষণ আৰু উৎপাদনিীল িাৰীমৰক কযি পাঠযক্ৰমৰ অংি মৈচাযপ অন্তভুযক্ত কমৰযছ। ই কোঠাৰী আয়োগৰ কোন পৰামিযক সবযাধি্ক স্পষ্ট ভাযে প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Examination Reform",
      "Distance Education"
    ],
    "asOptions": [
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "কযি অভিজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ",
      "দূৰেিী শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission emphasized work experience to connect education with productive labour and social\nresponsibility.",
    "asExplanation": "আয়াযগ শিক্ষাক উৎপাদনিীল কযি আৰু সামামেক দাম ত্ব ৰ হসযত সংযযাগ কৰিবলৈ কযি অভিজ্ঞতাৰ ওপৰত গু ৰুত্ব দিছিল।"
  },
  {
    "id": 63,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "Assertion (A):\nThe National Policy on Education (1986) emphasized education for women and disadvantaged groups.\nReason (R):\nEducational equality is essential for social justice and national development.",
    "asQuestion": "উকি্ত ( A): ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -এ দিছেলা আৰু বঞি্চত কগা সমূৈৰ শিক্ষাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল। কাৰণ (R): শিক্ষাগত সতিা সামামেক নযা আৰু জাতীয় উন্ন নৰ বাযব অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 emphasized equality and special support for disadvantaged groups to achieve social justice.",
    "asExplanation": "NPE 1986-এ সামামেক নযা নিমিত কৰিবলৈ বঞি্চত কগা সমূৈৰ বাযব বিযিষ শিক্ষাগত সুবিধ্াৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 64,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "Case:\n\n\n\nA rural area in Assam has sufficient school buildings but suffers from teacher shortages, inadequate\nlaboratories and poor learning outcomes.\nWhich strategy would be most effective?",
    "asQuestion": "না: অসমৰ এ া গ্ৰাযি অঞ্চলত বিদযাল ভেন যযথষ্ট আযছ, কিন্তু মিক্ষক সংক, অপযযাপ্ত পৰীক্ষাগাৰ আৰু দুবযল মিক্ষণ ফলাফল বিদযমান। কোন ককৌিলয়া সবযাধি্ক ফলপ্ৰসূ ৈ 'ব?",
    "enOptions": [
      "Construct more buildings only",
      "Improve teacher quality and learning resources",
      "Increase examination frequency",
      "Reduce enrolment"
    ],
    "asOptions": [
      "ককেল অধি্ক ভেন নিযিাণ কৰা",
      "মিক্ষকৰ গু ণগত মান আৰু মিক্ষণ স্িপদ উন্নত কৰা",
      "পৰীক্ষ াৰ সংখযা বৃত্তি কৰা",
      "নাভিতিয হ্ৰাস কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Quality improvement requires qualified teachers, adequate resources and effective learning support.",
    "asExplanation": "গু ণগত উন্ন নৰ বাযব দক্ষ মিক্ষক, পযযাপ্ত স্িপদ আৰু ফলপ্ৰসূ মিক্ষণ সৈাৰ প্ৰ য়ােন।"
  },
  {
    "id": 65,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "A modern secondary education policy aims to balance vocational skills, educational equality, scientific\noutlook and character development.\nThis approach is most consistent with:",
    "asQuestion": "এখন আধ্ু নিক মাধ্ যমিক মিক্ষ া নীতিয বৃত্তিমূলক দক্ষ তা, শিক্ষাগত সমতা, হবজ্ঞানিক দৃষি্ট ভংগী আৰু চৰিত্র গঠনৰ মােত সমতা স্থ াপন কৰিবলৈ কচষ্টা কযৰ। এই পিমত সবযাধি্ক কিৈৰ হসযত সাঞি্জসযপূণয?",
    "enOptions": [
      "Examination-centred education",
      "Integrated reform vision of major educational commissions and policies",
      "Memorization-based education",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা",
      "মুখয মিক্ষ াগত আয়াগ আৰু নীতিসমূৈৰ সমিিত সংস্ক াৰমূলক দৃষি্ট ভংগী",
      "মুখস্থভিমিক শিক্ষা",
      "সীমিত পাঠযক্ৰম যিিল"
    ],
    "correctIndex": 1,
    "enExplanation": "The combined educational vision of Mudaliar Commission, Kothari Commission and NPE 1986 promotes\nbalanced development through equality, skills, values and scientific thinking.",
    "asExplanation": "মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু NPE 1986-ৰ সমিিত দৃষি্ট ভংগীয সতিা, দক্ষতা, মূলযযবাধ্ আৰু বৈজ্ঞানিক চিন্তাধ্াৰাৰ েমৰ যত সুষম বিকাশৰ ওপৰত গু ৰুত্ব দিয ।"
  },
  {
    "id": 66,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "A student is unable to choose between science, commerce and vocational courses because he is unaware of\nhis own interests and abilities. Which recommendation of the Mudaliar Commission would best help him?",
    "asQuestion": "এেন শিক্ষাথীয বিজ্ঞান, বাণিেয আৰু বৃত্তিমুখী পাঠযক্ৰ মৰ মােত বাছমন কমৰব পৰা নাই, কাৰণ কতওঁ মনেৰ আগ্ৰহ আৰু সামৰ্থ্য স্িপযকয সযচতন নৈ । মুডালিয়াৰ আয়োগৰ কোন পৰামিযই কতওঁক সবযাধি্ক সৈা কমৰব?",
    "enOptions": [
      "Examination Reform",
      "Guidance and Counselling Service",
      "Multipurpose School Building",
      "Physical Education Programme"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "নিযদযিনা আৰু পৰামিযদান কসো",
      "বহুমুখী বিদযাল ভেন",
      "িাৰীৰিক শিক্ষা কাযযসূচী"
    ],
    "correctIndex": 1,
    "enExplanation": "Guidance services help learners identify their interests, aptitudes and suitable educational or vocational\npathways.",
    "asExplanation": "নিযদযিনায়কসোই শিক্ষার্থীক নিেৰ আগ্ৰহ, কযাগযতা আৰু উপযুক্ত মিক্ষ াগত বা বৃত্তিমুখী পথ চিনাক্ত কৰাত সৈা কযৰ।"
  },
  {
    "id": 67,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "What was the primary objective of the Common School System recommended by the Kothari Commission?",
    "asQuestion": "কোঠাৰী আয়াযগ পৰামিয মদা সাধ্াৰণ বিদযাল বযেস্থাৰ মুখয উযেিয কি আছিল?",
    "enOptions": [
      "To increase private education",
      "To provide equal educational opportunities irrespective of social background",
      "To reduce secondary school enrolment",
      "To promote examination competition"
    ],
    "asOptions": [
      "ব্যক্তি গত মিক্ষ া বৃত্তি কৰা",
      "সামামেক প ভূমি নিবিযযিযষ সমান শিক্ষাৰ সুযযাগ প্ৰ দান কৰা",
      "মাধ্যমিক বিদযাল ত নাভিতিয হ্ৰাস কৰা",
      "পৰীক্ষ ামূলক প্ৰ তিযযাগিতা বৃত্তি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Common School System aimed to reduce educational inequalities and promote social justice.",
    "asExplanation": "সাধ্াৰণ বিদযাল বযেস্থাৰ লক্ষয আছিল শিক্ষাগত অসতিা হ্ৰাস কমৰ সামামেক নযাপ্ৰ তিষ্ঠা কৰা।"
  },
  {
    "id": 68,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "Case:\nA rural school receives additional classrooms, teaching-learning materials and basic educational facilities\nunder a government programme.\nWhich NPE 1986 initiative is reflected here?",
    "asQuestion": "না: এখন গ্ৰাযি বিদযালয চৰকাৰী কাযযসূচীৰ অধ্ীনত অতিৰিক্ত কেণীযকাঠা, মিক্ষণ -মিকন সাগি্ৰী আৰু কমৌলিক শিক্ষাগত সুবিধ্া লাভ কযৰ। ই NPE 1986-ৰ কোন পদযক্ষপক প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Operation Blackboard",
      "Vocationalisation"
    ],
    "asOptions": [
      "সাধ্াৰণ বিদযাল বযেস্থা",
      "কযি অভিজ্ঞতা",
      "অপাযৰচন কেকব'িয",
      "বৃত্তিমুখীকৰণ"
    ],
    "correctIndex": 2,
    "enExplanation": "Operation Blackboard sought to provide minimum essential facilities and resources in schools.",
    "asExplanation": "অপাযৰচন কেকব'িযৰ লক্ষয আছিল বিদযাল সমূৈত নূযনতম প্ৰ য়ােনী সুবিধ্া আৰু স্িপদ নিমিত কৰা।"
  },
  {
    "id": 69,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "A district has achieved universal access to secondary schools, but student achievement levels remain low.\nWhich reform should be given highest priority?",
    "asQuestion": "এখন মেলাই মাধ্যমিক বিদযাল ত সাবযেনীন প্ৰ যেিাধি্কাৰ নিমিত কৰিযছ, কিন্তু শিক্ষাৰ্থীৰ হিকি্ষক সাফলয নি্িন। কোন সংস্কাৰক সবযাধি্ক অগ্ৰাধি্কাৰ দিব লাযগ?",
    "enOptions": [
      "Opening more schools",
      "Improving teacher effectiveness and learning quality",
      "Reducing practical activities",
      "Increasing examination frequency"
    ],
    "asOptions": [
      "অধি্ক বিদযালস্থ াপন",
      "মিক্ষকৰ কাযযদক্ষতা আৰু মিক্ষণৰ গু ণগত মান উন্নত কৰা",
      "বযেৈাৰিক কাযয হ্ৰাস কৰা",
      "পৰীক্ষ াৰ সংখযা বৃত্তি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Once access is achieved, educational quality becomes the key factor for improvement.",
    "asExplanation": "প্ৰ যেিাধি্কাৰ নিমিত কৈাোৰ পিছত শিক্ষাৰ গু ণগত মান উন্নত কৰায়া আ াইতলক গু ৰুত্বপূণয হৈ পযৰ।"
  },
  {
    "id": 70,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "A policy maker wants to design a secondary education system that promotes equality, vocational\ncompetence, democratic citizenship and scientific thinking. Which educational approach is most\nappropriate?",
    "asQuestion": "এেন নীতি নিধ্যাৰযক এযন এখন মাধ্যমিক শিক্ষা বযেস্থা গ়িি তুলিব বিচাযৰ যিয সমতা, বৃত্তিমূলক দক্ষ তা, গণতানি্ত্ৰক নাগৰিকত্ব আৰু বৈজ্ঞানিক চিন্তাধ্াৰা বিকাশ কযৰ। কোন শিক্ষাগত পিমত সবযাধি্ক উপযুক্ত?",
    "enOptions": [
      "Examination-centred model",
      "Integrated reform-based model",
      "Memorization-based model",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষামুখী যিিল",
      "সমিিত সংস্কাৰভিমিক যিিল",
      "মুখস্থভিমিক যিিল",
      "সীমিত পাঠযক্ৰম যিিল"
    ],
    "correctIndex": 1,
    "enExplanation": "The integrated reform model combines the major educational goals promoted by the Mudaliar Commission,\nKothari Commission and NPE 1986.",
    "asExplanation": "সমিিত সংস্কাৰভিমিক যিিলয়াযে মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু NPE 1986-এ আগবয়িাো মুখয শিক্ষাগত লক্ষযসমূৈ একতি্রত কযৰ।"
  },
  {
    "id": 71,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "Case:\nA school evaluates students only through a final annual examination. Students memorize information but\ndemonstrate weak practical skills and poor creativity.\nWhich criticism of the existing secondary education system was identified by the Mudaliar Commission?",
    "asQuestion": "না: এখন বিদযালয শিক্ষার্থীক ককেল বাষিযক চূডান্ত পৰীক্ষাৰ েমৰ যত মূলযা ন কৰা ৈ । শিক্ষাথীসকযল তথয মুখস্থ কযৰ, কিন্তু বযেৈামৰক দক্ষ তা আৰু সৃষি্ট িীলতা দুবযল। মুডালিয়াৰ আয়াযগ বিদযমান মাধ্যমিক শিক্ষা বযেস্থাৰ কোন সমাযলাচনায়া আগব়িাইছিল?",
    "enOptions": [
      "Excessive vocationalisation",
      "Examination-centred education",
      "Excessive co-curricular activities",
      "Overemphasis on creativity"
    ],
    "asOptions": [
      "অত্যাধিক ক বৃত্তিমুখীকৰণ",
      "পৰীক্ষামুখী শিক্ষা",
      "অত্যাধিক সৈ -পাঠযক্ৰম কাযয",
      "সৃষি্ট িীলতাৰ ওপৰত অত্যাধিক ক গু ৰুত্ব"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission strongly criticized an examination-dominated system that encouraged rote learning and\nneglected holistic development.",
    "asExplanation": "আয়াযগ এযন পৰীক্ষ াযকমিক বযেস্থ াৰ সমাযলাচনায়কৰিছিল যিয মুখস্থ বিদযাৰ প্ৰ েণতা বৃত্তি কৰিছিল আৰু সবযাঙ্গীন বিকাশ উপেক্ষা কৰিছিল।"
  },
  {
    "id": 72,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "Assertion (A):\nThe Kothari Commission considered education an important instrument for national integration.\nReason (R):\nEducation can promote common values, social cohesion and national unity.",
    "asQuestion": "উকি্ত ( A): কোঠাৰী আয়াযগ শিক্ষাক জাতীয় সংহতিৰ এক গু ৰুত্বপূণয উপা বুমল গণয কৰিছিল। কাৰণ (R): শিক্ষাই সাধ্াৰণ মূলযযবাধ্, সামামেক সংহতি আৰু জাতীয় ঐকয গ়িি তুমলব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed education could unite diverse groups and strengthen national identity.",
    "asExplanation": "আয়াগৰ যিত শিক্ষা বিভিন্ন কগা ক একতি্রত কমৰ জাতীয় পমৰচ আৰু সংহতি শক্তিশালী কমৰব পাযৰ।"
  },
  {
    "id": 73,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "Which measure would most effectively improve educational quality according to the spirit of NPE 1986?",
    "asQuestion": "NPE 1986-ৰ মূল দৃষি্ট ভংগী অনুসমৰ মিক্ষ াৰ গু ণগত মান উন্ন ত কৰাৰ বাযব কোন বযেস্থ ায়া সবযাধি্ ক ফলপ্ৰ সূ?",
    "enOptions": [
      "Increasing examination pressure",
      "Improving teacher preparation and learning resources",
      "Reducing educational access",
      "Limiting science education"
    ],
    "asOptions": [
      "পৰীক্ষ াৰ চাপ বৃত্তি",
      "মিক্ষক প্ৰস্তু মত আৰু মিক্ষণ স্িপদ উন্নত কৰা",
      "শিক্ষাৰ সুযযাগ সীমিত কৰা",
      "বিজ্ঞান শিক্ষা সীমিত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "NPE 1986 emphasized teacher development, learning resources and quality improvement measures.",
    "asExplanation": "NPE 1986-এ মিক্ষক উন্ন ন, মিক্ষণ স্িপদ আৰু গু ণগত উন্ন নৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 74,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "A region experiences rapid industrial growth but schools continue to provide only traditional academic\neducation. What is the most likely consequence?",
    "asQuestion": "এ া অঞ্চলত দ্ৰু ত ঔযদযাগিক বিকাশ টিযছ, কিন্তু বিদযাল সমূযৈ ককেল পৰ্িপৰাগত একাযিমিক শিক্ষা প্ৰ দান কমৰ আযছ। স্িভােয ফলাফল কি ৈ 'ব?",
    "enOptions": [
      "Better employment matching",
      "Increased gap between education and employment",
      "Greater vocational competence",
      "Reduction in skill shortages"
    ],
    "asOptions": [
      "কযিসংস্থাপনৰ হসযত উন্নত সাঞি্জসয",
      "মিক্ষ া আৰু কযিসংস্থ াপনৰ মােৰ বযেধ্ ান বৃত্তি",
      "অধি্ ক বৃত্তিমূলক দক্ষ তা",
      "দক্ষতাৰা মত হ্ৰাস"
    ],
    "correctIndex": 1,
    "enExplanation": "Without vocational orientation, education may fail to meet labour market needs.",
    "asExplanation": "বৃত্তিমুখী মিক্ষ া অবিৈযন মিক্ষ া বযেস্থ াই কযিবোৰৰ প্ৰ য়ােন পূৰণ কৰিব কনাোযৰ।"
  },
  {
    "id": 75,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "A state wants to develop a future-ready secondary education system. Which combination of priorities best\nreflects the collective recommendations of Unit I?",
    "asQuestion": "এখন ৰােযই ভমেষযৎমুখী মাধ্যমিক শিক্ষা বযেস্থা গ়িি তুলিব বিচাযৰ। কোন অগ্ৰাধি্কাৰসমূৈৰ সমিয Unit I-ৰ সামূমৈক পৰামিযসমূৈ সবযাধি্ক প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Examination success + Memorization",
      "Equality + Quality + Vocational Skills + Democratic Values + Scientific Outlook",
      "Restricted curriculum + Centralized testing",
      "Academic achievement only"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা + মুখস্থ বিদযা",
      "সতিা + গু ণগত মান + বৃত্তিমূলক দক্ষ তা + গণতানি্ত্ৰ ক মূলযযবাধ্ + হবজ্ঞানিক দৃষি্ট ভংগী",
      "সীমিত পাঠযক্ৰম + ককিী পৰীক্ষা",
      "ককেল একাযিমিক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major educational reforms in Unit I consistently emphasize quality, equality, vocational competence,\ndemocratic citizenship and scientific thinking.",
    "asExplanation": "Unit I-ৰ মুখয শিক্ষাগত সংস্কাৰসমূযৈ গু ণগত শিক্ষা, সতিা, বৃত্তিমূলক দক্ষ তা, গণতানি্ত্ৰক নাগৰিকত্ব আৰু বৈজ্ঞানিক চিন্তাধ্াৰাৰ ওপৰত সমান গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 76,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "A school introduces student self-government, community service projects and leadership camps. Which\ncombined aim of secondary education is most strongly promoted?",
    "asQuestion": "এখন বিদযালয শিক্ষাৰ্থী স্ব -িাসন, সমােযসো প্ৰ কল্প আৰু নেতৃত্ব মিবিৰ আৰ্িভ কৰিযছ। ই াৰ দ্ব াৰা মাধ্ যমিক শিক্ষাৰ কোন সমিিত লক্ষয সবযাধি্ক বিকমিত ৈ?",
    "enOptions": [
      "Examination success and memorization",
      "Democratic citizenship and leadership",
      "Technical specialization only",
      "University admission preparation"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা আৰু মুখস্থ বিদযা",
      "গণতানি্ত্ৰ ক নাগৰিকত্ব আৰু নেতৃত্ব",
      "ককেল কাৰিকৰী বিযিষজ্ঞতা",
      "বিশ্ববিদ্যালয় ত ভতিযৰ প্ৰস্তু তি"
    ],
    "correctIndex": 1,
    "enExplanation": "These activities help students develop civic responsibility, cooperation, initiative and leadership qualities.",
    "asExplanation": "এই কাযযসূচীযবাযৰ শিক্ষাৰ্থীৰ নাগৰিক দাম ত্ব যবাধ্, সৈযযাগিতা, উযদযাগ আৰু নেতৃত্ব ৰ গু ণ বিকাশ কযৰ।"
  },
  {
    "id": 77,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "Case:\nA school offers only one academic stream to all learners regardless of aptitude, interest or future career\nplans.\nWhich recommendation of the Mudaliar Commission is being ignored?",
    "asQuestion": "না: এখন বিদযালয সকযলা শিক্ষার্থীক কতওঁযলাকৰ কযাগযতা, আগ্ৰহ বা ভমেষযৎ কপছাগত লক্ষয নিবিযযিযষ এযক একাযিমিক ধ্ াৰা প্ৰ দান কৰা ৈ । মুডালিয়াৰ আয়োগৰ কোন পৰামিযয়া উপেক্ষা কৰা হৈছে?",
    "enOptions": [
      "Guidance Service",
      "Diversified Curriculum",
      "Physical Education",
      "Examination Reform"
    ],
    "asOptions": [
      "নিযদযিনায়কসো",
      "হবচিত্রম পাঠযক্ৰম",
      "িাৰীৰিক শিক্ষা",
      "পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission recommended diversified curricula to accommodate individual differences and varied\ncareer aspirations.",
    "asExplanation": "আয়াযগ বযকি্তগত পার্থক্য আৰু ভিন্ন কপছাগত লক্ষয পূৰণৰ বাযব হবচিত্রম পাঠযক্ৰমৰ পৰামিয দিছিল।"
  },
  {
    "id": 78,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "Assertion (A):\nEducational equality was considered essential by the Kothari Commission.\nReason (R):\nEducational inequality can weaken social justice and national integration.",
    "asQuestion": "উকি্ত ( A): কোঠাৰী আয়াযগ শিক্ষাগত সতিাক অতযােিযক বুমল গণয কৰিছিল। কাৰণ (R): শিক্ষাগত অসতিাই সামামেক নযা আৰু জাতীয় সংহতি দুবযল কৰিব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission linked equality of educational opportunity with social justice and national development.",
    "asExplanation": "আয়াযগ শিক্ষাগত সতিাক সামামেক নযা আৰু জাতীয় বিকাশৰ হসযত স্িপকিযত কৰিছিল।"
  },
  {
    "id": 79,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "Why is teacher education considered a critical component of educational reform?",
    "asQuestion": "শিক্ষাগত সংস্কাৰৰ কক্ষত্রত মিক্ষক শিক্ষাক কি এক গু ৰুত্বপূণয উপাদান বুমল গণয কৰা ৈ?",
    "enOptions": [
      "Teachers determine educational quality and learning outcomes",
      "Teachers reduce curriculum flexibility",
      "Teachers replace educational planning",
      "Teachers eliminate educational equality"
    ],
    "asOptions": [
      "মিক্ষযক শিক্ষাৰ গু ণগত মান আৰু মিক্ষণ ফলাফল নিধ্যাৰণ কযৰ",
      "মিক্ষযক পাঠযক্ৰমৰ ননিী তা হ্ৰাস কযৰ",
      "মিক্ষযক শিক্ষাগত পৰিকল্পনাৰ বিকল্প ৈ",
      "মিক্ষযক শিক্ষাগত সতিা বিযলাপ কযৰ"
    ],
    "correctIndex": 0,
    "enExplanation": "Effective teachers are essential for curriculum implementation, student learning and educational quality\nimprovement.",
    "asExplanation": "কাযযকৰী মিক্ষকসকল পাঠযক্ৰম ৰূপা ণ, মিক্ষ ণ উন্ন ন আৰু মিক্ষ াৰ গু ণগত মান বৃত্তিৰ বাযব অতযন্ত প্ৰ য়ােনী ।"
  },
  {
    "id": 80,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "A future secondary education model seeks to promote equality, employability, scientific thinking,\ndemocratic values and character development. Which educational tradition best supports this vision?",
    "asQuestion": "এখন ভমেষযৎমুখী মাধ্যমিক শিক্ষা যিিযল সতিা, কযযিাপযযাগিতা, বৈজ্ঞানিক চিন্তাধ্াৰা, গণতানি্ত্ৰক মূলযযবাধ্ আৰু চৰিত্র গঠনৰ বিকাশ াব বিচাযৰ। কোন মিক্ষ াগত ধ্ াৰণাই এই দৃষি্ট ভংগীক সবযাধি্ ক সথিযন কযৰ?",
    "enOptions": [
      "Examination-centred tradition",
      "Integrated reform tradition of major educational commissions",
      "Memorization-centred tradition",
      "Restricted curriculum tradition"
    ],
    "asOptions": [
      "পৰীক্ষামুখী ধ্ াৰণা",
      "মুখয শিক্ষাগত আয়াগসমূৈৰ সমিিত সংস্কাৰমূলক ধ্ াৰণা",
      "মুখস্থভিমিক ধ্ াৰণা",
      "সীমিত পাঠযক্ৰমিভমিক ধ্ াৰণা"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective vision of Unit I reforms emphasizes balanced development through quality, equality,\nvocational competence and democratic values.",
    "asExplanation": "Unit I-ৰ সংস্কাৰসমূযৈ গু ণগত শিক্ষা, সতিা, বৃত্তিমূলক দক্ষ তা আৰু গণতানি্ত্ৰ ক মূলযযবাধ্ ৰ েমৰ যত সুষম বিকাশৰ ওপৰত গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 81,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "Case:\nA secondary school produces excellent examination results, but most graduates struggle to obtain\nemployment because they lack practical occupational skills.\nWhich aim of secondary education has been neglected?",
    "asQuestion": "না: এখন মাধ্ যমিক বিদযালয উৎকৃষ্ট পৰীক্ষ াৰ ফলাফল লাভ কযৰ, কিন্তু অধি্কাংি শিক্ষাথীয বযেৈাৰিক কপছাগত দক্ষতাৰ অভাৱত কযিসংস্থান লাভ কৰাত অসুবিধ্া পা । মাধ্যমিক শিক্ষাৰ কোন লক্ষযয়া উপেক্ষা কৰা হৈছে?",
    "enOptions": [
      "Democratic Citizenship",
      "Vocational Efficiency",
      "Cultural Development",
      "Physical Education"
    ],
    "asOptions": [
      "গণতানি্ত্ৰক নাগৰিকত্ব",
      "বৃত্তিমূলক দক্ষ তা",
      "সাংস্কৃ তিক বিকাশ",
      "িাৰীৰিক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized vocational efficiency to ensure that education prepares learners for\nproductive work and self-reliance.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ বৃত্তিমূলক দক্ষ তাৰ ওপৰত গু ৰুত্ব দিছিল যাযত মিক্ষ া মিক্ষ াথীক উৎপাদনিীল কযি আৰু আত্মিনভযৰিীলতাৰ বাযব প্ৰস্তু ত কযৰ।"
  },
  {
    "id": 82,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "What was the major educational significance of the 10+2+3 structure recommended by the Kothari\nCommission?",
    "asQuestion": "কোঠাৰী আয়াযগ পৰামিয মদা ১০+২+৩ গাঁথনিৰ মুখয শিক্ষাগত গু ৰুত্ব কি আছিল?",
    "enOptions": [
      "It reduced access to higher education.",
      "It introduced a uniform national educational pattern.",
      "It abolished vocational education.",
      "It focused only on examinations."
    ],
    "asOptions": [
      "ই উচ্চ শিক্ষাৰ সুযযাগ হ্ৰাস কৰিছিল।",
      "ই এক একীভূত জাতীয় শিক্ষা গাঁথনি প্ৰ েতযন কৰিছিল।",
      "ই বৃত্তিমুখী মিক্ষ া বিযলাপ কৰিছিল।",
      "ই ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব দিছিল।"
    ],
    "correctIndex": 1,
    "enExplanation": "The 10+2+3 pattern helped standardize educational stages across India and facilitated educational planning.",
    "asExplanation": "১০+২+৩ গাঁথনিয ভাৰতেুমৰ শিক্ষা পযযা সমূৈ একীভূত কমৰ শিক্ষাগত পমৰকল্পনা সৈে কমৰ তুলিছিল।"
  },
  {
    "id": 83,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "Case:\nA government introduces special scholarships, hostels and educational support programmes for\ndisadvantaged students.\nWhich objective of NPE 1986 is primarily reflected?",
    "asQuestion": "না: এখন চৰকাৰে বঞি্চ ত মিক্ষ াথীৰ বাযব বিযিষ বৃত্তি, আবাস আৰু শিক্ষাগত সৈা কাযযসূচী আৰ্িভ কৰিযছ। ই NPE 1986-ৰ কোন মুখয উযেিযক সবযাধি্ক প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Educational Equality",
      "Examination Reform",
      "Administrative Control",
      "Curriculum Reduction"
    ],
    "asOptions": [
      "শিক্ষাগত সতিা",
      "পৰীক্ষা সংস্কাৰ",
      "প্ৰশাসনিক মন ন্ত্ৰ ণ",
      "পাঠযক্ৰম হ্ৰাস"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 emphasized equal educational opportunities, especially for disadvantaged and underrepresented\ngroups.",
    "asExplanation": "NPE 1986-এ বিযিষলক বঞি্চত আৰু পিছপৰা কগা সমূৈৰ বাযব সমান শিক্ষাৰ সুযোগৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 84,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "A remote area in Assam has school buildings but lacks qualified teachers and learning resources. Which\nchallenge does this situation best represent?",
    "asQuestion": "অসমৰ এ া দূৰেতী অঞ্চলত বিদযাল ভেন আযছ, কিন্তু দক্ষ মিক্ষক আৰু মিক্ষণ স্িপদৰ অভাৱ আযছ। এই অেস্থাই কোন সসিযাক সবযাধি্ক স্পষ্ট ভাযে প্ৰ তিফলিত কযৰ?",
    "enOptions": [
      "Lack of educational demand",
      "Inequality in educational quality",
      "Excessive vocationalisation",
      "Overdevelopment of infrastructure"
    ],
    "asOptions": [
      "শিক্ষাৰ প্ৰ মত চামৈদাৰ অভাৱ",
      "শিক্ষাৰ গু ণগত মানৰ অসতিা",
      "অত্যাধিক ক বৃত্তিমুখীকৰণ",
      "আন্তঃগাঁথনিৰ অত্যাধিক উন্ন ন"
    ],
    "correctIndex": 1,
    "enExplanation": "Access alone is insufficient; quality educational resources are necessary for meaningful learning.",
    "asExplanation": "ককেল বিদযাল ৰ উপসি্থমত যযথষ্ট নৈ ; গু ণগত শিক্ষা নিমিত কৰিবলৈ উপযুক্ত স্িপদ আৰু দক্ষ মিক্ষক প্ৰ য়ােন।"
  },
  {
    "id": 85,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "If a state seeks to achieve educational quality, equality, employability, democratic citizenship and national\ndevelopment simultaneously, which strategy would be most appropriate?",
    "asQuestion": "এখন ৰােযই এযক সম যত গু ণগত শিক্ষা, সতিা, কযযিাপযযাগিতা, গণতানি্ত্ৰক নাগৰিকত্ব আৰু জাতীয় উন্ন ন লাভ কৰিব বিচাযৰ। কোন ককৌিলয়া সবযাধি্ক উপযুক্ত?",
    "enOptions": [
      "Examination-centred educational model",
      "Integrated reform-based educational system",
      "Memorization-oriented curriculum",
      "Restricted educational access"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা যিিল",
      "সমিিত সংস্কাৰভিমিক শিক্ষা বযেস্থা",
      "মুখস্থভিমিক পাঠযক্ৰম",
      "শিক্ষাৰ সুযযাগ সীমিতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "An integrated reform approach combines the major recommendations of the Mudaliar Commission, Kothari\nCommission and NPE 1986.",
    "asExplanation": "সমিিত সংস্কাৰভিমিক পিতিয মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু NPE 1986-ৰ মুখয পৰামিযসমূৈ একতি্রত কযৰ।"
  },
  {
    "id": 86,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "A school achieves excellent academic results but frequently faces issues of dishonesty, indiscipline and lack\nof social responsibility among students.\nWhich aim of secondary education requires greater emphasis?",
    "asQuestion": "এখন বিদযালয উৎকৃষ্ট একাযিমিক ফলাফল লাভ কৰা ৈ, কিন্তু শিক্ষাৰ্থীৰ মােত অসততা, অনুিাসনৈীনতা আৰু সামামেক দাম ত্ব যবাধ্ৰ অভাৱ কদখা যা । মাধ্যমিক শিক্ষাৰ কোন লক্ষযৰ ওপৰত অধি্ক গু ৰুত্ব মদাৰ প্ৰ য়ােন?",
    "enOptions": [
      "Examination Success",
      "Character Formation",
      "University Admission",
      "Curriculum Expansion"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা",
      "চৰিত্র গঠন",
      "বিশ্ববিদ্যালয় ত ভতিয",
      "পাঠযক্ৰম স্িপ্ৰসাৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized character formation to develop honesty, responsibility, discipline\nand moral values.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ সততা, দাম ত্ব যবাধ্, িৃংখলা আৰু হনতিক মূলযযবাধ্ বিকাশৰ বাযব চৰিত্র গঠনৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 87,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "Why did the Kothari Commission describe education as the most powerful instrument of national\ndevelopment?",
    "asQuestion": "কোঠাৰী আয়াযগ শিক্ষাক জাতীয় উন্ন নৰ আ াইতলক শক্তিশালী উপা বুমল কি বণযনায়কৰিছিল?",
    "enOptions": [
      "Education reduces the need for planning",
      "Education develops human resources and promotes social progress",
      "Education eliminates cultural diversity",
      "Education replaces economic policy"
    ],
    "asOptions": [
      "শিক্ষা পৰিকল্পনাৰ প্ৰ য়ােন হ্ৰাস কযৰ",
      "শিক্ষা মানে স্িপদ গ়িি কতাযল আৰু সামামেক অগ্ৰগতি সাধ্ন কযৰ",
      "মিক্ষ া সাংস্কৃ তিক হবচিত্র য বিযলাপ কযৰ",
      "শিক্ষা অৰ্থনৈতিক নীতিৰ বিকল্প ৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission believed that education contributes directly to economic growth, social transformation and\nnational integration.",
    "asExplanation": "আয়াগৰ যিত শিক্ষা অৰ্থনৈতিক বিকাশ, সামামেক পৰিেতযন আৰু জাতীয় সংৈতিত প্ৰ তযক্ষভাযে অেদান ৰাযখ।"
  },
  {
    "id": 88,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "Assertion (A):\nTeacher education was given high priority in NPE 1986.\nReason (R):\nTeachers play a central role in improving educational quality.",
    "asQuestion": "উকি্ত ( A): NPE 1986-এ মিক্ষক শিক্ষাক উচ্চ অগ্ৰাধি্কাৰ দিছিল। কাৰণ (R): শিক্ষাৰ গু ণগত মান উন্নত কৰাত মিক্ষযক ককিী ভূমিকা পালন কযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 recognized that educational quality depends greatly on professionally competent teachers.",
    "asExplanation": "NPE 1986-এ স্ব ীকাৰ কৰিছিল কয শিক্ষাৰ গু ণগত মান দক্ষ আৰু সু -প্ৰমিকি্ষত মিক্ষকৰ ওপৰত নিভযৰ কযৰ।"
  },
  {
    "id": 89,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "Case:\nA state has many educated unemployed youth because school education remains largely theoretical and\ndisconnected from labour market needs.\nWhich educational reform would most effectively address this issue?",
    "asQuestion": "না: এখন ৰােযত বহু মিকি্ষত নিবনুো যুেক আযছ, কাৰণ বিদযাল শিক্ষা অধি্কাংি কক্ষত্রযত তামিক আৰু কযিবোৰৰ প্ৰ য়ােনৰ হসযত সংযুক্ত নৈ । কোন শিক্ষাগত সংস্কাযৰ এই সসিযাৰ সবযাধি্ক ফলপ্ৰসূ সমাধ্ান দিব?",
    "enOptions": [
      "Increasing written examinations",
      "Vocationalisation of education",
      "Reducing practical training",
      "Limiting technical subjects"
    ],
    "asOptions": [
      "লিখিত পৰীক্ষ া বৃত্তি",
      "মিক্ষ াৰ বৃত্তিমুখীকৰণ",
      "বযেৈাৰিক প্ৰ মিক্ষণ হ্ৰাস",
      "কাৰিকৰী বিষ সীমিতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation connects education with practical skills and employment opportunities.",
    "asExplanation": "বৃত্তিমুখীকৰযণ মিক্ষ াক বযেৈাৰিক দক্ষ তা আৰু কযিসংস্থ াপনৰ সুযোগৰ হসযত সংযযাগ কযৰ।"
  },
  {
    "id": 90,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "Which educational transformation strategy would most effectively realize the collective vision of the\nMudaliar Commission, Kothari Commission and NPE 1986?",
    "asQuestion": "মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু NPE 1986-ৰ সামূমৈক দৃষি্ট ভংগী সবযাধি্ ক সফলভাযে বাস্ত োম ত কৰিবলৈ কোন শিক্ষাগত ৰূপান্তৰ ককৌিল উপযুক্ত?",
    "enOptions": [
      "Examination-centred education",
      "Quality education with equality, vocational competence, democratic values and scientific outlook",
      "Memorization-based learning",
      "Restricted educational opportunities"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা",
      "গু ণগত শিক্ষা, সতিা, বৃত্তিমূলক দক্ষ তা, গণতানি্ত্ৰ ক মূলযযবাধ্ আৰু হবজ্ঞানিক দৃষি্ট ভংগী",
      "মুখস্থভিমিক মিক্ষণ",
      "সীমিত শিক্ষাগত সুযযাগ"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective reform vision emphasizes quality, equality, vocational relevance, democratic citizenship and\nscientific thinking.",
    "asExplanation": "সামূমৈক সংস্ক াৰমূলক দৃষি্ট ভংগীযগু ণগত মিক্ষ া, সতিা, বৃত্তিমূলক প্ৰাসংগিকতা, গণতানি্ত্ৰক নাগৰিকত্ব আৰু বৈজ্ঞানিক চিন্তাধ্াৰাৰ ওপৰত গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 91,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Which aim of secondary education proposed by the Mudaliar Commission is most directly related to\npreparing students for responsible participation in public life?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ প্ৰস্তাে কৰা মাধ্যমিক শিক্ষাৰ কোন লক্ষযয়া েনেীেনত দাম ত্ব িীল অংিগ্ৰৈণৰ বাযব শিক্ষার্থীক প্ৰস্তু ত কৰাৰ হসযত সবযাধি্ক স্িপকিযত?",
    "enOptions": [
      "Vocational Efficiency",
      "Democratic Citizenship",
      "Physical Development",
      "Cultural Recreation"
    ],
    "asOptions": [
      "বৃত্তিমূলক দক্ষ তা",
      "গণতানি্ত্ৰক নাগৰিকত্ব",
      "িাৰীৰিক বিকাশ",
      "সাংস্কৃ তিক অেসৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "Democratic citizenship develops civic responsibility, social awareness and participation in democratic\ninstitutions.",
    "asExplanation": "গণতানি্ত্ৰক নাগৰিকযত্ব নাগৰিক দাম ত্ব যবাধ্, সামামেক সযচতনতা আৰু গণতানি্ত্ৰক প্ৰ তিষ্ঠানত অংিগ্ৰৈণৰ গু ণ বিকাশ কযৰ।"
  },
  {
    "id": 92,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Case:\nTwo students possess equal ability and motivation. One receives excellent educational opportunities while\nthe other faces severe educational disadvantages due to social background.\nAccording to the Kothari Commission, what principle is being violated?",
    "asQuestion": "না: দুেন মিক্ষ াথীৰ কযাগযতা আৰু কপ্ৰ ৰণা সমান। এেযন উৎকৃষ্ট মিক্ষ াগত সুযযাগ লাভ কমৰযছ, আনৈাযত আনেন সামামেক প ভূমিৰ বাযব বঞি্চত হৈছে। কোঠাৰী আয়োগৰ যিত কোন নীতিয়া লমিত হৈছে?",
    "enOptions": [
      "Vocational Efficiency",
      "Equality of Educational Opportunity",
      "Work Experience",
      "Examination Reform"
    ],
    "asOptions": [
      "বৃত্তিমূলক দক্ষ তা",
      "শিক্ষাৰ সমান সুযযাগ",
      "কযি অভিজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission strongly advocated equal educational opportunities regardless of social or economic\nbackground.",
    "asExplanation": "আয়াযগ সামামেক বা আথিযক প ভূমি নিবিযযিযষ সমান শিক্ষাৰ সুযোগৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 93,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Why did NPE 1986 emphasize science, technology and modernization in education?",
    "asQuestion": "NPE 1986-এ শিক্ষাত বিজ্ঞান, প্ৰ যুকি্ত আৰু আধ্ুনিকীকৰণৰ ওপৰত কিগু ৰুত্ব আযৰাপ কৰিছিল?",
    "enOptions": [
      "To reduce educational opportunities",
      "To prepare citizens for national development and technological progress",
      "To eliminate traditional values completely",
      "To replace teachers with machines"
    ],
    "asOptions": [
      "শিক্ষাৰ সুযযাগ হ্ৰাস কৰিবলৈ",
      "জাতীয় উন্ন ন আৰু প্ৰ যুকি্তগত অগ্ৰগতিৰ বাযব নাগৰিকক প্ৰস্তু ত কৰিবলৈ",
      "পৰ্িপ ৰাগত মূলযযবাধ্ স্িপূ ণযৰূযপ বিযলাপ কৰিবলৈ",
      "মিক্ষকৰ পৰিেযতয যন্ত্ৰ বযেৈাৰ কৰিবলৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "Scientific and technological advancement was viewed as essential for national progress and modernization.",
    "asExplanation": "বৈজ্ঞানিক আৰু প্ৰ যুকি্তগত অগ্ৰগতিক জাতীয় উন্ন ন আৰু আধ্ুনিকীকৰণৰ বাযব অতযােিযক বুমল গণয কৰা হৈছিল।"
  },
  {
    "id": 94,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "A district has adequate school buildings and enrolment, but learning achievement remains poor. Which\nintervention should receive highest priority?",
    "asQuestion": "এখন মেলাত বিদযাল ভেন আৰু নাভিতিয যযথষ্ট আযছ, কিন্তু মিক্ষণ সাফলয নি্িন। কোন ৈস্তযক্ষপক সবযাধি্ক অগ্ৰাধি্কাৰ দিব লাযগ?",
    "enOptions": [
      "Construction of additional buildings",
      "Improvement of teaching quality and learning resources",
      "Reduction of school hours",
      "Limiting admissions"
    ],
    "asOptions": [
      "অতিৰিক্ত ভেন নিযিাণ",
      "শিক্ষাদানৰ গু ণগত মান আৰু মিক্ষণ স্িপদ উন্নত কৰা",
      "বিদযাল সহি্ৰাস",
      "নাভিমতয সীমিত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Once access is available, educational quality becomes the key determinant of student achievement.",
    "asExplanation": "প্ৰ যেিাধি্কাৰ নিমিত কৈাোৰ পিছত শিক্ষাৰ গু ণগত মাযনই শিক্ষাৰ্থীৰ সাফলযৰ মূল নিধ্যাৰক ৈ ।"
  },
  {
    "id": 95,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Which educational vision best reflects the combined philosophy of the Mudaliar Commission, Kothari\nCommission and National Policy on Education (1986)?",
    "asQuestion": "মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ আৰু ৰাষ্ট্ৰীয়য় শিক্ষা নীতি (১৯৮৬) -ৰ সমিিত দিযনক কোন শিক্ষাগত দৃষি্ট ভংগীয সবযাধি্ ক সঠিকভাযে প্ৰ তিফমলত কযৰ?",
    "enOptions": [
      "Education focused mainly on examinations",
      "Education for quality, equality, employability, democratic citizenship and national development",
      "Education limited to academic achievement",
      "Education based primarily on memorization"
    ],
    "asOptions": [
      "ককেল পৰীক্ষামুখী শিক্ষা",
      "গু ণগত শিক্ষা, সতিা, কযযিাপযযাগিতা, গণতানি্ত্ৰক নাগৰিকত্ব আৰু জাতীয় উন্ন নৰ বাযব শিক্ষা",
      "ককেল একাযিমিক সফলতাভিমিক শিক্ষা",
      "মুখস্থভিমিক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective reform agenda emphasized holistic development through quality education, equality,\nvocational competence and democratic values.",
    "asExplanation": "সামূমৈক সংস্কাৰসূচীযগু ণগত শিক্ষা, সতিা, বৃত্তিমূলক দক্ষ তা আৰু গণতানি্ত্ৰ ক মূলযযবাধ্ ৰ েমৰ যত সবযাঙ্গ ীন বিকাশৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 96,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Which combination best represents the major aims of secondary education recommended by the Mudaliar\nCommission?",
    "asQuestion": "মুডালিয়াৰ আয়াযগ পৰামিয মদা মাধ্যমিক শিক্ষাৰ মুখয লক্ষযসমূৈৰ সবযাধি্ক উপযুক্ত সমি কোনয়া?",
    "enOptions": [
      "Memorization, Competition and Examination Success",
      "Democratic Citizenship, Vocational Efficiency, Character Formation and Leadership",
      "Administrative Control, Uniformity and Restriction",
      "Academic Achievement Only"
    ],
    "asOptions": [
      "মুখস্থ বিদযা, প্ৰ তিযযাগিতা আৰু পৰীক্ষাত সফলতা",
      "গণতানি্ত্ৰক নাগৰিকত্ব, বৃত্তিমূলক দক্ষ তা, চৰিত্র গঠন আৰু নেতৃত্ব",
      "প্ৰশাসনিক মন ন্ত্ৰ ণ, একৰূপতা আৰু সীমাবিতা",
      "ককেল একাযিমিক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized balanced development through citizenship, character, leadership and\nvocational efficiency.",
    "asExplanation": "মুডালিয়াৰ আয়াযগ নাগমৰকত্ব, চমৰত্র, নেতৃত্ব আৰু বৃত্তিমূলক দক্ষ তাৰ েমৰ যত সুষম বিকাশৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 97,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Assertion (A):\n\n\n\nThe Kothari Commission emphasized educational planning at the national level.\nReason (R):\nEducation was viewed as a key instrument for national development and social transformation.",
    "asQuestion": "উকি্ত ( A): কোঠাৰী আয়াযগ জাতীয় পযযা ত শিক্ষাগত পৰিকল্পনাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল। কাৰণ (R): শিক্ষাক জাতীয় উন্ন ন আৰু সামামেক পৰিেতযনৰ এক মুখয উপা মৈচাযপ গণয কৰা হৈছিল।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয়া া সতয আৰু R হৈছে A-ৰ সঠিক ব্যাখ্যা",
      "A আৰু R দুয়া া সতয কিন্তু R হৈছে A-ৰ সঠিক ব্যাখ্যা নৈ",
      "A সতয কিন্তু R অসতয",
      "A অসতয কিন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission advocated systematic educational planning because education was considered essential for\nnational progress.",
    "asExplanation": "আয়াযগ সুসংগঠিত শিক্ষাগত পৰিকল্পনাৰ পৰামিয দিছিল, কাৰণ শিক্ষা জাতীয় অগ্ৰগতিত ককিী ভূমিকা পালন কযৰ বুমল গণয কৰা হৈছিল।"
  },
  {
    "id": 98,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Which educational approach is most consistent with the long-term vision of NPE 1986?",
    "asQuestion": "NPE 1986-ৰ দী য যিাদী দৃষি্ট ভংগীৰ হসযত কোন মিক্ষ াগত পিমত সবযাধি্ ক সাঞি্জ সযপূণয?",
    "enOptions": [
      "Examination-centred learning",
      "Quality education with equality, modernization and social justice",
      "Memorization-based instruction",
      "Restricted educational opportunities"
    ],
    "asOptions": [
      "পৰীক্ষামুখী মিক্ষণ",
      "গু ণগত শিক্ষা, সতিা, আধুনিকীকৰণ আৰু সামামেক নযা",
      "মুখস্থভিমিক শিক্ষা",
      "সীমিত শিক্ষাগত সুযযাগ"
    ],
    "correctIndex": 1,
    "enExplanation": "NPE 1986 promoted quality, equality, modernization, teacher development and social justice.",
    "asExplanation": "NPE 1986-এ গু ণগত শিক্ষা, সতিা, আধুনিকীকৰণ, মিক্ষক উন্ন ন আৰু সামামেক নযাৰ ওপৰত গু ৰুত্ব আযৰাপ কৰিছিল।"
  },
  {
    "id": 99,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Case:\nAssam has expanded access to secondary education, but disparities remain between urban and rural schools\nin teacher availability and learning resources.\n\n\n\nWhich challenge requires the greatest attention?",
    "asQuestion": "না: অসমত মাধ্ যমিক মিক্ষ াৰ সুযযাগ বৃত্তি পাইযছ, কিন্তু নগৰ আৰু গ্ৰাযি বিদযাল সমূৈৰ মােত মিক্ষক আৰু মিক্ষণ স্িপদৰ কক্ষত্রত বৈষ্িয বিদযমান। কোন সসিযায়াক সবযাধি্ক অগ্ৰাধি্কাৰ দিব লাযগ?",
    "enOptions": [
      "Restricting enrolment",
      "Ensuring educational quality and equity",
      "Reducing science education",
      "Increasing examination pressure"
    ],
    "asOptions": [
      "নাভিমতয সীমিত কৰা",
      "শিক্ষাৰ গু ণগত মান আৰু সতিা নিমিত কৰা",
      "বিজ্ঞান শিক্ষা হ্ৰাস কৰা",
      "পৰীক্ষ াৰ চাপ বৃত্তি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major challenge is ensuring equitable quality education across all regions.",
    "asExplanation": "মুখয সসিযা হৈছে সকযলা অঞ্চলত সতিাভিমিক গু ণগত শিক্ষা নিমিত কৰা।"
  },
  {
    "id": 100,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "A nation seeks to build a secondary education system that promotes democratic citizenship, vocational\ncompetence, educational equality, scientific temper, social justice and national development.\nThis vision is best described as:",
    "asQuestion": "এখন োতিয এযন মাধ্যমিক শিক্ষা বযেস্থা গ়িি তুমলব বিচাযৰ যিয গণতানি্ত্ৰক নাগৰিকত্ব, বৃত্তিমূলক দক্ষ তা, শিক্ষাগত সতিা, বৈজ্ঞানিক যিনাভাে, সামামেক নযা আৰু জাতীয় উন্ন নক উৎসামৈত কযৰ। এই দৃষি্ট ভংগীক সবযাধি্ ক উপযুক্ত ভাযে কি বুমল বণযনায়কৰিব পাৰি?",
    "enOptions": [
      "Examination-centred educational model",
      "Integrated educational reform model",
      "Memorization-based educational model",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষামুখী শিক্ষা যিিল",
      "সমিিত শিক্ষাগত সংস্কাৰ যিিল",
      "মুখস্থভিমিক শিক্ষা যিিল",
      "সীমিত পাঠযক্ৰম যিিল"
    ],
    "correctIndex": 1,
    "enExplanation": "This integrated vision combines the major recommendations of the Mudaliar Commission, Kothari\nCommission, NPE 1986 and modern educational reforms.",
    "asExplanation": "এই সমিিত দৃষি্ট ভংগীয মুডালিয়াৰ আয়োগ, কোঠাৰী আয়োগ, NPE 1986 আৰু আধ্ুনিক শিক্ষাগত সংস্কাৰৰ মুখয পৰামিযসমূৈ একতি্রত কযৰ।"
  }
];

export default function MCQPage() {
  const { t, language, formatNumber } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [answersState, setAnswersState] = useState<Record<number, number>>({});

  const handleSelectOption = (mcqId: number, optionIndex: number) => {
    if (answersState[mcqId] !== undefined) return;
    setAnswersState((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const resetMCQ = (mcqId: number) => {
    setAnswersState((prev) => {
      const copy = { ...prev };
      delete copy[mcqId];
      return copy;
    });
  };

  // Filter logic based on selected language question fields
  const filteredMCQs = mcqData.filter((mcq) => {
    const questionText = language === "en" ? mcq.enQuestion : mcq.asQuestion;
    const explanationText = language === "en" ? mcq.enExplanation : mcq.asExplanation;
    
    const matchesSearch =
      questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      explanationText.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesUnit = selectedUnit === "all" || mcq.unitId === selectedUnit;
    const matchesDay = selectedDay === "all" || mcq.dayNumber.toString() === selectedDay;

    return matchesSearch && matchesUnit && matchesDay;
  });

  const uniqueUnits = Array.from(new Set(mcqData.map((m) => m.unitId))).map((id) => {
    const original = mcqData.find((m) => m.unitId === id);
    return {
      id,
      label: language === "en" ? original?.enUnitNumber : original?.asUnitNumber,
    };
  });

  // ка, кhа, ga, gha prefixes for Assamese, A, B, C, D for English
  const optionPrefixes = language === "en" ? ["A. ", "B. ", "C. ", "D. "] : ["ক. ", "খ. ", "গ. ", "ঘ. "];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {t("mcqHeader")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          {t("mcqSub")}
        </p>
      </div>

      {/* Controls Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end rounded-2xl border border-border bg-card p-5 shadow-sm">
        
        {/* Search */}
        <div className="md:col-span-6 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("searchQuestions")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Unit Filter */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("filterUnit")}
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm text-foreground focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">{t("allUnits")}</option>
            {uniqueUnits.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        {/* Day Filter */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {t("filterDay")}
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 px-3 text-sm text-foreground focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">{t("allDays")}</option>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {t("dayBadge")} {formatNumber(i + 1)}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* MCQ Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMCQs.map((mcq) => {
          const userAnswerIndex = answersState[mcq.id];
          const isAnswered = userAnswerIndex !== undefined;
          
          const questionText = language === "en" ? mcq.enQuestion : mcq.asQuestion;
          const optionsList = language === "en" ? mcq.enOptions : mcq.asOptions;
          const explanationText = language === "en" ? mcq.enExplanation : mcq.asExplanation;
          const unitBadgeText = language === "en" ? mcq.enUnitNumber : mcq.asUnitNumber;

          return (
            <div
              key={mcq.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-indigo-500/20 transition-all duration-200"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                    {unitBadgeText}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {t("dayBadge")} {formatNumber(mcq.dayNumber)}
                  </span>
                </div>

                {/* Question */}
                <h3 className="font-heading text-base font-bold text-foreground leading-snug mb-4">
                  {questionText}
                </h3>

                {/* Options list */}
                <div className="space-y-2">
                  {optionsList.map((option, idx) => {
                    const isSelected = userAnswerIndex === idx;
                    const isCorrect = mcq.correctIndex === idx;
                    
                    let btnStyle = "border-border hover:bg-muted";
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold";
                      } else {
                        btnStyle = "border-border opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(mcq.id, idx)}
                        className={`w-full text-left p-3 rounded-xl border text-sm flex items-center justify-between transition-all ${btnStyle}`}
                      >
                        <span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                            {optionPrefixes[idx]}
                          </span>
                          {option}
                        </span>
                        {isAnswered && isCorrect && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <X className="h-4 w-4 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Explanation & Reset Panel */}
              {isAnswered && (
                <div className="mt-6 border-t border-border/60 pt-4 space-y-3">
                  <div className="flex items-start gap-2.5 bg-muted/50 rounded-xl p-3.5 border border-border/40">
                    <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground">{t("explanation")}</span>
                      <p className="text-[12px] leading-relaxed text-muted-foreground font-sans">
                        {explanationText}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => resetMCQ(mcq.id)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex ml-auto"
                  >
                    {t("resetRetry")}
                  </button>
                </div>
              )}

            </div>
          );
        })}

        {filteredMCQs.length === 0 && (
          <div className="md:col-span-2 text-center py-16 border border-dashed border-border rounded-3xl bg-muted/10 space-y-2">
            <Filter className="h-8 w-8 text-muted-foreground/60 mx-auto" />
            <h3 className="font-heading text-lg font-bold text-foreground">{t("noQuestions")}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {t("noQuestionsDesc")}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
