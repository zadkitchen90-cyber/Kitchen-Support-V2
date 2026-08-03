/**
 * Kitchen Support V2 Professional
 * Customers Manager
 */

// جلب جميع العملاء
function getCustomers() {

  const sheet = getDatabase().getSheetByName(CONFIG.SHEETS.CUSTOMERS);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) return [];

  let customers = [];

  for (let i = 1; i < data.length; i++) {

    customers.push({
      id: data[i][0],
      name: data[i][1],
      phone: data[i][2],
      phone2: data[i][3],
      governorate: data[i][4],
      city: data[i][5],
      address: data[i][6],
      notes: data[i][7],
      createdAt: data[i][8]
    });

  }

  return customers;

}
// إضافة عميل جديد
function saveCustomer(customer) {

  try {

    const sheet = getDatabase().getSheetByName(CONFIG.SHEETS.CUSTOMERS);

    const customerID = generateID("CUS");

    sheet.appendRow([

      customerID,
      customer.name,
      customer.phone,
      customer.phone2 || "",
      customer.governorate || "",
      customer.city || "",
      customer.address || "",
      customer.notes || "",
      new Date()

    ]);

    return {

      success: true,
      message: "تم إضافة العميل بنجاح"

    };

  } catch (e) {

    return {

      success: false,
      message: e.toString()

    };

  }

}


// البحث عن عميل بالـ ID
function getCustomerByID(id) {

  const customers = getCustomers();

  return customers.find(c => c.id == id);

}
// البحث عن العميل برقم الهاتف
function getCustomerByPhone(phone){

  const customers = getCustomers();

  return customers.find(c => String(c.phone).trim() == String(phone).trim());

}
function testCustomers(){

  const data = getCustomers();

  Logger.log(data);

  return data;

}