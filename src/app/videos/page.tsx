import { Metadata } from "next";
import VideosClient from "@/components/VideosClient";

export const metadata: Metadata = {
  title: "Class 12 Education Video Classes | LearnWithJulfy Platinum",
  description: "Watch structured, chapter-wise Class 12 (AHSEC) Education video classes. Learn concepts, board preparation guides, and calculations visually.",
};

export default function VideosPage() {
  return <VideosClient />;
}
