#!/bin/zsh
# Captures the site's phone screenshots from the simulator with the app's DEBUG
# launch arguments. Usage: [SHOT_NAME=x] [SHOT_WAIT=s] scripts/shots.sh <now|timeline|mentor|search> <light|dark> [extra args]
set -euo pipefail
SCREEN=$1; MODE=$2; shift 2
# SHOT_NAME overrides the file name, e.g. SHOT_NAME=mentor-week for -mentorPeriod week.
NAME=${SHOT_NAME:-$([[ $SCREEN == search ]] && echo capture || echo $SCREEN)}
OUT=static/images/screens; mkdir -p $OUT scratch
xcrun simctl ui booted appearance $MODE
xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 \
  --cellularBars 4 --wifiBars 3 --dataNetwork wifi
xcrun simctl launch --terminate-running-process booted com.daivatcreations.Meontor \
  -skipOnboarding -screen $SCREEN -mentor ai "$@" > /dev/null
sleep ${SHOT_WAIT:-6}
xcrun simctl io booted screenshot scratch/$NAME-$MODE.png > /dev/null 2>&1
magick scratch/$NAME-$MODE.png -resize 780x -quality 82 $OUT/$NAME-$MODE.webp
echo "$OUT/$NAME-$MODE.webp"
