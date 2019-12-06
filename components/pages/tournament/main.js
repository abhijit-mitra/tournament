let Tournament = function(){
  let obj={
    init: function(selector){
      let self = this;
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
    let cardView = new Card();
    cardView.init(selector, team_data);
    },

  render_rounds:function(selector){
    let self = this;
    let number_of_rounds = 0;
    let total_no_of_teams = team_data.length;
    while(total_no_of_teams>1){
        total_no_of_teams = total_no_of_teams/2;
        number_of_rounds++;
      }
    let rounds_elm = '';
    let wrapper = document.querySelector(selector);
    for(let i=1;i<=number_of_rounds;i++){
        self.append_rounds(wrapper, i);
      }

    },
    append_rounds:function(referenceNode, round_no){
      let test = document.getElementById('card_wrapper');
      let height = test.getBoundingClientRect().height;
      let rounds_elm = document.createElement('div')
      rounds_elm.setAttribute('id','Round_'+round_no);
      rounds_elm.setAttribute('class','col-md-2');
      let current_round_str = '';
        current_round_str+= '<h4>Round '+round_no+'</h4>';
        current_round_str+= '<div id="round_"'+round_no+'_pointer>'
          current_round_str+= '<div class="horizontal-line" style="top:'+(height/2)+'px"></div>'
          current_round_str+= '<div class="vertical-line" style="top:'+(height/2)+'px; height:'+height+'px"></div>'
          current_round_str+= '<div class="horizontal-line" style="top:'+(height/2)+'px"></div>'
        current_round_str+='</div>';
      rounds_elm.innerHTML = current_round_str;
      referenceNode.parentNode.insertBefore(rounds_elm, referenceNode.nextSibling);
    }

  }
  return obj;
}
