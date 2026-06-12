
# Telegram QR Attendance Bot

A Telegram bot built with Node.js that automates event attendance by scanning and processing QR codes from user-submitted photos. Specifically designed to parse IITK ID Card QR formats and validate student roll numbers.

## Features
* **Automated QR Scanning:** Users simply send a photo of an ID card to the bot.
* **Data Extraction:** Decodes the QR image and extracts the 6-digit roll number.
* **Validation:** Checks if the parsed roll number falls within the registered student range.
* **Attendance Tracking:** Logs the student as present and prevents duplicate attendance entries.
* **Reporting:** Generates a real-time summary report of total attendees and a list of present roll numbers.

## Project Structure
```text
├── bot.js            # Main entry point and Telegram interaction logic
├── qr.js             # Image processing and QR decoding (Jimp & jsQR)
├── parser.js         # Regex extraction and validation logic
├── attendence.js     # Database/Storage simulation for attendance logging
├── package.json      # Dependency list
└── .env.example      # Template for environment variables
