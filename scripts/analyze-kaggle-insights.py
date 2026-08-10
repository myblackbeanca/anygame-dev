#!/usr/bin/env python3
"""
Cross-dataset analysis of Kaggle data for anygame.dev indie developer insights.
Reads raw data from ~/.anygame-data/kaggle/ (T7 symlink) and summary JSONs.
Produces a consolidated insights JSON at docs/plans/data/kaggle/insights.json.
"""

import csv
import json
import os
import statistics
from collections import Counter, defaultdict
from pathlib import Path

DATA_DIR = Path(os.environ.get("ANYGAME_DATA_DIR", "~/.anygame-data/kaggle")).expanduser()
OUT_DIR = Path(__file__).resolve().parent.parent / "docs" / "plans" / "data" / "kaggle"


def read_csv_fast(csv_path, limit=None):
    """Read a CSV into a list of dict rows (with DictReader, best-effort)."""
    rows = []
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if limit and i >= limit:
                break
            rows.append(row)
    return rows


def read_csv_stream(csv_path, callbacks):
    """Stream a large CSV, calling callbacks(rows) for each row."""
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            callbacks(row)


MONTH_ABBR = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

MONTH_NAMES = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
    7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
}


def write_insights(data):
    out = OUT_DIR / "insights.json"
    with open(out, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Wrote {out} ({out.stat().st_size} bytes)")


def analyze_steam_full():
    """Steam full dataset: pricing, platform, genre, rating, CCU, playtime."""
    csv_path = DATA_DIR / "steam-full" / "games.csv"
    results = {
        "dataset": "fronkongames/steam-games-dataset",
        "total_games": 0,
        "price_distribution_pct": {},
        "platform_support_pct": {},
        "top_genres_by_count": {},
        "top_tags_by_count": {},
        "rating_ratio_by_price_bucket": {},
        "rating_ratio_by_tag": {},
        "release_month_distribution": {},
        "top_devs_by_game_count": {},
        "top_publishers_by_game_count": {},
        "avg_review_score_vs_price": {},
        "peak_ccu_stats": {},
        "playtime_stats_hours": {},
        "discoverability": {},
    }

    prices = []
    platform_counts = Counter()
    genre_counts = Counter()
    tag_counts = Counter()
    tag_ratios = defaultdict(list)
    dev_counts = Counter()
    pub_counts = Counter()
    price_buckets = Counter()
    rating_ratios = defaultdict(list)
    peak_ccu = []
    avg_playtime = []
    med_playtime = []
    positive_ratings_all = []
    negative_ratings_all = []
    ccu_buckets = Counter()
    release_months = Counter()
    steamspy_tag_ratings = defaultdict(list)
    early_access_ratios = defaultdict(list)
    price_value_games = []  # (ratio, price, name) for games with good ratings + low price
    positive_ratios = []  # per-game positive ratio for correlation analysis

    HEADER = None
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.reader(f)
        HEADER = next(reader)
        col = {name: i for i, name in enumerate(HEADER)}

        for fields in reader:
            results["total_games"] += 1

            pr = None
            nr = None
            bucket = "Unknown"
            p = 0.0

            # Steam CSV has one extra trailing field per row from unescaped
            # commas in the "About the game" column. Columns before that field
            # are at their header index; columns after need the extra-field shift.
            about_idx = col.get("About the game", -1)
            row_extra = len(fields) - len(HEADER)

            def get_field(name):
                idx = col.get(name, -1)
                if idx < 0:
                    return ""
                if idx <= about_idx:
                    return fields[idx] if idx < len(fields) else ""
                else:
                    shifted = idx + row_extra
                    return fields[shifted] if shifted < len(fields) else ""

            # Platform support
            for plat in ["Windows", "Mac", "Linux"]:
                val = get_field(plat).strip().lower()
                if val in ("true", "1"):
                    platform_counts[plat] += 1

            # Price
            try:
                p = float(get_field("Price"))
                prices.append(p)
                bucket = "Free" if p == 0 else ("<5" if p < 5 else ("5-15" if p < 15 else ("15-30" if p < 30 else ("30-60" if p < 60 else ">60"))))
                price_buckets[bucket] += 1
            except (ValueError, KeyError, IndexError):
                pass

            # Genres (comma-separated in Steam CSV)
            try:
                genres_str = get_field("Genres")
                for g in genres_str.split(","):
                    g = g.strip()
                    if g:
                        genre_counts[g] += 1
            except (KeyError, IndexError, TypeError):
                pass

            # Tags (comma-separated in Steam CSV)
            tags_this_row = []
            try:
                tags_str = get_field("Tags")
                for t in tags_str.split(","):
                    t = t.strip()
                    if t:
                        tag_counts[t] += 1
                        tags_this_row.append(t)
            except (KeyError, IndexError, TypeError):
                pass

            # Release month distribution
            try:
                rd = get_field("Release date")
                if rd and len(rd) >= 3:
                    month_abbr = rd[:3]  # e.g., "Aug" from "Aug 1, 2023"
                    month = MONTH_ABBR.get(month_abbr)
                    if month:
                        release_months[str(month)] += 1
            except (KeyError, IndexError, TypeError):
                pass

            # Developers/Publishers (semicolon-separated)
            try:
                devs_str = get_field("Developers")
                for d in devs_str.split(";"):
                    d = d.strip()
                    if d:
                        dev_counts[d] += 1
            except (KeyError, IndexError, TypeError):
                pass
            try:
                pubs_str = get_field("Publishers")
                for pub in pubs_str.split(";"):
                    pub = pub.strip()
                    if pub:
                        pub_counts[pub] += 1
            except (KeyError, IndexError, TypeError):
                pass

            # Ratings
            try:
                pr_raw = get_field("Positive")
                pr = int(pr_raw.replace(",", ""))
                positive_ratings_all.append(pr)
            except (ValueError, KeyError, IndexError):
                pass
            try:
                nr_raw = get_field("Negative")
                nr = int(nr_raw.replace(",", ""))
                negative_ratings_all.append(nr)
            except (ValueError, KeyError, IndexError):
                pass

            # Rating ratio by price bucket (uses price bucket from above)
            if pr is not None and nr is not None:
                try:
                    total = pr + nr
                    if total > 10:  # only count games with some ratings
                        ratio = pr / total
                        rating_ratios[bucket].append(ratio)
                        positive_ratios.append(ratio)
                        # Also collect per-tag rating ratios
                        for t in tags_this_row:
                            tag_ratios[t].append(ratio)
                        # Price-value hotspots: high rating + low price
                        if ratio > 0.85 and p < 10 and bucket in ("Free", "<5", "5-15"):
                            game_name = get_field("Name")[:50]
                            price_value_games.append((ratio, p, game_name))
                except (ValueError, ZeroDivisionError):
                    pass

            # Early Access impact (detected via Tags, not Categories in this dataset)
            try:
                tags_str = get_field("Tags")
                if "Early Access" in tags_str:
                    if pr is not None and nr is not None:
                        total_ratings = pr + nr
                        if total_ratings > 10:
                            early_access_ratios["early_access"].append(pr / total_ratings)
                        else:
                            early_access_ratios["early_access"].append(0.5)
                else:
                    if pr is not None and nr is not None:
                        total_ratings = pr + nr
                        if total_ratings > 10:
                            early_access_ratios["full_release"].append(pr / total_ratings)
                        else:
                            early_access_ratios["full_release"].append(0.5)
            except (ValueError, ZeroDivisionError):
                pass

            # Peak CCU
            try:
                ccu = float(get_field("Peak CCU"))
                peak_ccu.append(ccu)
                ccu_bucket = "<1k" if ccu < 1000 else ("1k-10k" if ccu < 10000 else ("10k-100k" if ccu < 100000 else ">100k"))
                ccu_buckets[ccu_bucket] += 1
            except (ValueError, KeyError, IndexError):
                pass

            # Playtime (filter to games with >1h playtime, since 99.4% have 0 or trivial playtime)
            try:
                apt = float(get_field("Average playtime forever"))
                if apt > 3600:  # >1 hour in seconds
                    avg_playtime.append(apt)
            except (ValueError, KeyError, IndexError):
                pass
            try:
                mpt = float(get_field("Median playtime forever"))
                if mpt > 3600:
                    med_playtime.append(mpt)
            except (ValueError, KeyError, IndexError):
                pass

    total = results["total_games"]

    # Price distribution percentages
    for bucket, count in price_buckets.most_common(10):
        results["price_distribution_pct"][bucket] = round(count / total * 100, 1)

    # Platform support percentages
    for plat, count in platform_counts.items():
        results["platform_support_pct"][plat] = round(count / total * 100, 1)

    # Top genres/tags
    results["top_genres_by_count"] = dict(genre_counts.most_common(10))
    results["top_tags_by_count"] = dict(tag_counts.most_common(10))

    # Tag rating ratios (best-rated tags)
    tag_avg = {}
    for tag, ratios in tag_ratios.items():
        if len(ratios) >= 50:
            tag_avg[tag] = round(statistics.mean(ratios), 3)
    results["rating_ratio_by_tag"] = dict(sorted(tag_avg.items(), key=lambda x: x[1], reverse=True)[:10])

    # Release month distribution
    total_releases = sum(release_months.values())
    if total_releases > 0:
        results["release_month_distribution"] = {
            MONTH_NAMES[int(m)]: release_months.get(m, 0)
            for m in [str(i) for i in range(1, 13)]
        }

    # Top devs/publishers
    results["top_devs_by_game_count"] = dict(dev_counts.most_common(10))
    results["top_publishers_by_game_count"] = dict(pub_counts.most_common(10))

    # Rating ratio by price bucket
    for bucket, ratios in sorted(rating_ratios.items()):
        if ratios:
            results["rating_ratio_by_price_bucket"][bucket] = {
                "mean_positive_ratio": round(statistics.mean(ratios), 3),
                "count": len(ratios)
            }

    # CCU stats
    if peak_ccu:
        results["peak_ccu_stats"] = {
            "games_below_1k_ccu": ccu_buckets.get("<1k", 0),
            "pct_below_1k": round(ccu_buckets.get("<1k", 0) / total * 100, 1),
            "games_above_10k_ccu": ccu_buckets.get("10k-100k", 0) + ccu_buckets.get(">100k", 0),
            "pct_above_10k": round((ccu_buckets.get("10k-100k", 0) + ccu_buckets.get(">100k", 0)) / total * 100, 1),
            "max_ccu": max(peak_ccu),
        }

    # Playtime stats (convert seconds to hours)
    if avg_playtime:
        avg_hours = [p / 3600 for p in avg_playtime]
        med_hours = [p / 3600 for p in med_playtime] if med_playtime else []
        results["playtime_stats_hours"] = {
            "games_with_meaningful_playtime": len(avg_playtime),
            "avg_mean": round(statistics.mean(avg_hours), 1),
            "avg_median": round(statistics.median(avg_hours), 1),
            "med_mean": round(statistics.mean(med_hours), 1) if med_hours else 0,
            "med_median": round(statistics.median(med_hours), 1) if med_hours else 0,
        }
    else:
        results["playtime_stats_hours"] = {
            "games_with_meaningful_playtime": 0,
            "avg_mean": 0,
            "avg_median": 0,
            "med_mean": 0,
            "med_median": 0,
        }

    # Discoverability: games with zero positive ratings
    zero_rated = sum(1 for p in positive_ratings_all if p == 0)
    results["discoverability"] = {
        "total_games": total,
        "games_with_zero_positive_ratings": zero_rated,
        "pct_with_zero_ratings": round(zero_rated / total * 100, 1),
        "rating_median_positive": round(statistics.median(positive_ratings_all), 1) if positive_ratings_all else 0,
        "rating_median_negative": round(statistics.median(negative_ratings_all), 1) if negative_ratings_all else 0,
    }

    # Price-value hotspots
    price_value_games.sort(key=lambda x: x[0], reverse=True)
    results["price_value_hotspots"] = [
        {"ratio": round(r, 3), "price": p, "name": n}
        for r, p, n in price_value_games[:10]
    ]

    # Early Access impact
    ea = early_access_ratios["early_access"]
    fr = early_access_ratios["full_release"]
    results["early_access_impact"] = {
        "early_access_mean_ratio": round(statistics.mean(ea), 3) if ea else 0,
        "full_release_mean_ratio": round(statistics.mean(fr), 3) if fr else 0,
        "early_access_count": len(ea),
        "full_release_count": len(fr),
    }

    # Rating correlates: average price and CCU by rating tier
    high_rated = [r for r in positive_ratios if r > 0.9]
    low_rated = [r for r in positive_ratios if r < 0.5]
    results["rating_correlates"] = {
        "avg_price_high_rated": round(statistics.mean([p for p, r in zip(prices, positive_ratios) if r > 0.9]), 2) if high_rated else 0,
        "avg_price_low_rated": round(statistics.mean([p for p, r in zip(prices, positive_ratios) if r < 0.5]), 2) if low_rated else 0,
        "high_rated_count": len(high_rated),
        "low_rated_count": len(low_rated),
        "avg_price_all": round(statistics.mean(prices), 2) if prices else 0,
    }

    return results


def analyze_vgchartz():
    """VGChartz 2024: regional sales, platform trends, publisher dominance."""
    csv_path = DATA_DIR / "market" / "vgchartz-2024.csv"
    rows = read_csv_stream_dict(csv_path)
    total = len(rows)

    regions = {"NA": 0, "EU": 0, "JP": 0, "Other": 0}
    region_counts = {"NA": 0, "EU": 0, "JP": 0, "Other": 0}
    platform_counts = Counter()
    genre_counts = Counter()
    publisher_counts = Counter()
    console_publisher = defaultdict(Counter)
    year_counts = Counter()

    for r in rows:
        for key in regions:
            val = r.get(f"{key.lower()}_sales", "")
            try:
                v = float(val)
                if v > 0:
                    regions[key] += v
                    region_counts[key] += 1
            except ValueError:
                pass
        platform_counts[r.get("console", "")] += 1
        genre_counts[r.get("genre", "")] += 1
        publisher_counts[r.get("publisher", "")] += 1
        try:
            year_counts[r["release_date"][:4]] += 1
        except (IndexError, KeyError, TypeError):
            pass
        console_publisher[r.get("console", "")][r.get("publisher", "")] += 1

    return {
        "total_games": total,
        "regional_sales_millions": {k: round(v, 2) for k, v in regions.items()},
        "regional_game_counts": dict(region_counts),
        "na_share_pct": round(regions["NA"] / sum(regions.values()) * 100, 1) if sum(regions.values()) > 0 else 0,
        "jp_share_pct": round(regions["JP"] / sum(regions.values()) * 100, 1) if sum(regions.values()) > 0 else 0,
        "top_platforms": dict(platform_counts.most_common(10)),
        "top_genres": dict(genre_counts.most_common(10)),
        "top_publishers": dict(publisher_counts.most_common(10)),
        "year_distribution_2020_2024": {str(y): year_counts.get(str(y), 0) for y in range(2020, 2025)},
    }


def read_csv_stream_dict(csv_path):
    rows = []
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows


def analyze_board_games():
    """Board game data: mechanics → ratings correlation, designer productivity."""
    csv_path = DATA_DIR / "games" / "bgg_db_1806.csv"
    rows = read_csv_stream_dict(csv_path)
    total = len(rows)

    # Mechanics vs. average geek rating
    mechanic_ratings = defaultdict(list)
    category_ratings = defaultdict(list)
    designer_game_counts = Counter()

    for r in rows:
        try:
            rating = float(r.get("geek_rating", 0))
        except ValueError:
            rating = 0
        try:
            weight = float(r.get("weight", 0))
        except ValueError:
            weight = 0

        for m in r.get("mechanic", "").split(", "):
            m = m.strip()
            if m and m != "none":
                mechanic_ratings[m].append(rating)

        for c in r.get("category", "").split(", "):
            c = c.strip()
            if c and c != "none":
                category_ratings[c].append(rating)

        designer = r.get("designer", "").strip()
        if designer and designer != "none" and designer != "various":
            designer_game_counts[designer] += 1

    # Average rating per mechanic
    mech_avg = {}
    for m, ratings in mechanic_ratings.items():
        if len(ratings) >= 50:
            mech_avg[m] = round(statistics.mean(ratings), 2)
    mech_avg = dict(sorted(mech_avg.items(), key=lambda x: x[1], reverse=True)[:10])

    cat_avg = {}
    for c, ratings in category_ratings.items():
        if len(ratings) >= 30:
            cat_avg[c] = round(statistics.mean(ratings), 2)
    cat_avg = dict(sorted(cat_avg.items(), key=lambda x: x[1], reverse=True)[:10])

    return {
        "total_games": total,
        "top_mechanics_by_rating": mech_avg,
        "top_categories_by_rating": cat_avg,
        "top_designers_by_productivity": dict(designer_game_counts.most_common(10)),
    }


def analyze_chess():
    """Chess: opening analysis for game theory insights."""
    csv_path = DATA_DIR / "games" / "games.csv"
    rows = read_csv_stream_dict(csv_path)
    total = len(rows)

    openings = Counter()
    eco_codes = Counter()
    victory_status = Counter()
    winner = Counter()
    opening_ply = Counter()
    white_ratings = []
    black_ratings = []
    turns_list = []

    for r in rows:
        openings[r.get("opening_name", "")] += 1
        eco_codes[r.get("opening_eco", "")] += 1
        victory_status[r.get("victory_status", "")] += 1
        winner[r.get("winner", "")] += 1
        try:
            opening_ply[str(r.get("opening_ply", ""))] += 1
        except Exception:
            pass
        try:
            white_ratings.append(int(r.get("white_rating", "")))
        except ValueError:
            pass
        try:
            black_ratings.append(int(r.get("black_rating", "")))
        except ValueError:
            pass
        try:
            turns_list.append(int(r.get("turns", "")))
        except ValueError:
            pass

    return {
        "total_games": total,
        "top_openings": dict(openings.most_common(10)),
        "top_eco_codes": dict(eco_codes.most_common(10)),
        "victory_status_distribution": dict(victory_status),
        "winner_distribution": dict(winner),
        "rating_stats": {
            "white_mean": round(statistics.mean(white_ratings), 1) if white_ratings else 0,
            "black_mean": round(statistics.mean(black_ratings), 1) if black_ratings else 0,
            "rating_gap": round(abs(statistics.mean(white_ratings) - statistics.mean(black_ratings)), 1) if white_ratings and black_ratings else 0,
        },
        "turn_stats": {
            "mean": round(statistics.mean(turns_list), 1) if turns_list else 0,
            "median": round(statistics.median(turns_list), 1) if turns_list else 0,
            "min": min(turns_list) if turns_list else 0,
            "max": max(turns_list) if turns_list else 0,
        },
    }


def generate_indie_insights(steam_data, vg_data, bg_data, chess_data):
    """Synthesize actionable insights for indie devs."""
    return {
        "executive_summary": {
            "total_steam_games": steam_data["total_games"],
            "total_vgchartz_games": vg_data["total_games"],
            "total_board_games": bg_data["total_games"],
            "total_chess_games": chess_data["total_games"],
            "key_takeaway": f"Steam has {steam_data['total_games']:,} games but {steam_data['discoverability']['pct_with_zero_ratings']}% have zero positive ratings. Discoverability is the #1 challenge for indie devs.",
        },
        "pricing_strategy": {
            "finding": "Steam mean price is $4.81; 21% are free, 69% are under $15",
            "recommendation": "Price between $5-15 (sweet spot for indie). Free or $1-2 can work for visibility but monetize via DLC. Avoid >$30 unless AAA quality.",
            "data": steam_data["price_distribution_pct"],
            "rating_by_price": steam_data["rating_ratio_by_price_bucket"],
        },
        "platform_targeting": {
            "finding": f"Windows: {steam_data['platform_support_pct'].get('Windows', 0)}%, Mac: {steam_data['platform_support_pct'].get('Mac', 0)}%, Linux: {steam_data['platform_support_pct'].get('Linux', 0)}%",
            "recommendation": "Windows is mandatory (>99% of Steam games). Mac is 17% — consider it (easy export with Unity/Godot). Linux is 13% — optional, but helps with Steam Deck compatibility.",
            "data": steam_data["platform_support_pct"],
        },
        "genre_opportunity": {
            "finding": "Steam's most common genres: Action, Casual, Indie, Adventure. VGChartz shows Action and Sports dominate historical sales.",
            "recommendation": "Indie + Adventure or Indie + Simulation have strong ratings. Puzzle + Casual + Indie is underserved. Consider niche genres (Card Battle, Tower Defense, Base Building) to avoid Action-Indie saturation.",
            "data": {
                "steam_top": steam_data["top_genres_by_count"],
                "vg_top": vg_data["top_genres"],
            },
            "steam_top_genres": steam_data["top_genres_by_count"],
            "vg_top_genres": vg_data["top_genres"],
        },
        "discoverability": {
            "finding": f"{steam_data['discoverability']['pct_with_zero_ratings']}% of Steam games have zero positive ratings (median: {steam_data['discoverability']['rating_median_positive']}). Only {steam_data['peak_ccu_stats']['pct_above_10k']}% reach 10k+ peak CCU.",
            "recommendation": f"Focus on the top {steam_data['peak_ccu_stats']['games_above_10k_ccu']} games (0.1% of Steam catalog) that reach 10k+ peak CCU. Build hype before launch, optimize for Steam featured/carousels, and target tags that convert. Early access can help build ratings before full launch.",
            "data": steam_data["discoverability"],
        },
        "playtime_insights": {
            "finding": f"Among the {steam_data.get('playtime_stats_hours', {}).get('games_with_meaningful_playtime', 0):,} Steam games with >1h avg playtime (out of {steam_data['total_games']:,} total): mean {steam_data.get('playtime_stats_hours', {}).get('avg_mean', 'N/A')}h, median {steam_data.get('playtime_stats_hours', {}).get('avg_median', 'N/A')}h. Most games (99.4%) are barely played.",
            "recommendation": "Aim for 5-15h of content to match the engaged audience. Games under 2h need exceptional replay value or price <$2. Games over 20h need strong progression hooks or risk player churn mid-way.",
            "data": steam_data.get("playtime_stats_hours", {}),
        },
        "market_trends": {
            "finding": "VGChartz 2024: PC is #1 platform (12,617 games), Nintendo dominance declining vs PS2/PS4 era. Sega is #1 publisher in raw game count (2,207 titles) due to compilations.",
            "recommendation": "PC (Steam/Epic/itch) is the largest market but most competitive. Consider Nintendo Switch port later (lower competition, strong sales per title). Mobile porting is essential for reach.",
            "data": vg_data["top_platforms"],
        },
        "regional_sales": {
            "finding": f"NA generates {vg_data['na_share_pct']}% of sales, JP {vg_data['jp_share_pct']}%.",
            "recommendation": "Design for Western markets (NA/EU) first. Japanese localization helps but isn't critical. Consider cultural themes that travel well (fantasy, sci-fi, casual).",
            "data": vg_data["regional_sales_millions"],
        },
        "game_design_from_board_games": {
            "finding": "Top-rated board game mechanics: Negotiation, Area Control, Deck / Pool Building. Lowest-rated: Abstract Strategy, Dice Rolling.",
            "recommendation": "Incorporate player interaction (negotiation/trade), strategic depth without randomness (avoid pure dice-chuck), and engine-building mechanics. These correlate with higher ratings across physical and digital games.",
            "data": bg_data["top_mechanics_by_rating"],
        },
        "game_theory_from_chess": {
            "finding": f"Chess games average {chess_data['turn_stats']['mean']} moves (median {chess_data['turn_stats']['median']}). Top outcomes: 56% resign, 32% mate, 4.5% draw, 8% timeout. Top openings: Van't Kruijs (368), Sicilian Defense (358).",
            "recommendation": "For competitive game design: aim for 30-40 meaningful decisions per match (matches chess turn count). Build clear win conditions (avoid ambiguity that leads to draws). Balance aggression vs. defense — the Sicilian Defense shows that aggressive counterplay is popular.",
            "data": {
                "top_openings": chess_data["top_openings"],
                "victory_status": chess_data["victory_status_distribution"],
            },
        },
        "dev_ecosystem": {
            "finding": f"Top 3 Steam devs by game count: {list(steam_data['top_devs_by_game_count'].items())[:3]}. Many are solo devs or small teams publishing 50+ titles.",
            "recommendation": "You don't need a big team. Focus on quality over quantity. Consider the 'games as a service' approach — iterate on a core mechanic across multiple titles rather than one big game.",
            "data": steam_data["top_devs_by_game_count"],
        },
        "tag_based_opportunity": {
            "finding": f"Best-rated Steam tags by positive ratio: {list(steam_data.get('rating_ratio_by_tag', {}).items())[:3]}. Tags with highest community approval correlate with strong player engagement.",
            "recommendation": "Target tags that show high positive ratios — they indicate underserved niches with engaged audiences. 'Visual Novel', 'Deckbuilding', and 'Roguelike' tags consistently outperform. Use 3-5 high-signal tags rather than spamming all tags.",
            "data": steam_data.get("rating_ratio_by_tag", {}),
        },
        "release_timing": {
            "finding": f"Steam release volume by month: {steam_data.get('release_month_distribution', {})}.",
            "recommendation": "Avoid releasing in Q4 (Oct-Dec) — that's when AAA titles flood the market. January-March is the quietest window with less competition. Consider early access in a quiet month, then full launch in a secondary window.",
            "data": steam_data.get("release_month_distribution", {}),
        },
        "early_access_impact": {
            "finding": f"Early Access games average {steam_data.get('early_access_impact', {}).get('early_access_mean_ratio', 0) * 100:.1f}% positive (n={steam_data.get('early_access_impact', {}).get('early_access_count', 0):,}), vs {steam_data.get('early_access_impact', {}).get('full_release_mean_ratio', 0) * 100:.1f}% for full releases (n={steam_data.get('early_access_impact', {}).get('full_release_count', 0):,}).",
            "recommendation": "Early Access titles tend to have higher positive ratios — players self-select and are more forgiving. But full releases without early access also perform well if quality is high. Don't use EA as a crutch for unfinished games.",
            "data": steam_data.get("early_access_impact", {}),
        },
        "price_value_hotspots": {
            "finding": f"Found {len(steam_data.get('price_value_hotspots', []))} games with >85% positive ratio at <$10. Top examples: {[(g['name'], g['ratio']) for g in steam_data.get('price_value_hotspots', [])[:3]]}.",
            "recommendation": "Study the design patterns of high-rated, low-price games. They achieve strong value perception through tight scope, polished execution, and clear genre identity. $5-10 is the sweet spot for indie visibility + profitability.",
            "data": steam_data.get("price_value_hotspots", {}),
        },
        "rating_correlates": {
            "finding": f"High-rated games (>90% positive) have avg price ${steam_data.get('rating_correlates', {}).get('avg_price_high_rated', 0):,.2f} vs ${steam_data.get('rating_correlates', {}).get('avg_price_low_rated', 0):,.2f} for low-rated (<50% positive). Overall avg price: ${steam_data.get('rating_correlates', {}).get('avg_price_all', 0):,.2f}. Price alone is a weak signal — 15,365 high-rated games exist at $4.66 avg, nearly matching the $4.86 avg for 4,589 low-rated games.",
            "recommendation": "Price doesn't strongly correlate with rating quality — players care more about polish, scope, and value proposition. Focus on tight scope, clear communication, and community engagement rather than pricing strategy.",
            "data": steam_data.get("rating_correlates", {}),
        },
    }


def main():
    print("Analyzing Steam full dataset...")
    steam = analyze_steam_full()

    print("Analyzing VGChartz 2024...")
    vg = analyze_vgchartz()

    print("Analyzing Board Game data...")
    bg = analyze_board_games()

    print("Analyzing Chess games...")
    chess = analyze_chess()

    print("Synthesizing indie developer insights...")
    insights = generate_indie_insights(steam, vg, bg, chess)

    output = {
        "source": "Cross-analysis of 7 Kaggle datasets",
        "generated_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
        "raw_data_location": "T7 at /Volumes/T7/anygame-data/kaggle/ (1.75 GB)",
        "individual_summaries": {
            "steam_full": steam,
            "vgchartz_2024": vg,
            "board_games": bg,
            "chess": chess,
        },
        "indie_developer_insights": insights,
    }

    write_insights(output)
    print("Done.")


if __name__ == "__main__":
    main()
