/**
 * Kitchen Support V2 Professional
 * Dashboard Controller
 */


function getDashboardData(){


  const ss = getDatabase();



  // Services

  const servicesSheet =
  ss.getSheetByName(CONFIG.SHEETS.SERVICES);


  const servicesData =
  servicesSheet.getDataRange().getValues();


  let totalServices = 0;
  let openServices = 0;
  let completedServices = 0;



  for(let i = 1; i < servicesData.length; i++){


    if(servicesData[i][0]){


      totalServices++;


      const status =
      String(servicesData[i][9]).trim();



      if(status === "Open" || status === "جديد"){

        openServices++;

      }



      if(status === "Completed" || status === "مكتمل"){

        completedServices++;

      }


    }


  }




  // Engineers

  const engineersSheet =
  ss.getSheetByName(CONFIG.SHEETS.ENGINEERS);


  const engineersData =
  engineersSheet.getDataRange().getValues();


  let engineersCount = 0;


  for(let i = 1; i < engineersData.length; i++){


    if(engineersData[i][0]){

      engineersCount++;

    }

  }





  // Expenses

  const expensesSheet =
  ss.getSheetByName(CONFIG.SHEETS.EXPENSES);


  const expensesData =
  expensesSheet.getDataRange().getValues();


  let totalExpenses = 0;


  for(let i = 1; i < expensesData.length; i++){


    if(expensesData[i][4]){

      totalExpenses +=
      Number(expensesData[i][4]) || 0;

    }

  }





  return {

    totalServices: totalServices,

    openServices: openServices,

    completedServices: completedServices,

    engineersCount: engineersCount,

    totalExpenses: totalExpenses

  };


}
function testDashboard(){

  Logger.log(
    getDashboardData()
  );

}