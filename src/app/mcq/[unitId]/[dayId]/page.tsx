import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import MCQDayClient from "@/components/MCQDayClient";

interface PageProps {
  params: {
    unitId: string;
    dayId: string;
  };
}

const unitMap: Record<string, { numberKey: string; enTitle: string; asTitle: string }> = {
  "unit1": { numberKey: "1", enTitle: "Development of Secondary Education in India and Assam", asTitle: "ভাৰত আৰু অসমৰ মাধ্যমিক শিক্ষাৰ বিকাশ" },
  "unit2": { numberKey: "2", enTitle: "Non-formal Education & Media of Education", asTitle: "অনানুষ্ঠানিক শিক্ষা আৰু শিক্ষাৰ মাধ্যমসমূহ" },
  "unit3": { numberKey: "3", enTitle: "Current Trends in Education", asTitle: "শিক্ষাৰ সাম্প্ৰতিক ধাৰাসমূহ" },
  "unit4": { numberKey: "4", enTitle: "Learning", asTitle: "শিকন" },
  "unit5": { numberKey: "5", enTitle: "Memory & Attention", asTitle: "স্মৃতিশক্তি আৰু মনোযোগ" },
  "unit6": { numberKey: "6", enTitle: "Mental Health & Hygiene", asTitle: "মানসিক স্বাস্থ্য আৰু বিজ্ঞান" },
  "unit7": { numberKey: "7", enTitle: "Educational Statistics", asTitle: "শৈক্ষিক পৰিসংখ্যা" },
};

// Generate static params for all 140 days to enable static generation at build time
export async function generateStaticParams() {
  const params = [];
  for (let u = 1; u <= 7; u++) {
    for (let d = 1; d <= 20; d++) {
      params.push({
        unitId: `unit${u}`,
        dayId: `day${d}`,
      });
    }
  }
  return params;
}

// Read and parse dynamic day JSON content
function getDayContentData(unitId: string, dayId: string) {
  try {
    const filePath = path.join(process.cwd(), "content", unitId, `${dayId}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Error reading day content file:", e);
    return null;
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps) {
  const { unitId, dayId } = params;
  const content = getDayContentData(unitId, dayId);
  const unitInfo = unitMap[unitId];
  
  if (!content || !unitInfo) {
    return {
      title: "MCQs Not Found | LearnWithJulfy",
      description: "The requested education MCQ set was not found."
    };
  }

  const dayNumber = parseInt(dayId.replace("day", ""), 10);
  const title = `Class 12 Education AHSEC Unit ${unitInfo.numberKey} Day ${dayNumber} MCQ Practice | LearnWithJulfy`;
  const description = `Practice bilingual multiple-choice questions for ${content.english.title} (${content.assamese.title}) with explanation sheets. Test your score for Class 12 board preparations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    }
  };
}

export default function MCQDayPage({ params }: PageProps) {
  const { unitId, dayId } = params;
  const unitInfo = unitMap[unitId];
  const dayMatch = dayId.match(/^day(\d+)$/);
  const dayNumber = dayMatch ? parseInt(dayMatch[1], 10) : null;

  if (!unitInfo || !dayNumber || dayNumber < 1 || dayNumber > 20) {
    notFound();
  }

  const dayContent = getDayContentData(unitId, dayId);
  if (!dayContent || !dayContent.mcqs || !dayContent.asMcqs) {
    notFound();
  }

  return (
    <MCQDayClient
      enMcqs={dayContent.mcqs}
      asMcqs={dayContent.asMcqs}
      unitId={unitId}
      dayId={dayId}
      dayNumber={dayNumber}
      unitNumberKey={unitInfo.numberKey}
      unitTitleEn={unitInfo.enTitle}
      unitTitleAs={unitInfo.asTitle}
    />
  );
}
