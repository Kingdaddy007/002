Here is a comprehensive, frame-by-frame analysis of the website experience captured in the second video (Concept B), documented for complete recreation.

### **1\. FIRST IMPRESSION (0-2 seconds)**

* **The Pre-loader:** The experience begins with a distinctive pre-loading animation on a solid white background. The letters "abv" sit on the far left edge, and "tek" on the far right. In the center is a small, square thumbnail image.  
* **The Merge:** The center image scales down and disappears while the "abv" and "tek" text swiftly translate toward each other, moving to the top-left corner to form the brand logo "abv//tek".  
* **Dominant Color:** Stark, high-contrast black and white.  
* **Hero Layout:** Full-viewport bleed. The background is a rapid cross-fade sequence of different architectural interior renders/photos.  
* **Typography:** A very clean, structured, bold neo-grotesque sans-serif (resembling Neue Haas Grotesk, Inter, or standard Helvetica).  
* **Headline Text:** Massive, white, uppercase, left-aligned text overlaying the background: "WHERE DESIGN MEET DATA WHERE IDEAS BECOME BUILT REALITIES".  
* **Navigation Bar:** Minimalist. Top left has the newly formed logo. Top right features "CONTACT US" and a standard three-line hamburger menu icon.  
* **Overall Mood:** Industrial, precise, tech-forward, and assertive.

### **2\. SCROLL BEHAVIOR — Section by Section**

**Section 1: The Hero (0:02 \- 0:14)**

* **Layout & Composition:** Full viewport height. The background media dominates. The giant typography sits centrally but aligned to the left grid line.  
* **Color & Light:** The background images (boardrooms, plant walls, neon red gyms) are slightly muted or have a subtle dark gradient overlay at the top to ensure the white header/nav text remains legible.  
* **Animation & Motion:** \- **Trigger:** Scroll-linked.  
  * **Action:** As the user scrolls down, the massive hero text translates upward (Y-axis) at a faster rate than the background scroll (parallax) and fades out (opacity to 0).

**Section 2: About / Introduction (0:14 \- 0:19)**

* **Layout & Composition:** A return to a solid white background. An asymmetrical two-column layout. Left side contains text; right side contains a large, sharp-edged landscape image of a lobby.  
* **Visual Weight:** The heavy, bold black text ("WE DESIGN ARCHITECTURE THAT TELLS STORIES.") grounds the left side, balancing the large image on the right.  
* **Animation & Motion:** \- **Trigger:** Viewport entry/Scroll-linked.  
  * **Action:** Vertical parallax. The image on the right scrolls upward at a slightly faster speed than the text on the left, creating a sense of depth and detachment from the document flow.

**Section 3: Pinned Project Galleries (0:19 \- 0:47)**  
*This is the core interactive pattern of the site, repeated three times with alternating layouts.*

* **Layout & Composition:** A dynamic split-screen experience. One side of the screen holds sticky/pinned text (Project Title and Description), while the other side acts as a vertical scrolling gallery of images for that project.  
  * **Project 1 (Greenstone):** Text pinned on the *right*. Images scroll up on the *left*.  
  * **Project 2 (INA Office):** Text pinned on the *left*. Images scroll up on the *right*.  
  * **Project 3 (Lucky Punch Gym):** Text pinned on the *right*. Images scroll up on the *left*.  
* **Whitespace:** Very structured. The layout relies on strict grid alignments. Unlike Concept A, there are **no rounded corners** here. Every image is a sharp, perfect rectangle.  
* **Typography:** The pinned project titles are large, uppercase, and tightly tracked.  
* **Animation & Motion:**  
  * **Trigger:** Scroll position (Pinning).  
  * **Action:** The text block hits the center of the viewport and locks into place (position: sticky or GSAP pin). As the user continues to scroll, the images in the adjacent column flow upward past the pinned text. Some images overlap each other slightly, and smaller images occasionally float up in the margins around the text. Once the image gallery for that project ends, the text block unpins and scrolls away.

**Section 4: Horizontal Services Scroll (0:47 \- 0:52)**

* **Layout & Composition:** A sudden, hard cut to a dark theme.  
* **Color & Light:** Solid black background (\#000000). Text and card borders are stark white.  
* **Structure:** Left side features sticky text: "DESIGN MEETS PURPOSE". The right side contains a horizontal track of service cards (Architecture, Construction, Fit-out, Consultancy).  
* **Animation & Motion:**  
  * **Trigger:** Scroll-linked pinning.  
  * **Action:** The entire black section pins to the viewport. As the user scrolls their wheel *down*, the track of cards on the right translates *left* (X-axis).  
  * **Card Design:** Transparent background, thin white borders (1px), geometric icons, and a "LEARN MORE" link with an arrow.

**Section 5: Footer & Contact (0:52 \- 1:00)**

* **Transition:** Hard cut back to a white background for a brief philosophy quote, followed by the black footer sliding up.  
* **Layout:** The footer is split. Left side has a large headline: "GREAT INTERIORS BEGINS WITH A CONVERSATION". Right side features a minimalist contact form (fields defined only by thin bottom borders).  
* **Typography/Branding:** The absolute bottom of the page is dominated by massive, edge-to-edge typography spelling out the "abv//tek" logo. It acts as the foundational baseline of the website.

### **3\. SECTION TRANSITIONS**

* Transitions in Concept B are abrupt and architectural. Rather than smooth gradient blends, this site relies on **hard cuts** (White to Black, Black to White) and strong horizontal ruled lines between project sections. The transitions feel engineered and deliberate.

### **4\. GLOBAL PATTERNS**

* **Design System:**  
  * **Shape:** The defining rule is the **sharp corner**. Everything exists on a strict, rigid grid.  
  * **Color Palette:** Binary. Pure white and pure black. Color only exists within the photography (which makes heavily stylized, colorful projects like the red neon gym pop aggressively).  
  * **Typography Scale:** Extreme contrast. Very massive headlines paired with very small, technical-looking paragraph text.  
  * **Lines:** Thin (1px) solid lines are used frequently as dividers and form inputs, adding to the "blueprint" or "architectural" aesthetic.  
* **Motion System:**  
  * **Philosophy:** Structural and engineered. The motion isn't "bouncy" or playful; it is mechanical. Elements slide on rails (horizontal scrolls) or lock into place like gears (pinned text).  
  * **Average Speed:** Scroll-linked, so it entirely depends on the user, but the parallax offsets are subtle and tight.  
* **Asset Quality Assessment:** 9/10. Highly professional architectural renders and photography. The imagery is doing the heavy lifting to provide visual interest inside the stark black-and-white frame.

### **5\. TECHNICAL ESTIMATION**

* **Tech Stack:** React (Next.js) or Webflow.  
* **Animation Libraries:** **GSAP (GreenSock)** is undoubtedly powering this, specifically the ScrollTrigger plugin for the extensive pinning and horizontal scrolling sections.  
* **Complexity Rating:** 7/10. While highly polished, the interactions (pinning, horizontal scroll) are standard, well-documented GSAP patterns. It is structurally simpler than Concept A (which featured complex cursor-tracking array manipulations).  
* **AI Capability:** An AI coding assistant could easily build 90% of this layout and the GSAP logic, provided it is instructed to use gsap.matchMedia for responsiveness and is given the exact layout grids.

### **6\. GSAP/ANIMATION CODE ESTIMATION**

**Horizontal Services Scroll (Section 4):**  
JavaScript  
// Setup GSAP ScrollTrigger for the dark horizontal section  
const horizontalSection \= document.querySelector('.services-dark-section');  
const cardsTrack \= document.querySelector('.cards-track');

// Calculate how far the track needs to move  
const getScrollAmount \= () \=\> {  
  let trackWidth \= cardsTrack.scrollWidth;  
  return \-(trackWidth \- window.innerWidth);  
};

const tween \= gsap.to(cardsTrack, {  
  x: getScrollAmount,  
  ease: "none"  
});

ScrollTrigger.create({  
  trigger: horizontalSection,  
  start: "top top",  
  end: () \=\> \`+=${getScrollAmount() \* \-1}\`, // Pin duration matches scroll distance  
  pin: true,  
  animation: tween,  
  scrub: 1,  
  invalidateOnRefresh: true // Recalculate on window resize  
});

**Alternating Pinned Project Sections (Section 3 \- Conceptual):**  
JavaScript  
// For each project wrapper  
gsap.utils.toArray('.project-wrapper').forEach(project \=\> {  
  const textBlock \= project.querySelector('.sticky-text-block');  
  const imageGallery \= project.querySelector('.image-gallery-column');

  ScrollTrigger.create({  
    trigger: project,  
    start: "top center", // Pin when text reaches center of screen  
    end: "bottom center", // Unpin when the gallery finishes scrolling  
    pin: textBlock,  
    pinSpacing: false // Crucial so the images keep scrolling up past it  
  });  
});

### **7\. REPRODUCTION CHECKLIST**

To rebuild this site, a team would need:

* \[ \] **Assets:** High-quality interior photography/renders cropped to sharp rectangles.  
* \[ \] **Design Decisions:** Strict adherence to a grid system. Absolutely no border-radius anywhere.  
* \[ \] **Technical Skills:** Advanced CSS Grid (for the alternating project layouts) and GSAP ScrollTrigger mastery.  
* \[ \] **Pre-loader Logic:** Custom JavaScript to handle the initial state where "abv" and "tek" are separated, the timeout for the image to scale down, and the FLIP (First, Last, Invert, Play) animation to move them into the logo position before unlocking the main scroll.

