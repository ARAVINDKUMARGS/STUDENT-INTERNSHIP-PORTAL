document.addEventListener("DOMContentLoaded",function(){
  SpirexUI.init();
  if(!SpirexAuth.requireLogin())return;
  const session=SpirexStorage.getSession(),users=SpirexStorage.getUsers(),user=users.find(u=>u.id===session.id)||{name:session.name,email:session.email,phone:"",education:"",college:"",skills:"",resume:""},root=document.getElementById("profileRoot");
  root.innerHTML='<div class="details-grid"><form class="panel" id="profileForm" novalidate><div class="form-grid">'+profileField("name","Name",user.name||"",false)+profileField("email","Email",user.email||"",true)+profileField("phone","Phone",user.phone||"",false)+profileField("education","Education",user.education||"",false,"B.Tech Computer Science")+profileField("college","College",user.college||"",false)+profileField("skills","Skills",user.skills||"",false,"JavaScript, SQL, Python")+profileField("resume","Resume link",user.resume||"",false,"https://...",true)+"</div><button class=\"btn btn-primary\" type=\"submit\" style=\"margin-top:16px\">Save profile</button></form><aside class=\"panel\"><h2>Profile completion</h2><div class=\"progress-row\"><strong id=\"completionLabel\">0%</strong></div><div class=\"progress-track\"><span id=\"completionBar\" style=\"width:0%\"></span></div><p class=\"details-copy\" id=\"completionText\"></p></aside></div>";
  const form=document.getElementById("profileForm"),fields=["name","email","phone","education","college","skills","resume"];
  function completion(){const filled=fields.filter(name=>String(form.elements[name].value||"").trim()).length,pct=Math.round(filled/fields.length*100);document.getElementById("completionLabel").textContent=pct+"%";document.getElementById("completionBar").style.width=pct+"%";document.getElementById("completionText").textContent=pct===100?"Your profile is complete.":"Add the remaining details to strengthen your applications."}
  fields.forEach(name=>form.elements[name].addEventListener("input",completion));completion();
  form.addEventListener("submit",event=>{
    event.preventDefault();const data=Object.fromEntries(new FormData(form));let valid=true;
    if(!data.name.trim()){setProfileError(form.elements.name,"Name is required.");valid=false}else clearProfileError(form.elements.name);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){setProfileError(form.elements.email,"Enter a valid email.");valid=false}else clearProfileError(form.elements.email);
    if(!valid){SpirexUI.toast("Please correct the highlighted fields.","error");return}
    const list=SpirexStorage.getUsers(),index=list.findIndex(u=>u.id===session.id);if(index>=0){list[index]={...list[index],...data};SpirexStorage.setUsers(list);SpirexStorage.setSession({...session,name:data.name,email:data.email});SpirexStorage.setProfile(data)}
    SpirexUI.toast("Profile saved successfully.");SpirexUI.init();
  });
  function profileField(name,label,value,email=false,placeholder="",full=false){return'<div class="field '+(full?"full":"")+'"><label for="p-'+name+'">'+label+'</label><input id="p-'+name+'" name="'+name+'"'+(email?' type="email"':name==="resume"? ' type="url"':"")+' value="'+SpirexUI.escapeHtml(value)+'" placeholder="'+SpirexUI.escapeHtml(placeholder)+'"><div class="error-text"></div></div>'}
  function setProfileError(input,message){const field=input.closest(".field");field.classList.add("invalid");field.querySelector(".error-text").textContent=message}
  function clearProfileError(input){const field=input.closest(".field");field.classList.remove("invalid");field.querySelector(".error-text").textContent=""}
});
