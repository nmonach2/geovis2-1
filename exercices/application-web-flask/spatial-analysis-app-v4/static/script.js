function main() {
  $('body').append('<p>Bienvenue sur notre site.</p>');
  window.setTimeout(function(){
    $('body').append('<p>Vous êtes toujours là?</p>');
  }, 2000);
}

$(main);