export const tests = [
  {
    id: "psy-mock-01",
    name: "CUET PG Psychology Full Mock 01",
    window: "Mar 12, 9:00 AM - 12:00 PM",
    duration: "120 mins",
    status: "Published",
    registrations: 328,
    sectionBreakdown: [25, 25, 25],
    recommendedMode: "full",
  },
  {
    id: "psy-mock-02",
    name: "Cognitive Processes Drill",
    window: "Mar 16, 5:00 PM - 7:00 PM",
    duration: "90 mins",
    status: "Draft",
    registrations: 128,
    sectionBreakdown: [20, 20, 20],
    recommendedMode: "weak",
  },
  {
    id: "psy-mock-03",
    name: "Research Methodology Marathon",
    window: "Mar 23, 10:00 AM - 1:00 PM",
    duration: "180 mins",
    status: "Scheduled",
    registrations: 411,
    sectionBreakdown: [30, 30, 30],
    recommendedMode: "pyq",
  },
];

export const learners = [
  { id: "learner-01", name: "Ritika Sharma", plan: "Pro", score: 187, mentor: "Dr. Nanda" },
  { id: "learner-02", name: "Aditya Menon", plan: "Ultimate", score: 178, mentor: "Dr. Roy" },
  { id: "learner-03", name: "Neha Gupta", plan: "Starter", score: 142, mentor: "Dr. Bose" },
];

export const paymentHistory = [
  { id: "txn-101", date: "2025-02-22", customer: "Ritika Sharma", plan: "Pro", amount: 999, status: "Paid" },
  { id: "txn-102", date: "2025-02-18", customer: "Neha Gupta", plan: "Starter", amount: 499, status: "Paid" },
  { id: "txn-103", date: "2025-02-15", customer: "Aditya Menon", plan: "Ultimate", amount: 1499, status: "Refunded" },
];

export const learnerAttempts = [
  { id: "attempt-01", mock: "Full Mock 01", date: "2025-02-21", score: 187, percentile: 92 },
  { id: "attempt-02", mock: "Research Marathon", date: "2025-02-14", score: 173, percentile: 88 },
  { id: "attempt-03", mock: "Therapy Approaches", date: "2025-02-09", score: 168, percentile: 85 },
];

export const learnerSchedule = [
  { id: "sch-01", date: "2025-03-01", time: "09:00", title: "Mock 04 - Developmental Psychology" },
  { id: "sch-02", date: "2025-03-05", time: "18:00", title: "Mentor Feedback Loop" },
  { id: "sch-03", date: "2025-03-08", time: "20:00", title: "Research Methods Drill" },
];

export const learnerResources = [
  { id: "res-01", title: "Piaget vs Vygotsky - Comparison Chart", type: "PDF", tag: "Cognitive" },
  { id: "res-02", title: "Psychotherapy Approaches Flashcards", type: "Deck", tag: "Therapy" },
  { id: "res-03", title: "Research Design Mindmap", type: "Mindmap", tag: "Research" },
  { id: "res-04", title: "Social Psychology Case Studies", type: "PDF", tag: "Social" },
];

export const weakTopicInsights = [
  {
    topic: "Applied Statistics",
    confidence: 0.86,
    probableQuestionType: "Computation heavy MCQ",
    recommendation: "Revise ANOVA heuristics and standard error formulae",
  },
  {
    topic: "Social Cognition",
    confidence: 0.79,
    probableQuestionType: "Scenario-based PYQ",
    recommendation: "Practice attribution theory caselets and Heider cues",
  },
  {
    topic: "Neuropsychology",
    confidence: 0.73,
    probableQuestionType: "Image based brain mapping",
    recommendation: "Memorise Brodmann areas 17/18 and limbic circuitry",
  },
];

export const chapterPools = [
  {
    chapter: "Cognitive Processes",
    averageScore: 62,
    suggestedWeight: 0.32,
    recentPYQCount: 6,
  },
  {
    chapter: "Research Methodology",
    averageScore: 54,
    suggestedWeight: 0.28,
    recentPYQCount: 5,
  },
  {
    chapter: "Personality Theories",
    averageScore: 71,
    suggestedWeight: 0.22,
    recentPYQCount: 3,
  },
  {
    chapter: "Clinical Psychology",
    averageScore: 48,
    suggestedWeight: 0.18,
    recentPYQCount: 4,
  },
];

export const pyqCatalog = [
  {
    id: "pyq-2019-01",
    year: 2019,
    topic: "Social Cognition",
    difficulty: "Moderate",
    source: "NTA Sample Paper",
  },
  {
    id: "pyq-2020-04",
    year: 2020,
    topic: "Applied Statistics",
    difficulty: "Challenging",
    source: "CUET PG Main",
  },
  {
    id: "pyq-2021-02",
    year: 2021,
    topic: "Developmental Psychology",
    difficulty: "Easy",
    source: "CUET PG Main",
  },
  {
    id: "pyq-2022-07",
    year: 2022,
    topic: "Neuropsychology",
    difficulty: "Moderate",
    source: "CUET PG Main",
  },
];

export const examPaper = {
  duration: 120,
  sections: [
    {
      id: "section-a",
      title: "Cognitive Processes",
      questions: [
        {
          id: "q1",
          text: "Which psychologist introduced the concept of working memory?",
          options: [
            "Sigmund Freud",
            "B. F. Skinner",
            "Alan Baddeley",
            "Jean Piaget"
          ],
          answer: 2,
          difficulty: "Moderate",
          topic: "Cognitive Processes",
          chapter: "Memory Models",
          source: "Mock",
          year: null,
        },
        {
          id: "q2",
          text: "The Stroop effect primarily demonstrates which cognitive phenomenon?",
          options: [
            "Divided attention",
            "Interference",
            "Memory consolidation",
            "Sensory adaptation"
          ],
          answer: 1,
          difficulty: "Easy",
          topic: "Cognitive Processes",
          chapter: "Attention",
          source: "PYQ",
          year: 2021,
        },
        {
          id: "q5",
          text: "Feature integration theory was proposed to explain what aspect of perception?",
          options: [
            "Depth perception",
            "Object recognition",
            "Selective attention",
            "Color constancy"
          ],
          answer: 2,
          difficulty: "Moderate",
          topic: "Cognitive Processes",
          chapter: "Perception",
          source: "PYQ",
          year: 2020,
        },
      ],
    },
    {
      id: "section-b",
      title: "Research Methodology",
      questions: [
        {
          id: "q3",
          text: "Which test would you use to compare means across three or more groups?",
          options: [
            "Chi-square test",
            "ANOVA",
            "Spearman correlation",
            "Mann-Whitney U"
          ],
          answer: 1,
          difficulty: "Moderate",
          topic: "Research Methodology",
          chapter: "Inferential Statistics",
          source: "Mock",
          year: null,
        },
        {
          id: "q4",
          text: "In qualitative research, triangulation refers to...",
          options: [
            "Using three researchers to analyze data",
            "Combining multiple data sources or methods",
            "Applying three different statistical tests",
            "Conducting three pilot studies"
          ],
          answer: 1,
          difficulty: "Easy",
          topic: "Research Methodology",
          chapter: "Qualitative Methods",
          source: "PYQ",
          year: 2019,
        },
        {
          id: "q6",
          text: "Cohen's d is best described as a measure of...",
          options: [
            "Sampling adequacy",
            "Effect size",
            "Variance explained",
            "Test reliability"
          ],
          answer: 1,
          difficulty: "Challenging",
          topic: "Research Methodology",
          chapter: "Effect Sizes",
          source: "Mock",
          year: null,
        },
      ],
    },
    {
      id: "section-c",
      title: "Clinical & Social",
      questions: [
        {
          id: "q7",
          text: "Which therapy utilises automatic thought records as a core intervention?",
          options: [
            "Client-centered therapy",
            "Cognitive behavioral therapy",
            "Psychodynamic therapy",
            "Gestalt therapy"
          ],
          answer: 1,
          difficulty: "Moderate",
          topic: "Clinical Psychology",
          chapter: "Psychotherapy",
          source: "Mock",
          year: null,
        },
        {
          id: "q8",
          text: "Fundamental attribution error is most pronounced when...",
          options: [
            "Evaluating our own failures",
            "Explaining successes of friends",
            "Judging strangers in individualistic cultures",
            "Assessing group achievements"
          ],
          answer: 2,
          difficulty: "Moderate",
          topic: "Social Cognition",
          chapter: "Attribution",
          source: "PYQ",
          year: 2022,
        },
        {
          id: "q9",
          text: "Damage to Broca's area typically results in...",
          options: [
            "Fluent but meaningless speech",
            "Non-fluent, effortful speech",
            "Loss of auditory comprehension",
            "Visual agnosia"
          ],
          answer: 1,
          difficulty: "Challenging",
          topic: "Neuropsychology",
          chapter: "Language",
          source: "PYQ",
          year: 2020,
        },
      ],
    },
  ],
};

export const aiSignals = {
  weeklyPredictions: {
    churnRisk: 0.11,
    upgradeIntent: 0.37,
  },
  blueprintUsage: {
    weakModeRuns: 42,
    pyqModeRuns: 35,
    customMixRuns: 18,
  },
};
