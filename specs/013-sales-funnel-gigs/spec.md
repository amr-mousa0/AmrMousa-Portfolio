# Specification: Comprehensive Sales Transformation

## 1. Feature Description
A complete architectural shift of the portfolio from a "Digital CV" to a "High-Converting Sales Funnel". This transformation prioritizes a Mobile-First experience, frictionless contact, and a structured customer journey. Critically, this shift will **strictly preserve the existing "Quiet Luxury" visual identity, color palette, typography, site icons, and the professional loading screen**.

## 2. Target Users & Value Proposition
- **Users**: Business owners, decision-makers, and clients suffering from operational bottlenecks, low sales, or poor data visibility.
- **Value**: Clear, actionable solutions combining Data Analytics (core) with Marketing and Tech development. The portfolio acts as a direct sales tool rather than a static showcase.

## 3. User Scenarios & Testing

### Scenario 1: The 3-Second Quick Pitch
- **Given** a new client lands on the site
- **When** they view the Hero / Intro section
- **Then** they immediately see a "Quick Pitch" that answers: What is the idea? What are the services? Who is the target? Who is Amr Mousa?

### Scenario 2: Domains & Gigs Discovery
- **Given** a client needs a specific problem solved (e.g., converting PDFs to Excel)
- **When** they scroll to the Services section
- **Then** they see broad domains (Data, Marketing) broken down into specific, highly requested "Gigs", making it easy to identify their exact need and buy.

### Scenario 3: Immersive Case Studies (Internal Projects)
- **Given** a client wants to see past work
- **When** they navigate the horizontal project slider and click a project
- **Then** the project opens internally (no external redirects). It acts as a Case Study (Problem, Solution, ROI), includes a "Back" button to return to the slider, and a direct CTA to buy.

### Scenario 4: Frictionless Contact
- **Given** a client decides to hire on a mobile device
- **When** they want to reach out
- **Then** they can tap a sticky WhatsApp/Call button at the bottom of the screen, instantly opening the communication app without filling out forms.

## 4. Functional Requirements
1. **Preserve Core Assets**: The professional Loader, existing color variables, typography, and site icons MUST remain completely intact.
2. **Quick Pitch Integration**: Implement a concise, high-impact introductory section.
3. **Services & Gigs Matrix**: Restructure services into Domains (Data Analysis, Social Media/Media Buying, Web/Tech) and Gigs (Dashboarding, PDF conversion, Ads strategy, CRM setup).
4. **Internal Project Viewer**: Implement a horizontal scroll slider for projects. Clicking a project must dynamically load an internal view (with a Back button) to keep the user in the funnel.
5. **Mobile-First CTAs**: Implement a sticky bottom bar exclusively for mobile containing direct WhatsApp and Phone dialer links.
6. **Education Section**: Deprioritize or visually minimize the Education section to maintain focus on sales.
7. **Comprehensive Testing**: Create a fully documented test file/script that outlines every interaction (Slider, Modal, Sticky CTA, Quick Pitch) to ensure everything works flawlessly on local testing before any deployment is manually done. CI/CD is explicitly out of scope.

## 5. Success Criteria
- **Visual Integrity**: 0% deviation from the original color palette and Quiet Luxury vibe.
- **Customer Journey**: 100% of project views occur within the site (0 external links).
- **Mobile Usability**: CTAs are accessible with one thumb movement at all times.

## 6. Assumptions & Framework Migration
- **Framework Migration**: The purely static Vanilla HTML/JS approach has been deemed too heavy to maintain for a growing sales funnel. We will migrate the existing UI to **Astro**, leveraging its "Zero-JS by default" architecture for lightning-fast performance, while using **React Components** (Astro Islands) for interactive parts like the Case Study Viewer and Projects Slider. Astro's native "View Transitions" will be used to maintain the seamless, cinematic SPA feel.
