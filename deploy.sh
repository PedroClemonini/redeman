#!/bin/bash
# This script adds, commits, and pushes your code to the GitHub repository.

# Add all files to the staging area
git add .

# Commit the changes with a default message
# You can change the message by running: ./deploy.sh "Your custom message"
COMMIT_MESSAGE=${1:-"Update project files"}
git commit -m "$COMMIT_MESSAGE"

# Push the changes to the 'main' branch on GitHub
git push -u origin main

echo "Project successfully deployed to GitHub!"