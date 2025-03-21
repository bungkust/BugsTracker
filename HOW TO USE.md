# How to Use the BugsTracker Project

This guide will help you set up and use the BugsTracker Google Apps Script project. Follow the steps below to configure your project and start sending email notifications.

## 1. Prepare Your Google Sheet

1. **Create or Open a Google Sheet:**
   - Create a new Google Sheet or use an existing one.
   - Rename one of the sheets to **"Ada Issue Tracker"** (or your preferred sheet name).

2. **Configure the Columns:**
   - Ensure your sheet has the following columns with headers in row 1:
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
     - **N:** Recipient Email (if needed)
     - **O:** Marker (this column is used to mark rows as "Notified" after sending status change emails)

## 2. Set Up the Google Apps Script Project

1. **Open Apps Script Editor:**
   - In your Google Sheet, click on **Extensions > Apps Script**.
   
2. **Add the Code Files:**
   - Create a new file named `SendEmail.gs` and paste the provided code (see the code above) into it.
   - Create additional files as needed (for example, `CustomMenu.gs` and `Triggers.gs`).
   
3. **Update Placeholder Values:**
   - In `SendEmail.gs` (and other code files if necessary), replace the placeholder values with your actual information:
     - **YOUR_SHEET_NAME:** Replace with your sheet name (e.g., `"Ada Issue Tracker"`).
     - **YOUR_SENDER_EMAIL:** Replace with the email address you want to use as the sender.
     - **YOUR_GOOGLE_SHEET_LINK:** Replace with the URL link of your Google Sheet.
   - **Example:**
     ```javascript
     const sheetName = "Ada Issue Tracker";
     const senderEmail = "your.email@example.com";
     const sheetLink = "https://docs.google.com/spreadsheets/d/your-sheet-id/edit#gid=0";
     ```
     
4. **Save Your Project:**
   - Give your project a name (e.g., `BugsTrackerScript`).
   - Save all changes.

## 3. Set Up the Custom Menu

- The project includes an `onOpen()` function (in `CustomMenu.gs`) that creates a custom menu named **"Custom Scripts"**.
- **Reload your Google Sheet** to see the new menu in the toolbar.

## 4. Using the Custom Menu Options

When you open your Google Sheet, click on the **"Custom Scripts"** menu. You will see several options:

- **Send Issue Emails:**  
  Sends email notifications for rows where the status is **"Not started"** (up to 50 rows).

- **Send Emails (Today Only):**  
  Sends email notifications for rows where the report date (column E) matches today’s date and the status is **"Not started"**.

- **Send Status Change Emails:**  
  Scans all rows and sends notifications for rows that have changed from **"Not started"** to an allowed status (e.g., "In progress", "Blocked", etc.).  
  This function uses column O as a marker to ensure that each row is processed only once.

- **Set Daily Trigger:**  
  Creates a daily trigger to automatically run the **Send Emails (Today Only)** function at 8 AM.

- **Delete All Triggers:**  
  Removes all active triggers from the project.

## 5. Testing the Functions

1. **Manually Trigger Functions:**
   - Modify your sheet data to meet the conditions (for example, set a row’s status to "Not started" or update a report date).
   - Use the custom menu options to run the corresponding functions.

2. **Review Logs and Alerts:**
   - If you encounter issues or need to debug, open the Apps Script Editor and select **View > Logs** to see the output.
   - The functions also display alerts with the number of emails sent or if any rows were skipped.

## 6. Customization and Security

- **Placeholders:**  
  Ensure you replace all placeholder text (e.g., `YOUR_SHEET_NAME`, `YOUR_SENDER_EMAIL`, `YOUR_GOOGLE_SHEET_LINK`) with your actual values before deploying the project.

- **Security Considerations:**  
  Avoid hardcoding sensitive data in your code if possible. Use placeholders or external configuration files where necessary.

## 7. Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets Help](https://support.google.com/docs/)

Enjoy using BugsTracker to automate your issue tracking and notifications!
