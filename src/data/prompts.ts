export const ALL_QUICK_PROMPTS: string[] = [
  // Agriculture & Rural
  "I'm a farmer looking for direct income support and credit cards.",
  "How can I get a government subsidy for solar irrigation pumps?",
  "What is the eligibility for PM-KISAN ₹6,000 annual direct transfer?",
  "How do I claim crop insurance under PM Fasal Bima Yojana?",
  "Can I get financial assistance to build a rural cold storage facility?",
  "Are there central subsidies available for fisheries and fish pond equipment?",

  // Health & Medical
  "I need cashless secondary and tertiary hospitalization cover for my family.",
  "Where can I find 50% to 90% cheaper generic medicines in my town?",
  "Are there free dialysis services provided at government district hospitals?",
  "What maternity financial assistance is given for the birth of a girl child?",
  "How do I check if my family is eligible under Ayushman Bharat PM-JAY?",

  // Education, Students & Research
  "I'm a college student needing a merit scholarship for engineering fees.",
  "Are there special AICTE scholarships for girl students in engineering?",
  "How can I apply for the Prime Minister Research Fellowship (PMRF) for Ph.D.?",
  "Where can I get free vocational certification and stipend in AI & Robotics?",
  "What are the annual parental income limits for National Scholarship Portal?",

  // MSME, Startups & Artisans
  "I want to start a manufacturing unit and need a collateral-free loan.",
  "I'm a traditional artisan (carpenter/blacksmith). How do I get toolkit grant?",
  "Can a street vendor get micro-credit working capital without collateral?",
  "How can an early-stage startup get ₹20 Lakhs seed funding grant from DPIIT?",
  "What bank loans and subsidies are available under Stand-Up India for women?",
  "How do I apply for Kishore or Tarun loans up to ₹10 Lakhs under MUDRA?",

  // Housing, Social Welfare & Pensions
  "Are there subsidized housing grants for low-income urban families?",
  "How can poor rural households get a deposit-free LPG gas connection?",
  "What is the monthly guaranteed pension after age 60 under Atal Pension Yojana?",
  "How can I open a Sukanya Samriddhi high-interest account for my daughter?",
  "What is the ₹20/year government accidental death insurance scheme (PMSBY)?",
  "How does the ₹2 Lakh term life cover work under PM Jeevan Jyoti Bima (PMJJBY)?"
];

/**
 * Returns a random sample of `count` items from an array using Fisher-Yates shuffle
 */
export function getRandomPrompts(prompts: string[], count = 5): string[] {
  const shuffled = [...prompts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
