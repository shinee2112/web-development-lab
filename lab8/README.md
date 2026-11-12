# Lab 8 — Bootstrap ба Tailwind CSS харьцуулалт

## Хуудсууд
- Bootstrap: [bootstrap.html](./bootstrap.html) — Bootstrap 5.3 CDN, navbar, responsive 3-column card grid, Bootstrap form validation, `data-bs-theme` dark/light toggle, `.btn-brand` CSS variable.
- Tailwind: [tailwind.html](./tailwind.html) — Tailwind CSS v4 utility classes, CLI build script, `@custom-variant dark`, `@theme --color-brand`, native form validation, dark/light toggle.

## Build
```bash
npm install
npm run build:tailwind
```
Watch:
```bash
npm run watch:tailwind
```

## Хэмжилтийн хүснэгт

| Үзүүлэлт | Bootstrap | Tailwind |
|---|---:|---:|
| CSS файлын эх кодын хэмжээ (тэмдэгтийн тоо) | `bootstrap.css`: 877; Bootstrap CDN тусдаа татагдана | `tailwind.css`: 4629; CLI build output файл |
| Custom stylesheet | `bootstrap.css` | `tailwind.css` |
| Card-ын class тоо (нэг card wrapper) | 3 | 9 |
| Lighthouse Performance | Бодит audit ажиллуулж бөглөнө | Бодит audit ажиллуулж бөглөнө |
| Lighthouse Accessibility | Бодит audit ажиллуулж бөглөнө | Бодит audit ажиллуулж бөглөнө |

**Тайлбар:** Lighthouse оноо нь тухайн browser, сүлжээ, CDN cache болон төхөөрөмжөөс хамаардаг тул энд зохиомол тоо оруулаагүй. Chrome DevTools → Lighthouse → Mobile/Desktop → Analyze page load ажиллуулаад бодит утгыг бичнэ. Файлын хэмжээг DevTools Network эсвэл файлын Properties-оос хэмжинэ.

## Дүгнэлт
Bootstrap нь бэлэн navbar, grid, card болон form validation компоненттой тул хурдан угсрахад тохиромжтой. Tailwind нь utility class-аар layout болон дизайныг илүү нарийн удирдах боломж олгодог боловч class ихтэй, build тохиргоо шаарддаг. Bootstrap-ийн CDN нь эхлээд framework CSS татдаг бол Tailwind CLI нь ашигласан utility-уудыг build хийх урсгалтай. Хоёр арга хоёулаа responsive дизайн болон dark mode хэрэгжүүлэх боломжтой.
