//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// data for primary nav
const navigationLinks = [
  {
    text: "Start a business",
    href: "/start",
    active: false
  },
  {
    text: "Get finance",
    href: "/funds",
    active: false
  },
  {
    text: "Sell overseas",
    href: "/export",
    active: false
  },
  {
    text: "Invest in the UK",
    href: "/invest",
    active: false
  },
  {
    text: "Develop your skills",
    href: "/cpd",
    active: false
  }
];

// Middleware to make navigation links available globally
router.use((req, res, next) => {
  // Mark the active link dynamically based on the current path
  res.locals.navigationLinks = navigationLinks.map(link => {
    return {
      ...link,
      active: link.href === req.path
    };
  });
  next();
});
