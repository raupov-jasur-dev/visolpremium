/** VisolPremium shablon tizimining asosiy tiplari. */

export type CategoryId =
  | "toy"
  | "taklifnoma"
  | "tabriknoma"
  | "uchrashuv"
  | "video-tabrik"
  | "video-taklif"
  | "tugilgan-kun";

export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "time"
  | "image"
  | "images"
  | "video"
  | "music"
  | "map"
  | "phone"
  | "url"
  | "number"
  | "select"
  | "boolean";

export type SectionId =
  | "cover"
  | "names"
  | "verse"
  | "datetime"
  | "photo"
  | "event"
  | "parents"
  | "gallery"
  | "location"
  | "rsvp"
  | "countdown"
  | "footer"
  | "message"
  | "video-sequence"
  | "host"
  | "age";

export type VisualStyle =
  | "floral"
  | "cinematic"
  | "silk"
  | "watercolor"
  | "garden"
  | "ornament"
  | "damask"
  | "video";

export type TemplateField = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  max?: number;
};

export type TemplateTheme = {
  style: VisualStyle;
  paper: string;
  ink: string;
  muted: string;
  accent: string;
  gold: string;
  overlay: string;
};

export type InvitationValue = string | string[] | boolean | number;

export type InvitationData = Record<string, InvitationValue>;

export type InvitationTemplate = {
  id: string;
  category: CategoryId;
  title: string;
  tagline: string;
  price: number;
  previewImage: string;
  background: string;
  gallery: string[];
  fonts: { display: string; body: string; script: string };
  fields: TemplateField[];
  sections: SectionId[];
  theme: TemplateTheme;
  animations: string[];
  isVideo: boolean;
  demo: InvitationData;
};

export type SavedInvitation = {
  id: string;
  slug: string;
  userId: string;
  templateId: string;
  title: string;
  data: InvitationData;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RsvpRow = {
  id: string;
  invitationId: string;
  guestName: string;
  attending: boolean;
  guestsCount: number;
  message: string | null;
  createdAt: string;
};
