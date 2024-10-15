// const apiKey = 'ODF7r7iJm23Bfns4YP4CIiulKJ4vYbgX';

// const peticion = fetch(`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);

// peticion
//     .then( resp => resp.json() )
//     .then( ({data}) => {
//         //console.log(data.images.original.url)

//         const {url} = data.images.original;
//         const img = document.createElement('img');
//         img.src = url;
//         document.body.append( img );
//     })
//     .catch( console.warn )


// Usando async-await y try-catch se evita el uso de promises. El siguiente codigo es equivalente al del punto anterior.    ç

// Funcionando en url: https://web.cimne.com/test/




const getCluster = async(clusterCode) => {

    const wsURL = `https://ws.cimne.com/web_cimne/GetClusterByCode?Code=${clusterCode}`;

    try {
    
        //const clusterCode = 'RC3';
        const resp = await fetch(wsURL);
        console.log(resp);
        // const data = await resp.json();
        // console.log(data);
        const {RTDGrupos} = await resp.json();
        RTDGrupos.forEach((grupo) => {
            const {Nombre, IdRTDGrupo, id_Cluster} = grupo;
            console.log(Nombre, IdRTDGrupo, id_Cluster)
        })
        //console.log(RTDGrupos);
        //const nombre  = data.Nombre;
        //console.log(nombre);
        //const img = document.createElement('img');
        //img.src = url;
        //document.body.append( img );
    
    } catch (error) {
    
        // manejo del error
        console.log(error);
    }
}



const getClusterCode = () => {
   
    let urlPathname = window.location.pathname;   
    let code = {
        "aeronautical-marine-automotive-and-energy-engineering" : "RC1",
        "computational-mechanics-in-medical-engineering-and-living-matter" : "RC2",
        "credible-high-fidelity-and-data-driven-models" : "RC3",
        "geomechanics-and-hydrogeology" : "RC4",
        "large-scale-multiphysics-computations" : "RC5",
        "machine-learning-and-models-in-hydro-environmental-engineering" : "RC6",
        "mechanics-of-advanced-materials-and-metamaterials" : "RC7",
        "solid-and-fluid-simulation-for-industrial-processes" : "RC8",
        "structural-and-particle-mechanics" : "RC9",
        "centre-for-innovation-in-transport" : "IU1",
        "building-energy-and-environment" : "IU2",
        "pre-post-and-digital-technologies" : "IU3"
    };

    urlPathname.endsWith("/") ? urlPathname = urlPathname.slice(0, -1) : urlPathname;

    for (const [key, value] of Object.entries(code)) {
        console.log(key, value);

        if (urlPathname.endsWith(key)) {
            return value;
        }
    }
}

console.log(getClusterCode());
getCluster(getClusterCode());
