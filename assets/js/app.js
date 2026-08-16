const courses = [
  {title:"Complete MERN Stack Development", category:"development", instructor:"Arif Rahman", rating:"4.9", students:"2,480", price:"৳4,999", old:"৳8,000", symbol:"</>", badge:"BESTSELLER", tone:"blue"},
  {title:"Software QA & Playwright Automation", category:"career", instructor:"Tanvir Ahmed", rating:"4.8", students:"1,920", price:"৳3,499", old:"৳6,000", symbol:"QA", badge:"POPULAR", tone:"purple"},
  {title:"Power BI Business Analytics", category:"data", instructor:"Nusrat Jahan", rating:"4.9", students:"1,640", price:"৳2,999", old:"৳5,000", symbol:"BI", badge:"TRENDING", tone:"orange"},
  {title:"UI/UX Design with Figma", category:"design", instructor:"Sadia Karim", rating:"4.7", students:"1,280", price:"৳2,499", old:"৳4,500", symbol:"UX", badge:"NEW", tone:"green"},
  {title:"Python, Data Science & AI", category:"data", instructor:"Mahin Chowdhury", rating:"4.9", students:"2,110", price:"৳5,499", old:"৳9,000", symbol:"Py", badge:"HOT", tone:"purple"},
  {title:"Career Launchpad: CV to Interview", category:"career", instructor:"Fahim Hasan", rating:"4.8", students:"980", price:"৳1,499", old:"৳2,500", symbol:"CV", badge:"VALUE", tone:"blue"}
];

const grid = document.getElementById("courseGrid");

function renderCourses(filter="all"){
  const list = filter==="all" ? courses : courses.filter(c=>c.category===filter);
  grid.innerHTML = list.map(c=>`
    <article class="course-card">
      <div class="course-image ${c.tone}">
        <span class="course-badge">${c.badge}</span>
        <span class="course-symbol">${c.symbol}</span>
      </div>
      <div class="course-body">
        <div class="course-instructor">${c.instructor}</div>
        <h3>${c.title}</h3>
        <div class="rating"><b>★ ${c.rating}</b> <span> · ${c.students} learners</span></div>
        <div class="price-row">
          <div class="price"><b>${c.price}</b><del>${c.old}</del></div>
          <button class="card-action enroll-btn" data-course="${c.title}">View Course</button>
        </div>
      </div>
    </article>`).join("");
  document.querySelectorAll(".enroll-btn").forEach(btn=>{
    btn.addEventListener("click",()=>showToast(`Opening "${btn.dataset.course}" — demo UI`));
  });
}
renderCourses();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    renderCourses(btn.dataset.filter);
  });
});

document.querySelectorAll(".category-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.getElementById("courses").scrollIntoView({behavior:"smooth"});
    const f=btn.dataset.category;
    const filter=document.querySelector(`.filter[data-filter="${f}"]`);
    if(filter) filter.click();
  });
});

const mobileMenu=document.getElementById("mobileMenu");
const navLinks=document.getElementById("navLinks");
mobileMenu.addEventListener("click",()=>navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

function openModal(id){document.getElementById(id).classList.add("open")}
function closeModal(el){el.closest(".modal").classList.remove("open")}

document.querySelectorAll("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.modal)));
document.querySelectorAll(".modal-close").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn)));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));

document.querySelectorAll("[data-switch]").forEach(a=>a.addEventListener("click",e=>{
  e.preventDefault();
  document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"));
  openModal(a.dataset.switch);
}));

function showToast(message){
  const t=document.getElementById("toast");
  t.textContent=message;t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600);
}
document.querySelectorAll("[data-toast]").forEach(btn=>btn.addEventListener("click",()=>showToast(btn.dataset.toast)));

document.querySelectorAll(".join-btn").forEach(btn=>btn.addEventListener("click",()=>showToast("Seat reservation demo — backend will be connected later.")));

document.getElementById("searchBtn").addEventListener("click",()=>{
  document.getElementById("courses").scrollIntoView({behavior:"smooth"});
  setTimeout(()=>document.querySelector(".filter").focus(),500);
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape")document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"));
});
