# Archive of Previous Creations & Iterations

This folder preserves all previous iterations, designs, layouts, and assets of the **Mustafa & Tasneem Luxury Wedding Invitation** organized by the progression of changes.

---

## 📁 Directory Structure

```
creations_history/
├── all_generated_assets/
│   ├── seals/
│   │   ├── v1_wax_seal_gold_initial.jpg
│   │   ├── v2_bilingual_seal_with_and.jpg
│   │   ├── v3_bilingual_seal_no_and.jpg
│   │   ├── v4_elegant_gold_seal_enamel_mockup.jpg
│   │   └── v5_actual_cutout_seal.png
│   ├── couples/
│   │   ├── v3_dawoodi_bohra_couple_under_arch.jpg
│   │   ├── v4_bohra_couple_transparent_cutout.png
│   │   ├── v5_bohra_couple_walking_loop.mp4
│   │   └── v5_bohra_couple_walking_poster.jpg
│   └── backgrounds_and_branding/
│       ├── arabic_wedding_logo.jpg
│       └── lavender_arch_bg.jpg
│
├── v1_card_layout_initial/
│   └── (Initial mobile card layout, standard envelope, initial gold seal)
├── v2_bilingual_seal_with_ampersand/
│   └── (Added English & Arabic seal with '&' and 'و', radiant light reveal)
├── v3_fullscreen_envelope_couple_arch/
│   └── (Bilingual MT seal without '&', watercolor couple under floral arch, 3D mouse/gyro parallax)
└── v4_fullscreen_transparent_cutout_couple/
    └── (Full-bleed 100vw storyteller layout, transparent cutout couple, Google Sheets RSVP)
```

---

## 🏛️ Version Breakdown & Changelog

### Version 1: `v1_card_layout_initial`
* **Layout**: Constrained 480px mobile card viewport.
* **Wax Seal**: Initial circular gold wax seal with initials `MT` (English only).
* **Key Features**:
  * Traditional stationery aesthetic with floral borders.
  * Envelope modal with simple flap lift animation.
  * Interactive scratch card and countdown timer.
  * Traditional Bohra invitation wording in Lisan al-Dawat.

### Version 2: `v2_bilingual_seal_with_ampersand`
* **Change**: Upgraded the seal to a bilingual English and Arabic monogram.
* **Wax Seal**: Featured `M & T` in English serif and `م و ت` in classical Arabic calligraphy.
* **Key Features**:
  * Radiant sunburst light reveal opening upon clicking the seal.
  * Audio player integration with ambient background music.

### Version 3: `v3_fullscreen_envelope_couple_arch`
* **Change**:
  * Removed ampersand (`&`) and `و` from the wax seal per user instruction (strictly `MT` and `م ت`).
  * Introduced full-screen envelope close-up (`100vw × 100vh`).
  * Added authentic watercolor Dawoodi Bohra couple illustration under a festive floral arch with hanging lanterns (`couple.jpg`).
  * Added interactive 3D mouse tilt and mobile gyroscope depth parallax.

### Version 4: `v4_fullscreen_transparent_cutout_couple`
* **Change**:
  * Removed the 480px card frame entirely in favor of a full-screen (`100vw`) edge-to-edge parallax storytelling layout.
  * Converted the couple portrait into a standalone transparent cutout PNG (`couple.png`) with **no background box or arch**, floating animation, and radiant backglow halo.
  * Replaced opaque cards with royal dark translucent glassmorphism (`rgba(26, 14, 40, 0.78)`).
  * Added Google Sheets RSVP webhook integration (`google-apps-script/Code.gs`).

### Version 5:
* **Change**:
  * Replaced the seal with an authentic 3D cutout seal (`assets/seal.png`) with organic melted edges and zero artificial paper mockup background.
  * 4-panel envelope opening mechanics with SVG seams, corner-to-center diagonal fold lines, and smooth champagne light portal.
  * Living Mughal archway hero stage with swaying 3D Moroccan brass lanterns and animated continuous video loop of the Dawoodi Bohra couple walking through the palace garden (`couple_walking.mp4`).
  * Motion graphic canvas stardust and petal physics.

### Version 6 (Current Active at Project Root):
* **Change**:
  * **Authentic Frontal Wax Seal (`assets/seal.png`)**: Replaced tilted 3D mockup photo with a direct, front-facing, perfectly circular, centered gold wax seal emblem. Contains English "MT" in calligraphic monogram script and Arabic "م ت" (Meem & Taa) in authentic Thuluth calligraphy format, with imperial royal crown and classical laurel wreath. Strictly no ampersand ("&") or "و". Pure transparent cutout without paper background disc.
  * **Faithful Video Envelope Mechanics**: Recreated the 4-panel unfolding sequence matching the reference video — top flap lifts 180° upward carrying the wax seal, bottom flap folds downward, revealing authentic gold satin flap lining and the inner wedding invitation card peeking out from the envelope pocket.
  * **Living Motion Graphic & Dynamic Parallax Background**: Engineered multi-layer dynamic background featuring fluid ambient aurora mesh, floating sacred geometric Islamic jali lattice, volumetric light shafts, interactive cursor stardust ripples, multi-depth bokeh orbs, and 3D tumbling petals with differential parallax scrolling.
  * **Bohra Couple Walking Video Stage**: Embedded looping video (`couple_walking.mp4`) with walking kinematics, swaying lanterns, and stardust canvas overlay.

---

## 🌐 How to Preview Previous Versions

Each subfolder (`v1_...`, `v2_...`, etc.) is a complete standalone web application. To preview any past version:

1. Open a terminal in that folder or launch your local HTTP server, for example:
   ```powershell
   # To preview Version 1:
   cd creations_history/v1_card_layout_initial
   python -m http.server 8091

   # To preview Version 3:
   cd creations_history/v3_fullscreen_envelope_couple_arch
   python -m http.server 8093
   ```
2. Open your browser to the corresponding port (`http://localhost:8091/`, `http://localhost:8093/`, etc.).
