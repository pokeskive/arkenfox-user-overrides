/* 0102: set startup page [SETUP-CHROME]
 * 0=blank, 1=home, 2=last visited page, 3=resume previous session
 * [NOTE] Session Restore is cleared with history (2811), and not used in Private Browsing mode
 * [SETTING] General>Startup>Restore previous session ***/
// user_pref("browser.startup.page", 1);

/* 0103: set HOME+NEWWINDOW page
 * about:home=Firefox Home (default, see 0105), custom URL, about:blank
 * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
// user_pref("browser.startup.homepage", "about:home");

/* 0104: set NEWTAB page
 * true=Firefox Home (default, see 0105), false=blank page
 * [SETTING] Home>New Windows and Tabs>New tabs ***/
// user_pref("browser.newtabpage.enabled", true);

/* 0710: disable DNS-over-HTTPS (DoH) rollout [FF60+]
 * 0=off by default, 2=TRR (Trusted Recursive Resolver) first, 3=TRR only, 5=explicitly off
 * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
 * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
 * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
 * [3] https://support.mozilla.org/en-US/kb/firefox-dns-over-https
 * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
user_pref("network.trr.mode", 3);

/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does not affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo)
 * [SETUP-CHROME] Override this if you trust and use a privacy respecting search engine ***/
user_pref("keyword.enabled", true);

/* 0804: disable live search suggestions
 * [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Override these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.suggest.searches", false);

/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2811) ***/
user_pref("browser.cache.disk.enable", true);

/* 1006: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted
 * If set to false then the shortcuts use a generic Firefox icon ***/
user_pref("browser.shell.shortcutFavicons", false);

/* 1701: enable Container Tabs and its UI setting [FF50+]
 * [SETTING] General>Tabs>Enable Container Tabs
 * https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers ***/
user_pref("privacy.userContext.enabled", false);
user_pref("privacy.userContext.ui.enabled", false);

/* 2022: disable all DRM content (EME: Encryption Media Extension)
 * Optionally hide the setting which also disables the DRM prompt
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
user_pref("media.eme.enabled", true);

/* 2651: enable user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images
 * [SETTING] General>Downloads>Always ask you where to save files ***/
user_pref("browser.download.useDownloadDir", true);

/* 2652: disable downloads panel opening on every download [FF96+] ***/
user_pref("browser.download.alwaysOpenPanel", true);

/* 2701: enable ETP Strict Mode [FF86+]
 * ETP Strict Mode enables Total Cookie Protection (TCP)
 * [NOTE] Adding site exceptions disables all ETP protections for that site and increases the risk of
 * cross-site state tracking e.g. exceptions for SiteA and SiteB means PartyC on both sites is shared
 * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
 * [SETTING] to add site exceptions: Urlbar>ETP Shield
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions ***/
user_pref("browser.contentblocking.category", "standard");

/* 4501: enable privacy.resistFingerprinting [FF41+]
 * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a site exception via the urlbar
 * RFP also has a few side effects: mainly timezone is UTC0, and websites will prefer light theme
 * [1] https://bugzilla.mozilla.org/418986 ***/
user_pref("privacy.resistFingerprinting", false);

/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window by applying margins in stepped ranges [2]
 * If you use the dimension pref, then it will only apply those resolutions.
 * The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000")
 * [SETUP-WEB] This is independent of RFP (4501). If you're not using RFP, or you are but
 * dislike the margins, then flip this pref, keeping in mind that it is effectively fingerprintable
 * [WARNING] DO NOT USE: the dimension pref is only meant for testing
 * [1] https://bugzilla.mozilla.org/1407366
 * [2] https://hg.mozilla.org/mozilla-central/rev/6d2d7856e468#l2.32 ***/
user_pref("privacy.resistFingerprinting.letterboxing", false); // [HIDDEN PREF]

/* 4520: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then override it. RFP still randomizes canvas for naive scripts ***/
user_pref("webgl.disabled", false);

user_pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: control when to send a cross-origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Breakage: older modems/routers and some sites e.g banks, vimeo, icloud, instagram
 * If "2" is too strict, then override to "0" and use Smart Referer extension (Strict mode + add exceptions) ***/
user_pref("network.http.referer.XOriginPolicy", 0);

//Firefox stores passwords in plain text and obsolete if you use a password manager.
//Mozilla also told people to stop using their password manager.
user_pref("signon.rememberSignons", false);
//Disable Pocket, it's proprietary trash
user_pref("extensions.pocket.enabled", false);
// Disable Mozilla account
user_pref("identity.fxaccounts.enabled", false);

// Disable notification
user_pref("permissions.default.desktop-notification", 2);
