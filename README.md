# Sanjay Kumar Shukla — Portfolio

A clean, responsive dark-theme portfolio website.

---

## 📁 Project Structure

```
sanjay_portfolio/
│
├── index.html              ← Main HTML (all 9 sections)
│
├── css/
│   └── styles.css          ← All styles (sections, responsive, animations)
│
├── js/
│   └── main.js             ← Cursor, nav, scroll, form logic
│
└── assets/
    └── images.js           ← Embedded base64 photos + PDF resume
```

---

## 🚀 How to Run Locally

**Option 1 — Just open the file (simplest):**
```
Double-click  index.html  →  opens in browser. Done!
```

**Option 2 — VS Code Live Server (recommended):**
1. Install VS Code → https://code.visualstudio.com
2. Install extension: **Live Server** (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

**Option 3 — Python local server:**
```bash
cd sanjay_portfolio
python -m http.server 5500
# Open http://localhost:5500
```

---

## 🌐 Deploy Online (Free)

### GitHub Pages
```bash
# 1. Create repo on github.com (e.g. "portfolio")
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/Sanjay10tech/portfolio.git
git push -u origin main

# 2. Go to repo Settings → Pages → Branch: main → Save
# 3. Live at: https://Sanjay10tech.github.io/portfolio
```

### Netlify (drag & drop)
1. Go to https://netlify.com → Sign up free
2. Drag the `sanjay_portfolio/` folder onto the dashboard
3. Your site is live instantly with a URL like `https://random-name.netlify.app`
4. Optional: Add custom domain in Settings

### Vercel
```bash
npm i -g vercel
cd sanjay_portfolio
vercel
# Follow prompts — live in 30 seconds!
```

---

## ✏️ How to Edit Content

| What to change | Where |
|---|---|
| Name, role, description | `index.html` → Section 1 (Hero) |
| About text | `index.html` → Section 2 (About) |
| Work experience | `index.html` → Section 3 (Experience) |
| Education | `index.html` → Section 4 (Education) |
| Skill percentages | `index.html` → Section 5 (Skills) — change `width:XX%` |
| Projects | `index.html` → Section 6 (Projects) |
| Blog posts | `index.html` → Section 7 (Blog) |
| Contact links | `index.html` → Section 8 (Contact) |
| Colors / theme | `css/styles.css` → `:root` variables |
| Animations / behavior | `js/main.js` |
| Photos / PDF | `assets/images.js` — replace base64 strings |

---

## 🎨 Color Variables (css/styles.css)

```css
:root {
  --bg:     #080c18;   /* Page background */
  --bg2:    #0d1225;   /* Alternate section bg */
  --card:   #111827;   /* Card background */
  --blue:   #60a5fa;   /* Primary accent */
  --purple: #a78bfa;   /* Gradient purple */
  --green:  #4ade80;   /* Available / status */
  --pink:   #f472b6;   /* Location / accents */
  --grad1:  linear-gradient(135deg,#3b82f6,#8b5cf6);
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| ≤ 1100px | Tablet landscape |
| ≤ 900px  | Tablet portrait |
| ≤ 768px  | Mobile |
| ≤ 540px  | Small mobile |
| ≤ 380px  | Tiny screens |

---

## 🔗 Links Used

| Platform | URL |
|---|---|
| GitHub | https://github.com/Sanjay10tech |
| LinkedIn | https://www.linkedin.com/in/sanjayshu1012/ |
| Medium | https://medium.com/@sanjayshukla9589 |
| Email | sanjayshukla9589@gmail.com |

---

## 📦 Sections

1. **Home** — Hero, photo, stats
2. **About** — Bio, info cards, social links
3. **Experience** — Timeline (iTuring.ai, Matex, IIT Patna)
4. **Education** — MCA, BCA, 12th, 10th
5. **Skills** — Frontend, Backend, DevOps, AI/ML + Tools
6. **Projects** — Health App, Mental Health Bot, ML Dropout
7. **Blog** — 3 articles + Medium CTA
8. **Contact** — Info links + Contact form
9. **Resume** — Inline preview + Download PDF

---

*Built with pure HTML, CSS, and Vanilla JavaScript — no frameworks, no dependencies!*
