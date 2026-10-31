import { describe, expect, it } from "vitest";
import { weddingDecor, weddingKebaya, weddingMoodConsultUrl, weddingTones } from "./wedding-concepts";

describe("wedding concept studio", () => {
  it("shows four tones, each with swatch colors", () => {
    expect(weddingTones).toHaveLength(4);
    for (const tone of weddingTones) {
      expect(tone.hexes.length).toBeGreaterThan(2);
      for (const hex of tone.hexes) {
        expect(hex).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("has a real photo for every decor and kebaya in every tone", () => {
    expect(weddingDecor).toHaveLength(4);
    expect(weddingKebaya).toHaveLength(3);
    for (const option of [...weddingDecor, ...weddingKebaya]) {
      for (const tone of weddingTones) {
        expect(option.images[tone.key]).toMatch(/wedding-(decor|kebaya)-.*\.jpg/);
      }
    }
  });

  it("sends the chosen combination to the official WhatsApp number", () => {
    const tone = weddingTones[2]!;
    const decor = weddingDecor[1]!;
    const kebaya = weddingKebaya[1]!;
    const url = new URL(weddingMoodConsultUrl({ tone, decor, kebaya }));
    expect(url.origin + url.pathname).toBe("https://wa.me/6285724981356");
    const text = url.searchParams.get("text") ?? "";
    expect(text).toContain(`Tone warna: ${tone.name}`);
    expect(text).toContain(`Pelaminan/dekor: ${decor.name}`);
    expect(text).toContain(`Kebaya: ${kebaya.name}`);
  });
});
