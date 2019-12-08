let Round = function(){
  let obj={
    init: function(no_of_teams_left, round_no, onRoundComplete){
      let self = this;
      self.no_of_teams_left = no_of_teams_left;
      self.round_no = round_no;
      self.games_played = 0;
      self.onRoundComplete = onRoundComplete;
    },
    append_rounds:function(referenceNode){
      const self = this;
      const {round_no} = self;
      let test = null;
      if(round_no===1){
        test = document.getElementById('card_wrapper');
      }else{
        test = document.getElementById(`round_${round_no-1}_pointer_1`);
      }
      const height = test.getBoundingClientRect().height;
      const top = height/2;
      let rounds_elm = document.createElement('div');
      rounds_elm.setAttribute('id','Round_'+round_no);
      rounds_elm.setAttribute('class','col');
      let current_round_str = '';

        if(self.no_of_teams_left<1){
          current_round_str+= `<h4>Winner</h4>`;
          current_round_str+=`<h5 id='round_${round_no}_game_${1}_winner' class='absolute' style='top:${top-22}px'>Tournament Winner</h5>`
        }else{
          current_round_str+= `<h4>Round ${round_no}</h4>`;
        }

        for(let i=1, j=1; i<=self.no_of_teams_left;i++, j++){
          current_round_str+= `<div id='round_${round_no}_pointer_${i}' class='relative' style='height:${(height*2)}px'>`
            current_round_str+=`<div id='round_${round_no}_game_${j}_winner' class='absolute' style='top:${top-22}px'>Winner</div>`
            current_round_str+= `<div class='horizontal-line' style='top:${top}px'></div>`
            current_round_str+= '<div class="vertical-line" style="top:'+top+'px; height:'+(height)+'px"></div>'
            current_round_str+= '<div class="horizontal-line" style="top:'+top+'px"></div>';
            j++;
            current_round_str+=`<div id='round_${round_no}_game_${j}_winner' class='absolute' style='top:${top+height+4}px'>Winner</div>`
            current_round_str+=`<div id='round_${round_no+1}_game_${i}_button_wrapper' class='vertical-center'></div>`
          current_round_str+='</div>';
        }
      rounds_elm.innerHTML = current_round_str;
      referenceNode.parentNode.insertBefore(rounds_elm, referenceNode.nextSibling);
    },

    removeModal:function(res){
      const self = this;
      const {team_1, team_2, round_no, game_no}= res;
      let el = document.getElementById(`round_${round_no}_game_${game_no}_winner`);
      const arr = [team_1.teamName, team_2.teamName];
      const rand_value = arr[Math.floor(Math.random() * arr.length)];
      el.innerHTML = rand_value;
      let status_elm = document.getElementById('game_status');
      status_elm.innerHTML =  `Winner is ${rand_value}`;
      if(self.games_played === self.no_of_teams_left){
        self.onRoundComplete(round_no);
      }
      setTimeout(()=>{
        self.modal.remove();
      },500);
    },

    handleClick:function(res){
      const self = this;
      self.modal = new Modal();
      const {team_1, team_2, round_no, game_no}= res;
      let modal_children_str = '';
      modal_children_str += `<div class='row p-50'>`;
        modal_children_str += `<div class='col-md-12'>`
          modal_children_str += `<center><h5>${team_1.teamName} &nbsp VS &nbsp ${team_2.teamName}</h5></center>`;
          modal_children_str += `<center><img class='m-t-20'/></center>`;
          modal_children_str += `<center><h5 id='game_status' class='m-t-20'>Playing....</h5></center>`;
        modal_children_str += `</div>`;
      modal_children_str += `</div>`;
      self.modal.init('.modal-wrapper',{
        children:modal_children_str
      });
      self.modal.render();
      const removeModal = self.removeModal.bind(self, res);
      setTimeout(removeModal,5000);
      self.games_played++;
    },

    addButton: function(){
      const self = this;
      const {round_no} = self;
      for(let i=1, j=1;i<=self.no_of_teams_left;i++,j++){
        const buttonElm = new Button();
        const team_1 = document.getElementById(`round_${round_no}_game_${j}_winner`);
        const team_2 = document.getElementById(`round_${round_no}_game_${j+1}_winner`);
        buttonElm.init(`#round_${round_no+1}_game_${i}_button_wrapper`,{
          id:`round_${round_no+1}_game_${i}_button`,
          class:`round_${round_no+1}_button`,
          label:'Play',
          onClick:self.handleClick.bind(self),
          team_1: {teamName:team_1.innerHTML},
          team_2: {teamName:team_2.innerHTML},
          round_no: round_no+1,
          game_no: i
        });
        j++;
        buttonElm.render();
        buttonElm.addEvents();
      }
    }

  }
  return obj;
}
