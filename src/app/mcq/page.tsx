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
      "এ. লক্ষ্মণস্বামী মুদালিয়াৰ",
      "জে. পি. নায়ক",
      "জাকিৰ হুছেইন"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was chaired by Dr. A. Lakshmanaswami Mudaliar.",
    "asExplanation": "ড° এ. লক্ষ্মণস্বামী মুদালিয়াৰ এই আয়োগৰ সভাপতি আছিল।"
  },
  {
    "id": 3,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Why was the Secondary Education Commission appointed?",
    "asQuestion": "মাধ্যমিক শিক্ষা আয়োগ কিয় নিযুক্ত কৰা হৈছিল?",
    "enOptions": [
      "To reform higher education",
      "To examine and improve secondary education",
      "To establish universities",
      "To regulate primary schools"
    ],
    "asOptions": [
      "উচ্চ শিক্ষাৰ সংস্কাৰৰ বাবে",
      "মাধ্যমিক শিক্ষা পৰ্যালোচনা আৰু উন্নয়নৰ বাবে",
      "বিশ্ববিদ্যালয় স্থাপনৰ বাবে",
      "প্ৰাথমিক বিদ্যালয় নিয়ন্ত্ৰণৰ বাবে"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission was formed to study the problems of secondary education and suggest reforms.",
    "asExplanation": "মাধ্যমিক শিক্ষাৰ সমস্যা অধ্যয়ন কৰি উন্নয়নৰ পৰামৰ্শ দিবলৈ এই আয়োগ গঠন কৰা হৈছিল।"
  },
  {
    "id": 4,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 2,
    "enQuestion": "Which educational level was directly studied by the Mudaliar Commission?",
    "asQuestion": "মুদালিয়াৰ আয়োগে প্ৰত্যক্ষভাৱে কোন শিক্ষাস্তৰ অধ্যয়ন কৰিছিল?",
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
      "প্ৰাপ্তবয়স্ক শিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission specifically examined the structure, curriculum and problems of secondary education.",
    "asExplanation": "আয়োগে মাধ্যমিক শিক্ষাৰ গঠন, পাঠ্যক্ৰম আৰু সমস্যাসমূহ অধ্যয়ন কৰিছিল।"
  },
  {
    "id": 5,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "Which defect of secondary education was strongly criticized by the Mudaliar Commission?",
    "asQuestion": "মুদালিয়াৰ আয়োগে মাধ্যমিক শিক্ষাৰ কোন ত্ৰুটিটোক তীব্ৰভাৱে সমালোচনা কৰিছিল?",
    "enOptions": [
      "Excessive practical work",
      "Bookish and examination-oriented education",
      "Excessive sports activities",
      "Lack of libraries"
    ],
    "asOptions": [
      "অত্যাধিক ব্যৱহাৰিক কাম",
      "পুথিগত আৰু পৰীক্ষাকেন্দ্ৰিক শিক্ষা",
      "অত্যাধিক ক্ৰীড়া কাৰ্যসূচী",
      "পুথিভঁৰালৰ অভাৱ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission believed that education had become too book-centered and examination-driven.",
    "asExplanation": "আয়োগৰ মতে শিক্ষা অত্যাধিক পুথিগত আৰু পৰীক্ষামুখী হৈ পৰিছিল।"
  },
  {
    "id": 6,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "According to the Mudaliar Commission, the curriculum of secondary education failed mainly because it—",
    "asQuestion": "মুদামল াৰ আয াগৰ মযত মাধ্যমমক মিক্ষাৰ পাঠযক্ৰমৰ মুখয ত্ৰু টি মক আমছল ?",
    "enOptions": [
      "Was too vocational",
      "Ignored individual differences and practical needs",
      "Focused excessively on arts",
      "Included too many co-curricular activities"
    ],
    "asOptions": [
      "অতযামধ্ ক বৃমিমূলক আমছল",
      "বযমক্তগত পাথযকয আৰু বযেৈামৰক প্ৰ য ােন উযপক্ষা কমৰমছল",
      "কলা মবষ ত অতযামধ্ক গু ৰুত্ব মদমছল",
      "সৈ-পাঠযক্ৰম কাযযসূচী কবমছ আমছল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission felt that the curriculum did not adequately address students' varied interests, abilities and\npractical life needs.",
    "asExplanation": "আয াগৰ মযত পাঠযক্ৰযম মিক্ষাথীৰ মভন্ন আগ্ৰৈ , সামথযয আৰু েীেনমুখী প্ৰ য ােনসমূৈ যযথষ্ট গু ৰুত্ব মদ া নামছল।"
  },
  {
    "id": 7,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "A school evaluates students only through annual written examinations. According to the Mudaliar\nCommission, what is the major drawback of this practice?",
    "asQuestion": "এখন বিদ্যালয়ে কেৱল িাবষিে বলবখত পৰীক্ষাৰ জবৰ়েযত বিক্ষাৰ্থীৰ মূলযা়েন েৰা হ়ে। মুদ্াবল়োৰ আয়োগৰ মযত ই়োৰ মুখয অসুবিধা বে?",
    "enOptions": [
      "It increases vocational efficiency",
      "It ignores all-round development",
      "It promotes co-curricular activities",
      "It improves guidance services"
    ],
    "asOptions": [
      "ই িৃবিমূলে দ্ক্ষ তা িৃবি েযৰ",
      "ই বিক্ষাৰ্থীৰ সিিাঙ্গীন বিোি উযপক্ষা েযৰ",
      "ই সহ-পাঠ্যক্ৰম োৰ্িসূচী উন্নত েযৰ",
      "ই বনযদ্িিনা কসৱা উন্নত েযৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission criticized examination-centered education because it neglected students' overall\ndevelopment and practical abilities.",
    "asExplanation": "আয়োযগ পৰীক্ষাযেবিে বিক্ষাৰ সমাযলাচনা েবৰবিল, োৰণ ই়োত বিক্ষাৰ্থীৰ সিিাঙ্গীন বিোি আৰু িযৱহাবৰে দ্ক্ষ তা উযপবক্ষত হহবিল।"
  },
  {
    "id": 8,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 4,
    "enQuestion": "A student scores high marks but lacks practical skills required in daily life. Which defect of secondary\neducation does this situation represent?",
    "asQuestion": "এজন বিক্ষাৰ্থীয়ে উচ্চ নম্বৰ লাভ েযৰ, বেন্তু হদ্নবিন জীৱনৰ িাযি প্ৰ য়োজনী়ে িযৱহাবৰে দ্ক্ষ তা নাই। এই অৱস্থাই মাধযবমে বিক্ষাৰ কোন ত্ৰু টি\t প্ৰ\t োি\nেযৰ?",
    "enOptions": [
      "Lack of libraries",
      "Overcrowded classrooms",
      "Absence of life-centered education",
      "Lack of sports facilities"
    ],
    "asOptions": [
      "পুবৰ্থভঁৰালৰ অভাৱ",
      "অবতমাত্ৰা বভৰৰ্ুক্ত কেণীযোঠ্া",
      "জীৱনমুখী বিক্ষাৰ অভাৱ",
      "ক্ৰ ীডা সুবিধাৰ অভাৱ"
    ],
    "correctIndex": 2,
    "enExplanation": "One major criticism was that secondary education was disconnected from practical life and real-world\nneeds.",
    "asExplanation": "মাধযবমে বিক্ষা িাস্তৱ জীৱন আৰু িযৱহাবৰে প্ৰ য়োজনৰ হসযত ৰ্ যৰ্থষ্ট সংৰ্ুক্ত নাবিল িুবল সমাযলাচনা েৰা হহবিল।"
  },
  {
    "id": 9,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "Which aim of secondary education focuses on developing responsible citizens in a democracy?",
    "asQuestion": "মাধযবমে বিক্ষাৰ কোন লক্ষযই গণতাবিে সমাজৰ দ্ াব়েত্বিীল নাগবৰে গব়ি কতালাৰ ওপৰত গু ৰুত্ব বদ্য়ে ?",
    "enOptions": [
      "Vocational efficiency",
      "Democratic citizenship",
      "Physical fitness",
      "Cultural entertainment"
    ],
    "asOptions": [
      "িৃবিমূলে দ্ক্ষ তা",
      "গণতাবিে নাগবৰেত্ব",
      "িাৰীবৰে সক্ষমতা",
      "সাংস্কৃ বতে বিযনাদ্ন"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized democratic citizenship as a major aim of secondary education.",
    "asExplanation": "মুদ্াবল়োৰ আয়োযগ গণতাবিে নাগবৰেত্বে মাধযবমে বিক্ষাৰ এে মুখয লক্ষয বহচাযপ গণয েবৰবিল।"
  },
  {
    "id": 10,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "Character formation as an aim of secondary education primarily seeks to develop—",
    "asQuestion": "মাধযবমে বিক্ষাৰ লক্ষয বহচাযপ চবৰত্ৰ গঠ্নৰ মূল উযেিয বে?",
    "enOptions": [
      "Examination skills only",
      "Moral and ethical qualities",
      "Business management abilities",
      "Technical specialization"
    ],
    "asOptions": [
      "কেৱল পৰীক্ষামূলে\t দ্ক্ষ\t তা",
      "হনবতে আৰু চাবিবত্ৰে\t গু\t ণ",
      "িযৱসা়ে পবৰচালনা দ্ক্ষ তা",
      "োবৰেৰী বিযিষজ্ঞতা"
    ],
    "correctIndex": 1,
    "enExplanation": "Character formation promotes honesty, responsibility, discipline and ethical conduct.",
    "asExplanation": "চবৰত্ৰ গঠ্যন সততা, দ্ াব়েত্বযিাধ , িৃংখলা আৰু হনবতে আচৰণ বিোি েযৰ।"
  },
  {
    "id": 11,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 5,
    "enQuestion": "A secondary school introduces skill-based courses in agriculture, commerce and technology to prepare\nstudents for employment. Which aim of secondary education is being fulfilled?",
    "asQuestion": "এখন মাধ্ যমমক মবদযালয মিক্ষ াথীক কমযসংস্থ াপনৰ বাযব কৃমষ, বামণেয আৰু প্ৰ যুমক্ত মভমিক দক্ষতা পাঠযক্ৰম\nআৰম্ভ কৰা হৈযছ। ই াত মাধ্যমমক মিক্ষাৰ ককান লক্ষয পূৰণ হৈযছ ?",
    "enOptions": [
      "Democratic citizenship",
      "Vocational efficiency",
      "Cultural recreation",
      "Physical development"
    ],
    "asOptions": [
      "গণতামন্ত্ৰক নাগমৰকত্ব",
      "বৃমিমূলক দক্ষ তা",
      "সাংস্কৃ মতক মযনাৰঞ্জ ন",
      "িাৰীমৰক মবকাি"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized vocational efficiency to prepare students for productive work and\nself-reliance.",
    "asExplanation": "মুদামল াৰ আয াযগ মিক্ষ াথীক উৎপাদনিীল কময আৰু আত্ম মনভযৰিীলতাৰ বাযব প্ৰস্তু ত কমৰবলল বৃমিমূলক দক্ষ তাৰ\nওপৰত গু ৰুত্ব মদমছল।"
  },
  {
    "id": 12,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "A school regularly organizes student councils and leadership camps. Which aim of secondary education is\nmainly promoted?",
    "asQuestion": "এখন মবদযালয মন মমতভাযে ছাত্র সংসদ আৰু কনতৃত্ব মিমবৰ আয ােন কৰা ৈ । ই াৰ দ্ব াৰা মাধ্ যমমক মিক্ষ াৰ\nককান লক্ষয অমধ্ক মবকমিত ৈ ?",
    "enOptions": [
      "Leadership qualities",
      "Examination success",
      "Memorization skills",
      "University admission"
    ],
    "asOptions": [
      "কনতৃত্ব ৰ গু ণ",
      "পৰীক্ষাত সফলতা",
      "মুখস্থ কৰাৰ দক্ষতা",
      "মবশ্বমবদযাল ত ভমতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Leadership activities help students develop initiative, responsibility and cooperation.",
    "asExplanation": "কনতৃত্ব মূলক কাযযসূচীয মিক্ষ াথীৰ উযদযাগ, দাম ত্ব যবাধ্ আৰু সৈযযামগতাৰ গু ণ মবকাি কযৰ।"
  },
  {
    "id": 13,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 6,
    "enQuestion": "Assertion (A):\nSecondary education should develop democratic citizenship.\nReason (R):\nCitizens must understand rights, duties and social responsibilities.",
    "asQuestion": "উমক্ত ( A):\nমাধ্যমমক মিক্ষাই গণতামন্ত্ৰক নাগমৰকত্ব গম়ি তুমলব লাযগ।\nকাৰণ (R):\nনাগমৰযক মনেৰ অমধ্কাৰ , কতযবয আৰু সামামেক দাম ত্ব বুমেব লাযগ।",
    "enOptions": [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Democratic citizenship requires awareness of rights, duties and responsibilities; therefore the reason\ncorrectly explains the assertion.",
    "asExplanation": "গণতামন্ত্ৰক নাগমৰকত্ব গম়ি তুমলবলল অমধ্কাৰ , কতযবয আৰু দাম ত্ব ৰ জ্ঞ ান প্ৰ য ােন। কসয যৈ R এ A-ৰ সঠিক\nবযাখযা কযৰ।"
  },
  {
    "id": 14,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "Why did the Mudaliar Commission recommend a diversified curriculum?",
    "asQuestion": "মুদামল াৰ আয াযগ হবমচত্রম পাঠযক্ৰমৰ পৰামিয মক মদমছল ?",
    "enOptions": [
      "To reduce school enrolment",
      "To meet diverse interests and abilities of students",
      "To eliminate practical subjects",
      "To make education purely academic"
    ],
    "asOptions": [
      "মবদযাল ত নামভমতযৰ সংখযা হ্ৰ াস কমৰবলল",
      "মিক্ষাথীৰ মবমভন্ন আগ্ৰৈ আৰু সামথযয পূৰণ কমৰবলল",
      "বযেৈামৰক মবষ সমূৈ মবযলাপ কমৰবলল",
      "মিক্ষাক ককেল একাযিমমক কমৰবলল"
    ],
    "correctIndex": 1,
    "enExplanation": "Students differ in interests, talents and career aspirations; therefore diversified curricula provide suitable\neducational opportunities.",
    "asExplanation": "মিক্ষাথীৰ আগ্ৰৈ , প্ৰ মতভা আৰু ভমেষযৎ লক্ষয কবযলগ কবযলগ ৈ । কসয যৈ হবমচত্রম পাঠযক্ৰমৰ প্ৰ য ােন।"
  },
  {
    "id": 15,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "How does a multipurpose school differ from a traditional academic school?",
    "asQuestion": "এখন বহু মুখী মবদযাল এখন পৰম্প ৰাগত একাযিমমক মবদযাল ৰ পৰা ককযনলক পৃথক?",
    "enOptions": [
      "It offers only science subjects",
      "It provides a variety of academic, technical and vocational courses",
      "It focuses only on examinations",
      "It excludes co-curricular activities"
    ],
    "asOptions": [
      "ককেল মবজ্ঞান মবষপ্ৰ দান কযৰ",
      "একাযিমমক, কামৰকৰী আৰু বৃমিমূলক মবমভন্ন পাঠযক্ৰ ম প্ৰ দান কযৰ",
      "ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব মদয",
      "সৈ-পাঠযক্ৰম কাযযসূচী বাদ মদয"
    ],
    "correctIndex": 1,
    "enExplanation": "Multipurpose schools were recommended to provide diverse educational opportunities according to students'\nneeds and abilities.",
    "asExplanation": "মিক্ষাথীৰ প্ৰ য ােন আৰু সামথযয অনুসমৰ মবমভন্ন মিক্ষামূলক সুযযাগ প্ৰ দানৰ বাযব বহুমুখী মবদযাল ৰ পৰামিয\nমদ া হৈমছল।"
  },
  {
    "id": 16,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "A student is confused about selecting a suitable career after secondary education. Which recommendation of\nthe Mudaliar Commission would best help the student?",
    "asQuestion": "এেন মিক্ষাথী মাধ্যমমক মিক্ষা কিষ কৰাৰ মপছত উপযুক্ত কপছা বাছমন কমৰবলল মবভ্ৰান্ত হৈযছ। মুদামল াৰ\nআয াগৰ ককান পৰামিযই কতওঁক সবযামধ্ক সৈা কমৰব ?",
    "enOptions": [
      "Examination reform",
      "Guidance and counselling service",
      "Multipurpose school",
      "Physical education programme"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "মনযদযিনা আৰু পৰামিযদান কসো",
      "বহুমুখী মবদযাল",
      "িাৰীমৰক মিক্ষা কাযযসূচী"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission recommended guidance and counselling services to help students understand their abilities,\ninterests and career opportunities.",
    "asExplanation": "আয াযগ মিক্ষাথীক মনেৰ সামথযয , আগ্ৰৈ আৰু কপছাগত সুযযাগ বুমেবলল মনযদযিনা আৰু পৰামিযদান কসোৰ\nপৰামিয মদমছল।"
  },
  {
    "id": 17,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "A school encourages debates, sports, cultural programmes and social service activities. Which\nrecommendation of the Mudaliar Commission is reflected here?",
    "asQuestion": "এখন মবদযালয মবতকয, ক্ৰ ীডা , সাংস্কৃ মতক অনুষ্ঠ ান আৰু সমােযসোমূলক কাযযসূচী উৎসামৈত কৰা ৈ । ই াত\nমুদামল াৰ আয াগৰ ককান পৰামিয প্ৰ মতফমলত হৈযছ ?",
    "enOptions": [
      "Vocational education only",
      "Co-curricular activities",
      "University education",
      "Examination-centered education"
    ],
    "asOptions": [
      "ককেল বৃমিমূলক মিক্ষ া",
      "সৈ-পাঠযক্ৰম কাযযসূচী",
      "মবশ্বমবদযাল মিক্ষা",
      "পৰীক্ষাযকমিক মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission emphasized co-curricular activities for the all-round development of students.",
    "asExplanation": "আয াযগ মিক্ষাথীৰ সবযাঙ্গীন মবকািৰ বাযব সৈ -পাঠযক্ৰম কাযযসূচীৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 18,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 8,
    "enQuestion": "Why did the Mudaliar Commission recommend reforms in the examination system?",
    "asQuestion": "মুদামল াৰ আয াযগ পৰীক্ষা বযেস্থাত সংস্কাৰৰ পৰামিয মক মদমছল ?",
    "enOptions": [
      "To increase the number of examinations",
      "To make education more book-centered",
      "To reduce the excessive influence of examinations on learning",
      "To abolish all written tests"
    ],
    "asOptions": [
      "পৰীক্ষ াৰ সংখযা বৃমি কমৰবলল",
      "মিক্ষাক অমধ্ক পুমথগত কমৰবলল",
      "মিক্ষাৰ ওপৰত পৰীক্ষাৰ অতযামধ্ক প্ৰ ভাে হ্ৰ াস কমৰবলল",
      "সকযলা মলমখত পৰীক্ষা মবযলাপ কমৰবলল"
    ],
    "correctIndex": 2,
    "enExplanation": "The Commission believed that education had become overly examination-oriented and reforms were\nnecessary to improve learning.",
    "asExplanation": "আয াগৰ মযত মিক্ষা অতযামধ্ক পৰীক্ষাযকমিক হৈ পমৰমছল আৰু মিকন -প্ৰ মক্ৰ া উন্নত কমৰবলল সংস্কাৰ প্ৰ য ােন\nআমছল।"
  },
  {
    "id": 19,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 9,
    "enQuestion": "Which of the following best represents the educational philosophy behind the DVPLC objectives\nrecommended by the Mudaliar Commission?",
    "asQuestion": "মুদামল াৰ আয াযগ প্ৰস্ত ামেত DVPLC লক্ষযসমূৈৰ মিক্ষাগত দিযন ককানয া মবকল্পই সবযামধ্ক সঠিকভাযে প্ৰ কাি\nকযৰ?",
    "enOptions": [
      "Education should focus only on examinations.",
      "Education should promote balanced development of the individual and society.",
      "Education should prepare students only for universities.",
      "Education should emphasize memorization alone."
    ],
    "asOptions": [
      "মিক্ষা ককেল পৰীক্ষাৰ ওপৰত ককমিত ৈ’ব লাযগ।",
      "মিক্ষা বযমক্তগত আৰু সামামেক উভ মবকাি সাধ্ন কমৰব লাযগ।",
      "মিক্ষা ককেল মবশ্বমবদযাল ৰ বাযব প্ৰস্তু মত ৈ’ব লাযগ।",
      "মিক্ষা ককেল মুখস্থ মবদযাৰ ওপৰত গু ৰুত্ব মদব লাযগ।"
    ],
    "correctIndex": 1,
    "enExplanation": "The DVPLC framework reflects a balanced educational philosophy emphasizing democratic citizenship,\nvocational efficiency, personality development, leadership and character formation.",
    "asExplanation": "DVPLC ধ্ াৰণাই গণতামন্ত্ৰক নাগমৰকত্ব , বৃমিমূলক দক্ষ তা, বযমক্তত্ব মবকাি , কনতৃত্ব আৰু চমৰত্র গঠনৰ সমমিত\nমবকািৰ ওপৰত গু ৰুত্ব মদয ।"
  },
  {
    "id": 20,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 10,
    "enQuestion": "Which statement best evaluates the contribution of the Mudaliar Commission to secondary education in\nIndia?",
    "asQuestion": "ভাৰতৰ মাধ্যমমক মিক্ষাৰ কক্ষত্রত মুদামল াৰ আয াগৰ অেদানৰ সযবযািম মূলযা ন ককানয া ?",
    "enOptions": [
      "It focused only on administrative reforms.",
      "It ignored students' individual differences.",
      "It provided a comprehensive framework for improving secondary education.",
      "It recommended the abolition of secondary education."
    ],
    "asOptions": [
      "ই ককেল প্ৰ িাসমনক সংস্কাৰৰ ওপৰত গু ৰুত্ব মদমছল।",
      "ই মিক্ষাথীৰ বযমক্তগত পাথযকয উযপক্ষা কমৰমছল।",
      "ই মাধ্ যমমক মিক্ষ াৰ উন্ন নৰ বাযব এক মবস্তৃ ত কাঠাযমা প্ৰ দান কমৰমছল।",
      "ই মাধ্যমমক মিক্ষা মবযলাপৰ পৰামিয মদমছল।"
    ],
    "correctIndex": 2,
    "enExplanation": "The Mudaliar Commission significantly influenced curriculum reform, guidance services, vocational\neducation, examination reform and democratic citizenship.",
    "asExplanation": "মুদামল াৰ আয াযগ পাঠযক্ৰম সংস্কাৰ , মনযদযিনা কসো, বৃমিমূলক মিক্ষ া, পৰীক্ষা সংস্কাৰ আৰু গণতামন্ত্ৰক নাগমৰকত্বৰ\nকক্ষত্রত গভীৰ প্ৰ ভাে কপলাইমছল।"
  },
  {
    "id": 21,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "In which year was the Kothari Commission appointed?",
    "asQuestion": "ককাঠাৰী আয াগ ককান বছৰত মনযুক্ত কৰা হৈমছল ?",
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
    "asExplanation": "মিক্ষা আয াগ , যাক ককাঠাৰী আয াগ বুমলও ককাো ৈ , ১৯৬৪ চনত মনযুক্ত কৰা হৈমছল।"
  },
  {
    "id": 22,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "Who was the Chairman of the Kothari Commission?",
    "asQuestion": "ককাঠাৰী আয াগৰ সভাপমত ককান আমছল?",
    "enOptions": [
      "A. Lakshmanaswami Mudaliar",
      "Zakir Hussain",
      "D. S. Kothari",
      "J. P. Naik"
    ],
    "asOptions": [
      "এ. লক্ষ্মণস্বামী মুদামল াৰ",
      "োমকৰ হু যছইন",
      "মি. এছ. ককাঠাৰী",
      "কে. মপ. না ক"
    ],
    "correctIndex": 2,
    "enExplanation": "The Commission was chaired by Dr. D. S. Kothari, a distinguished scientist and educationist.",
    "asExplanation": "ি° মি. এছ. ককাঠাৰী এই আয াগৰ সভাপমত আমছল, মযেন এেন মবমিষ্ট মবজ্ঞানী আৰু মিক্ষামবদ আমছল।"
  },
  {
    "id": 23,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "The Kothari Commission viewed education primarily as an instrument for—",
    "asQuestion": "ককাঠাৰী আয াযগ মিক্ষাক মূলতঃ মকৈৰ উপা মৈচাযপ গণয কমৰমছল ?",
    "enOptions": [
      "Examination success",
      "National development",
      "Religious instruction",
      "Administrative control"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা",
      "োতী উন্ন ন",
      "ধ্ মী মিক্ষা",
      "প্ৰ িাসমনক মন ন্ত্ৰ ণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission emphasized that education should contribute to national development,\nmodernization and social transformation.",
    "asExplanation": "ককাঠাৰী আয াযগ মিক্ষা োতী উন্ন ন , আধ্ুমনকীকৰণ আৰু সামামেক পমৰেতযনৰ িমক্তিালী উপা বুমল মত\n প্ৰ\nকাি কমৰমছল।"
  },
  {
    "id": 24,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 12,
    "enQuestion": "Assertion (A):\nThe Kothari Commission emphasized equal educational opportunities.\nReason (R):\nEducation should help reduce social and economic inequalities.",
    "asQuestion": "উমক্ত ( A):\nককাঠাৰী আয াযগ সমান মিক্ষাৰ সুযযাগৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।\nকাৰণ (R):\nমিক্ষাই সামামেক আৰু অথযলনমতক হবষময হ্ৰ াস কৰাত সৈা কমৰব লাযগ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed that equal educational opportunities are essential for reducing inequalities and\npromoting social justice.",
    "asExplanation": "আয াগৰ মযত সমান মিক্ষাৰ সুযযাগ সামামেক নযাপ্ৰ মতষ্ঠা আৰু হবষময হ্ৰ াসৰ বাযব অতযন্ত প্ৰ য ােনী ।"
  },
  {
    "id": 25,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "Which recommendation of the Kothari Commission aimed at providing equal educational opportunities to\nall children regardless of social background?",
    "asQuestion": "সামামেক প ভূমম মনমবযযিযষ সকযলা মিশুক সমান মিক্ষাৰ সুযযাগ প্ৰ দান কৰাৰ উযেযিয ককাঠাৰী আয াযগ ককান\nপৰামিয আগব়িাইমছল ?",
    "enOptions": [
      "Multipurpose Schools",
      "Common School System",
      "Operation Blackboard",
      "Open Universities"
    ],
    "asOptions": [
      "বহুমুখী মবদযাল",
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "অপাযৰচন কেকব'িয",
      "মুক্ত মবশ্বমবদযাল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Common School System was recommended to promote equality and reduce educational disparities.",
    "asExplanation": "সাধ্ াৰণ মবদযাল বযেস্থ া সমতা বৃমি আৰু মিক্ষ াগত হবষময হ্ৰ াস কৰাৰ উযেযিয পৰামিয মদ া হৈমছল।"
  },
  {
    "id": 26,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "Which educational structure was recommended by the Kothari Commission for India?",
    "asQuestion": "ককাঠাৰী আয াযগ ভাৰতৰ বাযব ককান মিক্ষা গাঁথমনৰ পৰামিয আগব়িাইমছল ?",
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
    "asExplanation": "ককাঠাৰী আয াযগ ১০+২+৩ মিক্ষা গাঁথমনৰ পৰামিয আগব়িাইমছল , ময মপছত ভাৰতৰ মানক মিক্ষা বযেস্থা মৈচাযপ\nগৃৈীত ৈ ।"
  },
  {
    "id": 27,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 13,
    "enQuestion": "A student completes ten years of schooling and then enters a two-year higher secondary programme. Which\nrecommendation of the Kothari Commission is reflected here?",
    "asQuestion": "এেন মিক্ষ াথীয দৈ বছৰৰ মবদযাল মিক্ষ া সম্পূ ণয কৰাৰ মপছত দুবছৰী া উচ্চ মাধ্ যমমক কাযযসূচীত কযাগদান\nকযৰ। ই াত ককাঠাৰী আয াগৰ ককান পৰামিয প্ৰ মতফমলত হৈযছ ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "10+2+3 Structure",
      "Adult Education"
    ],
    "asOptions": [
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "কময অমভজ্ঞতা",
      "১০+২+৩ গাঁথমন",
      "প্ৰ াপ্তব স্ক মিক্ষা"
    ],
    "correctIndex": 2,
    "enExplanation": "The 10+2+3 pattern consists of ten years of schooling, two years of higher secondary education and three\nyears of degree education.",
    "asExplanation": "১০+২+৩ গাঁথমন অনুসমৰ ১০ বছৰ মবদযাল মিক্ষা , ২ বছৰ উচ্চ মাধ্যমমক আৰু ৩ বছৰ মিগ্ৰী মিক্ষা থাযক।"
  },
  {
    "id": 28,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "A school requires students to participate in community service, gardening and productive activities as part of\nlearning. Which recommendation of the Kothari Commission does this represent?",
    "asQuestion": "এখন মবদযালয মিক্ষাথীক মিক্ষা প্ৰ মক্ৰ াৰ অংি মৈচাযপ সমােযসো , বামগচা কময আৰু উৎপাদনিীল কাযযত\nঅংিগ্ৰৈণ কৰায া বাধ্যতামূলক কমৰযছ। ই াত ককাঠাৰী আয াগৰ ককান পৰামিয প্ৰ মতফমলত হৈযছ ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Examination Reform",
      "Open Learning"
    ],
    "asOptions": [
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "কময অমভজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ",
      "মুক্ত মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission emphasized work experience to connect education with productive work and\nsocial responsibility.",
    "asExplanation": "ককাঠাৰী আয াযগ মিক্ষাক উৎপাদনিীল কময আৰু সামামেক দাম ত্ব ৰ হসযত সংযযাগ কমৰবলল কময অমভজ্ঞতাৰ\nওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 29,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "Why did the Kothari Commission place special emphasis on equal educational opportunity?",
    "asQuestion": "ককাঠাৰী আয াযগ সমান মিক্ষাৰ সুযযাগৰ ওপৰত মবযিষ গু ৰুত্ব মক আযৰাপ কমৰমছল ?",
    "enOptions": [
      "To increase examination competition",
      "To reduce social inequality and promote national integration",
      "To increase private schooling",
      "To reduce higher education enrolment"
    ],
    "asOptions": [
      "পৰীক্ষ ামূলক প্ৰ মতযযামগতা বৃমি কমৰবলল",
      "সামামেক হবষময হ্ৰ াস আৰু োতী সংৈমত িমক্তিালী কমৰবলল",
      "বযমক্ত গত মবদযাল বৃমি কমৰবলল",
      "উচ্চ মিক্ষাত নামভমতয হ্ৰ াস কমৰবলল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission viewed educational equality as a means to achieve social justice, national integration and\nbalanced development.",
    "asExplanation": "আয াগৰ মযত মিক্ষাগত সমতা সামামেক নযা , োতী সংৈমত আৰু সমমবকাি মনমিত কৰাৰ এক মুখয উপা ।"
  },
  {
    "id": 30,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "Assertion (A):\nThe Kothari Commission emphasized science education.\nReason (R):\nScientific knowledge is essential for modernization and national development.",
    "asQuestion": "উমক্ত ( A):\nককাঠাৰী আয াযগ মবজ্ঞান মিক্ষাৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।\nকাৰণ (R):\nআধ্ুমনকীকৰণ আৰু োতী উন্ন নৰ বাযব হবজ্ঞামনক জ্ঞ ান অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed science education was essential for technological progress, modernization and\neconomic development.",
    "asExplanation": "আয াগৰ মযত মবজ্ঞান মিক্ষা প্ৰ যুমক্তগত অগ্ৰগমত , আধ্ুমনকীকৰণ আৰু অথযলনমতক মবকািৰ বাযব অতযন্ত\n প্ৰ\nয ােনী ।"
  },
  {
    "id": 31,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "In which year was the National Policy on Education introduced?",
    "asQuestion": "ৰাষ্ট্ৰী মিক্ষা নীমত ( NPE) ককান বছৰত প্ৰ েতযন কৰা হৈমছল ?",
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
    "asExplanation": "মিক্ষ াৰ উন্ন ন আৰু সমতা বৃমিৰ উযেযিয ১৯৮৬ চনত ৰাষ্ট্ৰ ী মিক্ষ া নীমত ক াষণা কৰা হৈমছল।"
  },
  {
    "id": 32,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 15,
    "enQuestion": "One of the major objectives of the National Policy on Education (1986) was to—",
    "asQuestion": "ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -ৰ অনযতম মুখয উযেিয মক আমছল?",
    "enOptions": [
      "Reduce access to education",
      "Promote equality of educational opportunity",
      "Eliminate secondary education",
      "Restrict vocational education"
    ],
    "asOptions": [
      "মিক্ষাৰ সুযযাগ হ্ৰ াস কৰা",
      "মিক্ষ াৰ সমান সুযযাগ বৃমি কৰা",
      "মাধ্যমমক মিক্ষা মবযলাপ কৰা",
      "বৃমিমূলক মিক্ষ া সীমাবি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The NPE 1986 aimed to ensure equal educational opportunities for all sections of society.",
    "asExplanation": "NPE 1986-এ সমােৰ সকযলা কেণীৰ বাযব সমান মিক্ষাৰ সুযযাগ মনমিত কৰাৰ লক্ষয হলমছল।"
  },
  {
    "id": 33,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "A government programme provides classrooms, teaching materials and basic facilities to improve school\ninfrastructure. Which initiative of NPE 1986 does this describe?",
    "asQuestion": "এ া চৰকাৰী কাযযসূচীয মবদযাল সমূৈক কেণীযকাঠা, মিক্ষণ সামগ্ৰী আৰু কমৌমলক সুমবধ্া প্ৰ দান কযৰ। ই NPE\n1986-ৰ ককান পদযক্ষপৰ উদাৈৰণ ?",
    "enOptions": [
      "Work Experience",
      "Common School System",
      "Operation Blackboard",
      "Adult Education"
    ],
    "asOptions": [
      "কময অমভজ্ঞতা",
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "অপাযৰচন কেকব'িয",
      "প্ৰ াপ্তব স্ক মিক্ষা"
    ],
    "correctIndex": 2,
    "enExplanation": "Operation Blackboard was launched to improve essential facilities and teaching resources in schools.",
    "asExplanation": "মবদযাল সমূৈত কমৌমলক সুমবধ্া আৰু মিক্ষণ সম্পদ উন্নত কৰাৰ বাযব অপাযৰচন কেকব 'িয আৰম্ভ কৰা হৈমছল।"
  },
  {
    "id": 34,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 16,
    "enQuestion": "Why did the National Policy on Education (1986) emphasize teacher education and training?",
    "asQuestion": "ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -এ মিক্ষক মিক্ষা আৰু প্ৰ মিক্ষণৰ ওপৰত মবযিষ গু ৰুত্ব মক আযৰাপ কমৰমছল ?",
    "enOptions": [
      "To reduce the number of teachers",
      "To improve the quality of education",
      "To replace schools with technology",
      "To eliminate examinations"
    ],
    "asOptions": [
      "মিক্ষকৰ সংখযা হ্ৰ াস কমৰবলল",
      "মিক্ষাৰ গু ণগত মান উন্নত কমৰবলল",
      "মবদযাল ৰ পমৰেযতয প্ৰ যুমক্ত বযেৈাৰ কমৰবলল",
      "পৰীক্ষা মবযলাপ কমৰবলল"
    ],
    "correctIndex": 1,
    "enExplanation": "The policy recognized that educational quality depends greatly on well-trained and professionally competent\nteachers.",
    "asExplanation": "নীমতখযন স্ব ীকাৰ কমৰমছল কয মিক্ষাৰ গু ণগত মান দক্ষ আৰু সু -প্ৰ মিমক্ষত মিক্ষকৰ ওপৰত মনভযৰ কযৰ।"
  },
  {
    "id": 35,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "A secondary school introduces courses in agriculture, computer applications and business skills to prepare\nstudents for employment. This reflects the concept of—",
    "asQuestion": "এখন মাধ্ যমমক মবদযালয কৃমষ, কমম্পউ াৰ প্ৰ য াগ আৰু বযেসাম ক দক্ষতাৰ পাঠযক্ৰম আৰম্ভ কৰা হৈযছ যাযত\nমিক্ষাথীসকল কমযসংস্থাপনৰ বাযব প্ৰস্তু ত ৈ । ই ককান ধ্ াৰণাক প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Examination Reform",
      "Vocationalisation of Education",
      "Common School System",
      "Democratic Citizenship"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "মিক্ষ াৰ বৃমিমুখীকৰণ",
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "গণতামন্ত্ৰক নাগমৰকত্ব"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation aims to equip students with practical skills and employment-oriented knowledge.",
    "asExplanation": "বৃমিমুখীকৰণৰ লক্ষ য হৈযছ মিক্ষ াথীক বযেৈামৰক দক্ষ তা আৰু কমযমুখী জ্ঞ ান প্ৰ দান কৰা।"
  },
  {
    "id": 36,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "What is the primary objective of vocationalisation of secondary education?",
    "asQuestion": "মাধ্ যমমক মিক্ষ াৰ বৃমিমুখীকৰণৰ মুখয উযেিয মক?",
    "enOptions": [
      "To increase examination marks only",
      "To prepare students for productive employment",
      "To reduce practical activities",
      "To eliminate academic subjects"
    ],
    "asOptions": [
      "ককেল পৰীক্ষ াৰ নম্ব ৰ বৃমি কৰা",
      "মিক্ষাথীক উৎপাদনিীল কমযসংস্থাপনৰ বাযব প্ৰস্তু ত কৰা",
      "বযেৈামৰক কাযযকলাপ হ্ৰ াস কৰা",
      "একাযিমমক মবষ মবযলাপ কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation aims to equip students with practical skills and occupational competence for employment\nand self-reliance.",
    "asExplanation": "বৃমিমুখীকৰযণ মিক্ষ াথীক বযেৈামৰক দক্ষ তা আৰু কপছাগত কযাগযতাযৰ সমিত কমৰ কমযসংস্থ ান আৰু\nআত্মমনভযৰিীলতাৰ বাযব প্ৰস্তু ত কযৰ।"
  },
  {
    "id": 37,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "A region faces high youth unemployment despite many students completing school education. Which\neducational approach can best address this issue?",
    "asQuestion": "এ া অঞ্চ লত বহু মিক্ষ াথীয মবদযাল মিক্ষ া সম্পূ ণয কৰাৰ মপছযতা যুে কবকাৰত্ব অমধ্ ক। ককান মিক্ষ াগত\nপিমতয এই সমসযাৰ উিম সমাধ্ান মদব পাযৰ ?",
    "enOptions": [
      "Examination-oriented education",
      "Vocationalisation of education",
      "Memorization-based learning",
      "Reduction of practical work"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা",
      "মিক্ষ াৰ বৃমিমুখীকৰণ",
      "মুখস্থমভমিক মিক্ষা",
      "বযেৈামৰক কাযয হ্ৰ াস"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocational education helps students acquire employable skills and reduces the gap between education and\nemployment.",
    "asExplanation": "বৃমিমুখী মিক্ষ াই মিক্ষ াথীক কযমযাপযযাগী দক্ষ তা প্ৰ দান কমৰ মিক্ষ া আৰু কমযসংস্থ াপনৰ মােৰ বযেধ্ ান হ্ৰ াস কযৰ।"
  },
  {
    "id": 38,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "One major feature of the development of secondary education in Assam after independence was—",
    "asQuestion": "স্ব\nাধ্ীনতাৰ মপছত অসমত মাধ্যমমক মিক্ষাৰ মবকািৰ এ া মুখয হবমিষ্টয মক আমছল ?",
    "enOptions": [
      "Reduction in school enrolment",
      "Expansion of educational institutions",
      "Closure of rural schools",
      "Elimination of science education"
    ],
    "asOptions": [
      "মবদযাল ত নামভমতয হ্ৰ াস",
      "মিক্ষানুষ্ঠানৰ সম্প্ৰসাৰণ",
      "গ্ৰ াময মবদযাল বন্ধ",
      "মবজ্ঞান মিক্ষা মবযলাপ"
    ],
    "correctIndex": 1,
    "enExplanation": "After independence, Assam witnessed a significant expansion in secondary schools and educational\nopportunities.",
    "asExplanation": "স্ব\nাধ্ীনতাৰ মপছত অসমত মাধ্যমমক মবদযাল আৰু মিক্ষাৰ সুযযাগৰ উযেখযযাগয সম্প্ৰসাৰণ টিমছল।"
  },
  {
    "id": 39,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "Which factor contributed most significantly to the growth of secondary education in Assam after\nindependence?",
    "asQuestion": "স্ব\nাধ্ীনতাৰ মপছত অসমত মাধ্যমমক মিক্ষাৰ মবকািত ককান কাৰযক সবযামধ্ক গু ৰুত্বপূণয ভূমমকা পালন কমৰমছল ?",
    "enOptions": [
      "Reduction of public investment",
      "Expansion of schools and government initiatives",
      "Restriction of teacher training",
      "Decrease in literacy programmes"
    ],
    "asOptions": [
      "চৰকাৰী মবমনয াগ হ্ৰ াস",
      "মবদযাল সম্প্ৰসাৰণ আৰু চৰকাৰী পদযক্ষপ",
      "মিক্ষক প্ৰ মিক্ষণ সীমমতকৰণ",
      "সাক্ষৰতা কাযযসূচী হ্ৰ াস"
    ],
    "correctIndex": 1,
    "enExplanation": "Government policies, expansion of institutions and increased educational awareness contributed\nsignificantly to educational development.",
    "asExplanation": "চৰকাৰী নীমত, মবদযাল সম্প্ৰ সাৰণ আৰু মিক্ষ াৰ প্ৰ মত সযচতনতা বৃমিয মিক্ষ াৰ মবকািত মবযিষ ভূমমকা পালন\nকমৰমছল।"
  },
  {
    "id": 40,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "A rural district has schools but lacks sufficient teachers, laboratories and learning resources. Which\nchallenge of secondary education in Assam does this situation best represent?",
    "asQuestion": "এ া গ্ৰ াময মেলাত মবদযাল আযছ , মকন্তু পযযাপ্ত মিক্ষক , পৰীক্ষাগাৰ আৰু মিক্ষণ সম্পদ নাই। এই অেস্থাই অসমৰ\nমাধ্যমমক মিক্ষাৰ ককান সমসযাক সবযামধ্ক সঠিকভাযে প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Excessive vocationalisation",
      "Inequality in educational facilities",
      "Overdevelopment of infrastructure",
      "Lack of educational demand"
    ],
    "asOptions": [
      "অতযামধ্ ক বৃমিমুখীকৰণ",
      "মিক্ষাগত সুমবধ্াৰ অসম বণ্টন",
      "আন্তঃগাঁথমনৰ অতযামধ্ক উন্ন ন",
      "মিক্ষাৰ প্ৰ মত চামৈদাৰ অভাে"
    ],
    "correctIndex": 1,
    "enExplanation": "Unequal distribution of educational resources remains a challenge in ensuring quality secondary education\nacross all regions.",
    "asExplanation": "মিক্ষাগত সম্পদৰ অসম বণ্টন এমত াও সকযলা অঞ্চলত গু ণগত মাধ্যমমক মিক্ষা মনমিত কৰাৰ কক্ষত্রত এক\n গু\nৰুত্বপূণয সমসযা।"
  },
  {
    "id": 41,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Which factor played a major role in strengthening secondary education in Assam after independence?",
    "asQuestion": "স্ব\nাধ্ীনতাৰ মপছত অসমত মাধ্যমমক মিক্ষা িমক্তিালী কৰাৰ কক্ষত্রত ককান কাৰযক গু ৰুত্বপূণয ভূমমকা পালন\nকমৰমছল?",
    "enOptions": [
      "Closure of educational institutions",
      "Government support and educational expansion",
      "Reduction of teacher recruitment",
      "Elimination of science subjects"
    ],
    "asOptions": [
      "মিক্ষানুষ্ঠান বন্ধ কৰা",
      "চৰকাৰী সৈা আৰু মিক্ষাৰ সম্প্ৰসাৰণ",
      "মিক্ষক মনযুমক্ত হ্ৰ াস",
      "মবজ্ঞান মবষ মবযলাপ"
    ],
    "correctIndex": 1,
    "enExplanation": "Government initiatives, institutional growth and educational planning helped strengthen secondary\neducation in Assam.",
    "asExplanation": "চৰকাৰী পদযক্ষপ , মিক্ষ ানুষ্ঠ ানৰ বৃমি আৰু মিক্ষ াগত পমৰকল্প নাই অসমত মাধ্ যমমক মিক্ষ া িমক্ত িালী কৰাত সৈা\nকমৰমছল।"
  },
  {
    "id": 42,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Which educational issue is highlighted by this case?",
    "asQuestion": "এই নায াযে ককান মিক্ষাগত সমসযাক উজ্জ্বলভাযে প্ৰ কাি কযৰ ?",
    "enOptions": [
      "Excessive vocationalisation",
      "Educational inequality",
      "Overcrowding in universities",
      "Lack of examinations"
    ],
    "asOptions": [
      "অতযামধ্ ক বৃমিমুখীকৰণ",
      "মিক্ষাগত অসমতা",
      "মবশ্বমবদযাল ত অমতমাত্রা মভৰ",
      "পৰীক্ষাৰ অভাে"
    ],
    "correctIndex": 1,
    "enExplanation": "Differences in facilities and educational resources indicate educational inequality among regions.",
    "asExplanation": "সুমবধ্া আৰু মিক্ষাগত সম্পদৰ পাথযকযই অঞ্চলসমূৈৰ মােত মিক্ষাগত অসমতা প্ৰ কাি কযৰ।"
  },
  {
    "id": 43,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 19,
    "enQuestion": "Which measure would be most effective in improving the quality of secondary education in rural Assam?",
    "asQuestion": "গ্ৰ\nাময অসমত মাধ্যমমক মিক্ষাৰ গু ণগত মান উন্নত কৰাৰ বাযব ককান বযেস্থা সবযামধ্ক ফলপ্ৰসূ ৈ’ব ?",
    "enOptions": [
      "Reducing teacher training",
      "Increasing examination pressure",
      "Improving infrastructure and teacher quality",
      "Limiting educational access"
    ],
    "asOptions": [
      "মিক্ষক প্ৰ মিক্ষণ হ্ৰ াস কৰা",
      "পৰীক্ষ াৰ চাপ বৃমি কৰা",
      "আন্তঃগাঁথমন আৰু মিক্ষকৰ গু ণগত মান উন্নত কৰা",
      "মিক্ষাৰ সুযযাগ সীমমত কৰা"
    ],
    "correctIndex": 2,
    "enExplanation": "Quality education depends on trained teachers, adequate infrastructure and effective learning resources.",
    "asExplanation": "গু\nণগত মিক্ষা দক্ষ মিক্ষক , উপযুক্ত আন্তঃগাঁথমন আৰু মিক্ষণ সম্পদৰ ওপৰত মনভযৰিীল।"
  },
  {
    "id": 44,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Why are the recommendations of the Mudaliar and Kothari Commissions still considered relevant today?",
    "asQuestion": "মুদামল াৰ আৰু ককাঠাৰী আয াগৰ পৰামিযসমূৈ আমেও মকপ্ৰ াসংমগক বুমল গণয কৰা ৈ ?",
    "enOptions": [
      "They focused only on examinations.",
      "They addressed issues of quality, equality and national development.",
      "They discouraged educational reform.",
      "They eliminated vocational education."
    ],
    "asOptions": [
      "কতওঁযলাযক ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব মদমছল।",
      "কতওঁযলাযক গু ণগত মান , সমতা আৰু োতী উন্ন নৰ মবষ সমূৈ সযম্বাধ্ন কমৰমছল।",
      "কতওঁযলাযক মিক্ষাগত সংস্কাৰ মনৰুৎসামৈত কমৰমছল।",
      "কতওঁযলাযক বৃমিমুখী মিক্ষ া মবযলাপ কমৰমছল।"
    ],
    "correctIndex": 1,
    "enExplanation": "Many recommendations regarding educational quality, equality, vocationalisation and national development\nremain relevant in modern education.",
    "asExplanation": "মিক্ষাৰ গু ণগত মান , সমতা, বৃমিমুখীকৰণ আৰু োতী উন্ন নৰ হসযত েমডত বহু পৰামিয আমেও অতযন্ত\n প্ৰ\nাসংমগক।"
  },
  {
    "id": 45,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "A state government plans to reform secondary education by improving vocational training, strengthening\nscience education and ensuring equal opportunities for all learners. These reforms are most closely aligned\nwith which educational vision?",
    "asQuestion": "এখন ৰােয চৰকাযৰ মাধ্ যমমক মিক্ষ া সংস্ক াৰৰ বাযব বৃমিমূলক প্ৰ মিক্ষ ণ উন্ন ত কৰা, মবজ্ঞান মিক্ষা িমক্তিালী কৰা\nআৰু সকযলা মিক্ষাথীৰ বাযব সমান সুযযাগ মনমিত কৰাৰ পমৰকল্পনা কমৰযছ। এই সংস্কাৰসমূৈ ককান মিক্ষাগত\nদৃমষ্ট ভংগীৰ হসযত অমধ্ ক মমল খা ?",
    "enOptions": [
      "Examination-oriented education",
      "Combined vision of the Mudaliar and Kothari Commissions",
      "Elimination of secondary education",
      "Restriction of educational access"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা",
      "মুদামল াৰ আৰু ককাঠাৰী আয াগৰ সমমিত দৃমষ্ট ভংগী",
      "মাধ্যমমক মিক্ষা মবযলাপ",
      "মিক্ষাৰ সুযযাগ সীমমতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The reforms combine key ideas from both commissions, including vocational efficiency, science education,\nequality and national development.",
    "asExplanation": "এই সংস্কাৰসমূযৈ মুদামল াৰ আৰু ককাঠাৰী আয াগৰ মূল ধ্ াৰণাসমূৈ —বৃমিমূলক দক্ষ তা, মবজ্ঞান মিক্ষা , সমতা আৰু\nোতী উন্ন ন —সমমিতভাযে অন্তভুযক্ত কযৰ।"
  },
  {
    "id": 46,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Case:\nA state education department finds that student enrolment has increased significantly, but learning outcomes\nremain poor. The department plans to improve teacher training, guidance services and curriculum quality.\nWhich educational principle is most clearly reflected in this reform effort?",
    "asQuestion": "না:\nএখন ৰামেযক মিক্ষ া মবভাযগ লক্ষ য কমৰযছ কয মিক্ষ াথীৰ নামভমতয বৃমি পাইযছ, মকন্তু মিক্ষণ ফলাফল সযন্তাষেনক\nনৈ । মবভাগয াযে মিক্ষক প্ৰ মিক্ষণ , মনযদযিনা কসো আৰু পাঠযক্ৰমৰ মান উন্নত কৰাৰ পমৰকল্পনা কমৰযছ।\nএই সংস্কাৰ প্ৰ যচষ্টাই ককান মিক্ষাগত নীমতক সবযামধ্ক স্পষ্ট ভাযে প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Expansion without quality",
      "Quality-oriented educational reform",
      "Reduction of educational opportunities",
      "Examination-centred education"
    ],
    "asOptions": [
      "গু ণগত মান অমবৈযন সম্প্ৰসাৰণ",
      "গু ণগত মিক্ষামুখী সংস্কাৰ",
      "মিক্ষাৰ সুযযাগ হ্ৰ াস",
      "পৰীক্ষাযকমিক মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "Educational reform should focus not only on access but also on improving the quality of teaching,\ncurriculum and student support.",
    "asExplanation": "মিক্ষ াগত সংস্ক াযৰ ককেল সুযযাগ বৃমিৰ ওপৰত নৈ , মিক্ষাদান , পাঠযক্ৰম আৰু মিক্ষাথী সৈা বযেস্থাৰ গু ণগত\nমান উন্নত কৰাৰ ওপৰযতা গু ৰুত্ব মদব লাযগ।"
  },
  {
    "id": 47,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "A country faces a growing mismatch between academic qualifications and employment opportunities.\nWhich recommendation from educational reforms would most directly address this issue?",
    "asQuestion": "এখন কদিত একাযিমমক কযাগযতা আৰু কমযসংস্থ াপনৰ সুযযাগৰ মােত বযেধ্ ান বৃমি পাইযছ। মিক্ষ াগত সংস্ক াৰৰ\nককান পৰামিযই এই সমসযাক সবযামধ্ক প্ৰ তযক্ষভাযে সমাধ্ান কমৰব ?",
    "enOptions": [
      "Increasing written examinations",
      "Vocationalisation of education",
      "Reducing science education",
      "Limiting school expansion"
    ],
    "asOptions": [
      "মলমখত পৰীক্ষ া বৃমি",
      "মিক্ষ াৰ বৃমিমুখীকৰণ",
      "মবজ্ঞান মিক্ষা হ্ৰ াস",
      "মবদযাল সম্প্ৰসাৰণ সীমমতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation links education with practical skills and labour market needs.",
    "asExplanation": "বৃমিমুখীকৰযণ মিক্ষ াক বযেৈামৰক দক্ষ তা আৰু কমযবোৰৰ প্ৰ য ােনৰ হসযত সংযুক্ত কযৰ।"
  },
  {
    "id": 48,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Assertion (A):\nEqual educational opportunity remains an important goal of modern education.\nReason (R):\nEducational inequality can limit social mobility and national development.",
    "asQuestion": "উমক্ত ( A):\nসমান মিক্ষাৰ সুযযাগ আধ্ুমনক মিক্ষাৰ এক গু ৰুত্বপূণয লক্ষয হৈ আযছ।\nকাৰণ (R):\nমিক্ষাগত অসমতাই সামামেক গমতিীলতা আৰু োতী উন্ন ন সীমমত কমৰব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Equal opportunity promotes social justice and allows individuals to contribute fully to national development.",
    "asExplanation": "সমান সুযযাযগ সামামেক নযাপ্ৰ মতষ্ঠ া কযৰ আৰু বযমক্ত ক োতী উন্ন নত সম্পূ ণযভাযে অেদান ৰামখবলল সক্ষ ম\nকযৰ।"
  },
  {
    "id": 49,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "Which educational reform proposal best combines the visions of the Mudaliar Commission, the Kothari\nCommission and the National Policy on Education (1986)?",
    "asQuestion": "ককান মিক্ষাগত সংস্কাৰ প্ৰস্ত াযে মুদামল াৰ আয াগ , ককাঠাৰী আয াগ আৰু ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -ৰ\nদৃমষ্ট ভংগীক সবযামধ্ ক সফলভাযে একমত্র ত কযৰ?",
    "enOptions": [
      "Focus only on board examinations",
      "Promote equality, quality, vocational skills and national development",
      "Reduce access to secondary education",
      "Eliminate practical learning"
    ],
    "asOptions": [
      "ককেল ব'িয পৰীক্ষাৰ ওপৰত গু ৰুত্ব মদ া",
      "সমতা, গু ণগত মান , বৃমিমূলক দক্ষ তা আৰু োতী উন্ন নক উৎসামৈত কৰা",
      "মাধ্যমমক মিক্ষাৰ সুযযাগ হ্ৰ াস কৰা",
      "বযেৈামৰক মিক্ষণ মবযলাপ কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The common vision across these reforms includes educational quality, equality, vocational relevance and\nnational progress.",
    "asExplanation": "এই সকযলা সংস্কাৰৰ মূল লক্ষয হৈযছ মিক্ষাৰ গু ণগত মান , সমতা, বৃমিমুখী প্ৰ াসংমগকতা আৰু োতী অগ্ৰ গমত।"
  },
  {
    "id": 50,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "A future-ready secondary education system should primarily aim to—",
    "asQuestion": "ভমেষযৎমুখী মাধ্যমমক মিক্ষা বযেস্থাৰ মুখয লক্ষয মক ৈ’ব লাযগ ?",
    "enOptions": [
      "Prepare students only for examinations",
      "Develop knowledgeable, skilled, responsible and adaptable citizens",
      "Eliminate vocational education",
      "Focus only on academic achievement"
    ],
    "asOptions": [
      "ককেল পৰীক্ষাৰ বাযব মিক্ষাথীক প্ৰস্তু ত কৰা",
      "জ্ঞ ানসম্পন্ন , দক্ষ , দাম ত্ব িীল আৰু অমভযযােনক্ষম নাগমৰক গম়ি কতালা",
      "বৃমিমুখী মিক্ষ া মবযলাপ কৰা",
      "ককেল একাযিমমক সফলতাৰ ওপৰত গু ৰুত্ব মদ া"
    ],
    "correctIndex": 1,
    "enExplanation": "Modern educational reforms aim to develop holistic individuals who can contribute effectively to society\nand national development.",
    "asExplanation": "আধ্ুমনক মিক্ষাগত সংস্কাৰৰ লক্ষয হৈযছ এযন সবযাঙ্গীন বযমক্তত্ব গম়ি কতালা মযয সমাে আৰু োতী উন্ন নত\nফলপ্ৰসূ অেদান ৰামখব পাযৰ।"
  },
  {
    "id": 51,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "What was the central philosophy of the Kothari Commission regarding education?",
    "asQuestion": "মিক্ষাৰ কক্ষত্রত ককাঠাৰী আয াগৰ ককিী দিযন মক আমছল ?",
    "enOptions": [
      "Education for examinations",
      "Education for national development",
      "Education for memorization",
      "Education for administration only"
    ],
    "asOptions": [
      "পৰীক্ষাৰ বাযব মিক্ষা",
      "োতী উন্ন নৰ বাযব মিক্ষা",
      "মুখস্থ মবদযাৰ বাযব মিক্ষা",
      "ককেল প্ৰ িাসনৰ বাযব মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Kothari Commission viewed education as the most powerful instrument of national development.",
    "asExplanation": "ককাঠাৰী আয াযগ মিক্ষাক োতী উন্ন নৰ আ াইতলক িমক্তিালী উপা মৈচাযপ গণয কমৰমছল।"
  },
  {
    "id": 52,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 14,
    "enQuestion": "Which common objective was emphasized by both the Kothari Commission and the National Policy on\nEducation (1986)?",
    "asQuestion": "ককাঠাৰী আয াগ আৰু ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) উভয ই ককান সাধ্াৰণ লক্ষযৰ ওপৰত গু ৰুত্ব আযৰাপ\nকমৰমছল?",
    "enOptions": [
      "Restricting access to education",
      "Equality of educational opportunity",
      "Reducing science education",
      "Limiting vocational education"
    ],
    "asOptions": [
      "মিক্ষাৰ সুযযাগ সীমমত কৰা",
      "মিক্ষাৰ সমান সুযযাগ",
      "মবজ্ঞান মিক্ষা হ্ৰ াস কৰা",
      "বৃমিমুখী মিক্ষ া সীমমত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Both emphasized educational equality as a means to promote social justice and national progress.",
    "asExplanation": "উভয ই সামামেক নযা আৰু োতী অগ্ৰগমতৰ বাযব মিক্ষাগত সমতাৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 53,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 7,
    "enQuestion": "Which statement correctly distinguishes the Mudaliar Commission from the Kothari Commission?",
    "asQuestion": "ককান বক্ত বযই মুদামল াৰ আয াগক ককাঠাৰী আয াগৰ পৰা সঠিকভাযে পৃথক কযৰ?",
    "enOptions": [
      "Mudaliar Commission focused mainly on secondary education, while Kothari Commission examined",
      "Both dealt only with university education.",
      "Kothari Commission focused only on secondary education.",
      "Both commissions had identical objectives and scope."
    ],
    "asOptions": [
      "মুদামল াৰ আয াযগ মূলতঃ মাধ্যমমক মিক্ষাৰ ওপৰত গু ৰুত্ব মদমছল , আনৈাযত ককাঠাৰী আয াযগ সমগ্ৰ মিক্ষা",
      "দুয া াই ককেল মবশ্বমবদযাল মিক্ষা অধ্য ন কমৰমছল।",
      "ককাঠাৰী আয াযগ ককেল মাধ্যমমক মিক্ষাৰ ওপৰত গু ৰুত্ব মদমছল।",
      "দুয া া আয াগৰ লক্ষয আৰু পমৰসৰ এযক আমছল।"
    ],
    "correctIndex": 0,
    "enExplanation": "The Mudaliar Commission concentrated on secondary education, whereas the Kothari Commission reviewed\nthe entire educational system.",
    "asExplanation": "মুদামল াৰ আয াযগ মাধ্যমমক মিক্ষাৰ ওপৰত গু ৰুত্ব মদমছল , মকন্তু ককাঠাৰী আয াযগ সমগ্ৰ মিক্ষা বযেস্থাৰ\nপযযাযলাচনা কমৰমছল।"
  },
  {
    "id": 54,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 18,
    "enQuestion": "A district administration plans to improve secondary education by opening new schools, appointing trained\nteachers and providing laboratories. Which educational goal is being pursued?",
    "asQuestion": "এখন মেলা প্ৰ িাসযন নতুন মবদযালস্থ াপন , প্ৰ মিমক্ষত মিক্ষক মনযুমক্ত আৰু পৰীক্ষাগাৰ স্থ াপনৰ েমৰ যত মাধ্যমমক\nমিক্ষা উন্নত কৰাৰ পমৰকল্পনা কমৰযছ। ই াত ককান মিক্ষাগত লক্ষয অনুসৰণ কৰা হৈযছ ?",
    "enOptions": [
      "Educational expansion and quality improvement",
      "Restriction of educational access",
      "Reduction of educational facilities",
      "Examination reform only"
    ],
    "asOptions": [
      "মিক্ষাৰ সম্প্ৰসাৰণ আৰু গু ণগত উন্ন ন",
      "মিক্ষাৰ সুযযাগ সীমমতকৰণ",
      "মিক্ষাগত সুমবধ্া হ্ৰ াস",
      "ককেল পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 0,
    "enExplanation": "Educational development requires both expansion of access and improvement in quality.",
    "asExplanation": "মিক্ষাৰ মবকািৰ বাযব সুযযাগৰ সম্প্ৰসাৰণ আৰু গু ণগত উন্ন ন দুয া াই প্ৰ য ােন।"
  },
  {
    "id": 55,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 20,
    "enQuestion": "If you were designing a modern secondary education system based on Unit I concepts, which combination\nwould be most appropriate?",
    "asQuestion": "Unit I-ৰ ধ্ াৰণাসমূৈৰ মভমিত যমদ আপুমন এখন আধ্ুমনক মাধ্যমমক মিক্ষা বযেস্থা মিোইন কযৰ , কতযন্ত ককান\nসমি য া সবযামধ্ক উপযুক্ত ৈ 'ব?",
    "enOptions": [
      "Examinations + Memorization",
      "Equality + Vocational Skills + Quality Education + Scientific Outlook",
      "Reduced Access + Limited Curriculum",
      "Academic Learning Only"
    ],
    "asOptions": [
      "পৰীক্ষা + মুখস্থ মবদযা",
      "সমতা + বৃমিমূলক দক্ষ তা + গু ণগত মিক্ষ া + হবজ্ঞ ামনক দৃমষ্ট ভংগী",
      "সীমমত সুযযাগ + সীমমত পাঠযক্ৰম",
      "ককেল একাযিমমক মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "Modern educational reforms emphasize equity, quality, vocational competence and scientific thinking for\nholistic development.",
    "asExplanation": "আধ্ুমনক মিক্ষাগত সংস্কাযৰ সবযাঙ্গীন মবকািৰ বাযব সমতা , গু ণগত মিক্ষা , বৃমিমূলক দক্ষ তা আৰু হবজ্ঞ ামনক\nমচন্তাধ্াৰাৰ ওপৰত গু ৰুত্ব মদয ।"
  },
  {
    "id": 56,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A school organizes mock parliament sessions, community discussions and civic awareness programmes.\nWhich aim of secondary education is primarily promoted?",
    "asQuestion": "এখন মবদযালয নকল সংসদ অমধ্যেিন , সামামেক আযলাচনা আৰু নাগমৰক সযচতনতা কাযযসূচী আয ােন কযৰ।\nই াৰ দ্ব াৰা মাধ্যমমক মিক্ষাৰ ককান লক্ষয মূলতঃ মবকমিত ৈ ?",
    "enOptions": [
      "Vocational efficiency",
      "Democratic citizenship",
      "Technical specialization",
      "Examination preparation"
    ],
    "asOptions": [
      "বৃমিমূলক দক্ষ তা",
      "গণতামন্ত্ৰক নাগমৰকত্ব",
      "কামৰকৰী মবযিষজ্ঞতা",
      "পৰীক্ষাৰ প্ৰস্তু মত"
    ],
    "correctIndex": 1,
    "enExplanation": "These activities help students understand democratic values, rights, duties and civic responsibilities.",
    "asExplanation": "এই কাযযসূচীযবাযৰ মিক্ষাথীক গণতামন্ত্ৰক মূলযযবাধ্ , অমধ্কাৰ , কতযবয আৰু নাগমৰক দাম ত্ব ৰ জ্ঞ ান প্ৰ দান কযৰ।"
  },
  {
    "id": 57,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 3,
    "enQuestion": "Which recommendation of the Mudaliar Commission most directly addressed the problem of a rigid and\nbook-centered curriculum?",
    "asQuestion": "কযঠাৰ আৰু পুমথযকমিক পাঠযক্ৰমৰ সমসযাৰ সবযামধ্ক প্ৰ তযক্ষ সমাধ্ান মৈচাযপ মুদামল াৰ আয াযগ ককান পৰামিয\nআগব়িাইমছল ?",
    "enOptions": [
      "Diversified curriculum",
      "Increasing examinations",
      "Restricting co-curricular activities",
      "Reducing guidance services"
    ],
    "asOptions": [
      "হবমচত্রম পাঠযক্ৰম",
      "পৰীক্ষ া বৃমি",
      "সৈ-পাঠযক্ৰম কাযয সীমমতকৰণ",
      "মনযদযিনা কসো হ্ৰ াস"
    ],
    "correctIndex": 0,
    "enExplanation": "A diversified curriculum was introduced to meet different interests, aptitudes and future needs of learners.",
    "asExplanation": "মিক্ষাথীৰ মবমভন্ন আগ্ৰৈ , কযাগযতা আৰু ভমেষযৎ প্ৰ য ােন পূৰণৰ বাযব হবমচত্রম পাঠযক্ৰমৰ পৰামিয মদ া\nহৈমছল।"
  },
  {
    "id": 58,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 11,
    "enQuestion": "Assertion (A):\nScience education received special emphasis in educational reforms.\nReason (R):\nScientific thinking is essential for modernization and national progress.",
    "asQuestion": "উমক্ত ( A):\nমিক্ষাগত সংস্কাৰসমূৈত মবজ্ঞান মিক্ষাৰ ওপৰত মবযিষ গু ৰুত্ব আযৰাপ কৰা হৈমছল।\n\n\n\nকাৰণ (R):\nহবজ্ঞামনক মচন্তাধ্াৰা আধ্ুমনকীকৰণ আৰু োতী অগ্ৰগমতৰ বাযব অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "Science education was promoted because scientific temper is vital for technological advancement and\ndevelopment.",
    "asExplanation": "মবজ্ঞান মিক্ষা গু ৰুত্ব মদ া হৈমছল কাৰণ হবজ্ঞামনক মযনাভাে প্ৰ যুমক্তগত আৰু োতী মবকািৰ বাযব অতযন্ত\n প্ৰ\nয ােনী ।"
  },
  {
    "id": 59,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 17,
    "enQuestion": "Case:\nA state reports that thousands of students complete secondary education every year, yet many remain\nunemployed because they lack practical job skills.\nWhich reform would be most effective?",
    "asQuestion": "না:\nএখন ৰােযত ৈাোৰ ৈাোৰ মিক্ষ াথীয মাধ্ যমমক মিক্ষ া সম্পূ ণয কযৰ, মকন্তু বযেৈামৰক কমযদক্ষতাৰ অভােত\nবহুেন মনবনুো হৈ থাযক।\nককান সংস্কাৰ সবযামধ্ক ফলপ্ৰসূ ৈ 'ব?",
    "enOptions": [
      "More written examinations",
      "Vocationalisation of secondary education",
      "Reduction of practical training",
      "Limiting technical courses"
    ],
    "asOptions": [
      "অমধ্ক মলমখত পৰীক্ষা",
      "মাধ্ যমমক মিক্ষ াৰ বৃমিমুখীকৰণ",
      "বযেৈামৰক প্ৰ মিক্ষণ হ্ৰ াস",
      "কামৰকৰী পাঠযক্ৰম সীমমতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation equips learners with employable skills and reduces the gap between education and\nemployment.",
    "asExplanation": "বৃমিমুখীকৰযণ মিক্ষ াথীক কযমযাপযযাগী দক্ষ তা প্ৰ দান কমৰ মিক্ষ া আৰু কমযসংস্থ াপনৰ মােৰ বযেধ্ ান হ্ৰ াস কযৰ।"
  },
  {
    "id": 60,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which combination best represents the collective vision of the Mudaliar Commission, Kothari Commission\nand National Policy on Education (1986)?",
    "asQuestion": "মুদামল াৰ আয াগ, ককাঠাৰী আয াগ আৰু ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -ৰ সামূমৈক দৃমষ্ট ভংগীক ককান\nসমি য াযে সবযামধ্ক সঠিকভাযে প্ৰ কাি কযৰ ?",
    "enOptions": [
      "Examination + Memorization + Competition",
      "Equality + Quality + Vocational Skills + National Development",
      "Restriction + Uniformity + Elimination of Practical Work",
      "Academic Achievement Only"
    ],
    "asOptions": [
      "পৰীক্ষা + মুখস্থ মবদযা + প্ৰ মতযযামগতা",
      "সমতা + গু ণগত মান + বৃমিমূলক দক্ষ তা + োতী উন্ন ন",
      "সীমাবিতা + একৰূপতা + বযেৈামৰক মিক্ষাৰ মবযলাপ",
      "ককেল একাযিমমক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major reforms consistently promoted educational quality, equal opportunity, vocational relevance and\nnational development.",
    "asExplanation": "এই সকযলা মিক্ষাগত সংস্কাযৰ গু ণগত মিক্ষা , সমান সুযযাগ, বৃমিমুখী প্ৰ াসংমগকতা আৰু োতী উন্ন নৰ ওপৰত\n গু\nৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 61,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA secondary school offers Science, Commerce, Agriculture, Fine Arts and Technical subjects under one\ninstitution so that students can choose according to their interests and abilities.\nThis model is best described as:",
    "asQuestion": "না:\nএখন মাধ্যমমক মবদযালয মবজ্ঞান , বামণেয, কৃমষ, মচত্রকলা আৰু কামৰকৰী মবষ এযক প্ৰ মতষ্ঠানৰ অন্তগযতভাযে\n প্ৰ\nদান কৰা ৈ যাযত মিক্ষাথীসকযল মনেৰ আগ্ৰৈ আৰু সামথযয অনুসমৰ মবষ বাছমন কমৰব পাযৰ।\nএই মযিলয াক সবযামধ্ক উপযুক্তভাযে মক বুমল ককাো ৈ ?",
    "enOptions": [
      "Traditional School",
      "Multipurpose School",
      "Open University",
      "Correspondence School"
    ],
    "asOptions": [
      "পৰম্পৰাগত মবদযাল",
      "বহুমুখী মবদযাল",
      "মুক্ত মবশ্বমবদযাল",
      "িাকযযাযগ মিক্ষা/যযাগাযযাগ মিক্ষা মবদযাল"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission recommended multipurpose schools to cater to diverse interests, aptitudes and\nvocational needs.",
    "asExplanation": "মুদামল াৰ আয াযগ মিক্ষাথীৰ মবমভন্ন আগ্ৰৈ , কযাগযতা আৰু বৃমিমূলক প্ৰ য ােন পূৰণৰ বাযব বহু মুখী মবদযাল ৰ\nপৰামিয মদমছল।"
  },
  {
    "id": 62,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A school integrates gardening, community service, school maintenance and productive manual work into the\ncurriculum.\nWhich recommendation of the Kothari Commission is most clearly reflected?",
    "asQuestion": "এখন মবদযালয বামগচা কময, সমােযসো, মবদযাল ৰক্ষণাযবক্ষণ আৰু উৎপাদনিীল িাৰীমৰক কময পাঠযক্ৰমৰ অংি\nমৈচাযপ অন্তভুযক্ত কমৰযছ।\nই ককাঠাৰী আয াগৰ ককান পৰামিযক সবযামধ্ক স্পষ্ট ভাযে প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Examination Reform",
      "Distance Education"
    ],
    "asOptions": [
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "কময অমভজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ",
      "দূৰেিী মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission emphasized work experience to connect education with productive labour and social\nresponsibility.",
    "asExplanation": "আয াযগ মিক্ষাক উৎপাদনিীল কময আৰু সামামেক দাম ত্ব ৰ হসযত সংযযাগ কমৰবলল কময অমভজ্ঞতাৰ ওপৰত\n গু\nৰুত্ব মদমছল।"
  },
  {
    "id": 63,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Assertion (A):\nThe National Policy on Education (1986) emphasized education for women and disadvantaged groups.\nReason (R):\nEducational equality is essential for social justice and national development.",
    "asQuestion": "উমক্ত ( A):\nৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -এ মমৈলা আৰু বমঞ্চত কগা সমূৈৰ মিক্ষাৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।\nকাৰণ (R):\nমিক্ষাগত সমতা সামামেক নযা আৰু োতী উন্ন নৰ বাযব অতযােিযক।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 emphasized equality and special support for disadvantaged groups to achieve social justice.",
    "asExplanation": "NPE 1986-এ সামামেক নযা মনমিত কমৰবলল বমঞ্চত কগা সমূৈৰ বাযব মবযিষ মিক্ষাগত সুমবধ্াৰ ওপৰত গু ৰুত্ব\nআযৰাপ কমৰমছল।"
  },
  {
    "id": 64,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\n\n\n\nA rural area in Assam has sufficient school buildings but suffers from teacher shortages, inadequate\nlaboratories and poor learning outcomes.\nWhich strategy would be most effective?",
    "asQuestion": "না:\nঅসমৰ এ া গ্ৰ াময অঞ্চলত মবদযাল ভেন যযথষ্ট আযছ , মকন্তু মিক্ষক সংক , অপযযাপ্ত পৰীক্ষাগাৰ আৰু দুবযল\nমিক্ষণ ফলাফল মবদযমান।\nককান ককৌিলয া সবযামধ্ক ফলপ্ৰসূ ৈ 'ব?",
    "enOptions": [
      "Construct more buildings only",
      "Improve teacher quality and learning resources",
      "Increase examination frequency",
      "Reduce enrolment"
    ],
    "asOptions": [
      "ককেল অমধ্ক ভেন মনমযাণ কৰা",
      "মিক্ষকৰ গু ণগত মান আৰু মিক্ষণ সম্পদ উন্নত কৰা",
      "পৰীক্ষ াৰ সংখযা বৃমি কৰা",
      "নামভমতয হ্ৰ াস কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Quality improvement requires qualified teachers, adequate resources and effective learning support.",
    "asExplanation": "গু\nণগত উন্ন নৰ বাযব দক্ষ মিক্ষক , পযযাপ্ত সম্পদ আৰু ফলপ্ৰসূ মিক্ষণ সৈা ৰ প্ৰ য ােন।"
  },
  {
    "id": 65,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A modern secondary education policy aims to balance vocational skills, educational equality, scientific\noutlook and character development.\nThis approach is most consistent with:",
    "asQuestion": "এখন আধ্ু মনক মাধ্ যমমক মিক্ষ া নীমতয বৃমিমূলক দক্ষ তা, মিক্ষাগত সমতা , হবজ্ঞ ামনক দৃমষ্ট ভংগী আৰু চমৰত্র গঠনৰ\nমােত সমতা স্থ াপন কমৰবলল কচষ্টা কযৰ।\nএই পিমত সবযামধ্ক মকৈৰ হসযত সামঞ্জসযপূণয ?",
    "enOptions": [
      "Examination-centred education",
      "Integrated reform vision of major educational commissions and policies",
      "Memorization-based education",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা",
      "মুখয মিক্ষ াগত আয াগ আৰু নীমতসমূৈৰ সমমিত সংস্ক াৰমূলক দৃমষ্ট ভংগী",
      "মুখস্থমভমিক মিক্ষা",
      "সীমমত পাঠযক্ৰম মযিল"
    ],
    "correctIndex": 1,
    "enExplanation": "The combined educational vision of Mudaliar Commission, Kothari Commission and NPE 1986 promotes\nbalanced development through equality, skills, values and scientific thinking.",
    "asExplanation": "মুদামল াৰ আয াগ, ককাঠাৰী আয াগ আৰু NPE 1986-ৰ সমমিত দৃমষ্ট ভংগীয সমতা, দক্ষতা , মূলযযবাধ্ আৰু\nহবজ্ঞামনক মচন্তাধ্াৰাৰ েমৰ যত সুষম মবকািৰ ওপৰত গু ৰুত্ব মদয ।"
  },
  {
    "id": 66,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A student is unable to choose between science, commerce and vocational courses because he is unaware of\nhis own interests and abilities. Which recommendation of the Mudaliar Commission would best help him?",
    "asQuestion": "এেন মিক্ষাথীয মবজ্ঞান , বামণেয আৰু বৃমিমুখী পাঠযক্ৰ মৰ মােত বাছমন কমৰব পৰা নাই, কাৰণ কতওঁ মনেৰ\nআগ্ৰৈ আৰু সামথযয সম্পযকয সযচতন নৈ । মুদামল াৰ আয াগৰ ককান পৰামিযই কতওঁক সবযামধ্ক সৈা কমৰব ?",
    "enOptions": [
      "Examination Reform",
      "Guidance and Counselling Service",
      "Multipurpose School Building",
      "Physical Education Programme"
    ],
    "asOptions": [
      "পৰীক্ষা সংস্কাৰ",
      "মনযদযিনা আৰু পৰামিযদান কসো",
      "বহুমুখী মবদযাল ভেন",
      "িাৰীমৰক মিক্ষা কাযযসূচী"
    ],
    "correctIndex": 1,
    "enExplanation": "Guidance services help learners identify their interests, aptitudes and suitable educational or vocational\npathways.",
    "asExplanation": "মনযদযিনা কসোই মিক্ষাথীক মনেৰ আগ্ৰৈ , কযাগযতা আৰু উপযুক্ত মিক্ষ াগত বা বৃমিমুখী পথ মচনাক্ত কৰাত সৈা\nকযৰ।"
  },
  {
    "id": 67,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "What was the primary objective of the Common School System recommended by the Kothari Commission?",
    "asQuestion": "ককাঠাৰী আয াযগ পৰামিয মদ া সাধ্াৰণ মবদযাল বযেস্থাৰ মুখয উযেিয মক আমছল ?",
    "enOptions": [
      "To increase private education",
      "To provide equal educational opportunities irrespective of social background",
      "To reduce secondary school enrolment",
      "To promote examination competition"
    ],
    "asOptions": [
      "বযমক্ত গত মিক্ষ া বৃমি কৰা",
      "সামামেক প ভূমম মনমবযযিযষ সমান মিক্ষাৰ সুযযাগ প্ৰ দান কৰা",
      "মাধ্যমমক মবদযাল ত নামভমতয হ্ৰ াস কৰা",
      "পৰীক্ষ ামূলক প্ৰ মতযযামগতা বৃমি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Common School System aimed to reduce educational inequalities and promote social justice.",
    "asExplanation": "সাধ্াৰণ মবদযাল বযেস্থাৰ লক্ষয আমছল মিক্ষাগত অসমতা হ্ৰ াস কমৰ সামামেক নযাপ্ৰ মতষ্ঠা কৰা।"
  },
  {
    "id": 68,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA rural school receives additional classrooms, teaching-learning materials and basic educational facilities\nunder a government programme.\nWhich NPE 1986 initiative is reflected here?",
    "asQuestion": "না:\n\n\n\nএখন গ্ৰ াময মবদযালয চৰকাৰী কাযযসূচীৰ অধ্ীনত অমতমৰক্ত কেণীযকাঠা , মিক্ষণ -মিকন সামগ্ৰী আৰু কমৌমলক\nমিক্ষাগত সুমবধ্া লাভ কযৰ।\nই NPE 1986-ৰ ককান পদযক্ষপক প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Common School System",
      "Work Experience",
      "Operation Blackboard",
      "Vocationalisation"
    ],
    "asOptions": [
      "সাধ্াৰণ মবদযাল বযেস্থা",
      "কময অমভজ্ঞতা",
      "অপাযৰচন কেকব'িয",
      "বৃমিমুখীকৰণ"
    ],
    "correctIndex": 2,
    "enExplanation": "Operation Blackboard sought to provide minimum essential facilities and resources in schools.",
    "asExplanation": "অপাযৰচন কেকব'িযৰ লক্ষয আমছল মবদযাল সমূৈত নূযনতম প্ৰ য ােনী সুমবধ্া আৰু সম্পদ মনমিত কৰা।"
  },
  {
    "id": 69,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A district has achieved universal access to secondary schools, but student achievement levels remain low.\nWhich reform should be given highest priority?",
    "asQuestion": "এখন মেলাই মাধ্যমমক মবদযাল ত সাবযেনীন প্ৰ যেিামধ্কাৰ মনমিত কমৰযছ , মকন্তু মিক্ষাথীৰ হিমক্ষক সাফলয মনম্ন।\nককান সংস্কাৰক সবযামধ্ক অগ্ৰামধ্কাৰ মদব লাযগ ?",
    "enOptions": [
      "Opening more schools",
      "Improving teacher effectiveness and learning quality",
      "Reducing practical activities",
      "Increasing examination frequency"
    ],
    "asOptions": [
      "অমধ্ক মবদযালস্থ াপন",
      "মিক্ষকৰ কাযযদক্ষতা আৰু মিক্ষণৰ গু ণগত মান উন্নত কৰা",
      "বযেৈামৰক কাযয হ্ৰ াস কৰা",
      "পৰীক্ষ াৰ সংখযা বৃমি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Once access is achieved, educational quality becomes the key factor for improvement.",
    "asExplanation": "প্ৰ\nযেিামধ্কাৰ মনমিত কৈাোৰ মপছত মিক্ষাৰ গু ণগত মান উন্নত কৰায া আ াইতলক গু ৰুত্বপূণয হৈ পযৰ।"
  },
  {
    "id": 70,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A policy maker wants to design a secondary education system that promotes equality, vocational\ncompetence, democratic citizenship and scientific thinking. Which educational approach is most\nappropriate?",
    "asQuestion": "এেন নীমত মনধ্যাৰযক এযন এখন মাধ্যমমক মিক্ষা বযেস্থা গম়ি তুমলব মবচাযৰ মযয সমতা , বৃমিমূলক দক্ষ তা,\nগণতামন্ত্ৰক নাগমৰকত্ব আৰু হবজ্ঞামনক মচন্তাধ্াৰা মবকাি কযৰ। ককান মিক্ষাগত পিমত সবযামধ্ক উপযুক্ত ?",
    "enOptions": [
      "Examination-centred model",
      "Integrated reform-based model",
      "Memorization-based model",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মযিল",
      "সমমিত সংস্কাৰমভমিক মযিল",
      "মুখস্থমভমিক মযিল",
      "সীমমত পাঠযক্ৰম মযিল"
    ],
    "correctIndex": 1,
    "enExplanation": "The integrated reform model combines the major educational goals promoted by the Mudaliar Commission,\nKothari Commission and NPE 1986.",
    "asExplanation": "সমমিত সংস্কাৰমভমিক মযিলয াযে মুদামল াৰ আয াগ , ককাঠাৰী আয াগ আৰু NPE 1986-এ আগবয়িাো মুখয\nমিক্ষাগত লক্ষযসমূৈ একমত্রত কযৰ।"
  },
  {
    "id": 71,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA school evaluates students only through a final annual examination. Students memorize information but\ndemonstrate weak practical skills and poor creativity.\nWhich criticism of the existing secondary education system was identified by the Mudaliar Commission?",
    "asQuestion": "না:\nএখন মবদযালয মিক্ষাথীক ককেল বামষযক চূডান্ত পৰীক্ষাৰ েমৰ যত মূলযা ন কৰা ৈ । মিক্ষাথীসকযল তথয মুখস্থ\nকযৰ, মকন্তু বযেৈামৰক দক্ষ তা আৰু সৃমষ্ট িীলতা দুবযল।\nমুদামল াৰ আয াযগ মবদযমান মাধ্যমমক মিক্ষা বযেস্থাৰ ককান সমাযলাচনায া আগব়িাইমছল ?",
    "enOptions": [
      "Excessive vocationalisation",
      "Examination-centred education",
      "Excessive co-curricular activities",
      "Overemphasis on creativity"
    ],
    "asOptions": [
      "অতযামধ্ ক বৃমিমুখীকৰণ",
      "পৰীক্ষাযকমিক মিক্ষা",
      "অতযামধ্ক সৈ -পাঠযক্ৰম কাযয",
      "সৃমষ্ট িীলতাৰ ওপৰত অতযামধ্ ক গু ৰুত্ব"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission strongly criticized an examination-dominated system that encouraged rote learning and\nneglected holistic development.",
    "asExplanation": "আয াযগ এযন পৰীক্ষ াযকমিক বযেস্থ াৰ সমাযলাচনা কমৰমছল মযয মুখস্থ মবদযাৰ প্ৰ েণতা বৃমি কমৰমছল আৰু\nসবযাঙ্গীন মবকাি উযপক্ষা কমৰমছল।"
  },
  {
    "id": 72,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Assertion (A):\nThe Kothari Commission considered education an important instrument for national integration.\nReason (R):\nEducation can promote common values, social cohesion and national unity.",
    "asQuestion": "উমক্ত ( A):\n\n\n\nককাঠাৰী আয াযগ মিক্ষাক োতী সংৈমতৰ এক গু ৰুত্বপূণয উপা বুমল গণয কমৰমছল।\nকাৰণ (R):\nমিক্ষাই সাধ্াৰণ মূলযযবাধ্ , সামামেক সংৈমত আৰু োতী ঐকয গম়ি তুমলব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission believed education could unite diverse groups and strengthen national identity.",
    "asExplanation": "আয াগৰ মযত মিক্ষা মবমভন্ন কগা ক একমত্রত কমৰ োতী পমৰচ আৰু সংৈমত িমক্তিালী কমৰব পাযৰ।"
  },
  {
    "id": 73,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which measure would most effectively improve educational quality according to the spirit of NPE 1986?",
    "asQuestion": "NPE 1986-ৰ মূল দৃমষ্ট ভংগী অনুসমৰ মিক্ষ াৰ গু ণগত মান উন্ন ত কৰাৰ বাযব ককান বযেস্থ ায া সবযামধ্ ক ফলপ্ৰ সূ?",
    "enOptions": [
      "Increasing examination pressure",
      "Improving teacher preparation and learning resources",
      "Reducing educational access",
      "Limiting science education"
    ],
    "asOptions": [
      "পৰীক্ষ াৰ চাপ বৃমি",
      "মিক্ষক প্ৰস্তু মত আৰু মিক্ষণ সম্পদ উন্নত কৰা",
      "মিক্ষাৰ সুযযাগ সীমমত কৰা",
      "মবজ্ঞান মিক্ষা সীমমত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "NPE 1986 emphasized teacher development, learning resources and quality improvement measures.",
    "asExplanation": "NPE 1986-এ মিক্ষক উন্ন ন , মিক্ষণ সম্পদ আৰু গু ণগত উন্ন নৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 74,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A region experiences rapid industrial growth but schools continue to provide only traditional academic\neducation. What is the most likely consequence?",
    "asQuestion": "এ া অঞ্চলত দ্ৰু ত ঔযদযামগক মবকাি টিযছ , মকন্তু মবদযাল সমূযৈ ককেল পৰম্পৰাগত একাযিমমক মিক্ষা প্ৰ দান\nকমৰ আযছ। সম্ভােয ফলাফল মক ৈ 'ব?",
    "enOptions": [
      "Better employment matching",
      "Increased gap between education and employment",
      "Greater vocational competence",
      "Reduction in skill shortages"
    ],
    "asOptions": [
      "কমযসংস্থাপনৰ হসযত উন্নত সামঞ্জসয",
      "মিক্ষ া আৰু কমযসংস্থ াপনৰ মােৰ বযেধ্ ান বৃমি",
      "অমধ্ ক বৃমিমূলক দক্ষ তা",
      "দক্ষতাৰ া মত হ্ৰ াস"
    ],
    "correctIndex": 1,
    "enExplanation": "Without vocational orientation, education may fail to meet labour market needs.",
    "asExplanation": "বৃমিমুখী মিক্ষ া অমবৈযন মিক্ষ া বযেস্থ াই কমযবোৰৰ প্ৰ য ােন পূৰণ কমৰব কনাোযৰ।"
  },
  {
    "id": 75,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A state wants to develop a future-ready secondary education system. Which combination of priorities best\nreflects the collective recommendations of Unit I?",
    "asQuestion": "এখন ৰােযই ভমেষযৎমুখী মাধ্যমমক মিক্ষা বযেস্থা গম়ি তুমলব মবচাযৰ। ককান অগ্ৰামধ্কাৰসমূৈৰ সমিয Unit I-ৰ\nসামূমৈক পৰামিযসমূৈ সবযামধ্ক প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Examination success + Memorization",
      "Equality + Quality + Vocational Skills + Democratic Values + Scientific Outlook",
      "Restricted curriculum + Centralized testing",
      "Academic achievement only"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা + মুখস্থ মবদযা",
      "সমতা + গু ণগত মান + বৃমিমূলক দক্ষ তা + গণতামন্ত্ৰ ক মূলযযবাধ্ + হবজ্ঞ ামনক দৃমষ্ট ভংগী",
      "সীমমত পাঠযক্ৰম + ককিী পৰীক্ষা",
      "ককেল একাযিমমক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major educational reforms in Unit I consistently emphasize quality, equality, vocational competence,\ndemocratic citizenship and scientific thinking.",
    "asExplanation": "Unit I-ৰ মুখয মিক্ষাগত সংস্কাৰসমূযৈ গু ণগত মিক্ষা , সমতা, বৃমিমূলক দক্ষ তা, গণতামন্ত্ৰক নাগমৰকত্ব আৰু হবজ্ঞামনক\nমচন্তাধ্াৰাৰ ওপৰত সমান গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 76,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A school introduces student self-government, community service projects and leadership camps. Which\ncombined aim of secondary education is most strongly promoted?",
    "asQuestion": "এখন মবদযালয মিক্ষাথী স্ব -িাসন, সমােযসো প্ৰ কল্প আৰু কনতৃত্ব মিমবৰ আৰম্ভ কমৰযছ। ই াৰ দ্ব াৰা মাধ্ যমমক\nমিক্ষাৰ ককান সমমিত লক্ষয সবযামধ্ক মবকমিত ৈ ?",
    "enOptions": [
      "Examination success and memorization",
      "Democratic citizenship and leadership",
      "Technical specialization only",
      "University admission preparation"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা আৰু মুখস্থ মবদযা",
      "গণতামন্ত্ৰ ক নাগমৰকত্ব আৰু কনতৃত্ব",
      "ককেল কামৰকৰী মবযিষজ্ঞতা",
      "মবশ্বমবদযাল ত ভমতযৰ প্ৰস্তু মত"
    ],
    "correctIndex": 1,
    "enExplanation": "These activities help students develop civic responsibility, cooperation, initiative and leadership qualities.",
    "asExplanation": "এই কাযযসূচীযবাযৰ মিক্ষাথীৰ নাগমৰক দাম ত্ব যবাধ্ , সৈযযামগতা, উযদযাগ আৰু কনতৃত্ব ৰ গু ণ মবকাি কযৰ।"
  },
  {
    "id": 77,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA school offers only one academic stream to all learners regardless of aptitude, interest or future career\nplans.\nWhich recommendation of the Mudaliar Commission is being ignored?",
    "asQuestion": "না:\nএখন মবদযালয সকযলা মিক্ষাথীক কতওঁযলাকৰ কযাগযতা , আগ্ৰৈ বা ভমেষযৎ কপছাগত লক্ষয মনমবযযিযষ এযক\nএকাযিমমক ধ্ াৰা প্ৰ দান কৰা ৈ ।\nমুদামল াৰ আয াগৰ ককান পৰামিযয া উযপক্ষা কৰা হৈযছ ?",
    "enOptions": [
      "Guidance Service",
      "Diversified Curriculum",
      "Physical Education",
      "Examination Reform"
    ],
    "asOptions": [
      "মনযদযিনা কসো",
      "হবমচত্রম পাঠযক্ৰম",
      "িাৰীমৰক মিক্ষা",
      "পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission recommended diversified curricula to accommodate individual differences and varied\ncareer aspirations.",
    "asExplanation": "আয াযগ বযমক্তগত পাথযকয আৰু মভন্ন কপছাগত লক্ষয পূৰণৰ বাযব হবমচত্রম পাঠযক্ৰমৰ পৰামিয মদমছল।"
  },
  {
    "id": 78,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Assertion (A):\nEducational equality was considered essential by the Kothari Commission.\nReason (R):\nEducational inequality can weaken social justice and national integration.",
    "asQuestion": "উমক্ত ( A):\nককাঠাৰী আয াযগ মিক্ষাগত সমতাক অতযােিযক বুমল গণয কমৰমছল।\nকাৰণ (R):\nমিক্ষাগত অসমতাই সামামেক নযা আৰু োতী সংৈমত দুবযল কমৰব পাযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission linked equality of educational opportunity with social justice and national development.",
    "asExplanation": "আয াযগ মিক্ষাগত সমতাক সামামেক নযা আৰু োতী মবকািৰ হসযত সম্পমকযত কমৰমছল।"
  },
  {
    "id": 79,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Why is teacher education considered a critical component of educational reform?",
    "asQuestion": "মিক্ষাগত সংস্কাৰৰ কক্ষত্রত মিক্ষক মিক্ষাক মক এক গু ৰুত্বপূণয উপাদান বুমল গণয কৰা ৈ ?",
    "enOptions": [
      "Teachers determine educational quality and learning outcomes",
      "Teachers reduce curriculum flexibility",
      "Teachers replace educational planning",
      "Teachers eliminate educational equality"
    ],
    "asOptions": [
      "মিক্ষযক মিক্ষাৰ গু ণগত মান আৰু মিক্ষণ ফলাফল মনধ্যাৰণ কযৰ",
      "মিক্ষযক পাঠযক্ৰমৰ নমনী তা হ্ৰ াস কযৰ",
      "মিক্ষযক মিক্ষাগত পমৰকল্পনাৰ মবকল্প ৈ",
      "মিক্ষযক মিক্ষাগত সমতা মবযলাপ কযৰ"
    ],
    "correctIndex": 0,
    "enExplanation": "Effective teachers are essential for curriculum implementation, student learning and educational quality\nimprovement.",
    "asExplanation": "কাযযকৰী মিক্ষকসকল পাঠযক্ৰম ৰূপা ণ , মিক্ষ ণ উন্ন ন আৰু মিক্ষ াৰ গু ণগত মান বৃমিৰ বাযব অতযন্ত প্ৰ য ােনী ।"
  },
  {
    "id": 80,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A future secondary education model seeks to promote equality, employability, scientific thinking,\ndemocratic values and character development. Which educational tradition best supports this vision?",
    "asQuestion": "এখন ভমেষযৎমুখী মাধ্যমমক মিক্ষা মযিযল সমতা , কযমযাপযযামগতা, হবজ্ঞামনক মচন্তাধ্াৰা , গণতামন্ত্ৰক মূলযযবাধ্ আৰু\nচমৰত্র গঠনৰ মবকাি াব মবচাযৰ। ককান মিক্ষ াগত ধ্ াৰণাই এই দৃমষ্ট ভংগীক সবযামধ্ ক সমথযন কযৰ?",
    "enOptions": [
      "Examination-centred tradition",
      "Integrated reform tradition of major educational commissions",
      "Memorization-centred tradition",
      "Restricted curriculum tradition"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক ধ্ াৰণা",
      "মুখয মিক্ষাগত আয াগসমূৈৰ সমমিত সংস্কাৰমূলক ধ্ াৰণা",
      "মুখস্থমভমিক ধ্ াৰণা",
      "সীমমত পাঠযক্ৰমমভমিক ধ্ াৰণা"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective vision of Unit I reforms emphasizes balanced development through quality, equality,\nvocational competence and democratic values.",
    "asExplanation": "Unit I-ৰ সংস্কাৰসমূযৈ গু ণগত মিক্ষা , সমতা, বৃমিমূলক দক্ষ তা আৰু গণতামন্ত্ৰ ক মূলযযবাধ্ ৰ েমৰ যত সুষম মবকািৰ\nওপৰত গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 81,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA secondary school produces excellent examination results, but most graduates struggle to obtain\nemployment because they lack practical occupational skills.\nWhich aim of secondary education has been neglected?",
    "asQuestion": "না:\nএখন মাধ্ যমমক মবদযালয উৎকৃষ্ট পৰীক্ষ াৰ ফলাফল লাভ কযৰ, মকন্তু অমধ্কাংি মিক্ষাথীয বযেৈামৰক কপছাগত\nদক্ষতাৰ অভােত কমযসংস্থান লাভ কৰাত অসুমবধ্া পা ।\nমাধ্যমমক মিক্ষাৰ ককান লক্ষযয া উযপক্ষা কৰা হৈযছ ?",
    "enOptions": [
      "Democratic Citizenship",
      "Vocational Efficiency",
      "Cultural Development",
      "Physical Education"
    ],
    "asOptions": [
      "গণতামন্ত্ৰক নাগমৰকত্ব",
      "বৃমিমূলক দক্ষ তা",
      "সাংস্কৃ মতক মবকাি",
      "িাৰীমৰক মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized vocational efficiency to ensure that education prepares learners for\nproductive work and self-reliance.",
    "asExplanation": "মুদামল াৰ আয াযগ বৃমিমূলক দক্ষ তাৰ ওপৰত গু ৰুত্ব মদমছল যাযত মিক্ষ া মিক্ষ াথীক উৎপাদনিীল কময আৰু\nআত্মমনভযৰিীলতাৰ বাযব প্ৰস্তু ত কযৰ।"
  },
  {
    "id": 82,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "What was the major educational significance of the 10+2+3 structure recommended by the Kothari\nCommission?",
    "asQuestion": "ককাঠাৰী আয াযগ পৰামিয মদ া ১০+২+৩ গাঁথমনৰ মুখয মিক্ষাগত গু ৰুত্ব মক আমছল ?",
    "enOptions": [
      "It reduced access to higher education.",
      "It introduced a uniform national educational pattern.",
      "It abolished vocational education.",
      "It focused only on examinations."
    ],
    "asOptions": [
      "ই উচ্চ মিক্ষাৰ সুযযাগ হ্ৰ াস কমৰমছল।",
      "ই এক একীভূত োতী মিক্ষা গাঁথমন প্ৰ েতযন কমৰমছল।",
      "ই বৃমিমুখী মিক্ষ া মবযলাপ কমৰমছল।",
      "ই ককেল পৰীক্ষাৰ ওপৰত গু ৰুত্ব মদমছল।"
    ],
    "correctIndex": 1,
    "enExplanation": "The 10+2+3 pattern helped standardize educational stages across India and facilitated educational planning.",
    "asExplanation": "১০+২+৩ গাঁথমনয ভাৰতেুমৰ মিক্ষা পযযা সমূৈ একীভূত কমৰ মিক্ষাগত পমৰকল্পনা সৈে কমৰ তুমলমছল।"
  },
  {
    "id": 83,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA government introduces special scholarships, hostels and educational support programmes for\ndisadvantaged students.\nWhich objective of NPE 1986 is primarily reflected?",
    "asQuestion": "না:\nএখন চৰকাযৰ বমঞ্চ ত মিক্ষ াথীৰ বাযব মবযিষ বৃমি, আবাস আৰু মিক্ষাগত সৈা কাযযসূচী আৰম্ভ কমৰযছ।\nই NPE 1986-ৰ ককান মুখয উযেিযক সবযামধ্ক প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Educational Equality",
      "Examination Reform",
      "Administrative Control",
      "Curriculum Reduction"
    ],
    "asOptions": [
      "মিক্ষাগত সমতা",
      "পৰীক্ষা সংস্কাৰ",
      "প্ৰ িাসমনক মন ন্ত্ৰ ণ",
      "পাঠযক্ৰম হ্ৰ াস"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 emphasized equal educational opportunities, especially for disadvantaged and underrepresented\ngroups.",
    "asExplanation": "NPE 1986-এ মবযিষলক বমঞ্চত আৰু মপছপৰা কগা সমূৈৰ বাযব সমান মিক্ষাৰ সুযযাগৰ ওপৰত গু ৰুত্ব আযৰাপ\nকমৰমছল।"
  },
  {
    "id": 84,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A remote area in Assam has school buildings but lacks qualified teachers and learning resources. Which\nchallenge does this situation best represent?",
    "asQuestion": "অসমৰ এ া দূৰেতী অঞ্চলত মবদযাল ভেন আযছ , মকন্তু দক্ষ মিক্ষক আৰু মিক্ষণ সম্পদৰ অভাে আযছ। এই\nঅেস্থাই ককান সমসযাক সবযামধ্ক স্পষ্ট ভাযে প্ৰ মতফমলত কযৰ ?",
    "enOptions": [
      "Lack of educational demand",
      "Inequality in educational quality",
      "Excessive vocationalisation",
      "Overdevelopment of infrastructure"
    ],
    "asOptions": [
      "মিক্ষাৰ প্ৰ মত চামৈদাৰ অভাে",
      "মিক্ষাৰ গু ণগত মানৰ অসমতা",
      "অতযামধ্ ক বৃমিমুখীকৰণ",
      "আন্তঃগাঁথমনৰ অতযামধ্ক উন্ন ন"
    ],
    "correctIndex": 1,
    "enExplanation": "Access alone is insufficient; quality educational resources are necessary for meaningful learning.",
    "asExplanation": "ককেল মবদযাল ৰ উপমস্থমত যযথষ্ট নৈ ; গু ণগত মিক্ষা মনমিত কমৰবলল উপযুক্ত সম্পদ আৰু দক্ষ মিক্ষক\n প্ৰ\nয ােন।"
  },
  {
    "id": 85,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "If a state seeks to achieve educational quality, equality, employability, democratic citizenship and national\ndevelopment simultaneously, which strategy would be most appropriate?",
    "asQuestion": "এখন ৰােযই এযক সম যত গু ণগত মিক্ষা , সমতা, কযমযাপযযামগতা, গণতামন্ত্ৰক নাগমৰকত্ব আৰু োতী উন্ন ন লাভ\nকমৰব মবচাযৰ। ককান ককৌিলয া সবযামধ্ক উপযুক্ত ?",
    "enOptions": [
      "Examination-centred educational model",
      "Integrated reform-based educational system",
      "Memorization-oriented curriculum",
      "Restricted educational access"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা মযিল",
      "সমমিত সংস্কাৰমভমিক মিক্ষা বযেস্থা",
      "মুখস্থমভমিক পাঠযক্ৰম",
      "মিক্ষাৰ সুযযাগ সীমমতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "An integrated reform approach combines the major recommendations of the Mudaliar Commission, Kothari\nCommission and NPE 1986.",
    "asExplanation": "সমমিত সংস্কাৰমভমিক পিমতয মুদামল াৰ আয াগ , ককাঠাৰী আয াগ আৰু NPE 1986-ৰ মুখয পৰামিযসমূৈ\nএকমত্রত কযৰ।"
  },
  {
    "id": 86,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A school achieves excellent academic results but frequently faces issues of dishonesty, indiscipline and lack\nof social responsibility among students.\nWhich aim of secondary education requires greater emphasis?",
    "asQuestion": "এখন মবদযালয উৎকৃষ্ট একাযিমমক ফলাফল লাভ কৰা ৈ , মকন্তু মিক্ষাথীৰ মােত অসততা , অনুিাসনৈীনতা\nআৰু সামামেক দাম ত্ব যবাধ্ৰ অভাে কদখা যা ।\nমাধ্যমমক মিক্ষাৰ ককান লক্ষযৰ ওপৰত অমধ্ক গু ৰুত্ব মদ াৰ প্ৰ য ােন ?",
    "enOptions": [
      "Examination Success",
      "Character Formation",
      "University Admission",
      "Curriculum Expansion"
    ],
    "asOptions": [
      "পৰীক্ষাত সফলতা",
      "চমৰত্র গঠন",
      "মবশ্বমবদযাল ত ভমতয",
      "পাঠযক্ৰম সম্প্ৰসাৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized character formation to develop honesty, responsibility, discipline\nand moral values.",
    "asExplanation": "মুদামল াৰ আয াযগ সততা, দাম ত্ব যবাধ্ , িৃংখলা আৰু হনমতক মূলযযবাধ্ মবকািৰ বাযব চমৰত্র গঠনৰ ওপৰত গু ৰুত্ব\nআযৰাপ কমৰমছল।"
  },
  {
    "id": 87,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Why did the Kothari Commission describe education as the most powerful instrument of national\ndevelopment?",
    "asQuestion": "ককাঠাৰী আয াযগ মিক্ষাক োতী উন্ন নৰ আ াইতলক িমক্তিালী উপা বুমল মক বণযনা কমৰমছল ?",
    "enOptions": [
      "Education reduces the need for planning",
      "Education develops human resources and promotes social progress",
      "Education eliminates cultural diversity",
      "Education replaces economic policy"
    ],
    "asOptions": [
      "মিক্ষা পমৰকল্পনাৰ প্ৰ য ােন হ্ৰ াস কযৰ",
      "মিক্ষা মানে সম্পদ গম়ি কতাযল আৰু সামামেক অগ্ৰগমত সাধ্ন কযৰ",
      "মিক্ষ া সাংস্কৃ মতক হবমচত্র য মবযলাপ কযৰ",
      "মিক্ষা অথযলনমতক নীমতৰ মবকল্প ৈ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission believed that education contributes directly to economic growth, social transformation and\nnational integration.",
    "asExplanation": "আয াগৰ মযত মিক্ষা অথযলনমতক মবকাি , সামামেক পমৰেতযন আৰু োতী সংৈমতত প্ৰ তযক্ষভাযে অেদান ৰাযখ।"
  },
  {
    "id": 88,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Assertion (A):\nTeacher education was given high priority in NPE 1986.\nReason (R):\nTeachers play a central role in improving educational quality.",
    "asQuestion": "উমক্ত ( A):\n\n\n\nNPE 1986-এ মিক্ষক মিক্ষাক উচ্চ অগ্ৰামধ্কাৰ মদমছল।\nকাৰণ (R):\nমিক্ষাৰ গু ণগত মান উন্নত কৰাত মিক্ষযক ককিী ভূমমকা পালন কযৰ।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "NPE 1986 recognized that educational quality depends greatly on professionally competent teachers.",
    "asExplanation": "NPE 1986-এ স্ব ীকাৰ কমৰমছল কয মিক্ষাৰ গু ণগত মান দক্ষ আৰু সু -প্ৰমিমক্ষত মিক্ষকৰ ওপৰত মনভযৰ কযৰ।"
  },
  {
    "id": 89,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nA state has many educated unemployed youth because school education remains largely theoretical and\ndisconnected from labour market needs.\nWhich educational reform would most effectively address this issue?",
    "asQuestion": "না:\nএখন ৰােযত বহু মিমক্ষত মনবনুো যুেক আযছ , কাৰণ মবদযাল মিক্ষা অমধ্কাংি কক্ষত্রযত তামিক আৰু\nকমযবোৰৰ প্ৰ য ােনৰ হসযত সংযুক্ত নৈ ।\nককান মিক্ষাগত সংস্কাযৰ এই সমসযাৰ সবযামধ্ক ফলপ্ৰসূ সমাধ্ান মদব ?",
    "enOptions": [
      "Increasing written examinations",
      "Vocationalisation of education",
      "Reducing practical training",
      "Limiting technical subjects"
    ],
    "asOptions": [
      "মলমখত পৰীক্ষ া বৃমি",
      "মিক্ষ াৰ বৃমিমুখীকৰণ",
      "বযেৈামৰক প্ৰ মিক্ষণ হ্ৰ াস",
      "কামৰকৰী মবষ সীমমতকৰণ"
    ],
    "correctIndex": 1,
    "enExplanation": "Vocationalisation connects education with practical skills and employment opportunities.",
    "asExplanation": "বৃমিমুখীকৰযণ মিক্ষ াক বযেৈামৰক দক্ষ তা আৰু কমযসংস্থ াপনৰ সুযযাগৰ হসযত সংযযাগ কযৰ।"
  },
  {
    "id": 90,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which educational transformation strategy would most effectively realize the collective vision of the\nMudaliar Commission, Kothari Commission and NPE 1986?",
    "asQuestion": "মুদামল াৰ আয াগ, ককাঠাৰী আয াগ আৰু NPE 1986-ৰ সামূমৈক দৃমষ্ট ভংগী সবযামধ্ ক সফলভাযে বাস্ত োম ত\nকমৰবলল ককান মিক্ষাগত ৰূপান্তৰ ককৌিল উপযুক্ত ?",
    "enOptions": [
      "Examination-centred education",
      "Quality education with equality, vocational competence, democratic values and scientific outlook",
      "Memorization-based learning",
      "Restricted educational opportunities"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা",
      "গু ণগত মিক্ষা , সমতা, বৃমিমূলক দক্ষ তা, গণতামন্ত্ৰ ক মূলযযবাধ্ আৰু হবজ্ঞ ামনক দৃমষ্ট ভংগী",
      "মুখস্থমভমিক মিক্ষণ",
      "সীমমত মিক্ষাগত সুযযাগ"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective reform vision emphasizes quality, equality, vocational relevance, democratic citizenship and\nscientific thinking.",
    "asExplanation": "সামূমৈক সংস্ক াৰমূলক দৃমষ্ট ভংগীযগু ণগত মিক্ষ া, সমতা, বৃমিমূলক প্ৰ াসংমগকতা, গণতামন্ত্ৰক নাগমৰকত্ব আৰু\nহবজ্ঞামনক মচন্তাধ্াৰাৰ ওপৰত গু ৰুত্ব আযৰাপ কযৰ।"
  },
  {
    "id": 91,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which aim of secondary education proposed by the Mudaliar Commission is most directly related to\npreparing students for responsible participation in public life?",
    "asQuestion": "মুদামল াৰ আয াযগ প্ৰস্ত াে কৰা মাধ্যমমক মিক্ষাৰ ককান লক্ষযয া েনেীেনত দাম ত্ব িীল অংিগ্ৰৈণৰ বাযব\nমিক্ষাথীক প্ৰস্তু ত কৰাৰ হসযত সবযামধ্ক সম্পমকযত ?",
    "enOptions": [
      "Vocational Efficiency",
      "Democratic Citizenship",
      "Physical Development",
      "Cultural Recreation"
    ],
    "asOptions": [
      "বৃমিমূলক দক্ষ তা",
      "গণতামন্ত্ৰক নাগমৰকত্ব",
      "িাৰীমৰক মবকাি",
      "সাংস্কৃ মতক অেসৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "Democratic citizenship develops civic responsibility, social awareness and participation in democratic\ninstitutions.",
    "asExplanation": "গণতামন্ত্ৰক নাগমৰকযত্ব নাগমৰক দাম ত্ব যবাধ্ , সামামেক সযচতনতা আৰু গণতামন্ত্ৰক প্ৰ মতষ্ঠানত অংিগ্ৰৈণৰ গু ণ\nমবকাি কযৰ।"
  },
  {
    "id": 92,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nTwo students possess equal ability and motivation. One receives excellent educational opportunities while\nthe other faces severe educational disadvantages due to social background.\nAccording to the Kothari Commission, what principle is being violated?",
    "asQuestion": "না:\n\n\n\nদুেন মিক্ষ াথীৰ কযাগযতা আৰু কপ্ৰ ৰণা সমান। এেযন উৎকৃষ্ট মিক্ষ াগত সুযযাগ লাভ কমৰযছ, আনৈাযত আনেন\nসামামেক প ভূমমৰ বাযব বমঞ্চত হৈযছ।\nককাঠাৰী আয াগৰ মযত ককান নীমতয া লমিত হৈযছ?",
    "enOptions": [
      "Vocational Efficiency",
      "Equality of Educational Opportunity",
      "Work Experience",
      "Examination Reform"
    ],
    "asOptions": [
      "বৃমিমূলক দক্ষ তা",
      "মিক্ষাৰ সমান সুযযাগ",
      "কময অমভজ্ঞতা",
      "পৰীক্ষা সংস্কাৰ"
    ],
    "correctIndex": 1,
    "enExplanation": "The Commission strongly advocated equal educational opportunities regardless of social or economic\nbackground.",
    "asExplanation": "আয াযগ সামামেক বা আমথযক প ভূমম মনমবযযিযষ সমান মিক্ষাৰ সুযযাগৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 93,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Why did NPE 1986 emphasize science, technology and modernization in education?",
    "asQuestion": "NPE 1986-এ মিক্ষাত মবজ্ঞান , প্ৰ যুমক্ত আৰু আধ্ুমনকীকৰণৰ ওপৰত মকগু ৰুত্ব আযৰাপ কমৰমছল ?",
    "enOptions": [
      "To reduce educational opportunities",
      "To prepare citizens for national development and technological progress",
      "To eliminate traditional values completely",
      "To replace teachers with machines"
    ],
    "asOptions": [
      "মিক্ষাৰ সুযযাগ হ্ৰ াস কমৰবলল",
      "োতী উন্ন ন আৰু প্ৰ যুমক্তগত অগ্ৰগমতৰ বাযব নাগমৰকক প্ৰস্তু ত কমৰবলল",
      "পৰম্প ৰাগত মূলযযবাধ্ সম্পূ ণযৰূযপ মবযলাপ কমৰবলল",
      "মিক্ষকৰ পমৰেযতয যন্ত্ৰ বযেৈাৰ কমৰবলল"
    ],
    "correctIndex": 1,
    "enExplanation": "Scientific and technological advancement was viewed as essential for national progress and modernization.",
    "asExplanation": "হবজ্ঞামনক আৰু প্ৰ যুমক্তগত অগ্ৰগমতক োতী উন্ন ন আৰু আধ্ুমনকীকৰণৰ বাযব অতযােিযক বুমল গণয কৰা\nহৈমছল।"
  },
  {
    "id": 94,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A district has adequate school buildings and enrolment, but learning achievement remains poor. Which\nintervention should receive highest priority?",
    "asQuestion": "এখন মেলাত মবদযাল ভেন আৰু নামভমতয যযথষ্ট আযছ , মকন্তু মিক্ষণ সাফলয মনম্ন। ককান ৈস্তযক্ষপক সবযামধ্ক\nঅগ্ৰামধ্কাৰ মদব লাযগ ?",
    "enOptions": [
      "Construction of additional buildings",
      "Improvement of teaching quality and learning resources",
      "Reduction of school hours",
      "Limiting admissions"
    ],
    "asOptions": [
      "অমতমৰক্ত ভেন মনমযাণ",
      "মিক্ষাদানৰ গু ণগত মান আৰু মিক্ষণ সম্পদ উন্নত কৰা",
      "মবদযাল সমহ্ৰ াস",
      "নামভমতয সীমমত কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "Once access is available, educational quality becomes the key determinant of student achievement.",
    "asExplanation": "প্ৰ\nযেিামধ্কাৰ মনমিত কৈাোৰ মপছত মিক্ষাৰ গু ণগত মাযনই মিক্ষাথীৰ সাফলযৰ মূল মনধ্যাৰক ৈ ।"
  },
  {
    "id": 95,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which educational vision best reflects the combined philosophy of the Mudaliar Commission, Kothari\nCommission and National Policy on Education (1986)?",
    "asQuestion": "মুদামল াৰ আয াগ, ককাঠাৰী আয াগ আৰু ৰাষ্ট্ৰী মিক্ষা নীমত (১৯৮৬) -ৰ সমমিত দিযনক ককান মিক্ষাগত\nদৃমষ্ট ভংগীয সবযামধ্ ক সঠিকভাযে প্ৰ মতফমলত কযৰ?",
    "enOptions": [
      "Education focused mainly on examinations",
      "Education for quality, equality, employability, democratic citizenship and national development",
      "Education limited to academic achievement",
      "Education based primarily on memorization"
    ],
    "asOptions": [
      "ককেল পৰীক্ষাযকমিক মিক্ষা",
      "গু ণগত মিক্ষা , সমতা, কযমযাপযযামগতা, গণতামন্ত্ৰক নাগমৰকত্ব আৰু োতী উন্ন নৰ বাযব মিক্ষা",
      "ককেল একাযিমমক সফলতামভমিক মিক্ষা",
      "মুখস্থমভমিক মিক্ষা"
    ],
    "correctIndex": 1,
    "enExplanation": "The collective reform agenda emphasized holistic development through quality education, equality,\nvocational competence and democratic values.",
    "asExplanation": "সামূমৈক সংস্কাৰসূচীযগু ণগত মিক্ষা , সমতা, বৃমিমূলক দক্ষ তা আৰু গণতামন্ত্ৰ ক মূলযযবাধ্ ৰ েমৰ যত সবযাঙ্গ ীন\nমবকািৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।"
  },
  {
    "id": 96,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which combination best represents the major aims of secondary education recommended by the Mudaliar\nCommission?",
    "asQuestion": "মুদামল াৰ আয াযগ পৰামিয মদ া মাধ্যমমক মিক্ষাৰ মুখয লক্ষযসমূৈৰ সবযামধ্ক উপযুক্ত সমি ককানয া ?",
    "enOptions": [
      "Memorization, Competition and Examination Success",
      "Democratic Citizenship, Vocational Efficiency, Character Formation and Leadership",
      "Administrative Control, Uniformity and Restriction",
      "Academic Achievement Only"
    ],
    "asOptions": [
      "মুখস্থ মবদযা , প্ৰ মতযযামগতা আৰু পৰীক্ষাত সফলতা",
      "গণতামন্ত্ৰক নাগমৰকত্ব , বৃমিমূলক দক্ষ তা, চমৰত্র গঠন আৰু কনতৃত্ব",
      "প্ৰ িাসমনক মন ন্ত্ৰ ণ , একৰূপতা আৰু সীমাবিতা",
      "ককেল একাযিমমক সফলতা"
    ],
    "correctIndex": 1,
    "enExplanation": "The Mudaliar Commission emphasized balanced development through citizenship, character, leadership and\nvocational efficiency.",
    "asExplanation": "মুদামল াৰ আয াযগ নাগমৰকত্ব , চমৰত্র , কনতৃত্ব আৰু বৃমিমূলক দক্ষ তাৰ েমৰ যত সুষম মবকািৰ ওপৰত গু ৰুত্ব\nআযৰাপ কমৰমছল।"
  },
  {
    "id": 97,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Assertion (A):\n\n\n\nThe Kothari Commission emphasized educational planning at the national level.\nReason (R):\nEducation was viewed as a key instrument for national development and social transformation.",
    "asQuestion": "উমক্ত ( A):\nককাঠাৰী আয াযগ োতী পযযা ত মিক্ষাগত পমৰকল্পনাৰ ওপৰত গু ৰুত্ব আযৰাপ কমৰমছল।\nকাৰণ (R):\nমিক্ষাক োতী উন্ন ন আৰু সামামেক পমৰেতযনৰ এক মুখয উপা মৈচাযপ গণয কৰা হৈমছল।",
    "enOptions": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "asOptions": [
      "A আৰু R দুয া া সতয আৰু R হৈযছ A-ৰ সঠিক বযাখযা",
      "A আৰু R দুয া া সতয মকন্তু R হৈযছ A-ৰ সঠিক বযাখযা নৈ",
      "A সতয মকন্তু R অসতয",
      "A অসতয মকন্তু R সতয"
    ],
    "correctIndex": 0,
    "enExplanation": "The Commission advocated systematic educational planning because education was considered essential for\nnational progress.",
    "asExplanation": "আয াযগ সুসংগঠিত মিক্ষাগত পমৰকল্পনাৰ পৰামিয মদমছল , কাৰণ মিক্ষা োতী অগ্ৰগমতত ককিী ভূমমকা পালন\nকযৰ বুমল গণয কৰা হৈমছল।"
  },
  {
    "id": 98,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Which educational approach is most consistent with the long-term vision of NPE 1986?",
    "asQuestion": "NPE 1986-ৰ দী য মযাদী\t দৃমষ্ট ভংগীৰ হসযত ককান মিক্ষ াগত পিমত সবযামধ্ ক সামঞ্জ সযপূণয?",
    "enOptions": [
      "Examination-centred learning",
      "Quality education with equality, modernization and social justice",
      "Memorization-based instruction",
      "Restricted educational opportunities"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষণ",
      "গু ণগত মিক্ষা , সমতা, আধ্ুমনকীকৰণ আৰু সামামেক নযা",
      "মুখস্থমভমিক মিক্ষা",
      "সীমমত মিক্ষাগত সুযযাগ"
    ],
    "correctIndex": 1,
    "enExplanation": "NPE 1986 promoted quality, equality, modernization, teacher development and social justice.",
    "asExplanation": "NPE 1986-এ গু ণগত মিক্ষা , সমতা, আধ্ুমনকীকৰণ , মিক্ষক উন্ন ন আৰু সামামেক নযা ৰ ওপৰত গু ৰুত্ব আযৰাপ\nকমৰমছল।"
  },
  {
    "id": 99,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "Case:\nAssam has expanded access to secondary education, but disparities remain between urban and rural schools\nin teacher availability and learning resources.\n\n\n\nWhich challenge requires the greatest attention?",
    "asQuestion": "না:\nঅসমত মাধ্ যমমক মিক্ষ াৰ সুযযাগ বৃমি পাইযছ, মকন্তু নগৰ আৰু গ্ৰ াময মবদযাল সমূৈৰ মােত মিক্ষক আৰু মিক্ষণ\nসম্পদৰ কক্ষত্রত হবষময মবদযমান।\nককান সমসযায াক সবযামধ্ক অগ্ৰামধ্কাৰ মদব লাযগ ?",
    "enOptions": [
      "Restricting enrolment",
      "Ensuring educational quality and equity",
      "Reducing science education",
      "Increasing examination pressure"
    ],
    "asOptions": [
      "নামভমতয সীমমত কৰা",
      "মিক্ষাৰ গু ণগত মান আৰু সমতা মনমিত কৰা",
      "মবজ্ঞান মিক্ষা হ্ৰ াস কৰা",
      "পৰীক্ষ াৰ চাপ বৃমি কৰা"
    ],
    "correctIndex": 1,
    "enExplanation": "The major challenge is ensuring equitable quality education across all regions.",
    "asExplanation": "মুখয সমসযা হৈযছ সকযলা অঞ্চলত সমতামভমিক গু ণগত মিক্ষা মনমিত কৰা।"
  },
  {
    "id": 100,
    "unitId": "unit-1",
    "enUnitNumber": "Unit I",
    "asUnitNumber": "গোট ১",
    "dayNumber": 1,
    "enQuestion": "A nation seeks to build a secondary education system that promotes democratic citizenship, vocational\ncompetence, educational equality, scientific temper, social justice and national development.\nThis vision is best described as:",
    "asQuestion": "এখন োমতয এযন মাধ্যমমক মিক্ষা বযেস্থা গম়ি তুমলব মবচাযৰ মযয গণতামন্ত্ৰক নাগমৰকত্ব , বৃমিমূলক দক্ষ তা,\nমিক্ষাগত সমতা , হবজ্ঞামনক মযনাভাে , সামামেক নযা আৰু োতী উন্ন নক উৎসামৈত কযৰ।\nএই দৃমষ্ট ভংগীক সবযামধ্ ক উপযুক্ত ভাযে মক বুমল বণযনা কমৰব পামৰ?",
    "enOptions": [
      "Examination-centred educational model",
      "Integrated educational reform model",
      "Memorization-based educational model",
      "Restricted curriculum model"
    ],
    "asOptions": [
      "পৰীক্ষাযকমিক মিক্ষা মযিল",
      "সমমিত মিক্ষাগত সংস্কাৰ মযিল",
      "মুখস্থমভমিক মিক্ষা মযিল",
      "সীমমত পাঠযক্ৰম মযিল"
    ],
    "correctIndex": 1,
    "enExplanation": "This integrated vision combines the major recommendations of the Mudaliar Commission, Kothari\nCommission, NPE 1986 and modern educational reforms.",
    "asExplanation": "এই সমমিত দৃমষ্ট ভংগীয মুদামল াৰ আয াগ, ককাঠাৰী আয াগ, NPE 1986 আৰু আধ্ুমনক মিক্ষাগত সংস্কাৰৰ মুখয\nপৰামিযসমূৈ একমত্রত কযৰ।"
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
