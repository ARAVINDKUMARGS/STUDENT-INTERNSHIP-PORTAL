(function(){
  function login(email,password){
    const user=window.SpirexStorage.getUsers().find(u=>u.email.toLowerCase()===String(email).trim().toLowerCase()&&u.password===password);
    if(!user)return {ok:false,message:"Invalid email or password."};
    window.SpirexStorage.setSession({id:user.id,name:user.name,email:user.email,role:user.role||"student"});
    return {ok:true,user};
  }
  function register(data){
    const users=window.SpirexStorage.getUsers();
    if(users.some(u=>u.email.toLowerCase()===data.email.toLowerCase()))return {ok:false,message:"An account already exists with this email."};
    const user={id:"user-"+Date.now(),name:data.name,email:data.email,phone:data.phone||"",password:data.password,education:data.education||"",college:data.college||"",skills:data.skills||"",resume:data.resume||"",role:"student"};
    users.push(user);window.SpirexStorage.setUsers(users);
    window.SpirexStorage.setSession({id:user.id,name:user.name,email:user.email,role:"student"});
    return {ok:true,user};
  }
  function logout(){window.SpirexStorage.setSession(null);window.location.href="login.html";}
  function requireLogin(){if(!window.SpirexStorage.getSession()){window.location.href="login.html";return false}return true}
  window.SpirexAuth={login,register,logout,requireLogin};
})();
