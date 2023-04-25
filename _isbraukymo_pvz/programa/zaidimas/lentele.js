// lentelės sugeneravimas
export default (lentele) => {
    var table = '<table class="table table-bordered table-responsive">';
    
    for (const i in lentele) {
        let eilute = lentele[i];
        table += '<tr>';
        for (const j in eilute) {
            let raide = eilute[j];
            table += '<td>' + raide + '</td>';
        } 
        table += '</tr>';
    }
    table += '</table>';

    // console.log(table);
    return table;
};