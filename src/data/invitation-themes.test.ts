import { describe, expect, it } from "vitest";
import { invitationCategories, invitationThemes, filterInvitationThemes, findInvitationTheme } from "./invitation-themes";

describe("invitation categories", () => {
  it("numbers themes NEMPO 01 onward and preserves codes when filtered", () => {
    expect(invitationThemes.map((theme) => theme.code)).toEqual(Array.from({ length: 16 }, (_, index) => `NEMPO ${String(index + 1).padStart(2, "0")}`));
    expect(filterInvitationThemes("vintage-photo").map((theme) => theme.code)).toEqual(["NEMPO 03", "NEMPO 07"]);
  });
  it("offers all eight requested photo and no-photo categories", () => {
    expect(invitationCategories.map((category) => category.name)).toEqual([
      "Spesial Foto", "Spesial Tanpa Foto", "Minimalist Luxury Foto", "Minimalist Luxury Tanpa Foto",
      "Premium Vintage Foto", "Premium Vintage Tanpa Foto", "Adat Foto", "Adat Tanpa Foto",
    ]);
  });
  it("has two available themes in every category", () => {
    for (const category of invitationCategories) {
      const themes = filterInvitationThemes(category.key);
      expect(themes).toHaveLength(2);
      expect(themes.every((theme) => theme.category === category.key)).toBe(true);
    }
    expect(filterInvitationThemes("all")).toHaveLength(16);
  });
  it("omits photos in every no-photo theme and preserves resolvable demo slugs", () => {
    expect(new Set(invitationThemes.map((theme) => theme.slug)).size).toBe(16);
    for (const theme of invitationThemes) {
      expect(theme.withPhoto).toBe(!theme.category.endsWith("no-photo"));
      expect(findInvitationTheme(theme.slug)).toEqual(theme);
    }
  });
});