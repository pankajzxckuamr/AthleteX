# ⚡ AthleteX

> **A sports intelligence platform that tracks the internet buzz around your favourite athletes — in real time.**

AthleteX combines a custom-built Python web crawler (built on top of a hand-rolled mini browser engine with raw sockets and a custom DNS resolver) with a modern React + Tailwind dashboard to deliver a personalised, athlete-centric news and buzz feed across Cricket, Football, Basketball, Tennis, and more.

---

## 🎯 What It Does

- 🔍 **Crawls** sports news sites, stats platforms, and social feeds automatically
- 🧠 **Detects** which athletes are being talked about and how often
- 💬 **Analyses sentiment** — is the buzz positive or negative?
- 📊 **Scores buzz** — a composite daily score showing who's trending
- 📰 **Surfaces articles** mentioning your followed athletes
- 📈 **Tracks trends** — see how buzz rises and falls over time
- ⚡ **Serves everything** via a REST API to the React frontend

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           AthleteX                                  │
│                                                                     │
│   BACKEND (Python)                    FRONTEND (React + Tailwind)   │
│   ─────────────────                   ──────────────────────────    │
│                                                                     │
│   dns_resolver.py                     React Components             │
│   (raw UDP DNS, no OS)                  │  Player Dashboard        │
│          │                              │  Buzz Leaderboard        │
│          ▼                              │  News Feed               │
│   browser.py                            │  Trend Charts           │
│   (raw TCP sockets,                     │  Search                 │
│    SSL, gzip, cache)                    │                          │
│          │                           Tailwind CSS                  │
│          ▼                           Vite Build                    │
│   crawler.py ──▶ parser.py                │                        │
│   (BFS crawl)    (HTML → text,            │                        │
│                   mentions,          fetch('localhost:8081/api/…') │
│                   sentiment)              │                        │
│          │                               │                        │
│          ▼                               │                        │
│   database.py (SQLite)  ◀──── api.py ────┘                        │
│   (players, articles,        (REST, port 8081,                     │
│    mentions, buzz scores)     CORS enabled)                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AthleteX/
│
├── frontend/                   # React + Tailwind + Vite
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Route pages
│   │   └── App.jsx             # Root component + routing
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── crawler/                    # Python backend
    ├── browser.py              # HTTP fetcher (raw sockets, SSL, gzip)
    ├── dns_resolver.py         # Custom DNS via raw UDP packets
    ├── crawler.py              # BFS web crawler engine
    ├── parser.py               # HTML → text, mentions, sentiment
    ├── database.py             # SQLite schema + all queries
    ├── api.py                  # REST API server (port 8081)
    ├── players_seed.py         # Players + sources seed data
    └── run.py                  # Single command launcher
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+

### 1. Clone the repo

```bash
git clone https://github.com/pankajzxckuamr/AthleteX.git
cd AthleteX
```

### 2. Set up the crawler backend

```bash
cd crawler

# First time: seed the database with players & sources
python run.py setup

# Run a crawl (fetches articles, detects mentions, computes buzz)
python run.py crawl

# Start the REST API so the frontend can connect
python run.py api
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` — the dashboard is live.

### 4. Production mode (crawler + API together, every 6 hours)

```bash
cd crawler
python run.py all
```

---

## 🕷️ Crawler Commands

```bash
python run.py setup              # Seed DB with 38 players + 19 sources
python run.py crawl              # Crawl all sports
python run.py crawl --sport Cricket        # Crawl one sport only
python run.py crawl --no-parallel          # Single-threaded (easier to debug)
python run.py schedule --hours 6           # Auto-crawl every N hours
python run.py api                          # Start REST API on :8081
python run.py all                          # API + auto-scheduler together
python run.py status                       # Show DB stats
python run.py buzz                         # Print today's top buzz scores
python run.py buzz --sport Football        # Filter by sport
```

---

## 🌐 REST API Endpoints

All endpoints return JSON. CORS is fully enabled.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | All tracked players — filter with `?sport=Cricket` |
| GET | `/api/players/:id/buzz` | Buzz history — `?days=7` |
| GET | `/api/players/:id/articles` | Recent articles mentioning the player |
| GET | `/api/players/:id/trend` | Buzz trend for charting — `?days=30` |
| GET | `/api/buzz/top` | Top buzzing players today — `?sport=Football&limit=10` |
| GET | `/api/buzz/leaderboard` | Full cross-sport leaderboard |
| GET | `/api/search?q=Messi` | Search players by name or nickname |
| GET | `/api/stats` | Overall crawler health & stats |

### Example — Top Buzz Today

```bash
curl http://localhost:8081/api/buzz/top?sport=Cricket&limit=5
```

```json
{
  "top_players": [
    { "name": "Virat Kohli",   "sport": "Cricket", "buzz_score": 67.4, "mention_count": 134 },
    { "name": "Rohit Sharma",  "sport": "Cricket", "buzz_score": 51.2, "mention_count": 98  },
    { "name": "Jasprit Bumrah","sport": "Cricket", "buzz_score": 38.7, "mention_count": 71  }
  ],
  "count": 3
}
```

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `players` | Athletes tracked (name, sport, nationality, aliases/nicknames) |
| `sources` | Sites to crawl (ESPN, Cricbuzz, Goal.com, NBA.com, etc.) |
| `articles` | Every page crawled (url, title, summary, full text) |
| `mentions` | Which player appears in which article, with sentiment score |
| `match_stats` | Per-match stats stored as flexible JSON blobs |
| `buzz_scores` | Daily composite buzz score per player |
| `crawl_log` | Every URL visited — status, timestamp, errors |

---

## 📊 Buzz Score Formula

```
buzz_score = (mention_count × 0.6) + (article_count × 3.0 × 0.3) + ((sentiment + 1) × 5 × 0.1)
```

- Capped at **100**
- Recomputed after every crawl cycle
- Stored **per player per date** so you can plot trends

Sentiment ranges from **−1.0** (very negative) to **+1.0** (very positive), calculated from a curated sports word list — no ML dependencies required.

---

## 🏅 Athletes Tracked (Default)

| Sport | Players |
|-------|---------|
| 🏏 Cricket | Virat Kohli, Rohit Sharma, Babar Azam, Jasprit Bumrah, Ben Stokes, + 5 more |
| ⚽ Football | Messi, Ronaldo, Haaland, Mbappé, Bellingham, Vinicius Jr, + 4 more |
| 🏀 Basketball | LeBron James, Stephen Curry, Giannis, Luka Dončić, Nikola Jokić, + 5 more |
| 🎾 Tennis | Djokovic, Alcaraz, Sinner, Iga Świątek, Coco Gauff, + 3 more |

> Add any player by editing `players_seed.py` and re-running `python run.py setup`.

---

## 🔧 Under The Hood — The Custom Browser Engine

AthleteX doesn't use `requests` or any HTTP library. The crawler is built on a hand-crafted browser engine:

- **`dns_resolver.py`** — Resolves domain names by building raw UDP DNS packets and parsing binary responses from `8.8.8.8`. No OS DNS calls.
- **`browser.py`** — Opens raw TCP sockets, performs TLS handshakes via Python's `ssl` module, sends HTTP/1.1 requests manually, handles chunked transfer encoding, gzip decompression, redirects (up to 10 hops), and an in-memory cache.
- **`parser.py`** — Parses HTML with Python's built-in `html.parser`, extracts visible text, detects player names and aliases using regex, scores sentiment with a bag-of-words approach.

No third-party scraping libraries. Built from scratch.

---

## 🛣️ Roadmap

- [ ] User accounts — follow your own set of athletes
- [ ] Push notifications for buzz spikes
- [ ] Social media source integration
- [ ] Video clip detection (YouTube/highlights)
- [ ] Mobile app (React Native)
- [ ] Deploy to cloud (Railway / Render)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Pankaj** — building AthleteX from scratch, one socket at a time.

- GitHub: [@pankajzxckuamr](https://github.com/pankajzxckuamr)

---


---

> *"Most sports apps just show you data. AthleteX tells you who the internet is actually talking about."*
