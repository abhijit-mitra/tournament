var Button = function(){
  let obj={
    init: function(selector, props){
      const self = this;
      self.render(selector, props);
      self.addEvents(props);
    },

    render: function(selector, props){
      const self = this;
      const wrapper = document.querySelector(selector);
      const buttonStr = `<button type='button' id='${props.id}' class='btn btn-primary'>${props.label}</button>`;
      wrapper.innerHTML =  buttonStr;
    },

    addEvents:function(props){
      const btn_elm = document.getElementById(props.id);
      btn_elm.addEventListener('click', props.onClick);
    }

  };
  return obj;
}
