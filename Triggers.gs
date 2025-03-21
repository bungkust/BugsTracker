// Triggers.gs

// Function to create a daily trigger that runs the sendTodayEmails() function at 8 AM.
// Replace any placeholder with your actual value if needed.
function createDailyTrigger() {
  ScriptApp.newTrigger("sendTodayEmails")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  SpreadsheetApp.getUi().alert("Daily trigger set for 8 AM!");
}

// Function to delete all triggers in the project.
function deleteAllTriggers() {
  ScriptApp.getProjectTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));
  SpreadsheetApp.getUi().alert("All triggers have been deleted.");
}

// Function to send email notifications when an issue's status changes from "Not started" 
// to one of the allowed statuses. This function is designed to be run manually (via a custom menu).
// It uses a marker in column O (15th column) to ensure that emails for a row are sent only once.
function sendStatusChangeEmails() {
  // Replace these placeholders with your actual values.
  const sheetName = "YOUR_SHEET_NAME"; // e.g., "Ada Issue Tracker"
  const senderEmail = "YOUR_SENDER_EMAIL"; // e.g., "your.email@example.com"
  const recipients = "RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2"; // e.g., "email1@example.com, email2@example.com"
  
  // Allowed statuses that trigger the email notification.
  const allowedStatuses = ["In progress", "Blocked", "Done", "Ready For Testing", "In Testing"];
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" not found!`);
    return;
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("No data found!");
    return;
  }
  
  // Retrieve data from columns A to O (15 columns) assuming row 1 is the header.
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 15);
  const data = dataRange.getValues();
  
  let emailsSent = 0;
  
  data.forEach((row, index) => {
    // Destructure values from the row.
    // Order: A: platform, B: type, C: priority, D: module, E: reportDate, F: issueTitle,
    // G: description, J: assignee, K: status, O: marker.
    const [
      platform, 
      type, 
      priority, 
      module, 
      reportDate, 
      issueTitle, 
      description, 
      , 
      , 
      assignee, 
      status, 
      , 
      , 
      email, 
      notified
    ] = row;
    
    // Process only if the status has changed from "Not started" and is within allowed statuses.
    if (status === "Not started" || allowedStatuses.indexOf(status) === -1) return;
    // If the row is already marked as "Notified", skip it.
    if (notified && notified.toString().toLowerCase() === "notified") return;
    
    // Calculate the actual row number in the sheet.
    const rowNum = index + 2;
    // Get the email of the user who is running this function.
    const changedBy = Session.getActiveUser().getEmail();
    
    // Build the email subject including the row number and issue title.
    const subject = `Issue Status Changed for Row ${rowNum}: ${issueTitle}`;
    // Build the email message with all the details.
    const message = 
      "The following issue has had its status updated:\n\n" +
      "Row: " + rowNum + "\n" +
      "Platform: " + platform + "\n" +
      "Type: " + type + "\n" +
      "Priority: " + priority + "\n" +
      "Module: " + module + "\n" +
      "Report Date: " + reportDate + "\n" +
      "Issue Title: " + issueTitle + "\n" +
      "Description: " + description + "\n\n" +
      "New Status: " + status + "\n" +
      "Updated by: " + changedBy;
    
    try {
      GmailApp.sendEmail(recipients, subject, message);
      emailsSent++;
      // Mark the row as "Notified" in column O so the same row is not processed again.
      sheet.getRange(rowNum, 15).setValue("Notified");
    } catch (error) {
      Logger.log(`Error sending email for row ${rowNum}: ${error.message}`);
    }
  });
  
  SpreadsheetApp.getUi().alert(`${emailsSent} email(s) sent for status changes.`);
}
