var Modal = function(){
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
      let modalStr = `<div class='modal d-flex justify-content-center align-items-center'>`;
              modalStr +=`<div class='box'>`;
                  modalStr += props.children;
              modalStr +=`</div>`;
          modalStr += `</div>`;
      wrapper.innerHTML =  modalStr;
    },

    remove: function(){
      const self = this;
      const wrapper = document.querySelector(self.selector);
      wrapper.innerHTML = '';
    }

  };
  return obj;
}
