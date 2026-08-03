/**
 * Dynamic Lists
 */

function getList(type){

  const data = getTableData("09_Lists");

  return data
    .filter(r => r.Type == type)
    .sort((a,b)=>Number(a.Sort)-Number(b.Sort))
    .map(r=>r.Value);

}