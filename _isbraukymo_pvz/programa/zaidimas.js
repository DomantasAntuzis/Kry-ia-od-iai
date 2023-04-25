import Lentele from "./zaidimas/lentele.js";
import Tikrinimas from "./zaidimas/tikrinimas.js";
import Zodziai from "./zaidimas/zodziai.js";

export default (lentele, zodziai, Sprendimas) => {
    // console.log(lentele);
    // console.log(zodziai);
    // console.log(sprendimas);

    const sprendimas = Sprendimas(lentele, zodziai);
    // console.log(sprendimas);
    document.getElementById("lentele").innerHTML = Lentele(lentele);
    
    let tikrinimas = Tikrinimas(lentele, zodziai, sprendimas);
    document.getElementById("lentele").innerHTML += tikrinimas.linijos;
    
    document.getElementById("zodziai").innerHTML = Zodziai(zodziai, tikrinimas.teisingi_zodziai);
};