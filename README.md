# Iceberg

Iceberg, teknoloji, yazılım ve YouTube içeriği üzerine kurulu bir şirketin kurumsal web sitesidir. Bu repo, sitenin kaynak kodunu içerir.

---

## Bilgisayarına Kurmak İçin Gerekenler

Başlamadan önce şunların yüklü olduğundan emin ol:

- [Node.js](https://nodejs.org/) — JavaScript'i çalıştıran motor (v18 veya üstü)
- [Git](https://git-scm.com/) — Kodu bilgisayarına indirmek için
- Bir kod editörü — [VS Code](https://code.visualstudio.com/) önerilir

---

## Kurulum (Adım Adım)

### 1. Kodu bilgisayarına indir

```bash
git clone https://github.com/aybars-prompterest/iceberg.git
cd iceberg
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

> Bu komut, projenin ihtiyaç duyduğu tüm kütüphaneleri indirir. Bir kez çalıştırman yeterli.

### 3. Geliştirme sunucusunu başlat

```bash
npm run dev
```

> Tarayıcında `http://localhost:3000` adresine git. Siteyi canlı olarak görebilirsin.

---

## Komutlar

| Komut | Ne Yapar |
|-------|----------|
| `npm run dev` | Geliştirme modunda siteyi başlatır |
| `npm run build` | Siteyi yayına almaya hazırlar |
| `npm run storybook` | Component galerini açar — `http://localhost:6006` |
| `npm run lint` | Kod kalitesi kontrolü yapar |

---

## Klasör Yapısı

```
iceberg/
├── src/
│   ├── app/              → Sayfalar ve genel layout (Next.js App Router)
│   ├── components/
│   │   ├── ui/           → Küçük, tekrar kullanılabilir parçalar (Button, Card, Input...)
│   │   ├── sections/     → Sayfa bölümleri (HeroSection, FeaturesGrid...)
│   │   ├── layout/       → Navbar, Footer gibi sayfa çerçevesi
│   │   └── animations/   → Framer Motion animasyon bileşenleri
│   └── lib/
│       ├── types.ts      → TypeScript tip tanımları
│       └── constants.ts  → Sabit veriler (nav linkleri vb.)
├── stories/              → Storybook story dosyaları (component önizlemeleri)
└── docs/                 → Tasarım kararları ve plan belgeleri
```

---

## Storybook Nedir, Neden Var?

Storybook, componentleri sitenin geri kalanından bağımsız olarak görüp test edebileceğin bir araçtır. Sanki bir component kataloğu gibi düşün.

```bash
npm run storybook
```

Tarayıcında `http://localhost:6006` açılır. Sol panelden herhangi bir componente tıklayarak nasıl göründüğünü inceleyebilirsin.


## Kullanılan Teknolojiler

| Teknoloji | Ne İşe Yarıyor |
|-----------|----------------|
| [Next.js 15](https://nextjs.org/) | React tabanlı web framework |
| [React 19](https://react.dev/) | Arayüz bileşenleri için temel kütüphane |
| [Tailwind CSS v4](https://tailwindcss.com/) | CSS'i class'larla yazmak için |
| [Framer Motion](https://www.framer.com/motion/) | Animasyonlar için |
| [Storybook 8](https://storybook.js.org/) | Component geliştirme ve önizleme ortamı |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript'e tip güvenliği ekler |
