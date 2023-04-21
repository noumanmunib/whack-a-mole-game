      const holes = document.querySelectorAll(".hole");
      const scoreBoard = document.querySelector(".score");
      const moles = document.querySelectorAll(".mole");

      let lastHole;
      let timeUp = false;
      let score = 0;

      const randomTime = function (max, min) {
        return Math.round(Math.random() * (max - min) + min);
      };

      const randomHole = function (holes) {
        // console.log(holes.length);
        const indexHole = Math.floor(Math.random() * holes.length);
        const hole = holes[indexHole];

        // This will check if the same hole is repeated in a row, and then re-run the function to get a different result.
        if (hole === lastHole) {
          // console.log("Abbay wo hi aa geya ray!");
          return randomHole(holes);
        }

        lastHole = hole;
        return hole;
      };

      const peep = function () {
        const time = randomTime(350, 800);
        const hole = randomHole(holes);
        console.log(time, hole);

        hole.classList.add("up");

        setTimeout(() => {
          hole.classList.remove("up");
          if (!timeUp) peep();
        }, time);
      };

      const startGame = function () {
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        peep();
        setTimeout(() => (timeUp = true), 10000);
      };

      const bonk = function (e) {
        console.log(e);
        if (!e.isTrusted) return; // cheater! This is not a user click!
        score++;
        this.parentNode.classList.remove("up");
        scoreBoard.textContent = score;
      };

      moles.forEach((mole) => mole.addEventListener("click", bonk));
