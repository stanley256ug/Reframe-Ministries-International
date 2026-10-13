export interface LiveBroadcast {
  id: string;
  isLive: boolean;
  title: string;
  theme: string;
  speaker: string;
  speakerRole: string;
  serviceType: string;
  dateTime: string;
  viewerCount: number;
  videoUrl: string; // YouTube embed or direct stream
  audioStreamUrl: string;
  scriptureAnchor: string;
  keyPoints: string[];
  bannerUrl: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  location: string;
  message: string;
  timestamp: string;
  isHost?: boolean;
  isPastor?: boolean;
  avatarColor?: string;
  reactions?: { [key: string]: number };
}

export interface SermonNote {
  id: string;
  sermonTitle: string;
  speaker: string;
  date: string;
  content: string;
  scriptureReferences: string[];
  savedAt: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  location?: string;
  category: 'Healing' | 'Breakthrough' | 'Family' | 'Deliverance' | 'Finances' | 'Thanksgiving' | 'Spiritual Growth';
  request: string;
  isConfidential: boolean; // if false, displayed on prayer wall
  submittedAt: string;
  prayCount: number;
  hasPrayed?: boolean;
  pastorNoted?: boolean;
}

export interface SocialMediaPost {
  id: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  title: string;
  handle: string;
  embedSnippet?: string;
  url: string;
  thumbnail: string;
  likes: string;
  views?: string;
  comments?: string;
  date: string;
  caption: string;
  category: string;
}

export interface SermonArchiveItem {
  id: string;
  title: string;
  series: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  duration: string;
  scripture: string;
  category: string;
  videoUrl: string;
  audioUrl?: string;
  thumbnail: string;
  summary: string;
  keyTakeaways: string[];
  views: number;
}

export interface DevotionalItem {
  id: string;
  date: string;
  title: string;
  theme: string;
  scriptureReference: string;
  scriptureText: string;
  reflection: string[];
  faithConfession: string;
  prayer: string;
  author: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  speaker: string;
  category: string;
  description: string;
  isFeatured?: boolean;
  bannerImage: string;
}

export interface MinistryDepartment {
  id: string;
  name: string;
  tagline: string;
  leader: string;
  description: string;
  meetingDay: string;
  contact: string;
  image: string;
}

export interface GivingOption {
  id: string;
  title: string;
  description: string;
  category: 'Tithe' | 'Offering' | 'Building Project' | 'Missions & Charity' | 'Love Offering';
  targetGoalUgx?: number;
  currentRaisedUgx?: number;
}
