-- =============================================
-- SignSmart Question Bank Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =============================================

-- MULTIPLICATION QUESTIONS (15 questions)
INSERT INTO questions (topic, question_text, options, correct_answer, explanation, difficulty) VALUES
('multiplication', '(-3) × 4 = ?', '["A. -12", "B. 12", "C. -7", "D. 7"]', 0, 'Different signs (negative × positive) = Negative. 3 × 4 = 12, so the answer is -12.', 'easy'),
('multiplication', '5 × 3 = ?', '["A. -15", "B. 15", "C. -8", "D. 8"]', 1, 'Same signs (positive × positive) = Positive. 5 × 3 = 15.', 'easy'),
('multiplication', '(-6) × (-2) = ?', '["A. -12", "B. -8", "C. 12", "D. 8"]', 2, 'Same signs (negative × negative) = Positive. 6 × 2 = 12.', 'easy'),
('multiplication', '7 × (-3) = ?', '["A. 21", "B. -21", "C. 10", "D. -10"]', 1, 'Different signs (positive × negative) = Negative. 7 × 3 = 21, so the answer is -21.', 'easy'),
('multiplication', '(-8) × 5 = ?', '["A. 40", "B. -40", "C. 13", "D. -13"]', 1, 'Different signs (negative × positive) = Negative. 8 × 5 = 40, so the answer is -40.', 'medium'),
('multiplication', '(-9) × (-4) = ?', '["A. -36", "B. 36", "C. -13", "D. 13"]', 1, 'Same signs (negative × negative) = Positive. 9 × 4 = 36.', 'medium'),
('multiplication', '12 × (-3) = ?', '["A. 36", "B. -36", "C. 15", "D. -15"]', 1, 'Different signs (positive × negative) = Negative. 12 × 3 = 36, so the answer is -36.', 'medium'),
('multiplication', '(-7) × (-7) = ?', '["A. -49", "B. -14", "C. 49", "D. 14"]', 2, 'Same signs (negative × negative) = Positive. 7 × 7 = 49.', 'medium'),
('multiplication', '(-11) × 6 = ?', '["A. 66", "B. -66", "C. 17", "D. -17"]', 1, 'Different signs (negative × positive) = Negative. 11 × 6 = 66, so the answer is -66.', 'hard'),
('multiplication', '15 × (-4) = ?', '["A. 60", "B. -60", "C. 19", "D. -19"]', 1, 'Different signs (positive × negative) = Negative. 15 × 4 = 60, so the answer is -60.', 'hard'),
('multiplication', '(-2) × (-2) × (-2) = ?', '["A. 8", "B. -8", "C. 6", "D. -6"]', 1, 'First: (-2) × (-2) = 4 (same signs = positive). Then: 4 × (-2) = -8 (different signs = negative).', 'hard'),
('multiplication', '(-1) × 25 = ?', '["A. 25", "B. -25", "C. 1", "D. -1"]', 1, 'Different signs (negative × positive) = Negative. 1 × 25 = 25, so the answer is -25.', 'easy'),
('multiplication', '10 × 10 = ?', '["A. -100", "B. 100", "C. 20", "D. -20"]', 1, 'Same signs (positive × positive) = Positive. 10 × 10 = 100.', 'easy'),
('multiplication', '(-4) × 8 = ?', '["A. 32", "B. -32", "C. 12", "D. -12"]', 1, 'Different signs (negative × positive) = Negative. 4 × 8 = 32, so the answer is -32.', 'medium'),
('multiplication', '(-3) × (-5) × 2 = ?', '["A. 30", "B. -30", "C. 10", "D. -10"]', 0, 'First: (-3) × (-5) = 15 (same signs = positive). Then: 15 × 2 = 30 (same signs = positive).', 'hard');

-- ADDITION QUESTIONS (15 questions)
INSERT INTO questions (topic, question_text, options, correct_answer, explanation, difficulty) VALUES
('addition', '8 + 5 = ?', '["A. 13", "B. -13", "C. 3", "D. -3"]', 0, 'Same signs: Add the numbers and keep the sign. 8 + 5 = 13 (positive).', 'easy'),
('addition', '(-6) + (-3) = ?', '["A. 9", "B. -9", "C. 3", "D. -3"]', 1, 'Same signs: Add the numbers and keep the sign. 6 + 3 = 9, both negative so -9.', 'easy'),
('addition', '10 + (-4) = ?', '["A. 14", "B. -14", "C. 6", "D. -6"]', 2, 'Different signs: Subtract the smaller from the larger. 10 - 4 = 6. Keep the sign of the larger number (positive).', 'easy'),
('addition', '(-7) + 3 = ?', '["A. 10", "B. -10", "C. 4", "D. -4"]', 3, 'Different signs: Subtract the smaller from the larger. 7 - 3 = 4. Keep the sign of the larger number (negative), so -4.', 'easy'),
('addition', '(-12) + 12 = ?', '["A. 24", "B. -24", "C. 0", "D. 12"]', 2, 'Different signs with equal values: Any number plus its opposite equals 0.', 'easy'),
('addition', '15 + (-8) = ?', '["A. 23", "B. -23", "C. 7", "D. -7"]', 2, 'Different signs: 15 - 8 = 7. Larger number is positive, so answer is 7.', 'medium'),
('addition', '(-20) + 9 = ?', '["A. 29", "B. -29", "C. 11", "D. -11"]', 3, 'Different signs: 20 - 9 = 11. Larger number is negative, so answer is -11.', 'medium'),
('addition', '(-14) + (-6) = ?', '["A. 20", "B. -20", "C. 8", "D. -8"]', 1, 'Same signs: Add and keep the sign. 14 + 6 = 20, both negative so -20.', 'medium'),
('addition', '25 + (-30) = ?', '["A. 55", "B. -55", "C. 5", "D. -5"]', 3, 'Different signs: 30 - 25 = 5. Larger number is negative, so answer is -5.', 'medium'),
('addition', '(-18) + 7 = ?', '["A. 25", "B. -25", "C. 11", "D. -11"]', 3, 'Different signs: 18 - 7 = 11. Larger number is negative, so answer is -11.', 'medium'),
('addition', '33 + (-15) = ?', '["A. 48", "B. -48", "C. 18", "D. -18"]', 2, 'Different signs: 33 - 15 = 18. Larger number is positive, so answer is 18.', 'hard'),
('addition', '(-50) + 23 = ?', '["A. 73", "B. -73", "C. 27", "D. -27"]', 3, 'Different signs: 50 - 23 = 27. Larger number is negative, so answer is -27.', 'hard'),
('addition', '(-8) + (-8) + 8 = ?', '["A. 8", "B. -8", "C. 0", "D. -16"]', 1, 'First: (-8) + (-8) = -16. Then: (-16) + 8 = -8.', 'hard'),
('addition', '100 + (-99) = ?', '["A. 199", "B. -199", "C. 1", "D. -1"]', 2, 'Different signs: 100 - 99 = 1. Larger number is positive, so answer is 1.', 'easy'),
('addition', '(-45) + (-15) = ?', '["A. 60", "B. -60", "C. 30", "D. -30"]', 1, 'Same signs: 45 + 15 = 60, both negative so -60.', 'hard');

-- SUBTRACTION QUESTIONS (15 questions)
INSERT INTO questions (topic, question_text, options, correct_answer, explanation, difficulty) VALUES
('subtraction', '8 - 3 = ?', '["A. 11", "B. -11", "C. 5", "D. -5"]', 2, 'Change to addition of opposite: 8 + (-3). Different signs: 8 - 3 = 5 (positive).', 'easy'),
('subtraction', '5 - 9 = ?', '["A. 14", "B. -14", "C. 4", "D. -4"]', 3, 'Change to addition of opposite: 5 + (-9). Different signs: 9 - 5 = 4 (negative), so -4.', 'easy'),
('subtraction', '(-6) - 4 = ?', '["A. 10", "B. -10", "C. 2", "D. -2"]', 1, 'Change to addition of opposite: (-6) + (-4). Same signs: 6 + 4 = 10, both negative so -10.', 'easy'),
('subtraction', '(-3) - (-7) = ?', '["A. 10", "B. -10", "C. 4", "D. -4"]', 2, 'Change to addition of opposite: (-3) + 7. Different signs: 7 - 3 = 4 (positive).', 'easy'),
('subtraction', '10 - (-5) = ?', '["A. 5", "B. -5", "C. 15", "D. -15"]', 2, 'Change to addition of opposite: 10 + 5. Same signs: 10 + 5 = 15 (positive).', 'easy'),
('subtraction', '(-12) - 8 = ?', '["A. 20", "B. -20", "C. 4", "D. -4"]', 1, 'Change to addition of opposite: (-12) + (-8). Same signs: 12 + 8 = 20, both negative so -20.', 'medium'),
('subtraction', '7 - 15 = ?', '["A. 22", "B. -22", "C. 8", "D. -8"]', 3, 'Change to addition of opposite: 7 + (-15). Different signs: 15 - 7 = 8 (negative), so -8.', 'medium'),
('subtraction', '(-9) - (-9) = ?', '["A. 18", "B. -18", "C. 0", "D. 9"]', 2, 'Change to addition of opposite: (-9) + 9. Any number plus its opposite = 0.', 'medium'),
('subtraction', '20 - (-10) = ?', '["A. 10", "B. -10", "C. 30", "D. -30"]', 2, 'Change to addition of opposite: 20 + 10. Same signs: 20 + 10 = 30 (positive).', 'medium'),
('subtraction', '(-15) - (-20) = ?', '["A. 35", "B. -35", "C. 5", "D. -5"]', 2, 'Change to addition of opposite: (-15) + 20. Different signs: 20 - 15 = 5 (positive).', 'medium'),
('subtraction', '50 - 75 = ?', '["A. 125", "B. -125", "C. 25", "D. -25"]', 3, 'Change to addition of opposite: 50 + (-75). Different signs: 75 - 50 = 25 (negative), so -25.', 'hard'),
('subtraction', '(-30) - 25 = ?', '["A. 55", "B. -55", "C. 5", "D. -5"]', 1, 'Change to addition of opposite: (-30) + (-25). Same signs: 30 + 25 = 55, both negative so -55.', 'hard'),
('subtraction', '(-100) - (-60) = ?', '["A. 160", "B. -160", "C. 40", "D. -40"]', 3, 'Change to addition of opposite: (-100) + 60. Different signs: 100 - 60 = 40 (negative), so -40.', 'hard'),
('subtraction', '8 - (-8) = ?', '["A. 0", "B. 16", "C. -16", "D. 8"]', 1, 'Change to addition of opposite: 8 + 8. Same signs: 8 + 8 = 16 (positive).', 'easy'),
('subtraction', '(-25) - 15 - (-10) = ?', '["A. 30", "B. -30", "C. 50", "D. -50"]', 1, 'Step by step: (-25) + (-15) = -40. Then: (-40) + 10 = -30.', 'hard');

-- DIVISION QUESTIONS (15 questions)
INSERT INTO questions (topic, question_text, options, correct_answer, explanation, difficulty) VALUES
('division', '12 ÷ 3 = ?', '["A. 4", "B. -4", "C. 9", "D. -9"]', 0, 'Same signs (positive ÷ positive) = Positive. 12 ÷ 3 = 4.', 'easy'),
('division', '(-15) ÷ 5 = ?', '["A. 3", "B. -3", "C. 10", "D. -10"]', 1, 'Different signs (negative ÷ positive) = Negative. 15 ÷ 5 = 3, so -3.', 'easy'),
('division', '20 ÷ (-4) = ?', '["A. 5", "B. -5", "C. 16", "D. -16"]', 1, 'Different signs (positive ÷ negative) = Negative. 20 ÷ 4 = 5, so -5.', 'easy'),
('division', '(-24) ÷ (-6) = ?', '["A. -4", "B. 4", "C. -18", "D. 18"]', 1, 'Same signs (negative ÷ negative) = Positive. 24 ÷ 6 = 4.', 'easy'),
('division', '(-36) ÷ 9 = ?', '["A. 4", "B. -4", "C. 27", "D. -27"]', 1, 'Different signs (negative ÷ positive) = Negative. 36 ÷ 9 = 4, so -4.', 'easy'),
('division', '42 ÷ (-7) = ?', '["A. 6", "B. -6", "C. 35", "D. -35"]', 1, 'Different signs (positive ÷ negative) = Negative. 42 ÷ 7 = 6, so -6.', 'medium'),
('division', '(-56) ÷ (-8) = ?', '["A. -7", "B. 7", "C. -48", "D. 48"]', 1, 'Same signs (negative ÷ negative) = Positive. 56 ÷ 8 = 7.', 'medium'),
('division', '81 ÷ 9 = ?', '["A. -9", "B. 9", "C. 72", "D. -72"]', 1, 'Same signs (positive ÷ positive) = Positive. 81 ÷ 9 = 9.', 'medium'),
('division', '(-72) ÷ 8 = ?', '["A. 9", "B. -9", "C. 64", "D. -64"]', 1, 'Different signs (negative ÷ positive) = Negative. 72 ÷ 8 = 9, so -9.', 'medium'),
('division', '100 ÷ (-25) = ?', '["A. 4", "B. -4", "C. 75", "D. -75"]', 1, 'Different signs (positive ÷ negative) = Negative. 100 ÷ 25 = 4, so -4.', 'medium'),
('division', '(-144) ÷ (-12) = ?', '["A. -12", "B. 12", "C. -132", "D. 132"]', 1, 'Same signs (negative ÷ negative) = Positive. 144 ÷ 12 = 12.', 'hard'),
('division', '225 ÷ (-15) = ?', '["A. 15", "B. -15", "C. 210", "D. -210"]', 1, 'Different signs (positive ÷ negative) = Negative. 225 ÷ 15 = 15, so -15.', 'hard'),
('division', '(-200) ÷ 8 = ?', '["A. 25", "B. -25", "C. 192", "D. -192"]', 1, 'Different signs (negative ÷ positive) = Negative. 200 ÷ 8 = 25, so -25.', 'hard'),
('division', '(-63) ÷ (-9) = ?', '["A. -7", "B. 7", "C. -54", "D. 54"]', 1, 'Same signs (negative ÷ negative) = Positive. 63 ÷ 9 = 7.', 'easy'),
('division', '48 ÷ (-6) ÷ (-2) = ?', '["A. 4", "B. -4", "C. 16", "D. -16"]', 0, 'Step by step: 48 ÷ (-6) = -8 (different signs). Then: (-8) ÷ (-2) = 4 (same signs = positive).', 'hard');

