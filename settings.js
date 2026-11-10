function storedPreference(key, fallback) { try { return localStorage.getItem(`bharat2047-${key}`) ?? fallback; } catch { return fallback; } }
function savePreference(key, value) { try { localStorage.setItem(`bharat2047-${key}`, value); } catch {} }

const language = appLanguage();
document.documentElement.lang = language;
document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });

const settingsHost = document.querySelector('.top-actions') || document.querySelector('.page-header');
const settingsWrap = document.createElement('div');
settingsWrap.className = 'settings-wrap';
settingsWrap.innerHTML = `<button class="settings-trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="${t('settings')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z"/><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l1.7-1.3-1.6-2.8-2 .7a7.5 7.5 0 0 0-2.6-1.5L14.5 3h-3l-.4 2.6a7.5 7.5 0 0 0-2.6 1.5l-2-.7-1.6 2.8 1.7 1.3a7.7 7.7 0 0 0 0 3l-1.7 1.3 1.6 2.8 2-.7a7.5 7.5 0 0 0 2.6 1.5l.4 2.6h3l.4-2.6a7.5 7.5 0 0 0 2.6-1.5l2 .7 1.6-2.8-1.7-1.3Z"/></svg><span>${t('settings')}</span></button><div class="settings-popover" role="dialog" aria-label="${t('settings')}" hidden><div class="settings-heading">${t('settings')}</div><label class="setting-row"><span><b>${t('appearance')}</b><small>${t('darkMode')}</small></span><input id="darkSetting" class="setting-switch" type="checkbox"></label><label class="setting-row"><span><b>${t('wheelSound')}</b></span><input id="soundSetting" class="setting-switch" type="checkbox"></label><details class="language-setting"><summary><span><b>${t('preferredLanguage')}</b><small id="currentLanguageName"></small></span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="language-options"><label><input type="radio" name="languagePreference" value="en"><span>${t('english')}</span></label><label><input type="radio" name="languagePreference" value="hi"><span>${t('hindi')}</span></label><label><input type="radio" name="languagePreference" value="ur"><span>${t('urdu')}</span></label></div></details></div>`;
settingsHost.append(settingsWrap);

const trigger = settingsWrap.querySelector('.settings-trigger');
const popover = settingsWrap.querySelector('.settings-popover');
const darkSetting = settingsWrap.querySelector('#darkSetting');
const soundSetting = settingsWrap.querySelector('#soundSetting');
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  darkSetting.checked = dark;
  document.querySelector('meta[name="theme-color"]').content = dark ? '#000000' : (document.body.classList.contains('test-page') ? '#fff0e3' : document.body.classList.contains('learn-page') ? '#e9f5ed' : '#ffffff');
}
applyTheme(storedPreference('theme', 'light') === 'dark');
soundSetting.checked = storedPreference('sound', 'on') !== 'off';
settingsWrap.querySelector('#currentLanguageName').textContent = t(language === 'hi' ? 'hindi' : language === 'ur' ? 'urdu' : 'english');
settingsWrap.querySelector(`input[value="${language}"]`).checked = true;
trigger.addEventListener('click', () => { popover.hidden = !popover.hidden; trigger.setAttribute('aria-expanded', String(!popover.hidden)); });
document.addEventListener('pointerdown', event => { if (!settingsWrap.contains(event.target)) { popover.hidden = true; trigger.setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !popover.hidden) { popover.hidden = true; trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); } });
darkSetting.addEventListener('change', () => { savePreference('theme', darkSetting.checked ? 'dark' : 'light'); applyTheme(darkSetting.checked); });
soundSetting.addEventListener('change', () => { savePreference('sound', soundSetting.checked ? 'on' : 'off'); window.dispatchEvent(new CustomEvent('soundpreferencechange', {detail:{enabled:soundSetting.checked}})); });
settingsWrap.querySelectorAll('input[name="languagePreference"]').forEach(input => input.addEventListener('change', () => { if (input.checked) { savePreference('language', input.value); location.reload(); } }));
