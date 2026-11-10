import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-analytics.js';

// Firebase Hosting supplies the web app configuration at runtime.
try {
  const response = await fetch('/__/firebase/init.json', { cache: 'no-store' });
  if (response.ok) {
    const app = initializeApp(await response.json());
    if (await isSupported()) getAnalytics(app);
  }
} catch {
  // The site can still run when Firebase Analytics is unavailable locally.
}
