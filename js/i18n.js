/* ── Boomoji i18n ──────────────────────────────────────────────────────────
   Supported locales: en, fr, gu, zh
   Usage: t('key') or t('key.with.{0}.placeholder', value)
   Language stored in localStorage key 'boomoji-lang'.
   ─────────────────────────────────────────────────────────────────────────── */

const TRANSLATIONS = {

  /* ═══════════════════════════════════════════════════════════ ENGLISH ══ */
  en: {
    'menu.title':    'Boomoji!',
    'menu.subtitle': 'Tap · Play · Discover',
    'menu.privacy':  'Privacy Policy',
    'menu.language': '🌐 Language',

    'game.pop.title':      'Pop!',
    'game.pop.desc':       'Tap the bouncing emojis!',
    'game.reveal.title':   'Reveal!',
    'game.reveal.desc':    'Touch to discover emojis!',
    'game.grow.title':     'Grow!',
    'game.grow.desc':      'Hold to inflate… BOOM!',
    'game.rain.title':     'Rain!',
    'game.rain.desc':      'Tap the falling emojis!',
    'game.stickers.title': 'Stickers!',
    'game.stickers.desc':  'Decorate every scene!',
    'game.memory.title':   'Memory!',
    'game.memory.desc':    'Find the matching pairs!',
    'game.connect.title':  'Connect!',
    'game.connect.desc':   'Drop 4 in a row to win!',
    'game.spot.title':     'Spot!',
    'game.spot.desc':      'Find all the matching ones!',

    'reveal.hint':      'Tap anywhere! ✨',
    'stickers.hint':    'Tap to place stickers! ✨',
    'stickers.great_job': 'Great job!',
    'stickers.next_up':   'Next up: {0} {1}',

    'pop.round':           'Round {0}',
    'pop.round_with_left': 'Round {0} · {1} left',
    'pop.next_round':      'Round {0}: {0} emojis! 🚀',

    'memory.find_pairs': 'Find the pairs!',
    'memory.matched':    '{0} / 8 matched',
    'memory.replay':     'Play Again!',

    'connect.turn':   '{0} Turn!',
    'connect.win':    'Wins!',
    'connect.tie':    "It's a draw!",
    'connect.replay': 'Play Again!',

    'spot.find_label': 'Find all:',
    'spot.find_all':   'Find them all!',
    'spot.found':      '{0} / {1} found!',
    'spot.win.0':      'You found them!',
    'spot.win.1':      'Eagle eyes!',
    'spot.win.2':      'Superstar!',
    'spot.win.3':      'Amazing!',
    'spot.replay':     'Next Round!',

    'celebrate.0': 'Amazing!',
    'celebrate.1': 'Woohoo!',
    'celebrate.2': 'Brilliant!',
    'celebrate.3': 'Superstar!',
    'celebrate.4': 'Incredible!',
    'celebrate.5': 'You Rock!',

    'memory.win.0': 'You did it!',
    'memory.win.1': 'Amazing!',
    'memory.win.2': 'Brilliant!',
    'memory.win.3': 'Superstar!',

    'sticker.animals': 'Animals',
    'sticker.ocean':   'Ocean',
    'sticker.yummy':   'Yummy!',
    'sticker.space':   'Space',
    'sticker.garden':  'Garden',

    'gate.heading': 'For Parents & Guardians',
    'gate.desc':    'Solve this to continue:',
    'gate.cancel':  'Cancel',
    'gate.confirm': 'Confirm',

    'timer.label': '⏱ Nap time:',
    'timer.off':   'Off',
    'timer.15m':   '15m',
    'timer.30m':   '30m',
    'timer.1h':    '1h',

    'sleep.message': 'Time to rest! 💤',
    'sleep.hint':    'Parents: tap to unlock',

    'update.toast': '✨ Updated!',

    'lang.picker.title': 'Choose language',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.gu': 'ગુજરાતી',
    'lang.zh': '中文',

    'privacy.title': 'Privacy Policy',

    'privacy.content_html': `
      <div class="privacy-summary">
        <h2 class="privacy-section-title">The Short Version</h2>
        <p>Boomoji is a free emoji game made with love for young children. It is a personal project with no commercial intent.</p>
        <ul>
          <li><strong>We collect nothing.</strong> No names, email addresses, location, device identifiers, or usage analytics.</li>
          <li><strong>We sell nothing.</strong> No ads, no in-app purchases, no subscriptions, no data brokers.</li>
          <li><strong>We track nothing.</strong> No cookies, no cross-site tracking, no profiling of any kind.</li>
          <li><strong>What's on your device:</strong> A copy of the app's own files so it works offline (a Service Worker cache), and your chosen language preference. No personal information whatsoever.</li>
          <li><strong>Questions?</strong> Open an issue at <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></li>
        </ul>
      </div>

      <p class="privacy-effective-date">Effective date: May 4, 2026 &nbsp;·&nbsp; Version 1.1</p>

      <h2 class="privacy-h2">1. About This Policy</h2>
      <p>This Privacy Policy explains how Boomoji ("the App", "we", "our") handles information in connection with your use of the application. This policy applies to all users in all jurisdictions, with specific provisions for the European Economic Area, Canada, and the United States.</p>
      <p>Applicable legislation this policy is designed to address:</p>
      <ul>
        <li>General Data Protection Regulation (EU) 2016/679 ("GDPR")</li>
        <li>Canada's Personal Information Protection and Electronic Documents Act ("PIPEDA")</li>
        <li>Quebec's Act Respecting the Protection of Personal Information in the Private Sector, as modernised by Law 25 / Bill 64 (in force September 2023)</li>
        <li>Quebec's Act Respecting the Protection of Consumers (Loi sur la protection des consommateurs, CQLR c P-40.1)</li>
        <li>U.S. Children's Online Privacy Protection Act ("COPPA"), 15 U.S.C. §§ 6501–6506, and accompanying FTC Rule (16 C.F.R. Part 312)</li>
      </ul>

      <h2 class="privacy-h2">2. Identity of the Operator</h2>
      <p>Michael Sanford, an individual developer. Contact: <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>Michael Sanford is also designated as the <em>Person Responsible for Personal Information</em> (<em>responsable de la protection des renseignements personnels</em>) pursuant to Section 3.1 of Quebec's Act Respecting the Protection of Personal Information in the Private Sector.</p>

      <h2 class="privacy-h2">3. Information We Do Not Collect</h2>
      <p>We do not collect, process, store, transmit, or share any personal information. Specifically, we collect no:</p>
      <ul>
        <li>Names, usernames, or aliases</li>
        <li>Email addresses or other contact information</li>
        <li>Phone numbers</li>
        <li>Device identifiers (IDFA, Android Advertising ID, or similar)</li>
        <li>IP addresses or geolocation data</li>
        <li>Usage analytics or behavioural tracking data</li>
        <li>Biometric data</li>
        <li>Financial information</li>
        <li>Social network identifiers</li>
        <li>Cookies of any kind</li>
      </ul>
      <p>There are no user accounts. No registration is required or possible.</p>

      <h2 class="privacy-h2">4. Technical Data Processed on Your Device</h2>
      <p>The only data stored is your device's local Service Worker cache, which holds a copy of the App's own files solely to enable offline play:</p>
      <ul>
        <li>index.html, style.css, and JavaScript files (application logic)</li>
        <li>Icon image files and the web application manifest</li>
      </ul>
      <p>This cache is stored <strong>locally on your device only</strong>. It is never transmitted to any server and contains no personal information. It is automatically replaced when the App is updated. You may clear it at any time through your browser or operating system settings (typically under "Storage" or "Site Data").</p>
      <p>The App also stores a single <code>localStorage</code> entry (<code>boomoji-lang</code>) that records your chosen display language (e.g. <code>"en"</code>, <code>"fr"</code>). This entry contains no personal information. No <code>sessionStorage</code>, <code>IndexedDB</code>, or cookies are used.</p>
      <h3 class="privacy-h3">Google Fonts</h3>
      <p>On the very first load of the App (when an internet connection is available), the App loads a typeface called Fredoka One from Google Fonts (<a class="privacy-link" href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>). This request transmits your IP address to Google's servers. After the first load, the font is cached locally by your browser and is not requested from Google again. This one-time request is governed by <a class="privacy-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>. If you wish to avoid it entirely, you may load the App once on a trusted network, then use it offline thereafter.</p>

      <h2 class="privacy-h2">5. Children's Privacy</h2>
      <p>Boomoji is designed for use by young children under the direct supervision of a parent or guardian. Because we collect no personal information from any user of any age:</p>
      <ul>
        <li><strong>COPPA:</strong> No verifiable parental consent mechanism is necessary, as no personal information is solicited or collected from children under 13.</li>
        <li><strong>GDPR Article 8:</strong> No parental consent for data processing is required, as no personal data is processed.</li>
        <li><strong>Quebec Law 25:</strong> The App satisfies the privacy-by-design principle (s. 91) by collecting nothing at the point of design.</li>
      </ul>
      <p>A parent gate (a simple arithmetic challenge) separates this Privacy Policy and other non-game content from the child-facing interface.</p>

      <h2 class="privacy-h2">6. No Third-Party Services</h2>
      <p>Other than the one-time Google Fonts request described in Section 4, this App does not use any third-party services. Specifically:</p>
      <ul>
        <li>No analytics platforms (e.g., Google Analytics, Mixpanel, Amplitude)</li>
        <li>No advertising networks or ad SDKs</li>
        <li>No social login or social sharing widgets</li>
        <li>No remote content delivery networks (CDNs)</li>
        <li>No crash reporting or performance monitoring services</li>
        <li>No payment processors</li>
      </ul>
      <p>All application resources load locally from the App bundle after the initial installation.</p>

      <h2 class="privacy-h2">7. Data Transfers</h2>
      <p>Because we collect no personal data, there are no personal data transfers attributable to this App. The one-time Google Fonts request (Section 4) involves your IP address being transmitted to Google's servers; that transfer is governed entirely by Google's Privacy Policy.</p>

      <h2 class="privacy-h2">8. Your Rights</h2>
      <p>Under applicable law, you may have rights to access, correct, delete, obtain a copy of, or object to the processing of your personal information:</p>
      <ul>
        <li>GDPR Articles 15–21 (EEA residents)</li>
        <li>PIPEDA Principle 9 (Canadian residents)</li>
        <li>Quebec Act Respecting the Protection of Personal Information, ss. 27–28.1 (Quebec residents)</li>
      </ul>
      <p>Because we hold no personal information about any user, all of these rights are satisfied by design — there is nothing to access, correct, export, or delete. If you have any question or concern, please contact us and we will respond promptly.</p>

      <h2 class="privacy-h2">9. Retention</h2>
      <p>We retain no personal data. The Service Worker cache (which contains only App files, not personal information) is automatically cleared and replaced each time the App is updated. You may clear it manually at any time through your browser or operating system settings. The language preference stored in <code>localStorage</code> contains no personal information and can be cleared via browser settings at any time.</p>

      <h2 class="privacy-h2">10. Changes to This Policy</h2>
      <p>If we make material changes to this policy, the effective date shown at the top of this document will be updated and the revised policy will be distributed as part of the next App update. Because there are no user accounts or contact information on file, we cannot provide individual advance notice of changes.</p>

      <h2 class="privacy-h2">11. Contact and Complaints</h2>
      <p>For any privacy question, request, or concern, please open an issue on the app's GitHub repository: <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>If you are a <strong>Quebec resident</strong> and your concern is not resolved to your satisfaction, you may contact the Commission d'accès à l'information (CAI): <a class="privacy-link" href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener">cai.gouv.qc.ca</a></p>
      <p>If you are an <strong>EU or EEA resident</strong>, you may lodge a complaint with your national data protection supervisory authority. A list of authorities is available at: <a class="privacy-link" href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener">edpb.europa.eu</a></p>
      <p>If you are a <strong>U.S. parent or guardian</strong> with a concern about children's privacy, you may contact the Federal Trade Commission (FTC) at <a class="privacy-link" href="https://www.ftc.gov" target="_blank" rel="noopener">ftc.gov</a>.</p>
    `,
  },

  /* ═══════════════════════════════════════════════════════════ FRANÇAIS ══ */
  fr: {
    'menu.title':    'Boomoji !',
    'menu.subtitle': 'Touche · Joue · Découvre',
    'menu.privacy':  'Politique de confidentialité',
    'menu.language': '🌐 Langue',

    'game.pop.title':      'Éclate !',
    'game.pop.desc':       'Touche les emojis qui rebondissent !',
    'game.reveal.title':   'Révèle !',
    'game.reveal.desc':    'Touche pour découvrir des emojis !',
    'game.grow.title':     'Gonfle !',
    'game.grow.desc':      'Appuie pour gonfler… BOOM !',
    'game.rain.title':     'Pluie !',
    'game.rain.desc':      'Touche les emojis qui tombent !',
    'game.stickers.title': 'Autocollants !',
    'game.stickers.desc':  'Décore chaque scène !',
    'game.memory.title':   'Mémoire !',
    'game.memory.desc':    'Trouve les paires qui correspondent !',
    'game.connect.title':  'Connecte !',
    'game.connect.desc':   'Aligne 4 pour gagner !',
    'game.spot.title':     'Repère !',
    'game.spot.desc':      'Trouve tous les emojis pareils !',

    'reveal.hint':        'Touche n’importe où ! ✨',
    'stickers.hint':      'Touche pour placer des autocollants ! ✨',
    'stickers.great_job': 'Bravo !',
    'stickers.next_up':   'Ensuite : {0} {1}',

    'pop.round':           'Tour {0}',
    'pop.round_with_left': 'Tour {0} · {1} restants',
    'pop.next_round':      'Tour {0} : {0} emojis ! 🚀',

    'memory.find_pairs': 'Trouve les paires !',
    'memory.matched':    '{0} / 8 trouvés',
    'memory.replay':     'Rejouer !',

    'connect.turn':   '{0} joue !',
    'connect.win':    'Gagne !',
    'connect.tie':    'Égalité !',
    'connect.replay': 'Rejouer !',

    'spot.find_label': 'Trouve tous :',
    'spot.find_all':   'Trouve-les tous !',
    'spot.found':      '{0} / {1} trouvés !',
    'spot.win.0':      'Tu les as trouvés !',
    'spot.win.1':      'Œil de lynx !',
    'spot.win.2':      'Super !',
    'spot.win.3':      'Incroyable !',
    'spot.replay':     'Tour suivant !',

    'celebrate.0': 'Incroyable !',
    'celebrate.1': 'Youpi !',
    'celebrate.2': 'Brillant !',
    'celebrate.3': 'Super !',
    'celebrate.4': 'Génial !',
    'celebrate.5': 'Tu es fort !',

    'memory.win.0': 'Tu as réussi !',
    'memory.win.1': 'Incroyable !',
    'memory.win.2': 'Brillant !',
    'memory.win.3': 'Super !',

    'sticker.animals': 'Animaux',
    'sticker.ocean':   'Océan',
    'sticker.yummy':   'Miam !',
    'sticker.space':   'Espace',
    'sticker.garden':  'Jardin',

    'gate.heading': 'Pour les parents et tuteurs',
    'gate.desc':    'Résous ceci pour continuer :',
    'gate.cancel':  'Annuler',
    'gate.confirm': 'Confirmer',

    'timer.label': '⏱ Durée :',
    'timer.off':   'Off',
    'timer.15m':   '15m',
    'timer.30m':   '30m',
    'timer.1h':    '1h',

    'sleep.message': 'Temps de repos ! 💤',
    'sleep.hint':    'Parents : touchez pour déverrouiller',

    'update.toast': '✨ Mis à jour !',

    'lang.picker.title': 'Choisir la langue',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.gu': 'ગુજરાતી',
    'lang.zh': '中文',

    'privacy.title': 'Politique de confidentialité',

    'privacy.content_html': `
      <div class="privacy-summary">
        <h2 class="privacy-section-title">En bref</h2>
        <p>Boomoji est un jeu d'emojis gratuit, créé avec amour pour les jeunes enfants. C'est un projet personnel sans intention commerciale.</p>
        <ul>
          <li><strong>Nous ne collectons rien.</strong> Ni noms, ni adresses e-mail, ni localisation, ni identifiants d'appareils, ni données d'utilisation.</li>
          <li><strong>Nous ne vendons rien.</strong> Pas de publicités, pas d'achats intégrés, pas d'abonnements, pas de courtiers en données.</li>
          <li><strong>Nous ne traceons rien.</strong> Pas de cookies, pas de suivi intersite, pas de profilage d'aucune sorte.</li>
          <li><strong>Ce qui est sur votre appareil :</strong> Une copie des fichiers de l'application pour fonctionner hors ligne (cache Service Worker) et votre préférence de langue. Aucune information personnelle.</li>
          <li><strong>Des questions ?</strong> Ouvrez un ticket sur <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></li>
        </ul>
      </div>

      <p class="privacy-effective-date">Date d'entrée en vigueur : 4 mai 2026 &nbsp;·&nbsp; Version 1.1</p>

      <h2 class="privacy-h2">1. À propos de cette politique</h2>
      <p>Cette politique de confidentialité explique la façon dont Boomoji (« l'Application », « nous », « notre ») traite les informations dans le cadre de votre utilisation de l'application. Elle s'applique à tous les utilisateurs dans toutes les juridictions, avec des dispositions spécifiques pour l'Espace économique européen, le Canada et les États-Unis.</p>
      <p>Législations auxquelles cette politique est conçue pour répondre :</p>
      <ul>
        <li>Règlement général sur la protection des données (UE) 2016/679 (« RGPD »)</li>
        <li>Loi sur la protection des renseignements personnels et les documents électroniques du Canada (« LPRPDE »)</li>
        <li>Loi québécoise sur la protection des renseignements personnels dans le secteur privé, telle que modernisée par la Loi 25 / Projet de loi 64 (en vigueur en septembre 2023)</li>
        <li>Loi sur la protection des consommateurs du Québec (Loi sur la protection des consommateurs, CQLR c P-40.1)</li>
        <li>U.S. Children's Online Privacy Protection Act (« COPPA »), 15 U.S.C. §§ 6501–6506, et règlement FTC d'accompagnement (16 C.F.R. Partie 312)</li>
      </ul>

      <h2 class="privacy-h2">2. Identité de l'opérateur</h2>
      <p>Michael Sanford, développeur indépendant. Contact : <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>Michael Sanford est également désigné comme <em>responsable de la protection des renseignements personnels</em> en vertu de l'article 3.1 de la Loi québécoise sur la protection des renseignements personnels dans le secteur privé.</p>

      <h2 class="privacy-h2">3. Informations que nous ne collectons pas</h2>
      <p>Nous ne collectons, ne traitons, ne stockons, ne transmettons ni ne partageons aucune information personnelle. Plus précisément, nous ne collectons :</p>
      <ul>
        <li>Ni noms, pseudonymes ou alias</li>
        <li>Ni adresses e-mail ou autres coordonnées</li>
        <li>Ni numéros de téléphone</li>
        <li>Ni identifiants d'appareils (IDFA, Android Advertising ID ou similaires)</li>
        <li>Ni adresses IP ni données de géolocalisation</li>
        <li>Ni données d'analyse d'utilisation ni données de suivi comportemental</li>
        <li>Ni données biométriques</li>
        <li>Ni informations financières</li>
        <li>Ni identifiants de réseaux sociaux</li>
        <li>Ni cookies d'aucune sorte</li>
      </ul>
      <p>Il n'y a pas de comptes utilisateurs. Aucune inscription n'est requise ni possible.</p>

      <h2 class="privacy-h2">4. Données techniques traitées sur votre appareil</h2>
      <p>Les seules données stockées sont le cache local Service Worker de votre appareil, qui contient une copie des fichiers de l'application pour permettre une utilisation hors ligne :</p>
      <ul>
        <li>index.html, style.css et fichiers JavaScript (logique applicative)</li>
        <li>Fichiers d'icônes et manifeste de l'application web</li>
      </ul>
      <p>Ce cache est stocké <strong>uniquement sur votre appareil</strong>. Il n'est jamais transmis à un serveur et ne contient aucune information personnelle. Il est automatiquement remplacé lors de la mise à jour de l'application. Vous pouvez le supprimer à tout moment via les paramètres de votre navigateur ou de votre système d'exploitation (généralement sous « Stockage » ou « Données du site »).</p>
      <p>L'application stocke également une seule entrée <code>localStorage</code> (<code>boomoji-lang</code>) enregistrant votre langue d'affichage choisie (p. ex. <code>« en »</code>, <code>« fr »</code>). Cette entrée ne contient aucune information personnelle. Aucun <code>sessionStorage</code>, <code>IndexedDB</code> ni cookie n'est utilisé.</p>
      <h3 class="privacy-h3">Google Fonts</h3>
      <p>Lors du tout premier chargement de l'application (avec une connexion internet disponible), l'application charge une police de caractères appelée Fredoka One depuis Google Fonts (<a class="privacy-link" href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>). Cette requête transmet votre adresse IP aux serveurs de Google. Après ce premier chargement, la police est mise en cache localement par votre navigateur et n'est plus demandée à Google. Cette requête unique est régie par la <a class="privacy-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener">politique de confidentialité de Google</a>. Si vous souhaitez l'éviter entièrement, chargez l'application une fois sur un réseau de confiance, puis utilisez-la hors ligne.</p>

      <h2 class="privacy-h2">5. Confidentialité des enfants</h2>
      <p>Boomoji est conçu pour être utilisé par de jeunes enfants sous la supervision directe d'un parent ou tuteur. Comme nous ne collectons aucune information personnelle d'aucun utilisateur quel que soit son âge :</p>
      <ul>
        <li><strong>COPPA :</strong> Aucun mécanisme de consentement parental vérifiable n'est nécessaire, car aucune information personnelle n'est sollicitée ni collectée auprès d'enfants de moins de 13 ans.</li>
        <li><strong>RGPD Article 8 :</strong> Aucun consentement parental pour le traitement des données n'est requis, car aucune donnée personnelle n'est traitée.</li>
        <li><strong>Loi 25 du Québec :</strong> L'application satisfait au principe de protection de la vie privée dès la conception (art. 91) en ne collectant rien au stade de la conception.</li>
      </ul>
      <p>Un contrôle parental (un simple défi arithmétique) sépare cette politique de confidentialité et les autres contenus non ludiques de l'interface destinée aux enfants.</p>

      <h2 class="privacy-h2">6. Absence de services tiers</h2>
      <p>En dehors de la requête unique Google Fonts décrite à la section 4, cette application n'utilise aucun service tiers. Plus précisément :</p>
      <ul>
        <li>Aucune plateforme d'analyse (p. ex. Google Analytics, Mixpanel, Amplitude)</li>
        <li>Aucun réseau publicitaire ni SDK publicitaire</li>
        <li>Aucun widget de connexion sociale ou de partage social</li>
        <li>Aucun réseau de diffusion de contenu (CDN) distant</li>
        <li>Aucun service de signalement de pannes ni de surveillance des performances</li>
        <li>Aucun processeur de paiement</li>
      </ul>
      <p>Toutes les ressources de l'application sont chargées localement depuis le bundle applicatif après l'installation initiale.</p>

      <h2 class="privacy-h2">7. Transferts de données</h2>
      <p>Comme nous ne collectons aucune donnée personnelle, aucun transfert de données personnelles attribuable à cette application n'a lieu. La requête unique Google Fonts (section 4) implique la transmission de votre adresse IP aux serveurs de Google ; ce transfert est entièrement régi par la politique de confidentialité de Google.</p>

      <h2 class="privacy-h2">8. Vos droits</h2>
      <p>En vertu de la législation applicable, vous pouvez avoir des droits d'accès, de rectification, de suppression, d'obtention d'une copie ou d'opposition au traitement de vos informations personnelles :</p>
      <ul>
        <li>RGPD Articles 15–21 (résidents de l'EEE)</li>
        <li>LPRPDE Principe 9 (résidents canadiens)</li>
        <li>Loi québécoise sur la protection des renseignements personnels, art. 27–28.1 (résidents du Québec)</li>
      </ul>
      <p>Comme nous ne détenons aucune information personnelle sur aucun utilisateur, tous ces droits sont satisfaits par conception — il n'y a rien à consulter, corriger, exporter ou supprimer. Si vous avez une question ou une préoccupation, veuillez nous contacter et nous répondrons rapidement.</p>

      <h2 class="privacy-h2">9. Conservation</h2>
      <p>Nous ne conservons aucune donnée personnelle. Le cache Service Worker (qui ne contient que des fichiers applicatifs, et non des informations personnelles) est automatiquement effacé et remplacé à chaque mise à jour de l'application. Vous pouvez le supprimer manuellement à tout moment via les paramètres de votre navigateur ou de votre système d'exploitation. La préférence de langue stockée dans <code>localStorage</code> ne contient aucune information personnelle et peut être effacée via les paramètres du navigateur à tout moment.</p>

      <h2 class="privacy-h2">10. Modifications de cette politique</h2>
      <p>En cas de modifications importantes apportées à cette politique, la date d'entrée en vigueur indiquée en haut du présent document sera mise à jour et la politique révisée sera distribuée dans le cadre de la prochaine mise à jour de l'application. Comme il n'y a pas de comptes utilisateurs ni de coordonnées enregistrées, nous ne pouvons pas fournir de préavis individuel des modifications.</p>

      <h2 class="privacy-h2">11. Contact et réclamations</h2>
      <p>Pour toute question, demande ou préoccupation en matière de confidentialité, veuillez ouvrir un ticket sur le dépôt GitHub de l'application : <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>Si vous êtes un <strong>résident du Québec</strong> et que votre préoccupation n'est pas résolue à votre satisfaction, vous pouvez contacter la Commission d'accès à l'information (CAI) : <a class="privacy-link" href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener">cai.gouv.qc.ca</a></p>
      <p>Si vous êtes un <strong>résident de l'UE ou de l'EEE</strong>, vous pouvez déposer une plainte auprès de votre autorité nationale de protection des données. Une liste des autorités est disponible sur : <a class="privacy-link" href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener">edpb.europa.eu</a></p>
      <p>Si vous êtes un <strong>parent ou tuteur américain</strong> préoccupé par la confidentialité des enfants, vous pouvez contacter la Federal Trade Commission (FTC) à l'adresse <a class="privacy-link" href="https://www.ftc.gov" target="_blank" rel="noopener">ftc.gov</a>.</p>
    `,
  },

  /* ══════════════════════════════════════════════════════════ GUJARATI ══ */
  gu: {
    'menu.title':    'Boomoji!',
    'menu.subtitle': 'ટૅપ · રમ · શોધ',
    'menu.privacy':  'ગોપનીયતા નીતિ',
    'menu.language': '🌐 ભાષા',

    'game.pop.title':      'પૉપ!',
    'game.pop.desc':       'ઉછળતા ઇમોજી ટૅપ કરો!',
    'game.reveal.title':   'ખોલ!',
    'game.reveal.desc':    'ઇમોજી શોધવા સ્પર્શ કરો!',
    'game.grow.title':     'ઉગ!',
    'game.grow.desc':      'ફુલાવવા પકડો… ધમાકો!',
    'game.rain.title':     'વરસાદ!',
    'game.rain.desc':      'પડતા ઇમોજી ટૅપ કરો!',
    'game.stickers.title': 'સ્ટિકર!',
    'game.stickers.desc':  'દરેક દ્રશ્ય સજાવો!',
    'game.memory.title':   'યાદ!',
    'game.memory.desc':    'મળતી જોડ શોધો!',
    'game.connect.title':  'જોડ!',
    'game.connect.desc':   '4 એકસાથે ગોઠવો!',
    'game.spot.title':     'શોધ!',
    'game.spot.desc':      'મળતા ઇમોજી બધા શોધો!',

    'reveal.hint':        'ગમે ત્યાં ટૅપ કરો! ✨',
    'stickers.hint':      'સ્ટિકર મૂકવા ટૅપ કરો! ✨',
    'stickers.great_job': 'શાબાશ!',
    'stickers.next_up':   'આગળ: {0} {1}',

    'pop.round':           'રાઉન્ડ {0}',
    'pop.round_with_left': 'રાઉન્ડ {0} · {1} બાકી',
    'pop.next_round':      'રાઉન્ડ {0}: {0} ઇમોજી! 🚀',

    'memory.find_pairs': 'જોડ શોધો!',
    'memory.matched':    '{0} / 8 મળ્યા',
    'memory.replay':     'ફરી રમો!',

    'connect.turn':   '{0} ની વારી!',
    'connect.win':    'જીત્યા!',
    'connect.tie':    'ડ્રૉ!',
    'connect.replay': 'ફરી રમો!',

    'spot.find_label': 'બધા શોધો:',
    'spot.find_all':   'બધા શોધો!',
    'spot.found':      '{0} / {1} મળ્યા!',
    'spot.win.0':      'શોધ્યા!',
    'spot.win.1':      'તીક્ષ્ણ નજર!',
    'spot.win.2':      'સ્ટાર!',
    'spot.win.3':      'અદ્ભુત!',
    'spot.replay':     'આગળ!',

    'celebrate.0': 'અદ્ભુત!',
    'celebrate.1': 'વાહ!',
    'celebrate.2': 'શાનદાર!',
    'celebrate.3': 'સ્ટાર!',
    'celebrate.4': 'અકલ્પ!',
    'celebrate.5': 'ધન્ય!',

    'memory.win.0': 'તમે કર્યું!',
    'memory.win.1': 'અદ્ભુત!',
    'memory.win.2': 'શાનદાર!',
    'memory.win.3': 'સ્ટાર!',

    'sticker.animals': 'પ્રાણીઓ',
    'sticker.ocean':   'સાગર',
    'sticker.yummy':   'યમ!',
    'sticker.space':   'અવકાશ',
    'sticker.garden':  'બગીચો',

    'gate.heading': 'માતા-પિતા અને વાલીઓ માટે',
    'gate.desc':    'આગળ વધવા ઉકેલો:',
    'gate.cancel':  'રદ કરો',
    'gate.confirm': 'ખાતરી કરો',

    'timer.label': '⏱ રમત સમય:',
    'timer.off':   'બંધ',
    'timer.15m':   '15મ',
    'timer.30m':   '30મ',
    'timer.1h':    '1ક',

    'sleep.message': 'આરામ નો સમય! 💤',
    'sleep.hint':    'માતા-પિતા: ખોલવા ટૅપ કરો',

    'update.toast': '✨ અપડેટ થઈ ગયું!',

    'lang.picker.title': 'ભાષા પસંદ કરો',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.gu': 'ગુજરાતી',
    'lang.zh': '中文',

    'privacy.title': 'ગોપનીયતા નીતિ',

    'privacy.content_html': `
      <div class="privacy-summary">
        <h2 class="privacy-section-title">ટૂંકમાં</h2>
        <p>Boomoji એ નાના બાળકો માટે પ્રેમ સાથે બનાવેલ મફત ઇમોજી રમત છે. આ એક વ્યક્તિગત પ્રોજેક્ટ છે, જેનો કોઈ વ્યાવસાયિક ઇરાદો નથી.</p>
        <ul>
          <li><strong>અમે કંઈ એકત્ર કરતા નથી.</strong> કોઈ નામ, ઈ-મેઈલ, સ્થાન, ઉપકરણ ઓળખ, કે ઉપયોગ વિશ્લેષણ નહીં.</li>
          <li><strong>અમે કંઈ વેચતા નથી.</strong> કોઈ જાહેરાત, ઇન-એપ ખરીદી, સબ્સ્ક્રિપ્શન, કે ડેટા બ્રોકર નહીં.</li>
          <li><strong>અમે કંઈ ટ્રૅક કરતા નથી.</strong> કોઈ કૂકી, ક્રોસ-સાઈટ ટ્રૅકિંગ, કે પ્રોફાઇલિંગ નહીં.</li>
          <li><strong>તમારા ઉપકરણ પર:</strong> ઑફ઼લાઇન ઉપયોગ માટે ઍપ ફ઼ાઇલ્સની નકલ (Service Worker cache) અને ભાષા પ્રાધાન્ય. કોઈ અંગત માહિતી નહીં.</li>
          <li><strong>પ્રશ્ન?</strong> <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a> પર ઇશ્યૂ ખોલો</li>
        </ul>
      </div>

      <p class="privacy-effective-date">અમલ તારીખ: 4 મે, 2026 &nbsp;·&nbsp; આવૃત્તિ 1.1</p>

      <h2 class="privacy-h2">1. આ નીતિ વિશે</h2>
      <p>આ ગોપનીયતા નીતિ Boomoji ("ઍપ", "અમે", "અમારું") ઍપ્લિકેશનના ઉપયોગ સાથે સંકળાયેલ માહિતીને કઈ રીતે સંભાળે છે તે સ્પષ્ટ કરે છે. આ નીતિ તમામ ન્યાય-ક્ષેત્રોના તમામ વપરાશકર્તાઓ પર, ખાસ કરીને EEA, કૅનેડા અને અમેરિકા માટે, લાગુ પડે છે.</p>
      <p>આ નીતિ નીચેના કાયદાઓ અંગે ધ્યાન આપે છે:</p>
      <ul>
        <li>General Data Protection Regulation (EU) 2016/679 ("GDPR")</li>
        <li>Canada's Personal Information Protection and Electronic Documents Act ("PIPEDA")</li>
        <li>Quebec's Act Respecting the Protection of Personal Information in the Private Sector (Law 25 / Bill 64)</li>
        <li>Quebec's Act Respecting the Protection of Consumers (CQLR c P-40.1)</li>
        <li>U.S. Children's Online Privacy Protection Act ("COPPA"), 15 U.S.C. §§ 6501–6506</li>
      </ul>

      <h2 class="privacy-h2">2. સંચાલકની ઓળખ</h2>
      <p>Michael Sanford, સ્વ-ઉદ્યોગ ડેવલપર. સંપર્ક: <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>Michael Sanford ક્વિબૅકના ખાનગી ક્ષેત્ર અંગેના અધિનિયમ, કલમ 3.1 અનુસાર <em>અંગત માહિતી સંરક્ષણ માટે જવાબદાર વ્યક્તિ</em> (responsable de la protection des renseignements personnels) પણ છે.</p>

      <h2 class="privacy-h2">3. અમે જે માહિતી એકત્ર કરતા નથી</h2>
      <p>અમે કોઈ અંગત માહિતી એકત્ર, પ્રક્રિયા, સંગ્રહ, પ્રસ્તુત, કે વહેંચ્યા નથી. ખાસ, અમે નીચેનામાંથી કંઈ એકત્ર કરતા નથી:</p>
      <ul>
        <li>નામ, યૂઝ઼rnameNameName, કે ઉપનામ</li>
        <li>ઈ-મેઈલ સરનામાં કે અન્ય સંપર્ક માહિતી</li>
        <li>ફ઼ોન નંબર</li>
        <li>ઉપકરણ ઓળખ (IDFA, Android Advertising ID, વગેરે)</li>
        <li>IP સરનામાં કે ભૌગોlikelic સ્થાન ડેટા</li>
        <li>ઉપયોગ વિશ્લેષણ કે વર્તણૂક ટ્રૅકિંગ ડેટા</li>
        <li>બાયોmetric ડેટા</li>
        <li>નાણાકીय માહિતી</li>
        <li>સોশ਼ियल network ઓળખ</li>
        <li>કોઈ પ્રકારની કૂકી</li>
      </ul>
      <p>કોઈ વપરાશકર્તા ખાતા નથી. કોઈ નોંધણી જરૂરી નથી.</p>

      <h2 class="privacy-h2">4. ઉપકરણ પર ટૅchnical ડેટા</h2>
      <p>સ્ટોર થયેલ એકમાત્ર ડેટા Service Worker cache છે, જે ઑફ઼લાઇન ઉપયોગ માટે ઍપ ફ઼ાઇલ્સ ધરાવે છે:</p>
      <ul>
        <li>index.html, style.css, JavaScript ફ઼ાઇલ્સ</li>
        <li>icon ઇमेज ફ઼ाइल्स ane web app manifest</li>
      </ul>
      <p>આ cache <strong>ફ઼ક્ત તમારા ઉپकرण पर</strong> સ்tnored是 छे. ક்yadhai server पर transmit थतो नथी. ઍפ update थाय त्यारे आपोआप replace थाय छे. Browser/OS settings मां "Storage" हेठळ ते कोईपण समये साफ करी शकाय छे.</p>
      <p>ઍப একটি <code>localStorage</code> entry (<code>boomoji-lang</code>) 存储 करे छे, जे तमारी chosen display language (दा.त. <code>"en"</code>, <code>"gu"</code>) record करे छे. आ entry मां कोई अंगत माहिती नथी. कोई <code>sessionStorage</code>, <code>IndexedDB</code>, के cookies उपयोगमां नथी.</p>
      <h3 class="privacy-h3">Google Fonts</h3>
      <p>ઍপ ना पहले load वखते (internet connection होय त्यारे), ऍप Google Fonts (<a class="privacy-link" href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>) परथी Fredoka One typeface load करे छे. आ request तमारो IP address Google ना servers ने transmit करे छे. पहला load पछी, font browser द्वारा locally cache थाय छे. आ एक-वखत request <a class="privacy-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google ना Privacy Policy</a> द्वारा governed छे.</p>

      <h2 class="privacy-h2">5. बालकोनी ग़ोपनीयता</h2>
      <p>Boomoji नाना बालको माटे, माता-पिता या वाली ना सीधा दोरव हेठ, उपयोग माटे बनाव्यो छे. अमे किसी पण उंमर ना user पासेथी कोई अंगत माहिती collect करता नथी:</p>
      <ul>
        <li><strong>COPPA:</strong> 13 वर्ष थी ओछी उंमर ना बालको पासेथी कोई अंगत माहिती collect नथी करातो.</li>
        <li><strong>GDPR कलम 8:</strong> कोई personal data process नथी थतो, तेथी parental consent जरूरी नथी.</li>
        <li><strong>Quebec Law 25:</strong> ऍप design-by-privacy principle (s. 91) पूरो करे छे.</li>
      </ul>
      <p>एक parent gate (सरल arithmetic challenge) आ Privacy Policy ने child-facing interface थी अलग राखे छे.</p>

      <h2 class="privacy-h2">6. कोई third-party services नथी</h2>
      <p>Section 4 मां जणाव्यो Google Fonts request सिवाय, आ ऍप कोई third-party services उपयोग नथी करतो:</p>
      <ul>
        <li>कोई analytics platform (Google Analytics, Mixpanel, Amplitude) नहीं</li>
        <li>कोई advertising network या ad SDK नहीं</li>
        <li>कोई social login या social sharing widget नहीं</li>
        <li>कोई remote CDN नहीं</li>
        <li>कोई crash reporting या performance monitoring नहीं</li>
        <li>कोई payment processor नहीं</li>
      </ul>
      <p>initial installation पछी बधां resources locally load थाय छे.</p>

      <h2 class="privacy-h2">7. Data Transfers</h2>
      <p>अमे कोई personal data collect नथी करता, तेथी आ ऍप ने लीधे कोई personal data transfer नथी थतो. Google Fonts request (Section 4) मां तमारो IP address Google ना servers ने transmit थाय छे; ते Google ना Privacy Policy द्वारा governed छे.</p>

      <h2 class="privacy-h2">8. तमारा हकો</h2>
      <p>लागु कायदा हेठ, तमने access, correct, delete, copy मेळववा, या personal information ना processing नो विरोध करवा ना हकीकती हक होई शके छे:</p>
      <ul>
        <li>GDPR Articles 15–21 (EEA residents)</li>
        <li>PIPEDA Principle 9 (Canadian residents)</li>
        <li>Quebec Act, ss. 27–28.1 (Quebec residents)</li>
      </ul>
      <p>अमे किसी पण user वीषे कोई personal information नथी राखतां, तेथी आ बधा हकों design द्वारा satisfied छे. कोई प्रश्न होय तो संपर्क करो.</p>

      <h2 class="privacy-h2">9. Retention</h2>
      <p>अमे कोई personal data नथी राखतां. Service Worker cache दरेक update वखते आपोआप clear थाय छे. <code>localStorage</code> मां language preference मां कोई personal information नथी; browser settings मां गमे त्यारे clear करी शकाय.</p>

      <h2 class="privacy-h2">10. आ नीतिमां बदलाव</h2>
      <p>जो आ नीतिमां material changes थाय, तो document नी शरूआत मां effective date update थशे ane revised policy next App update साथे distribute थशे. User accounts या contact information नहीं होवाथी individual advance notice शक्य नथी.</p>

      <h2 class="privacy-h2">11. संपर्क ane फरियाद</h2>
      <p>कोई privacy question, request, या concern माटे GitHub repository पर issue खोलो: <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>जो तमे <strong>Quebec ना रहेवासी</strong> छो, Commission d'accès à l'information (CAI) नो संपर्क करी शकाय: <a class="privacy-link" href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener">cai.gouv.qc.ca</a></p>
      <p>जो तमे <strong>EU/EEA ना रहेवासी</strong> छो, तमारी national data protection supervisory authority पर complaint दाखल करी शकाय: <a class="privacy-link" href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener">edpb.europa.eu</a></p>
      <p>जो तमे <strong>US ना माता-पिता या वाली</strong> छो, Federal Trade Commission (FTC) नो संपर्क करो: <a class="privacy-link" href="https://www.ftc.gov" target="_blank" rel="noopener">ftc.gov</a>.</p>
    `,
  },

  /* ════════════════════════════════════════════════════ MANDARIN (ZH) ══ */
  zh: {
    'menu.title':    'Boomoji！',
    'menu.subtitle': '点击 · 游玩 · 探索',
    'menu.privacy':  '隐私政策',
    'menu.language': '🌐 语言',

    'game.pop.title':      '泡泡！',
    'game.pop.desc':       '点击弹跳的表情！',
    'game.reveal.title':   '发现！',
    'game.reveal.desc':    '触摸发现表情！',
    'game.grow.title':     '变大！',
    'game.grow.desc':      '按住充气…砰！',
    'game.rain.title':     '下雨！',
    'game.rain.desc':      '点击下落的表情！',
    'game.stickers.title': '贴纸！',
    'game.stickers.desc':  '装扮每个场景！',
    'game.memory.title':   '配对！',
    'game.memory.desc':    '找出匹配的对！',
    'game.connect.title':  '连线！',
    'game.connect.desc':   '连成4个就赢！',
    'game.spot.title':     '找找！',
    'game.spot.desc':      '找出所有相同的表情！',

    'reveal.hint':        '随处点击！✨',
    'stickers.hint':      '点击放贴纸！✨',
    'stickers.great_job': '太棒了！',
    'stickers.next_up':   '接下来：{0} {1}',

    'pop.round':           '第 {0} 关',
    'pop.round_with_left': '第 {0} 关 · 剩 {1} 个',
    'pop.next_round':      '第 {0} 关：{0} 个表情！🚀',

    'memory.find_pairs': '找出所有对！',
    'memory.matched':    '{0} / 8 已配对',
    'memory.replay':     '再玩一次！',

    'connect.turn':   '{0} 的回合！',
    'connect.win':    '赢了！',
    'connect.tie':    '平局！',
    'connect.replay': '再玩一次！',

    'spot.find_label': '找出所有：',
    'spot.find_all':   '找出全部！',
    'spot.found':      '找到 {0} / {1} 个！',
    'spot.win.0':      '你找到了！',
    'spot.win.1':      '火眼金睛！',
    'spot.win.2':      '超级棒！',
    'spot.win.3':      '太棒了！',
    'spot.replay':     '下一轮！',

    'celebrate.0': '太棒了！',
    'celebrate.1': '哇哦！',
    'celebrate.2': '出色！',
    'celebrate.3': '超级棒！',
    'celebrate.4': '不可思议！',
    'celebrate.5': '你太厉害了！',

    'memory.win.0': '你做到了！',
    'memory.win.1': '太棒了！',
    'memory.win.2': '出色！',
    'memory.win.3': '超级棒！',

    'sticker.animals': '动物',
    'sticker.ocean':   '海洋',
    'sticker.yummy':   '好吃！',
    'sticker.space':   '太空',
    'sticker.garden':  '花园',

    'gate.heading': '家长与监护人',
    'gate.desc':    '解答后继续：',
    'gate.cancel':  '取消',
    'gate.confirm': '确认',

    'timer.label': '⏱ 游戏时长：',
    'timer.off':   '关',
    'timer.15m':   '15分',
    'timer.30m':   '30分',
    'timer.1h':    '1时',

    'sleep.message': '休息时间到 💤',
    'sleep.hint':    '家长：点击解锁',

    'update.toast': '✨ 已更新！',

    'lang.picker.title': '选择语言',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.gu': 'ગુજરાતી',
    'lang.zh': '中文',

    'privacy.title': '隐私政策',

    'privacy.content_html': `
      <div class="privacy-summary">
        <h2 class="privacy-section-title">简短说明</h2>
        <p>Boomoji 是一款专为幼儿用心制作的免费表情游戏，是无商业目的的个人项目。</p>
        <ul>
          <li><strong>我们不收集任何信息。</strong>不收集姓名、电子邮件、位置、设备标识符或使用分析数据。</li>
          <li><strong>我们不出售任何东西。</strong>无广告、无应用内购、无订阅、无数据经纪人。</li>
          <li><strong>我们不追踪任何内容。</strong>无 Cookie、无跨站追踪、无任何形式的用户画像。</li>
          <li><strong>您设备上存有：</strong>供离线使用的应用文件副本（Service Worker 缓存）以及您的语言偏好。不含任何个人信息。</li>
          <li><strong>有问题？</strong>请在 <a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a> 提交 issue</li>
        </ul>
      </div>

      <p class="privacy-effective-date">生效日期：2026年5月4日 &nbsp;·&nbsp; 版本 1.1</p>

      <h2 class="privacy-h2">1. 关于本政策</h2>
      <p>本隐私政策说明 Boomoji（"本应用"、"我们"、"我们的"）如何处理与您使用本应用相关的信息。本政策适用于所有司法管辖区的所有用户，并对欧洲经济区、加拿大和美国有特定条款。</p>
      <p>本政策旨在遵守以下法规：</p>
      <ul>
        <li>《欧盟通用数据保护条例》(EU) 2016/679（"GDPR"）</li>
        <li>加拿大《个人信息保护及电子文件法》（"PIPEDA"）</li>
        <li>魁北克《私营部门个人信息保护法》（Law 25 / Bill 64，2023年9月生效）</li>
        <li>魁北克《消费者保护法》（CQLR c P-40.1）</li>
        <li>美国《儿童网络隐私保护法》（"COPPA"），15 U.S.C. §§ 6501–6506</li>
      </ul>

      <h2 class="privacy-h2">2. 运营者身份</h2>
      <p>Michael Sanford，独立开发者。联系方式：<a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>Michael Sanford 依据魁北克《私营部门个人信息保护法》第 3.1 条，亦被指定为<em>个人信息保护负责人</em>（responsable de la protection des renseignements personnels）。</p>

      <h2 class="privacy-h2">3. 我们不收集的信息</h2>
      <p>我们不收集、处理、存储、传输或共享任何个人信息。具体而言，我们不收集：</p>
      <ul>
        <li>姓名、用户名或昵称</li>
        <li>电子邮件地址或其他联系信息</li>
        <li>电话号码</li>
        <li>设备标识符（IDFA、Android 广告 ID 等）</li>
        <li>IP 地址或地理位置数据</li>
        <li>使用分析或行为追踪数据</li>
        <li>生物特征数据</li>
        <li>财务信息</li>
        <li>社交网络标识符</li>
        <li>任何形式的 Cookie</li>
      </ul>
      <p>没有用户账户，无需也无法注册。</p>

      <h2 class="privacy-h2">4. 在您设备上处理的技术数据</h2>
      <p>唯一存储的数据是设备本地的 Service Worker 缓存，其中仅包含用于离线游戏的应用文件：</p>
      <ul>
        <li>index.html、style.css 及 JavaScript 文件（应用逻辑）</li>
        <li>图标图像文件及 Web 应用清单</li>
      </ul>
      <p>该缓存<strong>仅存储在您的设备上</strong>，从不传输至任何服务器，也不包含任何个人信息。应用更新时会自动替换。您可随时通过浏览器或操作系统设置（通常在"存储"或"网站数据"下）清除它。</p>
      <p>本应用还存储一条 <code>localStorage</code> 条目（<code>boomoji-lang</code>），记录您选择的显示语言（如 <code>"zh"</code>、<code>"en"</code>）。该条目不含任何个人信息。本应用不使用 <code>sessionStorage</code>、<code>IndexedDB</code> 或 Cookie。</p>
      <h3 class="privacy-h3">Google Fonts</h3>
      <p>在应用首次加载时（有网络连接时），应用会从 Google Fonts（<a class="privacy-link" href="https://fonts.google.com" target="_blank" rel="noopener">fonts.google.com</a>）加载 Fredoka One 字体。此请求会将您的 IP 地址传输至 Google 服务器。首次加载后，字体由浏览器本地缓存，不再向 Google 请求。此一次性请求受 <a class="privacy-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google 隐私政策</a>约束。如需完全避免，可在可信网络上加载一次应用，之后离线使用。</p>

      <h2 class="privacy-h2">5. 儿童隐私</h2>
      <p>Boomoji 专为在父母或监护人直接监督下使用的幼儿设计。由于我们不收集任何年龄用户的个人信息：</p>
      <ul>
        <li><strong>COPPA：</strong>无需可验证的家长同意机制，因为我们不向13岁以下儿童索取或收集个人信息。</li>
        <li><strong>GDPR 第8条：</strong>无需数据处理的家长同意，因为我们不处理任何个人数据。</li>
        <li><strong>魁北克法律25：</strong>本应用通过在设计阶段不收集任何数据，满足隐私设计原则（第91条）。</li>
      </ul>
      <p>一道家长关卡（简单算术挑战）将本隐私政策和其他非游戏内容与儿童界面分隔开。</p>

      <h2 class="privacy-h2">6. 无第三方服务</h2>
      <p>除第4节所述的一次性 Google Fonts 请求外，本应用不使用任何第三方服务：</p>
      <ul>
        <li>无分析平台（如 Google Analytics、Mixpanel、Amplitude）</li>
        <li>无广告网络或广告 SDK</li>
        <li>无社交登录或社交分享插件</li>
        <li>无远程内容分发网络（CDN）</li>
        <li>无崩溃报告或性能监控服务</li>
        <li>无支付处理商</li>
      </ul>
      <p>初次安装后，所有应用资源均从本地应用包加载。</p>

      <h2 class="privacy-h2">7. 数据传输</h2>
      <p>由于我们不收集任何个人数据，本应用不产生任何个人数据传输。第4节所述的一次性 Google Fonts 请求涉及将您的 IP 地址传输至 Google 服务器；该传输完全受 Google 隐私政策约束。</p>

      <h2 class="privacy-h2">8. 您的权利</h2>
      <p>根据适用法律，您可能拥有访问、更正、删除、获取副本或反对处理个人信息的权利：</p>
      <ul>
        <li>GDPR 第15–21条（欧洲经济区居民）</li>
        <li>PIPEDA 原则9（加拿大居民）</li>
        <li>魁北克《个人信息保护法》第27–28.1条（魁北克居民）</li>
      </ul>
      <p>由于我们未持有任何用户的个人信息，所有这些权利在设计上均已满足——没有任何可访问、更正、导出或删除的内容。如有任何问题或疑虑，请联系我们，我们会及时回复。</p>

      <h2 class="privacy-h2">9. 保留期限</h2>
      <p>我们不保留任何个人数据。Service Worker 缓存（仅含应用文件，不含个人信息）在每次应用更新时自动清除和替换。您也可随时通过浏览器或操作系统设置手动清除。<code>localStorage</code> 中存储的语言偏好不含个人信息，可随时通过浏览器设置清除。</p>

      <h2 class="privacy-h2">10. 本政策的变更</h2>
      <p>如对本政策进行重大变更，文档顶部的生效日期将更新，修订后的政策将作为下一次应用更新的一部分发布。由于没有用户账户或联系方式，我们无法提前向个人发出通知。</p>

      <h2 class="privacy-h2">11. 联系与投诉</h2>
      <p>如有任何隐私问题、请求或疑虑，请在应用的 GitHub 仓库提交 issue：<a class="privacy-link" href="https://github.com/michaelsanford/Boomoji/issues" target="_blank" rel="noopener">github.com/michaelsanford/Boomoji</a></p>
      <p>如果您是<strong>魁北克居民</strong>且问题未能解决，可联系 Commission d'accès à l'information (CAI)：<a class="privacy-link" href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener">cai.gouv.qc.ca</a></p>
      <p>如果您是<strong>欧盟/欧洲经济区居民</strong>，可向您所在国家的数据保护监管机构投诉：<a class="privacy-link" href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener">edpb.europa.eu</a></p>
      <p>如果您是<strong>美国家长或监护人</strong>，对儿童隐私有疑虑，可联系联邦贸易委员会 (FTC)：<a class="privacy-link" href="https://www.ftc.gov" target="_blank" rel="noopener">ftc.gov</a>。</p>
    `,
  },
};

/* ── Runtime ──────────────────────────────────────────────────────────────── */

let _lang = 'en';

function t(key, ...args) {
  const str = (TRANSLATIONS[_lang] && TRANSLATIONS[_lang][key] !== undefined)
    ? TRANSLATIONS[_lang][key]
    : (TRANSLATIONS.en[key] !== undefined ? TRANSLATIONS.en[key] : key);
  return args.reduce((s, v, i) => s.split(`{${i}}`).join(String(v)), str);
}

function detectLanguage() {
  const saved = localStorage.getItem('boomoji-lang');
  if (saved && TRANSLATIONS[saved]) return saved;
  const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en').toLowerCase();
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('gu')) return 'gu';
  if (nav.startsWith('zh')) return 'zh';
  return 'en';
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  _lang = lang;
  localStorage.setItem('boomoji-lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  const pc = document.getElementById('privacy-content');
  if (pc) pc.innerHTML = t('privacy.content_html');
}

/* ── Language picker overlay ──────────────────────────────────────────────── */

function _initLangPicker() {
  const overlay = document.getElementById('lang-overlay');
  const btn     = document.getElementById('lang-btn');
  const cancel  = document.getElementById('lang-cancel');
  if (!overlay || !btn) return;

  btn.addEventListener('click', () => overlay.classList.add('visible'));
  cancel.addEventListener('click', () => overlay.classList.remove('visible'));

  overlay.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      setLanguage(opt.dataset.lang);
      overlay.classList.remove('visible');
    });
  });
}

/* ── Boot ─────────────────────────────────────────────────────────────────── */

_lang = detectLanguage();

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = _lang;
  applyTranslations();
  _initLangPicker();
});
