export interface Section {
  id: string;
  title: string;
  links: Link[];
}

export interface Link {
  link: string;
}

export interface FooterAPI {
  sections: Section[];
}

export interface FooterProps {
  footerAPI: FooterAPI;
}
