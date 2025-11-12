// Toast/Pop-up Notification System
(function() {
  'use strict';

  // Create notification container if it doesn't exist
  function getNotificationContainer() {
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  // Show notification
  window.showNotification = function(message, type = 'success', duration = 3000) {
    const container = getNotificationContainer();
    const notification = document.createElement('div');
    
    const colors = {
      success: {
        bg: '#4caf50',
        border: '#45a049',
        icon: '✓'
      },
      error: {
        bg: '#e53935',
        border: '#c62828',
        icon: '✕'
      },
      info: {
        bg: '#2196f3',
        border: '#1976d2',
        icon: 'ℹ'
      },
      warning: {
        bg: '#ff9800',
        border: '#f57c00',
        icon: '⚠'
      }
    };

    const style = colors[type] || colors.info;

    notification.style.cssText = `
      background: ${style.bg};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      max-width: 400px;
      pointer-events: auto;
      animation: slideInRight 0.3s ease-out;
      border-left: 4px solid ${style.border};
      font-weight: 500;
      font-size: 14px;
    `;

    notification.innerHTML = `
      <span style="font-size: 20px; font-weight: bold;">${style.icon}</span>
      <span style="flex: 1;">${message}</span>
      <button style="
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s;
      " onclick="this.parentElement.remove()" aria-label="Close">×</button>
    `;

    // Add animation keyframes if not already added
    if (!document.getElementById('notification-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'notification-styles';
      styleSheet.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    container.appendChild(notification);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }, duration);
    }

    return notification;
  };

  // Convenience functions
  window.showSuccess = function(message, duration) {
    return showNotification(message, 'success', duration);
  };

  window.showError = function(message, duration) {
    return showNotification(message, 'error', duration);
  };

  window.showInfo = function(message, duration) {
    return showNotification(message, 'info', duration);
  };

  window.showWarning = function(message, duration) {
    return showNotification(message, 'warning', duration);
  };
})();

