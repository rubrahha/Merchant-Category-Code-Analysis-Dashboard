This project is about analyzing and categorizing merchant transactions (like purchases made at stores, restaurants, etc.) using Merchant Category Codes (MCCs) — special 4-digit codes that describe the type of business (for example, 5411 = Grocery Stores, 5812 = Restaurants).

Here’s what you did in simple terms:

🧩 Data Collection & Cleaning:
You took raw transaction data from a PostgreSQL database and used SQL to extract and clean it — removing duplicates, fixing missing values, etc.

🔍 Categorizing Merchants:
You wrote a Python script to automatically match merchant names (like “Starbucks”, “Walmart”) to their correct MCC codes using Pandas, NumPy, and fuzzy matching (a technique that matches names even if they aren’t spelled exactly the same).
→ This helped classify transactions with 95% accuracy.

📊 Analyzing Spending Trends:
You performed Exploratory Data Analysis (EDA) to find patterns in customer spending — like which categories people spend most on.
You used Matplotlib and Seaborn to create visual charts and heatmaps to show these insights clearly.

⚙️ Automation:
You automated this whole process to run daily, so new transactions get categorized automatically — saving about 40% of manual effort/time.

In Short:-
An automated data pipeline that takes daily transaction data, classifies it by merchant type using MCCs, and provides clear insights into spending behavior — helping improve payment analytics and customer segmentation.



 <img width="952" height="499" alt="image" src="https://github.com/user-attachments/assets/a740bb17-832c-4723-99ae-730518466525" />
 <img width="945" height="496" alt="image" src="https://github.com/user-attachments/assets/740a0209-06e4-42d0-b0ff-dead53f25d68" />



## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
