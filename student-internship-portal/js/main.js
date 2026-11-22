(function(){
  function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
  function toast(message,type="success"){
    let stack=document.querySelector(".toast-stack");if(!stack){stack=document.createElement("div");stack.className="toast-stack";document.body.appendChild(stack)}
    const item=document.createElement("div");item.className="toast "+type;item.textContent=message;stack.appendChild(item);setTimeout(()=>item.remove(),3500);
  }
  function showConfirm(message,onConfirm){
    const backdrop=document.createElement("div");backdrop.className="modal-backdrop";
    backdrop.innerHTML='<div class="modal" role="dialog" aria-modal="true"><div class="modal-head"><h2>Confirm action</h2></div><p>'+escapeHtml(message)+'</p><div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn btn-secondary" data-cancel>Cancel</button><button class="btn btn-danger" data-confirm>Confirm</button></div></div>';
    document.body.appendChild(backdrop);
    backdrop.querySelector("[data-cancel]").onclick=()=>backdrop.remove();
    backdrop.querySelector("[data-confirm]").onclick=()=>{backdrop.remove();onConfirm()};
  }
  function renderTopbar(){
    const page=document.body.dataset.page||"";
    const session=window.SpirexStorage.getSession();
    const unread=(window.SpirexStorage.getNotifications()||[]).filter(n=>!n.read).length;
    document.querySelectorAll("[data-auth]").forEach(el=>el.remove());
    const actions=document.querySelector(".nav-actions");if(!actions)return;
    const notificationBtn=actions.querySelector("[data-notifications]");
    if(notificationBtn){notificationBtn.innerHTML='&#128276;<span class="badge-dot"'+(unread?'':' style="display:none"')+'></span>'}
    if(session){const link=document.createElement("a");link.dataset.auth="";link.className="btn btn-primary btn-sm";link.href="dashboard.html";link.textContent=session.name.split(" ")[0];actions.appendChild(link);const logout=document.createElement("button");logout.dataset.auth="";logout.className="btn btn-secondary btn-sm";logout.textContent="Sign out";logout.onclick=SpirexAuth.logout;actions.appendChild(logout)}
    else {const login=document.createElement("a");login.dataset.auth="";login.className="btn btn-secondary btn-sm";login.href="login.html";login.textContent="Sign in";actions.appendChild(login)}
  }
  function renderSidebar(){
    const page=document.body.dataset.page||"";
    const nav=document.querySelector(".sidebar-nav");if(!nav)return;
    nav.innerHTML=[
      ["dashboard","Overview","dashboard.html"],["explorer","Explore internships","internships.html"],["applications","My applications","dashboard.html#applications"],["saved","Saved jobs","dashboard.html#saved"],["profile","My profile","profile.html"],["admin","Admin demo","admin.html"]
    ].map(([key,label,href])=>'<a class="sidebar-link '+(page===key?"active":"")+'" href="'+href+'"><span>'+({dashboard:"⌂",explorer:"⌕",applications:"▣",saved:"♡",profile:"◉",admin:"⚙"}[key])+'</span>'+label+'</a>').join("");
  }
  function toggleSidebar(){document.querySelector(".sidebar")?.classList.toggle("open")}
  function toggleNotifications(){
    let panel=document.querySelector(".notification-panel");
    if(!panel){panel=document.createElement("div");panel.className="notification-panel";document.body.appendChild(panel)}
    const notes=window.SpirexStorage.getNotifications();
    panel.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;padding:8px"><strong>Notifications</strong><button class="icon-btn btn-sm" data-close-notifications aria-label="Close notifications">×</button></div>'+(
      notes.length?notes.map(n=>'<div class="notification-item"><p>'+escapeHtml(n.title||n.message)+"</p>"+(n.message?'<p style="color:#70778b">'+escapeHtml(n.message)+"</p>":"")+'<time>'+new Date(n.time).toLocaleDateString()+"</time></div>").join(""):'<div class="empty-state"><p>No notifications yet</p></div>');
    panel.classList.toggle("open");
    panel.querySelector("[data-close-notifications]").onclick=()=>panel.classList.remove("open");
  }
  function initNavigation(){
    document.querySelectorAll("[data-mobile-menu]").forEach(b=>b.onclick=()=>{document.querySelector(".topnav")?.classList.toggle("open");toggleSidebar()});
    document.querySelectorAll("[data-notifications]").forEach(b=>b.onclick=toggleNotifications);
  }
  function init(){window.SpirexStorage.initialize();renderTopbar();renderSidebar();initNavigation()}
  window.SpirexUI={escapeHtml,toast,showConfirm,initNavigation,init};
})();
