# BugsTracker

**BugsTracker** is a comprehensive, modular project designed to automate and streamline issue tracking and notifications using Google Sheets and Google Apps Script. This repository houses multiple modules that help teams stay informed about bugs and issues while improving collaboration and response time.

## Overview

BugsTracker includes:

- **Issue Tracker Email Notifier:**  
  Automatically sends detailed email notifications based on issue data stored in a Google Sheet.

- **Status Change Alerts:**  
  Notifies designated recipients when an issue's status changes from "Not started" to one of the following: "In progress", "Blocked", "Done", "Ready For Testing", or "In Testing". The alert email contains issue details, the row number, and information about who updated the status.

- **Custom Menu Integration:**  
  Provides a custom menu in Google Sheets to manually trigger email notifications, set daily triggers, and manage other functionalities.

- **Scalability & Flexibility:**  
  Organized in a modular structure to allow adding more scripts or tools for different purposes within the same repository.

## Features

- **Automated Notifications:**  
  Send emails automatically based on issue reports and status changes.

- **Manual Trigger via Custom Menu:**  
  Easily run functions from a custom menu within your Google Sheet.

- **Daily Scheduling:**  
  Option to set up daily triggers for notifications (e.g., "Send Emails (Today Only)").

- **Modular Design:**  
  Add and manage different code modules in one central repository.

## Getting Started

### Prerequisites

- A Google account with access to Google Sheets and Google Apps Script.
- Basic familiarity with Google Sheets.
- (Optional) Some knowledge of JavaScript if you plan to customize the scripts.

### Step-by-Step Setup

1. **Prepare Your Google Sheet:**
   - Create (or use an existing) Google Sheet.
   - Rename one of the sheets to **"Ada Issue Tracker"**.
   - Ensure the sheet has the following columns (with headers in row 1):
     - **A:** Platform  
     - **B:** Type  
     - **C:** Priority  
     - **D:** Module  
     - **E:** Report Date  
     - **F:** Issue Title  
     - **G:** Description  
     - **J:** Assignee  
     - **K:** Status (e.g., "Not started", "In progress", etc.)
     - **N:** Recipient Email (if needed)
     - **O:** Marker column (to indicate that a status-change email has already been sent)

2. **Add the Code to Google Apps Script:**
   - Open your Google Sheet.
   - Click on **Extensions > Apps Script**.
   - Delete any existing code in the editor, then copy and paste the entire code files from this repository into the editor.
   - Save your project (for example, name it `BugsTrackerScript`).

3. **Set Up the Custom Menu:**
   - The script includes an `onOpen()` function that creates a custom menu called **"Custom Scripts"**.
   - Refresh your Google Sheet to load the new menu.

4. **Manually Trigger Functions:**
   - Use the **"Custom Scripts"** menu in your Google Sheet to run the following functions:
     - **Send Issue Emails:**  
       Sends emails for issues with status "Not started" (up to 50 rows).
     - **Send Emails (Today Only):**  
       Sends emails for issues where the report date equals today's date and the status is "Not started".
     - **Send Status Change Emails:**  
       Scans all rows for status changes (from "Not started" to allowed statuses) and sends alert emails. (Uses a marker in column O so that emails are not sent more than once for the same row.)
     - **Set Daily Trigger:**  
       Creates a daily trigger to run the "Send Emails (Today Only)" function at 8 AM.
     - **Delete All Triggers:**  
       Removes all scheduled triggers.

5. **Customize as Needed:**
   - Update email addresses or the sheet link in the code.
   - Adjust column indices if your sheet structure differs.
   - Modify message content and subject lines according to your needs.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to fork this repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue in this repository or contact the project maintainer.

