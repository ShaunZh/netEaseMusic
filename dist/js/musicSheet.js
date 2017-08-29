"use strict";function dispSheetInfo(n){var e=parseInt(n.fans),s=e<1e5?n.fans:(e/1e4).toFixed(1)+"万";$(".header > .sheetImgWrap > img").attr("src",n.sheetImg),$(".header > .sheetImgWrap > .fans > .num").text(s),$(".header > .headerTitle > h3").text(n.title),$(".header > .headerTitle > .author > span").text(n.author),$(".header > .headerTitle > .author > img").attr("src",n.authorPhoto);var t=$(".sheetIntro .birefIntro");n.flag.forEach(function(n){var e=$('\n        <span class="flag">'+n+"</span>\n    ");t.append(e)});var a=$(".sheetIntro .intro");n.intro.split("\n").forEach(function(n){if(n.length>0){var e=$("\n        <p>"+n+"</p>\n    ");a.append(e)}})}function dispMusicList(n){var e=$(".musicList > .items");n.forEach(function(n,s){var t=$('\n          <li>\n            <a href="../pages/song.html?id='+n.id+'" class="play-circle">\n              <span class="listNo">'+(s+1)+'</span>\n              <div class="musicBrief">\n                <h3>'+n.name+'</h3>\n                <p>\n                  <svg class="sq">\n                    <use xlink:href="#icon-sq"></use>\n                  </svg>\n                  演唱者-专辑\n                </p>\n              </div>\n              <svg>\n                <use xlink:href="#icon-play-circle"></use>\n              </svg>\n            </a>\n          </li>\n        ');e.append(t)})}$(function(){console.log("hhh"),$.get("./../musicSheet.json").then(function(n){dispSheetInfo(n.musicInfo),dispMusicList(n.musicList)})});