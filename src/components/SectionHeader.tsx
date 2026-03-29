"use client";

interface Props {
  en: string;
  ja: string;
  sub?: string;
}

export default function SectionHeader({ en, ja, sub }: Props) {
  return (
    <div className={sub ? "mb-3" : "mb-4"}>
      <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.16em] text-gold m-0 mb-0.5 uppercase">
        {en}
      </p>
      <h2 className="font-[family-name:var(--font-serif)] text-[19px] text-ink m-0 font-normal">
        {ja}
      </h2>
      {sub && (
        <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute mt-1 leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}
