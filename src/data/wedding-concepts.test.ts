import { describe, expect, it } from "vitest";
import { weddingMoodConsultUrl } from "./wedding-concepts";

describe("wedding concept consultation", () => {
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