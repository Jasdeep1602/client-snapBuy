export interface Title {
  title: string;
}

export interface Link {
  link: string;
}

export interface FooterAPI {
  titles: Title[];
  links: Link[][];
}

export interface FooterProps {
  footerAPI: FooterAPI;
}
