"use client";

import { Award, BookOpen, GraduationCap, Users, Target, Lightbulb, Zap, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  const isEn = language === "en";

  // Native bilingual data structures reflecting high-quality mission language
  const content = {
    header: isEn
      ? "Empowering Class 12 AHSEC Students to Achieve Excellence"
      : "দ্বাদশ শ্ৰেণীৰ AHSEC শিক্ষাৰ্থীসকলক উৎকৃষ্টতা অৰ্জনৰ বাবে সৱলীকৰণ",
    sub: isEn
      ? "Meet the founder, understand our methodology, and discover how the Platinum Ranker system is shaping the future of education in Assam."
      : "প্ৰতিষ্ঠাপকক লগ পাওক, আমাৰ শিক্ষণ পদ্ধতি বুজি লওক, আৰু জানক কেনেকৈ প্লেটিনাম ৰেংকাৰ ব্যৱস্থাই অসমৰ শিক্ষাৰ ভৱিষ্যত গঢ়ি তুলিছে।",
    meetAuthor: isEn ? "Meet the Founder & Lead Educator" : "প্ৰতিষ্ঠাপক আৰু মুখ্য শিক্ষকৰ সৈতে চিনাকি",
    authorName: isEn ? "Julfikar Rahman Zinnah" : "জুলফিকৰ ৰহমান জিন্নাহ",
    authorRole: isEn ? "Founder of LearnWithJulfy" : "LearnWithJulfy ৰ প্ৰতিষ্ঠাপক",
    authorBio1: isEn
      ? "Julfikar Rahman Zinnah founded LearnWithJulfy with a single mission: to democratize high-scoring academic materials for Class 12 students under the Assam Higher Secondary Education Council (AHSEC). Known popularly as 'Julfy Sir', he has helped thousands of students master Education, mental health concepts, and statistical calculations."
      : "জুলফিকৰ ৰহমান জিন্নাহে অসম উচ্চতৰ মাধ্যমিক শিক্ষা সংসদ (AHSEC) ৰ অধীনৰ দ্বাদশ শ্ৰেণীৰ শিক্ষাৰ্থীসকলৰ বাবে সৰ্বোত্তম মানদণ্ডৰ শৈক্ষিক সমলসমূহ সহজলভ্য কৰাৰ লক্ষ্যৰে LearnWithJulfy প্ৰতিষ্ঠা কৰিছিল। শিক্ষাৰ্থীসকলৰ মাজত 'জুলফী ছাৰ' হিচাপে জনপ্ৰিয় তেওঁ হাজাৰ হাজাৰ শিক্ষাৰ্থীক শিক্ষা বিষয়ৰ কঠিন ধাৰণাসমূহ আৰু শৈক্ষিক পৰিসংখ্যাৰ গণনাসমূহ আয়ত্ত কৰাত সহায় কৰিছে।",
    authorBio2: isEn
      ? "Through the publication of the Platinum notes and interactive tests, Julfikar has established a systematic framework that bridges the gap between classroom lectures and top-tier board evaluation requirements."
      : "প্লেটিনাম টোকা আৰু ইণ্টাৰেক্টিভ পৰীক্ষাসমূহৰ জৰিয়তে জুলফিকৰে এক প্ৰণালীবদ্ধ শিক্ষণ পদ্ধতি গঢ়ি তুলিছে, যি শ্ৰেণীকোঠাৰ শিক্ষা আৰু বোৰ্ড পৰীক্ষাত শীৰ্ষ স্থান লাভৰ বাবে প্ৰয়োজনীয় প্ৰস্তুতিক সংযোগ কৰে।",
    
    // Mission
    missionTitle: isEn ? "Our Mission" : "আমাৰ লক্ষ্য",
    missionDesc: isEn
      ? "To provide every student—regardless of financial condition, geographic location, or educational background—with access to structured, high-quality, bilingual learning resources that promote understanding, curiosity, self-study, academic excellence, and lifelong learning."
      : "আৰ্থিক অৱস্থা, ভৌগোলিক অৱস্থান বা শৈক্ষিক পৃষ্ঠভূমি নিৰ্বিশেষে প্ৰতিগৰাকী শিক্ষাৰ্থীক প্ৰণালীবদ্ধ, উচ্চ মানদণ্ডৰ, দ্বিভাষিক শিক্ষণ সমল প্ৰদান কৰা যিয়ে বুজাবুজি, কৌতূহল, স্ব-অধ্যয়ন, শৈক্ষিক উৎকৃষ্টতা আৰু আজীৱন শিক্ষণক প্ৰসাৰিত কৰে।",
    
    // Vision
    visionTitle: isEn ? "Our Vision" : "আমাৰ দৰ্শন",
    visionDesc: isEn
      ? "To build one of the most trusted student-centered educational platforms in India, empowering learners through accessible knowledge, innovative learning systems, and equal educational opportunities, while contributing to a more educated, capable, and progressive society."
      : "ভাৰতৰ অন্যতম বিশ্বাসযোগ্য শিক্ষাৰ্থী-কেন্দ্ৰিক শৈক্ষিক মঞ্চ গঢ়ি তোলা, যাৰ দ্বাৰা সহজলভ্য জ্ঞান, অভিনৱ শিক্ষণ পদ্ধতি আৰু শৈক্ষিক সমতাৰ জৰিয়তে শিক্ষাৰ্থীসকলক সবলীকৰণ কৰাৰ লগতে এক শিক্ষিত, দক্ষ আৰু প্ৰগতিশীল সমাজ গঢ়াত অৱদান যোগাব পাৰি।",

    // Story
    storyTitle: isEn ? "The LearnWithJulfy Story" : "LearnWithJulfy ৰ কাহিনী",
    storyDesc1: isEn
      ? "LearnWithJulfy was founded with a simple belief: every student deserves access to quality education, regardless of location, language, or financial background."
      : "LearnWithJulfy এক সৰল বিশ্বাসৰ ওপৰত ভিত্তি কৰি প্ৰতিষ্ঠা কৰা হৈছিল: স্থান, ভাষা বা আৰ্থিক পৃষ্ঠভূমি নিৰ্বিশেষে প্ৰতিগৰাকী শিক্ষাৰ্থীয়েই মানদণ্ডসম্পন্ন শিক্ষা লাভ কৰাৰ যোগ্য।",
    storyDesc2: isEn
      ? "What began as a small educational initiative in Assam grew from witnessing the challenges faced by countless students in rural and underserved communities. Many talented learners lacked access to premium study materials, proper academic guidance, structured learning systems, and affordable educational support. As a result, potential was often limited not by ability, but by opportunity."
      : "অসমৰ এক সৰু শৈক্ষিক পদক্ষেপ হিচাপে আৰম্ভ হোৱা LearnWithJulfy এ গ্ৰাম্য আৰু বঞ্চিত সমাজৰ অগণন শিক্ষাৰ্থীয়ে সন্মুখীন হোৱা প্ৰত্যাহ্বানসমূহ প্ৰত্যক্ষ কৰাৰ পৰাই জন্ম লাভ কৰিছিল। বহুতো প্ৰতিভাশালী শিক্ষাৰ্থীৰ সৰ্বোত্তম অধ্যয়ন সমল, সঠিক শৈক্ষিক নিৰ্দেশনা, প্ৰণালীবদ্ধ শিক্ষণ ব্যৱস্থা আৰু সুলভ শৈক্ষিক সহায়ৰ অভাৱ আছিল। যাৰ ফলত, তেওঁলোকৰ সম্ভাৱনীয়তা কেৱল সুযোগৰ অভাৱৰ বাবেই আৱদ্ধ হৈ পৰিছিল।",
    storyDesc3: isEn
      ? "Recognizing this gap, Julfikar Rahman Zinnah launched the LearnWithJulfy Platinum Ranker initiative to create a comprehensive, bilingual, student-centered learning ecosystem designed specifically for Class 12 learners."
      : "এই শৈক্ষিক ব্যৱধান অনুভৱ কৰি, জুলফিকৰ ৰহমান জিন্নাহে দ্বাদশ শ্ৰেণীৰ শিক্ষাৰ্থীসকলৰ বাবে এক সামগ্ৰিক, দ্বিভাষিক আৰু শিক্ষাৰ্থী-কেন্দ্ৰিক শিক্ষণ ব্যৱস্থা গঢ়ি তুলিবলৈ LearnWithJulfy Platinum Ranker নামৰ পদক্ষেপটো আৰম্ভ কৰিছিল।",
    storyDesc4: isEn
      ? "More than a collection of notes, LearnWithJulfy is built around the principles of:"
      : "কেৱলমাত্ৰ নোটৰ সংগ্ৰহতকৈ অধিক, LearnWithJulfy তলৰ নীতিসমূহৰ ওপৰত নিৰ্মিত:",
    storyPrinciples: [
      { icon: "📘", title: isEn ? "Clear and Structured Learning" : "স্পষ্ট আৰু প্ৰণালীবদ্ধ শিক্ষণ" },
      { icon: "🧠", title: isEn ? "Deep Understanding and Concept Building" : "গভীৰ বুজাবুজি আৰু ধাৰণা গঠন" },
      { icon: "🎯", title: isEn ? "Sustained Attention and Interest Development" : "ধাৰাবাহিক মনোযোগ আৰু আগ্ৰহৰ বিকাশ" },
      { icon: "📈", title: isEn ? "Self-Study Progress Tracking" : "স্ব-অধ্যয়নৰ অগ্ৰগতি নিৰীক্ষণ" },
      { icon: "🏆", title: isEn ? "Examination Excellence" : "পৰীক্ষাত উৎকৃষ্টতা অৰ্জন" },
      { icon: "🌍", title: isEn ? "Equal Educational Opportunity" : "শিক্ষাৰ সমান সুযোগ লাভ" }
    ],
    storyDesc5: isEn
      ? "The mission extends beyond helping students pass examinations. It aims to empower learners to become confident thinkers, independent learners, responsible citizens, and contributors to society."
      : "এই যাত্ৰা কেৱল পৰীক্ষাত উত্তীৰ্ণ হোৱাত সহায় কৰাতেই সীমাবদ্ধ নহয়। ইয়াৰ লক্ষ্য হৈছে শিক্ষাৰ্থীসকলক আত্মবিশ্বাসী চিন্তাবিদ, স্বতন্ত্ৰ শিক্ষাৰ্থী, দায়িত্বশীল নাগৰিক আৰু সমাজৰ এজন অৱদানকাৰী হিعাপে গঢ়ি তোলা।",
    storyDesc6: isEn
      ? "Today, LearnWithJulfy continues its commitment to reaching students from every corner of Assam—especially those facing economic hardship, limited educational resources, or a lack of academic guidance. Through structured notes, assessment systems, revision frameworks, and technology-driven learning tools, the platform seeks to make high-quality education accessible to all."
      : "আজি, LearnWithJulfy এ অসমৰ প্ৰতিটো কোণৰ শিক্ষাৰ্থীৰ ওচৰলৈ যোৱাৰ প্ৰতিশ্ৰুতি অব্যাহত ৰাখিছে—বিশেষকৈ যিসকলে আৰ্থিক কষ্ট, সীমিত শৈক্ষিক সম্পদ বা শৈক্ষিক নিৰ্দেশনাৰ অভাৱৰ সন্মুখীন হৈছে। প্ৰণালীবদ্ধ টোকা, মূল্যায়ন ব্যৱস্থা, পুনৰীক্ষণ পৰিকল্পনা আৰু প্ৰযুক্তি-নিৰ্ভৰ সঁজুলিৰ জৰিয়তে এই প্লেটফৰ্মে উচ্চ মানদণ্ডৰ শিক্ষা সকলোৰে বাবে সহজলভ্য কৰিবলৈ যত্ন কৰে।",
    storyQuote: isEn
      ? "Talent exists everywhere. Opportunity does not. LearnWithJulfy exists to bridge that gap."
      : "প্ৰতিভা সকলোতে আছে। সুযোগ নাই। সেই ব্যৱধান দূৰ কৰিবলৈকে LearnWithJulfy ৰ সৃষ্টি হৈছে।",

    // Commitment
    commitmentTitle: isEn ? "Our Commitment" : "আমাৰ প্ৰতিশ্ৰুতি",
    commitmentDesc: isEn
      ? "We believe education is not merely preparation for examinations—it is preparation for life."
      : "আমি বিশ্বাস কৰোঁ যে শিক্ষা কেৱল পৰীক্ষাৰ প্ৰস্তুতি নহয়—ই হৈছে জীৱনৰ বাবে প্ৰস্তুতি।",
    commitmentItems: [
      isEn ? "Support students from economically disadvantaged backgrounds." : "আৰ্থিকভাৱে পিছপৰা শিক্ষাৰ্থীসকলক সহায় কৰা।",
      isEn ? "Reduce educational inequality." : "শৈক্ষিক বৈষম্য হ্ৰাস কৰা।",
      isEn ? "Promote self-learning and independent thinking." : "স্ব-শিক্ষণ আৰু স্বতন্ত্ৰ চিন্তাক উৎসাহিত কৰা।",
      isEn ? "Encourage academic confidence and personal growth." : "শৈক্ষিক আত্মবিশ্বাস আৰু ব্যক্তিগত বিকাশ বৃদ্ধি কৰা।",
      isEn ? "Use technology to make learning accessible to everyone." : "সকলোৰে বাবে শিক্ষাক সহজলভ্য কৰিবলৈ প্ৰযুক্তিৰ ব্যৱহাৰ কৰা।",
      isEn ? "Contribute positively to Assam, India, and future generations." : "অসম, ভাৰত আৰু ভৱিষ্যৎ প্ৰজন্মলৈ যোগাত্মক অৱদান আগবঢ়োৱা।"
    ],
    commitmentFootnote: isEn
      ? "When one student succeeds, a family progresses. When thousands succeed, society transforms."
      : "যেতিয়া এজন শিক্ষাৰ্থী সফল হয়, এটা পৰিয়াল অগ্ৰসৰ হয়। যেতিয়া হাজাৰ হাজাৰ শিক্ষাৰ্থী সফল হয়, সমাজৰ পৰিৱৰ্তন ঘটে।",
    commitmentBadge: isEn
      ? "LearnWithJulfy — Learning Without Barriers. Excellence Without Limits."
      : "LearnWithJulfy — বাধা অবিহনে শিক্ষণ। সীমা অবিহনে উৎকৃষ্টতা।"
  };

  const stats = [
    { label: isEn ? "Active Students" : "সক্ৰিয় ছাত্ৰ-ছাত্ৰী", value: isEn ? "10K+" : "১০,০০০+", icon: Users },
    { label: isEn ? "Platinum Rankers" : "প্লেটিনাম ৰেংকাৰ", value: isEn ? "25+" : "২৫+", icon: Award },
    { label: isEn ? "Daily Study Plan" : "দৈনিক যাত্ৰা", value: isEn ? "20 Days" : "২০ দিনীয়া", icon: BookOpen },
    { label: isEn ? "Syllabus Units" : "পাঠ্যক্ৰমৰ অধ্যায়", value: isEn ? "7 Units" : "৭ টা অধ্যায়", icon: GraduationCap },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      
      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
          {isEn ? "ABOUT PLATINUM" : "প্লেটিনামৰ বিষয়ে"}
        </span>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          {content.header}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {content.sub}
        </p>
      </section>

      {/* Grid: Author Bio & Profile Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Bio Text */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-heading text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {content.meetAuthor}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            {content.authorBio1}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            {content.authorBio2}
          </p>
          <div className="border-l-4 border-indigo-500 pl-4 py-2 italic text-sm text-foreground/80 bg-muted/30 rounded-r-lg font-sans">
            &ldquo;{isEn ? "Talent exists everywhere. Opportunity does not. LearnWithJulfy exists to bridge that gap." : "প্ৰতিভা সকলোতে আছে। সুযোগ নাই। সেই ব্যৱধান দূৰ কৰিবলৈকে LearnWithJulfy ৰ সৃষ্টি হৈছে।"}&rdquo;
          </div>
        </div>

        {/* Premium Profile Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-md relative overflow-hidden text-center space-y-6">
            
            {/* Design accents */}
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
            <div className="absolute left-0 bottom-0 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />

            {/* Profile Avatar */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-3xl font-extrabold shadow-md">
              JZ
            </div>
            
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-bold text-foreground">
                {content.authorName}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                {content.authorRole}
              </p>
              <p className="text-xs text-muted-foreground">Guwahati, Assam</p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">
                {isEn ? "Syllabus Architect" : "পাঠ্যক্ৰম স্থপতি"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">
                {isEn ? "AHSEC Specialist" : "AHSEC বিশেষজ্ঞ"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">
                {isEn ? "Statistics Coach" : "পৰিসংখ্যা প্ৰশিক্ষক"}
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* Impact Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-indigo-500/10 transition-colors text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-heading text-2xl font-black text-foreground">
                {stat.value}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-1">
                {stat.label}
              </span>
            </div>
          );
        })}
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            {content.missionTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans">
            {content.missionDesc}
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-border bg-card space-y-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground">
            {content.visionTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans">
            {content.visionDesc}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-6">
        <h3 className="font-heading text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-500" />
          {content.storyTitle}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
          {content.storyDesc1}
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
          {content.storyDesc2}
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
          {content.storyDesc3}
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="font-heading text-base font-bold text-foreground">
            {content.storyDesc4}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.storyPrinciples.map((pr, i) => (
              <div key={i} className="flex items-center gap-2 bg-card p-3 rounded-xl border border-border shadow-sm text-xs font-semibold text-foreground">
                <span className="text-lg">{pr.icon}</span>
                <span>{pr.title}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
          {content.storyDesc5}
        </p>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
          {content.storyDesc6}
        </p>
      </section>

      {/* Commitment Section */}
      <section className="p-8 rounded-3xl bg-purple-500/5 border border-purple-500/10 space-y-6">
        <h3 className="font-heading text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
          <Heart className="h-6 w-6 text-purple-500" />
          {content.commitmentTitle}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans font-semibold">
          {content.commitmentDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.commitmentItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-muted-foreground">
              <span className="text-purple-500 font-bold mt-0.5">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-purple-500/10 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm font-bold text-foreground max-w-lg">
            {content.commitmentFootnote}
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3.5 py-2.5 rounded-full shrink-0">
            {content.commitmentBadge}
          </span>
        </div>
      </section>

    </div>
  );
}
