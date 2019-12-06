var Card = function(){
  var obj={
    init: function(selector, data=[]){
      var self = this;
      self.card_data= data;
      self.render(selector);
    },

    render: function(selector){
      var self = this;
      var cardWrapper = document.querySelector(selector);
      var cards = '';
      for(var i=0;i<self.card_data.length;i++){
        var cardData_1 = self.card_data[i];
        var cardData_2 = self.card_data[i+1];
        var card = '<div id="card_wrapper" class="row border p-10">';
                card+='<div id=card'+cardData_1.teamId+' class="col-md-12">'
                  card+= cardData_1.teamName;
                card+='</div>';
                card+='<div id=card'+cardData_2.teamId+' class="col-md-12">'
                  card+=cardData_2.teamName;
                card+='</div>';
            card+='</div>';
        i++;
        cards = cards.concat(card)
      }
      cardWrapper.innerHTML =  cards;
    },
  };
  return obj;
}
