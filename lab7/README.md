# Lab 7 — Sass / SCSS refactor

Лаб 6-ийн Motion Gallery сайтын харагдацыг өөрчлөхгүйгээр SCSS болгон зохион байгуулсан хувилбар.

## Шаардлага
- Sass compiler: npm package `sass`
- Tokens map болон CSS custom properties
- `respond`, `flex-center` mixins
- `rem()`, `contrast()` Sass functions
- SCSS partial бүтэц
- BEM modifier/element class naming
- `@each` utility class generation
- Compressed CSS build

## Суурилуулах ба ажиллуулах
```bash
npm install
npm run build
```

Өөрчлөлтийг автоматаар compile хийх:
```bash
npm run watch
```

Build нь `scss/main.scss`-ийг `style.css` болгон compressed горимоор гаргана. GitHub Pages нь урьдчилан compile хийгдсэн `style.css`-ийг ашиглана.

## Folder structure
```
lab7/
├── index.html
├── style.css
├── script.js
├── package.json
├── README.md
├── scss/
│   ├── abstracts/
│   │   ├── _tokens.scss
│   │   ├── _functions.scss
│   │   └── _mixins.scss
│   ├── _gallery.scss
│   └── main.scss
├── img/
└── video/
```
