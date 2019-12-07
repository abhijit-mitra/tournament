var Card = function(){
  let obj={
    init: function(selector, data){
      const self = this;
      self.card_data= data;
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

    handleClick:function(res){
      const modal = new Modal();
      const {team_1, team_2, round_no, game_no}= res;
      let modal_children_str = '';
      modal_children_str += `<div class='row p-50'>`;
        modal_children_str += `<div class='col-md-12'>`
          modal_children_str += `<center><h1>${team_1.teamName} vs ${team_2.teamName}</h1></center>`;
          modal_children_str += `<center><h1>Playing....</h1></center>`;
        modal_children_str += `</div>`;
      modal_children_str += `</div>`;
      modal.init('.modal-wrapper',{
        children:modal_children_str
      });
      modal.render();
      setTimeout(()=>{
        modal.remove();
        let el = document.getElementById(`round_${round_no}_game_${game_no}_winner`);
        const arr = [team_1.teamName, team_2.teamName];
        const rand_value = arr[Math.floor(Math.random() * arr.length)];
        el.innerHTML = rand_value;
      },2000);
    },

    addButton: function(){
      const self = this;
      for(let i=0, j=1;i<self.card_data.length;i++, j++){
        const buttonElm = new Button();
        const cardData_1 = self.card_data[i];
        const cardData_2 = self.card_data[i+1];
        buttonElm.init(`#card_button_wrapper_${i}`,{
          id:`${cardData_1.teamId}_${cardData_2.teamId}`,
          label:'Play',
          onClick:self.handleClick,
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
