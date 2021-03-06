//  REACTIONS
var reactions = [
{
  name: 'Bad',
  mouth: 'M17,73c-3.3-18,22.8-14.7,31,0',
  leftEye: 'M15,58c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1s-1,0.4-1,1C14,57.6,14.4,58,15,58',
  rightEye: 'M25,55c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1s-1,0.4-1,1C24,54.6,24.4,55,25,55' },
{
  name: 'Unhappy',
  mouth: 'M12,57c15.8-10.5,35.8-12.8,60-7',
  leftEye: 'M22,41c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C20,40.1,20.9,41,22,41',
  rightEye: 'M55,39c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C53,38.1,53.9,39,55,39' },
{
  name: 'Natural',
  mouth: 'M12,51c20-2.3,40-4.6,60-7',
  leftEye: 'M17,39c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C15,38.1,15.9,39,17,39',
  rightEye: 'M59,37c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C57,36.1,57.9,37,59,37' },
{
  name: 'Satisfied',
  mouth: 'M12,43c23.6,6.9,43.6,4.6,60-7',
  leftEye: 'M12,32c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,31.1,10.9,32,12,32',
  rightEye: 'M60,32c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C58,31.1,58.9,32,60,32' },
{
  name: 'Amazed',
  mouth: 'M12,45c10.9,29.4,48.7,26.7,60-15',
  leftEye: 'M14,25c1.1,0,2-2.2,2-5c0-2.8-0.9-5-2-5s-2,2.2-2,5C12,22.8,12.9,25,14,25',
  rightEye: 'M62,29c1.1,0,2-2.2,2-5c0-2.8-0.9-5-2-5s-2,2.2-2,5C60,26.8,60.9,29,62,29' }];



//  CHANGE REACTIONS
function changeReactions(value) {
  var reaction = this.reactions[value - 1];
  var mouth = $('#nucubuc .mouth');
  var leftEye = $('#nucubuc .leftEye');
  var rightEye = $('#nucubuc .rightEye');

  function createAnimation(obj, to) {
    var animate = obj.find('animate');
    animate.attr({
      from: obj.attr('d'),
      to: to });

    animate[0].beginElement();
    obj.attr('d', to);
  }

  createAnimation(mouth, reaction.mouth);
  createAnimation(leftEye, reaction.leftEye);
  createAnimation(rightEye, reaction.rightEye);
}


//  DOCUMENT READY
$(document).ready(function () {

  //  SPANS
  var paragraphs = $('.spans');

  for (i = 0; i < paragraphs.length; i++) {
    var paragraph = $(paragraphs[i]);
    var spans = paragraph.text().split(' ');
    paragraph.empty();

    $.each(spans, function (i, span) {
      paragraph.append($('<span>').text(span));
    });
  }


  //  RANGE
  var range = $('.range');

  //  CHANGE RANGE FUNCTION
  function changeRange(that, init) {
    var input, current, labels;

    input = $(that);
    if (init == true) input = $(that).find('input[type=range]');

    current = input.val();
    labels = input.siblings('ul');

    labels.children().removeClass('current');
    labels.children(':nth-child(' + current + ')').addClass('current');
  }

  //  SET LISTENERS
  range.find('input[type=range]').on('change', function () {
    changeRange(this, false);
    changeReactions($(this).val());
  });

  // FAKE LOADER
  setTimeout(function () {
    $('#question').addClass('current');
    changeReactions($('#questions > li[data-name="feeling"] input').val());
  }, 1000);
  setTimeout(function () {
    for (i = 0; i < range.length; i++) {
      changeRange(range[i], true);
    }
  }, 1150);
});