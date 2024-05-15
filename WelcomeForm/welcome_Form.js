let contiBtn = document.getElementById("contiBtn");
contiBtn.addEventListener("click", () => {
  document.getElementById("loadingOuter").style.display = "block";
  document.getElementById("loadingPg").style.display = "flex";

  setTimeout(() => {
    window.location.href = "../instraller/installer.html";
  }, 5000);
});
