new Vue({
    el: '#app',
    data: {

        playerHealth: 100,
        monsterHealth: 100,
        healCount: 5,
        specialCount: 5,
        gameIsRunning: false, 
        log: [], 
        winText: '', 
        gaveUp: false

    },
    methods: {
        startGame: function () {

            this.gameIsRunning = true;

        },
        attack: function () {

            var monsterDamage = this.dealDamage(5, 12);
            var playerDamage = this.dealDamage(3, 10);

            this.playerHealth -= monsterDamage;
            this.monsterHealth -= playerDamage;

            this.log.unshift({ name: 'You', isPlayer: true, isMonster: false, damage: playerDamage}, { name: 'Monster', isPlayer: false, isMonster: true, damage: monsterDamage});

            if (this.checkWin(this.playerHealth, this.monsterHealth))
                this.winText = this.announceWinner(this.playerHealth, this.monsterHealth);

        },
        specialAttack: function () {

            if (this.specialCount == 0)
                return;
            
            var monsterDamage = this.dealDamage(5, 12);

            this.playerHealth -= monsterDamage;
            this.monsterHealth -= 10;
            this.specialCount -= 1;

            this.log.unshift({ name: 'You', isPlayer: true, isMonster: false, damage: 10}, { name: 'Monster', isPlayer: false, isMonster: true, damage: monsterDamage});

            if (this.checkWin(this.playerHealth, this.monsterHealth))
                this.winText = this.announceWinner(this.playerHealth, this.monsterHealth);

        },
        heal: function () {

            if (this.healthCount == 0)
                return;

            if (this.playerHealth == 100)
                return;

            if (this.playerHealth >= 90){
                this.playerHealth = 100;
            } else {
                this.playerHealth += 10;
            }

            var monsterDamage = this.dealDamage(5, 12);            
            this.playerHealth -= monsterDamage;

            this.healCount -= 1;

            this.log.unshift({ name: 'Monster', isPlayer: false, isMonster: true, damage: monsterDamage});

            if (this.checkWin(this.playerHealth, this.monsterHealth))
                this.winText = this.announceWinner(this.playerHealth, this.monsterHealth); 

        },
        giveUp: function() {

            this.winText = "You run away with you tale between your legs.";
            this.gaveUp = true;
        },
        dealDamage: function (min, max) {

            return Math.max(Math.floor((Math.random() * max) + 1), min);

        },
        checkWin: function(playerHealth, monsterHealth) {
            
            if (playerHealth <= 0 || monsterHealth <= 0) 
                return true;
            
            return false;
        },
        resetGame: function() {

            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healCount = 5;
            this.specialCount = 5;
            this.log = [];
            this.gameIsRunning = false;
            this.winText = '';
            this.gaveUp = false;

        },
        announceWinner: function(playerHealth, monsterHealth) {

            if (monsterHealth > playerHealth) {
                return "You Lost!";
            } else {
                return "You Won!";
            }

            //Turnary not working.  Not sure why.
            //return monsterHeath > playerHealth ? "You Lost!" : "You Won!";

        }
    }
});