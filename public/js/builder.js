/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
const checkIp = () => {
  $.ajax({
    type: 'POST',
    url: '/api/checkProxy',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success(result) {
      if (result.success) {
        if (result.proxyLive) {
          $('#proxyCurrent').text(result.proxy);
          $('#proxyCheckLive').addClass('badge-success');
        } else {
          $('#proxyCheckLive').addClass('badge-danger');
        }
      }
    },
  });
};

const restartPm2 = () => new Promise((resolve, reject) => {
  $.ajax({
    type: 'GET',
    url: '/pm2/restartSock5',
    success(result) {
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    },
  });
});

const changeIp = async () => {
  $.notify('Processing ....', 'info');
  const buttonDefaultText = $('#changeSock5Builder').text();
  const buttonElement = $('#changeSock5Builder');
  $(buttonElement).html('<i class="fa fa-spinner fa-spin" style="font-size:20px"></i> Processing...');
  $(buttonElement).prop('disabled', true);
  let ip = null;
  while (true) {
    try {
      const result = await restartPm2();
      $(buttonElement).removeClass('btn-danger');
      $('#proxyCheckLive').removeClass('badge-danger');
      $(buttonElement).addClass('btn-success');
      $('#proxyCheckLive').addClass('badge-success');
      $.notify(result.msg, 'success');
      $('#proxyCurrent').text(result.proxy);
      ip = result.proxy;
      break;
    } catch (result) {
      $(buttonElement).removeClass('btn-success');
      $('#proxyCheckLive').removeClass('badge-success');
      $(buttonElement).addClass('btn-danger');
      $('#proxyCheckLive').addClass('badge-danger');
      $.notify(result.msg, 'error');
    }
  }

  $(buttonElement).removeAttr('disabled');
  $(buttonElement).html(buttonDefaultText);
  return ip;
};

const runAutoBuild = () => {

};
$(document).ready(() => {
  $('.loading').fadeOut('fast');
  checkIp();

  $('#changeSock5Builder').click(changeIp);
  $('#runAutoBuild').click(runAutoBuild);
});
