/**
 * Kitchen Support V2 Professional
 * Services Manager
 */

 //============================
// جلب جميع البلاغات
//============================
function getServices() {

  const db = getDatabase();

  const servicesSheet = db.getSheetByName(CONFIG.SHEETS.SERVICES);
  const customersSheet = db.getSheetByName(CONFIG.SHEETS.CUSTOMERS);
  const engineersSheet = db.getSheetByName(CONFIG.SHEETS.ENGINEERS);

  const services = servicesSheet.getDataRange().getValues();
  const customers = customersSheet.getDataRange().getValues();
  const engineers = engineersSheet.getDataRange().getValues();

  // CustomerID => Name
  let customerMap = {};
  for (let i = 1; i < customers.length; i++) {
    customerMap[customers[i][0]] = {
      name: customers[i][1],
      phone: customers[i][2],
      governorate: customers[i][4],
      city: customers[i][5]
    };
  }

  // EngineerID => Name
  let engineerMap = {};
  for (let i = 1; i < engineers.length; i++) {
    engineerMap[engineers[i][0]] = engineers[i][1];
  }

  let result = [];

  for (let i = 1; i < services.length; i++) {
    
    // تخطي الصفوف الفارغة تماماً
    if (!services[i][0]) continue;

    // فحص بيانات العميل (سواء كود أو نص صريح)
    let custKey = services[i][3];
    let resolvedName = "";
    let resolvedPhone = "";
    let resolvedGov = "";
    let resolvedCity = "";

    if (customerMap[custKey]) {
      resolvedName = customerMap[custKey].name || "";
      resolvedPhone = customerMap[custKey].phone || "";
      resolvedGov = customerMap[custKey].governorate || "";
      resolvedCity = customerMap[custKey].city || "";
    } else {
      resolvedName = custKey ? String(custKey) : "";
      resolvedPhone = "";
    }

    result.push({

      id: services[i][0] ? String(services[i][0]) : "",

      ticketNo: services[i][1] ? String(services[i][1]) : "",

      createDate: services[i][2] ? String(services[i][2]) : "",

      customerName: resolvedName,

      customerPhone: resolvedPhone,

      governorate: resolvedGov,

      city: resolvedCity,

      engineer: engineerMap[services[i][4]] || (services[i][4] ? String(services[i][4]) : ""),

      deviceType: services[i][5] ? String(services[i][5]) : "",

      brand: services[i][6] ? String(services[i][6]) : "",

      problem: services[i][7] ? String(services[i][7]) : "",

      status: services[i][9] ? String(services[i][9]) : "",

      visitDate: services[i][10] ? String(services[i][10]) : "",

      cost: services[i][12] ? String(services[i][12]) : ""

    });

  }

  return result;

}





//============================
// حفظ بلاغ جديد
//============================
function saveService(service) {

  try {

    const db = getDatabase();

    const serviceSheet = db.getSheetByName(CONFIG.SHEETS.SERVICES);

    //--------------------------------------------------
    // البحث عن العميل
    //--------------------------------------------------

    let customer = getCustomerByPhone(service.customerPhone);

    let customerID;

    if(customer){

      customerID = customer.id;

    }else{

      customerID = generateID("CUS");

      db.getSheetByName(CONFIG.SHEETS.CUSTOMERS).appendRow([

        customerID,
        service.customerName,
        service.customerPhone,
        "",
        "",
        "",
        "",
        "",
        new Date()

      ]);

    }

    //--------------------------------------------------
    // إنشاء رقم الصيانة
    //--------------------------------------------------

    const serviceID = generateID("SRV");

    const ticketNo = generateTicketNumber();

    const now = new Date();

    //--------------------------------------------------
    // حفظ الصيانة
    //--------------------------------------------------

    serviceSheet.appendRow([

      serviceID,
      ticketNo,
      now,

      customerID,         // بدلاً من اسم العميل

      service.engineer,

      service.deviceType,

      service.brand,

      service.problem,

      "Normal",

      service.status,

      service.visitDate,

      "",

      "",

      "Unpaid",

      "",

      "",

      "",

      "System",

      now

    ]);

    return {

      success:true,

      message:"تم حفظ الصيانة بنجاح"

    };

  }catch(e){

    return{

      success:false,

      message:e.toString()

    };

  }

}