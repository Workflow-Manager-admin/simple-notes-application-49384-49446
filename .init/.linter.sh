#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-notes-application-49384-49446/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

