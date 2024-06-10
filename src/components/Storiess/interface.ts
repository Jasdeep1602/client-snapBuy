export interface NewsItem {
  title: string;
  text: string;
  img: string;
  url: string;
  like: string;
  time: string;
  by: string;
  btn: string;
}

export interface Story {
  title: string;
  news: NewsItem[];
}

export interface StoryProps {
  story: Story;
}
