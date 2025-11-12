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
        if (window.showError) {
          window.showError('Please select a date.');
        }
        return;
      }
      
      if (!time || time.trim() === '') {
        if (window.showError) {
          window.showError('Please enter a time.');
        }
        return;
      }
      
      if (!guests || guests === '') {
        if (window.showError) {
          window.showError('Please select number of guests.');
        }
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
      
      // Show success notification
      if (window.showSuccess) {
        window.showSuccess('Dining reservation booked successfully! We will contact you soon.');
      }
      
      // Reset form
      diningForm.reset();
    });
  }
});

