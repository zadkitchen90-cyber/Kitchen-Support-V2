/**
 * Kitchen Support V2 Professional
 * Database Manager
 */

function getDatabase(){
  return SpreadsheetApp.openById(
    CONFIG.SPREADSHEET_ID
  );
}

function setupDatabase(){
  const ss = getDatabase();

  const tables = {
    "01_Users":[
      "UserID",
      "Name",
      "Username",
      "Password",
      "Role",
      "Phone",
      "Status",
      "CreatedAt",
      "LastLogin"
    ],
    "02_Customers":[
      "CustomerID",
      "Name",
      "Phone",
      "Phone2",
      "Governorate",
      "City",
      "Address",
      "Notes",
      "CreatedAt"
    ],
    "03_Engineers":[
      "EngineerID",
      "Name",
      "Phone",
      "Area",
      "JobTitle",
      "Status",
      "HireDate",
      "Notes"
    ],
    "04_Services":[
      "ServiceID",
      "TicketNo",
      "CreateDate",
      "CustomerID",
      "EngineerID",
      "KitchenType",
      "ProblemType",
      "Description",
      "Priority",
      "Status",
      "VisitDate",
      "FinishDate",
      "Cost",
      "PaymentStatus",
      "Warranty",
      "Notes",
      "Images",
      "CreatedBy",
      "UpdatedAt"
    ],
    "05_ServiceVisits":[
      "VisitID",
      "ServiceID",
      "VisitDate",
      "EngineerID",
      "Status",
      "Notes",
      "CreatedAt"
    ],
    "06_Expenses":[
      "ExpenseID",
      "Date",
      "Employee",
      "Category",
      "Amount",
      "PaymentMethod",
      "Notes",
      "AddedBy"
    ],
    "07_ActivityLog":[
      "LogID",
      "Date",
      "User",
      "Action",
      "Table",
      "RecordID",
      "Details"
    ],
    "08_Notifications":[
      "NotificationID",
      "User",
      "Title",
      "Message",
      "Date",
      "Read"
    ],
    "09_Lists":[
      "Type",
      "Value",
      "Sort"
    ],
    "10_Settings":[
      "Key",
      "Value"
    ]
  };

  Object.keys(tables).forEach(sheetName=>{
    const sheet = ss.getSheetByName(sheetName);

    if(!sheet){
      throw new Error("Missing Sheet: " + sheetName);
    }

    if(sheet.getLastRow() === 0){
      sheet
      .getRange(
        1,
        1,
        1,
        tables[sheetName].length
      )
      .setValues([
        tables[sheetName]
      ]);
    }
  });

  SpreadsheetApp.flush();
  return "Database Ready";
}

/**
 * جلب بيانات التاب على هيئة Array of Objects
 */
function getTableData(sheetName) {
  const ss = getDatabase();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error("Missing Sheet: " + sheetName);

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}
