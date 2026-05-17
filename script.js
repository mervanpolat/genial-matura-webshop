
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
    });
  }

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieChoice = localStorage.getItem('genialMaturaCookieChoice');
  if(cookieBanner && !cookieChoice){ cookieBanner.hidden = false; }
  function setCookieChoice(choice){
    localStorage.setItem('genialMaturaCookieChoice', choice);
    if(cookieBanner){ cookieBanner.hidden = true; }
  }
  document.getElementById('accept-cookies')?.addEventListener('click', () => setCookieChoice('all'));
  document.getElementById('decline-cookies')?.addEventListener('click', () => setCookieChoice('necessary'));

  const plans = {
    free: ['Genial Matura Free', '0 €'],
    pro: ['Genial Matura Pro-Abo', '8,90 € / Monat'],
    sql: ['Matura-Basispaket', '24 € einmalig']
  };
  const params = new URLSearchParams(window.location.search);
  const planKey = params.get('plan') || 'pro';
  if(document.getElementById('selected-plan')){
    const [name, price] = plans[planKey] || plans.pro;
    document.getElementById('selected-plan').textContent = 'Gewähltes Produkt: ' + name;
    document.getElementById('selected-price').textContent = price;
  }

  function setError(id, message){
    const el = document.getElementById(id + '-error');
    const field = document.getElementById(id);
    if(el) el.textContent = message || '';
    if(field){
      if(message){ field.setAttribute('aria-invalid','true'); }
      else { field.removeAttribute('aria-invalid'); }
    }
  }
  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  const checkout = document.getElementById('checkout-form');
  if(checkout){
    checkout.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const address = document.getElementById('address').value.trim();
      const terms = document.getElementById('terms').checked;
      setError('name', name ? '' : 'Bitte gib deinen Namen ein.'); ok = ok && !!name;
      setError('email', validEmail(email) ? '' : 'Bitte gib eine gültige E-Mail-Adresse ein.'); ok = ok && validEmail(email);
      setError('address', address ? '' : 'Bitte gib eine Rechnungsadresse ein.'); ok = ok && !!address;
      const termsError = document.getElementById('terms-error');
      if(termsError) termsError.textContent = terms ? '' : 'Bitte akzeptiere die Lizenzbedingungen.';
      ok = ok && terms;
      const status = document.getElementById('form-status');
      if(status){ status.textContent = ok ? 'Bestellung erfolgreich simuliert. Es wurde nichts versendet und nichts bezahlt.' : 'Bitte korrigiere die markierten Felder.'; }
    });
  }

  const contact = document.getElementById('contact-form');
  if(contact){
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('message').value.trim();
      const privacy = document.getElementById('privacy-contact').checked;
      const errors = {
        'contact-name': name ? '' : 'Bitte gib deinen Namen ein.',
        'contact-email': validEmail(email) ? '' : 'Bitte gib eine gültige E-Mail-Adresse ein.',
        'message': msg ? '' : 'Bitte gib eine Nachricht ein.'
      };
      for(const [id, message] of Object.entries(errors)){ setError(id, message); ok = ok && !message; }
      const privacyError = document.getElementById('privacy-contact-error');
      if(privacyError) privacyError.textContent = privacy ? '' : 'Bitte bestätige die Datenschutzerklärung.';
      ok = ok && privacy;
      const status = document.getElementById('contact-status');
      if(status){ status.textContent = ok ? 'Nachricht erfolgreich simuliert. Es wurden keine Daten übertragen.' : 'Bitte korrigiere die markierten Felder.'; }
    });
  }
})();
