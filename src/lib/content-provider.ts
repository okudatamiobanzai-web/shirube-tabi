import fs from "fs";
import path from "path";
import { EXPERIENCES, PEOPLE, STAYS, FOODS, ITEMS_DATA, COURSES } from "@/data";

export interface ContentData {
  experiences: any[];
  people: any[];
  stays: any[];
  food: any[];
  items: any[];
  courses: any[];
  reviews: any[];
  faq: any[];
  settings: {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
  };
}

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

function readContentFile(): ContentData | null {
  try {
    if (fs.existsSync(CONTENT_PATH)) {
      const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
      return JSON.parse(raw) as ContentData;
    }
  } catch {
    // fall through
  }
  return null;
}

function getStaticFallback(): ContentData {
  return {
    experiences: EXPERIENCES as any[],
    people: PEOPLE as any[],
    stays: STAYS as any[],
    food: FOODS as any[],
    items: ITEMS_DATA as any[],
    courses: COURSES as any[],
    reviews: [],
    faq: [],
    settings: {
      heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
      heroTitle: "しるべ旅",
      heroSubtitle: "道東の旅をまるごと手配",
    },
  };
}

export function getContent(): ContentData {
  return readContentFile() || getStaticFallback();
}

export function getExperiences() {
  return getContent().experiences;
}

export function getPeople() {
  return getContent().people;
}

export function getStays() {
  return getContent().stays;
}

export function getFood() {
  return getContent().food;
}

export function getItems() {
  return getContent().items;
}

export function getCourses() {
  return getContent().courses;
}

export function getReviews() {
  return getContent().reviews;
}

export function getFAQ() {
  return getContent().faq;
}

export function getSettings() {
  return getContent().settings;
}

export function writeContent(data: ContentData): void {
  const dir = path.dirname(CONTENT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}
