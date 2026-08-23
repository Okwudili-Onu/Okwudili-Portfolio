// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is tapped (mobile)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form handling (Formspree)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        var note = form.querySelector('.form-status');
        if (note) {
          note.textContent = 'Contact form isn\'t connected yet — reach out via email or phone above in the meantime.';
          note.style.color = '#c0392b';
        }
        return;
      }

      e.preventDefault();
      var status = form.querySelector('.form-status');
      var data = new FormData(form);

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Thanks for reaching out — I\'ll get back to you soon.';
            status.style.color = '#2FA88C';
          }
        } else {
          if (status) {
            status.textContent = 'Something went wrong. Please email me directly instead.';
            status.style.color = '#c0392b';
          }
        }
      }).catch(function () {
        if (status) {
          status.textContent = 'Something went wrong. Please email me directly instead.';
          status.style.color = '#c0392b';
        }
      });
    });
  }
});
