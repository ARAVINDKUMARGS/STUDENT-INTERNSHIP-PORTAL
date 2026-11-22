document.addEventListener("DOMContentLoaded",function(){
  SpirexUI.init();
  const loginForm=document.getElementById("loginForm");
  if(loginForm){
    loginForm.addEventListener("submit",event=>{
      event.preventDefault();const data=Object.fromEntries(new FormData(loginForm));let valid=true;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){setFieldError(loginForm.elements.email,"Enter a valid email.");valid=false}else clearFieldError(loginForm.elements.email);
      if(!data.password){setFieldError(loginForm.elements.password,"Password is required.");valid=false}else clearFieldError(loginForm.elements.password);
      if(!valid)return;const result=SpirexAuth.login(data.email,data.password);if(!result.ok){SpirexUI.toast(result.message,"error");return}SpirexUI.toast("Signed in successfully.");setTimeout(()=>location.href="dashboard.html",350);
    });
  }
  const registerForm=document.getElementById("registerForm");
  if(registerForm){
    registerForm.addEventListener("submit",event=>{
      event.preventDefault();const data=Object.fromEntries(new FormData(registerForm));let valid=true;
      const rules={name:[data.name.trim().length>=2,"Enter your full name."],email:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),"Enter a valid email."],phone:[/^\d{10}$/.test(data.phone.replace(/\D/g,"")),"Enter a valid 10-digit phone number."],college:[data.college.trim().length>=2,"Enter your college name."],password:[data.password.length>=6,"Use at least 6 characters."]};
      Object.entries(rules).forEach(([name,[good,message]])=>{if(good)clearFieldError(registerForm.elements[name]);else{setFieldError(registerForm.elements[name],message);valid=false}});
      if(!valid){SpirexUI.toast("Please correct the highlighted fields.","error");return}const result=SpirexAuth.register(data);if(!result.ok){SpirexUI.toast(result.message,"error");return}SpirexUI.toast("Account created successfully.");setTimeout(()=>location.href="profile.html",350);
    });
  }
  function setFieldError(input,message){const field=input.closest(".field");field.classList.add("invalid");field.querySelector(".error-text").textContent=message}
  function clearFieldError(input){const field=input.closest(".field");field.classList.remove("invalid");field.querySelector(".error-text").textContent=""}
});
