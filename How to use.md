# How to Use BugsTracker Code

This guide explains how to set up and use the BugsTracker code in your Google Sheet. Follow these steps to get started:

## 1. Set Up Your Google Sheet

1. **Create or Open a Google Sheet**  
   - Open a new or existing Google Sheet.
   - Rename one of the sheets to **"Ada Issue Tracker"**.

2. **Configure the Columns**  
   Ensure your sheet has at least the following columns (with headers in row 1):
   - **A:** Platform
   - **B:** Type
   - **C:** Priority
   - **D:** Module
   - **E:** Report Date
   - **F:** Issue Title
   - **G:** Description
   - **J:** Assignee (Name)
   - **K:** Status  
     (e.g., "Not started", "In progress", "Blocked", "Done", "Ready For Testing", "In Testing")
   - **N:** Recipient Email (if applicable)
   - **O:** Marker (for status change email notifications; leave blank initially)

## 2. Add the Code to Your Google Apps Script Project

1. **Open Apps Script Editor**  
   - In your Google Sheet, click on **Extensions > Apps Script**.
2. **Create the Script Files**  
   - Delete any existing code in the editor.
   - Create new files with the following names and copy the corresponding code:
     - `SendEmail.gs` – Contains functions for sending issue emails and today's emails.
     - `CustomMenu.gs` – Contains the code for creating a custom menu.
     - `Triggers.gs` – Contains functions for setting and deleting triggers, as well as sending status change emails.
3. **Add the Manifest File (Optional)**  
   - Create a file named `appsscript.json` with the appropriate configuration (see repository documentation).

## 3. Set Up the Custom Menu

- The `CustomMenu.gs` file includes an `onOpen()` function that creates a custom menu called **"Custom Scripts"**.
- **Reload your Google Sheet** to see the new menu in the toolbar.

## 4. How to Use the Custom Menu Options

When you open your Google Sheet, click on the **"Custom Scripts"** menu. You will see several options:

- **Send Issue Emails**  
  - Sends email notifications for issues where the status is **"Not started"** (up to 50 rows).
- **Send Emails (Today Only)**  
  - Sends emails only for rows where the report date (column E) is today's date and status is **"Not started"**.
- **Send Status Change Emails**  
  - Scans all rows and sends email notifications when an issue’s status has changed from **"Not started"** to one of the allowed statuses (e.g., "In progress", "Blocked", etc.).
  - This function uses the Marker in column O to ensure the email for a row is only sent once.
- **Set Daily Trigger**  
  - Creates a daily trigger that will automatically run the **Send Emails (Today Only)** function at 8 AM.
- **Delete All Triggers**  
  - Removes all triggers that have been created by this project.

## 5. Testing the Functions

1. **Test Manually:**  
   - Change data in your sheet (for example, update the status in column K).
   - Then, select the corresponding option from the **Custom Scripts** menu.
2. **Check Logs and Alerts:**  
   - If something goes wrong or you need to see details, open the Apps Script Editor and click on **View > Logs** to review messages.

## 6. Customizing the Code

- **Email Addresses:**  
  - Modify the email addresses in the code if you want notifications sent to different recipients.
- **Sheet Link:**  
  - Update the Google Sheet link in the code if your sheet’s URL is different.
- **Column Indices:**  
  - Adjust the column ranges if your sheet’s structure is different from what is described in this guide.
- **Message Content:**  
  - Customize subject lines and email message contents according to your needs.

## 7. Additional Information

- **No Automatic Triggers:**  
  - This project is designed to be run manually through the custom menu. If you wish to use automatic triggers, refer to the `createDailyTrigger` function.
- **Further Documentation:**  
  - For more information on Google Apps Script, visit the [Google Apps Script Documentation](https://developers.google.com/apps-script).

Enjoy using BugsTracker to streamline your issue tracking and email notifications!
