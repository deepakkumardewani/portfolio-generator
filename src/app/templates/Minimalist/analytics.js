// analytics.js
(function () {
  // Configuration
  const ENDPOINT = "ENDPOINT";
  const PROJECT_ID = "PROJECT_ID";
  const USER_ID = "USER_ID";
  const PORTFOLIO_ID = "PORTFOLIO_ID";
  const VISIT_TIMEOUT = 30 * 60 * 1000;

  // Helper Functions
  const setCookie = (name, value, ms) => {
    const expires = ms
      ? `; expires=${new Date(Date.now() + ms).toUTCString()}`
      : "";
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; SameSite=Strict${expires}`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2
      ? decodeURIComponent(parts.pop().split(";").shift())
      : null;
  };

  const generateId = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  // Bot Detection
  const isBot = () => {
    const botPatterns = /bot|crawler|spider|googlebot|bingbot|yandex/i;
    return botPatterns.test(navigator.userAgent);
  };

  // Initialize Analytics
  if (isBot()) {
    console.log("Bot detected; skipping analytics.");
    return;
  }

  // Track Visitor and Visit
  let visitorId = getCookie("visitor_id");
  if (!visitorId) {
    visitorId = generateId();
    setCookie("visitor_id", visitorId, 365 * 24 * 60 * 60 * 1000); // 1-year cookie
  }

  let visitId = getCookie("visit_id");
  let isNewVisit = false;
  if (!visitId) {
    visitId = generateId();
    setCookie("visit_id", visitId, VISIT_TIMEOUT);
    isNewVisit = true;
  }

  // Track Page View and Bounce
  // const pageViewId = generateId();
  let isBounce = true;
  const startTime = Date.now();

  // Detect Interactions to Negate Bounce
  const interactionEvents = ["click", "scroll", "keydown"];
  const markInteraction = () => {
    isBounce = false;
    interactionEvents.forEach((event) =>
      window.removeEventListener(event, markInteraction)
    );
  };
  interactionEvents.forEach((event) =>
    window.addEventListener(event, markInteraction)
  );

  // Send Analytics Event
  const sendEvent = async (eventData) => {
    try {
      const response = await fetch(`${ENDPOINT}/functions/analytics-write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": PROJECT_ID,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Analytics send error:", error);
    }
  };

  // Send Page View Event
  sendEvent({
    userId: USER_ID,
    portfolioId: PORTFOLIO_ID,
    visitorId,
    visitId,
    eventType: "pageview",
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
  });

  // Track Visit Start (if new visit)
  if (isNewVisit) {
    sendEvent({
      userId: USER_ID,
      portfolioId: PORTFOLIO_ID,
      visitorId,
      visitId,
      eventType: "visit_start",
      timestamp: new Date().toISOString(),
    });
  }

  // Track Exit and Duration
  window.addEventListener("beforeunload", () => {
    const duration = (Date.now() - startTime) / 1000; // Seconds
    sendEvent({
      portfolioId: PORTFOLIO_ID,
      visitorId,
      visitId,
      eventType: "page_exit",
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      duration,
      isBounce,
    });
  });

  // // Batch Updates (Optional: Periodic flush for better reliability)
  // const flushEvents = () => {
  //   // Implement if you store events locally for batching
  // };
  // window.addEventListener('unload', flushEvents);
})();
