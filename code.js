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
function loadPage(pageName) {

  const pages = {

    "Dashboard": "Dashboard",

    "Customers": "Customers html",

    "AddCustomer": "AddCustomer",

    "Engineers": "Engineers html",

    "Services": "Services.html",

    "Reports": "Reports.html",

    "Settings": "Settings",

    "AddService": "AddService",

    "ServiceProfile": "ServiceProfile"

  };

  return HtmlService
    .createHtmlOutputFromFile(
      pages[pageName]
    )
    .getContent();
}