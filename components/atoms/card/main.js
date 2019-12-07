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
      for(let i=0;i<self.card_data.length;i++){
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

    handleClick:function(e){
      console.log(e.target.id);
    },

    addButton: function(){
      const self = this;
      for(let i=0;i<self.card_data.length;i++){
        const buttonElm = new Button();
        buttonElm.init(`#card_button_wrapper_${i}`,{
          id:`card_button_${i}`,
          label:'Play',
          onClick:self.handleClick,
        });
        i++;
      }
    }
  };
  return obj;
}
