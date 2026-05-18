# 🌐 Web Scraper - Product Information Extractor

A beginner-friendly Python web scraper that extracts product information (titles, prices, ratings, and links) from websites and saves the data to CSV and JSON files.

## 📋 Features

✅ **Easy to Use** - Simple command-line interface  
✅ **Error Handling** - Handles network errors, timeouts, and invalid URLs  
✅ **Multiple Formats** - Saves data to both CSV and JSON files  
✅ **Terminal Display** - Shows extracted data in a formatted table  
✅ **Timestamps** - Automatically adds date/time to scraped data  
✅ **Beginner-Friendly** - Well-commented code for learning  
✅ **Modular Design** - Functions organized for easy understanding  

## 📁 Project Structure

```
WebScraper/
├── main.py              # Main scraper script
├── requirements.txt     # Python dependencies
├── data.csv            # Sample output (CSV format)
├── data.json           # Sample output (JSON format)
└── README.md           # This file
```

## 🚀 Quick Start

### Step 1: Install Python
Make sure you have Python 3.7+ installed. Download from: https://www.python.org/downloads/

### Step 2: Install Dependencies

Open PowerShell or Command Prompt and navigate to the project folder:

```bash
cd "C:\Users\DELL\Desktop\sriku 3\WebScraper"
```

Install required libraries:

```bash
pip install -r requirements.txt
```

**Alternative (if pip doesn't work):**
```bash
python -m pip install -r requirements.txt
```

### Step 3: Run the Scraper

```bash
python main.py
```

### Step 4: Follow the Prompts

1. Enter the website URL you want to scrape
2. The script will fetch and parse the webpage
3. Extracted data will be displayed in the terminal
4. Data will be automatically saved to `data.csv` and `data.json`

## 📖 How It Works

### 1. **Fetch Webpage** (`fetch_webpage()`)
   - Requests the webpage from the URL
   - Adds headers to avoid being blocked
   - Handles connection errors and timeouts

### 2. **Scrape Products** (`scrape_products()`)
   - Parses HTML using BeautifulSoup
   - Extracts titles, prices, ratings, and links
   - Handles missing data gracefully

### 3. **Save to CSV** (`save_to_csv()`)
   - Creates a spreadsheet-compatible file
   - Easy to open in Excel or Google Sheets

### 4. **Save to JSON** (`save_to_json()`)
   - Creates a structured data format
   - Includes metadata and timestamps

### 5. **Display Data** (`display_data()`)
   - Shows results in a formatted table in the terminal

## 📝 Example Usage

```bash
python main.py

🌐 WEB SCRAPER - Product Information Extractor

📝 Please enter the website URL you want to scrape:
   (Example: https://example.com or example.com)

🔗 Enter URL: https://example.com

🔄 Fetching webpage: https://example.com
✅ Webpage fetched successfully!
🔍 Found 5 product containers
✅ Extracted 5 products successfully!

================================================================================
📊 SCRAPED PRODUCTS DATA
================================================================================

📦 Product 1:
   Title:  Wireless Bluetooth Headphones
   Price:  $49.99
   Rating: 4.5/5
   Link:   https://example.com/product1

[... more products ...]

================================================================================
✅ Total Products Scraped: 5
📅 Scraped on: 2026-05-17 10:30:15
================================================================================

💾 Saving data...
✅ Data saved to data.csv (5 products)
✅ Data saved to data.json (5 products)

✅ Scraping completed successfully!
📁 Check 'data.csv' and 'data.json' files for the scraped data.
```

## 📊 Output Files

### data.csv
A spreadsheet file with columns:
- **Title** - Product name
- **Price** - Product price
- **Rating** - Product rating
- **Link** - Product URL
- **Scraped At** - Date and time of scraping

### data.json
A structured JSON file containing:
```json
{
  "metadata": {
    "total_products": 5,
    "scraped_at": "2026-05-17 10:30:15",
    "scraping_tool": "Web Scraper v1.0"
  },
  "products": [...]
}
```

## ⚠️ Error Handling

The script handles various errors gracefully:

| Error | What Happens |
|-------|-------------|
| **Invalid URL** | Script adds "http://" if needed |
| **No Internet** | Shows "Cannot connect" error |
| **Website Slow** | Shows "Request timed out" error |
| **Empty URL** | Shows "URL cannot be empty" error |
| **No Products Found** | Shows "No products found" message |

## 🛠️ Troubleshooting

### Error: "ModuleNotFoundError: No module named 'requests'"
**Solution:** Run `pip install -r requirements.txt` again

### Error: "ModuleNotFoundError: No module named 'bs4'"
**Solution:** Run `pip install beautifulsoup4`

### Website returns "No products found"
**Reasons:**
- Website structure is different than expected
- Website blocks scraping with JavaScript
- Website has anti-scraping protections
- No products on that page

**Solutions:**
- Try a different website
- Check if the website allows scraping (robots.txt)
- Add delays between requests (modify the code)

### Error: "(WinError 32) The process cannot access the file"
**Reason:** CSV or JSON file is open in another program  
**Solution:** Close the file and try again

## 💡 Tips for Beginners

1. **Understanding the Code:**
   - Each function has a specific job (modular design)
   - Comments explain what each line does
   - Read comments from top to bottom

2. **Testing:**
   - Start with popular websites like Amazon, eBay
   - Some websites may have different HTML structures
   - Not all websites allow scraping

3. **Learning:**
   - Inspect the website's HTML (right-click → Inspect)
   - Understand class names and tag structures
   - Modify the code to extract different data

4. **Performance:**
   - Use a delay between requests (avoid being blocked)
   - Respect robots.txt and terms of service
   - Don't scrape very large websites at once

## 📚 Required Libraries

- **requests** - For fetching web pages
- **beautifulsoup4** - For parsing HTML

## 🔗 Useful Resources

- [Python Official Docs](https://docs.python.org/3/)
- [Requests Library Docs](https://requests.readthedocs.io/)
- [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [HTML Basics](https://www.w3schools.com/html/)

## ⚖️ Legal Notice

⚠️ **Important:**
- Always check the website's `robots.txt` file
- Respect the website's Terms of Service
- Don't scrape personal or sensitive data
- Don't overload servers with too many requests
- Some websites prohibit automated scraping
- Use responsibly and ethically

## 🔧 Running in VS Code

### Method 1: Using Terminal (Recommended for Beginners)
1. Open the project folder in VS Code
2. Open Terminal (View → Terminal or Ctrl+`)
3. Type: `python main.py`
4. Press Enter

### Method 2: Using Run Button
1. Open `main.py` in VS Code
2. Click the ▶️ Run button in the top-right corner
3. Script will start in the terminal

### Method 3: Using Debug
1. Open `main.py` in VS Code
2. Click Run → Start Debugging (F5)
3. Follow the prompts in the Debug Console

## 📝 Modifying the Code

Want to scrape different information? Edit the `scrape_products()` function:

```python
# Look for different elements
title_element = container.find('h2', class_='product-title')
price_element = container.find('span', class_='product-price')
```

## 🐛 Known Limitations

- Only extracts visible text (no JavaScript-rendered content)
- Website-specific changes may break the scraper
- Some websites block automated requests
- Large websites may take time to scrape

## 🎯 Next Steps

After mastering this project:
- Add support for pagination (multiple pages)
- Implement headless browser (Selenium, Playwright)
- Add database support (SQLite, PostgreSQL)
- Create a web interface (Flask, Django)
- Build API endpoints (FastAPI)

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the comments in the code
3. Test with a different website
4. Check BeautifulSoup and requests documentation

---

**Happy Scraping! 🚀**

*Last Updated: May 17, 2026*
