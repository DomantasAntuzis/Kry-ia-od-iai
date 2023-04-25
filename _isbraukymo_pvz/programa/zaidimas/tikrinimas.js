import GautiZodi from "./gautiZodi.js";
import GautiLinija from "./gautiLinija.js";

export default (lentele, zodziai, sprendimas) => {
  // console.log(lentele);
  // console.log(zodziai);
  // console.log(sprendimas);

  let linijos = "";
  let teisingi_zodziai = [];

  for (const i in sprendimas) {
    let spr = sprendimas[i];
    console.log(spr);

    let spr_zodis = GautiZodi(lentele, spr[1], spr[2], spr[0].length, spr[3]);

    console.log(spr_zodis);
    if (spr_zodis.toLowerCase() == spr[0].toLowerCase()) {
      console.log("sutampa");
      if (zodziai.includes(spr[0])) {
        teisingi_zodziai.push(spr[0].toLowerCase());
        linijos += GautiLinija(spr, true);
        console.log("žodis yra žodžių saraše");
      } else {
        linijos += GautiLinija(spr, false);
        console.log("žodžio žodžių saraše nėra");
      }
    } else {
      console.log("nesutampa koordinatės");
    }
  }

  return {
    linijos: linijos,
    teisingi_zodziai: teisingi_zodziai,
  };
};
