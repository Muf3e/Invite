/**
 * ============================================================================
 * GOOGLE APPS SCRIPT FOR MUSTAFA & TASNEEM WEDDING RSVP
 * Target Sheet: https://docs.google.com/spreadsheets/d/1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM/edit?usp=sharing
 * ============================================================================
 * 
 * INSTRUCTIONS TO DEPLOY (Takes 1 minute):
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM/edit?usp=sharing
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any code in the editor and paste ALL the code from this file.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. In the toolbar, select "setupSheet" from the function dropdown and click "Run" once.
 *    (Google will prompt you to authorize permissions for your sheet; click Advanced > Go to Untitled project > Allow).
 *    This will instantly create the royal purple & gold header row:
 *    [Timestamp (IST), Guest Name, Phone / WhatsApp, Number of Guests, Attendance Status, Mubaraki Wish / Dua]
 * 6. Click "Deploy" (blue button at top right) > "New deployment".
 * 7. Click the gear icon next to "Select type" and select "Web app".
 * 8. Set:
 *    - Description: "Wedding RSVP Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial so guests can submit without Google login)
 * 9. Click "Deploy", copy the generated "Web App URL" (ends in /exec), and paste it into app.js at GOOGLE_SHEET_WEBHOOK_URL.
 */

var SPREADSHEET_ID = '1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM';

function setupSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp (IST)',
      'Guest Name',
      'Phone / WhatsApp',
      'Number of Guests',
      'Attendance Status',
      'Mubaraki Wish / Dua'
    ];
    
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#422D6E'); // Royal Lavender/Purple
    headerRange.setFontColor('#FFF8DC'); // Gold highlight text
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();
    
    if (sheet.getLastRow() === 0) {
      setupSheet();
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
    var name = data.name || '';
    var phone = data.phone || '';
    var count = data.count || '1';
    var attendance = data.attendance || 'Joyfully Attending';
    var message = data.message || '';
    
    sheet.appendRow([timestamp, name, phone, count, attendance, message]);
    
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, 6);
    rowRange.setVerticalAlignment('middle');
    rowRange.setFontFamily('Arial');
    rowRange.setFontSize(10);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'RSVP recorded successfully in Google Sheet!' 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'active', 
    title: 'Mustafa & Tasneem Wedding RSVP Webhook is Active!' 
  })).setMimeType(ContentService.MimeType.JSON);
}
