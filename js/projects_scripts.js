
const pageContent = document.querySelector('#main-content');

window.addEventListener('load', async (event) => {

    console.log("Cimne API request: " + event.target);  
    //event.target.textContent = 'Loading...';
    try {

        const wsURL = 'https://ws.cimne.com/web/projects?nocache';
        const data = await cimneAPIrequest(wsURL);
        let filterParams = {};

        generateProjectsHTML(data, filterParams);
        generateProjectsFilter(data);

        pageContent.addEventListener('click', event => {

            if (event.target.classList.contains('filter-data')) {

                filterParams = getFilterParams();
                document.querySelector('#ongoing-projects-item').click();
                generateProjectsHTML(data, filterParams);

            } else if (event.target.classList.contains('refresh-filter')) {
                
                const formToReset = document.querySelectorAll('#search-bar form');

                formToReset.forEach(form => {
                    form.reset();
                });
                filterParams = getFilterParams();
                document.querySelector('#ongoing-projects-item').click();
                generateProjectsHTML(data, filterParams);
            }
        });

    } catch (error) {
        // manejo del error
        console.log(error);
    } finally {
        //event.target.remove();
    }
});



const getFilterParams = () => {

    return {
        categoryFilter: document.querySelector('#group').value ? document.querySelector('#group').value : '',
        bodyFundingFilter: document.querySelector('#researh-cluster').value ? document.querySelector('#researh-cluster').value : '',
        programFilter: document.querySelector('#principal-investor').value ? document.querySelector('#principal-investor').value : ''
    }

}