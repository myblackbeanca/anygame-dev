"""Filter a `bird bookmarks --all` dump down to the game-related entries.

Reproduces docs/plans/data/game.txt, the source data behind /augusttrends:

    python3 scripts/filter-bookmarks.py /tmp/anygame-bm/all.txt

Pass --output to write elsewhere; the default target is the committed file so
a fresh dump can be diffed against it.
"""

import argparse
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT = REPO_ROOT / 'docs' / 'plans' / 'data' / 'game.txt'
SEPARATOR = '─' * 50

GAME_KW = re.compile(r'''
    \b(
      game(?:dev|s|play|ing|\s+development)|
      gaming|
      gamedev|
      indie\s+game|
      godot|
      unity(?:3d)?\s+(engine|game|asset|project)|
      unreal\s+engine|
      three\.?js|
      blender\s+(3d|game|model|asset)|
      roblox|
      procedural\s+(generation|world|terrain)|
      \bnpcs?\b|
      \bplayers?\b|
      \bgameplay\b|
      \bplaythrough\b|
      \bsprite\b|
      \bpixel\s+art\b|
      \bvoxel\b|
      \bopen[- ]?world\b|
      \bsandbox\s+game\b|
      \bshader\b|
      \bwebgl\b|
      \bmultiplayer\b|
      \bracing\s+game\b|
      \bdriving\s+game\b
    )\b
''', re.IGNORECASE | re.VERBOSE)

def parse(e):
    e = e.strip()
    if not e.startswith('@'):
        return None
    lines = e.split('\n')
    head = lines[0]
    m = re.match(r'^@(\S+)\s+\(([^)]+)\):\s*(.*)$', head)
    if not m:
        return None
    handle, name, firstline = m.group(1), m.group(2), m.group(3)
    body_lines = [firstline] + lines[1:]
    body = '\n'.join(l for l in body_lines if l and not l.startswith(('VIDEO:', 'PHOTO:', 'date:', 'url:', '> '))).strip()
    date_m = re.search(r'^date:\s*(.+)$', e, re.MULTILINE)
    url_m = re.search(r'^url:\s*(.+)$', e, re.MULTILINE)
    return {
        'handle': handle, 'name': name, 'body': body,
        'date': date_m.group(1).strip() if date_m else '',
        'url': url_m.group(1).strip() if url_m else '',
        'raw': e,
    }

# Twitter's format leads with the weekday, so a plain string sort orders by
# "Fri" < "Mon" < "Sat" and reports a range that never occurred.
def as_dt(d):
    return datetime.strptime(d, '%a %b %d %H:%M:%S %z %Y')


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('input', type=Path,
                    help='bookmark dump from `bird bookmarks --all`')
    ap.add_argument('-o', '--output', type=Path, default=DEFAULT_OUTPUT,
                    help=f'destination (default: {DEFAULT_OUTPUT})')
    args = ap.parse_args()

    try:
        txt = args.input.read_text()
    except OSError as err:
        sys.exit(f"filter-bookmarks: cannot read {args.input}: {err}")

    # Tolerate a longer rule than we emit; an exact-width split would leave
    # stray characters that fail the '@' guard and drop every later entry.
    entries = re.split(r'─{50,}', txt)
    parsed = [p for p in (parse(e) for e in entries) if p]
    print(f"Total parsed entries: {len(parsed)}")

    game_entries = [p for p in parsed
                    if GAME_KW.search(p['body'])
                    or GAME_KW.search(f"@{p['handle']} {p['name']}")]
    print(f"Game-related: {len(game_entries)}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('w') as f:
        for p in game_entries:
            f.write(f"@{p['handle']} ({p['name']}):\n{p['body']}\n"
                    f"date: {p['date']}\nurl: {p['url']}\n{SEPARATOR}\n\n")
    print(f"Wrote {len(game_entries)} entries to {args.output}")

    print("\n--- handles in game set ---")
    for h, n in Counter(p['handle'] for p in game_entries).most_common(25):
        print(f"  {n:3d}  @{h}")

    print("\n--- date range ---")
    dates = sorted((p['date'] for p in game_entries if p['date']), key=as_dt)
    if dates:
        print(f"  earliest: {dates[0]}")
        print(f"  latest:   {dates[-1]}")


if __name__ == '__main__':
    main()