var v = new Vue({
  'el' : '#app',
  'data' : {
    passwords : [],
    initialPasswordCount : 10,
    passwordLength : 30, 
    patterns : {
      complex : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@£$%^&*()_+-=09876543231;:/|[]{}?',
      alphanumeric : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz09876543231',
      letters : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      numbers : '1234567890',
    },
    key : 'complex',
    custom : 'djave',
    textcase : 'NONE',
    showcase : false
  },
  computed : {
    chars(){
      if(this.key == 'custom'){
        return this.custom;
      }
      return this.patterns[this.key];
    }
  },
  'methods' : {
    toggleCase(){
      this.showcase = ! this.showcase;
    },
    activeIf(key){
      return key == this.key ? 'active' : '';
    },
    copy(index, e){
      let input = this.$refs['input'+index][0].select();
      document.execCommand('copy');
      e.target.innerHTML = "Copied!";
      setTimeout(function(){
        e.target.innerHTML = "Copy";
      }, 800)
    },
    setChars(key){
      this.key = key;
    },
    getLetter: function(chars){
      let letter = chars[Math.floor(Math.random() * chars.length)];
      if(this.textcase == 'UPPER'){
        letter = letter.toUpperCase();
      }
      if(this.textcase == 'LOWER'){
        letter = letter.toLowerCase();
      }
      return letter;
    },
    generate(){
      var chars = this.chars.split('');
      var password = '';
      for(var i = 0; i < this.passwordLength; i ++ ){
        password += this.getLetter(chars);
      }
      return password;
    },
    remake(index){
      var newPass = this.generate();
      this.passwords.splice(index, 1, newPass);
    },
    create(){
      this.passwords.push(this.generate());
    },
    remove(index){
      this.passwords.splice(index, 1);
    },
    regenerateAll(){
      for(var j = 0; j < this.passwords.length; j ++){
        this.remake(j);
      }
    },
    generateInitial(){
      setTimeout(() => {
        if(this.initialPasswordCount >0){
          this.create();
          this.initialPasswordCount --;
          this.generateInitial();
        }
      }, 50)
    }
  },
  'mounted'(){
    var self = this;
    this.generateInitial();
  }
});