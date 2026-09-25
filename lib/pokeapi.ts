import { PokemonSummary, PokemonDetail, PokemonType, PokemonStat, PokemonAbility, PokemonMove } from "./types";

const API_URL = "https://pokeapi.co/api/v2";

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

export function formatPokemonName(name: string): string {
  return capitalize(name);
}

export function formatId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

export function formatHeight(decimetres: number): string {
  const meters = (decimetres / 10).toFixed(1);
  const totalInches = decimetres * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${meters} m (${feet}'${inches.toString().padStart(2, "0")}")`;
}

export function formatWeight(hectograms: number): string {
  const kg = (hectograms / 10).toFixed(1);
  const lbs = (hectograms * 0.220462).toFixed(1);
  return `${kg} kg (${lbs} lbs)`;
}

export function normalizeType(typeStr: string): PokemonType {
  const capitalized = capitalize(typeStr) as PokemonType;
  return capitalized;
}

export async function getPokemonList(limit = 60, offset = 0): Promise<PokemonSummary[]> {
  try {
    const res = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`Failed to fetch pokemon list: ${res.statusText}`);
    const data = await res.json();

    const pokemonPromises = data.results.map(async (item: { name: string; url: string }) => {
      try {
        const detailRes = await fetch(item.url, { next: { revalidate: 86400 } });
        if (!detailRes.ok) return null;
        const p = await detailRes.json();

        const hpStat = p.stats.find((s: any) => s.stat.name === "hp")?.base_stat ?? 50;
        const attackStat = p.stats.find((s: any) => s.stat.name === "attack")?.base_stat ?? 50;
        const defenseStat = p.stats.find((s: any) => s.stat.name === "defense")?.base_stat ?? 50;
        const speedStat = p.stats.find((s: any) => s.stat.name === "speed")?.base_stat ?? 50;

        const summary: PokemonSummary = {
          id: p.id,
          name: formatPokemonName(p.name),
          types: p.types.map((t: any) => normalizeType(t.type.name)),
          height: formatHeight(p.height),
          weight: formatWeight(p.weight),
          artwork:
            p.sprites.other?.["official-artwork"]?.front_default ||
            p.sprites.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
          hp: hpStat,
          attack: attackStat,
          defense: defenseStat,
          speed: speedStat,
        };
        return summary;
      } catch (err) {
        console.error(`Error fetching detail for ${item.name}`, err);
        return null;
      }
    });

    const summaries = await Promise.all(pokemonPromises);
    return summaries.filter((p): p is PokemonSummary => p !== null);
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function getPokemonDetail(idOrName: string | number): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`${API_URL}/pokemon/${idOrName.toString().toLowerCase()}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;
    const p = await res.json();

    let description = "A mysterious and intriguing Pokémon discovered in the wild.";
    let category = "Pokémon";

    try {
      const speciesRes = await fetch(p.species.url, { next: { revalidate: 86400 } });
      if (speciesRes.ok) {
        const speciesData = await speciesRes.json();

        const genusEntry = speciesData.genera?.find((g: any) => g.language.name === "en");
        if (genusEntry) {
          category = genusEntry.genus;
        }

        const flavorEntry = speciesData.flavor_text_entries?.find(
          (f: any) => f.language.name === "en"
        );
        if (flavorEntry) {
          description = flavorEntry.flavor_text
            .replace(/\f/g, "\n")
            .replace(/\u00ad\n/g, "")
            .replace(/\u00ad/g, "")
            .replace(/ -\n/g, " - ")
            .replace(/-\n/g, "-")
            .replace(/\n/g, " ");
        }
      }
    } catch (err) {
      console.warn("Species data fetch failed", err);
    }

    const stats: PokemonStat[] = p.stats.map((s: any) => {
      let statName = s.stat.name;
      if (statName === "special-attack") statName = "Sp. Atk";
      else if (statName === "special-defense") statName = "Sp. Def";
      else statName = capitalize(statName);

      return {
        name: statName,
        value: s.base_stat,
      };
    });

    const abilities: PokemonAbility[] = p.abilities.map((a: any) => ({
      name: capitalize(a.ability.name),
      isHidden: a.is_hidden,
    }));

    const moves: PokemonMove[] = p.moves.slice(0, 40).map((m: any) => ({
      name: capitalize(m.move.name),
      levelLearnedAt: m.version_group_details?.[0]?.level_learned_at || 0,
      learnMethod: m.version_group_details?.[0]?.move_learn_method?.name || "level-up",
    }));

    return {
      id: p.id,
      name: formatPokemonName(p.name),
      types: p.types.map((t: any) => normalizeType(t.type.name)),
      height: formatHeight(p.height),
      weight: formatWeight(p.weight),
      category,
      description,
      baseExperience: p.base_experience || 0,
      artwork:
        p.sprites.other?.["official-artwork"]?.front_default ||
        p.sprites.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
      shinyArtwork:
        p.sprites.other?.["official-artwork"]?.front_shiny ||
        p.sprites.front_shiny ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${p.id}.png`,
      stats,
      abilities,
      moves,
    };
  } catch (error) {
    console.error(`Error fetching detail for pokemon ${idOrName}:`, error);
    return null;
  }
}
