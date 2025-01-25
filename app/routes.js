const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// Middleware to pass the current path to all templates
router.use((req, res, next) => {
  res.locals.currentPath = req.path; // Make current path available in Nunjucks templates
  next();
});

// Generic route to render non-language-specific pages
router.get('/:page', (req, res) => {
  const page = req.params.page;

  // Try to render the requested template
  res.render(page, (err, html) => {
    if (err) {
      // If the template doesn't exist, show a 404 page
      res.status(404).render('404');
    } else {
      // Render the page if it exists
      res.send(html);
    }
  });
});

// Generic route to handle language-specific directories (e.g., /de/, /zh/)
router.get('/:lang/:page?', (req, res) => {
  const lang = req.params.lang; // Language code (e.g., 'de', 'zh')
  const page = req.params.page || 'index'; // Default to 'index' if no page is specified

  // Try to render the requested template (e.g., 'de/index.html', 'zh/page1.html')
  res.render(`${lang}/${page}`, (err, html) => {
    if (err) {
      // If the template doesn't exist, render the 404 page
      res.status(404).render('404');
    } else {
      // Render the page if it exists
      res.send(html);
    }
  });
});

module.exports = router;
