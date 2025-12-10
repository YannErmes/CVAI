# Job Tweak Feature - Implementation Guide

## Overview

The new **Job Tweak** feature provides users with an intuitive, discoverable way to tailor their already-built CV for a new job posting. It's designed to be obvious to even the least tech-savvy users.

## Components Created

### 1. **JobTweakCard.tsx** - Sidebar Discovery Component
- **Location**: Preview page, right sidebar
- **Visibility**: Always visible in the preview sidebar under "Color Customizer"
- **Design**: Eye-catching amber/orange gradient card with:
  - 🎯 Target icon and "Tailor for a New Job" title
  - Chevron (▼) to expand/collapse
  - Clear, friendly instructions (4-point list)
  - Input field for job title or description
  - "Quick Examples" section showing sample usage
  - "Tweak My CV for This Job" button with Zap icon

### 2. **JobTweakDialog.tsx** - Results Display Component
- **Purpose**: Shows AI-generated tweaks in a clear, selectable format
- **Workflow**:
  1. User enters job description → clicks "Generate Recommendations"
  2. AI analyzes job and current CV
  3. Dialog shows 2-3 "tweaks" with:
     - Current version (gray box)
     - Tweaked version (green box)
     - Checkbox to select/deselect each tweak
  4. User clicks "Apply (X tweaks)" → dialog closes and updates are applied to form
- **Design Features**:
  - Loading spinner with "Analyzing job posting..." message
  - Side-by-side comparison of original vs. tweaked text
  - Success message showing how many tweaks were found
  - "Back" button to generate new tweaks
  - "Discard" button to close without applying changes
  - "Apply" button (greyed out until tweaks selected)

### 3. **Updated Index.tsx** - Integration
- **New imports**: JobTweakCard, JobTweakDialog, TweakResult
- **New state**:
  - `showTweakDialog` - controls dialog visibility
  - `tweakJobDescription` - stores the job description
  - `isTweaking` - loading state
- **New functions**:
  - `tweakCVForNewJob(jobDesc)` - calls Gemini AI to generate tweaks
  - `applyJobTweaks(tweaks)` - applies selected tweaks to form fields

## User Workflow

### Scenario 1: User Already Generated CV, Found New Job

1. **User navigates to Preview page** → sees JobTweakCard in sidebar
2. **Clicks the card** → it expands showing instructions and input field
3. **Pastes job description** or types job title → "Tweak My CV for This Job" button
4. **Clicks button** → JobTweakDialog opens with loading spinner
5. **AI analyzes** for 2-3 seconds → JobTweakDialog displays 3 tweaks:
   - "Summary" - shows how to reword professional summary
   - "Skills" - shows which skills to emphasize
   - "Experience" - shows how to reframe key achievement
6. **Reviews each tweak** → can see original vs. tweaked side-by-side
7. **Checks boxes** to select which tweaks to keep
8. **Clicks "Apply (3 tweaks)"** → dialog closes, CV form updates
9. **Reviews changes** in the form → can edit further if needed
10. **Regenerates CV** with new content

### Scenario 2: User Doesn't Like First Set of Tweaks

1. **In JobTweakDialog**, click **"Back"** button
2. **Input changes** to original job description (remains)
3. **Click "Generate Recommendations"** again
4. **Get different AI-generated tweaks** (with varied wording/approach)
5. **Choose preferred tweaks** from new set

## AI Prompt Strategy

The `tweakCVForNewJob` function uses this strategy:

1. **Sends to Gemini AI**:
   - Current CV summary (full text)
   - Current experience descriptions
   - Current skills list
   - Target job description/title

2. **AI Returns JSON with tweaks**:
   ```json
   {
     "tweaks": [
       {
         "field": "summary",
         "original": "original text...",
         "tweaked": "reworded text..."
       },
       // ... more tweaks
     ]
   }
   ```

3. **Each tweak is a specific, actionable change** with before/after

## Key Design Decisions

✅ **Always visible** - JobTweakCard stays visible on every preview, so users discover it naturally

✅ **Expandable design** - Doesn't clutter the sidebar when collapsed; expands on-demand

✅ **Clear instructions** - Includes:
   - 4-step "How it works" guide
   - Example job titles/descriptions
   - Green success messaging

✅ **Side-by-side comparison** - Users see exactly what will change (not AI black box)

✅ **Selective application** - Users can pick and choose which tweaks to apply

✅ **Non-destructive** - Original CV data stays in form; tweaks only update if user applies them

✅ **No generation credit cost** - Tweaking is unlimited; only full CV generation costs daily credits

## Visual Mockup

```
┌─────────────────────────────────────┐
│ Preview Sidebar                     │
├─────────────────────────────────────┤
│                                     │
│ 🎯 Tailor for a New Job         ▼  │  ← JobTweakCard (collapsed)
│    Adjust your CV for a specific   │
│    role                            │
│    💡 Click to reveal options      │
│                                     │
│ Select Template                    │
│ ┌─────────────────────────────────┐│
│ │ [Modern] [Classic] [Creative]  ││
│ └─────────────────────────────────┘│
│                                     │
│ ▲ Customize Colors                 │
│ ...color options...                │
│                                     │
│ Download CV                        │
│ [PDF] [Word] [PNG]                │
│                                     │
└─────────────────────────────────────┘

--- AFTER EXPANDING JOBTWEAK CARD ---

┌─────────────────────────────────────┐
│ 🎯 Tailor for a New Job         ▲  │  ← Expanded
├─────────────────────────────────────┤
│ How it works:                       │
│ ✓ Paste job posting or job title  │
│ ✓ AI will reword your CV          │
│ ✓ Keep what's relevant            │
│ ✓ Your original CV stays unchanged│
│                                     │
│ Job Title or Description           │
│ ┌─────────────────────────────────┐│
│ │ [Input field...]                ││
│ └─────────────────────────────────┘│
│                                     │
│ Examples: "Senior React Dev" • ... │
│                                     │
│ [Tweak My CV for This Job]         │
│                                     │
└─────────────────────────────────────┘

--- JOBTWEAK DIALOG (During Generation) ---

Tailor CV for New Job
Your CV will be adjusted to match job requirements...

📋 Target Job:
"Senior Full-Stack Engineer with 5+ years React..."

    ⏳ Analyzing job posting...
    AI is finding the best ways to tailor your CV

[Back] [Cancel] [Loading...]

--- JOBTWEAK DIALOG (Results) ---

Tailor CV for New Job

✓ AI found 3 ways to improve your CV for this role

┌─────────────────────────────────────────┐
│ ☑ Summary                               │
│ ┌──────────────────────┬─────────────────┐
│ │ Current:             │ ✨ Tailored:    │
│ │ "Passionate dev...   │ "Results-driven │
│ │ "                    │ full-stack eng..│
│ │ (gray box)           │ (green box)     │
│ └──────────────────────┴─────────────────┘
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ☑ Skills                                │
│ ┌──────────────────────┬─────────────────┐
│ │ "JavaScript, React,  │ "React, Node.js,│
│ │  AWS, Docker..."     │  TypeScript..."  │
│ │ (gray box)           │ (green box)     │
│ └──────────────────────┴─────────────────┘
└─────────────────────────────────────────┘

💡 Tip: Uncheck any tweaks you don't like...

[Back] [Discard] [Apply (3 tweaks)]
```

## Files Modified/Created

### New Files:
- `src/components/JobTweakCard.tsx` - Sidebar discovery component
- `src/components/JobTweakDialog.tsx` - Results display and selection

### Modified Files:
- `src/pages/Index.tsx`:
  - Added imports for JobTweakCard, JobTweakDialog
  - Added state: `showTweakDialog`, `tweakJobDescription`, `isTweaking`
  - Added functions: `tweakCVForNewJob()`, `applyJobTweaks()`
  - Added JobTweakCard in preview sidebar
  - Added JobTweakDialog in preview view

## Testing Checklist

- [ ] Navigate to preview page after generating CV
- [ ] See JobTweakCard in sidebar with amber border
- [ ] Click card → expands showing input field
- [ ] Type job description → "Tweak My CV for This Job" button enables
- [ ] Click button → JobTweakDialog opens with loading spinner
- [ ] Wait for AI response → see 2-3 tweaks with before/after
- [ ] Uncheck one tweak → "Apply" button updates count
- [ ] Click "Apply" → dialog closes, form fields update
- [ ] Check form fields → original text replaced with tweaked version
- [ ] Click "Back" in dialog → returns to input step
- [ ] Click "Discard" → closes without applying changes
- [ ] Repeat with different job descriptions

## Future Enhancements

1. **Save tweak templates** - Store favorite job tailoring patterns
2. **Bulk tweaking** - Apply tweaks to multiple CV sections at once
3. **Tweak history** - See all previous tweaks applied to CV
4. **A/B comparison** - Generate 2 different tweak approaches and compare
5. **Industry templates** - Pre-built tweaks for specific job categories
6. **Smart detection** - Auto-extract job requirements from LinkedIn URLs
