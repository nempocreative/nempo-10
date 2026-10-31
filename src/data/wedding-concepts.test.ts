import { describe, expect, it } from "vitest";
import { weddingMoodConsultUrl, weddingTones } from "./wedding-concepts";

describe("wedding concept consultation", () => {
  it("gives every tone the colors used to tint the decor and kebaya preview", () => {
    expect(weddingTones).toHaveLength(4);
    for (const tone of weddingTones) {
      expect(tone.deep).toMatch(/^#[0-9a-f]{6}$/);
      expect(tone.light).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("sends the chosen wedding details to the official WhatsApp number", () => {
    const url = new URL(weddingMoodConsultUrl({ decor: "Sunda Classic", kebaya: "Dusty Rose", tone: "Sky & Pearl", concept: "Modern Elegance" }));
    expect(url.origin + url.pathname).toBe("https://wa.me/6285724981356");
    const text = url.searchParams.get("text");
    expect(text).toContain("Dekor pelaminan: Sunda Classic");
    expect(text).toContain("Kebaya: Dusty Rose");
    expect(text).toContain("Tone warna: Sky & Pearl");
    expect(text).toContain("Konsep acara: Modern Elegance");
  });
});