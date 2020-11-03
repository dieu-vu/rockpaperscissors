// JavaScrip assignment 2
// Name: Dieu Vu - Student ID: 2012229

function game(){
    let pScore;
    let cScore;
    let p_wins; //variable to track winning streak of player
    let c_wins; //variable to track winning streak of computer
    let game_on = false;

    const winner = document.querySelector('.winner');
    const continuous_win = document.querySelector('.continuous-win')
    const intro_screen = document.querySelector(".intro");
    const restart_btn = document.querySelector('.restart-game');
    const match = document.querySelector(".match");
    const player_hand= document.querySelector('.player-hand');
    const computer_hand = document.querySelector('.computer-hand');

    // Reset game, display intro,reset score board, allow player to enter game   
    function start_game(){
        const play_btn = document.querySelector(".intro button");
        console.log("Init game...")
        game_on = false;
        continuous_win.style.visibility = "hidden";
        intro_screen.style.display="flex";
        winner.style.visibility = "hidden";
        pScore = 0;
        cScore = 0;
        p_wins = 0;
        c_wins = 0;
        player_hand.src = `./images/rock.png`;
        computer_hand.src = `./images/rock.png`;    
        play_btn.addEventListener('click', start_screen);
        match.classList.remove('fadeIn');
        update_score();
    }


    //change screen after clicking Play button:
    function start_screen(){
        console.log("Start game...")
        game_on = true;
        match.classList.add('fadeIn');
        intro_screen.style.display="none";
        restart_btn.style.visibility="hidden";
    };

    //Let player play and return results:
    function play_match(){
        console.log("New match...")
        const options = document.querySelectorAll('.options button');
        const hands = document.querySelectorAll('.hands img');

        for (hand of hands) {
            hand.addEventListener('animationend', function(event){
                event.target.style.animation="";
            });
        };

        const c_options = ['rock', 'paper','scissors'];

        for (option of options){
            option.addEventListener('click', function(event){
                console.log("game_on");
                if (!game_on){
                    return;
                };
                const p_choice = event.target.textContent;
                const c_num = Math.floor(Math.random()*3);
                const c_choice = c_options[c_num];
                player_hand.src = `./images/rock.png`;
                computer_hand.src = `./images/rock.png`;    
                setTimeout(function() {
                    compare_result(p_choice, c_choice);
                    player_hand.src = `./images/${p_choice}.png`;
                    computer_hand.src = `./images/${c_choice}.png`;
                }, 2000);
                player_hand.style.animation = "shake_p_hands 2s ease";
                computer_hand.style.animation = "shake_c_hands 2s ease";
            });
        };
    };
  
    //Update score board:
    function update_score (){
        const p_score = document.querySelector('.player-score p');
        const c_score = document.querySelector('.computer-score p');
        p_score.textContent = pScore;
        c_score.textContent = cScore;
        // console.log(pScore, cScore);
        // console.log(p_wins, c_wins);

        //Stop game if:
        //One has 10 scores:
        if (pScore ===10 || cScore===10){
            game_on=false;
            end_game();
        }
        //or 3 wins in a row:
        else if (c_wins ===3 || p_wins ===3){
            console.log("3 wins in a row");
            end_game();
            game_on=false;
        }
    }


// Compare player's choice and computer's result:
    function compare_result(p_choice, c_choice){
        console.log("Comparing...")
        winner.style.visibility="visible";
        if (p_choice === c_choice){
            tie();
            return;
        }
        if (p_choice === 'rock'){
            if (c_choice === 'scissors'){
                player_win();
                return;
            }
            else {
                computer_win();
                return;
            }
        }
        if (p_choice === 'paper'){
            if (c_choice === 'rock'){
                player_win();
                return;
            }
            else {
                computer_win();
                return;
            }
        }
        if (p_choice === 'scissors'){
            if (c_choice === 'paper'){
                player_win();
                return;
            }
            else {
                computer_win();
                return;
            }
        }

    }

// Record scores and display winner texts:    
    function player_win (){
        winner.textContent = 'Player wins';
        pScore++;
        p_wins++;
        c_wins=0;
        continuous_win.style.visibility = "visible";
        continuous_win.textContent = `Player's continuous wins: ${p_wins}`;
        update_score();
    } 

    function computer_win (){
        winner.textContent = 'Computer wins';
        cScore++;
        c_wins++;
        p_wins=0;
        continuous_win.style.visibility = "visible";
        continuous_win.textContent = `Computer's continuous wins: ${c_wins}`;
        update_score();    
    }

    function tie (){
        c_wins=0;
        p_wins=0;
        winner.textContent = "It's a tie";
        continuous_win.style.visibility = "hidden";
    }

//Stop game and ask is Player wants to restart game:
    function end_game (){
        if(pScore>cScore){
            winner.textContent = "Player won the whole game!";
        } else{
            winner.textContent = "Computer won the whole game!";
        }; 
        restart_btn.style.visibility="visible";
        restart_btn.addEventListener('click', start_game);
    }

    start_game();
    play_match();

};

game();