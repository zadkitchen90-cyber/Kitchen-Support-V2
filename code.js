/**
 * Kitchen Support V2 Professional
 * Main Controller
 * Version: 2.0.0
 */

/**
 * تشغيل النظام
 */
function doGet(e){
  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle(CONFIG.SYSTEM_NAME)
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );
}

/**
 * تحميل ملفات HTML داخل بعضها
 */
function include(filename){
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}

/**
 * معلومات النظام
 */
function getSystemInfo(){
  return {
    name: CONFIG.SYSTEM_NAME,
    version: CONFIG.VERSION
  };
}

/**
 * تحميل صفحات النظام (للأجزاء التي تتطلب Dynamic Content)
 */
function loadPage(pageName, id) {
  const pages = {
    "Dashboard": "Dashboard",
    "Customers": "Customers html.html",
    "AddCustomer": "AddCustomer",
    "EditCustomer": "EditCustomer", // تأكد من اسم ملف تعديل العميل عندك
    "CustomerProfile": "CustomerProfile", // لو عندك صفحة بروفाइल العميل
    "Engineers": "Engineers html.html",
    "Services": "Services.html.html",
    "Reports": "Reports.html.html",
    "Settings": "Settings",
    "AddService": "AddService",
    "ServiceProfile": "ServiceProfile"
  };

  var fileName = pages[pageName];
  if (!fileName) {
    return "<p>الصفحة غير موجودة</p>";
  }

  // لو الصفحة محتاجة قالب (Template) عشان يمرر معها الـ ID
  try {
    var template = HtmlService.createTemplateFromFile(fileName);
    if(id) {
      template.currentId = id; // تمرير المعرف لملف الـ HTML
    }
    return template.evaluate().getContent();
  } catch(e) {
    return HtmlService.createHtmlOutputFromFile(fileName).getContent();
  }
}
function getCustomerById(customerId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Customers"); // تأكد من اسم شاشة أو جدول العملاء عندك
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  
  // افتراض أن العمود الأول أو الثاني هو الـ ID والبيانات مترتبة
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    // لو الـ ID مطابق (نفترض أن الـ ID موجود في أول عمود أو العمود المناسب)
    if (row[0] == customerId || i.toString() == customerId) {
      return {
        name: row[1] || "",
        phone: row[2] || "",
        phone2: row[3] || "",
        governorate: row[4] || "",
        city: row[5] || "",
        address: row[6] || "",
        notes: row[7] || ""
      };
    }
  }
  return null;
}
function loadServiceProfile(serviceId){

  const template = HtmlService.createTemplateFromFile("ServiceProfile");

  template.currentId = serviceId;

  return template.evaluate().getContent();

}