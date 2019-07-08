$(document).ready(function(){
  function search() {
    $('.main').html('');
    var anime = $('#input-search').val();
    $.ajax({
      url:'https://api.jikan.moe/v3/search/anime/?q='+anime,
      type: 'get',
      dataType: 'json',
      success: function(result) {
        var anime = result.results;
        $.each(anime, function(i,data){
          var score = data.score;
          if (data.episodes > 0) {
            var eps = data.episodes;
          } else {
            var eps = '?';
          }
          if (data.airing == true) {
            var status = "Ongoing";
          } else {
            var status = "Finished";
          }
          $('.main').append(`
            <div class="col-md-4">
              <div class="card p-3 my-3">
                <img src="`+data.image_url+`" class="card-img-top cover" alt="cover" data-toggle="modal" data-target="#detail" data-id="`+data.mal_id+`">
                <div class="card-body">
                  <h5 class="card-title">`+data.title+`</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Score : `+data.score+`</h6>
                  <span class="badge badge-pill badge-primary">`+status+`</span>
                  <span class="badge badge-pill badge-danger">`+data.type+`</span>
                  <span class="badge badge-pill badge-warning">`+eps+` Eps</span>
                </div>
              </div>
            </div>
          `);
        });
      }
    });
  }
  $('#btn-search').on('click',function(){
    search();
  });
  $('#input-search').on('keyup', function(event){
    if (event.which === 13) {
      search();
    }
  });
  $('.main').on('click','.cover',function(){
    let id = $(this).data('id');
    $.ajax({
      url: 'https://api.jikan.moe/v3/anime/'+id,
      type: 'get',
      dataType: 'json',
      success: function(result) {

        $('.modal-body').html(`
          <div class="contianer-fluid">
            <img src="`+result.image_url+`" class="img-thumbnail w-100"/>
            <h3 class="text-center mt-3">`+result.title+`</h3>
            <p>`+result.synopsis+`</p>
          </div>
        `);
      }
    });
  });

});
