/**
 * @Author: Hexon
 * @Date: 2017/8/23 11:00
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/23 11:00
 */ 

$(function() {
  $.get('./../songs.json').then(function(response){
    let $latestMusic = $('.latestMusic .lists');
    let $loadingIcon = $('.latestMusic .loadingIcon');
    console.log($latestMusic);
    console.log(response);
    let items = response;
    items.forEach((item) => {
      let $li = $(`
      <li>
        <a href="./pages/song.html?id=${item.id}" class="play-circle">
          <h3>${item.name}</h3>
          <p>
          <svg class="sq">
             <use xlink:href="#icon-sq"></use>
          </svg>
          演唱者-专辑
          </p>
          <svg>
            <use xlink:href="#icon-play-circle"></use>
          </svg>
        </a>
      </li>
        `);
      $latestMusic.append($li);
    });
    $loadingIcon.hide();

  });
  /*
   <li>
   <a href="./pages/song.html" class="play-circle">
   <h3>歌曲名1</h3>
   <p>
   <svg class="sq">
   <use xlink:href="#icon-sq"></use>
   </svg>
   演唱者1-专辑1
   </p>
   <svg>
   <use xlink:href="#icon-play-circle"></use>
   </svg>
   </a></li>
   <li>
  * */
});
