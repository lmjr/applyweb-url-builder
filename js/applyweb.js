/*
** Inspired by
** Google URL Builder:
** https://support.google.com/analytics/answer/1033867?hl=en
** Quirksmode:
** http://www.quirksmode.org/js/form.html
** Raven:
** http://gaconfig.com/google-analytics-url-builder/
** Applyweb form field names:
** {FORM}-DESIGNATE_GIFT
** {FORM}-DESIG_OTHER
** {FORM}-GIFT_AMOUNT
** {FORM}-GIFT_AMOUNT_OTHER
*/

function buildURL() {
    // Base URL
    var awc_url = "https://www.applyweb.com/public/contribute?s=";

    // Get form values
    var awc_form = $("input[name=awc_form]:checked").val();
    var awc_fund_other = $("#awc_fund_other").val();
    var awc_gift_other = $("#awc_gift_other").val();

    if (awc_form) {
        // Set account prefix to all caps
        var awc_form_uc = awc_form.toUpperCase();

        // Adjust for inconsistent field values
        if (awc_form === "sfudonat") {
            var awc_form_designate = "-DESIGNATE_GIFT=Other";
        } else {
            var awc_form_designate = "-DESIGNATE_GIFT=other";
        };
    };

    // Create URL string
    var html = awc_url + awc_form;

    // Add recipient parameters
    if (awc_fund_other) {
        var html = html + "&" + awc_form_uc + awc_form_designate + "&" + awc_form_uc + "-DESIG_OTHER=" + encodeURIComponent(awc_fund_other);
    }

    // Add gift parameters
    if (awc_gift_other!= 0) {
        var html = html + "&" + awc_form_uc + "-GIFT_AMOUNT=Other" + "&" + awc_form_uc + "-GIFT_AMOUNT_OTHER=" + awc_gift_other;
    }
  
    // Write string to textarea
    if (awc_form) {
        // Set content
        $("#awc_output").html(html);
        $("#awc_output").change();
    }

    // Shorten URL
    // Copy to Clipboard
}

function initPage() {
    // Select string in textarea
    $("textarea").click(
        function() {
            this.select();
        });
    $('input').keyup(window.buildURL);
    $('input').click(window.buildURL);
    $('select').change(window.buildURL);

    buildURL();
}

$(window.initPage);