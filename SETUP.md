# NestCalc Review Stack — Project Setup

This template provides the complete 8-agent review and 
operations system. Follow these steps to customize it for 
your project.

## Prerequisites
- Claude Code installed in VS Code
- GitHub CLI authenticated
- Netlify CLI connected

## Setup Order
1. CLAUDE.md — fill in all [PROJECT_NAME] placeholders
2. design-tokens.md — customize colors, typography, spacing
3. REVIEW.md — add project-specific review rules
4. .claude/commands/ — update file paths and domain references
5. .github/workflows/ — set SITE_URL and branch name
6. Cloud scheduled tasks — configure at claude.ai/code/scheduled

## Placeholders Used
- [PROJECT_NAME] — your project name (e.g., "NestCalc")
- [DOMAIN] — your production domain (e.g., "nestcalc.ai")
- [DOMAIN_EXPERTISE] — your subject matter expertise area
- [REFERENCE_COMPONENT] — the UI component that sets your 
  visual standard
- [BASELINE_BUNDLE_SIZE] — gzipped main bundle size in kB

## Estimated Setup Time
Under 1 hour for a new project.
