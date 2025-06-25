#!/bin/bash

# Sync upstream script for github-readme-stats fork
# This script helps keep your fork up to date with the upstream repository

set -e

echo "🔄 Starting upstream sync..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Add upstream remote if it doesn't exist
if ! git remote get-url upstream > /dev/null 2>&1; then
    echo "➕ Adding upstream remote..."
    git remote add upstream https://github.com/anuraghazra/github-readme-stats.git
else
    echo "✅ Upstream remote already exists"
fi

# Fetch latest changes from upstream
echo "📥 Fetching latest changes from upstream..."
git fetch upstream

# Get upstream default branch
echo "🔍 Determining upstream default branch..."
UPSTREAM_BRANCH=$(git ls-remote --symref upstream HEAD | grep ref: | cut -d/ -f3)
if [ -z "$UPSTREAM_BRANCH" ]; then
    # Fallback to master if we can't determine the default branch
    UPSTREAM_BRANCH="master"
fi
echo "📍 Using upstream branch: $UPSTREAM_BRANCH"

# Check if there are changes to merge
echo "🔍 Checking for changes to merge..."
if git log HEAD..upstream/$UPSTREAM_BRANCH --oneline | head -5; then
    echo ""
    echo "📋 Found changes from upstream:"
    git log HEAD..upstream/$UPSTREAM_BRANCH --oneline
    
    echo ""
    echo "🔄 Merging changes from upstream..."
    if git merge upstream/$UPSTREAM_BRANCH --no-edit; then
        echo "✅ Successfully merged upstream changes"
        
        echo ""
        echo "📤 Pushing changes to origin..."
        if git push origin "$CURRENT_BRANCH"; then
            echo "✅ Successfully pushed changes to origin"
            echo "🎉 Sync completed successfully!"
        else
            echo "❌ Failed to push changes to origin"
            echo "💡 You may need to push manually: git push origin $CURRENT_BRANCH"
            exit 1
        fi
    else
        echo "❌ Merge failed due to conflicts"
        echo "💡 Please resolve conflicts manually and then commit"
        echo "💡 You can also use the GitHub Actions workflow for automated sync"
        exit 1
    fi
else
    echo "✅ No changes to merge - fork is already up to date!"
fi

echo ""
echo "🎯 Sync process completed!" 