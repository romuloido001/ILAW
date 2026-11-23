// ILAW Lesson Plan Generator - Google Apps Script backend
// 1. Create a Google Sheet. 2. Extensions > Apps Script, paste this file.
// 3. Deploy > New deployment > Web app: Execute as "Me", Access "Anyone".
// 4. Copy the Web App URL into SCRIPT_URL in index.html.

var SHEET_NAME = 'ILAW Plans';
var HEADERS = ['Timestamp','Teacher','School','Subject','Grade','Term/Week','Duration','Topic','Competency','Content Standard','Performance Standard','Materials','Intentions','Learning Experience','Assessing Learning','Ways Forward'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    getSheet_().appendRow([new Date(), d.teacher, d.school, d.subject, d.grade, d.week,
      d.duration, d.topic, d.competency, d.contentStd, d.perfStd, d.materials, d.intentions, d.learning, d.assessing, d.forward]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({ ok: true, message: 'ILAW generator backend is running.' });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
