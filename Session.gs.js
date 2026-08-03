/**
 * Kitchen Support V2 Professional
 * Session Manager
 */


function createSession(user){

  const cache = CacheService.getUserCache();


  cache.put(
    "CURRENT_USER",
    JSON.stringify(user),
    21600
  );


  return true;

}



function getCurrentUser(){

  const cache = CacheService.getUserCache();


  const user = cache.get("CURRENT_USER");


  if(!user){

    return null;

  }


  return JSON.parse(user);

}



function logout(){

  const cache = CacheService.getUserCache();


  cache.remove("CURRENT_USER");


  return true;

}



function checkPermission(role){

  const user = getCurrentUser();


  if(!user){

    return false;

  }


  return user.role === role;

}