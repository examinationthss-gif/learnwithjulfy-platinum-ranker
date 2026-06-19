export interface TestQuestion {
  id: number;
  qEn: string;
  qAs: string;
  optsEn: string[];
  optsAs: string[];
  correct: number;
  expEn: string;
  expAs: string;
}

export const testsQuestions: Record<number, TestQuestion[]> = {
  // Test Paper 1: Unit I & II Diagnostic Test Paper
  1: [
        {
            "id": 1,
            "qEn": "In which year was the Secondary Education Commission appointed?",
            "qAs": "মাধ্যমিক শিক্ষা আয়োগ কোন বছৰত নিযুক্ত কৰা হৈছিল?",
            "optsEn": [
                "1948",
                "1952",
                "1964",
                "1986"
            ],
            "optsAs": [
                "১৯৪৮",
                "১৯৫২",
                "১৯৬৪",
                "১৯৮৬"
            ],
            "correct": 1,
            "expEn": "The Secondary Education Commission was appointed by the Government of India in 1952.",
            "expAs": "ভাৰত চৰকাৰে ১৯৫২ চনত মাধ্যমিক শিক্ষা আয়োগ নিযুক্ত কৰিছিল।"
        },
        {
            "id": 2,
            "qEn": "Who was the Chairman of the Secondary Education Commission?",
            "qAs": "মাধ্যমিক শিক্ষা আয়োগৰ সভাপতি কোন আছিল?",
            "optsEn": [
                "D. S. Kothari",
                "A. Lakshmanaswami Mudaliar",
                "J. P. Naik",
                "Zakir Hussain"
            ],
            "optsAs": [
                "ডি. এছ. কোঠাৰী",
                "এ. লক্ষ্ণিস্বামী মুডালিয়াৰ",
                "কে. পি. নায়ক",
                "জাকিৰ হুছেইন"
            ],
            "correct": 1,
            "expEn": "The Commission was chaired by Dr. A. Lakshmanaswami Mudaliar.",
            "expAs": "ড° এ. লক্ষ্ণিস্বামী মুডালিয়াৰ এই আয়াগৰ সভাপতি আছিল।"
        },
        {
            "id": 3,
            "qEn": "Why was the Secondary Education Commission appointed?",
            "qAs": "মাধ্যমিক শিক্ষা আয়োগ কি নিযুক্ত কৰা হৈছিল?",
            "optsEn": [
                "To reform higher education",
                "To examine and improve secondary education",
                "To establish universities",
                "To regulate primary schools"
            ],
            "optsAs": [
                "উচ্চ শিক্ষাৰ সংস্কাৰৰ বাযব",
                "মাধ্যমিক শিক্ষা পৰ্যালোচনা আৰু উন্ন নৰ বাযব",
                "বিশ্ববিদযালস্থ াপনৰ বাযব",
                "প্ৰাথমিক বিদযাল মন ন্ত্ৰ ণৰ বাযব"
            ],
            "correct": 1,
            "expEn": "The Commission was formed to study the problems of secondary education and suggest reforms.",
            "expAs": "মাধ্যমিক শিক্ষাৰ সসিযা অধ্য ন কমৰ উন্ন নৰ পৰামিয দিবলল এই আয়াগ গঠন কৰা হৈছিল।"
        },
        {
            "id": 4,
            "qEn": "Which educational level was directly studied by the Mudaliar Commission?",
            "qAs": "মুডালিয়াৰ আয়াযগ প্ৰ তযক্ষভাযে কোন শিক্ষাস্তৰ অধ্য ন কৰিছিল?",
            "optsEn": [
                "Primary Education",
                "Secondary Education",
                "University Education",
                "Adult Education"
            ],
            "optsAs": [
                "প্ৰাথমিক শিক্ষা",
                "মাধ্যমিক শিক্ষা",
                "বিশ্ববিদ্যালয় শিক্ষা",
                "প্ৰাপ্তব স্ক শিক্ষা"
            ],
            "correct": 1,
            "expEn": "The Commission specifically examined the structure, curriculum and problems of secondary education.",
            "expAs": "আয়াযগ মাধ্যমিক শিক্ষাৰ গঠন, পাঠযক্ৰম আৰু সসিযাসমূৈ অধ্য ন কৰিছিল।"
        },
        {
            "id": 5,
            "qEn": "Which defect of secondary education was strongly criticized by the Mudaliar Commission?",
            "qAs": "মুডালিয়াৰ আয়াযগ মাধ্যমিক শিক্ষাৰ কোন ত্ৰু টিয়াক তীব্ৰভাযে সমাযলাচনায়কৰিছিল?",
            "optsEn": [
                "Excessive practical work",
                "Bookish and examination-oriented education",
                "Excessive sports activities",
                "Lack of libraries"
            ],
            "optsAs": [
                "অত্যাধিক বযেৈাৰিক কাম",
                "পুথিগত আৰু পৰীক্ষামুখী শিক্ষা",
                "অত্যাধিক ক্ৰ ীডা কাযযসূচী",
                "পুথিভঁৰালৰ অভাৱ"
            ],
            "correct": 1,
            "expEn": "The Commission believed that education had become too book-centered and examination-driven.",
            "expAs": "আয়াগৰ যিত শিক্ষা অত্যাধিক পুথিগত আৰু পৰীক্ষামুখী হৈ পৰিছিল।"
        }
  ],



    // Test Paper 2: Unit III & IV Mid-Term Review
  2: [
    {
      id: 1,
      qEn: "The Tbilisi Declaration of 1977 formulated the primary objectives of which educational stream?",
      qAs: "১৯৭৭ চনৰ তবিলিচি ঘোষণাই কোনটো শৈক্ষিক ধাৰাৰ মূল উদ্দেশ্যসমূহ প্ৰণয়ন কৰিছিল?",
      optsEn: ["Vocational Education", "Population Education", "Environmental Education", "Physical Training"],
      optsAs: ["বৃত্তিমূলক শিক্ষা", "জনসংখ্যা শিক্ষা", "পৰিৱেশ শিক্ষা", "শাৰীৰিক প্ৰশিক্ষণ"],
      correct: 2,
      expEn: "The Tbilisi Declaration of 1977 laid down the global goals and objectives of Environmental Education.",
      expAs: "১৯৭৭ চনৰ তবিলিচি ঘোষণাই সমগ্ৰ বিশ্বতে পৰিৱেশ শিক্ষাৰ লক্ষ্য আৰু উদ্দেশ্যসমূহ স্থিৰ কৰি দিছিল।"
    },
    {
      id: 2,
      qEn: "Who proposed the Trial and Error Theory of Learning?",
      qAs: "শিকনৰ প্ৰচেষ্টা আৰু ভুল তত্ত্বটো কোনে আগবঢ়াইছিল?",
      optsEn: ["Ivan Pavlov", "B.F. Skinner", "E.L. Thorndike", "Wolfgang Kohler"],
      optsAs: ["ইভান পাভলভ", "বি.এফ. স্কিনাৰ", "ই.এল. থৰ্নডাইক", "উলফগেং কোহলাৰ"],
      correct: 2,
      expEn: "E.L. Thorndike proposed the Trial and Error Theory based on experiments conducted on cats in puzzle boxes.",
      expAs: "ই.এল. থৰ্নডাইকে পাজল বক্সত মেকুৰীৰ ওপৰত কৰা পৰীক্ষাৰ ভিত্তি কৰি প্ৰচেষ্টা আৰু ভুল শিকন তত্ত্ব প্ৰকাশ কৰিছিল।"
    },
    {
      id: 3,
      qEn: "According to Thorndike's primary laws of learning, which law emphasizes learning by repeating and reviewing?",
      qAs: "থৰ্নডাইকৰ শিকনৰ মূল সূত্ৰসমূহৰ ভিতৰত কোনটোৱে পুনৰাবৃত্তি আৰু পৰ্যালোচনাৰ ওপৰত গুৰুত্ব দিয়ে?",
      optsEn: ["Law of Readiness", "Law of Exercise", "Law of Effect", "Law of Motivation"],
      optsAs: ["প্ৰস্তুতিৰ সূত্ৰ", "অনুশীলনৰ সূত্ৰ", "ফলপ্ৰসূতাৰ সূত্ৰ", "প্ৰেৰণাৰ সূত্ৰ"],
      correct: 1,
      expEn: "The Law of Exercise states that connections are strengthened when practiced (use) and weakened when discontinued (disuse).",
      expAs: "অনুশীলনৰ সূত্ৰই কয় যে কোনো সংযোগ বা কাম অভ্যাস কৰিলে সেয়া দৃঢ় হয় আৰু নকৰিলে দুৰ্বল হয়।"
    },
    {
      id: 4,
      qEn: "Ivan Pavlov performed his Classical Conditioning learning experiments on which animal?",
      qAs: "ইভান পাভলভে তেওঁৰ ধ্ৰুপদী অনুৱৰ্তনৰ পৰীক্ষাটো কোনটো প্ৰাণীৰ ওপৰত চলাইছিল?",
      optsEn: ["Cat", "Chimpanzee", "Rat", "Dog"],
      optsAs: ["মেকুৰী", "চিম্পাঞ্জী", "নিগনি", "কুকুৰ"],
      correct: 3,
      expEn: "Ivan Pavlov used a dog in his classical conditioning experiments, tracking salivary secretions in response to a bell (conditioned stimulus).",
      expAs: "ইভান পাভলভে কুকুৰৰ ওপৰত পৰীক্ষা চলাই ঘণ্টাৰ শব্দৰ (অনুবৰ্তিত উদ্দীপক) প্ৰতি লালটি ক্ষৰণ নিৰীক্ষণ কৰিছিল।"
    },
    {
      id: 5,
      qEn: "Which learning theory is associated with Kohler's experiments on a chimpanzee named Sultan?",
      qAs: "কোহলাৰে চুলতান নামৰ চিম্পাঞ্জীৰ ওপৰত কৰা পৰীক্ষা কোনটো শিকন তত্ত্বৰ লগত জড়িত?",
      optsEn: ["Classical Conditioning", "Insightful Learning", "Operant Conditioning", "Trial and Error"],
      optsAs: ["ধ্ৰুপদী অনুৱৰ্তন", "অন্তৰ্দৃষ্টিমূলক শিকন", "সক্ৰিয় অনুৱৰ্তন", "প্ৰচেষ্টা আৰু ভুল"],
      correct: 1,
      expEn: "Insightful Learning theory (Gestalt theory) is associated with Kohler's banana experiments on the intelligent chimpanzee Sultan.",
      expAs: "অন্তৰ্দৃষ্টিমূলক শিকন তত্ত্ব (গেষ্টাল্ট তত্ত্ব) কোহলাৰে চুলতান নামৰ চিম্পাঞ্জীটোৰ ওপৰত কৰা কল অনাৰ পৰীক্ষাৰ সৈতে জড়িত।"
    }
  ],

  // Test Paper 3: Education Full Syllabus Model Test A
  3: [
    {
      id: 1,
      qEn: "What are the three basic stages of memory process in sequence?",
      qAs: "স্মৃতি প্ৰক্ৰিয়াৰ তিনিটা প্ৰাথমিক স্তৰ ক্ৰমানুসাৰে কি কি?",
      optsEn: [
        "Recall, Recognition, Storage",
        "Registration, Retention, Reproduction",
        "Encoding, Forgetting, Recall",
        "Attention, Retention, Forgetting"
      ],
      optsAs: [
        "স্মৰণ, প্ৰত্যভিজ্ঞা, সংৰক্ষণ",
        "সংকেতীকৰণ (প্ৰৱেশ), সংৰক্ষণ (ধাৰণ), পুনৰুদ্ধাৰ (স্মৰণ)",
        "সংকেতীকৰণ, বিস্মৃতি, স্মৰণ",
        "মনোযোগ, ধাৰণ, বিস্মৃতি"
      ],
      correct: 1,
      expEn: "The three successive steps of memory are Registration (getting info), Retention (storing info), and Reproduction (recalling info).",
      expAs: "স্মৃতিৰ ক্ৰমাগত তিনিটা স্তৰ হ'ল প্ৰৱেশ (পঞ্জীয়ন), ধাৰণ (সংৰক্ষণ), আৰু পুনৰুদ্ধাৰ (স্মৰণ আৰু প্ৰত্যভিজ্ঞা)।"
    },
    {
      id: 2,
      qEn: "Which German psychologist plotted the famous 'Curve of Forgetting' using nonsense syllables?",
      qAs: "কোনজন জাৰ্মান মনোবিজ্ঞানীয়ে অৰ্থহীন শব্দ ব্যৱহাৰ কৰি বিখ্যাত 'বিস্মৃতিৰ বক্ৰৰেখা' অংকন কৰিছিল?",
      optsEn: ["William James", "B.F. Skinner", "Hermann Ebbinghaus", "Sigmund Freud"],
      optsAs: ["উইলিয়াম জেমছ", "বি.এফ. স্কিনাৰ", "হাৰ্মান এবিংহাউচ", "চিগমণ্ড ফ্ৰয়েড"],
      correct: 2,
      expEn: "Hermann Ebbinghaus plotted the Curve of Forgetting showing that forgetting occurs rapidly in the first 20 minutes after learning.",
      expAs: "হাৰ্মান এবিংহাউচে বিস্মৃতিৰ বক্ৰৰেখা অংকন কৰি দেখুৱাইছিল যে শিকনৰ প্ৰথম ২০ মিনিটতে আটাইতকৈ বেছি বিস্মৃতি ঘটে।"
    },
    {
      id: 3,
      qEn: "What is the primary difference between mental health and mental hygiene?",
      qAs: "মানসিক স্বাস্থ্য আৰু মানসিক বিজ্ঞানৰ মাজৰ প্ৰধান পাৰ্থক্যটো কি?",
      optsEn: [
        "Mental health is the science, while mental hygiene is the state",
        "Mental health is the state/goal, while mental hygiene is the practice/science to reach it",
        "There is no difference between them",
        "Mental health only applies to adults, while mental hygiene applies to children"
      ],
      optsAs: [
        "মানসিক স্বাস্থ্য হৈছে বিজ্ঞান, আনহাতে মানসিক বিজ্ঞান হৈছে অৱস্থা",
        "মানসিক স্বাস্থ্য হ'ল লক্ষ্য/সুস্থ অৱস্থা, আনহাতে মানসিক বিজ্ঞান হ'ল ইয়াক লাভ কৰাৰ অনুশীলন বা নিয়ম",
        "ইহঁতৰ মাজত কোনো পাৰ্থক্য নাই",
        "মানসিক স্বাস্থ্য কেৱল প্ৰাপ্তবয়স্কৰ বাবে প্ৰযোজ্য, আনহাতে মানসিক বিজ্ঞান শিশুৰ বাবে প্ৰযোজ্য"
      ],
      correct: 1,
      expEn: "Mental health is the desired state of psychological well-being. Mental hygiene is the active science and practice of rules to achieve and preserve mental health.",
      expAs: "মানসিক স্বাস্থ্য হ'ল মানসিক সুস্থতাৰ কাংক্ষিত লক্ষ্য। মানসিক বিজ্ঞান হ'ল এই মানসিক স্বাস্থ্য ৰক্ষা আৰু উন্নত কৰাৰ বিজ্ঞানসন্মত নিয়ম।"
    },
    {
      id: 4,
      qEn: "In educational statistics, what is the graphical representation that uses adjacent vertical rectangular columns?",
      qAs: "শৈক্ষিক পৰিসংখ্যাত ওচৰা-ওচৰিকৈ থকা উলম্ব আয়তক্ষেত্ৰীয় স্তম্ভ ব্যৱহাৰ কৰা লেখচিত্ৰটোক কি বোলা হয়?",
      optsEn: ["Frequency Polygon", "Histogram", "Cumulative Frequency Curve", "Pie Chart"],
      optsAs: ["পৌনঃপুনিকতা বহুভুজ", "হিষ্টগ্ৰাম (আয়তচিত্ৰ)", "ক্ৰমপুঞ্জিত পৌনঃপুনিকতা ৰেখা", "বৃত্তচিত্ৰ"],
      correct: 1,
      expEn: "A Histogram is a graphical representation of grouped data consisting of contiguous vertical rectangles whose areas are proportional to class frequencies.",
      expAs: "হিষ্টগ্ৰাম হ'ল ওচৰা-ওচৰি থকা উলম্ব স্তম্ভৰে গঠিত এক লেখচিত্ৰ যি শ্ৰেণীৰ পৌনঃপুনিকতাক প্ৰতিনিধিত্ব কৰে।"
    },
    {
      id: 5,
      qEn: "Which measure of central tendency is defined as the point that divides a score distribution exactly in half?",
      qAs: "কোনটো কেন্দ্ৰীয় প্ৰৱণতাৰ পৰিমাপকক নম্বৰ বিভাজন তালিকাক সমানে দুভাগ কৰা বিন্দু বুলি সংজ্ঞায়িত কৰা হয়?",
      optsEn: ["Arithmetic Mean", "Median", "Mode", "Range"],
      optsAs: ["গাণিতিক গড়", "মধ্যমা", "প্ৰচুৰক", "প্ৰসাৰ"],
      correct: 1,
      expEn: "The Median is the middlemost point in a score distribution. It divides the score frequencies exactly in half (50% above, 50% below).",
      expAs: "মধ্যমা হ'ল এটা নম্বৰ বিভাজন তালিকাৰ সোঁ-মাজৰ বিন্দু। ই নম্বৰসমূহক সমানে দুভাগ কৰে (৫০% ওপৰত আৰু ৫০% তলত)।"
    }
  ],

  // Test Paper 4: Education Full Syllabus Model Test B
  4: [
    {
      id: 1,
      qEn: "If the Mean of a score distribution is 24 and the Median is 22, calculate the approximate value of the Mode using the empirical formula.",
      qAs: "যদি নম্বৰ বিতৰণ তালিকাৰ গড় ২৪ আৰু মধ্যমা ২২ হয়, তেন্তে অভিজ্ঞতালব্ধ সূত্ৰ ব্যৱহাৰ কৰি প্ৰচুৰক গণনা কৰা।",
      optsEn: ["18", "20", "26", "28"],
      optsAs: ["১৮", "২০", "২৬", "২৮"],
      correct: 0,
      expEn: "The empirical formula is: Mode = 3 Median - 2 Mean. Mode = (3 * 22) - (2 * 24) = 66 - 48 = 18.",
      expAs: "অভিজ্ঞতালব্ধ সূত্ৰটো হ'ল: প্ৰচুৰক = ৩ মধ্যমা - ২ গড়। প্ৰচুৰক = (৩ * ২২) - (২ * ২৪) = ৬৬ - ৪৮ = ১৮।"
    },
    {
      id: 2,
      qEn: "Why is a defense mechanism like Rationalization used by a student?",
      qAs: "ছাত্ৰ-ছাত্ৰীসকলে কিয় 'যুক্তিকৰণ'ৰ দৰে প্ৰতিৰক্ষা কৌশল ব্যৱহাৰ কৰে?",
      optsEn: [
        "To intentionally lie and cheat in exams",
        "To unconsciously justify failures and protect self-esteem",
        "To improve memory retention",
        "To calculate statistics formulas faster"
      ],
      optsAs: [
        "পৰীক্ষাত ইচ্ছা কৰি মিছা মাতিবলৈ বা নকল কৰিবলৈ",
        "অৱচেতনভাৱে নিজৰ বিফলতাক যুক্তিযুক্ত কৰি আত্মসন্মান ৰক্ষা কৰিবলৈ",
        "স্মৃতি শক্তি বৃদ্ধি কৰিবলৈ",
        "পৰিসংখ্যাৰ সূত্ৰসমূহ দ্ৰুতগতিত হিচাপ কৰিবলৈ"
      ],
      correct: 1,
      expEn: "Rationalization is an unconscious defense mechanism where students use socially acceptable explanations to justify failures or conflicts, saving self-esteem.",
      expAs: "যুক্তিকৰণ হ'ল এক অৱচেতন প্ৰতিৰক্ষা কৌশল যাৰ সহায়ত ছাত্ৰ-ছাত্ৰীয়ে নিজৰ বিফলতাৰ বাবে যুক্তি দি আত্মসন্মান ৰক্ষা কৰিবলৈ চেষ্টা কৰে।"
    },
    {
      id: 3,
      qEn: "Which psychological distraction is characterized by voluntary redirection of attention due to personal interest?",
      qAs: "ব্যক্তিগত আগ্ৰহৰ বাবে মনোযোগ স্বতঃস্ফূৰ্তভাৱে বেলেগ দিশলৈ যোৱাক কি মনোযোগৰ ঘটনা বুলি কোৱা হয়?",
      optsEn: ["Active Inattention", "Fluctuation of attention", "Distraction of attention", "Percentile shift"],
      optsAs: ["সক্ৰিয় অমনোযোগ", "মনোযোগৰ বিচ্যুতি (উঠ-নমাই)", "মনোযোগৰ বিভ্ৰান্তি/বিচ্যুতি", "শততমক স্থান সলনি"],
      correct: 2,
      expEn: "Distraction of attention refers to the voluntary or involuntary shifting of focus away from the main task due to other interesting stimuli.",
      expAs: "মনোযোগ বিচ্যুতি বা বিভ্ৰান্তি হ'ল মূল বিষয়টোৰ পৰা মনোযোগ অন্য আকৰ্ষণীয় বিষয়লৈ ঘূৰি যোৱাটো।"
    },
    {
      id: 4,
      qEn: "Which calculation method in Statistics is highly recommended when dealing with massive frequency tables to save time?",
      qAs: "সময় বচাবলৈ বৃহৎ পৌনঃপুনিকতা তালিকা থকা ক্ষেত্ৰত পৰিসংখ্যাৰ কোনটো গণনা পদ্ধতি ব্যৱহাৰ কৰিবলৈ পৰামৰ্শ দিয়া হয়?",
      optsEn: ["Long method for Mean", "Assumed Mean method (Short method)", "Direct tally mark count", "Percentile range calculation"],
      optsAs: ["গড় উলিওৱাৰ দীৰ্ঘ পদ্ধতি", "কাল্পনিক গড় পদ্ধতি (সংক্ষিপ্ত পদ্ধতি)", "প্ৰত্যক্ষ টেলী চিহ্ন পদ্ধতি", "শততমক প্ৰসাৰ হিচাপ"],
      correct: 1,
      expEn: "The Assumed Mean method (Short method) uses class interval deviations to calculate Mean quickly, reducing arithmetic errors in large distributions.",
      expAs: "কাল্পনিক গড় পদ্ধতি (সংক্ষিপ্ত পদ্ধতি) ব্যৱহাৰ কৰিলে শ্ৰেণী অন্তৰালৰ সহায়ত অতি কম সময়ত গড় উলিওৱাব পাৰি আৰু ভুল হোৱাৰ সম্ভাৱনা কমে।"
    },
    {
      id: 5,
      qEn: "When a previous learning experience hinders the acquisition of a new skill, it represents which type of Transfer of Learning?",
      qAs: "যেতিয়া আগৰ কোনো শিকন অভিজ্ঞতাই নতুন কৌশল আয়ত্ত কৰাত বাধা সৃষ্টি কৰে, তেতিয়া ই কি ধৰণৰ শিকন সঞ্চালন প্ৰতিনিধিত্ব কৰে?",
      optsEn: ["Positive Transfer", "Zero Transfer", "Negative Transfer", "Horizontal Transfer"],
      optsAs: ["ইতিবাচক সঞ্চালন", "শূণ্য সঞ্চালন", "নেতিবাচক সঞ্চালন", "অনুভূমিক সঞ্চালন"],
      correct: 2,
      expEn: "Negative Transfer occurs when previous habits or learning interfere with learning a new, different task or format.",
      expAs: "নেতিবাচক সঞ্চালন তেতিয়া ঘটে যেতিয়া পূৰ্বৰ কোনো শিকন বা অভ্যাসে নতুন কাম শিকাৰ ক্ষেত্ৰত বাধা বা ব্যাঘাত জন্মায়।"
    }
  ],

  // Test Paper 5: AHSEC Mock Ranker Test (Mock A)
  5: [
    {
      id: 1,
      qEn: "The Mudaliar Commission proposed how many diversified streams of curriculum courses for secondary education?",
      qAs: "মুডালিয়াৰ আয়োগে মাধ্যমিক শিক্ষাৰ বাবে পাঠ্যক্ৰমৰ কেইটা বৈচিত্ৰ্যময় শাখাৰ প্ৰস্তাৱ কৰিছিল?",
      optsEn: ["3 streams", "5 streams", "7 streams", "10 streams"],
      optsAs: ["৩ টা শাখা", "৫ টা শাখা", "৭ টা শাখা", "১০ টা শাখা"],
      correct: 2,
      expEn: "The Secondary Education Commission proposed seven diversified streams: Humanities, Science, Technical, Commercial, Agriculture, Fine Arts, and Home Science.",
      expAs: "মাধ্যমিক শিক্ষা আয়োগে সাতটা বৈচিত্ৰ্যময় শাখাৰ প্ৰস্তাৱ কৰিছিল: মানৱীয় বিদ্যা, বিজ্ঞান, কািকৰী, বাণিজ্য, কৃষি, চাৰুকলা আৰু গাৰ্হস্থ্য বিজ্ঞান।"
    },
    {
      id: 2,
      qEn: "Open Schooling systems like NIOS (NOS) and ASOS represent which type of educational agency?",
      qAs: "NIOS আৰু ASOS ৰ দৰে মুক্ত বিদ্যালয় ব্যৱস্থাসমূহে কি ধৰণৰ শিক্ষা প্ৰতিষ্ঠানক প্ৰতিনিধিত্ব কৰে?",
      optsEn: ["Formal Agency", "Informal Agency", "Non-formal Agency", "Private Tutorial Agency"],
      optsAs: ["আনুষ্ঠানিক প্ৰতিষ্ঠান", "অনিয়মিত প্ৰতিষ্ঠান", "অনানুষ্ঠানিক প্ৰতিষ্ঠান", "ব্যক্তিগত টিউটৰিয়েল প্ৰতিষ্ঠান"],
      correct: 2,
      expEn: "Open Schools and Open Universities are organized, planned structures operating outside the formal boundaries, making them non-formal agencies.",
      expAs: "মুক্ত বিদ্যালয় আৰু মুক্ত বিশ্ববিদ্যালয়সমূহ অনানুষ্ঠানিক শিক্ষাৰ মূল আৰু সক্ৰিয় সঁজুলি।"
    },
    {
      id: 3,
      qEn: "Which of the following values is fostered by integrating environmental studies into secondary school curriculum?",
      qAs: "মাধ্যমিক বিদ্যালয়ৰ পাঠ্যক্ৰমত পৰিৱেশ অধ্যয়ন সংহত কৰিলে তলৰ কোনটো মূল্যবোধ গঢ়ি উঠে?",
      optsEn: ["Extreme consumerism", "Ecological preservation and conservation value", "Only commercial exploitation of forests", "Rote procedures without environmental care"],
      optsAs: ["অত্যাধিক ভোগবাদ", "পৰিৱেশ সংৰক্ষণ আৰু পৰিস্থিতিতন্ত্ৰ ৰক্ষাৰ মূল্যবোধ", "কেৱল বনাঞ্চলৰ ব্যৱসায়িক ব্যৱহাৰ", "পৰিৱেশৰ চিন্তা নকৰাকৈ কাম কৰা"],
      correct: 1,
      expEn: "Environmental education fosters conservation values and active student participation in resolving ecological degradation problems.",
      expAs: "পৰিৱেশ শিক্ষাই ছাত্ৰ-ছাত্ৰীৰ মনত প্ৰকৃতি সংৰক্ষণৰ মনোভাৱ আৰু পৰিৱেশ সচেতনতা গঢ়ি তোলে।"
    },
    {
      id: 4,
      qEn: "Under Pavlov's Classical Conditioning, salivary secretion in response to food is considered as:",
      qAs: "পাভলভৰ ধ্ৰুপদী অনুৱৰ্তনৰ অধীনত, খাদ্য দেখি লালটি ওলোৱাটো তলৰ কোনটো বুলি গণ্য কৰা হয়?",
      optsEn: [
        "Conditioned Stimulus (CS)",
        "Conditioned Response (CR)",
        "Unconditioned Response (UCR)",
        "Unconditioned Stimulus (UCS)"
      ],
      optsAs: [
        "অনুবৰ্তিত উদ্দীপক (CS)",
        "অনুবৰ্তিত প্ৰতিক্ৰিয়া (CR)",
        "অননুবৰ্তিত প্ৰতিক্ৰিয়া (UCR)",
        "অননুবৰ্তিত উদ্দীপক (UCS)"
      ],
      correct: 2,
      expEn: "Food is the natural/unconditioned stimulus, and the resulting salivation is the natural/unconditioned response (UCR).",
      expAs: "খাদ্য হৈছে স্বাভাৱিক উদ্দীপক আৰু লালটি ওলোৱাটো হৈছে এক স্বাভাৱিক বা অননুবৰ্তিত প্ৰতিক্ৰিয়া (UCR)।"
    },
    {
      id: 5,
      qEn: "What is the formula to calculate the class mark (midpoint) of a class interval like 10 - 19?",
      qAs: "১০ - ১৯ শ্ৰেণী অন্তৰালৰ শ্ৰেণী মধ্যবিন্দু গণনা কৰাৰ সূত্ৰটো কি?",
      optsEn: [
        "(Lower Limit + Upper Limit) / 2",
        "(Upper Limit - Lower Limit) / 2",
        "Lower Limit + Class Interval length",
        "Upper Limit - Class Interval length"
      ],
      optsAs: [
        "(নিম্ন সীমা + উচ্চ সীমা) / ২",
        "(উচ্চ সীমা - নিম্ন সীমা) / ২",
        "নিম্ন সীমা + শ্ৰেণী প্ৰসাৰৰ দৈৰ্ঘ্য",
        "উচ্চ সীমা - শ্ৰেণী প্ৰসাৰৰ দৈৰ্ঘ্য"
      ],
      correct: 0,
      expEn: "Midpoint = (Lower Limit + Upper Limit) / 2. For 10 - 19, midpoint = (10 + 19) / 2 = 29 / 2 = 14.5.",
      expAs: "মধ্যবিন্দু = (নিম্ন সীমা + উচ্চ সীমা) / ২। ১০-১৯ শ্ৰেণীৰ ক্ষেত্ৰত, মধ্যবিন্দু = (১০ + ১৯) / ২ = ২৯ / ২ = ১৪.৫।"
    }
  ],

  // Test Paper 6: AHSEC Mock Ranker Test (Mock B)
  6: [
    {
      id: 1,
      qEn: "Which of the following factors of attention is considered objective or external?",
      qAs: "মনোযোগৰ তলৰ কোনটো কাৰক বস্তুনিষ্ঠ বা বাহ্যিক কাৰক বুলি গণ্য কৰা হয়?",
      optsEn: ["Personal Interest", "Motive or urge", "Intensity or size of the stimulus", "Past experience"],
      optsAs: ["ব্যক্তিগত আগ্ৰহ", "প্ৰেৰণা বা প্ৰবৃত্তি", "উদ্দীপকৰ তীব্ৰতা বা আকাৰ", "অতীত অভিজ্ঞতা"],
      correct: 2,
      expEn: "Intensity, size, repetition, and movement of a stimulus are objective (external) factors, while interests and habits are subjective (internal) factors.",
      expAs: "উদ্দীপকৰ আকাৰ, তীব্ৰতা, গতিশীলতা আদি হ'ল মনোযোগৰ বাহ্যিক (বস্তুনিষ্ঠ) কাৰক, আৰু আগ্ৰহ বা অভ্যাস হ'ল আভ্যন্তৰীণ কাৰক।"
    },
    {
      id: 2,
      qEn: "What does the peak of the Ebbinghaus curve of forgetting demonstrate?",
      qAs: "এবিংহাউচৰ বিস্মৃতিৰ বক্ৰৰেখাই প্ৰধানকৈ কি প্ৰমাণ কৰে?",
      optsEn: [
        "Memory improves as time passes",
        "Forgetting is extremely rapid immediately after study, and then tapers off",
        "Rote memory is superior to logical memory",
        "Forgetting never occurs for school subjects"
      ],
      optsAs: [
        "সময় অতিবাহিত হোৱাৰ লগে লগে স্মৃতি শক্তি বৃদ্ধি পায়",
        "অধ্যয়নৰ ঠিক পিছতে বিস্মৃতি অত্যন্ত দ্ৰুত হয় আৰু পিছলৈ ই ধীৰ হৈ পৰে",
        "যান্ত্ৰিক স্মৃতি তৰ্কসংগত স্মৃতিতকৈ শ্ৰেষ্ঠ",
        "স্কুলৰ বিষয়সমূহ কেতিয়াও বিস্মৃতি নহয়"
      ],
      correct: 1,
      expEn: "Ebbinghaus showed that forgetting is rapid immediately after learning (58% within 20 mins) and gradually stabilizes over subsequent days.",
      expAs: "এবিংহাউচে দেখুৱাইছিল যে শিকনৰ ঠিক পিছতেই বিস্মৃতি অত্যন্ত দ্ৰুত গতিত হয় আৰু পিছলৈ ই স্থায়ী অৱস্থালৈ আহে।"
    },
    {
      id: 3,
      qEn: "A student who redirects energy from socially unapproved impulses into positive, creative work is using which defense mechanism?",
      qAs: "সামাজিকভাৱে অগ্ৰহণযোগ্য প্ৰবৃত্তিক সমাজ-অনুমোদিত সৃষ্টিশীল কামলৈ ৰূপান্তৰ কৰা ছাত্ৰজনে কি প্ৰতিৰক্ষা কৌশল ব্যৱহাৰ কৰিছে?",
      optsEn: ["Rationalization", "Sublimation", "Projection", "Regression"],
      optsAs: ["যুক্তিকৰণ", "উদীকৰণ (Sublimation)", "প্ৰক্ষেপণ", "প্ৰত্যাৱৰ্তন"],
      correct: 1,
      expEn: "Sublimation is a healthy defense mechanism where negative urges are channelled into constructive, socially approved outlets like art or literature.",
      expAs: "উদীকৰণ হ'ল এনে এক প্ৰতিৰক্ষা কৌশল যাৰ সহায়ত মানুহে সমাজ বিৰোধী বা বেয়া চিন্তা বা প্ৰবৃত্তিক ভাল কামলৈ ৰূপান্তৰ কৰে।"
    },
    {
      id: 4,
      qEn: "Under the provisions of the secondary school counseling guidance, which type of guidance helps students select career streams?",
      qAs: "মাধ্যমিক বিদ্যালয়ৰ নিৰ্দেশনা সেৱাৰ অধীনত, কোনটো নিৰ্দেশনাই ছাত্ৰ-ছাত্ৰীক কেৰিয়াৰ বা বৃত্তি বাছনি কৰাত সহায় কৰে?",
      optsEn: ["Personal Guidance", "Educational Guidance", "Vocational Guidance", "Social Guidance"],
      optsAs: ["ব্যক্তিগত নিৰ্দেশনা", "শৈক্ষিক নিৰ্দেশনা", "বৃত্তিমূলক নিৰ্দেশনা", "সামাজিক নিৰ্দেশনা"],
      correct: 2,
      expEn: "Vocational Guidance focuses specifically on helping students understand, select, and prepare for career opportunities and employment.",
      expAs: "বৃত্তিমূলক নিৰ্দেশনাই শিক্ষাৰ্থীক নিজৰ যোগ্যতা অনুসৰি ভৱিষ্যতৰ জীৱিকা বা বৃত্তি নিৰ্বাচন কৰাত সহায় কৰে।"
    },
    {
      id: 5,
      qEn: "Calculate the Mode of the following ungrouped scores: 12, 15, 12, 18, 15, 12, 20.",
      qAs: "তলৰ অশ্ৰেণীভুক্ত নম্বৰসমূহৰ প্ৰচুৰক গণনা কৰা: ১২, ১৫, ১২, ১৮, ১৫, ১২, ২০।",
      optsEn: ["12", "15", "18", "20"],
      optsAs: ["১২", "১৫", "১৮", "২০"],
      correct: 0,
      expEn: "Mode is the most frequently occurring value. In this list, 12 occurs three times, which is more than any other score.",
      expAs: "প্ৰচুৰক হ'ল আটাইতকৈ বেছি বাৰ পুনৰাবৃত্তি হোৱা নম্বৰটো। এই তালিকাত ১২ নম্বৰটো তিনিবাৰ পোৱা গৈছে।"
    }
  ],

  // Test Paper 7: Julfy's 2026 Board Prediction Paper
  7: [
    {
      id: 1,
      qEn: "Which landmark education policy proposed the 'Operation Blackboard' scheme to improve primary school resources across India?",
      qAs: "সমগ্ৰ ভাৰততে প্ৰাথমিক বিদ্যালয়ৰ সমল উন্নত কৰাৰ বাবে কোনখন ঐতিহাসিক শিক্ষানীতিয়ে 'অপাৰেচন ব্লেকবৰ্ড' আঁচনিৰ প্ৰস্তাৱ কৰিছিল?",
      optsEn: ["NPE 1968", "NPE 1986", "POA 1992", "NEP 2020"],
      optsAs: ["NPE ১৯৬৮", "NPE ১৯৮৬", "POA ১৯৯২", "NEP ২০২০"],
      correct: 1,
      expEn: "Operation Blackboard was launched as a result of the recommendations of the National Policy on Education (NPE) 1986 to provide basic minimum facilities to schools.",
      expAs: "১৯৮৬ চনৰ ৰাষ্ট্ৰীয় শিক্ষানীতিৰ চুপাৰিছৰ ভিত্তিত প্ৰাথমিক বিদ্যালয়সমূহক নূন্যতম প্ৰয়োজনীয় সা-সুবিধা দিবলৈ 'অপাৰেচন ব্লেকবৰ্ড' আঁচনি গ্ৰহণ কৰা হৈছিল।"
    },
    {
      id: 2,
      qEn: "What is the primary function of SEBA and AHSEC education boards in the state of Assam?",
      qAs: "অসম ৰাজ্যত SEBA আৰু AHSEC শিক্ষা বোৰ্ড দুখনৰ প্ৰধান কাৰ্য কি?",
      optsEn: [
        "Funding rural roads construction",
        "Syllabus formulation, school affiliations, and conducting final examinations",
        "Hiring college professors only",
        "Managing open university admissions"
      ],
      optsAs: [
        "গ্ৰাম্য পথ নিৰ্মাণৰ পুঁজি যোগান ধৰা",
        "পাঠ্যক্ৰম প্ৰস্তুত কৰা, স্বীকৃতি প্ৰদান আৰু চূড়ান্ত পৰীক্ষা অনুষ্ঠিত কৰা",
        "কেৱল কলেজৰ অধ্যাপক নিযুক্তি দিয়া",
        "মুক্ত বিশ্ববিদ্যালয়ৰ নামভৰ্তি পৰিচালনা কৰা"
      ],
      correct: 1,
      expEn: "SEBA and AHSEC formulate curricula, supervise school affiliations, and conduct the secondary and higher secondary board exams in Assam.",
      expAs: "SEBA আৰু AHSEC ৰ মূল দায়িত্ব হ'ল ক্ৰমে অসমৰ মাধ্যমিক আৰু উচ্চতৰ মাধ্যমিক পৰ্যায়ৰ পাঠ্যক্ৰম নিয়ন্ত্ৰণ, স্বীকৃতি প্ৰদান আৰু পৰীক্ষা পৰিচালনা কৰা।"
    },
    {
      id: 3,
      qEn: "A student who is maladjusted in secondary school is likely to show which of the following signs?",
      qAs: "মাধ্যমিক বিদ্যালয়ত অপসংগতিৰ চিকাৰ হোৱা এজন শিক্ষাৰ্থীয়ে তলৰ কোনটো লক্ষণ দেখুৱাব পাৰে?",
      optsEn: ["High academic motivation", "Withdrawal behavior and emotional outbursts", "Perfect peer relationships", "Exceptional memory retention"],
      optsAs: ["উচ্চ শৈক্ষিক অনুপ্ৰেৰণা", "দলৰ পৰা আঁতৰি থকা মনোভাৱ আৰু হঠাতে খং উঠা", "উত্তম সহপাঠী সম্পৰ্ক", "অসাধাৰণ স্মৃতিশক্তি"],
      correct: 1,
      expEn: "Maladjustment signs include withdrawal, excessive anxiety, emotional instability, aggression, and poor social relationships in class.",
      expAs: "অপসংগতিৰ প্ৰধান লক্ষণসমূহ হ'ল সমাজ বা শ্ৰেণীৰ পৰা আঁতৰি থকাৰ প্ৰৱণতা, আৱেগিক অস্থিৰতা আৰু খিংখিঙীয়া মনোভাৱ।"
    },
    {
      id: 4,
      qEn: "The formula to calculate the Arithmetic Mean of grouped data using the Assumed Mean (short method) is:",
      qAs: "কাল্পনিক গড় ব্যৱহাৰ কৰি শ্ৰেণীভুক্ত তথ্যৰ গাণিতিক গড় উলিওৱাৰ চুটি সূত্ৰটো কি?",
      optsEn: [
        "AM + (Σfd / N) * i",
        "ΣfX / N",
        "3 Median - 2 Mean",
        "(N / 2 - c.f) / f * i"
      ],
      optsAs: [
        "AM + (Σfd / N) * i",
        "ΣfX / N",
        "৩ মধ্যমা - ২ গড়",
        "(N / ২ - c.f) / f * i"
      ],
      correct: 0,
      expEn: "The short method formula is Mean = AM + (Σfd / N) * i, where AM is the assumed mean, f is frequency, d is deviation, N is total frequency, and i is class interval size.",
      expAs: "সংক্ষিপ্ত বা চুটি পদ্ধতিৰে গড় উলিওৱাৰ সূত্ৰটো হ'ল: Mean = AM + (Σfd / N) * i, য'ত AM হ'ল কাল্পনিক গড়, d বিচ্যুতি আৰু i শ্ৰেণী অন্তৰালৰ দৈৰ্ঘ্য।"
    },
    {
      id: 5,
      qEn: "Which of the following describes the 'Percentile Rank' of a student's test score?",
      qAs: "তলৰ কোনটোৱে এজন শিক্ষাৰ্থীৰ পৰীক্ষাৰ নম্বৰৰ 'শততমক স্থান' বৰ্ণনা কৰে?",
      optsEn: [
        "The absolute mark scored out of 100",
        "The percentage of scores in a distribution that are equal to or lower than that score",
        "The average score of the entire class",
        "The time taken to finish the test paper"
      ],
      optsAs: [
        "১০০ নম্বৰৰ ভিতৰত পোৱা প্ৰকৃত নম্বৰ",
        "বিতৰণ তালিকাত সেই নিৰ্দিষ্ট নম্বৰৰ সমান বা তাতকৈ কম নম্বৰ পোৱা শিক্ষাৰ্থীৰ শতকৰা হাৰ",
        "গোটেই শ্ৰেণীটোৰ গড় নম্বৰ",
        "পৰীক্ষাৰ বহীখন লিখি শেষ কৰিবলৈ লোৱা সময়"
      ],
      correct: 1,
      expEn: "A percentile rank indicates the percentage of scores in its frequency distribution that are equal to or below it. For example, PR = 80 means 80% of students scored equal to or less than you.",
      expAs: "শততমক স্থানে বুজায় যে কিমান শতাংশ শিক্ষাৰ্থীৰ নম্বৰ সেই নিৰ্দিষ্ট নম্বৰটোৰ সমান বা তাতকৈ কম। উদাহৰণস্বৰূপে PR = ৮০ মানে ৮০% শিক্ষাৰ্থী আপোনাতকৈ তলত আছে।"
    }
  ]
};
