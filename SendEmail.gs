// SendEmail.gs

// Function to send issue emails (for rows with status "Not started")
function sendIssueEmails() {
  // Replace these placeholders with your actual values.
  const sheetName = "YOUR_SHEET_NAME"; // e.g., "Ada Issue Tracker"
  const senderEmail = "YOUR_SENDER_EMAIL"; // e.g., "your.email@example.com"
  const sheetLink = "YOUR_GOOGLE_SHEET_LINK"; // e.g., "https://docs.google.com/spreadsheets/d/your-sheet-id/edit#gid=0"
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const maxRows = 50;
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" not found!`);
    return;
  }
  
  const data = sheet.getRange(2, 1, Math.min(sheet.getLastRow() - 1, maxRows), 14).getValues();
  let emailsSent = 0, missingEmails = 0, invalidEmails = 0, skippedRows = 0;
  
  data.forEach(row => {
    // Destructure row values (columns A, B, C, D, E, F, G, <unused>, <unused>, J, K, <unused>, <unused>, N)
    const [platform, type, priority, module, reportDate, issueTitle, description, , , assignee, status, , , email] = row;
    
    if (status !== "Not started") {
      skippedRows++;
      return;
    }
    
    const assigneeEmail = emailRegex.test(email) ? email.trim() : null;
    if (!assigneeEmail) {
      email ? invalidEmails++ : missingEmails++;
      return;
    }
    
    const subject = `New Issue Reported (${status}): ${issueTitle}`;
    const message = `
Dear ${assignee},

We would like to inform you of a newly reported issue in the system. Please find the details below:

Platform: ${platform}
Type: ${type}
Priority: ${priority}
Module/Menu/Feature: ${module}
Report Date: ${reportDate}

Issue Title: ${issueTitle}

Description:
${description}

Please prioritize this issue as it is classified as ${priority}. Let us know if further clarification or additional information is needed.

For more details, you can view the issue tracker sheet here:
${sheetLink}

Thank you for your prompt attention to this matter.

Best regards,
`;
    
    try {
      GmailApp.sendEmail(assigneeEmail, subject, message, { from: senderEmail });
      emailsSent++;
    } catch (error) {
      Logger.log(`Failed to send email to: ${assigneeEmail}, Error: ${error.message}`);
    }
  });
  
  SpreadsheetApp.getUi().alert(`
    ${emailsSent} email(s) sent successfully.
    ${missingEmails} row(s) missing email addresses.
    ${invalidEmails} row(s) had invalid email addresses.
    ${skippedRows} row(s) skipped (status is not "Not started").
  `);
}

// Function to send emails only for rows with today's report date.
function sendTodayEmails() {
  // Replace these placeholders with your actual values.
  const sheetName = "YOUR_SHEET_NAME"; // e.g., "Ada Issue Tracker"
  const senderEmail = "YOUR_SENDER_EMAIL"; // e.g., "your.email@example.com"
  const sheetLink = "YOUR_GOOGLE_SHEET_LINK"; // e.g., "https://docs.google.com/spreadsheets/d/your-sheet-id/edit#gid=0"
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const timeZone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  const today = Utilities.formatDate(new Date(), timeZone, "MM/dd/yyyy");
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" not found!`);
    return;
  }
  
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 14).getValues();
  let emailsSent = 0;
  
  data.forEach(row => {
    // Destructure row values (columns A, B, C, D, E, F, G, <unused>, <unused>, J, K, <unused>, <unused>, N)
    const [platform, type, priority, module, reportDateCell, issueTitle, description, , , assignee, status, , , email] = row;
    
    if (status !== "Not started" || !reportDateCell) return;
    
    const reportDate = Utilities.formatDate(new Date(reportDateCell), timeZone, "MM/dd/yyyy");
    if (reportDate !== today) return;
    
    const assigneeEmail = emailRegex.test(email) ? email.trim() : null;
    if (!assigneeEmail) return;
    
    const subject = `New Issue Reported (${status}): ${issueTitle}`;
    const message = `
Dear ${assignee},

We would like to inform you of a newly reported issue in the system. Please find the details below:

Platform: ${platform}
Type: ${type}
Priority: ${priority}
Module/Menu/Feature: ${module}
Report Date: ${reportDate}

Issue Title: ${issueTitle}

Description:
${description}

Please prioritize this issue as it is classified as ${priority}. Let us know if further clarification or additional information is needed.

For more details, you can view the issue tracker sheet here:
${sheetLink}

Thank you for your prompt attention to this matter.

Best regards,
`;
    
    try {
      GmailApp.sendEmail(assigneeEmail, subject, message, { from: senderEmail });
      Logger.log(`Email sent to: ${assigneeEmail}`);
      emailsSent++;
    } catch (error) {
      Logger.log(`Failed to send email to: ${assigneeEmail}, Error: ${error.message}`);
    }
  });
  
  SpreadsheetApp.getUi().alert(`${emailsSent} email(s) sent successfully for today's issues!`);
}
