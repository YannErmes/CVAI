# 🎯 Job Tweak Feature - What's New

## The Problem We Solved

**Before**: Users who already built their CV had no easy way to discover or use the "tweak for new job" feature. It was hidden and unclear.

**After**: A prominent, expandable "Tailor for a New Job" card sits right in the preview sidebar - impossible to miss.

---

## What Users See (Step by Step)

### Step 1: Preview Page - Discover the Feature
```
RIGHT SIDEBAR
│
├─ Select Template
├─ [NEW] 🎯 Tailor for a New Job ◀── ALWAYS VISIBLE
│   "Adjust your CV for a specific role"
│   💡 Click to reveal options
│
├─ Customize Colors
└─ Download CV
```

### Step 2: User Clicks the Card - It Expands
```
🎯 Tailor for a New Job ▼

How it works:
  ✓ Paste the job posting or job title
  ✓ AI will reword your CV to match the role
  ✓ Keep what's relevant, remove what's not
  ✓ Your original CV stays unchanged

Job Title or Job Description
┌────────────────────────────────┐
│ [Text input field here]        │
│ e.g., "Senior React Developer" │
└────────────────────────────────┘

Examples:
"Full-stack engineer with React" • "Data scientist in healthcare"

[Tweak My CV for This Job] ⚡
```

### Step 3: User Submits - AI Analyzes
```
Tailor CV for New Job

📋 Target Job:
"Senior Full-Stack Engineer at TechCorp..."

    ⏳ Analyzing job posting...
    AI is finding the best ways to tailor your CV
```

### Step 4: AI Returns Recommendations - User Selects
```
✓ AI found 3 ways to improve your CV for this role

┌─────────────────────────────────────────────────┐
│ ☑ Summary                                       │
├─────────────────────────────────────────────────┤
│ Current:                 │ ✨ Tailored:         │
│ Passionate and results-  │ Results-driven full- │
│ driven Full-Stack Dev    │ stack engineer with  │
│ with 6+ years...         │ expertise in React...│
│                          │                      │
│ (Original in gray box)   │ (Tweaked in green)   │
└─────────────────────────────────────────────────┘

☑ Skills
[Current vs. Tweaked comparison]

☑ Experience  
[Current vs. Tweaked comparison]

💡 You can uncheck any tweaks you don't like...

[← Back] [Discard] [✓ Apply (3 tweaks)]
```

### Step 5: Applied - Form Updates
```
When user clicks "Apply", the dialog closes and:

✓ Summary field updated with tweaked version
✓ Skills field updated with job-matched skills
✓ Experience field updated with reworded bullets

User is back in edit form and can:
- Review all changes
- Make manual adjustments
- Regenerate CV with new content
- Download updated CV
```

---

## The Magic Behind the Scenes

### JobTweakCard.tsx
**Purpose**: The sidebar "banner" that users see
- Always visible in preview
- Expandable/collapsible design
- Contains instructions and input field
- Friendly, eye-catching amber styling
- Shows examples of what to paste

### JobTweakDialog.tsx
**Purpose**: The modal that shows AI recommendations
- Displays loading spinner while AI analyzes
- Shows 2-3 tweaks in before/after format
- Allows user to select which tweaks to apply
- "Back" button to regenerate
- "Discard" to close without changes
- "Apply" button with live count

### Index.tsx Updates
**New Functions**:
- `tweakCVForNewJob()` - Calls Gemini API with smart prompt
- `applyJobTweaks()` - Updates form fields with selected tweaks

**Smart Prompt**:
```
Analyzes: current summary + current skills + current experience + target job

Returns: JSON with 2-3 specific tweaks showing:
  - field: which section (summary/skills/experience)
  - original: current text
  - tweaked: improved text
```

---

## Why This Design Works

✅ **Discoverability** - Card is always visible in preview sidebar
✅ **Simplicity** - Clear instructions, not hidden in menus
✅ **Transparency** - Before/after comparison, not AI black box
✅ **Control** - User chooses which tweaks to apply
✅ **Non-destructive** - Original CV data untouched unless user approves
✅ **Low friction** - Just paste job + click button
✅ **Smart defaults** - All tweaks pre-selected, user can uncheck

---

## User Scenarios

### Scenario 1: "I built my CV, now I have a job interview"
1. Generate CV normally ✓
2. Get job posting from recruiter
3. Go to Preview → expand JobTweakCard
4. Paste job posting → "Tweak My CV"
5. Review 3 AI tweaks
6. Apply all → CV automatically optimized for this specific job

### Scenario 2: "I'm not sure if I like the tweaks"
1. After seeing tweaks, click "Back"
2. Paste same job again
3. AI generates different tweaks (different wording)
4. Apply tweaks from second attempt

### Scenario 3: "I want to keep some tweaks but not others"
1. See 3 tweaks
2. Uncheck the "Experience" tweak (keep original)
3. Click "Apply (2 tweaks)" - only Summary and Skills update
4. Both versions of Experience available for comparison

---

## Technical Implementation

### State Management
```typescript
const [showTweakDialog, setShowTweakDialog] = useState(false);
const [tweakJobDescription, setTweakJobDescription] = useState("");
const [isTweaking, setIsTweaking] = useState(false);
```

### API Integration
- Uses Gemini 2.5-flash model (fast, cost-effective)
- Sends current CV + target job description
- Gets back structured JSON with tweaks
- No additional API credits beyond normal CV generation

### No Generation Limit Cost
- **Important**: Tweaking doesn't count against daily generation limit
- Users can tweak unlimited times with 1 generated CV
- Only full "Generate My CV" counts against 5/day limit

---

## Files Changed

**Created:**
- `src/components/JobTweakCard.tsx` (160 lines)
- `src/components/JobTweakDialog.tsx` (165 lines)

**Modified:**
- `src/pages/Index.tsx` (imports, state, functions, UI integration)

**Documentation:**
- `JOB_TWEAK_FEATURE.md` (this file)

---

## What Users Love About This

🎯 **Obvious** - Can't miss the card in the sidebar
🚀 **Fast** - 2-3 second AI analysis
✨ **Smart** - Specific, actionable suggestions
🎮 **Interactive** - See exactly what will change
🔄 **Flexible** - Pick and choose tweaks
💰 **Free** - No extra cost beyond API key
🛡️ **Safe** - Original CV untouched unless user approves

---

## Future Ideas

- 📌 Save favorite tweaks as templates
- 🔀 A/B test two different tweak approaches
- 📊 See tweak history for this CV
- 🏢 Pre-built tweaks for specific industries
- 🔗 Auto-extract job description from LinkedIn URL
- 📈 Analytics: "Top tweaks used by successful applicants"
