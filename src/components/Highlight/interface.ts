export interface HighlightAPI {
  heading: string;
  title: string;
  text: string;
  btn: string;
  url: string;
  img: string;
}

export interface HighlightProps {
  highlightAPI: HighlightAPI;
  ifExists?: boolean; // Optional prop
}
