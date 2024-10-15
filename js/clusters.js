var matches = document.querySelectorAll("li.settings-icon, li.school-icon, li.emonji-icon");

console.log(matches);

for(let i=0; i < matches.length; i++){
  matches[i].addEventListener("click", (event) => {
    //console.log(event.target);
    //const clusterClass = event.target.getAttribute("class");
    console.log("Se ha clickeado el cluster " + event.target.getAttribute("class"));
    const classes = event.target.getAttribute("class");
    const clusterCode = classes.slice(classes.lastIndexOf(" ")).trim();
    console.log(clusterCode);
    //window.location.replace("https://web.cimne.com/cluster/?code="+clusterCode );
    //window.location.href = "https://web.cimne.com/cluster/?code="+clusterCode;
    window.location.href = "https://web.cimne.com/projects-template/?code="+clusterCode;
  }); 
  
}