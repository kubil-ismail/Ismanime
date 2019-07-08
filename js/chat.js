$('.group-closed').click(function(){
  $('.box-chat').removeClass('d-md-block');
  $('.box-show').addClass('d-md-block');
});
$('.group-show').click(function(){
  $('.box-show').removeClass('d-md-block');
  $('.box-chat').addClass('d-md-block');
});
