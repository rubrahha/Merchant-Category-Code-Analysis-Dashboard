
import { GoogleGenAI } from "@google/genai";
import { SpendingByCategory, SpendingTrendPoint } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development, in a real environment the key should be set.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateInsights(
    topSpendingCategories: SpendingByCategory[],
    spendingTrend: SpendingTrendPoint[]
): Promise<string> {

  if (!API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable. Returning mock insights.\n\n- **Top Spending**: Groceries and Travel are the highest spending categories, indicating a focus on essentials and leisure.\n- **Monthly Trend**: Spending peaked in December, likely due to holiday shopping. A significant dip was observed in November for most categories except Department Stores.\n- **Recommendation**: Monitor the subscription category for potential cost-saving opportunities.";
  }
    
  const dataSummary = `
    Top Spending Categories by Total Amount:
    ${topSpendingCategories.map(c => `- ${c.name}: $${c.total.toFixed(2)}`).join('\n')}

    Monthly Spending Trends:
    ${spendingTrend.map(month => {
        const entries = Object.entries(month).filter(([key]) => key !== 'date');
        return `- ${month.date}: ${entries.map(([cat, val]) => `${cat}: $${(val as number).toFixed(2)}`).join(', ')}`;
    }).join('\n')}
  `;

  const prompt = `
    You are a senior data analyst for a financial institution.
    Analyze the following transaction data summary and provide a concise, insightful report for a customer.
    The report should be in markdown format.
    Focus on identifying key spending habits, trends over time, and offer one or two actionable recommendations.
    Do not just repeat the data, provide interpretation.

    Data Summary:
    ${dataSummary}
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating insights from Gemini API:", error);
    return "An error occurred while generating insights. Please check the console for details.";
  }
}
