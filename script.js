function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Trang tính1");

  const data = JSON.parse(e.postData.contents);

  const timestamp = new Date();
  const name = data.name || "";
  const lop = data.lop || "";
  const camon1 = data.camon1 || "";
  const camon2 = data.camon2 || "";
  const camon3 = data.camon3 || "";
  const viectot = data.viectot || "";
  const yeuthuong = data.yeuthuong || "";
  const hasCertificate = data.hasCertificate ? "x" : "";

  sheet.appendRow([
    timestamp,
    name,
    lop,
    camon1,
    camon2,
    camon3,
    viectot,
    yeuthuong,
    hasCertificate
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
