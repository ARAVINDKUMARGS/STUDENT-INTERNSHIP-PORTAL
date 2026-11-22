document.addEventListener("DOMContentLoaded",function(){
  SpirexUI.init();
  if(!SpirexAuth.requireLogin())return;
  const session=SpirexStorage.getSession(),root=document.getElementById("dashboardRoot"),jobs=SpirexStorage.getInternships(),all=SpirexStorage.getApplications(),apps=all.filter(a=>a.userId===session.id);
  const counts={Applied:0,"Under Review":0,Shortlisted:0,Rejected:0,Selected:0};apps.forEach(a=>{if(counts[a.status]!=null)counts[a.status]++});
  function overview(){
    root.innerHTML='<div class="stats-grid"><div class="metric"><span>Total applications</span><strong>'+apps.length+'</strong></div><div class="metric"><span>Under review</span><strong>'+counts["Under Review"]+'</strong></div><div class="metric"><span>Shortlisted</span><strong>'+counts.Shortlisted+'</strong></div><div class="metric"><span>Selected</span><strong>'+counts.Selected+'</strong></div></div><div class="panel"><div class="section-head"><div><h2>Recent applications</h2><p>Review status and history.</p></div></div><div id="applications"></div></div><div id="savedSection" style="margin-top:18px"></div>';
    renderApplications(document.getElementById("applications"));renderSaved(document.getElementById("savedSection"));
  }
  function statusClass(status){return "status-"+status.toLowerCase().replaceAll(" ","-")}
  function renderApplications(container){
    if(!apps.length){container.innerHTML='<div class="empty-state"><div class="company-logo">▣</div><h3>No applications yet</h3><p>Explore opportunities and submit your first application.</p><a class="btn btn-primary" href="internships.html">Browse internships</a></div>';return}
    container.innerHTML='<div class="table-wrap"><table><thead><tr><th>Internship</th><th>Company</th><th>Applied on</th><th>Status</th><th></th></tr></thead><tbody>'+apps.map(a=>{const j=jobs.find(x=>x.id===a.internshipId);return j?'<tr><td><strong>'+SpirexUI.escapeHtml(j.title)+'</strong></td><td>'+SpirexUI.escapeHtml(j.company)+'</td><td>'+new Date(a.updatedAt).toLocaleDateString('en-IN')+'</td><td><span class="status '+statusClass(a.status)+'">'+SpirexUI.escapeHtml(a.status)+'</span></td><td><button class="btn btn-secondary btn-sm" data-track="'+a.id+'">Track</button></td></tr>':""}).join("")+'</tbody></table></div>';
    container.querySelectorAll("[data-track]").forEach(b=>b.onclick=()=>trackApplication(b.dataset.track));
  }
  function trackApplication(appId){
    const a=apps.find(x=>x.id===appId),j=jobs.find(x=>x.id===a?.internshipId);if(!a||!j)return;
    root.innerHTML='<div class="page-title"><div><h1>'+SpirexUI.escapeHtml(j.title)+'</h1><p>'+SpirexUI.escapeHtml(j.company)+'</p></div><button class="btn btn-secondary" id="backApps">← All applications</button></div><div class="details-grid"><section class="panel"><h2>Application timeline</h2><div class="timeline">'+(a.history||[]).map(h=>'<div class="timeline-item"><strong>'+SpirexUI.escapeHtml(h.status)+'</strong><span>'+new Date(h.date).toLocaleString('en-IN')+' · '+SpirexUI.escapeHtml(h.note||"Status updated")+'</span></div>').join("")+'</div></section><aside class="panel"><h2>Current status</h2><span class="status '+statusClass(a.status)+'">'+SpirexUI.escapeHtml(a.status)+'</span><p class="details-copy" style="margin-top:16px">'+a.status==="Applied"?"Your application is in the employer review queue.":a.status==="Under Review"?"The hiring team is evaluating your profile.":a.status==="Shortlisted"?"You have been shortlisted for the next stage.":a.status==="Selected"?"Congratulations! You have been selected.":"This opportunity has moved forward with other candidates."+'</p></aside></div>';document.getElementById("backApps").onclick=()=>overview();
  }
  function renderSaved(container){
    const saved=SpirexStorage.getSaved(), savedJobs=jobs.filter(j=>saved.includes(j.id));
    container.innerHTML='<div class="panel"><div class="section-head"><div><h2>Saved opportunities</h2><p>'+savedJobs.length+' internship'+(savedJobs.length===1?"":"s")+' saved.</p></div></div>'+(!savedJobs.length?'<div class="empty-state"><h3>No saved internships</h3><p>Bookmark roles while browsing to view them here.</p></div>':'<div class="card-grid">'+savedJobs.map(j=>'<article class="internship-card"><h3>'+SpirexUI.escapeHtml(j.title)+'</h3><p class="company-name">'+SpirexUI.escapeHtml(j.company)+'</p><div class="card-actions"><a class="btn btn-primary btn-sm" href="internship-details.html?id='+j.id+'">View</a><button class="btn btn-secondary btn-sm" data-remove-saved="'+j.id+'">Remove</button></div></article>').join("")+'</div>');
    container.querySelectorAll("[data-remove-saved]").forEach(b=>b.onclick=()=>{SpirexStorage.setSaved(SpirexStorage.getSaved().filter(id=>id!==b.dataset.removeSaved));renderSaved(container);SpirexUI.toast("Removed from saved.","error")});
  }
  if(location.hash==="#saved")setTimeout(()=>document.getElementById("savedSection")?.scrollIntoView(),100);
  overview();
  window.addEventListener("hashchange",()=>{if(location.hash==="#applications")document.getElementById("applications")?.scrollIntoView();if(location.hash==="#saved")document.getElementById("savedSection")?.scrollIntoView()});
});
