#!/usr/bin/env python3
"""
Process Kaggle datasets into compact JSON summaries for anygame.dev research.
Raw datasets are cached in ~/.anygame-data/kaggle/ (gitignored, outside repo).
Only derived summaries (<100 KB each) are committed to docs/plans/data/kaggle/.
"""

import csv
import json
import os
import statistics
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

DATA_DIR = Path(os.environ.get("ANYGAME_DATA_DIR", "~/.anygame-data/kaggle")).expanduser()
OUT_DIR = Path(__file__).resolve().parent.parent / "docs" / "plans" / "data" / "kaggle"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def write_summary(name: str, data: dict):
    """Write a summary JSON file with metadata."""
    out = OUT_DIR / f"{name}.summary.json"
    with open(out, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {out} ({out.stat().st_size} bytes)")


def process_videogame_sales():
    """Process gregorut/videogamesales (vgsales.csv)."""
    csv_path = DATA_DIR / "market" / "vgsales.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    platforms = Counter(r["Platform"] for r in rows)
    genres = Counter(r["Genre"] for r in rows)
    publishers = Counter(r["Publisher"] for r in rows if r["Publisher"])

    # Regional sales totals
    regions = {"NA": 0.0, "EU": 0.0, "JP": 0.0, "Other": 0.0, "Global": 0.0}
    for r in rows:
        for key in regions:
            val = r.get(f"{key}_Sales", "0")
            if val and val != "N/A":
                try:
                    regions[key] += float(val)
                except ValueError:
                    pass

    # Year range
    years = []
    for r in rows:
        try:
            y = int(r["Year"])
            years.append(y)
        except (ValueError, KeyError):
            pass

    # Top 10 by global sales
    top_games = sorted(rows, key=lambda r: float(r.get("Global_Sales", 0)), reverse=True)[:10]

    summary = {
        "dataset": "gregorut/videogamesales",
        "title": "Video Game Sales",
        "source": "https://www.kaggle.com/datasets/gregorut/videogamesales",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "vgsales.csv",
        "file_size": csv_path.stat().st_size,
        "total_rows": len(rows),
        "columns": ["Rank", "Name", "Platform", "Year", "Genre", "Publisher",
                     "NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales", "Global_Sales"],
        "year_range": [min(years), max(years)] if years else None,
        "top_platforms": dict(platforms.most_common(10)),
        "top_genres": dict(genres.most_common(10)),
        "top_publishers": dict(publishers.most_common(10)),
        "regional_sales_millions_mill": {k: round(v, 2) for k, v in regions.items()},
        "best_global_sellers": [
            {"rank": r["Rank"], "name": r["Name"], "platform": r["Platform"],
             "year": r["Year"], "global_sales": r["Global_Sales"]}
            for r in top_games
        ],
    }
    write_summary("videogamesales", summary)


def process_chess():
    """Process datasnaek/chess (games.csv)."""
    csv_path = DATA_DIR / "games" / "games.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    victory_status = Counter(r["victory_status"] for r in rows)
    winners = Counter(r["winner"] for r in rows)
    openings = Counter(r["opening_name"] for r in rows if r["opening_name"])
    eco_codes = Counter(r["opening_eco"] for r in rows if r["opening_eco"])

    # Rating stats
    white_ratings = [int(r["white_rating"]) for r in rows if r.get("white_rating", "").isdigit()]
    black_ratings = [int(r["black_rating"]) for r in rows if r.get("black_rating", "").isdigit()]
    turns = [int(r["turns"]) for r in rows if r.get("turns", "").isdigit()]

    # Convert timestamps (stored as float seconds since epoch)
    created_years = []
    for r in rows:
        try:
            ts = float(r["created_at"])
            dt = datetime.fromtimestamp(ts / 1000, tz=timezone.utc)
            created_years.append(dt.year)
        except (ValueError, KeyError):
            pass

    increment_codes = Counter(r["increment_code"] for r in rows)

    summary = {
        "dataset": "datasnaek/chess",
        "title": "Chess Game Dataset (Lichess)",
        "source": "https://www.kaggle.com/datasets/datasnaek/chess",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "games.csv",
        "file_size": csv_path.stat().st_size,
        "license": "CC0-1.0",
        "total_rows": len(rows),
        "columns": list(rows[0].keys()) if rows else [],
        "year_range": [min(created_years), max(created_years)] if created_years else None,
        "victory_status_distribution": dict(victory_status),
        "winner_distribution": dict(winners),
        "top_openings": dict(openings.most_common(15)),
        "top_eco_codes": dict(eco_codes.most_common(10)),
        "increment_codes": dict(increment_codes.most_common(10)),
        "rating_stats": {
            "white_rating": {
                "min": min(white_ratings), "max": max(white_ratings),
                "mean": round(statistics.mean(white_ratings), 1),
                "median": round(statistics.median(white_ratings), 1),
            } if white_ratings else None,
            "black_rating": {
                "min": min(black_ratings), "max": max(black_ratings),
                "mean": round(statistics.mean(black_ratings), 1),
                "median": round(statistics.median(black_ratings), 1),
            } if black_ratings else None,
        },
        "turns_stats": {
            "min": min(turns), "max": max(turns),
            "mean": round(statistics.mean(turns), 1),
            "median": round(statistics.median(turns), 1),
        } if turns else None,
        "relevance": "Game AI training data: 20k chess games with moves, openings, ratings. Supports MCTS/RL agent research, ties to UM Game Playing competition.",
    }
    write_summary("chess", summary)


def process_board_games():
    """Process mrpantherson/board-game-data (bgg_db_1806.csv)."""
    csv_path = DATA_DIR / "games" / "bgg_db_1806.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    years = []
    for r in rows:
        try:
            y = int(r["year"])
            years.append(y)
        except (ValueError, KeyError):
            pass

    categories = Counter(r["category"] for r in rows if r.get("category"))
    mechanics = Counter(r["mechanic"] for r in rows if r.get("mechanic"))
    designers = Counter(r["designer"] for r in rows if r.get("designer") and r["designer"] != "various")

    weights = [float(r["weight"]) for r in rows if r.get("weight", "").replace(".", "", 1).isdigit()]
    ratings = [float(r["geek_rating"]) for r in rows if r.get("geek_rating", "").replace(".", "", 1).isdigit()]
    votes = [int(r["num_votes"]) for r in rows if r.get("num_votes", "").isdigit()]

    top_board_games = sorted(
        rows,
        key=lambda r: float(r.get("geek_rating", 0)), reverse=True
    )[:10]

    summary = {
        "dataset": "mrpantherson/board-game-data",
        "title": "Board Game Data",
        "license": "CC0-1.0",
        "source": "https://www.kaggle.com/datasets/mrpantherson/board-game-data",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "bgg_db_1806.csv",
        "file_size": csv_path.stat().st_size,
        "total_rows": len(rows),
        "columns": list(rows[0].keys()) if rows else [],
        "year_range": [min(years), max(years)] if years else None,
        "top_categories": dict(categories.most_common(10)),
        "top_mechanics": dict(mechanics.most_common(10)),
        "top_designers": dict(designers.most_common(10)),
        "weight_stats": {
            "min": round(min(weights), 2), "max": round(max(weights), 2),
            "mean": round(statistics.mean(weights), 2),
            "median": round(statistics.median(weights), 2),
        } if weights else None,
        "geek_rating_stats": {
            "min": round(min(ratings), 2), "max": round(max(ratings), 2),
            "mean": round(statistics.mean(ratings), 2),
        } if ratings else None,
        "num_votes_stats": {
            "min": min(votes), "max": max(votes),
            "mean": round(statistics.mean(votes), 1),
        } if votes else None,
        "top_rated_games": [
            {"name": r["names"], "year": r["year"], "geek_rating": r["geek_rating"],
             "weight": r["weight"], "category": r["category"]}
            for r in top_board_games
        ],
        "relevance": "Strategy game mechanics for AI planning, game balance analysis, MCTS/RL agent benchmarks.",
    }
    write_summary("boardgames", summary)


def process_vg_sales_2024():
    """Process asaniczka/video-game-sales-2024 (vgchartz-2024.csv)."""
    csv_path = DATA_DIR / "market" / "vgchartz-2024.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    platforms = Counter(r["console"] for r in rows if r.get("console"))
    genres = Counter(r["genre"] for r in rows if r.get("genre"))
    publishers = Counter(r["publisher"] for r in rows if r.get("publisher") and r["publisher"] != "Unknown")

    years = []
    for r in rows:
        try:
            # release_date format: "2006-09-30" or "2020-03-17"
            y = int(r["release_date"][:4])
            years.append(y)
        except (ValueError, KeyError, IndexError):
            pass

    def _to_float(val):
        try:
            return float(val)
        except (ValueError, TypeError):
            return 0.0

    critic_scores = [_to_float(r.get("critic_score")) for r in rows if r.get("critic_score")]
    critic_scores = [s for s in critic_scores if s > 0]
    sales = [_to_float(r.get("total_sales")) for r in rows]
    sales = [s for s in sales if s > 0]

    top_games = sorted(
        rows,
        key=lambda r: _to_float(r.get("total_sales", "")), reverse=True
    )[:10]

    summary = {
        "dataset": "asaniczka/video-game-sales-2024",
        "title": "Video Game Sales 2024",
        "license": "ODC Attribution License (ODC-By)",
        "source": "https://www.kaggle.com/datasets/asaniczka/video-game-sales-2024",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "vgchartz-2024.csv",
        "file_size": csv_path.stat().st_size,
        "total_rows": len(rows),
        "columns": list(rows[0].keys()) if rows else [],
        "year_range": [min(years), max(years)] if years else None,
        "top_platforms": dict(platforms.most_common(10)),
        "top_genres": dict(genres.most_common(10)),
        "top_publishers": dict(publishers.most_common(10)),
        "critic_score_stats": {
            "min": min(critic_scores), "max": max(critic_scores),
            "mean": round(statistics.mean(critic_scores), 2),
        } if critic_scores else None,
        "total_sales_stats_millions": {
            "min": round(min(sales), 2), "max": round(max(sales), 2),
            "mean": round(statistics.mean(sales), 2),
        } if sales else None,
        "top_selling_games": [
            {"title": r["title"], "console": r["console"], "release_date": r["release_date"],
             "total_sales": r["total_sales"], "critic_score": r["critic_score"]}
            for r in top_games
        ],
        "relevance": "Updated market data (64k+ games) for 2026 market analysis, platform/genre trends, and publisher performance.",
    }
    write_summary("vgchartz-2024", summary)


def process_steam_store():
    """Process nikdavis/steam-store-games (steam.csv main data file)."""
    csv_path = DATA_DIR / "metadata" / "steam.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = []
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    categories = Counter(r["categories"] for r in rows if r.get("categories"))
    genres = Counter(r["genres"] for r in rows if r.get("genres"))
    developers = Counter(r["developer"] for r in rows if r.get("developer") and r["developer"] != "Unknown")
    publishers = Counter(r["publisher"] for r in rows if r.get("publisher") and r["publisher"] != "Unknown")

    years = []
    for r in rows:
        try:
            y = int(r["release_date"][:4])
            years.append(y)
        except (ValueError, KeyError, IndexError):
            pass

    positive_ratings = [int(r["positive_ratings"]) for r in rows if r.get("positive_ratings", "").isdigit()]
    price_str = []
    for r in rows:
        try:
            price_str.append(float(r.get("price", 0)))
        except ValueError:
            pass

    most_rated = sorted(
        rows,
        key=lambda r: int(r.get("positive_ratings", 0)) if r.get("positive_ratings", "0").isdigit() else 0,
        reverse=True
    )[:10]

    summary = {
        "dataset": "nikdavis/steam-store-games",
        "title": "Steam Store Games Dataset",
        "license": "Attribution 4.0 International (CC BY 4.0)",
        "source": "https://www.kaggle.com/datasets/nikdavis/steam-store-games",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "steam.csv (main data; 5 additional files in metadata/ dir)",
        "file_size": csv_path.stat().st_size,
        "total_rows": len(rows),
        "columns": list(rows[0].keys()) if rows else [],
        "year_range": [min(years), max(years)] if years else None,
        "top_categories": dict(categories.most_common(10)),
        "top_genres": dict(genres.most_common(10)),
        "top_developers": dict(developers.most_common(10)),
        "top_publishers": dict(publishers.most_common(10)),
        "positive_rating_stats": {
            "min": min(positive_ratings), "max": max(positive_ratings),
            "mean": round(statistics.mean(positive_ratings), 1),
            "median": round(statistics.median(positive_ratings), 1),
        } if positive_ratings else None,
        "price_stats_usd": {
            "min": round(min(price_str), 2), "max": round(max(price_str), 2),
            "mean": round(statistics.mean(price_str), 2),
        } if price_str else None,
        "most_rated_games": [
            {"name": r["name"], "developer": r["developer"], "genres": r["genres"],
             "positive_ratings": r["positive_ratings"], "price": r.get("price", "0")}
            for r in most_rated
        ],
        "relevance": "Steam game metadata for engine adoption analysis (Godot/Unity/Unreal detection via categories/tags), developer/publisher ecosystem mapping, price and rating distributions.",
    }
    write_summary("steam-store", summary)


def process_steam_full_games():
    """Process fronkongames/steam-games-dataset (games.csv — 400 MB, streaming).

    NOTE: The CSV has column alignment issues when 'About the game' fields
    contain unescaped commas. We use positional column access (csv.reader)
    for the columns that matter (price, peak CCU, ratings, platforms) by
    detecting the True/False pattern for platform columns.
    """
    import csv as csv_mod
    csv_path = DATA_DIR / "steam-full" / "games.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = 0
    platforms = Counter()
    year_counts = Counter()
    price_buckets = Counter()
    ccu_buckets = Counter()
    positive_ratings = []
    negative_ratings = []
    prices = []
    years = []

    HEADER = None
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv_mod.reader(f)
        HEADER = next(reader)
        col = {name: i for i, name in enumerate(HEADER)}
        for fields in reader:
            rows += 1
            # NOTE: CSV has a consistent +1 field shift for all data rows due to
            # an extra unquoted comma in the "About the game" field (col 9).
            # Columns at index >= 9 need a +1 offset to read the correct field.
            offset = 1 if len(fields) == len(HEADER) + 1 else 0
            # Release year (col 2, before shift)
            try:
                rd = fields[col["Release date"]]
                # Format: "Aug 1, 2023" or "Jul 29, 2016"
                try:
                    y = int(rd.split(",")[-1].strip()[:4])
                    years.append(y)
                except (ValueError, IndexError):
                    pass
            except (KeyError, IndexError):
                pass

            # Price (col 7, before shift)
            try:
                p = float(fields[col["Price"]])
                prices.append(p)
                bucket = "free" if p == 0 else ("<10" if p < 10 else ("10-30" if p < 30 else ">30"))
                price_buckets[bucket] += 1
            except (ValueError, KeyError, IndexError):
                pass

            # Peak CCU (col 5, before shift)
            try:
                ccu = float(fields[col["Peak CCU"]])
                bucket = "<1k" if ccu < 1000 else ("1k-10k" if ccu < 10000 else ("10k-100k" if ccu < 100000 else ">100k"))
                ccu_buckets[bucket] += 1
            except (ValueError, KeyError, IndexError):
                pass

            # Positive/Negative ratings (cols 23/24, AFTER shift — need +1 offset)
            try:
                pr = fields[col["Positive"] + offset].replace(",", "")
                if pr.isdigit():
                    positive_ratings.append(int(pr))
            except (KeyError, IndexError):
                pass

            try:
                nr = fields[col["Negative"] + offset].replace(",", "")
                if nr.isdigit():
                    negative_ratings.append(int(nr))
            except (KeyError, IndexError):
                pass

            # Platform detection by column name — robust to value issues
            # NOTE: CSV has a consistent +1 field shift for all data rows due to
            # an extra unquoted comma in the "About the game" field.
            # Columns before "About the game" (index 9) are at correct positions.
            # Columns at/after Windows (index 16) need +1 offset.
            offset = 1 if len(fields) == len(HEADER) + 1 else 0
            for plat in ["Windows", "Mac", "Linux"]:
                idx = col[plat] + offset
                if idx < len(fields):
                    val = fields[idx].strip().lower()
                    if val in ("true", "1"):
                        platforms[plat] += 1

    summary = {
        "dataset": "fronkongames/steam-games-dataset",
        "title": "Steam Games Dataset (Full)",
        "license": "MIT",
        "source": "https://www.kaggle.com/datasets/fronkongames/steam-games-dataset",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "games.csv (401 MB) + games.json (918 MB, not processed)",
        "file_size_bytes": csv_path.stat().st_size,
        "total_games": rows,
        "columns": HEADER,
        "data_quality_note": "About-the-game column contains unescaped commas, causing DictReader column misalignment. Used csv.reader with explicit column-name-to-index mapping instead.",
        "year_range": [min(years), max(years)] if years else None,
        "platform_support": dict(platforms),
        "price_distribution": dict(price_buckets.most_common()),
        "peak_ccu_distribution": dict(ccu_buckets.most_common()),
        "rating_stats": {
            "positive": {
                "min": min(positive_ratings) if positive_ratings else 0,
                "max": max(positive_ratings) if positive_ratings else 0,
                "mean": round(statistics.mean(positive_ratings), 1) if positive_ratings else 0,
                "median": round(statistics.median(positive_ratings), 1) if positive_ratings else 0,
                "count": len(positive_ratings),
            },
            "negative": {
                "min": min(negative_ratings) if negative_ratings else 0,
                "max": max(negative_ratings) if negative_ratings else 0,
                "mean": round(statistics.mean(negative_ratings), 1) if negative_ratings else 0,
                "median": round(statistics.median(negative_ratings), 1) if negative_ratings else 0,
                "count": len(negative_ratings),
            },
        } if positive_ratings else None,
        "price_stats_usd": {
            "min": round(min(prices), 2) if prices else 0,
            "max": round(max(prices), 2) if prices else 0,
            "mean": round(statistics.mean(prices), 2) if prices else 0,
        } if prices else None,
        "relevance": "Full Steam catalog (125k+ games) for engine adoption analysis, pricing distribution (mean $4.81, 21% free), platform support, and peak concurrent user analysis. Note: ~30% of games have 0 peak CCU.",
    }
    write_summary("steam-full", summary)


def process_sudoku():
    """Process bryanpark/sudoku (sudoku.csv — 164 MB, streaming)."""
    csv_path = DATA_DIR / "puzzles" / "sudoku.csv"
    if not csv_path.exists():
        print(f"Skipping {csv_path} — not downloaded")
        return

    rows = 0
    quiz_lengths = Counter()
    solution_lengths = Counter()

    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows += 1
            q = r.get("quizzes", "")
            s = r.get("solutions", "")
            if q:
                quiz_lengths[len(q)] += 1
            if s:
                solution_lengths[len(s)] += 1
            if rows >= 100000:
                # Sample-based processing for large file
                pass

    summary = {
        "dataset": "bryanpark/sudoku",
        "title": "1 Million Sudoku Games",
        "license": "CC0-1.0",
        "source": "https://www.kaggle.com/datasets/bryanpark/sudoku",
        "source_date": datetime.now(timezone.utc).isoformat(),
        "local_file": "sudoku.csv",
        "file_size_bytes": csv_path.stat().st_size,
        "total_rows": rows,
        "columns": ["quizzes", "solutions"],
        "quiz_length_distribution": dict(quiz_lengths),
        "solution_length_distribution": dict(solution_lengths),
        "sample_quiz": "First quiz in file (from first row processed)",
        "relevance": "1M sudoku puzzles for procedural content generation research, constraint satisfaction algorithms, and puzzle-AI benchmarks.",
    }
    write_summary("sudoku", summary)


if __name__ == "__main__":
    process_videogame_sales()
    process_chess()
    process_board_games()
    process_vg_sales_2024()
    process_steam_store()
    process_steam_full_games()
    process_sudoku()
    print("Done.")
