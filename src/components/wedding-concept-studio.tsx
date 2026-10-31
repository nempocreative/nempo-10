import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/lib/wouter";
import {
  weddingDecor,
  weddingKebaya,
  weddingMoodConsultUrl,
  weddingTones,
  type ToneKey,
  type WeddingOption,
  type WeddingOutfit,
  type WeddingTone,
} from "@/data/wedding-concepts";
import { NEMPO_INSTAGRAM_HANDLE, NEMPO_WA_NUMBER } from "@/lib/contact";
import { deliverFile } from "@/lib/download";
import { moodboardFilename, renderMoodboardCard } from "@/lib/moodboard-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Swatch({ tone, size = "sm" }: { tone: WeddingTone; size?: "sm" | "md" }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {tone.hexes.map((hex) => (
        <span
          key={hex}
          className={cn(
            "rounded-full border border-foreground/10",
            size === "sm" ? "h-3 w-3" : "h-4 w-4",
          )}
          style={{ backgroundColor: hex }}
        />
      ))}
    </span>
  );
}

function OptionChip({
  option,
  tone,
  active,
  onSelect,
}: {
  option: WeddingOption;
  tone: ToneKey;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background/70 text-foreground/80 hover:border-primary/50 hover:text-primary",
      )}
    >
      <img
        src={option.images[tone]}
        alt=""
        loading="lazy"
        className="h-5 w-5 rounded-full object-cover"
      />
      {option.name}
    </Button>
  );
}

function ComboCard({
  tone,
  decor,
  kebaya,
  active,
  onSelect,
}: {
  tone: WeddingTone;
  decor: WeddingOption;
  kebaya: WeddingOutfit;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        "group h-auto min-h-0 items-stretch justify-start whitespace-normal p-0 flex flex-col overflow-hidden rounded-xl border bg-background/70 text-left transition-all duration-300",
        active
          ? "border-primary shadow-lg"
          : "border-border hover:border-primary/50 hover:-translate-y-0.5",
      )}
    >
      <span className="flex flex-col gap-px overflow-hidden bg-border/60">
        <img
          src={decor.images[tone.key]}
          alt={`Pelaminan ${decor.name} tone ${tone.name}`}
          loading="lazy"
          width={decor.width}
          height={decor.height}
          className="h-auto w-full"
        />
        <img
          src={kebaya.images[tone.key]}
          alt={`Kebaya ${kebaya.name} dan ${kebaya.groomName} pada manekin tanpa wajah, tone ${tone.name}`}
          loading="lazy"
          width={kebaya.width}
          height={kebaya.height}
          className="h-auto w-full"
        />
      </span>
      <span className="flex flex-1 flex-col gap-1 p-2 sm:p-3">
        <span className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-[11px] font-bold leading-tight sm:text-sm",
              active ? "text-primary" : "text-foreground",
            )}
          >
            {tone.name}
          </span>
          <Swatch tone={tone} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
          {decor.name} · {kebaya.name} + {kebaya.groomName}
        </span>
        <span className="mt-auto pt-2 text-[11px] font-bold text-primary">
          {active ? "Dipilih ✓" : "Pilih kombinasi ini"}
        </span>
      </span>
    </Button>
  );
}

export function WeddingConceptStudio() {
  const [tone, setTone] = useState<ToneKey>("sage");
  const [decorKey, setDecorKey] = useState(weddingDecor[0]?.key ?? "garden");
  const [kebayaKey, setKebayaKey] = useState(weddingKebaya[0]?.key ?? "ivory");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState("");
  const [hint, setHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTone = useMemo(() => weddingTones.find((t) => t.key === tone) ?? weddingTones[0], [tone]);
  const decor = useMemo(
    () => weddingDecor.find((d) => d.key === decorKey) ?? weddingDecor[0],
    [decorKey],
  );
  const kebaya = useMemo(
    () => weddingKebaya.find((k) => k.key === kebayaKey) ?? weddingKebaya[0],
    [kebayaKey],
  );

  useEffect(() => {
    if (!downloaded) return;
    const t = window.setTimeout(() => setDownloaded(false), 4000);
    return () => window.clearTimeout(t);
  }, [downloaded]);

  const consultUrl = useMemo(() => activeTone && decor && kebaya ? weddingMoodConsultUrl({ tone: activeTone, decor, kebaya }) : "", [
    activeTone,
    decor,
    kebaya,
  ]);

  if (!activeTone || !decor || !kebaya) return null;

  async function downloadMoodboard() {
    if (!activeTone || !decor || !kebaya) return;
    setDownloading(true);
    setError("");
    try {
      const blob = await renderMoodboardCard({
        toneName: activeTone.name,
        toneHexes: activeTone.hexes,
        toneNote: activeTone.note,
        decorName: decor.name,
        decorImage: decor.images[tone],
        kebayaName: `${kebaya.name} + ${kebaya.groomName}`,
        kebayaImage: kebaya.images[tone],
      });
      await deliverFile(blob, moodboardFilename(activeTone.name));
      setDownloaded(true);
    } catch {
      setError(
        `Belum bisa dibuat di perangkat ini. Screenshot bagian ini, atau kirim pilihan kamu ke WhatsApp ${NEMPO_WA_NUMBER}.`,
      );
    } finally {
      setDownloading(false);
    }
  }

  function scrollIntoViewOnMobile() {
    if (window.matchMedia("(max-width: 640px)").matches) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section id="konsep" className="relative bg-background py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,var(--wed-pearl),transparent_42%),radial-gradient(circle_at_82%_78%,var(--wed-champagne),transparent_40%)]"
      />
      <div ref={scrollRef} className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Studio Konsep
          </span>
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Bandingkan dulu, baru pilih
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Pelaminan · Kebaya · Beskap senada
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Pelaminan
            </span>
            {weddingDecor.map((option) => (
              <OptionChip
                key={option.key}
                option={option}
                tone={tone}
                active={option.key === decor.key}
                onSelect={() => {
                  setDecorKey(option.key);
                  scrollIntoViewOnMobile();
                }}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Busana pasangan
            </span>
            {weddingKebaya.map((option) => (
              <OptionChip
                key={option.key}
                option={option}
                tone={tone}
                active={option.key === kebaya.key}
                onSelect={() => {
                  setKebayaKey(option.key);
                  scrollIntoViewOnMobile();
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {weddingTones.map((option) => (
            <ComboCard
              key={option.key}
              tone={option}
              decor={decor}
              kebaya={kebaya}
              active={option.key === tone}
              onSelect={() => {
                setTone(option.key);
                setHint(true);
                scrollIntoViewOnMobile();
              }}
            />
          ))}
        </div>

        <div
          key={activeTone.key + "-" + decor.key + "-" + kebaya.key}
          className="wed-mood-enter mt-5 flex flex-col gap-3 rounded-xl border border-border bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Swatch tone={activeTone} size="md" />
            <span className="text-sm font-bold text-foreground">{activeTone.name}</span>
            <span className="text-xs text-muted-foreground">
              {decor.name} · {kebaya.name} + {kebaya.groomName}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
      variant="ghost"
              type="button"
              onClick={downloadMoodboard}
              disabled={downloading}
              className={cn(
                "rounded-md border px-4 py-2.5 text-xs font-bold transition-colors",
                downloading
                  ? "border-border bg-muted text-muted-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/60 hover:text-primary",
              )}
            >
              {downloading
                ? "Membuat moodboard…"
                : downloaded
                  ? "Moodboard tersimpan ✓"
                  : "Download moodboard"}
            </Button>
            <a
              href={consultUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!downloaded) setHint(true);
              }}
              className="rounded-md bg-primary px-4 py-2.5 text-center text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Konsultasikan pilihan ini
            </a>
          </div>
        </div>

        {hint ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Suka hasilnya? Download moodboard-nya, atau langsung kirim ke WhatsApp {NEMPO_WA_NUMBER}.
            Ikuti {NEMPO_INSTAGRAM_HANDLE} untuk update portofolio.
          </p>
        ) : null}

        {error ? (
          <p role="alert" className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            {error}
          </p>
        ) : null}

        <p className="mt-3 text-[11px] text-muted-foreground">
          Foto adalah ilustrasi konsep; realisasi dekor, bunga, dan busana bisa disesuaikan budget
          dan venue. Detail:{" "}
          <Link href="/wedding-invitation" className="font-semibold text-primary underline-offset-4 hover:underline">
            undangan digital
          </Link>
        </p>
      </div>
    </section>
  );
}
