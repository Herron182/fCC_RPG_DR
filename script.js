let xp = 0; //set back to 0 after testing
let health = 100;
let gold = 50; //set back to 50 after testing
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let playerLevel = 1;
let xpNeeded = 15; // XP needed to reach level 2
const maxLevel = 10; // Max level cap
                                                                                                 
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const playerLevelText = document.querySelector("#playerLevelText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon", "Level Up!"],
    "button functions": [goStore, goCave, fightDragon, levelUp],
    text: "You are in the town square. You see a sign that says \"Store\".",

    // Visibility tracking for each button (true = visible, false = hidden)
    "button visibility": [true, true, true, true],

    // Method to hide a specific button by index
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },

    // Method to show a specific button by index
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },

    // Method to render buttons considering visibility
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = ''; // Clear previous buttons

      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) { // Only render visible buttons
          const button = document.createElement('button');
          button.className = 'my-buttons';  // Add class for easy selection
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square", "Level Up!"],
    "button functions": [buyHealth, buyWeapon, goTown, levelUp],
    text: "You enter the store.",
    "button visibility": [true, true, true, true],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square", "Level Up!"],
    "button functions": [fightSlime, fightBeast, goTown, levelUp],
    text: "You enter the cave. You see some monsters.",
    "button visibility": [true, true, true, true],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run", "Level Up!"],
    "button functions": [attack, dodge, goTown, levelUp],
    text: "You are fighting a monster.",
    "button visibility": [true, true, true, false],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
    "button visibility": [true, true, true, false],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
    text: "You die. &#x2620;",
    "button visibility": [true, true, true, true],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
    "button visibility": [true, true, true, true],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    "button visibility": [true, true, true, false],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
  {
    name: "levelUp",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Level Up!"],
    "button functions": [goTown, goTown, goTown, levelUp],
    text: "Would you like to trade some xp to level up your attack?",
    "button visibility": [true, false, false, true],
    hideButton(index) {
      this["button visibility"][index] = false;
      this.renderButtons();
    },
    showButton(index) {
      this["button visibility"][index] = true;
      this.renderButtons();
    },
    renderButtons() {
      const container = document.getElementById('button-container');
      container.innerHTML = '';
      this["button text"].forEach((text, index) => {
        if (this["button visibility"][index]) {
          const button = document.createElement('button');
          button.className = 'my-buttons';
          button.innerText = text;
          button.onclick = this["button functions"][index];
          container.appendChild(button);
        }
      });
    }
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = levelUp;

function updateMonsterAndTextDisplay(location) {
  monsterStats.style.display = "none";
  text.innerHTML = location.text;
}

function goTown() {
  updateMonsterAndTextDisplay(locations[0]);
  locations[0].renderButtons();
}

function goStore() {
  updateMonsterAndTextDisplay(locations[1]);
  locations[1].renderButtons();
}

function goCave() {
  updateMonsterAndTextDisplay(locations[2]);
  locations[2].renderButtons();
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
function levelUp() {
  if (playerLevel >= maxLevel) {
    text.innerText = "You have reached the maximum level!";
    return;
  }

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    xpText.innerText = xp;

    playerLevel++;
    playerLevelText.innerText = playerLevel;
    
    text.innerText = `Congratulations, you are now Level ${playerLevel}!`;

    // Increase the power of weapons with each level
    for (let i = 0; i < weapons.length; i++) {
      weapons[i].power *= 1.5;
    }

    // Increase the XP needed for the next level
    xpNeeded = Math.floor(xpNeeded * 1.5); // Example increment logic

    // Update the UI or display the required XP for the next level if needed
    
  } else {
    text.innerText = `You don't have enough XP.
    XP needed: ${xpNeeded}`;
  }
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  updateMonsterAndTextDisplay(locations[3]);
  locations[3].renderButtons();
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  updateMonsterAndTextDisplay(locations[4]);
  locations[4].renderButtons();
}

function lose() {
  updateMonsterAndTextDisplay(locations[5]);
  locations[5].renderButtons();
}

function winGame() {
  updateMonsterAndTextDisplay(locations[6]);
  locations[6].renderButtons();
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  playerLevel = 1;
  playerLevelText.innerText = 1;
  xpNeeded = 15;
  goTown();
}

function easterEgg() {
  updateMonsterAndTextDisplay(locations[7]);
  locations[7].renderButtons();
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}