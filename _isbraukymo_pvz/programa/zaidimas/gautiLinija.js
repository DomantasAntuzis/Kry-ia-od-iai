export default (spr, teisinga) => {
    //   table += '<hr class="horiz ok" style="--x:5; --y:4; --len:8;">';
//   table += '<hr class="horiz ok" style="--x:2; --y:1; --len:5;">';
//   table += '<hr class="vert fail" style="--x:5; --y:4; --len:3;">';
//   table += '<hr class="diag fail" style="--x:5; --y:4; --len:3;">';
//   table += '<hr class="diag ok" style="--x:8; --y:1; --len:5;">';
//   table += '<hr class="diag fail" style="--x:10; --y:1; --len:7;">';

    if (spr[3] && spr[3] >= 1 && spr[3] <= 3){
        let dir = ["horiz", "vert", "diag"][spr[3] - 1];
        let ok_class = "fail";
        if (teisinga) ok_class = "ok";
        return '<hr class="' 
            + dir 
            + ' '
            + ok_class 
            + '" style="--x:'
            + spr[1]
            + '; --y:'
            + spr[2]
            + '; --len:'
            + spr[0].length
            + ';">';
    }
    return "";
};
