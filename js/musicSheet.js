/**
 * @Author: Hexon
 * @Date: 2017/8/24 19:22
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/24 19:22
 */

$(function(){
  $.get('../musicSheet.json').then((response) => {
    console.log(response);
  })

});
