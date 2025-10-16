import { title } from "process";
import { WikiAbilitiesPage } from "../pages/Wiki/WikiAbilitiesPage";
import { WikiArchetypesPage } from "../pages/Wiki/WikiArchetypesPage";
import { WikiMonstersPage } from "../pages/Wiki/WikiMonstersPage";

const VALID_WIKI_PAGES = [
    "howtoplay", 
    "monsters", 
    "archetypes", 
    "abilities",
    "statuseffects"
] as const;

export type WikiPageIdentifier = typeof VALID_WIKI_PAGES[number];

export const wikitopage = [
    {name: "abilities", page: WikiAbilitiesPage(), title: "Abilities"},
    {name: "archetypes", page: WikiArchetypesPage(), title: "Archetypes"},
    {name: "monsters", page: WikiMonstersPage(), title: "Monsters"},
]

export default VALID_WIKI_PAGES;