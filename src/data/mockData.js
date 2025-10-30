export const learners = [
  {
    id: 'learner-001',
    name: 'Aanya Kapoor',
    email: 'aanya@psycheprep.ai',
    plan: 'Astra Elite',
    role: 'learner',
    streak: 42,
    mastery: 78,
    recommendations: ['Attachment Theories', 'Biopsychology Basics', 'Social Cognition']
  },
  {
    id: 'learner-002',
    name: 'Dev Malhotra',
    email: 'dev@psycheprep.ai',
    plan: 'Astra Elite',
    role: 'learner',
    streak: 28,
    mastery: 64,
    recommendations: ['Advanced Statistics', 'Cognitive Disorders']
  }
];

export const mockExams = [
  {
    id: 'cuet-sim-01',
    title: 'CUET Psychology Grand Simulation',
    duration: 120,
    totalQuestions: 120,
    mode: 'adaptive',
    locked: false,
    blueprint: {
      cognition: 32,
      research: 28,
      clinical: 24,
      social: 18,
      development: 18
    }
  },
  {
    id: 'pyq-2023',
    title: 'CUET PYQ Marathon 2023',
    duration: 90,
    totalQuestions: 75,
    mode: 'pyq',
    locked: false,
    blueprint: {
      cognition: 20,
      research: 18,
      clinical: 12,
      social: 10,
      development: 15
    }
  }
];

export const otpStore = new Map();

export const weakTopicSignals = [
  {
    topic: 'Neurotransmission & Synaptic Plasticity',
    confidence: 0.84,
    recommendedResources: ['Neural Pathways Sprint', '3D Synapse Explorer', 'Neurotransmitter Flashcards']
  },
  {
    topic: 'Advanced Statistical Inference',
    confidence: 0.78,
    recommendedResources: ['Bayesian Labs', 'SPSS Pro Walkthrough', 'Confidence Interval Trainer']
  },
  {
    topic: 'Personality Assessment Frameworks',
    confidence: 0.73,
    recommendedResources: ['MMPI Deep Dive', 'Projective Tests Simulator', 'Trait Theory Visualiser']
  }
];

export const securityTelemetry = {
  incidentsToday: 18,
  autoLockdowns: 3,
  averageHeartbeatLatency: '1.3s',
  geoFenceAlerts: 2,
  ipVariance: '0.4%',
  lastSync: '08:20 IST'
};

export const securityFeed = [
  {
    id: 'incident-104',
    candidate: 'Aanya Kapoor',
    code: 'GEOFENCE_BREACH',
    status: 'Under review',
    timestamp: '07:45 IST'
  },
  {
    id: 'incident-099',
    candidate: 'Dev Malhotra',
    code: 'DEVTOOLS_DETECTED',
    status: 'Escalated',
    timestamp: '06:58 IST'
  },
  {
    id: 'incident-094',
    candidate: 'Rhea Singh',
    code: 'SCREENSHOT_ATTEMPT',
    status: 'Cleared',
    timestamp: '06:12 IST'
  }
];
