"""
Web Scraper Application
A beginner-friendly web scraper using BeautifulSoup and requests.
This script scrapes product information (titles, prices, ratings, and links)
from a website and saves the data to CSV and JSON files.
"""

# Import required libraries
import requests                    # For making HTTP requests
from bs4 import BeautifulSoup      # For parsing HTML content
import csv                         # For working with CSV files
import json                        # For working with JSON files
from datetime import datetime      # For storing date and time
import time                        # For adding delays between requests


# ============================================================================
# FUNCTION 1: Validate and fetch webpage
# ============================================================================
def fetch_webpage(url):
    """
    Fetches the content of a webpage from the given URL.
    
    Parameters:
        url (str): The URL of the website to scrape
    
    Returns:
        BeautifulSoup object if successful, None if failed
    """
    
    # Check if URL is empty
    if not url.strip():
        print("❌ Error: URL cannot be empty!")
        return None
    
    # Add 'http://' if user doesn't provide protocol
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
    
    try:
        # Add a user agent to avoid being blocked by websites
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        print(f"🔄 Fetching webpage: {url}")
        
        # Make HTTP request with timeout (5 seconds)
        response = requests.get(url, headers=headers, timeout=5)
        
        # Check if request was successful (status code 200)
        if response.status_code == 200:
            print("✅ Webpage fetched successfully!")
            # Return BeautifulSoup object for parsing
            return BeautifulSoup(response.content, 'html.parser')
        else:
            print(f"❌ Error: Server returned status code {response.status_code}")
            return None
            
    # Handle connection errors
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to the website. Check your internet connection.")
        return None
    
    # Handle timeout errors
    except requests.exceptions.Timeout:
        print("❌ Error: Request timed out. The website took too long to respond.")
        return None
    
    # Handle any other errors
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: An error occurred while fetching the webpage: {e}")
        return None


# ============================================================================
# FUNCTION 2: Extract product information from HTML
# ============================================================================
def scrape_products(soup):
    """
    Extracts product information from the parsed HTML.
    Looks for common product elements like titles, prices, ratings, and links.
    
    Parameters:
        soup (BeautifulSoup): Parsed HTML content
    
    Returns:
        list: A list of dictionaries containing product information
    """
    
    products = []  # Empty list to store product data
    
    try:
        # Look for product containers (div, article, or li elements with product-related class names)
        product_containers = soup.find_all(['div', 'article', 'li'], class_=lambda x: x and any(
            keyword in x.lower() for keyword in ['product', 'item', 'card', 'listing']
        ))
        
        # If specific containers not found, try alternative method
        if not product_containers:
            product_containers = soup.find_all(['div', 'article'], limit=10)
        
        print(f"🔍 Found {len(product_containers)} product containers")
        
        # Loop through each product container
        for container in product_containers:
            
            # Extract Title
            title = None
            title_element = container.find(['h1', 'h2', 'h3', 'a'], class_=lambda x: x and 'title' in x.lower())
            if title_element:
                title = title_element.get_text(strip=True)
            else:
                title_element = container.find(['span', 'p', 'a'])
                if title_element:
                    title = title_element.get_text(strip=True)
            
            # Extract Price
            price = "N/A"
            price_element = container.find(['span', 'p'], class_=lambda x: x and 'price' in x.lower())
            if price_element:
                price = price_element.get_text(strip=True)
            
            # Extract Rating
            rating = "N/A"
            rating_element = container.find(['span', 'div'], class_=lambda x: x and 'rating' in x.lower())
            if rating_element:
                rating = rating_element.get_text(strip=True)
            
            # Extract Product Link
            link = "N/A"
            link_element = container.find('a', href=True)
            if link_element:
                link = link_element['href']
                # Convert relative links to absolute links
                if link.startswith('/'):
                    link = "https://example.com" + link
            
            # Only add product if we found a title
            if title and title.strip():
                product = {
                    'title': title[:100],  # Limit title length
                    'price': price[:50],   # Limit price length
                    'rating': rating[:50], # Limit rating length
                    'link': link
                }
                products.append(product)
        
        print(f"✅ Extracted {len(products)} products successfully!")
        return products
    
    # Handle any errors during scraping
    except Exception as e:
        print(f"❌ Error during scraping: {e}")
        return []


# ============================================================================
# FUNCTION 3: Save data to CSV file
# ============================================================================
def save_to_csv(products, filename='data.csv'):
    """
    Saves the scraped product data to a CSV file.
    CSV files are easy to open in Excel and other spreadsheet applications.
    
    Parameters:
        products (list): List of product dictionaries
        filename (str): Name of the CSV file
    
    Returns:
        bool: True if successful, False if failed
    """
    
    # Check if there's data to save
    if not products:
        print("⚠️  Warning: No data to save to CSV!")
        return False
    
    try:
        # Open file in write mode
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            
            # Define column headers
            fieldnames = ['Title', 'Price', 'Rating', 'Link', 'Scraped At']
            
            # Create CSV writer
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            # Write header row
            writer.writeheader()
            
            # Write each product as a row
            for product in products:
                writer.writerow({
                    'Title': product['title'],
                    'Price': product['price'],
                    'Rating': product['rating'],
                    'Link': product['link'],
                    'Scraped At': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
        
        print(f"✅ Data saved to {filename} ({len(products)} products)")
        return True
    
    # Handle file writing errors
    except Exception as e:
        print(f"❌ Error saving to CSV: {e}")
        return False


# ============================================================================
# FUNCTION 4: Save data to JSON file
# ============================================================================
def save_to_json(products, filename='data.json'):
    """
    Saves the scraped product data to a JSON file.
    JSON files are great for APIs and data interchange.
    
    Parameters:
        products (list): List of product dictionaries
        filename (str): Name of the JSON file
    
    Returns:
        bool: True if successful, False if failed
    """
    
    # Check if there's data to save
    if not products:
        print("⚠️  Warning: No data to save to JSON!")
        return False
    
    try:
        # Create a dictionary to store metadata and products
        data = {
            'metadata': {
                'total_products': len(products),
                'scraped_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'scraping_tool': 'Web Scraper v1.0'
            },
            'products': products
        }
        
        # Open file in write mode
        with open(filename, 'w', encoding='utf-8') as jsonfile:
            # Write data as formatted JSON (indent=2 for readability)
            json.dump(data, jsonfile, indent=2, ensure_ascii=False)
        
        print(f"✅ Data saved to {filename} ({len(products)} products)")
        return True
    
    # Handle file writing errors
    except Exception as e:
        print(f"❌ Error saving to JSON: {e}")
        return False


# ============================================================================
# FUNCTION 5: Display data in terminal
# ============================================================================
def display_data(products):
    """
    Displays the scraped products in a nicely formatted table in the terminal.
    
    Parameters:
        products (list): List of product dictionaries
    """
    
    # Check if there's data to display
    if not products:
        print("❌ No data to display!")
        return
    
    print("\n" + "="*100)
    print("📊 SCRAPED PRODUCTS DATA".center(100))
    print("="*100)
    
    # Display each product with formatting
    for index, product in enumerate(products, 1):
        print(f"\n📦 Product {index}:")
        print(f"   Title:  {product['title']}")
        print(f"   Price:  {product['price']}")
        print(f"   Rating: {product['rating']}")
        print(f"   Link:   {product['link']}")
    
    print("\n" + "="*100)
    print(f"✅ Total Products Scraped: {len(products)}".center(100))
    print(f"📅 Scraped on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}".center(100))
    print("="*100 + "\n")


# ============================================================================
# FUNCTION 6: Main function - orchestrates the entire scraping process
# ============================================================================
def main():
    """
    Main function that runs the web scraper.
    Orchestrates the entire process: fetch, scrape, save, and display.
    """
    
    print("\n" + "="*100)
    print("🌐 WEB SCRAPER - Product Information Extractor".center(100))
    print("="*100)
    print("This tool scrapes product information (titles, prices, ratings, links) from websites.")
    print("="*100 + "\n")
    
    # Step 1: Get URL from user
    print("📝 Please enter the website URL you want to scrape:")
    print("   (Example: https://example.com or example.com)")
    url = input("\n🔗 Enter URL: ").strip()
    
    # Step 2: Fetch the webpage
    print()
    soup = fetch_webpage(url)
    
    # If fetching failed, exit the program
    if soup is None:
        print("\n❌ Failed to fetch the webpage. Exiting...\n")
        return
    
    # Step 3: Scrape product information
    print()
    products = scrape_products(soup)
    
    # If scraping failed or no products found, show message
    if not products:
        print("\n⚠️  No products found. The website structure might be different than expected.")
        print("Try with a different website.\n")
        return
    
    # Step 4: Display data in terminal
    print()
    display_data(products)
    
    # Step 5: Save to CSV file
    print("💾 Saving data...")
    save_to_csv(products)
    
    # Step 6: Save to JSON file
    save_to_json(products)
    
    print("\n✅ Scraping completed successfully!")
    print("📁 Check 'data.csv' and 'data.json' files for the scraped data.\n")


# ============================================================================
# PROGRAM ENTRY POINT
# ============================================================================

# This ensures the main() function runs only when the script is executed directly
# (not when imported as a module in another script)
if __name__ == "__main__":
    main()
