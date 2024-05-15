/* fetch("softwares.xml")
  .then((res) => {
    return res.text();
  })
  .then((xmlString) => {
  });
 */
const xmlString = `<softwares>
<software>
        <softImage>https://cdn.pixabay.com/photo/2019/07/02/05/54/tool-4311573_960_720.png</softImage>
        <softTitle>Support Files</softTitle>
        <status>true</status>
    </software>
    <software>
        <softImage>https://icons.iconarchive.com/icons/artua/mac/512/Safe-icon.png</softImage>
        <softTitle>FileVaultDisk Encryption</softTitle>
        <status>true</status>
    </software>
    <software>
        <softImage>https://a-power.com/app/uploads/2022/08/92080104_0867888140.jpeg</softImage>
        <softTitle>Sephos Endpoint</softTitle>
        <status>false</status>
    </software>
    <software>
        <softImage>https://store-images.s-microsoft.com/image/apps.11145.13510798886604964.5dca8896-c479-4a2a-8893-eafcbdcc66c2.e122ac7f-3d6b-4a89-a0d8-c0fc14b0a67f</softImage>
        <softTitle>Palo Alto GlobaiProtect</softTitle>
        <status>true</status>
    </software>
    <software>
        <softImage>https://assets-global.website-files.com/62fcae5d7173a53da3206407/641c9741139f4f004d231633_Microsoft_Teams-Logo.wine.png</softImage>
        <softTitle>Microsott Teams</softTitle>
        <status>false</status>
    </software>
    <software>
        <softImage>https://yt3.googleusercontent.com/p5o0NE0QoIMjlIiX6S1E5xIULBtlS5bKhoFAv4LdOvp6i2yVvMOFFgV2hNW4YGKRRm-73Qz_=s900-c-k-c0x00ffffff-no-rj</softImage>
        <softTitle>Zoom</softTitle>
        <status>true</status>
    </software>
    <software>
        <softImage>https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png</softImage>
        <softTitle>Google Chrome</softTitle>
        <status>true</status>
    </software>
    <software>
        <softImage>https://cdn3d.iconscout.com/3d/premium/thumb/settings-10664274-8550486.png</softImage>
        <softTitle>Final Configuration</softTitle>
        <status>false</status>
    </software>
    <software>
        <softImage>https://i.pinimg.com/564x/ed/60/f0/ed60f02fd2ca4d455a3d4bbbb521ca45.jpg</softImage>
        <softTitle>Computer Inventory</softTitle>
        <status>true</status>
    </software>
    
</softwares>`;

const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");
const softwares = xmlDoc.querySelectorAll("software");

let softs = [];
for (const soft of softwares) {
  let newObj = {
    softImg: soft.querySelector("softImage").textContent,
    softTitle: soft.querySelector("softTitle").textContent,
    status: soft.querySelector("status").textContent,
  };
  softs.push(newObj);
}

let perc = 100 / softs.length;
let success = 0;
for (let i = 0; i < softs.length; i++) {
  if (softs[i].status === "true") success++;
  let newMidlistItem = `<div class="midListItems" id="${i}-listItem">
<div class="itemLeft">
  <img
    src="${softs[i].softImg}"
    alt=""
  />
  <p style="margin: 0">${softs[i].softTitle}</p>
</div>
<div class="itemRight" style="display:none" id="${i}-listItemRight">
  <p>Installing...</p>
  <i class="fa-solid fa-spinner"></i>
</div>
<div class="itemRightPending" id="${i}-listItemRightPending">
      <p
        style="
          margin-top: 0;
          margin-bottom: 0;
          color: gray;
          font-weight: bolder;
        "
      >
        Pending...
      </p>
      <i class="fa-solid fa-hourglass-half" style= "color:gray;"></i>
      </div>
</div>`;
  $(".midList").append(newMidlistItem);
}

let btn = document.getElementById("startBtn");

function hideWithDelay(softs, i, p) {
  if (i >= 7) {
    scrollUp(".midList", perc + 2);
  }
  if (i >= softs.length) {
    btn.innerText = "Completed";
    btn.classList.add("btn-primary");
    btn.disabled = false; /* 
    btn.removeEventListener("click", clickHandler); */

    let loadingPg = document.getElementById("succMsg");
    loadingPg.innerHTML = `${success} Softwares are successfully installed <br /> 🙂 🎉🎉🎉 🙂 <br /> And ${
      softs.length - success
    } of them are Failed ☹️`;
    document.getElementById("loadingOuter").style.display = "block";
    document.getElementById("loadingPg").style.display = "flex";
    return;
  }

  document.getElementById("currentSoftware").src = softs[i].softImg; /* 
  document.getElementById("titlePara").innerText = softs[i].softTitle; */
  document.getElementById(`${i}-listItemRightPending`).style.display = "none";
  document.getElementById(`${i}-listItemRight`).style.display = "flex";
  $("#loader").animate(
    {
      width: `${p}%`,
    },
    2000
  );
  setTimeout(() => {
    document.getElementById(`${i}-listItemRight`).style.display = "none";
    if (softs[i].status === "true") {
      let html = `<div class="itemRightComp">
      <p
        style="
          margin-top: 0;
          margin-bottom: 0;
          color: green;
          font-weight: bolder;
        "
      >
        Completed
      </p>
      <i class="fa-solid fa-circle-check" style="color: green"></i>
      </div>`;
      $(`#${i}-listItem`).append(html);
      document.getElementById(`${i}-listItem`).classList.add("success");
    } else {
      let html = `<div class="itemRightAbort">
      <p
        style="
          margin-top: 0;
          margin-bottom: 0;
          color: red;
          font-weight: bolder;
        "
      >
      Failed
      </p>
      <i class="fa-solid fa-circle-xmark" style="color: red"></i>
      </div>`;
      $(`#${i}-listItem`).append(html);
      document.getElementById(`${i}-listItem`).classList.add("failed");
    }

    hideWithDelay(softs, i + 1, p + perc);
  }, 2000);
}

hideWithDelay(softs, 0, perc);
/* function clickHandler() {
  btn.innerText = "wait";
  btn.disabled = "true";
}
btn.addEventListener("click", clickHandler); */

function scrollUp(c, percentage) {
  // Get the element
  let element = $(c);

  // Calculate the scroll amount based on the percentage
  let scrollAmount = (element[0].scrollHeight * percentage) / 100;

  // Animate the scrolling
  element.animate(
    {
      scrollTop: element.scrollTop() + scrollAmount,
    },
    200
  );
}
/* 
// Example usage: scroll up by 11% of the element's height
scrollUp('#yourElement', 11); */

let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => {
  document.getElementById("loadingOuter").style.display = "none";
  document.getElementById("loadingPg").style.display = "none";
});
