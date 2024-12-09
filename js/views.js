/*-----------------------------------------------------------------
    Llamada a la API
------------------------------------------------------------------*/
const cimneAPIrequest = async (wsURL) => {

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
/*-----------------------------------------------------------------
    Genera el HTML de los bloques de la página de Clusters
------------------------------------------------------------------*/

const getCodeWithURLWebsite = (webURL) => {
    //console.log(webURL);

    let desktopCode = `<span class="list-website list-website-desktop"><del>       </del><a href="${webURL}" target="_blank" rel="noopener"> WEBSITE</a></span>`;
    let mobileCode = `<div class="list-website list-website-mobile"><span><del>       </del><a href="${webURL}" target="_blank" rel="noopener"> WEBSITE</a></span></div>`;

    return { desktopCode, mobileCode };

}

const generateGroupsHTML = ({ rtd_groups }) => {
    const groupHTML = rtd_groups.map(
        ({ name, leader: { first_name, last_name, last_name2 } }) => (
            `<li class="item-cluster-group"><a href="#">${name}</a><br><span class="item-cluster-group-subtitle">${first_name} ${last_name} ${last_name2}</span></li>`
        )
    ).join('');

    console.log(groupHTML);

    document.querySelector('#cluster-groups').innerHTML = groupHTML;
}
const generateStaffHTML = ({ rtd_groups, personal, personal_category }) => {

    const container = document.querySelector('#staff-container');
    let html = '<h5 class="staff-heading">Group Leaders</h5><div class="staff-block">';
    let leadersId = [];

    rtd_groups.forEach((group, index) => {
        const { leader } = group;
        console.log(leader.personal_id);
        leadersId[index] = leader.personal_id;
    })

    const isLeader = (personalId) => leadersId.includes(personalId);

    html += rtd_groups.map(
        ({ rtd_id, leader: { first_name, last_name, last_name2 } }) => (             
                `<div class="staff-item">
                    <p class="staff-name">${first_name} ${last_name} ${last_name2}</p>
                    <p class="staff-phone">${rtd_id}</p>
                    <p class="staff-email send-email">faltaleadersemail@cimne.upc.edu</p>
                </div>`
        )
    ).join('');

    html += '</div>';

    personal_category.forEach((categories) => {

        const result = {};
        personal.forEach((persona) => {
            const { category } = persona;
            result[category] = (result[category] || 0) + 1;
        });  
        
        if (result[categories] == 1) {
            personal.forEach((persona) => {
                const {category, personal_id } = persona;
                if (category === categories && !isLeader(personal_id)) {
                    html += `<h5 class="staff-heading">${categories}</h5><div class="staff-block">`;
                } 
            });
        }else{
            html += `<h5 class="staff-heading">${categories}</h5><div class="staff-block">`;
        }

        personal.forEach((persona) => {
            const { first_name, last_name, last_name2, email, role, category, personal_id } = persona;
            console.log(category);

            if (category === categories && !isLeader(personal_id)) {
                html += 
                `<div class="staff-item">
                    <p class="staff-name">${first_name} ${last_name} ${last_name2}</p>
                    <p class="staff-phone">${role}</p>
                    <p id="${email}" class="staff-email send-email"></p>
                </div>`;
            }
        });
        html += '</div>';
        
    });

    container.innerHTML = html;
}

const generateProjectsHTML = ({ projects, opts_category } , { categoryFilter, bodyFundingFilter, programFilter }) => {

    const container = document.querySelector('#projects-container');

    console.log(categoryFilter, bodyFundingFilter, programFilter);

    let html = '';

    opts_category.forEach((categoryItem) => {
  
        let categoryClass = categoryItem.replace(' ', '-').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        html += `<dl class="description-list projects-list ${categoryClass}-projects"><h5 class="title ${categoryClass}-projects-title">${categoryItem}</h5>`;

        projects.forEach((project) => {
            const { proj_id, acronym, title, category, start, end, finished, web, financing_entity, program } = project;

            if (category === categoryItem && (!categoryFilter || categoryFilter === category) && (!bodyFundingFilter || bodyFundingFilter === financing_entity) && (!programFilter || programFilter === program)) {

                let isFinished = finished ? 'hide-element finished' : 'ongoing';
                let hasWebsiteHTMLCode = web ? getCodeWithURLWebsite(web) : { desktopCode: '<span></span>', mobileCode: '<span></span>' };
  
                html += `<div class="list-block ${isFinished}-project">
                            <div class="list-title">
                                <span id="${proj_id}" class="open-project">
                                    ${acronym}
                                </span>
                                ${hasWebsiteHTMLCode.desktopCode}
                            </div>
                            <div class="list-title">
                                <span id="${proj_id}" class="open-project">
                                    ${title}
                                </span>
                            </div>
                            <div class="list-item">
                                <dt>Start:</dt>
                                <dd>${start}</dd>
                            </div>
                            <div class="list-item">
                                <dt>End:</dt>
                                <dd>${end}</dd>
                            </div>
                            <div class="list-item">
                                <dt>Funding body(ies):</dt>
                                <dd>${financing_entity}</dd>
                            </div>
                            <div class="list-item">
                                <dt>Program:</dt>
                                <dd>${program}</dd>
                            </div>
                            ${hasWebsiteHTMLCode.mobileCode}
                        </div>`;
            }
        });

        html += '</dl>';
        container.innerHTML = html;
    });

}

/*-----------------------------------------------------------------
    Genera el HTML del bloque de la ficha de proyecto
------------------------------------------------------------------*/

const generateProjectCardHTML = ({ acronym, title, image, image2, invest_main, email_ip, abstract, web, partners, reference, start_date, end_date, coordinator, program, subprogram, call, category, financing_entity, grant, web_footer }) => {

    const container = document.querySelector('#projects-container');

    let html = `
    <div id="project-ficha"> 
        <div class="project-ficha-back">
            <div><span class="back">Back</span></div>
        </div>
        <div class="project-ficha-heading">
            <div class="left">
                <h5 class="acronim">${acronym}</h5>
                <p class="title">${title}</p>
            </div>
            <div class="right logos">
                <img class="finac-pic" src= "data:image/jpg;base64, ${image2}" alt="finacial body logo">
            </div>
        </div>
        <div class="project-ficha-body">
        <div class="left">
                <div class="profile">
                    <div class="profile-pic">
                        <img src="data:image/jpg;base64,${image}" alt="profile picture">
                    </div>
                    <div class="profile-info">
                        <p class="category">Principal investigator</p>
                        <p class="name">${invest_main}</p>
                        <p class="email">${email_ip}<p>
                    </div>
                </div>
                <div class="abstract">
                    <p class="text">${abstract}</p>
                    <p class="website"><span class="list-website list-website-desktop"><del>       </del><a href="${web}" target="_blank" rel="noopener"> WEBSITE</a></span></p>
                </div>
            </div> 
        
            <div class="right">
            <details id="consortium-members" name="acordeon">
                    <summary>Consortium members</summary>
                    <ul>`;
                    
        partners.forEach((partner) => {
            html += `<li>${partner}</li>`;
        });

        html += `
        </ul>
        </details>
                <details id="more-information" name="acordeon">
                    <summary>More information</summary>
                    <dl>
                        <div class="list-item">
                            <dt>Reference:</dt>
                            <dd>${reference}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Start:</dt>
                            <dd>${start_date}</dd>
                        </div>
                        <div class="list-item">
                            <dt>End:</dt>
                            <dd>${end_date}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Coordinator:</dt>
                            <dd>${coordinator}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Program:</dt>
                            <dd>${program}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Call:</dt>
                            <dd>${call}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Subprogram:</dt>
                            <dd>${subprogram}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Category:</dt>
                            <dd>${category}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Funding body(ies):</dt>
                            <dd>${financing_entity}</dd>
                        </div>
                        <div class="list-item">
                            <dt>Grant:</dt>
                            <dd>${grant}</dd>
                        </div>
                    </dl>
                </details>
            </div>
        </div>
        <div class="project-ficha-extra">
            <p class="text web_footer">${web_footer}</p>
        </div>
    </div>`;
    container.innerHTML = html;
}


const generateProjectsFilter = ({ opts_category, opts_financing_entity, opts_program }) => {


    const formContainer = document.querySelector('#projects-form');

    let html = `
        <div class="form-group">
            <select id="group" class="form-control">
            <option value="" class="dropdown-header">All</option>`;
    
    
    html += opts_category.map(
        ( category ) => (             
                `<option value="${category}">${category}</option>`
        )
    ).join('');

    html += `
            </select>
        </div>
        <div class="form-group">
            <select id="researh-cluster" class="form-control">
            <option value="" class="dropdown-header">Research Cluster</option>`;

    html += opts_financing_entity.map(
        ( bodyFunding ) => (             
                `<option value="${bodyFunding}">${bodyFunding}</option>`
        )
    ).join('');

    html += `
            </select>
        </div>
        <div class="form-group">
             <select id="principal-investor" class="form-control">
             <option value="" class="dropdown-header">Principal Investor</option>`;

    html += opts_program.map(
        ( programa ) => (             
                `<option value="${programa}">${programa}</option>`
        )
    ).join('');

    html += `
            </select>
        </div>`;
    //console.log(html);
    //console.log(formContainer);
    formContainer.innerHTML = html;
}


// const getFilterParams = () => {

//     return {
//         categoryFilter: document.querySelector('#group').value ? document.querySelector('#group').value : '',
//         bodyFundingFilter: document.querySelector('#researh-cluster').value ? document.querySelector('#researh-cluster').value : '',
//         programFilter: document.querySelector('#principal-investor').value ? document.querySelector('#principal-investor').value : ''
//     }

// }