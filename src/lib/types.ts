export interface Area {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  airport: string;
  lat?: number;
  lng?: number;
}

export interface BaseItem {
  id: string;
  layer: string;
  name: string;
  area: string;
  areaId?: string;
  photo: string;
  gallery?: string[];
  desc: string;
  price?: string;
  videoId?: string | null;
  tags?: string[];
  lat?: number;
  lng?: number;
  address?: string;
}

export interface Experience extends BaseItem {
  layer: "experience";
  person?: string;
  cat: string;
  seasons: string[];
  duration: string;
}

export interface SNSLink {
  type: "instagram" | "twitter" | "facebook" | "youtube" | "website";
  url: string;
  label?: string;
}

export interface Person extends BaseItem {
  layer: "person";
  specialty: string;
  message: string;
  sns?: SNSLink[];
}

export interface Stay extends BaseItem {
  layer: "stay";
  type: string;
}

export interface Food extends BaseItem {
  layer: "food";
}

export interface Item extends BaseItem {
  layer: "item";
}

export type AnyItem = Experience | Person | Stay | Food | Item;

export interface CourseDay {
  day: number;
  items: string[];
}

export interface Course {
  id: string;
  title: string;
  sub: string;
  photo: string;
  gallery?: string[];
  days: CourseDay[];
  price: string;
  note: string;
  ids: string[];
}

export interface DistLine {
  from: string;
  to: string;
  t: string;
}
