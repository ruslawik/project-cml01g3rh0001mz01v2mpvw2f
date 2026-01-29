export interface Story {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  pages: StoryPage[];
}

export interface StoryPage {
  id: number;
  text: string;
  image?: string;
}

export interface RootStackParamList {
  Home: undefined;
  Story: { storyId: number };
  Congratulations: { storyTitle: string };
}