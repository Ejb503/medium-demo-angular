#!/bin/bash

pipe=/var/www/medium-demo-angular/server/blocks.fifo

trap "rm -f $pipe" EXIT

while true
do
    if read line <$pipe; then
        echo $line
    fi
done

echo "Reader exiting"

