let Tournament = function(){
  let obj={
    init: function(selector){
      let self = this;
      self.total_no_of_teams = team_data.length;
      self.no_of_teams_left = team_data.length;
      self.rounds = {};
      self.render(selector)
      self.render_teamList('.team_list')
      self.render_rounds('.Teams')
    },

    render: function(selector){
      let self = this;
      let wrapper = document.querySelector(selector);
      let shell = '<div class="tournament row">';
            shell+= '<div class="Teams col-md-2">';
              shell+= '<h4>Group Battle</h4>';
              shell+= '<div class="team_list"></div>';
            shell+='</div>';
          shell+='</div>';
      wrapper.innerHTML =  shell;
    },

  render_teamList: function(selector){
    let self = this;
    let cardView = new Card();
    cardView.init(selector, {
      data:team_data,
      round_no:1,
      onRoundComplete: self.onRoundComplete.bind(self)
    });
    self.no_of_teams_left = self.no_of_teams_left/2;
    },

  onRoundComplete: function(round_no){
    let self = this;
    if(round_no === Object.keys(self.rounds).length){
      return;
    }
    self.rounds[round_no].addButton();
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
        const round_manager = Round();
        self.no_of_teams_left = self.no_of_teams_left/2;
        round_manager.init(self.no_of_teams_left, i, self.onRoundComplete.bind(self));
        round_manager.append_rounds(wrapper);
        self.rounds[i]= round_manager;
      }

    }

  }
  return obj;
}
