#!/bin/bash

#react project build
npm run-script react-build

#package to dmg file
electron-builder build -m
