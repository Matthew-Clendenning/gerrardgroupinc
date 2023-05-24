const primaryHeader = document.querySelector(".primary-header");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
	if (scrollY > 350 && window.outerWidth >= "641") {
		primaryHeader.style.position = "static";
	} else if (window.outerWidth < "641"){
		primaryHeader.style.position = "sticky";
	} else {
		primaryHeader.style.position = "sticky";
	}
}