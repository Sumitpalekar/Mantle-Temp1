// utils/notifications.js
export class NotificationManager {
    static showNotification(message, type = 'info') {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-slide-in ${
        type === 'success' ? 'bg-emerald-500' :
        type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' :
        'bg-gray-800'
      } text-white max-w-sm`;
      
      notification.innerHTML = `
        <div class="flex items-center">
          <span class="mr-3">${this.getIcon(type)}</span>
          <span class="flex-1">${message}</span>
          <button class="ml-4 text-white/70 hover:text-white" onclick="this.parentElement.parentElement.remove()">
            ✕
          </button>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 5000);
    }
    
    static getIcon(type) {
      return {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      }[type] || 'ℹ️';
    }
    
    static showBackgroundProcess(message) {
      this.showNotification(`Background: ${message}`, 'info');
    }
    
    static showSuccess(message) {
      this.showNotification(`Success: ${message}`, 'success');
    }
    
    static showError(message) {
      this.showNotification(`Error: ${message}`, 'error');
    }
  }
  
