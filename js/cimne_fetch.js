/*-----------------------------------------------------------------
    Manejo de las las peticiones de las páginas de Clustera la API
------------------------------------------------------------------*/

// password es 843df7c35a7d57bcb9c48b0b3c7cebb
// texto el que te viene en el mail del ws
const password = "843df7c35a7d57bcb9c48b0b3c7cebb";
const encryptedText = "YourEncryptedStringHere";


//solo te interesa esto:
const getDecrypt = (encryptedText, password) => {
    decrypt(encryptedText, password).then(plaintext => {
        console.log(plaintext);
    });
}



const getCluster = async(clusterCode) => {


    const wsURL = `https://ws2.cimne.com/web/cluster?code=${clusterCode}&nocache`;

    try {
   
        console.log(wsURL);
        const resp = await fetch(wsURL);
        console.log(resp);
        const json = await resp.json();
        console.log(json);
        return json;
    
    } catch (error) {
    
        // manejo del error
        console.log(error);
    }
}

// const generateGroupsHTML = (data) => { 
//     const {rtd_groups, personal, personal_category, projects, projects_category, metadata} = data;
    
//     rtd_groups.forEach((grupo) => {
//         const {name, leader} = grupo;
//         console.log(name, leader.first_name, leader.last_name, leader.last_name2);
//         document.querySelector('#cluster-groups').innerHTML += `<li class="item-cluster-group"><a href="#">${name}</a><br><span class="item-cluster-group-subtitle">${leader.first_name} ${leader.last_name} ${leader.last_name2}</span></li>`;     
//     });
// }

const generateGroupsHTML = ({ rtd_groups }) => {
    const groupHTML = rtd_groups.map(
        ({ name, leader: { first_name, last_name, last_name2 } }) => (
            `<li class="item-cluster-group"><a href="#">${name}</a><br><span class="item-cluster-group-subtitle">${first_name} ${last_name} ${last_name2}</span></li>`
        )
    ).join('');

    console.log(groupHTML);

    document.querySelector('#cluster-groups').innerHTML = groupHTML;
}
const generateStaffHTML = ({rtd_groups, personal, personal_category}) => { 

    // const {rtd_groups, personal, personal_category} = data;
    const container = document.querySelector('#staff-container');
    let html = '<h5 class="staff-heading">Group Leaders</h5><table class="responsive-table"><tbody>';

    // html += '<h5 class="staff-heading">Group Leaders</h5>';
    // html += '<table class="responsive-table"><tbody>';

    html += rtd_groups.map(
        ({ rtd_id, leader: { first_name, last_name, last_name2 } }) => (
            `<tr><td>${first_name} ${last_name} ${last_name2}</td><td data-label="Phone: ">${rtd_id}</td><td id="" class="send-email" data-label="E-mail: "></td></tr>`
        )
    ).join('');

    html += '</tbody></table><br/>';

    personal_category.forEach((categories) => {
        console.log(categories);
        html += `<h5 class="staff-heading">${categories}</h5><table class="responsive-table"><tbody>`;
        
        personal.forEach((persona) => {
            const {first_name, last_name, last_name2, email, role, category} = persona;
            console.log(category);

            if(category === categories) {
                html += `<tr><td>${first_name} ${last_name} ${last_name2}</td><td data-label="Phone: ">${role}</td><td id="${email}" class="send-email" data-label="E-mail: "></td></tr>`;
            }         
        });
        html += '</tbody></table><br/>';     
    });

    container.innerHTML = html;
}


window.addEventListener('load', async (event) => {

    //console.log(event.target);  
    //event.target.textContent = 'Loading...';
    try {

      const data = await getCluster(getClusterCode());

      generateGroupsHTML(data);
      generateStaffHTML(data);


    } catch (error) {
        // manejo del error
        console.log(error);
    } finally {
      //event.target.remove();
    }
});




const getClusterCode = () => {
   
    let urlPathname = window.location.pathname;   
    let code = {
        "geomechanics-and-hydrogeology" : "RC1",
        "machine-learning-and-models-in-hydro-environmental-engineering" : "RC2",
        "aeronautical-marine-automotive-and-energy-engineering" : "RC3",
        "solid-and-fluid-simulation-for-industrial-processes" : "RC4",
        "computational-mechanics-in-medical-engineering-and-living-matter" : "RC5",
        "structural-and-particle-mechanics" : "RC6",
        "mechanics-of-advanced-materials-and-metamaterials" : "RC7",
        "credible-high-fidelity-and-data-driven-models" : "RC8",
        "large-scale-multiphysics-computations" : "RC9",        
        "centre-for-innovation-in-transport" : "IU1",
        "building-energy-and-environment" : "IU2",
        "pre-post-and-digital-technologies" : "IU3"
    };

    urlPathname.endsWith("/") ? urlPathname = urlPathname.slice(0, -1) : urlPathname;

    for (const [key, value] of Object.entries(code)) {
        //console.log(key, value);
        if (urlPathname.endsWith(key)) {
            return value;
        }
    }
}

console.log(getClusterCode());

