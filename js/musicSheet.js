/**
 * @Author: Hexon
 * @Date: 2017/8/24 19:22
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/24 19:22
 */


function dispSheetInfo(info) {
  // header 部分
  let num = parseInt(info.fans);
  let fansNum = num < 100000 ? info.fans : ((num / 10000).toFixed(1) + '万');
  $('.header > .sheetImgWrap > img').attr('src', info.sheetImg);
  $('.header > .sheetImgWrap > .fans > .num').text(fansNum) ;
  $('.header > .headerTitle > h3').text(info.title);
  $('.header > .headerTitle > .author > span').text(info.author) ;
  $('.header > .headerTitle > .author > img').attr('src',  info.authorPhoto) ;

  let $briefInfo = $('.sheetIntro .birefIntro');
  // 简介部分
  info.flag.forEach((item) => {
    let $flag = $(`
        <span class="flag">${item}</span>
    `);
    $briefInfo.append($flag);
  });
  // 歌单介绍
  let $intro = $('.sheetIntro .intro');
  let introArr = info.intro.split('\n');
  introArr.forEach((item) => {
    if (item.length > 0) {
      let $p = $(`
        <p>${item}</p>
    `);
      $intro.append($p);
    }
  })
}


function dispMusicList(musicList) {
  let $items = $('.musicList > .items');
  musicList.forEach((d, index) => {
    let $li = $(`
          <li>
            <a href="../pages/song.html?id=${d.id}" class="play-circle">
              <span class="listNo">${index + 1}</span>
              <div class="musicBrief">
                <h3>${d.name}</h3>
                <p>
                  <svg class="sq">
                    <use xlink:href="#icon-sq"></use>
                  </svg>
                  演唱者-专辑
                </p>
              </div>
              <svg>
                <use xlink:href="#icon-play-circle"></use>
              </svg>
            </a>
          </li>
        `);
    $items.append($li);
  });
}


$(function(){
  console.log('hhh')
  $.get('./../musicSheet.json').then(function(response) {
    dispSheetInfo(response.musicInfo);
    dispMusicList(response.musicList);

  })
});
