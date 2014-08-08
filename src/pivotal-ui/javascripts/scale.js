$(document).ready(function() {
  $('#instances-1, #instances-4, #instances-6, #instances-8').hover(function() {
    $('.scale-code span:last-of-type').text($(this).children('path').length/3);
    $('#instances-1').get(0).classList.remove('selected-group');
    $('#instances-4').get(0).classList.remove('selected-group');
    $('#instances-6').get(0).classList.remove('selected-group');
    $('#instances-8').get(0).classList.remove('selected-group');
    $(this).get(0).classList.add('selected-group');
  });
});
