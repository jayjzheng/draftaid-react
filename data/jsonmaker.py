import sys
import csv
import json

players = {}
players['format'] = 'half_ppr'
players['rankings'] = []

with open(sys.argv[1], newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        player = {}
        player['position'] = row['Pos']
        player['name'] = row['Name']
        player['team'] = row['Team']
        player['rank'] = row['Rank']
        player['tier'] = row['Rank']
        player['bye_week'] = row['Bye']
        player['best_rank'] = row['Best']
        player['worst_rank'] = row['Worst']
        player['average_rank'] = row['Avg']
        player['std_dev'] = row['Std Dev']
        player['adp'] = row['ADP']
        player['vs_adp'] = row['vs. ADP']
        players['rankings'].append(player)

if __name__ == "__main__":
    with open('players.json', 'w') as outfile:
        json.dump(players, outfile)
    #print(json.dumps(players))#, indent=2))
