window.FBM = {
  activeConversationIndex: function() {
    var element = document.evaluate('//li[contains(@class, " ")]', document).iterateNext();
    return Array.prototype.indexOf.call(element.parentNode.children, element) + 1;
  },
  
  setActiveConversation: function(index) {
    document.querySelector('li:nth-child(' + index + ') > [data-reactid]:first-child').click();
  },
  
  nextConversation: function() {
    this.setActiveConversation(this.activeConversationIndex() + 1);
  },
    
  previousConversation: function() {
    this.setActiveConversation(this.activeConversationIndex() - 1);
  },
    
  toggleSettings: function() {
    // Settings dialog
    if (document.evaluate('//div[@role="dialog"]//span[text()="Settings"]', document).iterateNext()) {
      // 'Done' link
      document.evaluate('//div[@role="dialog"]//*[@type="primary"][text()="Done"]', document).iterateNext().click();
    } else {
      // cog icon
      document.querySelector('a[title="Settings, privacy policy, help and more"]').click();
      // 'Settings' link
      document.evaluate('//div[contains(@class, "uiContextualLayer")]//a[text()="Settings"]', document).iterateNext().click();
    }
  },
  
  focusSearchField: function() {
    document.querySelector('input[placeholder~="Search"]').focus();
  },
  
  focusComposerField: function() {
    document.querySelector('div[contenteditable="true"]').focus();
  },
  
  showMaintenanceMessage: function() {
    document.body.innerText = '';
    
    var e = document.createElement('p');
    document.body.appendChild(e);
    e.innerText = 'Oh noes. It appears Messenger.com is down for maintenance. Please try again later.';
    
    var s = e.style;
    s.font = '18px helvetica-light';
    s.lineHeight = '27px';
    s.color = '#999';
    s.margin = '0 auto';
    s.width = '50%';
    s.textAlign = 'center';
    s.margin = '0 auto';
    s.marginTop = '100px';
    s.marginBottom = '30px';
    s.width = '235px';
    s.height = '235px';
    s.paddingTop = '250px';
    s.backgroundRepeat = 'no-repeat';
    s.backgroundPosition = 'top center';
    s.backgroundImage = 'url(' + this.images['background'] + ')';
  },
  
  showOfflineMessage: function() {
    document.body.innerText = '';
    
    var e = document.createElement('p');
    document.body.appendChild(e);
    e.innerText = 'Oh snap. It looks like your connection is offline, please try again later.';
    
    var s = e.style;
    s.font = '18px helvetica-light';
    s.lineHeight = '27px';
    s.color = '#999';
    s.margin = '0 auto';
    s.width = '50%';
    s.textAlign = 'center';
    s.margin = '0 auto';
    s.marginTop = '100px';
    s.marginBottom = '30px';
    s.width = '235px';
    s.height = '235px';
    s.paddingTop = '250px';
    s.backgroundRepeat = 'no-repeat';
    s.backgroundPosition = 'top center';
    s.backgroundImage = 'url(' + this.images['background'] + ')';
  },
  
  loadImage: function(name, data) {
    if (this.images == undefined) {
      this.images = {};
    }
    
    this.images[name] = data;
  }
};
