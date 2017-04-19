$(function() {

  function getThing(data) {
    for (let i of data) {
      const id = i.category.replace(/\s/, `-`).toLowerCase();
      let bg = ``;
      if (i.image) bg = ` style="background-image: url('images/${i.image}')"`;
      $(`#intro`).append(`<a id="${id}-btn" class="btn">${i.category}`);
      $(`#things`).append(`<article id="${id}" class="hidden">`);
      $(`#${id}`).append(`<section${bg}><h2>${i.name}`)
        .append(`<section><p>${i.description}`);
    }
  }

  function button() {
    $(`a`).filter(function() {
      return this.id.match(/\w+\-btn/);
    }).click(function() {
      const target = this.id.replace(/(\w)\-btn/, `$1`),
        $target = $(`#${target}`);
      $(this).toggleClass(`active`).siblings().removeClass(`active`);
      $target.parent().fadeOut(200, function() {
        $target.toggleClass(`hidden`).siblings().addClass(`hidden`);
      }).fadeIn(400);
    });
  }

  $.getJSON(`things.json`, function(data) {
    getThing(data);
    button();
  });

  const $overlay = $(`#overlay`);
  $(`#open, #esc`).click(function() {
    $overlay.toggleClass(`hidden`);
  });
  $(document).on(`keydown`, function(event) {
    if ((event.keyCode === 27) && (!$overlay.hasClass(`hidden`))) {
      $overlay.addClass(`hidden`);
    }
  });
});
