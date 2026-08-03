/**
 * Kitchen Support V2 Professional
 * Utilities
 */


// إنشاء ID عشوائي
function generateID(prefix){

  return prefix + "-" + Date.now();

}



// إنشاء رقم البلاغ
function generateTicketNumber(){

  const year = new Date().getFullYear();

  const sheet = getDatabase()
    .getSheetByName(CONFIG.SHEETS.SERVICES);


  const lastRow = sheet.getLastRow();


  let number = lastRow;


  number++;


  return "KS-" + year + "-" + 
    String(number).padStart(6,"0");

}



// التاريخ الحالي
function getCurrentDate(){

  return new Date();

}



// تسجيل الأخطاء
function handleError(error){

  Logger.log(error.message);

  return {

    success:false,

    message:error.message

  };

}
function testUtils(){

  Logger.log(generateID("CUS"));

  Logger.log(generateTicketNumber());

  Logger.log(getCurrentDate());

}