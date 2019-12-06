var Shell = function(){
  var obj={
    init: function(selector){
      var self = this;
      self.render(selector)
      self.renderTournament('.shell')
    },
    render: function(selector){
      var self = this;
      var wrapper = document.querySelector(selector);
      var shell = '<div class="shell border p-50">';
          shell+='</div>';
      wrapper.innerHTML =  shell;
    },
    renderTournament:function(selector){
      var self = this;
      var tournament = new Tournament();
      tournament.init(selector);
    }
  };
  return obj;
};
