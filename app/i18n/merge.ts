import { organStructures, type HotspotStructure, type OrganId, type OrganStructure } from "../lib/anatomy-data";
import type { OrganContent, OrganContentDictionary } from "./types";

/** Structure joined with the active locale's prose. Components consume this
 *  shape, so they never need to know a translation layer exists. */
export type Hotspot = HotspotStructure & { label: string; detail: string };
export type Organ = Omit<OrganStructure, "hotspots"> & Omit<OrganContent, "hotspots"> & { hotspots: Hotspot[] };

import { extraOrgans } from "../lib/organs-extra";

const extraOrganMap = new Map(extraOrgans.map((o) => [o.id, o]));

export function buildOrgans(content: OrganContentDictionary): Organ[] {
  return organStructures.map((structure) => {
    const prose = content[structure.id];
    const extra = extraOrganMap.get(structure.id);

    return {
      ...structure,
      name: prose?.name ?? extra?.name ?? structure.id,
      system: prose?.system ?? extra?.system ?? "Human Body",
      description: prose?.description ?? extra?.description ?? "",
      poetic: prose?.poetic ?? extra?.poetic ?? "",
      size: prose?.size ?? extra?.size ?? "",
      weight: prose?.weight ?? extra?.weight ?? "",
      location: prose?.location ?? extra?.location ?? "",
      function: prose?.function ?? extra?.function ?? "",
      dailyFact: prose?.dailyFact ?? extra?.dailyFact ?? "",
      medical: prose?.medical ?? extra?.medical ?? "",
      bloodSupply: prose?.bloodSupply ?? extra?.bloodSupply ?? "",
      funFact: prose?.funFact ?? extra?.funFact ?? "",
      tissue: prose?.tissue ?? extra?.tissue ?? "",
      comparison: prose?.comparison ?? extra?.comparison ?? "",
      conditions: prose?.conditions ?? extra?.conditions ?? [],
      hotspots: structure.hotspots.map((hotspot) => {
        const extraHotspot = extra?.hotspots?.find((h) => h.id === hotspot.id);
        return {
          ...hotspot,
          // Fall back to the translated hotspot, then extra hotspot label, then the Latin term
          label: prose?.hotspots?.[hotspot.id]?.label ?? extraHotspot?.label ?? hotspot.ta,
          detail: prose?.hotspots?.[hotspot.id]?.detail ?? extraHotspot?.detail ?? "",
        };
      }),
    };
  });
}

export function indexOrgans(organs: Organ[]): Record<OrganId, Organ> {
  return Object.fromEntries(organs.map((organ) => [organ.id, organ])) as Record<OrganId, Organ>;
}
