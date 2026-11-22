document.addEventListener("DOMContentLoaded",function(){
  SpirexUI.init();
  const params=new URLSearchParams(location.search), jobs=SpirexStorage.getInternships();
  let visible=6;
  const els={search:document.getElementById("search"),domain:document.getElementById("domain"),location:document.getElementById("location"),mode:document.getElementById("mode"),stipend:document.getElementById("stipend"),sort:document.getElementById("sort"),grid:document.getElementById("jobGrid"),count:document.getElementById("resultCount")};
  [...new Set(jobs.map(j=>j.domain))].sort().forEach(v=>els.domain.add(new Option(v,v)));
  [...new Set(jobs.map(j=>j.location))].sort().forEach(v=>els.location.add(new Option(v,v)));
  els.search.value=params.get("q")||"";els.domain.value=params.get("domain")||"";
  function apply(){
    const q=els.search.value.trim().toLowerCase(), domain=els.domain.value, loc=els.location.value, mode=els.mode.value, stipend=Number(els.stipend.value||0);
    let filtered=jobs.filter(j=>(!q||[j.title,j.company,j.domain,...j.skills,j.location].join(" ").toLowerCase().includes(q))&&(!domain||j.domain===domain)&&(!loc||j.location===loc)&&(!mode||j.mode===mode)&&j.stipend>=stipend);
    if(els.sort.value==="stipend")filtered.sort((a,b)=>b.stipend-a.stipend);
    else if(els.sort.value==="newest")filtered.sort((a,b)=>new Date(b.posted)-new Date(a.posted));
    else if(q)filtered.sort((a,b)=>[a.title,a.company,...a.skills].join(" ").toLowerCase().includes(q)?-1:1);
    els.count.textContent=filtered.length+" internship"+(filtered.length===1?"":"s")+" found";
    const saved=SpirexStorage.getSaved();const shown=filtered.slice(0,visible);
    els.grid.innerHTML=shown.length?shown.map(j=>'<article class="internship-card"><div class="card-top"><div><h3>'+SpirexUI.escapeHtml(j.title)+'</h3><p class="company-name">'+SpirexUI.escapeHtml(j.company)+'</p></div><button class="bookmark '+(saved.includes(j.id)?'active':'')+'" data-save="'+j.id+'" aria-label="Save internship">♡</button></div><div class="chip-row"><span class="chip">'+SpirexUI.escapeHtml(j.domain)+'</span><span class="chip">'+SpirexUI.escapeHtml(j.mode)+'</span></div><div class="card-meta"><span>₹'+j.stipend.toLocaleString('en-IN')+'/mo</span><span>'+SpirexUI.escapeHtml(j.location)+'</span><span>'+j.duration+'</span><span>Ends '+new Date(j.deadline).toLocaleDateString('en-IN')+'</span></div><div class="card-actions"><a class="btn btn-secondary btn-sm" href="internship-details.html?id='+j.id+'">View details</a><a class="btn btn-primary btn-sm" href="internship-details.html?id='+j.id+'#apply">Apply</a></div></article>').join(""):'<div class="empty-state" style="grid-column:1/-1"><div class="company-logo">⌕</div><h3>No internships found</h3><p>Try changing or clearing your search filters.</p></div>';
    document.querySelectorAll("[data-save]").forEach(b=>b.onclick=()=>{const id=b.dataset.save;let list=SpirexStorage.getSaved();const saving=!list.includes(id);list=saving?[...list,id]:list.filter(x=>x!==id);SpirexStorage.setSaved(list);b.classList.toggle("active",saving);SpirexUI.toast(saving?"Internship saved.":"Removed from saved.",saving?"success":"error")});
    const wrap=document.getElementById("loadMoreWrap");wrap.innerHTML=visible<filtered.length?'<button class="btn btn-secondary" id="loadMore">Load more</button>':"";document.getElementById("loadMore")?.addEventListener("click",()=>{visible+=6;apply()});
  }
  els.search.oninput=()=>{visible=6;apply()};["domain","location","mode","stipend","sort"].forEach(k=>els[k].onchange=()=>{visible=6;apply()});
  document.getElementById("clearFilters").onclick=()=>{els.search.value="";els.domain.value="";els.location.value="";els.mode.value="";els.stipend.value="";els.sort.value="newest";visible=6;apply()};
  apply();
});
