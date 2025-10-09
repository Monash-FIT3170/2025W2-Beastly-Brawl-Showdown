import { WikiAbilitiesPage } from "../pages/Wiki/WikiAbilitiesPage";
import { WikiArchetypesPage } from "../pages/Wiki/WikiArchetypesPage";

const VALID_WIKI_PAGES = [
    "howtoplay", 
    "monsters", 
    "archetypes", 
    "abilities",
    "statuseffects"
] as const;

export type WikiPageIdentifier = typeof VALID_WIKI_PAGES[number];

export const wikitopage = [
    {name: "abilities", page: WikiAbilitiesPage()},
    {name: "archetypes", page: WikiArchetypesPage()}
]

export default VALID_WIKI_PAGES;