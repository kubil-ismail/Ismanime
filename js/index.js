$(document).ready(function(){
  $.ajax({
    url: 'https://api.jikan.moe/v3/season/2019/summer',
    type: 'get',
    dataType: 'json',
    success: function(result) {
      var anime = result.anime;
      var tahun = result.season_year;
      $.each(anime, function(i,data){
        var gendre = data.genres[0];
        var score = data.score;
        if (data.episodes > 0) {
          var eps = data.episodes;
        } else {
          var eps = '?';
        }
        $('.main').append(`
          <div class="col-md-4">
            <div class="card p-3 my-3">
              <img src="`+data.image_url+`" class="card-img-top cover" alt="cover" data-toggle="modal" data-target="#detail" data-id="`+data.mal_id+`">
              <div class="card-body">
                <h5 class="card-title">`+data.title+`</h5>
                <h6 class="card-subtitle mb-2 text-muted">Score : `+score+`</h6>
                <span class="badge badge-pill badge-primary">`+tahun+`</span>
                <span class="badge badge-pill badge-danger">`+gendre.name+`</span>
                <span class="badge badge-pill badge-warning">`+eps+` Eps</span>
              </div>
            </div>
          </div>
        `);
      });
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
