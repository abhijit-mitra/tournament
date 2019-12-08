var Card = function(){
  let obj={
    init: function(selector, {data, round_no, onRoundComplete}){
      const self = this;
      self.card_data= data;
      self.total_no_of_games = data.length/2;
      self.games_played = 0;
      self.round_no = round_no;
      self.onRoundComplete = onRoundComplete;
      self.render(selector);
      self.addButton();
    },

    render: function(selector){
      const self = this;
      let cardWrapper = document.querySelector(selector);
      let cards = '';
      for(let i=0, j=1;i<self.card_data.length;i++,j++){
        let cardData_1 = self.card_data[i];
        let cardData_2 = self.card_data[i+1];
        let card = '<div id="card_wrapper" class="row card_wrapper border p-10">';
                card+='<div id=card'+cardData_1.teamId+' class="col-md-12">'
                  card+= cardData_1.teamName;
                card+='</div>';
                card+='<div id=card'+cardData_2.teamId+' class="col-md-12">'
                  card+=cardData_2.teamName;
                card+='</div>';
                card+=`<div class='col-md-12'>`;
                card+=`<center id='card_button_wrapper_${i}'></center>`
                card+= `</div>`;
            card+='</div>';
        i++;
        cards = cards.concat(card)
      }
      cardWrapper.innerHTML =  cards;
    },

    removeModal:function(res){
      const self = this;
      const {team_1, team_2, round_no, game_no}= res;
      let el = document.getElementById(`round_${round_no}_game_${game_no}_winner`);
      const arr = [team_1.teamName, team_2.teamName];
      const rand_value = arr[Math.floor(Math.random() * arr.length)];
      let status_elm = document.getElementById('game_status');
      status_elm.innerHTML =  `Winner is ${rand_value}`;
      el.innerHTML = rand_value;
      if(self.games_played === self.total_no_of_games){
        self.onRoundComplete(round_no);
      }
      setTimeout(()=>{
        self.modal.remove();
      },1000);
    },

    handleClick:function(res){
      const self = this;
      self.modal = new Modal();
      const {team_1, team_2, round_no, game_no}= res;
      let modal_children_str = '';
      modal_children_str += `<div class='row p-50'>`;
        modal_children_str += `<div class='col-md-12'>`
          modal_children_str += `<center><h5>${team_1.teamName} vs ${team_2.teamName}</h5></center>`;
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
      for(let i=0, j=1;i<self.card_data.length;i++, j++){
        const buttonElm = new Button();
        const cardData_1 = self.card_data[i];
        const cardData_2 = self.card_data[i+1];
        buttonElm.init(`#card_button_wrapper_${i}`,{
          id:`${cardData_1.teamId}_${cardData_2.teamId}`,
          class:`round_${self.round_no}_button`,
          label:'Play',
          onClick:self.handleClick.bind(this),
          team_1: cardData_1,
          team_2: cardData_2,
          round_no: 1,
          game_no: j
        });
        buttonElm.render();
        buttonElm.addEvents();
        i++;
      }
    }
  };
  return obj;
}
