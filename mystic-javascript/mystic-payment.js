paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
        // Grab the total amount from your cart-total span (strips out 'R' and commas)
        var totalText = document.getElementById('cart-total').innerText;
        var totalAmount = totalText.replace(/[^0-9.]/g, '');

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalAmount // Dynamically passes the cart total
                }
            }]
        });
    },

    // Finalize the transaction after approval
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! Handle success actions here:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            
            alert('Transaction ' + transaction.status + ': ' + transaction.id + '\nThank you for your order!');
            
            // TODO: Clear your local cart array, reset the UI display, 
            // and optionally redirect the user or send order details to your backend/email.
        });
    },

    // Handle cancel or errors if needed
    onError: function (err) {
        console.log('PayPal Checkout Error:', err);
        alert('An error occurred during payment processing. Please try again.');
    }
}).render('#paypal-button-container');
