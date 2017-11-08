const serverAddress = "http://104.131.165.92:8081"
var productDetail;
document.addEventListener('DOMContentLoaded', function() {

    // When price condition is changed
    $('select#condition').on('change', function() {
        // If the user has selected "Less than current price"
        // We assign greaterThanInput value to  0
        // and set the lessThanInput value to current price of the product
        if ($('#condition').val() == "lessThanCurrent") {
            $('#greaterThanInput').val(0);
            $('#lessThanInput').val(productDetail.price);
            $('#greaterThanInput').attr('readonly', 'true');
        }
        // If the user has selected "Fixed price"
        // We assign greaterThanInput value to be price entered by user
        // and set the lessThanInput value to be price entered by user
        else if ($('#condition').val() == "fixedPrice") {
            $('#greaterThanInput').val(productDetail.price);
            $('#greaterThanInput').val(productDetail.price);
            $('#greaterThanInput').removeAttr('readonly');
        }
        // If the user has selected "Less than a value"
        // We assign greaterThanInput value to 0
        // and set the lessThanInput value to be price entered by user
        else {
            $('#greaterThanInput').val(0);
            $('#greaterThanInput').removeAttr('readonly');
        }
    });

    // On clicking the set alert button, we make a call to our server
    // Sever indexes the product and set a trigger to send mail when condition is met
    $('#submit').on('click', function() {
        var parameters = {
            'lte': $('#lessThanInput').val(),
            'gte': $('#greaterThanInput').val(),
            'email': $('#email').val(),
            'productId': productDetail.productId
        }
        $.ajax({
            type: 'GET',
            url: serverAddress + '/alert',
            data: parameters,
            success: function(d) {
                console.log(d);
            },
            error: function() {
                console.log("error");
            }
        });
        alert("You will receive an email, whenever the product price reaches according to you condition.");
    });

    $(document).ready(function() {
        // Get the current tab URL and fetch the product ID
        getCurrentTabUrl(function(url) {
            if ($.urlParam('pid', url) != null) {
                // Fetch the product details from the product ID
                getProductDetails({ 'productId': $.urlParam('pid', url) }, function(data) {
                    //  Display the product details in the extension
                    productDetail = data;
                    $('#name').text(productDetail.name);
                    $('#current_price').text(productDetail.price);
                    var imageURL;
                    for (var key in productDetail.imageurls) {
                        imageURL = productDetail.imageurls[key];
                    }
                    $('#img').attr('src', imageURL);
                });
            }
        });
    });

});