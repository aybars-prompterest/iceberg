"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Layout,
  Megaphone,
  CreditCard,
  Users,
  Sparkles,
  Handshake,
  Bot,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { availableIcons, resolveIcon } from "@/lib/icon-map";

interface SettingsFormProps {
  initialValues: Record<string, string>;
}

const tabs = [
  { id: "hero", label: "Hero", icon: Layout },
  { id: "announcement", label: "Duyuru", icon: Megaphone },
  { id: "services", label: "Hizmetler", icon: CreditCard },
  { id: "cta", label: "CTA", icon: MousePointerClick },
  { id: "testimonials", label: "Yorumlar", icon: Users },
  { id: "features", label: "Özellikler", icon: Sparkles },
  { id: "partners", label: "Partnerler", icon: Handshake },
  { id: "bot", label: "Bot", icon: Bot },
] as const;

type TabId = (typeof tabs)[number]["id"];

const inputClass =
  "w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors";
const textareaClass =
  "w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors resize-none";
const labelClass = "text-sm text-text-secondary mb-1.5 block";
const subHeadingClass =
  "text-xs font-medium text-text-secondary uppercase tracking-wider";

function Field({
  label,
  value,
  onChange,
  hint,
  textarea,
  rows = 2,
  type = "text",
  min,
  max,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  textarea?: boolean;
  rows?: number;
  type?: "text" | "number";
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          className={textareaClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-text-secondary">{hint}</p>}
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pb-4 border-b border-border mb-2">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <p className="text-sm text-text-secondary mt-1">{description}</p>
    </div>
  );
}

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [activeTab, setActiveTab] = useState<TabId>("hero");

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-heading">
            Site Ayarları
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Ana sayfa içeriklerini buradan düzenleyin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-sm text-green-400">✓ Kaydedildi</span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400">Hata oluştu</span>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={status === "saving"}
          >
            {status === "saving" ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto -mx-6 lg:-mx-8 px-6 lg:px-8">
        <div className="flex gap-1 p-1 bg-bg-surface border border-border rounded-xl w-fit min-w-full sm:min-w-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                activeTab === id
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-primary/60",
              )}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex flex-col gap-6">
        {activeTab === "hero" && (
          <>
            <SectionHeader
              title="Hero Bölümü"
              description="Ana sayfanın en üstündeki hero alanı."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Tagline"
                value={values.hero_tagline ?? ""}
                onChange={(v) => set("hero_tagline", v)}
              />
              <Field
                label="Headlines"
                value={values.hero_headlines ?? ""}
                onChange={(v) => set("hero_headlines", v)}
                hint="Virgülle ayır — örn: All in One Studio, Design, Code"
              />
            </div>

            <Field
              label="Açıklama"
              value={values.hero_description ?? ""}
              onChange={(v) => set("hero_description", v)}
              textarea
              rows={2}
            />

            <Field
              label="Güven Metni"
              value={values.hero_trust_text ?? ""}
              onChange={(v) => set("hero_trust_text", v)}
              hint="Avatar grubunun altında görünen metin"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-3">
                <p className={subHeadingClass}>Birincil CTA</p>
                <Field
                  label="Buton Metni"
                  value={values.hero_primary_cta_label ?? ""}
                  onChange={(v) => set("hero_primary_cta_label", v)}
                />
                <Field
                  label="Bağlantı (href)"
                  value={values.hero_primary_cta_href ?? ""}
                  onChange={(v) => set("hero_primary_cta_href", v)}
                />
              </div>
              <div className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-3">
                <p className={subHeadingClass}>İkincil CTA</p>
                <Field
                  label="Buton Metni"
                  value={values.hero_secondary_cta_label ?? ""}
                  onChange={(v) => set("hero_secondary_cta_label", v)}
                />
                <Field
                  label="Bağlantı (href)"
                  value={values.hero_secondary_cta_href ?? ""}
                  onChange={(v) => set("hero_secondary_cta_href", v)}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "announcement" && (
          <>
            <SectionHeader
              title="Duyuru Bandı"
              description="Hero altında görünen duyuru çubuğu."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Badge Metni"
                value={values.announcement_badge ?? ""}
                onChange={(v) => set("announcement_badge", v)}
              />
              <Field
                label="Link Metni"
                value={values.announcement_link_text ?? ""}
                onChange={(v) => set("announcement_link_text", v)}
              />
            </div>

            <Field
              label="Duyuru Metni"
              value={values.announcement_text ?? ""}
              onChange={(v) => set("announcement_text", v)}
            />
            <Field
              label="Bağlantı URL"
              value={values.announcement_href ?? ""}
              onChange={(v) => set("announcement_href", v)}
            />
          </>
        )}

        {activeTab === "services" && (
          <>
            <SectionHeader
              title="Hizmet Kartları"
              description="Ana sayfadaki 3 hizmet kartı."
            />

            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-4"
              >
                <p className={subHeadingClass}>Kart {i + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Başlık"
                    value={values[`services_card_${i}_title`] ?? ""}
                    onChange={(v) => set(`services_card_${i}_title`, v)}
                  />
                  <Field
                    label="Link Metni"
                    value={values[`services_card_${i}_link_text`] ?? ""}
                    onChange={(v) => set(`services_card_${i}_link_text`, v)}
                  />
                </div>
                <Field
                  label="Açıklama"
                  value={values[`services_card_${i}_description`] ?? ""}
                  onChange={(v) => set(`services_card_${i}_description`, v)}
                  textarea
                  rows={2}
                />
                <Field
                  label="Bağlantı (href)"
                  value={values[`services_card_${i}_href`] ?? ""}
                  onChange={(v) => set(`services_card_${i}_href`, v)}
                />
              </div>
            ))}
          </>
        )}

        {activeTab === "cta" && (
          <>
            <SectionHeader
              title="CTA Banner"
              description="Sayfadaki aksiyon çağrısı banner'ı."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Başlık"
                value={values.cta_banner_title ?? ""}
                onChange={(v) => set("cta_banner_title", v)}
              />
              <Field
                label="Buton Metni"
                value={values.cta_banner_label ?? ""}
                onChange={(v) => set("cta_banner_label", v)}
              />
            </div>

            <Field
              label="Açıklama"
              value={values.cta_banner_description ?? ""}
              onChange={(v) => set("cta_banner_description", v)}
              textarea
              rows={2}
            />

            <Field
              label="Buton Bağlantısı (href)"
              value={values.cta_banner_href ?? ""}
              onChange={(v) => set("cta_banner_href", v)}
            />
          </>
        )}

        {activeTab === "testimonials" && (
          <>
            <SectionHeader
              title="Müşteri Yorumları"
              description="Ana sayfadaki 4 müşteri yorumu kartı."
            />

            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-4"
              >
                <p className={subHeadingClass}>Yorum {i + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="İsim"
                    value={values[`testimonial_${i}_name`] ?? ""}
                    onChange={(v) => set(`testimonial_${i}_name`, v)}
                  />
                  <Field
                    label="Ünvan"
                    value={values[`testimonial_${i}_title`] ?? ""}
                    onChange={(v) => set(`testimonial_${i}_title`, v)}
                  />
                </div>
                <Field
                  label="Yorum"
                  value={values[`testimonial_${i}_quote`] ?? ""}
                  onChange={(v) => set(`testimonial_${i}_quote`, v)}
                  textarea
                  rows={2}
                />
                <Field
                  label="Puan (1-5)"
                  value={values[`testimonial_${i}_rating`] ?? "5"}
                  onChange={(v) => set(`testimonial_${i}_rating`, v)}
                  hint="1 ile 5 arası bir sayı"
                />
              </div>
            ))}
          </>
        )}

        {activeTab === "features" && (
          <>
            <SectionHeader
              title="Özellikler"
              description="Ana sayfadaki 6 özellik kartı."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center text-text-primary">
                      {resolveIcon(values[`feature_${i}_icon`] ?? "")}
                    </div>
                    <p className={subHeadingClass}>Özellik {i + 1}</p>
                  </div>
                  <div>
                    <label className={labelClass}>İkon</label>
                    <select
                      className={`${inputClass} cursor-pointer appearance-none`}
                      value={values[`feature_${i}_icon`] ?? ""}
                      onChange={(e) => set(`feature_${i}_icon`, e.target.value)}
                    >
                      <option value="">Seçiniz...</option>
                      {availableIcons.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field
                    label="Başlık"
                    value={values[`feature_${i}_title`] ?? ""}
                    onChange={(v) => set(`feature_${i}_title`, v)}
                  />
                  <Field
                    label="Açıklama"
                    value={values[`feature_${i}_description`] ?? ""}
                    onChange={(v) => set(`feature_${i}_description`, v)}
                    textarea
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "partners" && (
          <>
            <SectionHeader
              title="Partnerler"
              description="Ana sayfadaki partner/marka logoları."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-bg-surface border border-border rounded-xl p-5 flex flex-col gap-3"
                >
                  <p className={subHeadingClass}>Partner {i + 1}</p>
                  <Field
                    label="Adı"
                    value={values[`partner_${i}_name`] ?? ""}
                    onChange={(v) => set(`partner_${i}_name`, v)}
                  />
                  <Field
                    label="Logo URL"
                    value={values[`partner_${i}_logo_url`] ?? ""}
                    onChange={(v) => set(`partner_${i}_logo_url`, v)}
                    hint="Boş bırakılırsa isim gösterilir"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "bot" && (
          <>
            <SectionHeader
              title="Blog Bot Ayarları"
              description="Otomatik blog yazısı üreten bot'un yapılandırması."
            />

            <Field
              label="Subredditler"
              value={values.bot_subreddits ?? ""}
              onChange={(v) => set("bot_subreddits", v)}
              hint="Virgülle ayır — örn: technology,programming,webdev"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Minimum Upvote"
                value={values.bot_min_upvotes ?? ""}
                onChange={(v) => set("bot_min_upvotes", v)}
                hint="Bu değerin altındaki konular atlanır"
                type="number"
              />
              <Field
                label="HuggingFace Modeli"
                value={values.bot_model ?? ""}
                onChange={(v) => set("bot_model", v)}
                hint="Örn: Qwen/Qwen2.5-7B-Instruct"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Temperature"
                value={values.bot_temperature ?? ""}
                onChange={(v) => set("bot_temperature", v)}
                hint="0.1 – 1.0 arası. Boş bırakılırsa varsayılan 0.7 kullanılır"
                type="number"
                min={0.1}
                max={1}
                step={0.1}
              />
              <Field
                label="Max Tokens"
                value={values.bot_max_tokens ?? ""}
                onChange={(v) => set("bot_max_tokens", v)}
                hint="Üretilecek maksimum token sayısı. Boş bırakılırsa varsayılan 1200 kullanılır"
                type="number"
                min={100}
              />
            </div>

            <Field
              label="Sistem Promptu"
              value={values.bot_system_prompt ?? ""}
              onChange={(v) => set("bot_system_prompt", v)}
              textarea
              rows={8}
              hint={'Boş bırakılırsa varsayılan prompt kullanılır. Konu için {{topic}}, Reddit içeriği için {{context}} kullan. Özel prompt yazarken yazının sonuna mutlaka şunları ekle: TAGS: ["Tag1", "Tag2"] ve CATEGORY: KategoriAdı — aksi hâlde tüm yazılar "Technology" kategorisine düşer.'}
            />
          </>
        )}
      </div>
    </div>
  );
}
