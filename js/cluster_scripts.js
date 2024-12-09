/*-------------------------------------------------------------------
    Manejo de las las peticiones de las páginas de Clusters a la API
--------------------------------------------------------------------*/

// Obtiene el contenido de la página para menejar los eventos
const pageContent = document.querySelector('#main-content');
//const filterParams = {};

// Obtiene el código del cluster
const getClusterCode = () => {

    let urlPathname = window.location.pathname;
    let code = {
        "geomechanics-and-hydrogeology": "RC1",
        "machine-learning-and-models-in-hydro-environmental-engineering": "RC2",
        "aeronautical-marine-automotive-and-energy-engineering": "RC3",
        "solid-and-fluid-simulation-for-industrial-processes": "RC4",
        "computational-mechanics-in-medical-engineering-and-living-matter": "RC5",
        "structural-and-particle-mechanics": "RC6",
        "mechanics-of-advanced-materials-and-metamaterials": "RC7",
        "credible-high-fidelity-and-data-driven-models": "RC8",
        "large-scale-multiphysics-computations": "RC9",
        "centre-for-innovation-in-transport": "IU1",
        "building-energy-and-environment": "IU2",
        "pre-post-and-digital-technologies": "IU3"
    };

    urlPathname.endsWith("/") ? urlPathname = urlPathname.slice(0, -1) : urlPathname;

    for (const [key, value] of Object.entries(code)) {
        //console.log(key, value);
        if (urlPathname.endsWith(key)) {
            return value;
        }
    }
}
//console.log(getClusterCode());

// Busca la información de un cluster en la API
window.addEventListener('load', async (event) => {

    console.log("Cimne API request: " + event.target);  
    //event.target.textContent = 'Loading...';
    try {

        const clusterCode = getClusterCode();
        const wsURL = `https://ws.cimne.com/web/cluster?code=${clusterCode}`;
        //const data = await getCluster(getClusterCode());
        const data = await cimneAPIrequest(wsURL);
        

        generateGroupsHTML(data);
        generateStaffHTML(data);
        generateProjectsHTML(data, {});


    } catch (error) {
        // manejo del error
        console.log(error);
    } finally {
        //event.target.remove();
    }
});


// Manda email (se sustituye texto por sendTo)
pageContent.addEventListener('click', event => {
    if (event.target.classList.contains('send-email')) {
        console.log(event.target.id);
        openEmailClient(getMailCimne(event.target.id));
    }
});

// Navegación entre lista de proyectos y su ficha
pageContent.addEventListener('click', async (event) => {
    if (event.target.classList.contains('open-project')) {
        console.log(event.target.id);
        //const data = await getProject(event.target.id);
        //console.log(data);
        try {
            const wsURL = `https://ws.cimne.com/web/project_sheet?project_id=${event.target.id}`;
            //const data = await getCluster(getClusterCode());
            const data = await cimneAPIrequest(wsURL);
            console.log(data);
            generateProjectCardHTML(data);
        } catch (error) {
            // manejo del error
            console.log(error);
        } finally {
            //event.target.remove();
        }
    }

    if (event.target.classList.contains('back')) {
        try {
            const clusterCode = getClusterCode();
            const wsURL = `https://ws.cimne.com/web/cluster?code=${clusterCode}`;
            //const data = await getCluster(getClusterCode());
            const data = await cimneAPIrequest(wsURL);
            generateProjectsHTML(data, {});
        } catch (error) {
            // manejo del error
            console.log(error);
        } finally {
            //event.target.remove();
        }
    }
});

