// Triggers.gs

// Fungsi untuk membuat trigger harian yang menjalankan fungsi sendTodayEmails() pada pukul 8 pagi
function createDailyTrigger() {
  ScriptApp.newTrigger("sendTodayEmails")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  SpreadsheetApp.getUi().alert("Daily trigger set for 8 AM!");
}

// Fungsi untuk menghapus semua trigger yang ada pada proyek
function deleteAllTriggers() {
  ScriptApp.getProjectTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));
  SpreadsheetApp.getUi().alert("All triggers have been deleted.");
}

// Fungsi tambahan untuk mengirim email status change (misalnya, digunakan untuk menandai perubahan status)
// Contoh fungsi sendStatusChangeEmails
function sendStatusChangeEmails() {
  const sheetName = "Ada Issue Tracker";
  const senderEmail = "nurekokustiarno@ruangguru.com";
  const recipients = "nurekokustiarno@ruangguru.com, muktiyanto.dwi@ruangguru.com";
  const allowedStatuses = ["In progress", "Blocked", "Done", "Ready For Testing", "In Testing"];
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${sheetName}" tidak ditemukan!`);
    return;
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("Tidak ada data yang ditemukan!");
    return;
  }
  
  // Ambil data dari kolom A sampai O (15 kolom) untuk semua baris data (asumsi baris 1 adalah header)
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 15);
  const data = dataRange.getValues();
  
  let emailsSent = 0;
  
  data.forEach((row, index) => {
    // Urutan kolom: A: platform, B: type, C: priority, D: module, E: reportDate, F: issueTitle,
    // G: description, J: assignee, K: status, O: marker
    const [platform, type, priority, module, reportDate, issueTitle, description, , , assignee, status, , , email, notified] = row;
    
    // Proses hanya jika status bukan "Not started" dan termasuk status yang diizinkan
    if (status === "Not started" || allowedStatuses.indexOf(status) === -1) return;
    // Jika sudah ditandai "Notified", jangan dikirim ulang
    if (notified && notified.toString().toLowerCase() === "notified") return;
    
    const rowNum = index + 2;
    const changedBy = Session.getActiveUser().getEmail();
    
    const subject = `Issue Status Changed for Row ${rowNum}: ${issueTitle}`;
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
      // Tandai baris sebagai "Notified" di kolom O
      sheet.getRange(rowNum, 15).setValue("Notified");
    } catch (error) {
      Logger.log(`Error sending email for row ${rowNum}: ${error.message}`);
    }
  });
  
  SpreadsheetApp.getUi().alert(`${emailsSent} email(s) sent for status changes.`);
}
