export default (zodziai, teisingi_zodziai) => {
    // console.log(zodziai);

    let sarasas = '<div class="row">';
    for (const i in zodziai) {
        let zodis = zodziai[i];
        if (teisingi_zodziai.includes(zodis.toLowerCase())) {
            sarasas += '<div class="col-sm-6 col-md-4 col-lg-2 text-decoration-line-through">' + zodis + '</div>';
        } else {
            sarasas += '<div class="col-sm-6 col-md-4 col-lg-2">' + zodis + '</div>';
        }
        
    }
    sarasas += '</div>';
    return sarasas;
};