var Button = function(){
  let obj={
    init: function(selector, props){
      const self = this;
      self.selector = selector;
      self.props = props;
    },

    render: function(){
      const self = this;
      const {selector, props} = self;
      const wrapper = document.querySelector(selector);
      const buttonStr = `<button type='button' id='${props.id}' class='btn btn-primary'>${props.label}</button>`;
      wrapper.innerHTML =  buttonStr;
    },

    handleClick:function(e){
      const self = this;
      const {props} = self;
      props.onClick(e);
      self.uodateAttribute('disabled', true);
    },

    uodateAttribute:function(key, value){
      const self = this;
      const {props} = self;
      const el = document.getElementById(props.id);
      el.setAttribute(key, value);
    },

    addEvents:function(){
      const self = this;
      const {props} = self;
      const btn_elm = document.getElementById(props.id);
      btn_elm.addEventListener('click', self.handleClick.bind(self));
    }

  };
  return obj;
}
