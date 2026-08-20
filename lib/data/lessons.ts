export type LessonStep = {
  title: string;
  content: string;
  example?: string;
  exampleAnswer?: string;
  keyRule: string;
  visual?: "number-line" | "sign-chart";
};

export type Lesson = {
  id: string;
  letter: string;
  name: string;
  fullName: string;
  color: string;
  bgColor: string;
  description: string;
  icon: string;
  steps: LessonStep[];
};

export const lessons: Lesson[] = [
  {
    id: "multiplication",
    letter: "M",
    name: "Multiplication",
    fullName: "Multiplication of Integers",
    color: "#e74c3c",
    bgColor: "#fdecea",
    description: "Learn how the signs of numbers affect multiplication results.",
    icon: "×",
    steps: [
      {
        title: "What happens when we multiply integers?",
        content:
          "When multiplying integers, the sign of the answer depends on the signs of the two numbers being multiplied. There are only two rules to remember!",
        keyRule: "The sign of the product depends on whether the signs are the SAME or DIFFERENT.",
      },
      {
        title: "Rule 1: Same Signs = Positive",
        content:
          "When you multiply two numbers with the SAME sign (both positive or both negative), the answer is always POSITIVE.",
        example: "(+3) × (+4) = +12\n(-3) × (-4) = +12",
        exampleAnswer: "Both examples give a positive result because the signs are the same!",
        keyRule: "Same signs → Positive result ✅",
        visual: "sign-chart",
      },
      {
        title: "Rule 2: Different Signs = Negative",
        content:
          "When you multiply two numbers with DIFFERENT signs (one positive and one negative), the answer is always NEGATIVE.",
        example: "(+3) × (-4) = -12\n(-3) × (+4) = -12",
        exampleAnswer: "Both examples give a negative result because the signs are different!",
        keyRule: "Different signs → Negative result ❌",
        visual: "sign-chart",
      },
      {
        title: "Quick Reference Chart",
        content:
          "Here's an easy way to remember:\n\n• Positive × Positive = Positive (+)(+) = (+)\n• Negative × Negative = Positive (−)(−) = (+)\n• Positive × Negative = Negative (+)(−) = (−)\n• Negative × Positive = Negative (−)(+) = (−)",
        keyRule: "Think of it like friends and enemies: A friend of a friend is a friend. An enemy of an enemy is a friend!",
      },
      {
        title: "Let's Practice!",
        content:
          "Try these in your head:\n\n1. (-5) × (+2) = ?\n2. (-6) × (-3) = ?\n3. (+7) × (+4) = ?\n4. (+8) × (-2) = ?",
        exampleAnswer:
          "Answers:\n1. -10 (different signs = negative)\n2. +18 (same signs = positive)\n3. +28 (same signs = positive)\n4. -16 (different signs = negative)",
        keyRule: "Same signs = Positive, Different signs = Negative",
      },
    ],
  },
  {
    id: "addition",
    letter: "A",
    name: "Addition",
    fullName: "Addition of Integers",
    color: "#3498db",
    bgColor: "#eaf2f8",
    description: "Master the rules for adding positive and negative numbers.",
    icon: "+",
    steps: [
      {
        title: "Adding Integers: Two Scenarios",
        content:
          "Adding integers has two scenarios depending on whether the signs are the same or different. Each scenario has its own simple rule.",
        keyRule: "First, check: Are the signs the SAME or DIFFERENT?",
      },
      {
        title: "Rule 1: Same Signs → Add & Keep the Sign",
        content:
          "When both numbers have the SAME sign, ADD their absolute values and KEEP the common sign.",
        example: "(+5) + (+3) = +8\n(-5) + (-3) = -8",
        exampleAnswer:
          "Both positive? Add and stay positive.\nBoth negative? Add and stay negative.",
        keyRule: "Same signs: ADD the numbers, KEEP the sign",
        visual: "number-line",
      },
      {
        title: "Rule 2: Different Signs → Subtract & Keep Sign of Larger",
        content:
          "When the numbers have DIFFERENT signs, SUBTRACT the smaller absolute value from the larger, then keep the sign of the number with the LARGER absolute value.",
        example: "(+10) + (-4) = +6\n(-10) + (+4) = -6",
        exampleAnswer:
          "Subtract: 10 - 4 = 6. The sign follows the number with the bigger absolute value.",
        keyRule: "Different signs: SUBTRACT, keep the sign of the BIGGER number",
        visual: "number-line",
      },
      {
        title: "Special Case: Opposites Equal Zero",
        content:
          "When you add a number and its opposite (same absolute value, different signs), the result is always ZERO. These are called additive inverses.",
        example: "(+7) + (-7) = 0\n(-15) + (+15) = 0",
        exampleAnswer: "Any number plus its opposite always equals zero!",
        keyRule: "A number plus its opposite = 0",
      },
      {
        title: "Let's Practice!",
        content:
          "Try these in your head:\n\n1. (+9) + (+6) = ?\n2. (-8) + (-5) = ?\n3. (+12) + (-7) = ?\n4. (-15) + (+20) = ?",
        exampleAnswer:
          "Answers:\n1. +15 (same signs: add, keep positive)\n2. -13 (same signs: add, keep negative)\n3. +5 (different signs: 12-7=5, keep positive)\n4. +5 (different signs: 20-15=5, keep positive)",
        keyRule: "Same signs: ADD & keep sign. Different signs: SUBTRACT & keep sign of larger.",
      },
    ],
  },
  {
    id: "subtraction",
    letter: "S",
    name: "Subtraction",
    fullName: "Subtraction of Integers",
    color: "#27ae60",
    bgColor: "#e8f8f0",
    description: "Turn subtraction into addition using a simple trick!",
    icon: "−",
    steps: [
      {
        title: "The Big Secret About Subtraction",
        content:
          "Here's the best news: You already know how to subtract integers! Subtraction is just addition in disguise. We convert every subtraction problem into an addition problem.",
        keyRule: "Subtraction = Adding the Opposite",
      },
      {
        title: "The Two-Step Process",
        content:
          "To subtract integers:\n\n1. CHANGE the subtraction sign to ADDITION\n2. CHANGE the sign of the second number to its OPPOSITE\n\nThen use the addition rules you already learned!",
        example: "(+8) − (+3)\n→ Change to: (+8) + (−3)\n→ Different signs: 8 − 3 = 5 ✓",
        exampleAnswer: "We changed subtraction to addition and flipped the sign of 3 to -3.",
        keyRule: "Step 1: Change − to +\nStep 2: Flip the sign of the second number",
      },
      {
        title: "More Examples",
        content:
          "Let's see this rule in action with different sign combinations:",
        example:
          "(-6) − (+4) → (-6) + (-4) = -10\n(-3) − (-7) → (-3) + (+7) = +4\n(+10) − (-5) → (+10) + (+5) = +15",
        exampleAnswer:
          "Notice: Subtracting a negative is like adding a positive! Two negatives make a positive.",
        keyRule: "Always convert to addition first, then apply addition rules.",
      },
      {
        title: "Why Does This Work?",
        content:
          "Think of it on a number line:\n\n• Subtracting a positive = moving LEFT\n• Subtracting a negative = moving RIGHT\n\nSubtracting a negative is the same as adding a positive — you move in the opposite direction!",
        keyRule: "Subtracting a negative = Adding a positive (double negative = positive)",
        visual: "number-line",
      },
      {
        title: "Let's Practice!",
        content:
          "Convert to addition, then solve:\n\n1. (+5) − (+9) = ?\n2. (-6) − (+4) = ?\n3. (-3) − (-7) = ?\n4. (+10) − (-5) = ?",
        exampleAnswer:
          "Answers:\n1. (+5) + (-9) = -4\n2. (-6) + (-4) = -10\n3. (-3) + (+7) = +4\n4. (+10) + (+5) = +15",
        keyRule: "Change the operation, change the sign, then use addition rules!",
      },
    ],
  },
  {
    id: "division",
    letter: "D",
    name: "Division",
    fullName: "Division of Integers",
    color: "#f39c12",
    bgColor: "#fef5e7",
    description: "Division follows the exact same sign rules as multiplication!",
    icon: "÷",
    steps: [
      {
        title: "Great News: Same Rules as Multiplication!",
        content:
          "Division of integers follows the EXACT SAME sign rules as multiplication. If you've mastered the M rules, you already know the D rules!",
        keyRule: "Division sign rules = Multiplication sign rules",
      },
      {
        title: "Rule 1: Same Signs = Positive",
        content:
          "When you divide two numbers with the SAME sign (both positive or both negative), the answer is always POSITIVE.",
        example: "(+12) ÷ (+3) = +4\n(-12) ÷ (-3) = +4",
        exampleAnswer: "Both examples give a positive result because the signs are the same!",
        keyRule: "Same signs → Positive quotient ✅",
        visual: "sign-chart",
      },
      {
        title: "Rule 2: Different Signs = Negative",
        content:
          "When you divide two numbers with DIFFERENT signs (one positive and one negative), the answer is always NEGATIVE.",
        example: "(+12) ÷ (-3) = -4\n(-12) ÷ (+3) = -4",
        exampleAnswer: "Both examples give a negative result because the signs are different!",
        keyRule: "Different signs → Negative quotient ❌",
        visual: "sign-chart",
      },
      {
        title: "M and D: The Perfect Pair",
        content:
          "Multiplication and Division are inverse operations, so it makes sense they share the same sign rules:\n\n• (+) ÷ (+) = (+)\n• (−) ÷ (−) = (+)\n• (+) ÷ (−) = (−)\n• (−) ÷ (+) = (−)\n\nThis is identical to the multiplication chart!",
        keyRule: "M and D are a pair — same sign rules apply to both!",
      },
      {
        title: "Let's Practice!",
        content:
          "Try these in your head:\n\n1. (-20) ÷ (+5) = ?\n2. (-36) ÷ (-6) = ?\n3. (+48) ÷ (-8) = ?\n4. (+100) ÷ (+25) = ?",
        exampleAnswer:
          "Answers:\n1. -4 (different signs = negative)\n2. +6 (same signs = positive)\n3. -6 (different signs = negative)\n4. +4 (same signs = positive)",
        keyRule: "Same signs = Positive, Different signs = Negative — just like multiplication!",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getTopicColor(topic: string): string {
  const lesson = lessons.find((l) => l.id === topic);
  return lesson?.color ?? "#6b7280";
}
