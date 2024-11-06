import { Station } from '../types';

export const stations: Station[] = [
  {
    id: 1,
    name: "CABIN OUTSIDE",
    items: [
      {
        id: 1,
        description: "All the Transparent panels",
        checks: "Cleanliness (clean if necessary)",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 2,
        description: "Door jambs, canopy arches",
        checks: "No damage or cracks",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 3,
        description: "Sliding Window",
        checks: "No damage, cracks, separations, or loss of slide",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 4,
        description: "Pitot head \"Static pressure ports\"",
        checks: "Blanking cover removed",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 5,
        description: "Pitot head \"Static pressure ports\"",
        checks: "Install Blanking cover",
        BFF: false,
        TA: false,
        ALF: true
      },
      {
        id: 6,
        description: "Sideslip Indicator",
        checks: "Condition",
        BFF: false,
        TA: false,
        ALF: true
      }
    ]
  },
  {
    id: 2,
    name: "FUSELAGE STRUCTURE LH SIDE",
    items: [
      {
        id: 1,
        description: "Cabin access door",
        checks: "Attachment, no abnormal play, correct locking.",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 2,
        description: "Jettison mechanism",
        checks: "Condition, no cracks at the outside jettison control lever.",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 3,
        description: "Static pressure port",
        checks: "Bled",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 4,
        description: "Lower cowlings",
        checks: "Condition, Attachment",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 5,
        description: "Upper cowlings",
        checks: "Condition, Attachment",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 6,
        description: "Cargo compartment door Loads",
        checks: "Opening, condition, attachment, no abnormal play. Stowed.",
        BFF: true,
        TA: true,
        ALF: false
      },
      {
        id: 7,
        description: "Cargo compartment door",
        checks: "Closing, Correct Locking",
        BFF: true,
        TA: true,
        ALF: true
      }
    ]
  }
];