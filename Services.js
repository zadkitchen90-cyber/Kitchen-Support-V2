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
    customerMap[customers[i][0]] = customers[i][1];
  }

  // EngineerID => Name
  let engineerMap = {};
  for (let i = 1; i < engineers.length; i++) {
    engineerMap[engineers[i][0]] = engineers[i][1];
  }

  let result = [];

  for (let i = 1; i < services.length; i++) {

    result.push({

      id: services[i][0],

      ticketNo: services[i][1],

      createDate: services[i][2],

      customerName: customerMap[services[i][3]] || services[i][3],

      engineer: engineerMap[services[i][4]] || services[i][4],

      deviceType: services[i][5],

      brand: services[i][6],

      problem: services[i][7],

      status: services[i][9],

      visitDate: services[i][10],

      cost: services[i][12]

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

      customerID,          // بدلاً من اسم العميل

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