/**
 * Kitchen Support V2 Professional
 * Authentication Manager
 */

function login(username, password) {
  const sheet = getDatabase().getSheetByName(CONFIG.SHEETS.USERS);
  const data = sheet.getDataRange().getValues();

  username = String(username).trim();
  password = String(password).trim();

  for (let i = 1; i < data.length; i++) {
    const dbUsername = String(data[i][2]).trim();
    const dbPassword = String(data[i][3]).trim();
    const status = String(data[i][6]).trim();

    if (
      dbUsername === username &&
      dbPassword === password &&
      status === "Active"
    ) {
      // تحديث تاريخ آخر تسجيل دخول في الشيت (العمود رقم 9 - LastLogin)
      sheet.getRange(i + 1, 9).setValue(new Date());

      // إنشاء الجلسة لو دالة createSession موجودة في Session.gs
      if (typeof createSession === 'function') {
        createSession({
          userId: data[i][0],
          name: data[i][1],
          role: data[i][4]
        });
      }

      return {
        success: true,
        userId: data[i][0],
        name: data[i][1],
        role: data[i][4]
      };
    }
  }

  return {
    success: false,
    message: "اسم المستخدم أو كلمة المرور غير صحيحة، أو الحساب غير مفعل"
  };
}

/**
 * إنشاء أول مستخدم ادمن للنظام
 */
function createFirstAdmin() {
  const sheet = getDatabase().getSheetByName(CONFIG.SHEETS.USERS);

  if (sheet.getLastRow() > 1) {
    return "Admin already exists";
  }

  // توليد كود المستخدم
  const userId = (typeof generateID === 'function') ? generateID("USR") : "USR-0001";

  sheet.appendRow([
    userId,        // UserID
    "Admin",       // Name
    "admin",       // Username
    "123456",      // Password
    "Admin",       // Role
    "",            // Phone
    "Active",      // Status
    new Date(),    // CreatedAt
    ""             // LastLogin
  ]);

  return "Admin Created Successfully";
}