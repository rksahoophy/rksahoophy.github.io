#!/usr/bin/env bash
# Downloads your existing photos from Google Sites into assets/img/photos/.
# Run from the site root:  bash tools/fetch_images.sh
set -e
mkdir -p assets/img/photos
curl -fL -o assets/img/photos/profile.jpg "https://sites.google.com/sitesv-images-rt/APXyLQdEEF8_aeT8DV7YyGkaydPVxYPv806C60Xziedz63zdnikoIARcpNEsoXlBjBYIRWLL9q3iG2iwp2Mabwc_gFn5dx_f3gyz1uyt-KzMrN7B9yGBJyPi9TGwenf20Rjn0uztb8Ajwv5dpecl4ubEw_4YkkaJlQFcVp0Wk0ZajGJ59Hqa_wf-9T0A84RJtWaCXrhLJvgkM1lox6c5wyz-BF6X8jE4LpC4ffM87PoHWGg=w1280"
curl -fL -o assets/img/photos/gallery-2025-cyi-christmas.jpg "https://sites.google.com/sitesv-images-rt/APXyLQeFRO1E3RuftSVwJUBszVmoA5mJrdjTfCowhY8TIcJqkmMKrG1dmJ1AkKpUlvz3k83pJPuNbQspHJo6Bn08yYhKn--xBSV2bjFNZIay9w6yzkfrHNkOTw8ybDGDvX975KOygEhuTZStUi25dYmE3uxMhbVZGEr6OoqhpOa1InTTwWOF0A5L9Y3hHzlB85BNPTnyXlRnMrrfSyiKWFvjSef0U3FxA5pUr1b_srhm1DA=w1280"
curl -fL -o assets/img/photos/gallery-2025-simea-group.jpg "https://sites.google.com/sitesv-images-rt/APXyLQdlYyS407t8NpTyQeNthTML287iKGjT-MJMR5cvzPNY7VpwpKJvxQ2KYtyMr-_-X8VejUCias21fTTIhcHQt42dCDab92M1SQ55ZVTkEJ3CqOFx7B33SdzQFYxjOsF_j20rbuZ8yzGOaRJTtgfGNVh4ghiWecgUcf4Z7BSqtR_UndCKJPtkREGqkYuZ0uvGRWM9z7citBcMdaLRo0rw1k-dmzk2mYknNM2BWBRNyMs=w1280"
curl -fL -o assets/img/photos/gallery-2024-technion-group.jpg "https://sites.google.com/sitesv-images-rt/APXyLQc6fhH-O9kZJJGWxHtnNJ5veLL_8BlxyqZc4j7UvuRwVppVFbxfLzIHZfBA50RChqFk7_3OOpjL6SlEngVTiRL-KxSEqgTnLkuzX9pD1qbJAcmuI5N4-uOf-2PAxdM6nlwuuVj3hzKLHIVDm2uvCGQfaDksCtMXYsvad5RmsXM3m-IMKfg4gzZWRH5A_JVZntqBE9ntLTzdHPl8wOQaWwc1lO_1BR4HoyZQU6gHQHg=w1280"
curl -fL -o assets/img/photos/gallery-2023-phd-award.jpg "https://sites.google.com/sitesv-images-rt/APXyLQciQjVJZK-LQEpUhio-CZyXYi6-xONWUEQgHhex0ROGNWWbBVKvLpm9soy4H93G2VareFe6esi2xBfk31LoYVEIWHYgLhZpRyEJI93T7aLL9n-ph8Ym6HDe1xBu2txYDrwsfBP_cHl3YHs-7XPR67qFcjJE1Tr0iQrHOiR_zwdJDNtX9iJDc9n48W8vMKg=w1280"
curl -fL -o assets/img/photos/gallery-2023-rak-uae.jpg "https://sites.google.com/sitesv-images-rt/APXyLQdg53285aE4z4rwYGdSdJqzVa_vJvwgRKdcM-Nev85kA1GLoJUcTDBMswkDCHovc1-05XeiU1_mAmN_Xc3hpj2z2ZgyR6lYkGTFVx0IAr8ap8QlUMWbrSrme_6Q_8rhOhDp95tKShcKIyl4iA5fnNvW0FFOC-gqg1caCAMXZu7Dj8_Y-nREAik7oMuk=w1280"
curl -fL -o assets/img/photos/gallery-2018-cmrl-group.jpg "https://sites.google.com/sitesv-images-rt/APXyLQeLXBbwlgFxtx320vYeZAR6bSwa7iBxrUpmpW1OOAMTByfZjX_f0r2FJuQldU9okeGv7LeOu83G83qMS4XKnT1SYUOlWoU4HORqX-ZfdDiyUpM6g2BE7rxGJbmeP8tf7VYbSCEYqrK2xkmVJihwh7mZ5X5AKojkj-0xgt1ZKpTGDlNXX7mt4BSVs7Z6_Kf27FSfd5YKENcULV-6n0WeCHPGKeb0fptBFGcnJGzKGOs=w1280"
echo "Done. Photos saved in assets/img/photos/"
