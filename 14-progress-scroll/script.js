const progessBar = document.getElementById("progessBar");
const badge = document.getElementById("badge");

function updateProgess(){
    // how amny pixels u hv scrolled
    const scrollTop = window.scrollY;

    // total scrollable height (full page height minus visible window height)
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progess = Math.round((scrollTop / docHeight) * 100);

    progessBar.style.width = progess + "%";
    badge.textContent = progess + "% read";

    if(progess >= 100){
        badge.classList.add("complete");
        badge.textContent = "✓ Complete";
    } else {
        badge.classList.remove("complete");
    }
}

window.addEventListener("scroll", updateProgess);