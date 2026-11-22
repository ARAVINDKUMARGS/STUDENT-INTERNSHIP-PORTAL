(function(){
  const KEYS={internships:"spirex_internships",users:"spirex_users",session:"spirex_session",saved:"spirex_saved",applications:"spirex_applications",notifications:"spirex_notifications",profile:"spirex_profiles"};
  function read(key,fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch(error){return fallback}}
  function write(key,value){localStorage.setItem(key,JSON.stringify(value));return value}
  function initialize(){
    if(!read(KEYS.internships,null)){write(KEYS.internships,window.SPIREX_DATA||[])}
    if(!read(KEYS.users,null)){write(KEYS.users,[{id:"demo-user",name:"Aarav Sharma",email:"aarav@example.com",phone:"9876543210",password:"demo123",college:"National Institute of Technology",education:"B.Tech Computer Science",skills:"JavaScript, Python, SQL",resume:"https://example.com/resume"}])}
    if(!read(KEYS.saved,null))write(KEYS.saved,[]);
    if(!read(KEYS.applications,null))write(KEYS.applications,[]);
    if(!read(KEYS.notifications,null))write(KEYS.notifications,[{id:"n-1",title:"Welcome to SpireX Foundation","message":"Complete your profile to improve application matching.","time":"2026-11-22T09:00:00","read":false}]);
  }
  window.SpirexStorage={KEYS,read,write,initialize,
    getInternships(){return read(KEYS.internships,[])||[]},
    setInternships(v){return write(KEYS.internships,v)},
    getUsers(){return read(KEYS.users,[])||[]},
    setUsers(v){return write(KEYS.users,v)},
    getSession(){return read(KEYS.session,null)},
    setSession(v){return write(KEYS.session,v)},
    getSaved(){return read(KEYS.saved,[])||[]},
    setSaved(v){return write(KEYS.saved,v)},
    getApplications(){return read(KEYS.applications,[])||[]},
    setApplications(v){return write(KEYS.applications,v)},
    getNotifications(){return read(KEYS.notifications,[])||[]},
    setNotifications(v){return write(KEYS.notifications,v)},
    getProfile(){return read(KEYS.profile,window.SpirexStorage.getSession()?.profile||{})||{}},
    setProfile(v){return write(KEYS.profile,v)}
  };
})();
