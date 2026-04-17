// Verification Suite for SmartCart AI Engine
import { SMART_LOGIC, INVENTORY } from './src/lib/engine.js';

const runTests = () => {
    console.log("🚀 Starting SmartCart AI Verification Suite...");

    // Test 1: Recommendation Engine
    const mockCart = [INVENTORY[0]]; // Artisan Pasta
    const recs = SMART_LOGIC.getRecommendations(mockCart);
    if (recs.length > 0 && recs.some(r => r.id === '2' || r.id === '3')) {
        console.log("✅ RECOMMENDATION LOGIC: PASSED (Pasta -> Pesto/Cheese)");
    } else {
        console.log("❌ RECOMMENDATION LOGIC: FAILED");
    }

    // Test 2: Bundle Logic
    const bundle = SMART_LOGIC.getBundles(mockCart);
    if (bundle && bundle.name.includes("Gemini")) {
        console.log("✅ BUNDLE LOGIC: PASSED (Gemini Optimized Bundle found)");
    } else {
        console.log("❌ BUNDLE LOGIC: FAILED");
    }

    // Test 3: Shipping Nudges
    const lowTotal = 20;
    const nudge = SMART_LOGIC.getNudges(lowTotal);
    if (nudge && nudge.type === 'shipping') {
        console.log("✅ NUDGE LOGIC: PASSED (Shipping nudge active for low total)");
    } else {
        console.log("❌ NUDGE LOGIC: FAILED");
    }

    console.log("🏁 Verification Suite Complete.");
};

runTests();
