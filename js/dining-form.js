// Dining Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const diningForm = document.getElementById('dining-form');
  
  if (diningForm) {
    diningForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const date = document.getElementById('din-date').value;
      const time = document.getElementById('din-time').value;
      const guests = document.getElementById('din-guests').value;
      
      // Basic validation
      if (!date) {
        alert('Please select a date.');
        return;
      }
      
      if (!time || time.trim() === '') {
        alert('Please enter a time.');
        return;
      }
      
      if (!guests || guests === '') {
        alert('Please select number of guests.');
        return;
      }
      
      // Save to localStorage
      const booking = {
        date: date,
        time: time,
        guests: guests,
        timestamp: new Date().toISOString(),
        type: 'dining'
      };
      
      let bookings = JSON.parse(localStorage.getItem('diningBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('diningBookings', JSON.stringify(bookings));
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-msg';
      successMsg.textContent = 'Operation was sent successfully! We will contact you soon.';
      
      diningForm.insertBefore(successMsg, diningForm.firstChild);
      
      // Reset form
      diningForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    });
  }
});

