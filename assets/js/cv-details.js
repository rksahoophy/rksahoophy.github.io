/* ==========================================================================
   Extra details used ONLY by the "Generate CV" page (cv-generate.html).
   Everything else in the generated CV comes from the website itself:
     cv.html            → credentials, awards, grants, skills, teaching, talks
     research.html      → research interests
     assets/data/*.json → name, e-mails, links, awards, talks, reviewing
     publications.js    → publications (+ weekly Google Scholar data)
   NOTE: this file is public like the rest of the site. Delete any line you
   do not want online; that item then simply disappears from the CV.
   ========================================================================== */
window.CV_DETAILS = {
  phones: ["(+91) 9090604678", "(+357) 96174383"],

  personal: [
    ["Date of Birth", "27<sup>th</sup> June 1994"],
    ["Gender", "Male"],
    ["Marital Status", "Married"],
    ["Nationality", "Indian"]
    // "Language" is added automatically from the Skills section of cv.html
  ],

  referees: [
    { name: "Prof. Vangelis Harmandaris (Postdoc Supervisor)",
      lines: ["Professor, CaSToRC, The Cyprus Institute", "Nicosia, Cyprus"],
      email: "v.harmandaris@cyi.ac.cy" },
    { name: "Prof. Sridhar Sahu (Ph.D. Supervisor)",
      lines: ["Associate Professor, Department of Physics", "Indian Institute of Technology (Indian School of Mines) Dhanbad"],
      email: "sridharsahu@iitism.ac.in" },
    { name: "Prof. Paramjit Kour (Collaborator)",
      lines: ["Assistant Professor, Department of Physics", "Birla Institute of Technology, Mesra, Patna Campus, Patna, India"],
      email: "paramjit.kour@bitmesra.ac.in" }
  ]
};
