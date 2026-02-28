// ParkSmart - main.js (jQuery)
$(document).ready(function () {

  // ===== NAVBAR SCROLL =====
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 30) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // ===== MOBILE MENU =====
  $('.hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.mobile-nav').toggleClass('open');
  });

  $('.mobile-nav a').on('click', function () {
    $('.hamburger').removeClass('open');
    $('.mobile-nav').removeClass('open');
  });

  // ===== ACTIVE NAV LINK =====
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (!currentPage || currentPage === '') currentPage = 'index.html';
  $('.nav-links a, .mobile-nav a').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage) {
      $(this).addClass('active');
    }
  });

  // ===== FADE UP ANIMATION =====
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
        }
      });
    }, { threshold: 0.1 });

    $('.fade-up').each(function () {
      observer.observe(this);
    });
  } else {
    $('.fade-up').addClass('visible');
  }

  // ===== SMOOTH SCROLL =====
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 90 }, 600);
    }
  });

  // ===== SCANNER =====
  var scanning = false;
  $('#startScanBtn').on('click', function () {
    if (scanning) return;
    scanning = true;
    $(this).text('Scanning...').prop('disabled', true);

    setTimeout(function () {
      var plates = ['ABC 1234', 'XYZ 5678', 'DEF 9012', 'GHI 3456', 'JKL 7890'];
      var randomPlate = plates[Math.floor(Math.random() * plates.length)];
      $('#scanResult').html(
        '<div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:10px;padding:20px;text-align:center;color:#15803d;">' +
        '<div style="font-size:32px;margin-bottom:8px;">✅</div>' +
        '<div style="font-weight:700;font-size:20px;letter-spacing:2px;">' + randomPlate + '</div>' +
        '<div style="font-size:13px;margin-top:6px;color:#16a34a;">Vehicle Recognized — Slot B-07 Assigned</div>' +
        '</div>'
      ).hide().fadeIn(400);
      $('#startScanBtn').text('Scan Again').prop('disabled', false);
      scanning = false;
    }, 2500);
  });

  // ===== CONTACT FORM =====
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var btn = $(this).find('.btn');
    btn.text('Sending...').prop('disabled', true);
    setTimeout(function () {
      btn.text('Send Message').prop('disabled', false);
      $('#contactForm')[0].reset();
      $('.form-success').fadeIn(400);
      setTimeout(function () { $('.form-success').fadeOut(400); }, 4000);
    }, 1500);
  });

  // ===== RESERVATION FORM =====
  $('#reservationForm').on('submit', function (e) {
    e.preventDefault();
    var btn = $(this).find('.btn');
    var plate = $('#resPlate').val();
    var lot = $('#resLot').val();
    var date = $('#resDate').val();
    var time = $('#resTime').val();
    btn.text('Processing...').prop('disabled', true);
    setTimeout(function () {
      btn.text('Reserve Slot').prop('disabled', false);
      $('#reservationForm')[0].reset();
      var html = '<div class="res-card fade-up visible">' +
        '<div class="res-card-info"><h4>' + plate.toUpperCase() + '</h4>' +
        '<p>' + lot + ' &middot; ' + date + ' at ' + time + '</p></div>' +
        '<span class="status-badge pending">⏳ Pending</span></div>';
      $('#myReservations').prepend(html);
    }, 1500);
  });

  // ===== AUTH TABS =====
  $('.auth-tab').on('click', function () {
    var tab = $(this).data('tab');
    $('.auth-tab').removeClass('active');
    $(this).addClass('active');
    $('.auth-form').removeClass('active');
    $('#' + tab + 'Form').addClass('active');
  });

  $('#loginFormEl').on('submit', function (e) {
    e.preventDefault();
    var btn = $(this).find('.btn');
    btn.text('Signing in...').prop('disabled', true);
    setTimeout(function () { window.location.href = 'index.html'; }, 1200);
  });

  $('#signupFormEl').on('submit', function (e) {
    e.preventDefault();
    var btn = $(this).find('.btn');
    btn.text('Creating Account...').prop('disabled', true);
    setTimeout(function () {
      btn.text('Create Account').prop('disabled', false);
      alert('Account created successfully! Please login.');
      $('.auth-tab[data-tab="login"]').click();
    }, 1500);
  });

  // ===== LOG FILTER =====
  $('#logSearch').on('input', function () {
    var q = $(this).val().toLowerCase();
    $('tbody tr').each(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(q) > -1);
    });
  });

  $('#logStatus').on('change', function () {
    var val = $(this).val();
    $('tbody tr').each(function () {
      if (!val) { $(this).show(); }
      else { $(this).toggle($(this).find('.status-badge').hasClass(val)); }
    });
  });

});