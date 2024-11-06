import { Scenario } from '../types';

export const scenarios: Record<string, Scenario[]> = {
  // Station 1: CABIN OUTSIDE
  "1-1": [
    {
      id: "1-1-1",
      question: "You notice dirt on the transparent panels during inspection. What's your next step?",
      options: [
        "Continue with the next checklist item",
        "Clean the panels immediately",
        "Document the dirt for later cleaning",
        "Check for structural damage first"
      ],
      correctIndex: 1,
      explanation: "Transparent panels must be cleaned immediately when dirt is noticed to ensure proper visibility."
    },
    {
      id: "1-1-2",
      question: "After cleaning the transparent panels, you notice a small scratch. What should you do?",
      options: [
        "Ignore it if it's superficial",
        "Document and assess the scratch's depth",
        "Apply cleaning solution again",
        "Replace the panel immediately"
      ],
      correctIndex: 1,
      explanation: "Any damage, including scratches, must be documented and assessed for airworthiness implications."
    }
  ],
  "1-4": [
    {
      id: "1-4-1",
      question: "The Pitot head static pressure ports have their blanking covers on. What's the correct action?",
      options: [
        "Leave them on for protection",
        "Remove and store the covers",
        "Check if they're properly sealed",
        "Note it in the logbook"
      ],
      correctIndex: 1,
      explanation: "Blanking covers must be removed before flight to ensure proper air pressure readings."
    }
  ],
  // Station 2: FUSELAGE STRUCTURE LH SIDE
  "2-1": [
    {
      id: "2-1-1",
      question: "During inspection, the cabin access door shows slight play. What's your next action?",
      options: [
        "Apply more force to close it",
        "Check the locking mechanism",
        "Note it for later maintenance",
        "Proceed with the checklist"
      ],
      correctIndex: 1,
      explanation: "Any abnormal play requires immediate inspection of the locking mechanism for proper security."
    }
  ],
  "2-7": [
    {
      id: "2-7-1",
      question: "After closing the cargo compartment door, what's the final check required?",
      options: [
        "Visual inspection only",
        "Push test for movement",
        "Verify correct locking",
        "Document the closure"
      ],
      correctIndex: 2,
      explanation: "Always verify correct locking after closing the cargo compartment door to ensure flight safety."
    }
  ]
};