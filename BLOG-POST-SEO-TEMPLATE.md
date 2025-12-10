# Blog Post SEO Template

Use this template for every blog post to ensure consistent SEO optimization.

---

## BLOG POST: [TITLE]

### SEO Metadata
- **Target Keyword:** [Primary keyword, 3-5 words]
- **LSI Keywords:** [3-5 related terms]
- **Word Count:** [Minimum 800, Target 1,200-1,500]
- **Reading Time:** [Est. minutes]
- **Author:** [Your name]
- **Publish Date:** [YYYY-MM-DD]
- **Internal Links:** [List pages to link to]

---

### Head Section (Copy-paste into meta tags)

```html
<title>[Primary Keyword] | [Sub-benefit] - CVAI</title>
<meta name="description" content="[Action verb] [keyword phrase]. Learn [key benefit] with our complete guide. Includes [tangible benefit], examples, and templates. [CTA]">
<meta name="keywords" content="[keyword], [LSI keyword], [LSI keyword], [related term]">
```

**Title Formula:** `[Keyword] | [Benefit] - CVAI` (under 60 characters)
**Example:** `How to Write a Resume | Complete Guide with Examples - CVAI`

**Description Formula:** `[Action] [keyword]. [Benefit]. [Contents]. [CTA]` (under 160 characters)
**Example:** `Learn how to write a professional resume with our complete guide. Includes ATS tips, real examples, and downloadable templates. Get started free.`

---

### H1 Tag (Headline)
**Formula:** Keyword + Benefit/Number + Strong Verb

**Options:**
- `How to [Action] Your [Goal]: Complete Guide with Examples`
- `[Number] Essential Tips for [Goal] That [Benefit]`
- `The Ultimate Guide to [Keyword]: From Beginner to Expert`
- `Why [Keyword] is Critical (And How to Master It in 5 Steps)`

**Example:** `How to Write a Professional Resume: Complete Step-by-Step Guide`

---

### Content Structure (H2 Tags)

**Section 1: Introduction (150-200 words)**
- H2: Introduction or Why This Matters
- Lead with pain point and solution
- Include target keyword in first 100 words
- End with what reader will learn

**Section 2: Main Content (600-1000 words)**
- Multiple H2 tags for subsections
- Each H2 covers one main idea
- Include at least 2 H3 tags per H2 section
- Use natural keyword placement
- Include examples and real-world scenarios

**Section 3: Practical Tips (300-400 words)**
- H2: "X Practical Tips/Best Practices"
- List format (bullets or numbered)
- Include actionable steps
- Relate back to main keyword

**Section 4: Common Mistakes (200-300 words)**
- H2: "Common Mistakes to Avoid"
- Address reader objections
- Provide solutions

**Section 5: Conclusion (150-200 words)**
- H2: "Conclusion & Next Steps"
- Summarize key points
- Strong CTA
- Link to related content

---

### Header Hierarchy Example

```
H1: How to Write a Professional Resume: Complete Step-by-Step Guide

H2: Introduction - Why Your Resume Matters
  (content)

H2: What Recruiters Actually Look For (In 6 Seconds)
  H3: Professional Formatting
  H3: Powerful Keywords
  H3: Quantifiable Results
  (content with examples)

H2: The 5-Section Resume Structure
  H3: 1. Contact Information
  H3: 2. Professional Summary
  H3: 3. Work Experience
  H3: 4. Education & Credentials
  H3: 5. Skills & Certifications
  (detailed breakdown with examples)

H2: ATS Optimization: 10 Essential Tips
  (list format with explanations)

H2: Common Resume Mistakes That Cost Interviews
  (mistakes and fixes)

H2: Final Checklist & Next Steps
  (actionable checklist)
```

---

### Keyword Placement Checklist

- [ ] Keyword in H1 tag
- [ ] Keyword in first 100 words of body
- [ ] Keyword in at least 2 H2 tags
- [ ] LSI keywords throughout (1-2 per 100 words)
- [ ] Keyword in bullet points (if applicable)
- [ ] Related keywords in natural places (NOT forced)
- [ ] Meta description includes keyword
- [ ] Meta title includes keyword

**Keyword Density:** Aim for 1-2% (50-100 instances for 2,500 word post)
**Important:** Never force keywords - write naturally first

---

### Internal Linking Strategy

**Must Include:**
1. Link to Resume Builder tool - Use anchor: "create your resume with CVAI"
2. Link to Templates page - Use anchor: "professional resume templates"
3. Link to FAQ page - Use anchor: "resume FAQs"
4. Link to 2-3 related blog posts

**Example Placement:**
```
Intro: "Read our [complete resume building guide](/blog/building-resume)"
Body: "All CVAI [resume templates] are ATS-optimized"
CTA: "Ready to build? [Create your resume free] today"
```

---

### Image & Media Requirements

**Featured Image:**
- **Dimensions:** 1200x630px (or 16:9 ratio)
- **Format:** JPG or WebP
- **Alt Text:** `[Title] - [Description]`
- **Example:** `Professional resume example showing ATS-friendly formatting`

**Body Images:**
- **Dimensions:** 800x600px minimum (for clarity)
- **Number:** 3-5 images throughout post
- **Alt Text Template:** `[Keyword] example - [description]`
- **File Names:** Use keywords: `professional-resume-example.jpg`

**Video (Optional):**
- Include if relevant (increases engagement)
- Embed or link to YouTube
- Add video schema markup
- Transcribe for SEO benefit

---

### SEO Checklist Before Publishing

**On-Page:**
- [ ] Title tag under 60 characters with keyword
- [ ] Meta description 150-160 characters
- [ ] H1 includes primary keyword
- [ ] Keyword in first paragraph
- [ ] H2 tags include LSI keywords
- [ ] Minimum 800 words (preferably 1,200+)
- [ ] Subheadings every 250-300 words
- [ ] Alt text on all images
- [ ] Internal links (3-5 minimum)
- [ ] Outbound links to authority (1-3)
- [ ] URL slug is descriptive (4-6 words)
- [ ] Canonical URL set
- [ ] Schema markup added (NewsArticle or Article)

**Technical:**
- [ ] Mobile responsive
- [ ] Page load time < 2 seconds
- [ ] No 404 links
- [ ] Images optimized (< 150kb each)
- [ ] Proper formatting (lists, bold, italics)
- [ ] Easy to scan (short paragraphs)

**Content Quality:**
- [ ] Answers search intent completely
- [ ] Includes real examples
- [ ] Includes practical, actionable advice
- [ ] Well-written and error-free
- [ ] Credible sources cited
- [ ] Matches search results (check SERP)

---

### Schema Markup Template

**For Blog Posts:**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "[Your H1 Title]",
  "description": "[Your meta description]",
  "image": {
    "@type": "ImageObject",
    "url": "https://YOUR_DOMAIN_HERE/image.jpg",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2024-[MM-DD]T08:00:00Z",
  "dateModified": "2024-[MM-DD]T08:00:00Z",
  "author": {
    "@type": "Person",
    "name": "[Your Name]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CVAI",
    "logo": {
      "@type": "ImageObject",
      "url": "https://YOUR_DOMAIN_HERE/logo.png"
    }
  }
}
```

---

### Post-Publication Tasks

**Week 1 (Launch):**
- [ ] Share on social media (3 posts minimum)
- [ ] Email to newsletter (if applicable)
- [ ] Link from homepage/blog homepage
- [ ] Monitor for errors or broken links
- [ ] Check Search Console for indexing

**Week 2-3 (Outreach):**
- [ ] Guest post on 2-3 industry blogs linking back
- [ ] Share in relevant communities (Reddit, Quora, forums)
- [ ] Outreach to 10 relevant websites for link placement
- [ ] Update internal links from older posts

**Week 4+ (Optimization):**
- [ ] Check rankings in Search Console (Week 3)
- [ ] Update if ranking for different keywords
- [ ] Add new information if search results improve
- [ ] Track engagement metrics
- [ ] Link from new related posts

---

### Blog Post Content Ideas by Topic

### PILLAR CONTENT (1,500-2,500 words, High authority)
1. How to Write a Professional Resume: Complete Guide
2. ATS Optimization Strategies: Get Your Resume Past Scanners
3. Resume Keywords That Get You Hired: Industry-by-Industry Guide

### CLUSTER CONTENT (800-1,200 words, Specific focus)
4. 10 Powerful Action Verbs for Your Resume
5. How to Quantify Your Achievements (With Real Examples)
6. Resume Structure: What Recruiters Actually Expect
7. Common Resume Mistakes Costing You Interviews
8. Entry-Level Resume Tips for First-Time Job Seekers
9. Career Change Resume: Stand Out to New Industries
10. Resume Formatting: Modern Best Practices 2024
11. Industry-Specific Resumes: Software Engineer Guide
12. Industry-Specific Resumes: Marketing Professional Guide
13. How Long Should Your Resume Be?
14. Resume vs CV: Key Differences Explained
15. Creating a Hybrid Resume Format (Advantages & Templates)

---

### Performance Targets (Post Publishing)

**Week 1:**
- 100-200 page views
- 10-20 social shares

**Week 4:**
- 500-1000 page views
- 30-50 total sessions
- 50-100 social shares

**Month 1:**
- 2,000+ page views
- Appearing in search results for target keyword
- 200-300 social shares

**Month 3:**
- 5,000+ page views
- Top 20 ranking for primary keyword
- 500+ social shares

**Month 6:**
- 10,000+ page views
- Top 10 ranking for primary keyword
- 1,000+ social shares

---

### Tools for Blog Optimization

**Free:**
- Google Trends - trending topics
- AnswerThePublic - question-based keywords
- Google Search Console - rank tracking
- Ubersuggest - keyword research
- Canva - image creation

**Paid (Recommended):**
- SEMrush - competitor analysis ($120+/mo)
- Ahrefs - backlink analysis ($99+/mo)
- Surfer SEO - content optimization ($89+/mo)
- SE Ranking - rank tracking ($55+/mo)

---

### Example Blog Post (Outline)

**Title:** `How to Quantify Your Achievements on Your Resume: 25+ Real Examples`

```
H1: How to Quantify Your Achievements on Your Resume: Complete Guide with 25+ Examples

H2: Why Numbers Matter on Your Resume
  - Recruiters spend 6 seconds on resumes
  - Numbers make impact clear
  - ATS optimization benefit
  
H2: The Formula for Quantifiable Achievements
  [Action Verb] [Task/Goal] by [Quantifiable Result] using [Method]
  
  H3: The Basic Structure
  [Example and explanation]
  
  H3: Common Metrics by Role
  [Sales, Marketing, Operations, etc.]

H2: 25 Real Examples by Industry
  H3: Software Engineers
  H3: Sales Professionals
  H3: Marketing Professionals
  H3: Project Managers
  H3: Financial Professionals

H2: Common Mistakes When Quantifying
  - Over-exaggerating numbers
  - Using too many metrics
  - Not explaining impact
  - [More mistakes]

H2: How to Find Your Numbers
  - Company data sources
  - Your own records
  - Using tools (Google Analytics, etc.)

H2: Putting It All Together
  [Complete resume section example with quantified bullets]

H2: Checklist & Next Steps
  [Action items for reader]
```

---

### Continuous Improvement

**Monthly Review:**
- [ ] Review top-performing pages (by traffic, conversions)
- [ ] Update evergreen content with new data
- [ ] Fix broken links
- [ ] Refresh meta descriptions if needed
- [ ] Add new examples or case studies
- [ ] Check for rank changes in Search Console

**Quarterly Review:**
- [ ] Comprehensive content audit
- [ ] Competitor analysis
- [ ] Topic gap analysis
- [ ] Plan next quarter's content
- [ ] Optimize poorly-performing posts

---

**Remember:** Write for users first, search engines second. The best SEO is high-quality, valuable content that people want to read and share.

---

For questions or template updates, refer to the main `SEO-IMPLEMENTATION-GUIDE.md` document.
