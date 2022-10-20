#!/bin/bash
npm install
npm run migrate
ts-node src/server.ts