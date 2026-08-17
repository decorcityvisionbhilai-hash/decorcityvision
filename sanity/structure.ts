import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["siteSettings", "hero", "budgetSettings"];

// Pins the singletons (Site Settings, Hero, Budget Slider Settings) as single
// editable documents at the top of the desk instead of list views, and groups
// everything else below in the order content editors will actually use it.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Hero")
        .id("hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("Budget Slider Settings")
        .id("budgetSettings")
        .child(S.document().schemaType("budgetSettings").documentId("budgetSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? "")),
    ]);
