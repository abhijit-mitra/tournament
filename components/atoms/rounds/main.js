let Round = function(){
  let obj={
    init: function(no_of_teams_left){
      let self = this;
      self.no_of_teams_left = no_of_teams_left;
    },
    append_rounds:function(referenceNode, round_no){
      let self = this;
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
      rounds_elm.setAttribute('class','col-md-2');
      self.no_of_teams_left = self.no_of_teams_left/2;
      let current_round_str = '';
        current_round_str+= `<h4>Round ${round_no+1}</h4>`;
        for(let i=1, j=1; i<=self.no_of_teams_left;i++, j++){
          current_round_str+= `<div id='round_${round_no}_pointer_${i}' class='relative' style='height:${height*2}px'>`
            current_round_str+=`<div id='round_${round_no}_game_${j}_winner' class='absolute' style='top:${top-22}px'>Winner</div>`
            current_round_str+= `<div class='horizontal-line' style='top:${top}px'></div>`
            current_round_str+= '<div class="vertical-line" style="top:'+top+'px; height:'+(height)+'px"></div>'
            current_round_str+= '<div class="horizontal-line" style="top:'+top+'px"></div>';
            j++;
            current_round_str+=`<div id='round_${round_no}_game_${j}_winner' class='absolute' style='top:${top+height+4}px'>Winner</div>`
          current_round_str+='</div>';
        }
      rounds_elm.innerHTML = current_round_str;
      referenceNode.parentNode.insertBefore(rounds_elm, referenceNode.nextSibling);
    }

  }
  return obj;
}
