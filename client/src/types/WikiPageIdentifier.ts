const VALID_WIKI_PAGES = ["howtoplay", "monsters", "archetypes", "abilities"] as const;
export type WikiPageIdentifier = typeof VALID_WIKI_PAGES[number];

export default VALID_WIKI_PAGES;