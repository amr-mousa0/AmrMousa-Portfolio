# UI Component Contracts

This defines the DOM structure that the CSS relies upon to deliver the "Lux Cinematic" interaction model.

## Service Card (`.service-card`)

```html
<div class="service-card" data-service-id="dashboard-bi" tabindex="0">
  <div class="service-icon"><i class="fa-solid fa-chart-pie"></i></div>
  <div class="service-info">
    <h3>Dashboard Analysis & BI</h3>
    <p>Transform raw data into real-time interactive dashboards.</p>
  </div>
  <button class="service-btn" aria-label="View Dashboard Analysis & BI details">
    Learn More <i class="fa-solid fa-arrow-right"></i>
  </button>
</div>
```

**CSS Contract**:
- `.services-grid:has(.service-card:hover) .service-card:not(:hover)` triggers `filter: blur(4px)` and `opacity: 0.5`.
- `.service-card:hover` triggers `transform: translateY(-5px) scale(1.02)` and border glow.

## Service Modal (`.service-modal`)

```html
<div class="service-modal-overlay" id="service-modal" aria-hidden="true">
  <div class="service-modal-content">
    <button class="close-modal" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
    <div class="modal-header">
      <div class="modal-icon" id="modal-icon"></div>
      <h3 id="modal-title"></h3>
      <span class="modal-type" id="modal-type"></span>
    </div>
    <div class="modal-body">
      <h4>What's Included:</h4>
      <ul id="modal-deliverables" class="modal-bullets"></ul>
    </div>
    <div class="modal-footer">
      <button class="action-btn" onclick="scrollToContact()">Discuss Your Project</button>
    </div>
  </div>
</div>
```
