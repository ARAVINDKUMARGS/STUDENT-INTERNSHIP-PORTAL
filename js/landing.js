document.addEventListener("DOMContentLoaded",function(){
  SpirexUI.init();
  const jobs=SpirexStorage.getInternships();
  document.getElementById("statInternships").textContent=jobs.length+"";
  const domains=[["Web Development","</>"],["Java Development","{J}"],["Python","Py"],["AI/ML","AI"],["Data Analytics","DA"],["UI/UX","UX"],["Cloud Computing","☁"]];
  document.getElementById("categories").innerHTML=domains.map(([domain,icon])=>'<a class="category-card" href="internships.html?domain='+encodeURIComponent(domain)+'"><div class="category-icon">'+icon+'</div><strong>'+domain+'</strong><p style="color:#70778b;font-size:13px;margin:5px 0 0">'+jobs.filter(j=>j.domain===domain).length+" opportunities</p></a>").join("");
  const saved=SpirexStorage.getSaved();
  document.getElementById("featuredJobs").innerHTML=jobs.filter(j=>j.featured).slice(0,6).map(j=>'<article class="internship-card"><div class="card-top"><div><h3>'+SpirexUI.escapeHtml(j.title)+'</h3><p class="company-name">'+SpirexUI.escapeHtml(j.company)+'</p></div><button class="bookmark '+(saved.includes(j.id)?"active":"")+'" data-save="'+j.id+'" aria-label="Save '+SpirexUI.escapeHtml(j.title)+'">♡</button></div><div class="chip-row"><span class="chip">'+SpirexUI.escapeHtml(j.domain)+'</span><span class="chip">'+SpirexUI.escapeHtml(j.mode)+'</span></div><div class="card-meta"><span>₹'+j.stipend.toLocaleString("en-IN")+"/mo</span><span>"+SpirexUI.escapeHtml(j.location)+"</span><span>"+j.duration+"</span><span>Ends "+new Date(j.deadline).toLocaleDateString("en-IN")+"</span></div><div class=\"card-actions\"><a class=\"btn btn-secondary btn-sm\" href=\"internship-details.html?id="+j.id+'">View details</a><a class="btn btn-primary btn-sm" href="internship-details.html?id='+j.id+'#apply">Apply</a></div></article>').join("");
  document.querySelectorAll("[data-save]").forEach(button=>button.addEventListener("click",()=>{
    const id=button.dataset.save,list=SpirexStorage.getSaved(),saving=!list.includes(id),updated=saving?[...list,id]:list.filter(item=>item!==id);
    SpirexStorage.setSaved(updated);button.classList.toggle("active",saving);SpirexUI.toast(saving?"Internship saved.":"Internship removed from saved.",saving?"success":"error");
  }));
  document.getElementById("heroSearch").addEventListener("submit",event=>{event.preventDefault();location.href="internships.html?q="+encodeURIComponent(new FormData(event.target).get("q"))});
});
