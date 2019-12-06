let Tournament = function(){
  let obj={
    init: function(selector){
      let self = this;
      self.total_no_of_teams = team_data.length;
      self.no_of_teams_left = team_data.length;
      self.render(selector)
      self.render_teamList('.team_list')
      self.render_rounds('.Teams')
    },

    render: function(selector){
      let self = this;
      let wrapper = document.querySelector(selector);
      let shell = '<div class="tournament row">';
            shell+= '<div class="Teams col-md-2">';
              shell+= '<h4>Teams</h4>';
              shell+= '<div class="team_list"></div>';
            shell+='</div>';
          shell+='</div>';
      wrapper.innerHTML =  shell;
    },

  render_teamList: function(selector){
    let self = this;
    let cardView = new Card();
    cardView.init(selector, team_data);
    self.no_of_teams_left = self.total_no_of_teams/2;
    },

  render_rounds:function(selector){
    let self = this;
    let number_of_rounds = 0;
    let total_no_of_teams = self.total_no_of_teams ;
    while(total_no_of_teams>1){
        total_no_of_teams = total_no_of_teams/2;
        number_of_rounds++;
      }
    let rounds_elm = '';
    let wrapper = document.querySelector(selector);
    for(let i=1;i<=number_of_rounds;i++){
        if(i>1){
          wrapper = document.querySelector('#Round_'+(i-1));
        }
        self.append_rounds(wrapper, i);
      }

    },
    append_rounds:function(referenceNode, round_no){
      let self = this;
      let test = null;
      if(round_no===1){
        test = document.getElementById('card_wrapper');
      }else{
        test = document.getElementById('round_'+(round_no-1)+'_pointer_'+1);
      }
      const height = test.getBoundingClientRect().height;
      const top = height/2;
      let rounds_elm = document.createElement('div');
      rounds_elm.setAttribute('id','Round_'+round_no);
      rounds_elm.setAttribute('class','col-md-2');
      self.no_of_teams_left = self.no_of_teams_left/2;
      let current_round_str = '';
        current_round_str+= '<h4>Round '+round_no+'</h4>';
        for(var i=1; i<=self.no_of_teams_left;i++){
          current_round_str+= '<div id="round_'+round_no+'_pointer_'+i+'" class="relative" style="height:'+(height*2)+'px">'
            current_round_str+='<div class="absolute" style="top:'+(top-22)+'px">Winner</div>'
            current_round_str+= '<div class="horizontal-line" style="top:'+top+'px"></div>'
            current_round_str+= '<div class="vertical-line" style="top:'+top+'px; height:'+(height)+'px"></div>'
            current_round_str+= '<div class="horizontal-line" style="top:'+top+'px"></div>'
            current_round_str+='<div class="absolute" style="top:'+(top+height+4)+'px">Winner</div>'
          current_round_str+='</div>';
        }
      rounds_elm.innerHTML = current_round_str;
      referenceNode.parentNode.insertBefore(rounds_elm, referenceNode.nextSibling);
    }

  }
  return obj;
}
