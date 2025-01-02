import { removeAccentsAndSpecialChars } from "./remove-accents-and-special-chars";

export function mapSectionsToPages(
  sectionsByCategory: ProductSectionsByCategory
): PageData[] {
  const pages = Object.entries(sectionsByCategory).map(([title, sections]) => ({
    id: removeAccentsAndSpecialChars(title),
    title,
    sections,
  }));
  return pages;
}
